import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-off-white to-sage-light/20" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-sage/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-terracotta/5 rounded-full blur-2xl" />

      <div className="relative max-w-[84rem] mx-auto px-5 sm:px-8 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left pt-20 lg:pt-0">
            <div className="animate-fade-in-up">
              <span className="inline-block text-sm tracking-[0.3em] uppercase text-sage-dark mb-4 font-medium">
                Psicóloga Clínica — CRP 07/31309
              </span>
            </div>

            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-charcoal leading-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Dra. Simone
              <span className="block text-sage-dark">Caceres</span>
            </h1>

            <p
              className="text-lg sm:text-xl text-charcoal-light max-w-lg mx-auto lg:mx-0 mb-4 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              &ldquo;Cuidar da sua saúde emocional é um ato de coragem.&rdquo;
            </p>

            <p
              className="text-base text-warm-gray max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              Acolhimento, escuta qualificada e um espaço seguro para o seu
              processo de autoconhecimento e transformação.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <Link
                href="/agendamento"
                className="inline-flex items-center justify-center px-8 py-4 bg-sage text-white text-base font-medium rounded-full hover:bg-sage-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Agendar Consulta
                <svg
                  className="w-5 h-5 ml-2"
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
              <a
                href="#contato"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-charcoal/20 text-charcoal text-base font-medium rounded-full hover:border-sage hover:text-sage-dark transition-all duration-300"
              >
                Entrar em Contato
              </a>
            </div>
          </div>

          {/* Photo Placeholder */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end pt-24 lg:pt-0">
            <div
              className="relative animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-sage/20 animate-pulse" />
              <div className="absolute -inset-8 rounded-full border border-gold/10" />

              {/* Photo container */}
              <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden shadow-2xl relative">
                <Image
                  src="/img/IMG_6295.JPG"
                  alt="Simone Caceres - Psicóloga"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#sobre" aria-label="Rolar para baixo">
          <svg
            className="w-6 h-6 text-sage-dark/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
