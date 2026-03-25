"use client";

import { useState } from "react";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function Contato() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target;
    if (target.name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatPhone(target.value) }));
      return;
    }
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;
    setFormData((prev) => ({ ...prev, [target.name]: value }));
  };

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao enviar mensagem.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao enviar mensagem. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="inline-block text-sm tracking-[0.3em] uppercase text-sage-dark mb-3 font-medium">
            Contato
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal mb-4 leading-tight">
            Vamos Conversar
          </h2>
          <p className="text-charcoal-light leading-relaxed">
            Dê o primeiro passo rumo ao seu bem-estar. Entre em contato e agende
            sua consulta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div className="reveal-left">
            {submitted ? (
              <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-sage/10 flex items-center justify-center text-sage mb-6">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-charcoal mb-3">
                  Mensagem enviada!
                </h3>
                <p className="text-charcoal-light">
                  Obrigada pelo contato. Retornarei em até 24 horas.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm space-y-5"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-charcoal mb-1.5"
                  >
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark/50 bg-off-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors text-sm"
                    placeholder="Seu nome"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-charcoal mb-1.5"
                  >
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark/50 bg-off-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors text-sm"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-charcoal mb-1.5"
                  >
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark/50 bg-off-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors text-sm"
                    placeholder="(99) 99999-9999"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-charcoal mb-1.5"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark/50 bg-off-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors text-sm resize-none"
                    placeholder="Conte um pouco sobre o que você precisa..."
                  />
                </div>

                {/* LGPD Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-cream-dark text-sage focus:ring-sage/30"
                  />
                  <label
                    htmlFor="consent"
                    className="text-xs text-charcoal-light leading-relaxed"
                  >
                    Concordo com a{" "}
                    <a href="#" className="text-sage-dark underline">
                      Política de Privacidade
                    </a>{" "}
                    e autorizo o uso dos dados enviados para fins de contato,
                    conforme a LGPD (Lei Geral de Proteção de Dados). *
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-sage text-white rounded-full font-medium hover:bg-sage-dark transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensagem"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Map */}
          <div className="reveal-right space-y-6">
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/5551981428765?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] text-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Fale pelo WhatsApp</p>
                <p className="text-sm text-white/80">(51) 98142-8765</p>
              </div>
            </a>

            {/* Contact Cards */}
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage-dark shrink-0">
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
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-charcoal mb-1">
                    Endereço
                  </h4>
                  <p className="text-sm text-charcoal-light leading-relaxed">
                    Avenida Presidente Vargas, 2730 - São Sebastião
                    <br />
                    Esteio, Rio Grande do Sul — RS
                    <br />
                    CEP 93.265-226
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage-dark shrink-0">
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
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-charcoal mb-1">
                    E-mail
                  </h4>
                  <p className="text-sm text-charcoal-light">
                    brunocaceres8@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage-dark shrink-0">
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
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-charcoal mb-1">
                    Horário de Atendimento
                  </h4>
                  <p className="text-sm text-charcoal-light leading-relaxed">
                    Segunda a Quarta: 8h — 19h
                    <br />
                    Quinta: 8h — 12h
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="pt-4 border-t border-cream-dark/30">
                <h4 className="font-serif font-semibold text-charcoal mb-3 text-sm">
                  Redes Sociais
                </h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/psicocaceres"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage-dark hover:bg-sage hover:text-white transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/simone-caceres-59070b79/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage-dark hover:bg-sage hover:text-white transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden shadow-sm h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d442922.16660368314!2d-51.178019!3d-29.854772!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95196f628bf9a1b5%3A0x5dfe377bc7dce0d4!2sAv.%20Pres.%20Vargas%2C%202730%20-%20S%C3%A3o%20Sebastiao%2C%20Esteio%20-%20RS%2C%2093280-000%2C%20Brasil!5e0!3m2!1spt-BR!2sus!4v1770915328664!5m2!1spt-BR!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do consultório"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
