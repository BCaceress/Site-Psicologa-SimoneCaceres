"use client";

import { useEffect, useRef, useState } from "react";

type Opcao = {
  label: string;
  valor: string;
  destaque: string;
};

type Pergunta = {
  id: number;
  texto: string;
  opcoes: Opcao[];
};

type Resultado = {
  titulo: string;
  descricao: string;
  especialidade: string;
  mensagemWhatsApp: string;
};

type HistoricoQuiz = {
  especialidade: string;
  titulo: string;
  data: string;
};

const PERGUNTAS: Pergunta[] = [
  {
    id: 1,
    texto: "Como você tem se sentido nos últimos dias?",
    opcoes: [
      {
        label: "Ansioso(a) e com dificuldade de relaxar",
        valor: "ansiedade",
        destaque: "Ansioso(a)",
      },
      {
        label: "Triste, sem energia ou motivação",
        valor: "depressao",
        destaque: "Triste",
      },
      {
        label: "Esgotado(a) pelo trabalho ou rotina",
        valor: "burnout",
        destaque: "Esgotado(a)",
      },
      {
        label: "Bem, mas quero me conhecer melhor",
        valor: "desenvolvimento",
        destaque: "Bem",
      },
    ],
  },
  {
    id: 2,
    texto: "O que mais te atrapalha no dia a dia?",
    opcoes: [
      {
        label: "Pensamentos acelerados e preocupações constantes",
        valor: "ansiedade",
        destaque: "Pensamentos acelerados",
      },
      {
        label: "Falta de prazer nas coisas que antes gostava",
        valor: "depressao",
        destaque: "Falta de prazer",
      },
      {
        label: "Sensação de que não dou conta de tudo",
        valor: "burnout",
        destaque: "Não dou conta",
      },
      {
        label: "Relacionamentos difíceis ou autoestima baixa",
        valor: "desenvolvimento",
        destaque: "Relacionamentos difíceis",
      },
    ],
  },
  {
    id: 3,
    texto: "Como está o seu sono?",
    opcoes: [
      {
        label: "Difícil adormecer, mente não para",
        valor: "ansiedade",
        destaque: "Difícil adormecer",
      },
      {
        label: "Durmo demais ou não consigo sair da cama",
        valor: "depressao",
        destaque: "Durmo demais",
      },
      {
        label: "Acordo cansado(a), mesmo dormindo",
        valor: "burnout",
        destaque: "Acordo cansado(a)",
      },
      {
        label: "Sono razoável, mas às vezes preocupado(a)",
        valor: "desenvolvimento",
        destaque: "Sono razoável",
      },
    ],
  },
  {
    id: 4,
    texto: "O que você busca na terapia?",
    opcoes: [
      {
        label: "Aprender a controlar minha ansiedade",
        valor: "ansiedade",
        destaque: "Controlar minha ansiedade",
      },
      {
        label: "Encontrar leveza e vontade de viver",
        valor: "depressao",
        destaque: "Leveza e vontade de viver",
      },
      {
        label: "Recuperar minha energia e equilíbrio",
        valor: "burnout",
        destaque: "Recuperar minha energia",
      },
      {
        label: "Autoconhecimento e crescimento pessoal",
        valor: "desenvolvimento",
        destaque: "Autoconhecimento",
      },
    ],
  },
];

const WHATSAPP_NUMBER = "5551981428765";
const ETIQUETAS_NIVEL = ["Sinal inicial", "Atenção", "Olhar com carinho"];
const PESOS_PERGUNTAS = [2, 1, 1, 2];
const LOADING_MENSAGENS = [
  "Estamos preparando um retorno com base no que você compartilhou 💚",
  "Já percebemos alguns padrões nas suas respostas.",
  "Isso não substitui diagnóstico, mas ajuda a indicar um bom primeiro passo.",
];
const HISTORICO_STORAGE_KEY = "quiz-triagem-ultimo-resultado";

const ESPECIALIDADE_INFO: Record<
  string,
  { titulo: string; cor: string; corTexto: string }
> = {
  ansiedade: {
    titulo: "Ansiedade",
    cor: "#E8F5E9",
    corTexto: "#2E7D32",
  },
  depressao: {
    titulo: "Depressão",
    cor: "#E3F2FD",
    corTexto: "#1565C0",
  },
  burnout: {
    titulo: "Burnout",
    cor: "#FFF3E0",
    corTexto: "#E65100",
  },
  desenvolvimento: {
    titulo: "Desenvolvimento Pessoal",
    cor: "#F3E5F5",
    corTexto: "#6A1B9A",
  },
};

function criarMensagemWhatsApp(info: { titulo: string }) {
  return `Olá, Dra. Simone. Fiz o quiz e me identifiquei com questões relacionadas a ${info.titulo.toLowerCase()}. Gostaria de conversar melhor.`;
}

function criarResultadoFallback(info: { titulo: string }): Resultado {
  return {
    titulo: `Seu momento pede mais acolhimento`,
    descricao:
      "Você não está sozinho(a). Com base no que compartilhou, pode ser um bom momento para olhar com mais cuidado para o que está sentindo e encontrar apoio profissional com calma e acolhimento.",
    especialidade: info.titulo,
    mensagemWhatsApp: criarMensagemWhatsApp(info),
  };
}

function formatarOpcao(label: string, destaque: string) {
  const indice = label.indexOf(destaque);

  if (indice === -1) {
    return (
      <span>
        <strong className="font-semibold text-charcoal">{label}</strong>
      </span>
    );
  }

  const antes = label.slice(0, indice);
  const depois = label.slice(indice + destaque.length);

  return (
    <span className="block leading-relaxed">
      {antes}
      <strong className="font-semibold text-charcoal">{destaque}</strong>
      {depois}
    </span>
  );
}

function obterMensagemProgresso(indicePergunta: number) {
  if (indicePergunta === 1) {
    return "Você está indo bem 💚";
  }

  if (indicePergunta === 2) {
    return "Faltam só 2 perguntas.";
  }

  if (indicePergunta === 3) {
    return "Falta só 1 pergunta.";
  }

  return "Vamos começar com calma.";
}

export default function QuizTriagem() {
  const [etapa, setEtapa] = useState<
    "intro" | "quiz" | "carregando" | "resultado"
  >("intro");
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<string[]>([]);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState("");
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null);
  const [loadingMensagemIndex, setLoadingMensagemIndex] = useState(0);
  const [, setHistorico] = useState<HistoricoQuiz | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const historicoSalvo = window.localStorage.getItem(HISTORICO_STORAGE_KEY);
    if (!historicoSalvo) {
      return null;
    }

    try {
      return JSON.parse(historicoSalvo) as HistoricoQuiz;
    } catch {
      window.localStorage.removeItem(HISTORICO_STORAGE_KEY);
      return null;
    }
  });

  const avancandoRef = useRef(false);
  const timeoutRespostaRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const areaQuizRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (etapa !== "carregando") {
      return;
    }

    const interval = window.setInterval(() => {
      setLoadingMensagemIndex(
        (atual) => (atual + 1) % LOADING_MENSAGENS.length,
      );
    }, 1600);

    return () => window.clearInterval(interval);
  }, [etapa]);

  useEffect(() => {
    return () => {
      if (timeoutRespostaRef.current) {
        clearTimeout(timeoutRespostaRef.current);
      }
    };
  }, []);

  function especialidadeDominante(resps: string[]): string {
    const contagem: Record<string, number> = {};

    resps.forEach((resposta, indice) => {
      const peso = PESOS_PERGUNTAS[indice] ?? 1;
      contagem[resposta] = (contagem[resposta] ?? 0) + peso;
    });

    return (
      Object.entries(contagem).sort((a, b) => b[1] - a[1])[0]?.[0] ??
      "desenvolvimento"
    );
  }

  function obterNivel(resps: string[], especialidade: string) {
    const pontos = resps.reduce((total, resposta, indice) => {
      if (resposta !== especialidade) {
        return total;
      }

      return total + (PESOS_PERGUNTAS[indice] ?? 1);
    }, 0);

    if (pontos >= 5) {
      return ETIQUETAS_NIVEL[2];
    }

    if (pontos >= 3) {
      return ETIQUETAS_NIVEL[1];
    }

    return ETIQUETAS_NIVEL[0];
  }

  async function responder(valor: string) {
    const novasRespostas = [...respostas];
    novasRespostas[perguntaAtual] = valor;

    setRespostas(novasRespostas);
    setOpcaoSelecionada(null);
    avancandoRef.current = false;

    if (perguntaAtual < PERGUNTAS.length - 1) {
      const proximaPergunta = perguntaAtual + 1;
      setPerguntaAtual(proximaPergunta);
      window.setTimeout(() => {
        areaQuizRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 50);
      return;
    }

    setLoadingMensagemIndex(0);
    setEtapa("carregando");

    const especialidade = especialidadeDominante(novasRespostas);
    const info = ESPECIALIDADE_INFO[especialidade];
    const nivel = obterNivel(novasRespostas, especialidade);

    const resumoRespostas = PERGUNTAS.map((pergunta, indice) => {
      const opcao = pergunta.opcoes.find(
        (item) => item.valor === novasRespostas[indice],
      );
      const peso = PESOS_PERGUNTAS[indice] ?? 1;
      return `- Pergunta ${indice + 1} (peso ${peso}) - ${pergunta.texto}: "${opcao?.label ?? novasRespostas[indice]}"`;
    }).join("\n");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Você é um assistente empático de um consultório de psicologia clínica da Dra. Simone Caceres (CRP 07/31309), em Esteio - RS.

Com base nas respostas de um quiz de triagem, crie um resultado personalizado, acolhedor e emocionalmente seguro em JSON.

Regras:
- Não diagnostique.
- Use linguagem humana, calorosa e profissional.
- Normalize a experiência com frases no espírito de "você não está sozinho(a)" ou "isso é mais comum do que parece".
- Indique que a terapia pode ser um primeiro passo cuidadoso.
- A mensagem de WhatsApp deve soar natural e emocional, não técnica.

Retorne APENAS JSON válido, sem markdown, sem explicações, com este formato exato:
{
  "titulo": "Título curto e acolhedor (máx 8 palavras)",
  "descricao": "Parágrafo empático de 2-3 frases explicando o que a pessoa pode estar sentindo, trazendo normalização emocional e como a terapia pode ajudar. Tom: cálido, profissional, sem diagnóstico.",
  "especialidade": "${info.titulo}",
  "mensagemWhatsApp": "Mensagem pré-preenchida para WhatsApp (máx 200 caracteres) começando com 'Olá, Dra. Simone.'"
}`,
          messages: [
            {
              role: "user",
              content: `Respostas do quiz:\n${resumoRespostas}\n\nEspecialidade identificada: ${info.titulo}\nNível percebido: ${nivel}`,
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok || data?.error) {
        const fallback = criarResultadoFallback(info);
        setResultado(fallback);
        setHistorico({
          especialidade: fallback.especialidade,
          titulo: fallback.titulo,
          data: new Date().toISOString(),
        });
        window.localStorage.setItem(
          HISTORICO_STORAGE_KEY,
          JSON.stringify({
            especialidade: fallback.especialidade,
            titulo: fallback.titulo,
            data: new Date().toISOString(),
          } satisfies HistoricoQuiz),
        );
        setEtapa("resultado");
        return;
      }

      const text = data.content?.[0]?.text ?? "";

      let parsed: Resultado;
      try {
        parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      } catch {
        parsed = criarResultadoFallback(info);
      }

      if (!parsed.mensagemWhatsApp?.startsWith("Olá, Dra. Simone.")) {
        parsed.mensagemWhatsApp = criarMensagemWhatsApp(info);
      }

      setResultado(parsed);

      const novoHistorico = {
        especialidade: parsed.especialidade,
        titulo: parsed.titulo,
        data: new Date().toISOString(),
      } satisfies HistoricoQuiz;

      setHistorico(novoHistorico);
      window.localStorage.setItem(
        HISTORICO_STORAGE_KEY,
        JSON.stringify(novoHistorico),
      );
      setEtapa("resultado");
    } catch {
      setErro(
        "Não conseguimos gerar o resultado agora. Tente novamente em instantes.",
      );
      setEtapa("resultado");
    }
  }

  function selecionarOpcao(valor: string) {
    if (avancandoRef.current) {
      return;
    }

    avancandoRef.current = true;
    setOpcaoSelecionada(valor);

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(20);
    }

    if (timeoutRespostaRef.current) {
      clearTimeout(timeoutRespostaRef.current);
    }

    timeoutRespostaRef.current = setTimeout(() => {
      void responder(valor);
    }, 400);
  }

  function voltarPergunta() {
    if (timeoutRespostaRef.current) {
      clearTimeout(timeoutRespostaRef.current);
      timeoutRespostaRef.current = null;
    }

    avancandoRef.current = false;
    setOpcaoSelecionada(null);
    setPerguntaAtual((atual) => Math.max(atual - 1, 0));
  }

  function reiniciar() {
    if (timeoutRespostaRef.current) {
      clearTimeout(timeoutRespostaRef.current);
      timeoutRespostaRef.current = null;
    }

    avancandoRef.current = false;
    setEtapa("intro");
    setPerguntaAtual(0);
    setRespostas([]);
    setResultado(null);
    setErro("");
    setOpcaoSelecionada(null);
  }

  const progresso = ((perguntaAtual + 1) / PERGUNTAS.length) * 100;
  const respostaAtual = respostas[perguntaAtual] ?? null;
  const especialidadeFinal = resultado?.especialidade
    ? Object.entries(ESPECIALIDADE_INFO).find(
        ([, valor]) => valor.titulo === resultado.especialidade,
      )?.[1]
    : null;
  return (
    <section className="py-20 lg:py-32 bg-off-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-sm tracking-[0.3em] uppercase text-sage-dark mb-3 font-medium">
            Autoconhecimento
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal mb-4 leading-tight">
            Por onde começar?
          </h2>
          <p className="text-charcoal-light leading-relaxed">
            Responda 4 perguntas rápidas e descubra qual área pode te ajudar
            mais.
          </p>
        </div>

        <div
          ref={areaQuizRef}
          className="bg-white rounded-2xl shadow-sm border border-cream-dark/20 overflow-hidden"
        >
          {etapa === "intro" && (
            <div className="p-8 lg:p-10 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-sage/15 border border-sage/20 shadow-sm">
                <svg
                  className="h-14 w-14"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="32" cy="32" r="30" fill="#9DB798" />
                  <path
                    d="M32 16C26.75 16 22.5 20.25 22.5 25.5C22.5 30.75 26.75 35 32 35C37.25 35 41.5 30.75 41.5 25.5C41.5 20.25 37.25 16 32 16Z"
                    fill="white"
                  />
                  <path
                    d="M18 47.5C18 40.6 23.6 35 30.5 35H33.5C40.4 35 46 40.6 46 47.5V49H18V47.5Z"
                    fill="white"
                  />
                  <path
                    d="M42 18.5H49.5C52.54 18.5 55 20.96 55 24V29C55 32.04 52.54 34.5 49.5 34.5H47V39L42.5 34.5H42C38.96 34.5 36.5 32.04 36.5 29V24C36.5 20.96 38.96 18.5 42 18.5Z"
                    fill="#F6F3EE"
                  />
                  <path
                    d="M41.5 26.5H50"
                    stroke="#9DB798"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M41.5 30H47.5"
                    stroke="#9DB798"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-charcoal mb-3">
                Descubra seu perfil emocional
              </h3>
              <p className="text-sm font-medium text-sage-dark mb-3">
                Mais de 200 pessoas já fizeram esse teste.
              </p>
              <p className="text-sm text-charcoal-light max-w-md mx-auto mb-2">
                Não existe resposta certa ou errada. É só um primeiro passo para
                entender melhor o que você está vivendo agora.
              </p>
              <p className="text-xs text-warm-gray mb-6">
                Não é um diagnóstico, e sim um ponto de partida para a sua
                jornada.
              </p>

              <button
                onClick={() => setEtapa("quiz")}
                className="px-8 py-4 bg-sage text-white rounded-full font-medium hover:bg-sage-dark transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Começar agora →
              </button>
            </div>
          )}

          {etapa === "quiz" && (
            <div className="px-8 pb-8 pt-3 lg:px-10 lg:pb-10 lg:pt-4">
              <div className="mb-8">
                <div className="flex items-center justify-between gap-3 text-xs text-warm-gray mb-2">
                  <span>
                    Pergunta {perguntaAtual + 1} de {PERGUNTAS.length}
                  </span>
                  <span>{Math.round(progresso)}%</span>
                </div>
                <div className="h-1.5 bg-cream-dark/30 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-sage rounded-full transition-all duration-500"
                    style={{ width: `${progresso}%` }}
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-sage-dark font-medium">
                    {obterMensagemProgresso(perguntaAtual)}
                  </p>
                  {perguntaAtual > 0 && (
                    <button
                      onClick={voltarPergunta}
                      className="inline-flex items-center gap-2 rounded-full border border-cream-dark/50 px-3 py-1.5 text-sm text-charcoal-light hover:border-sage/40 hover:bg-sage/5 hover:text-sage-dark transition-all duration-300"
                    >
                      <span
                        aria-hidden="true"
                        className="text-base leading-none"
                      >
                        ←
                      </span>
                      <span>Voltar</span>
                    </button>
                  )}
                </div>
              </div>

              <p className="font-serif text-xl font-semibold text-charcoal mb-6 leading-snug">
                {PERGUNTAS[perguntaAtual].texto}
              </p>

              <div className="space-y-3">
                {PERGUNTAS[perguntaAtual].opcoes.map((opcao) => {
                  const ativa = opcaoSelecionada === opcao.valor;
                  const respondida = respostaAtual === opcao.valor;

                  return (
                    <button
                      key={`${PERGUNTAS[perguntaAtual].id}-${opcao.valor}`}
                      onClick={() => selecionarOpcao(opcao.valor)}
                      className={`w-full text-left p-4 rounded-xl border-2 text-sm transition-all duration-300 cursor-pointer ${
                        ativa || respondida
                          ? "border-sage bg-sage/10 shadow-sm -translate-y-0.5"
                          : "border-cream-dark/30 text-charcoal hover:border-sage hover:bg-sage/5 hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-charcoal-light">
                          {formatarOpcao(opcao.label, opcao.destaque)}
                        </div>
                        <span
                          className={`mt-1 h-5 w-5 rounded-full border transition-all duration-300 shrink-0 ${
                            ativa || respondida
                              ? "border-sage bg-sage"
                              : "border-charcoal/20"
                          }`}
                        >
                          {(ativa || respondida) && (
                            <span className="block w-full h-full rounded-full border-4 border-white" />
                          )}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {etapa === "carregando" && (
            <div className="p-8 lg:p-10 text-center py-16">
              <div className="w-12 h-12 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border-2 border-sage/20" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-sage animate-spin" />
              </div>
              <p className="font-serif text-lg text-charcoal mb-2">
                Estamos analisando com carinho...
              </p>
              <p className="text-sm text-warm-gray max-w-md mx-auto transition-all duration-300">
                {LOADING_MENSAGENS[loadingMensagemIndex]}
              </p>
            </div>
          )}

          {etapa === "resultado" && (
            <div className="p-8 lg:p-10">
              {erro ? (
                <div className="text-center py-8">
                  <p className="text-sm text-terracotta mb-4">{erro}</p>
                  <button
                    onClick={reiniciar}
                    className="text-sm text-sage-dark underline"
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : resultado ? (
                <>
                  <div className="flex justify-end mb-3">
                    {especialidadeFinal && (
                      <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
                        style={{
                          background: especialidadeFinal.cor,
                          color: especialidadeFinal.corTexto,
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: especialidadeFinal.corTexto }}
                        />
                        {resultado.especialidade}
                      </div>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-charcoal mb-4 leading-snug">
                    {resultado.titulo}
                  </h3>

                  <p className="text-charcoal-light leading-relaxed mb-4 text-sm">
                    {resultado.descricao}
                  </p>

                  <div className="rounded-2xl bg-sage/8 border border-sage/15 p-4 mb-8">
                    <p className="text-xs text-charcoal leading-relaxed mb-2">
                      Você não está sozinho(a). Isso é mais comum do que parece.
                    </p>
                    <p className="text-xs text-charcoal-light leading-relaxed">
                      Um primeiro passo pode fazer diferença, e conversar agora
                      pode trazer mais clareza sobre o que você está sentindo.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(resultado.mensagemWhatsApp)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Quero conversar sobre isso agora
                    </a>
                    <a
                      href="/agendamento"
                      className="flex-1 inline-flex items-center justify-center px-6 py-3.5 border-2 border-charcoal/20 text-charcoal rounded-full text-sm font-medium hover:border-sage hover:text-sage-dark transition-all duration-300"
                    >
                      Ver horários disponíveis
                    </a>
                  </div>

                  <button
                    onClick={reiniciar}
                    className="block mx-auto mt-6 text-xs text-warm-gray hover:text-charcoal transition-colors underline"
                  >
                    Refazer o quiz
                  </button>

                  <p className="text-center text-xs text-warm-gray/70 mt-4">
                    Este quiz não constitui diagnóstico clínico. É apenas um
                    guia de orientação.
                  </p>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
