import Image from "next/image";
import { Hero } from "./components/Hero";
import { RevealText } from "./components/Reveal";
import { AvisoCobranca, ResumoCobranca } from "./components/AvisoCobranca";
import { CheckoutButton } from "./components/CheckoutButton";
import { EMAIL_CONTATO } from "./lib/contato";

const estabelecimentos = [
  { src: "/academia.webp", nome: "Academias" },
  { src: "/farmacia.webp", nome: "Farmácias" },
  { src: "/acougue.webp", nome: "Açougues" },
  { src: "/loja-suplementos.webp", nome: "Lojas de suplementos" },
  { src: "/loja-conveniencia.webp", nome: "Lojas de conveniência" },
  { src: "/posto-gasolina.webp", nome: "Postos de combustível" },
];

const estabelecimentosTrack = [...estabelecimentos, ...estabelecimentos];

const ecossistema = [
  {
    numero: "01",
    titulo: "Instalação das telas",
    desc: "Equipamento instalado no ponto certo do seu espaço, pensado pra ser visto sem competir com a operação do dia a dia.",
  },
  {
    numero: "02",
    titulo: "Curadoria e adaptação de conteúdo",
    desc: "Seu conteúdo — promoção, serviço, diferencial — adaptado em slides que comunicam valor de forma clara e atraente, não genérica.",
  },
  {
    numero: "03",
    titulo: "Exibição e gestão contínua",
    desc: "As mídias rodam, se atualizam e continuam representando sua marca com o mesmo padrão todos os dias.",
  },
];

function IconVisibilidade() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
    >
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconComunicacao() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
    >
      <path
        d="M3 11v2a2 2 0 0 0 2 2h1l3 5V4l-3 5H5a2 2 0 0 0-2 2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 8a4 4 0 0 1 0 8" strokeLinecap="round" />
      <path d="M17 5a8 8 0 0 1 0 14" strokeLinecap="round" />
    </svg>
  );
}

function IconMarca() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
    >
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const possibilidades = [
  {
    Icone: IconVisibilidade,
    titulo: "Visibilidade no momento certo",
    desc: "Sua oferta aparece exatamente quando o cliente decide comprar.",
  },
  {
    Icone: IconComunicacao,
    titulo: "Comunicação que não para",
    desc: "A tela trabalha por você o dia inteiro, sem esforço extra.",
  },
  {
    Icone: IconMarca,
    titulo: "Marca em outro nível",
    desc: "Presença visual que muda como seu negócio é percebido.",
  },
];

const depoimentos = [
  {
    inicial: "A",
    segmento: "Academia",
    nome: "Cliente piloto — Academia",
    texto: "Depoimento real entra aqui assim que o piloto for concluído.",
  },
  {
    inicial: "F",
    segmento: "Farmácia",
    nome: "Cliente piloto — Farmácia",
    texto: "Depoimento real entra aqui assim que o piloto for concluído.",
  },
  {
    inicial: "R",
    segmento: "Restaurante",
    nome: "Cliente piloto — Restaurante",
    texto: "Depoimento real entra aqui assim que o piloto for concluído.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="px-1.5 pt-1.5 sm:px-2 sm:pt-2">
        <Hero />
      </section>

      <main className="flex-1">
        {/* Diferencial */}
        <section id="diferencial" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
            <div>
              <p className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                Por que a publeTV
              </p>
              <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
                <RevealText text="Ninguém compra o que não conhece." />
              </h2>
              <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-3xl">
                <Image
                  src="/sobre.webp"
                  alt="Cliente vendo ofertas exibidas na tela publeTV dentro da loja"
                  fill
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 25%" }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-10">
              <div className="max-w-xl space-y-5 text-lg leading-8 text-[#EEEEEE]">
                <p>
                  A maior parte da venda perdida no varejo não é sobre preço,
                  nem sobre concorrência. É sobre visibilidade: o cliente não
                  sabia daquela oferta no momento exato da decisão.
                </p>
                <p>
                  Direcionar essa decisão na hora certa, dentro da loja, é o
                  papel da comunicação. É exatamente esse o papel da publeTV:
                  transformar cada tela do seu espaço no ponto de venda que
                  fala pelo seu negócio, no momento certo.
                </p>
              </div>
              <dl className="grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
                {possibilidades.map((p) => (
                  <div
                    key={p.titulo}
                    className="rounded-2xl border border-border bg-surface p-6 text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-cyan">
                      <p.Icone />
                    </div>
                    <dt className="mt-4 font-heading text-sm font-semibold text-cyan">
                      {p.titulo}
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-[#EEEEEE]">
                      {p.desc}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Segmentos */}
        <section id="segmentos" className="pb-24 sm:pb-32">
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan">
              Pra quem é
            </p>
            <h2 className="font-heading max-w-2xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              <RevealText text="Feito pra negócios que já têm movimento e querem ser vistos à altura dele." />
            </h2>
          </div>

          <div className="marquee-mask mt-14 overflow-hidden">
            <div
              className="marquee-scroll flex w-max gap-6 px-6"
              style={{ animationDuration: "44s", animationDelay: "0ms" }}
            >
              {estabelecimentosTrack.map((item, i) => (
                <div
                  key={`${item.src}-${i}`}
                  className="relative aspect-video w-80 shrink-0 overflow-hidden rounded-3xl sm:w-[28rem]"
                >
                  <Image
                    src={item.src}
                    alt={`Tela publeTV em ${item.nome.toLowerCase()}`}
                    fill
                    sizes="448px"
                    className="object-cover"
                  />
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
                  <span
                    className="font-heading absolute bottom-6 left-5 text-sm font-semibold uppercase tracking-widest text-white sm:text-base"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {item.nome}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section id="depoimentos" className="mx-auto max-w-6xl px-6 pb-24 sm:pb-32">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan">
            Quem já testou
          </p>
          <h2 className="font-heading max-w-2xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            <RevealText text="Clientes piloto já rodando a publeTV a um custo reduzido." />
          </h2>
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {depoimentos.map((dep) => (
              <div
                key={dep.nome}
                className="flex flex-col rounded-3xl border border-border bg-surface p-8"
              >
                <p className="flex-1 text-lg leading-7 text-muted">
                  &ldquo;{dep.texto}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
                  <span className="font-heading flex h-10 w-10 items-center justify-center rounded-full bg-cyan/10 text-sm font-semibold text-cyan">
                    {dep.inicial}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {dep.nome}
                    </p>
                    <p className="text-xs text-muted">{dep.segmento}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ecossistema */}
        <section className="px-1.5 pb-1.5 sm:px-2 sm:pb-2">
          <div
            id="ecossistema"
            className="rounded-[1.75rem] bg-navy px-6 py-16 sm:rounded-[2.5rem] sm:px-10 sm:py-24"
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan">
              O ecossistema
            </p>
            <h2 className="font-heading max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              <RevealText text="Do equipamento ao que aparece na tela — tudo cuidado por nós." />
            </h2>
            <div className="mt-14 divide-y divide-white/10 border-t border-white/10">
              {ecossistema.map((item) => (
                <div
                  key={item.numero}
                  className="grid gap-2 py-8 sm:grid-cols-[3rem_1fr_2fr] sm:items-baseline sm:gap-8"
                >
                  <span className="text-sm font-semibold text-cyan">
                    {item.numero}
                  </span>
                  <h3 className="font-heading text-xl font-semibold text-white">
                    {item.titulo}
                  </h3>
                  <p className="leading-7 text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Planos */}
        <section id="planos" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan">
              Quanto custa
            </p>
            <h2 className="font-heading mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              <RevealText text="Um aparelho, uma assinatura, nenhuma surpresa." />
            </h2>
          </div>

          <div className="mx-auto mt-14 max-w-xl rounded-3xl border border-border bg-surface p-6 sm:p-10">
            <div className="text-center">
              <h3 className="font-heading text-xl font-semibold text-foreground">
                TV Box publeTV + assinatura
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                O aparelho é seu. A assinatura mantém as telas rodando, com
                curadoria e atualização do conteúdo todos os dias.
              </p>
            </div>

            <div className="mt-8">
              <AvisoCobranca />
            </div>

            <div className="mt-8 text-center">
              <CheckoutButton origem="planos" className="w-full sm:w-auto" />
              <p className="mt-4 text-xs leading-5 text-muted">
                Você vai para o checkout seguro do Stripe para concluir o
                pagamento.
              </p>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section id="contato" className="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
          <h2 className="font-heading mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            <RevealText text="Vamos colocar sua marca na tela certa, do jeito certo." />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted">
            A tela, o conteúdo e a gestão — tudo pronto pra funcionar assim que
            a TV Box chegar.
          </p>

          <ResumoCobranca className="mx-auto mt-8 max-w-xl" />

          <div className="mt-8 flex flex-col items-center gap-5">
            <CheckoutButton origem="final" />
            <a
              href={`mailto:${EMAIL_CONTATO}`}
              className="text-sm text-muted underline underline-offset-4 transition hover:text-foreground"
            >
              Prefere conversar antes? Fale com a publeTV
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted sm:flex-row">
          <span className="font-heading">
            publi<span className="text-cyan font-semibold">TV</span> — mídia
            indoor premium
          </span>
          <span>© {new Date().getFullYear()} publeTV. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
}
