"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WHATSAPP_NUMBER = "5551999056576";

const tiposAtendimento = [
  { value: "online", label: "Atendimento Online" },
  { value: "presencial", label: "Atendimento Presencial" },
] as const;

type DisponibilidadeDia = {
  date: string;
  label: string;
  slots: string[];
};

export default function Agendamento() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loadingDisponibilidade, setLoadingDisponibilidade] = useState(false);
  const [
    cargaInicialDisponibilidadeFeita,
    setCargaInicialDisponibilidadeFeita,
  ] = useState(false);
  const [erroDisponibilidade, setErroDisponibilidade] = useState("");
  const [disponibilidade, setDisponibilidade] = useState<DisponibilidadeDia[]>(
    [],
  );

  const [formData, setFormData] = useState({
    tipo: "",
    data: "",
    horario: "",
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
    consent: false,
  });

  const tipoSelecionado = formData.tipo;
  const isOnline = tipoSelecionado === "online";
  const isContatoClinica = tipoSelecionado === "presencial";

  const dataSelecionada = useMemo(
    () => disponibilidade.find((d) => d.date === formData.data),
    [disponibilidade, formData.data],
  );

  const horariosDisponiveis = dataSelecionada?.slots ?? [];

  const whatsappLink = useMemo(() => {
    const texto = encodeURIComponent(
      "Olá, gostaria de agendar atendimento presencial com a psicóloga Simone Caceres.",
    );

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
  }, []);

  const carregarDisponibilidade = async () => {
    setLoadingDisponibilidade(true);
    setErroDisponibilidade("");

    try {
      const res = await fetch("/api/agenda/disponibilidade", {
        cache: "no-store",
      });
      const data = (await res.json()) as {
        dates?: DisponibilidadeDia[];
        error?: string;
      };

      if (!res.ok) {
        throw new Error(
          data.error || "Não foi possível carregar disponibilidade.",
        );
      }

      setDisponibilidade(data.dates ?? []);
    } catch {
      setErroDisponibilidade(
        "Não foi possível sincronizar os horários com a agenda agora. Tente novamente em instantes.",
      );
    } finally {
      setLoadingDisponibilidade(false);
    }
  };

  useEffect(() => {
    if (!isOnline || cargaInicialDisponibilidadeFeita) {
      return;
    }
    setCargaInicialDisponibilidadeFeita(true);
    void carregarDisponibilidade();
  }, [isOnline, cargaInicialDisponibilidadeFeita]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const target = e.target;
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;

    setFormData((prev) => ({ ...prev, [target.name]: value }));
  };

  const selectTipo = (tipo: string) => {
    setFormData((prev) => ({
      ...prev,
      tipo,
      data: "",
      horario: "",
    }));
    setStep(1);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 bg-off-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-sm tracking-[0.3em] uppercase text-sage-dark mb-3 font-medium">
              Agendamento
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal mb-4 leading-tight">
              Escolha seu tipo de atendimento
            </h1>
            <p className="text-charcoal-light leading-relaxed max-w-xl mx-auto">
              Online: horários sincronizados com a agenda pessoal. Presencial:
              contato direto pelo WhatsApp da clínica.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl p-10 shadow-sm text-center max-w-md mx-auto">
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
              <h2 className="font-serif text-2xl font-semibold text-charcoal mb-3">
                Solicitação enviada
              </h2>
              <p className="text-charcoal-light mb-2">
                Seu pedido de atendimento online foi registrado.
              </p>
              <p className="text-sm text-warm-gray mb-6">
                A clínica entrará em contato para confirmar o horário.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-all duration-300"
              >
                Voltar ao início
              </Link>
            </div>
          ) : (
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
                      onClick={() => selectTipo(tipo.value)}
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
                    Para este tipo de atendimento, fale com a clínica no
                    WhatsApp para confirmar disponibilidade.
                  </p>
                  <div className="text-sm text-charcoal-light leading-relaxed">
                    <p>
                      <strong>Horário da clínica:</strong> segunda a quarta, das
                      8h às 12h e das 13h às 19h.
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
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                            step >= s
                              ? "bg-sage text-white"
                              : "bg-cream-dark text-warm-gray"
                          }`}
                        >
                          {s}
                        </div>
                        {s < 3 && (
                          <div
                            className={`w-12 h-0.5 transition-all duration-300 ${
                              step > s ? "bg-sage" : "bg-cream-dark"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between gap-4">
                        <h2 className="font-serif text-xl font-semibold text-charcoal">
                          2. Data e horário online
                        </h2>
                        <button
                          type="button"
                          onClick={carregarDisponibilidade}
                          className="cursor-pointer text-sm font-medium text-sage-dark underline"
                        >
                          Atualizar horários
                        </button>
                      </div>

                      {loadingDisponibilidade && (
                        <p className="text-sm text-charcoal-light">
                          Sincronizando disponibilidade com a agenda...
                        </p>
                      )}

                      {erroDisponibilidade && (
                        <p className="text-sm text-terracotta">
                          {erroDisponibilidade}
                        </p>
                      )}

                      {!loadingDisponibilidade && !erroDisponibilidade && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-3">
                              Datas disponíveis
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {disponibilidade.map((dia) => (
                                <button
                                  key={dia.date}
                                  type="button"
                                  onClick={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      data: dia.date,
                                      horario: "",
                                    }))
                                  }
                                  className={`cursor-pointer p-4 rounded-xl border-2 text-sm font-medium text-left transition-all duration-300 ${
                                    formData.data === dia.date
                                      ? "border-sage bg-sage/5 text-sage-dark"
                                      : "border-cream-dark/30 text-charcoal hover:border-sage/50"
                                  }`}
                                >
                                  {dia.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-3">
                              Horário (blocos de 1 hora)
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                              {horariosDisponiveis.map((h) => (
                                <button
                                  key={h}
                                  type="button"
                                  onClick={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      horario: h,
                                    }))
                                  }
                                  className={`cursor-pointer py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                                    formData.horario === h
                                      ? "bg-sage text-white"
                                      : "bg-cream text-charcoal-light hover:bg-sage/10 hover:text-sage-dark"
                                  }`}
                                >
                                  {h}
                                </button>
                              ))}
                            </div>
                          </div>

                          {!disponibilidade.length && (
                            <p className="text-sm text-charcoal-light">
                              Nenhuma data disponível no momento.
                            </p>
                          )}
                        </>
                      )}

                      <div className="flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!formData.data || !formData.horario}
                          className="cursor-pointer px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Próximo
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="font-serif text-xl font-semibold text-charcoal">
                        3. Seus dados
                      </h2>

                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1.5">
                          Nome completo *
                        </label>
                        <input
                          type="text"
                          name="nome"
                          required
                          value={formData.nome}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-cream-dark/50 bg-off-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors text-sm"
                          placeholder="Seu nome"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-1.5">
                            E-mail *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-cream-dark/50 bg-off-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors text-sm"
                            placeholder="seu@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-1.5">
                            Telefone *
                          </label>
                          <input
                            type="tel"
                            name="telefone"
                            required
                            value={formData.telefone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-cream-dark/50 bg-off-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors text-sm"
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1.5">
                          Observações
                        </label>
                        <textarea
                          name="mensagem"
                          rows={3}
                          value={formData.mensagem}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-cream-dark/50 bg-off-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors text-sm resize-none"
                          placeholder="Informações adicionais (opcional)"
                        />
                      </div>

                      <div className="bg-cream rounded-xl p-5 text-sm text-charcoal-light space-y-1">
                        <p>
                          <strong>Atendimento:</strong> Online
                        </p>
                        <p>
                          <strong>Data:</strong> {dataSelecionada?.label}
                        </p>
                        <p>
                          <strong>Horário:</strong> {formData.horario}
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          name="consent"
                          required
                          checked={formData.consent}
                          onChange={handleChange}
                          className="mt-1 w-4 h-4 rounded border-cream-dark text-sage focus:ring-sage/30"
                        />
                        <label className="text-xs text-charcoal-light leading-relaxed">
                          Concordo com a política de privacidade e autorizo o
                          uso dos dados enviados conforme a LGPD. *
                        </label>
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="cursor-pointer px-6 py-3 border border-charcoal/20 text-charcoal rounded-full text-sm font-medium hover:bg-cream transition-all duration-300"
                        >
                          Voltar
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={
                            !formData.nome ||
                            !formData.email ||
                            !formData.telefone ||
                            !formData.consent
                          }
                          className="cursor-pointer px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Revisar
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="font-serif text-xl font-semibold text-charcoal">
                        4. Confirmação
                      </h2>

                      <div className="bg-cream rounded-xl p-5 text-sm text-charcoal-light space-y-1">
                        <p>
                          <strong>Atendimento:</strong> Online
                        </p>
                        <p>
                          <strong>Data:</strong> {dataSelecionada?.label}
                        </p>
                        <p>
                          <strong>Horário:</strong> {formData.horario}
                        </p>
                        <p>
                          <strong>Nome:</strong> {formData.nome}
                        </p>
                        <p>
                          <strong>Telefone:</strong> {formData.telefone}
                        </p>
                      </div>

                      <div className="flex justify-between pt-2">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="cursor-pointer px-6 py-3 border border-charcoal/20 text-charcoal rounded-full text-sm font-medium hover:bg-cream transition-all duration-300"
                        >
                          Voltar
                        </button>
                        <button
                          type="submit"
                          className="cursor-pointer px-8 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Confirmar agendamento online
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}

              {!tipoSelecionado && (
                <p className="text-sm text-center text-charcoal-light">
                  Selecione um tipo de atendimento para continuar.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
