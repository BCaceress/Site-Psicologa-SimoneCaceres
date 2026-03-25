"use client";

import { useEffect, useState } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "5551981428765";

// Mensagem padrão e mensagens por seção
const MENSAGENS: Record<string, string> = {
  default: "Olá, Dra. Simone! Gostaria de saber mais sobre seu trabalho.",
  inicio: "Olá, Dra. Simone! Vi seu site e gostaria de agendar uma consulta.",
  sobre: "Olá, Dra. Simone! Li sobre sua trajetória e gostaria de conversar.",
  especialidades:
    "Olá, Dra. Simone! Tenho interesse em saber mais sobre suas especialidades.",
  ansiedade:
    "Olá, Dra. Simone! Estou buscando ajuda com ansiedade e gostaria de agendar.",
  depressao:
    "Olá, Dra. Simone! Gostaria de conversar sobre tratamento para depressão.",
  burnout:
    "Olá, Dra. Simone! Estou me sentindo esgotado(a) e gostaria de uma consulta.",
  atendimento: "Olá, Dra. Simone! Quero entender como funciona o atendimento.",
  depoimentos:
    "Olá, Dra. Simone! Li os depoimentos e gostaria de marcar uma sessão.",
  faq: "Olá, Dra. Simone! Tenho algumas dúvidas e gostaria de conversar.",
  contato: "Olá, Dra. Simone! Gostaria de entrar em contato.",
};

// Labels exibidos acima do botão, por seção
const LABELS: Record<string, string> = {
  default: "Fale comigo",
  inicio: "Agende sua consulta",
  sobre: "Vamos conversar?",
  especialidades: "Tire suas dúvidas",
  atendimento: "Como funciona?",
  depoimentos: "Comece sua jornada",
  faq: "Ainda tem dúvidas?",
  contato: "Estou aqui para você",
};

// ─── Componente ───────────────────────────────────────────────────────────────

export default function WhatsAppFlutuante() {
  const [visivel, setVisivel] = useState(false);
  const [secaoAtual, setSecaoAtual] = useState("default");
  const [pulsando, setPulsando] = useState(false);
  const [labelVisivel, setLabelVisivel] = useState(false);

  // Mostrar botão após scroll de 20% da página
  useEffect(() => {
    const handleScroll = () => {
      const scrollPct =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisivel(scrollPct > 0.05);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detectar seção visível via IntersectionObserver
  useEffect(() => {
    const secoes = [
      "inicio",
      "sobre",
      "especialidades",
      "atendimento",
      "depoimentos",
      "faq",
      "contato",
    ];
    const observers: IntersectionObserver[] = [];

    secoes.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setSecaoAtual(id);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Pulsar após 30s de inatividade
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(timer);
      setPulsando(false);
      timer = setTimeout(() => setPulsando(true), 30_000);
    };

    resetTimer();
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, []);

  const mensagem = MENSAGENS[secaoAtual] ?? MENSAGENS.default;
  const label = LABELS[secaoAtual] ?? LABELS.default;
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

  return (
    <>
      <style>{`
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
          50%       { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
        }
        @keyframes waSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes labelSlideIn {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .wa-pulse { animation: waPulse 1.5s ease-in-out infinite; }
        .wa-slide { animation: waSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .label-slide { animation: labelSlideIn 0.25s ease both; }
      `}</style>

      {visivel && (
        <div
          className="wa-slide fixed bottom-6 right-6 z-50 flex items-center gap-3"
          style={{ bottom: "1.5rem", right: "1.5rem" }}
        >
          {/* Label contextual */}
          {labelVisivel && (
            <div className="label-slide bg-white text-charcoal text-xs font-medium px-3 py-2 rounded-full shadow-lg border border-cream-dark/30 whitespace-nowrap">
              {label}
            </div>
          )}

          {/* Botão WhatsApp */}
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label="Conversar no WhatsApp"
            onMouseEnter={() => setLabelVisivel(true)}
            onMouseLeave={() => setLabelVisivel(false)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 ${
              pulsando ? "wa-pulse" : ""
            }`}
            style={{ background: "#25D366" }}
            onClick={() => setPulsando(false)}
          >
            <svg
              className="w-7 h-7 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      )}
    </>
  );
}
