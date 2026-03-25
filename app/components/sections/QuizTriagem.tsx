"use client";

import { useState } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Pergunta = {
  id: number;
  texto: string;
  opcoes: { label: string; valor: string }[];
};

type Resultado = {
  titulo: string;
  descricao: string;
  especialidade: string;
  mensagemWhatsApp: string;
};

// ─── Dados do quiz ────────────────────────────────────────────────────────────

const PERGUNTAS: Pergunta[] = [
  {
    id: 1,
    texto: "Como você tem se sentido nos últimos dias?",
    opcoes: [
      { label: "Ansioso(a) e com dificuldade de relaxar", valor: "ansiedade" },
      { label: "Triste, sem energia ou motivação", valor: "depressao" },
      { label: "Esgotado(a) pelo trabalho ou rotina", valor: "burnout" },
      { label: "Bem, mas quero me conhecer melhor", valor: "desenvolvimento" },
    ],
  },
  {
    id: 2,
    texto: "O que mais te atrapalha no dia a dia?",
    opcoes: [
      { label: "Pensamentos acelerados e preocupações constantes", valor: "ansiedade" },
      { label: "Falta de prazer nas coisas que antes gostava", valor: "depressao" },
      { label: "Sensação de que não dou conta de tudo", valor: "burnout" },
      { label: "Relacionamentos difíceis ou autoestima baixa", valor: "desenvolvimento" },
    ],
  },
  {
    id: 3,
    texto: "Como está o seu sono?",
    opcoes: [
      { label: "Difícil adormecer, mente não para", valor: "ansiedade" },
      { label: "Durmo demais ou não consigo sair da cama", valor: "depressao" },
      { label: "Acordo cansado(a), mesmo dormindo", valor: "burnout" },
      { label: "Sono razoável, mas às vezes preocupado(a)", valor: "desenvolvimento" },
    ],
  },
  {
    id: 4,
    texto: "O que você busca na terapia?",
    opcoes: [
      { label: "Aprender a controlar minha ansiedade", valor: "ansiedade" },
      { label: "Encontrar leveza e vontade de viver", valor: "depressao" },
      { label: "Recuperar minha energia e equilíbrio", valor: "burnout" },
      { label: "Autoconhecimento e crescimento pessoal", valor: "desenvolvimento" },
    ],
  },
];

const WHATSAPP_NUMBER = "5551981428765";

// ─── Mapeamento de especialidade → info ──────────────────────────────────────

const ESPECIALIDADE_INFO: Record<string, { titulo: string; cor: string; corTexto: string }> = {
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

function criarResultadoFallback(info: { titulo: string }): Resultado {
  return {
    titulo: `Você pode estar precisando de apoio com ${info.titulo}`,
    descricao:
      "Com base nas suas respostas, este pode ser um momento importante para olhar com mais cuidado para o que você está sentindo. A terapia pode oferecer um espaço seguro, acolhedor e profissional para esse processo.",
    especialidade: info.titulo,
    mensagemWhatsApp: `Olá, Dra. Simone! Fiz o quiz no site e gostaria de conversar sobre ${info.titulo}.`,
  };
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function QuizTriagem() {
  const [etapa, setEtapa] = useState<"intro" | "quiz" | "carregando" | "resultado">("intro");
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<string[]>([]);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState("");

  // ── Contagem de votos por especialidade ────────────────────────────────────

  function especialidadeDominante(resps: string[]): string {
    const contagem: Record<string, number> = {};
    resps.forEach((r) => {
      contagem[r] = (contagem[r] ?? 0) + 1;
    });
    return Object.entries(contagem).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "desenvolvimento";
  }

  // ── Responder pergunta ──────────────────────────────────────────────────────

  async function responder(valor: string) {
    const novasRespostas = [...respostas, valor];
    setRespostas(novasRespostas);

    if (perguntaAtual < PERGUNTAS.length - 1) {
      setPerguntaAtual((prev) => prev + 1);
      return;
    }

    // Última resposta — gerar resultado com IA
    setEtapa("carregando");

    const especialidade = especialidadeDominante(novasRespostas);
    const info = ESPECIALIDADE_INFO[especialidade];

    const resumoRespostas = PERGUNTAS.map((p, i) => {
      const opcao = p.opcoes.find((o) => o.valor === novasRespostas[i]);
      return `- ${p.texto}: "${opcao?.label ?? novasRespostas[i]}"`;
    }).join("\n");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Você é um assistente empático de um consultório de psicologia clínica da Dra. Simone Caceres (CRP 07/31309), em Esteio - RS.

Com base nas respostas de um quiz de triagem, crie um resultado personalizado e acolhedor em JSON.

Retorne APENAS JSON válido, sem markdown, sem explicações, com este formato exato:
{
  "titulo": "Título curto e acolhedor (máx 8 palavras)",
  "descricao": "Parágrafo empático de 2-3 frases explicando o que a pessoa pode estar sentindo e como a terapia pode ajudar. Tom: cálido, profissional, sem diagnóstico.",
  "especialidade": "${info.titulo}",
  "mensagemWhatsApp": "Mensagem pré-preenchida para WhatsApp (máx 200 caracteres) começando com 'Olá, Dra. Simone'"
}`,
          messages: [
            {
              role: "user",
              content: `Respostas do quiz:\n${resumoRespostas}\n\nEspecialidade identificada: ${info.titulo}`,
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok || data?.error) {
        setResultado(criarResultadoFallback(info));
        setEtapa("resultado");
        return;
      }

      const text = data.content?.[0]?.text ?? "";

      let parsed: Resultado;
      try {
        parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      } catch {
        // Fallback caso o JSON venha malformado
        parsed = {
          titulo: `Você pode estar precisando de apoio com ${info.titulo}`,
          descricao:
            "Com base nas suas respostas, parece que você está passando por um momento desafiador. A terapia pode ser um espaço seguro para você explorar esses sentimentos com suporte profissional.",
          especialidade: info.titulo,
          mensagemWhatsApp: `Olá, Dra. Simone! Fiz o quiz no site e gostaria de conversar sobre ${info.titulo}.`,
        };
      }

      setResultado(parsed);
      setEtapa("resultado");
    } catch {
      setErro("Não conseguimos gerar o resultado agora. Tente novamente em instantes.");
      setEtapa("resultado");
    }
  }

  function reiniciar() {
    setEtapa("intro");
    setPerguntaAtual(0);
    setRespostas([]);
    setResultado(null);
    setErro("");
  }

  const progresso = ((perguntaAtual) / PERGUNTAS.length) * 100;
  const especialidadeFinal = resultado?.especialidade
    ? Object.entries(ESPECIALIDADE_INFO).find(
        ([, v]) => v.titulo === resultado.especialidade
      )?.[1]
    : null;

  return (
    <section className="py-20 lg:py-32 bg-off-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm tracking-[0.3em] uppercase text-sage-dark mb-3 font-medium">
            Autoconhecimento
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal mb-4 leading-tight">
            Por onde começar?
          </h2>
          <p className="text-charcoal-light leading-relaxed">
            Responda 4 perguntas rápidas e descubra qual área pode te ajudar mais.
          </p>
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-sm border border-cream-dark/20 overflow-hidden">

          {/* ── INTRO ── */}
          {etapa === "intro" && (
            <div className="p-8 lg:p-10 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-sage/10 flex items-center justify-center text-sage-dark mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-charcoal mb-3">
                Descubra seu perfil emocional
              </h3>
              <p className="text-charcoal-light leading-relaxed mb-2 max-w-sm mx-auto">
                4 perguntas • 1 minuto • resultado personalizado com IA
              </p>
              <p className="text-xs text-warm-gray mb-8">
                Não é um diagnóstico — é um ponto de partida para a sua jornada.
              </p>
              <button
                onClick={() => setEtapa("quiz")}
                className="px-8 py-4 bg-sage text-white rounded-full font-medium hover:bg-sage-dark transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Começar agora →
              </button>
            </div>
          )}

          {/* ── QUIZ ── */}
          {etapa === "quiz" && (
            <div className="p-8 lg:p-10">
              {/* Barra de progresso */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-warm-gray mb-2">
                  <span>Pergunta {perguntaAtual + 1} de {PERGUNTAS.length}</span>
                  <span>{Math.round(progresso)}%</span>
                </div>
                <div className="h-1 bg-cream-dark/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sage rounded-full transition-all duration-500"
                    style={{ width: `${progresso}%` }}
                  />
                </div>
              </div>

              {/* Pergunta */}
              <p className="font-serif text-xl font-semibold text-charcoal mb-6 leading-snug">
                {PERGUNTAS[perguntaAtual].texto}
              </p>

              {/* Opções */}
              <div className="space-y-3">
                {PERGUNTAS[perguntaAtual].opcoes.map((opcao) => (
                  <button
                    key={opcao.valor}
                    onClick={() => responder(opcao.valor)}
                    className="w-full text-left p-4 rounded-xl border-2 border-cream-dark/30 text-charcoal text-sm leading-relaxed hover:border-sage hover:bg-sage/5 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    {opcao.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── CARREGANDO ── */}
          {etapa === "carregando" && (
            <div className="p-8 lg:p-10 text-center py-16">
              <div className="w-12 h-12 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border-2 border-sage/20" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-sage animate-spin" />
              </div>
              <p className="font-serif text-lg text-charcoal mb-2">Analisando suas respostas…</p>
              <p className="text-sm text-warm-gray">Preparando seu resultado personalizado</p>
            </div>
          )}

          {/* ── RESULTADO ── */}
          {etapa === "resultado" && (
            <div className="p-8 lg:p-10">
              {erro ? (
                <div className="text-center py-8">
                  <p className="text-sm text-terracotta mb-4">{erro}</p>
                  <button onClick={reiniciar} className="text-sm text-sage-dark underline">
                    Tentar novamente
                  </button>
                </div>
              ) : resultado ? (
                <>
                  {/* Badge da especialidade */}
                  {especialidadeFinal && (
                    <div
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
                      style={{
                        background: especialidadeFinal.cor,
                        color: especialidadeFinal.corTexto,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: especialidadeFinal.corTexto }} />
                      {resultado.especialidade}
                    </div>
                  )}

                  {/* Título */}
                  <h3 className="font-serif text-2xl font-semibold text-charcoal mb-4 leading-snug">
                    {resultado.titulo}
                  </h3>

                  {/* Descrição */}
                  <p className="text-charcoal-light leading-relaxed mb-8 text-sm">
                    {resultado.descricao}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(resultado.mensagemWhatsApp)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Falar com a Dra. Simone
                    </a>
                    <a
                      href="/agendamento"
                      className="flex-1 inline-flex items-center justify-center px-6 py-3.5 border-2 border-charcoal/20 text-charcoal rounded-full text-sm font-medium hover:border-sage hover:text-sage-dark transition-all duration-300"
                    >
                      Agendar consulta
                    </a>
                  </div>

                  {/* Recomeçar */}
                  <button
                    onClick={reiniciar}
                    className="block mx-auto mt-6 text-xs text-warm-gray hover:text-charcoal transition-colors underline"
                  >
                    Refazer o quiz
                  </button>

                  {/* Disclaimer */}
                  <p className="text-center text-xs text-warm-gray/70 mt-4">
                    Este quiz não constitui diagnóstico clínico. É apenas um guia de orientação.
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
