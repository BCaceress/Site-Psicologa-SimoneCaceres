"use client";

import { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WHATSAPP_NUMBER = "5551999056576";
const GOOGLE_APPOINTMENT_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ00oRHbWP8CVnIOcdVLfqlkJ4-SISCp3aSUwLd4lNzJshKxHofmi0UHUCtUxP477bvopw0RmsvN?gv=true";

const tiposAtendimento = [
  { value: "online", label: "Atendimento Online" },
  { value: "presencial", label: "Atendimento Presencial" },
] as const;

export default function Agendamento() {
  const [tipoSelecionado, setTipoSelecionado] = useState("");

  const isOnline = tipoSelecionado === "online";
  const isContatoClinica = tipoSelecionado === "presencial";

  const whatsappLink = useMemo(() => {
    const texto = encodeURIComponent(
      "Olá, gostaria de agendar atendimento presencial com a psicóloga Simone Caceres.",
    );

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
  }, []);

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 bg-off-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-sm tracking-[0.3em] uppercase text-sage-dark mb-3 font-medium">
              Agendamento
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal mb-4 leading-tight">
              Escolha seu tipo de atendimento
            </h1>
            <p className="text-charcoal-light leading-relaxed max-w-2xl mx-auto">
              Online: agendamento sincronizado diretamente com o Google Calendar.
              Presencial: contato direto pelo WhatsApp da clínica.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm space-y-8">
            <section className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-charcoal">
                1. Tipo de atendimento
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tiposAtendimento.map((tipo) => (
                  <button
                    key={tipo.value}
                    type="button"
                    onClick={() => setTipoSelecionado(tipo.value)}
                    className={`cursor-pointer p-4 rounded-xl border-2 text-sm font-medium transition-all duration-300 ${
                      tipoSelecionado === tipo.value
                        ? "border-sage bg-sage/5 text-sage-dark"
                        : "border-cream-dark/30 text-charcoal hover:border-sage/50"
                    }`}
                  >
                    {tipo.label}
                  </button>
                ))}
              </div>
            </section>

            {isContatoClinica && (
              <section className="rounded-xl bg-cream p-6 space-y-4">
                <h3 className="font-serif text-lg font-semibold text-charcoal">
                  Atendimento Presencial
                </h3>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  Para este tipo de atendimento, fale com a clínica no WhatsApp para
                  confirmar disponibilidade.
                </p>
                <div className="text-sm text-charcoal-light leading-relaxed">
                  <p>
                    <strong>Horário da clínica:</strong> segunda a quarta, das 8h às
                    12h e das 13h às 19h.
                  </p>
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-all duration-300"
                >
                  Chamar no WhatsApp
                </a>
              </section>
            )}

            {isOnline && (
              <section className="space-y-5">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-semibold text-charcoal">
                    2. Agende seu horário online
                  </h3>
                  <p className="text-sm text-charcoal-light leading-relaxed">
                    Escolha abaixo o melhor dia e horário. A disponibilidade exibida é
                    a mesma da agenda do Google.
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-cream-dark/40 bg-off-white">
                  <iframe
                    src={GOOGLE_APPOINTMENT_URL}
                    className="w-full min-h-[720px]"
                    style={{ border: 0 }}
                    frameBorder="0"
                    title="Agendamento online no Google Calendar"
                  />
                </div>

                <p className="text-xs text-charcoal-light">
                  Se o calendário não carregar no navegador, abra diretamente no Google
                  Calendar.
                </p>

                <a
                  href={GOOGLE_APPOINTMENT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-all duration-300"
                >
                  Abrir agendamento em nova aba
                </a>
              </section>
            )}

            {!tipoSelecionado && (
              <p className="text-sm text-center text-charcoal-light">
                Selecione um tipo de atendimento para continuar.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
