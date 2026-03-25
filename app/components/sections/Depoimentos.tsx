const diferenciais = [
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
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    title: "Sigilo Profissional",
    quote: "Um ambiente seguro onde sua privacidade é sempre respeitada.",
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
          d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
    title: "Formação Contínua",
    quote:
      "Atualização constante com as melhores práticas e evidências científicas.",
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
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
    title: "Escuta Acolhedora",
    quote: "Cada pessoa é única e merece ser ouvida com respeito e empatia.",
  },
];

const depoimentos = [
  {
    text: "Experiência excepcional e ser paciente da Simone. Profissional com uma empatia ímpar, que de forma orgânica faz com que o paciente tenha um progresso natural na condução da terapia. Apenas agradecer por ser tua paciente e ver minha evolução constante. Obrigada por fazer cada sessão valer apena.",
    name: "A. J.",
    role: "Paciente há 4 anos",
    stars: 5,
  },
  {
    text: "A Dra. Simone Caceres criou um espaço seguro onde me senti confortável para falar sobre questões que carregava há muito tempo. A terapia mudou minha perspectiva de vida.",
    name: "R. L.",
    role: "Paciente há 2 ano",
    stars: 5,
  },
  {
    text: "Adoro a Dr Simone, super indico, muito atenciosa. Profissional top!!",
    name: "V. R.",
    role: "Paciente há 8 meses",
    stars: 5,
  },
];

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="py-20 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="inline-block text-sm tracking-[0.3em] uppercase text-sage-dark mb-3 font-medium">
            Diferenciais & Depoimentos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal mb-4 leading-tight">
            O que nos diferencia
          </h2>
          <p className="text-charcoal-light leading-relaxed">
            Cada detalhe é pensado para oferecer a melhor experiência
            terapêutica possível.
          </p>
        </div>

        {/* Diferenciais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {diferenciais.map((item, index) => (
            <div
              key={item.title}
              className="reveal bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 flex items-center justify-center text-gold mb-5">
                {item.icon}
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal-light leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Depoimentos */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-center font-serif text-2xl font-semibold text-charcoal mb-10 reveal">
            Relatos de quem já passou por aqui
          </h3>
          <p className="text-center text-xs text-warm-gray mb-8 reveal">
            * Depoimentos compartilhados com autorização, preservando a
            identidade dos pacientes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {depoimentos.map((dep, index) => (
              <div
                key={index}
                className="reveal bg-white rounded-2xl p-8 shadow-sm border border-cream-dark/30 hover:shadow-md transition-all duration-500 flex flex-col"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: dep.stars }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-charcoal-light leading-relaxed flex-1 italic">
                  &ldquo;{dep.text}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-6 pt-4 border-t border-cream-dark/30">
                  <p className="font-serif font-semibold text-charcoal text-sm">
                    {dep.name}
                  </p>
                  <p className="text-xs text-warm-gray">{dep.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
