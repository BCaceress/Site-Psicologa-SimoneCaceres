"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Qual a duração de cada sessão?",
    answer:
      "Cada sessão tem duração de 40 minutos. É importante manter a pontualidade para que possamos aproveitar o tempo ao máximo.",
  },
  {
    question: "A terapia pode ser online?",
    answer:
      "Sim! Ofereço atendimento online por videochamada, com a mesma qualidade e sigilo do atendimento presencial. A terapia online é especialmente útil para pessoas que moram longe do consultório ou têm rotinas muito ocupadas.",
  },
  {
    question: "Com qual frequência devo fazer terapia?",
    answer:
      "Geralmente, as sessões são semanais, mas a frequência pode ser ajustada conforme a necessidade e o momento do processo terapêutico de cada paciente.",
  },
  {
    question: "Quanto tempo dura o processo terapêutico?",
    answer:
      "Não existe um prazo pré-definido. A duração depende dos objetivos, da demanda e do ritmo de cada pessoa. O processo é reavaliado periodicamente para garantir que estamos no caminho certo.",
  },
  {
    question: "Meus dados e o conteúdo das sessões são sigilosos?",
    answer:
      "Absolutamente. O sigilo profissional é um dos pilares fundamentais da psicologia. Tudo o que é compartilhado nas sessões é confidencial, conforme o Código de Ética do Psicólogo.",
  },
  {
    question: "Qual a diferença entre psicólogo e psiquiatra?",
    answer:
      "O psicólogo utiliza a terapia (conversa e técnicas psicológicas) como principal ferramenta de tratamento. O psiquiatra é um médico que pode prescrever medicamentos. Em muitos casos, o trabalho é complementar e pode ser feito em conjunto.",
  },
  {
    question: "Aceita convênio ou plano de saúde?",
    answer:
      "Atualmente, o atendimento é particular. Porém, emito recibo para reembolso junto ao seu plano de saúde, caso ele ofereça essa possibilidade.",
  },
  {
    question: "Como faço para agendar uma consulta?",
    answer:
      "Você pode entrar em contato pelo WhatsApp, pelo formulário de contato aqui no site, ou pela página de agendamento. Responderei em até 24 horas para confirmarmos o melhor horário.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-32 bg-off-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="inline-block text-sm tracking-[0.3em] uppercase text-sage-dark mb-3 font-medium">
            Dúvidas Frequentes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal mb-4 leading-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-charcoal-light leading-relaxed">
            Tire suas dúvidas sobre o processo terapêutico. Se não encontrar o
            que procura, entre em contato.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="reveal bg-white rounded-xl overflow-hidden shadow-sm border border-cream-dark/20 transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-cream/30 transition-colors duration-300"
              >
                <span className="font-serif text-base font-semibold text-charcoal pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-sage shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-sm text-charcoal-light leading-relaxed border-t border-cream-dark/20 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
