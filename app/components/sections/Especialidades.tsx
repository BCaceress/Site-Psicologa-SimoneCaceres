const especialidades = [
  {
    title: "Ansiedade",
    description:
      "Tratamento especializado para transtornos de ansiedade, síndrome do pânico e fobias. Ajudo você a compreender seus gatilhos e desenvolver estratégias eficazes para lidar com a ansiedade no dia a dia.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
  },
  {
    title: "Depressão",
    description:
      "No tratamento para depressão, o terapeuta ajuda o paciente a expressar seus pensamentos e sentimentos, buscando a origem da dor emocional.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    ),
  },
  {
    title: "Terapia Online",
    description:
      "Atendimento psicológico realizado de forma online, oferecendo praticidade, conforto e flexibilidade. A terapia online possibilita um espaço seguro de escuta e acolhimento, com a mesma ética, sigilo e qualidade do atendimento presencial.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20.25L12 18.75L15 20.25L14.25 17M3 5.25C3 4.00736 4.00736 3 5.25 3H18.75C19.9926 3 21 4.00736 21 5.25V14.25C21 15.4926 19.9926 16.5 18.75 16.5H5.25C4.00736 16.5 3 15.4926 3 14.25V5.25Z"
        />
      </svg>
    ),
  },
  {
    title: "Terapia Infantil",
    description:
      "Atendimento especializado para crianças, utilizando técnicas lúdicas e adaptadas a cada faixa etária. Acompanhamento do desenvolvimento emocional e comportamental infantil.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
        />
      </svg>
    ),
  },
  {
    title: "Burnout",
    description:
      "Identificação e tratamento do esgotamento profissional. Desenvolvo junto ao paciente ferramentas para estabelecer limites saudáveis, gerenciar estresse e encontrar equilíbrio entre vida pessoal e profissional.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.545 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
        />
      </svg>
    ),
  },
  {
    title: "Desenvolvimento Pessoal",
    description:
      "Processo terapêutico voltado para o autoconhecimento, fortalecimento da autoestima e desenvolvimento de habilidades emocionais para alcançar maior realização pessoal e profissional.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
];

export default function Especialidades() {
  return (
    <section id="especialidades" className="py-20 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="inline-block text-sm tracking-[0.3em] uppercase text-sage-dark mb-3 font-medium">
            Áreas de Atuação
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal mb-4 leading-tight">
            Especialidades
          </h2>
          <p className="text-charcoal-light leading-relaxed">
            Ofereço acompanhamento terapêutico especializado em diversas áreas,
            sempre com uma abordagem acolhedora e baseada em evidências
            científicas.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {especialidades.map((item, index) => (
            <div
              key={item.title}
              className="reveal group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 border border-transparent hover:border-sage/20 hover:-translate-y-1"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-sage/10 flex items-center justify-center text-sage-dark mb-6 group-hover:bg-sage group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
