import Image from "next/image";
export default function Sobre() {
  return (
    <section id="sobre" className="py-20 lg:py-32 bg-off-white">
      <div className="max-w-[84rem] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <div className="reveal-left">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-sage/20 rounded-2xl" />
              <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 bg-gold/10 rounded-2xl" />

              {/* Photo container */}
              <div className="relative w-full aspect-[4/5] rounded-2xl bg-gradient-to-br from-cream-dark to-sage-light/20 overflow-hidden shadow-lg">
                <Image
                  src="/img/IMG_6292.JPG"
                  alt="Simone Caceres - Psicóloga"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="reveal-right">
            <span className="inline-block text-sm tracking-[0.3em] uppercase text-sage-dark mb-3 font-medium">
              Sobre Mim
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal mb-6 leading-tight">
              Conheça a<br />
              <span className="text-sage-dark">Dra. Simone Caceres</span>
            </h2>

            <div className="space-y-4 text-charcoal-light leading-relaxed">
              <p>
                Olá, meu nome é Simone Caceres Soares, sou Psicóloga Clínica
                (CRP 07/31309) e Psicanalista. Atendo de forma presencial e
                online no Rio Grande do Sul, oferecendo um espaço de escuta
                acolhedora, ética e respeitosa para quem deseja compreender
                melhor suas emoções, sua história e seus desafios.
              </p>
              <p>
                Meu interesse pela psicanálise surgiu ainda durante a graduação,
                quando conheci as teorias de Freud e me encantei pela
                possibilidade de compreender como o inconsciente influencia
                nossos pensamentos, sentimentos e comportamentos. Desde 2022,
                aprofundo meus estudos com foco nos traumas infantis e em seus
                impactos na vida adulta, buscando sempre ampliar minha
                compreensão e aprimorar minha prática clínica.
              </p>
              <p>
                Sou apaixonada pela minha profissão e acredito na força de uma
                escuta atenta e sensível. Meu compromisso é oferecer um
                acompanhamento psicológico responsável e individualizado,
                respeitando o tempo e a singularidade de cada pessoa que confia
                em mim para esse processo de cuidado e autoconhecimento.
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
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
                  label: "Formação em Psicanálise",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  label: "Pós em Psicologia Infantil",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
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
                  label: "+6 anos de experiência",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  ),
                  label: "+800 pacientes",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-charcoal-light"
                >
                  <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage-dark shrink-0">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
