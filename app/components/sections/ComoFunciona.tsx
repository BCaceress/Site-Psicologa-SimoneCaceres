import Link from "next/link";

const etapas = [
  {
    step: "01",
    title: "Primeiro Contato",
    description:
      "Entre em contato pelo WhatsApp ou formulário. Responderei em até 24 horas para alinharmos detalhes e agendar a primeira sessão.",
  },
  {
    step: "02",
    title: "Sessão Inicial",
    description:
      "Na primeira consulta, conversaremos sobre suas demandas, expectativas e traçaremos juntos os objetivos do processo terapêutico.",
  },
  {
    step: "03",
    title: "Processo Terapêutico",
    description:
      "Sessões semanais de 40 minutos, presenciais ou online, com acompanhamento contínuo do seu progresso e bem-estar emocional.",
  },
  {
    step: "04",
    title: "Evolução Contínua",
    description:
      "Reavaliamos periodicamente os objetivos e ajustamos a abordagem conforme sua evolução, sempre respeitando seu ritmo.",
  },
];

const infoCards = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
        />
      </svg>
    ),
    title: "Online",
    description:
      "Sessões por videochamada para sua comodidade, de qualquer lugar.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
    title: "Presencial",
    description: "Consultório acolhedor no Centro de Esteio — RS.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "40 minutos",
    description: "Duração de cada sessão, com pontualidade e total dedicação.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
    title: "Público",
    description: "Adultos, adolescentes e crianças. Atendimento personalizado.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="atendimento" className="py-20 lg:py-32 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="inline-block text-sm tracking-[0.3em] uppercase text-sage-dark mb-3 font-medium">
            Atendimento
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal mb-4 leading-tight">
            Como Funciona
          </h2>
          <p className="text-charcoal-light leading-relaxed">
            O processo terapêutico é simples e acolhedor. Conheça as etapas para
            iniciar sua jornada de autoconhecimento.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {infoCards.map((card, index) => (
            <div
              key={card.title}
              className="reveal bg-white rounded-xl p-6 text-center shadow-sm border border-cream-dark/30 hover:shadow-md transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-sage/10 flex items-center justify-center text-sage-dark mb-4">
                {card.icon}
              </div>
              <h4 className="font-serif text-lg font-semibold text-charcoal mb-1">
                {card.title}
              </h4>
              <p className="text-xs text-charcoal-light leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-sage/20 -translate-x-1/2" />

            {etapas.map((etapa, index) => (
              <div
                key={etapa.step}
                className={`reveal relative flex items-start gap-8 mb-12 last:mb-0 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Content */}
                <div
                  className={`flex-1 pl-16 lg:pl-0 ${
                    index % 2 === 0
                      ? "lg:text-right lg:pr-16"
                      : "lg:text-left lg:pl-16"
                  }`}
                >
                  <span className="text-xs tracking-widest uppercase text-sage-dark font-medium">
                    Etapa {etapa.step}
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-charcoal mt-1 mb-2">
                    {etapa.title}
                  </h3>
                  <p className="text-sm text-charcoal-light leading-relaxed">
                    {etapa.description}
                  </p>
                </div>

                {/* Circle */}
                <div className="absolute left-6 lg:left-1/2 w-12 h-12 -translate-x-1/2 rounded-full bg-sage text-white flex items-center justify-center font-serif font-semibold text-sm shadow-md z-10">
                  {etapa.step}
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden lg:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 reveal">
          <Link
            href="/agendamento"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sage text-white rounded-full font-medium hover:bg-sage-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Agendar Minha Consulta
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
