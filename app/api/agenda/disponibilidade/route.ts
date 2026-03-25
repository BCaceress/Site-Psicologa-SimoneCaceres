import { createSign } from "node:crypto";
import { NextResponse } from "next/server";

type GoogleEvent = {
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
  status?: string;
  transparency?: string;
};

type Slot = {
  date: string;
  start: string;
  end: string;
  hourLabel: string;
  dateLabel: string;
  startMs: number;
  endMs: number;
};

const TIME_ZONE = process.env.AGENDA_TIME_ZONE ?? "America/Sao_Paulo";
const DAYS_AHEAD = Number(process.env.AGENDA_DAYS_AHEAD ?? 45);
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.readonly";

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

function getDateKeyInTimeZone(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

function getWeekdayInTimeZone(date: Date, timeZone: string): number {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  }).format(date);

  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[name] ?? -1;
}

function zonedToUtc(dateKey: string, hour: number, minute: number, timeZone: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  const utcApprox = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const asTargetTz = new Date(
    utcApprox.toLocaleString("en-US", {
      timeZone,
      hour12: false,
    }),
  );
  const offset = utcApprox.getTime() - asTargetTz.getTime();
  return new Date(utcApprox.getTime() + offset);
}

function buildCandidateSlots(timeZone: string, daysAhead: number): Slot[] {
  const slots: Slot[] = [];
  const now = new Date();
  const dateLabelFormatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone,
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });

  for (let i = 0; i <= daysAhead; i += 1) {
    const d = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const dateKey = getDateKeyInTimeZone(d, timeZone);
    const weekday = getWeekdayInTimeZone(d, timeZone);
    const dateRef = zonedToUtc(dateKey, 12, 0, timeZone);
    const dateLabel = dateLabelFormatter.format(dateRef);

    let hours: number[] = [];
    if (weekday === 4) {
      hours = [13, 14, 15, 16, 17, 18];
    }
    if (weekday === 5) {
      hours = [8, 9, 10, 11];
    }
    if (!hours.length) {
      continue;
    }

    hours.forEach((hour) => {
      const start = zonedToUtc(dateKey, hour, 0, timeZone);
      const end = zonedToUtc(dateKey, hour + 1, 0, timeZone);
      slots.push({
        date: dateKey,
        start: start.toISOString(),
        end: end.toISOString(),
        hourLabel: `${pad2(hour)}:00`,
        dateLabel,
        startMs: start.getTime(),
        endMs: end.getTime(),
      });
    });
  }

  return slots;
}

function toBusyInterval(event: GoogleEvent): { startMs: number; endMs: number } | null {
  if (event.status === "cancelled" || event.transparency === "transparent") {
    return null;
  }

  const startRaw = event.start?.dateTime ?? event.start?.date;
  const endRaw = event.end?.dateTime ?? event.end?.date;
  if (!startRaw || !endRaw) {
    return null;
  }

  const startMs = new Date(startRaw).getTime();
  const endMs = new Date(endRaw).getTime();
  if (Number.isNaN(startMs) || Number.isNaN(endMs) || endMs <= startMs) {
    return null;
  }

  return { startMs, endMs };
}

function toBase64Url(value: string): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function normalizePrivateKey(privateKey: string): string {
  return privateKey.replace(/\\n/g, "\n");
}

function createGoogleServiceAccountJwt(
  clientEmail: string,
  privateKey: string,
): string {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    scope: GOOGLE_CALENDAR_SCOPE,
    aud: GOOGLE_TOKEN_ENDPOINT,
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = toBase64Url(JSON.stringify(header));
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();

  const signature = signer
    .sign(normalizePrivateKey(privateKey))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  return `${unsignedToken}.${signature}`;
}

async function getGoogleAccessToken(): Promise<string | null> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    return null;
  }

  const assertion = createGoogleServiceAccountJwt(clientEmail, privateKey);
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });

  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Falha ao autenticar com service account: ${text}`);
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Google OAuth respondeu sem access_token.");
  }

  return data.access_token;
}

async function fetchGoogleCalendarEvents(
  calendarId: string,
  timeMin: string,
  timeMax: string,
): Promise<{ items?: GoogleEvent[] }> {
  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
  );
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("maxResults", "2500");
  url.searchParams.set("timeMin", timeMin);
  url.searchParams.set("timeMax", timeMax);

  const accessToken = await getGoogleAccessToken();
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const headers: HeadersInit = {};

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  } else if (apiKey) {
    url.searchParams.set("key", apiKey);
  } else {
    throw new Error(
      "Configuracao ausente. Use GOOGLE_SERVICE_ACCOUNT_EMAIL/PRIVATE_KEY para agenda privada ou GOOGLE_CALENDAR_API_KEY para agenda publica.",
    );
  }

  const response = await fetch(url.toString(), {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Falha ao consultar Google Calendar: ${text}`);
  }

  return (await response.json()) as { items?: GoogleEvent[] };
}

export async function GET() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    return NextResponse.json(
      {
        error: "Configuracao ausente. Defina GOOGLE_CALENDAR_ID no servidor.",
      },
      { status: 500 },
    );
  }

  const candidateSlots = buildCandidateSlots(TIME_ZONE, DAYS_AHEAD);
  if (!candidateSlots.length) {
    return NextResponse.json({ dates: [] });
  }

  const timeMin = candidateSlots[0]?.start;
  const timeMax = candidateSlots[candidateSlots.length - 1]?.end;

  let data: { items?: GoogleEvent[] };
  try {
    data = await fetchGoogleCalendarEvents(calendarId, timeMin, timeMax);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido.";
    return NextResponse.json(
      { error: "Falha ao consultar Google Calendar.", details: message },
      { status: 502 },
    );
  }

  const busyIntervals = (data.items ?? [])
    .map(toBusyInterval)
    .filter((interval): interval is { startMs: number; endMs: number } => Boolean(interval));

  const freeSlots = candidateSlots.filter((slot) => {
    return !busyIntervals.some(
      (busy) => slot.startMs < busy.endMs && busy.startMs < slot.endMs,
    );
  });

  const grouped = new Map<string, { date: string; label: string; slots: string[] }>();
  freeSlots.forEach((slot) => {
    const current = grouped.get(slot.date);
    if (!current) {
      grouped.set(slot.date, {
        date: slot.date,
        label: slot.dateLabel,
        slots: [slot.hourLabel],
      });
      return;
    }
    current.slots.push(slot.hourLabel);
  });

  return NextResponse.json({
    dates: Array.from(grouped.values()),
  });
}
