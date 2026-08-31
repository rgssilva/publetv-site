import Image from "next/image";
import { Reveal, RevealText } from "./Reveal";

const slides = [
  { src: "/loja-conveniencia.webp", alt: "Tela publeTV em loja de conveniência" },
  { src: "/posto-gasolina.webp", alt: "Tela publeTV em posto de gasolina" },
  { src: "/acougue.webp", alt: "Tela publeTV em açougue" },
  { src: "/academia.webp", alt: "Tela publeTV em academia" },
  { src: "/loja-suplementos.webp", alt: "Tela publeTV em loja de suplementos" },
  { src: "/farmacia.webp", alt: "Tela publeTV em farmácia" },
];

const track = [...slides, ...slides];

export function Hero() {
  return (
    <div>
      {/* Nav — fora do card do degradê */}
      <div className="flex items-center justify-between px-3 py-4 sm:px-6 sm:py-5">
        <Image
          src="/logo-publetv.webp"
          alt="publeTV"
          width={166}
          height={47}
          priority
          className="h-6 w-auto sm:h-7"
        />
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-sm text-white/70 md:flex">
          <a
            href="#diferencial"
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            Diferencial
          </a>
          <a
            href="#ecossistema"
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            Ecossistema
          </a>
          <a
            href="#segmentos"
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            Segmentos
          </a>
          <a
            href="#planos"
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            Planos
          </a>
        </nav>
        <a
          href="#contato"
          className="font-heading rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-white/90"
        >
          Falar com a gente
        </a>
      </div>

      {/* Card com degradê tipo luminária */}
      <div
        className="relative flex min-h-[560px] flex-col overflow-hidden rounded-[1.75rem] sm:min-h-[640px] sm:rounded-[2.5rem]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, var(--lamp) 0%, var(--lamp-core) 22%, var(--background) 68%)",
        }}
      >
        {/* Conteúdo central */}
        <div className="relative flex flex-col items-center px-5 pt-16 text-center sm:pt-24">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-cyan sm:text-sm">
            Mídia indoor premium
          </p>
          <h1 className="font-heading max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
            <RevealText text="Quem comunica bem," startIndex={0} />{" "}
            <Reveal index={3} className="text-cyan">
              vende
            </Reveal>{" "}
            <Reveal index={4} className="text-cyan">
              mais
            </Reveal>
            <span className="relative ml-2 inline-block h-9 w-9 align-[-0.2em] sm:h-11 sm:w-11">
              <span className="icon-arc absolute inset-0">
                <Image
                  src="/circle-cifra.webp"
                  alt=""
                  fill
                  sizes="44px"
                  className="icon-swap-a object-contain"
                />
                <Image
                  src="/circle-tv.webp"
                  alt=""
                  fill
                  sizes="44px"
                  className="icon-swap-b object-contain"
                />
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/70">
            Telas instaladas, conteúdo curado, marca em destaque. Mídia
            indoor premium pro seu negócio.
          </p>
          <div className="mt-8 flex flex-nowrap gap-3">
            {/* Leva ao preço, não direto ao Stripe: a RF-05 exige que valor,
                início da mensalidade e prazo estejam visíveis antes do clique
                de compra — e no hero eles não estão. */}
            <a
              href="#planos"
              className="font-heading whitespace-nowrap rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-navy-deep transition hover:brightness-110"
            >
              Quero a publeTV
            </a>
            <a
              href="#ecossistema"
              className="font-heading whitespace-nowrap rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Como funciona
            </a>
          </div>
        </div>

        {/* Carrossel em loop, entrando de baixo pra cima no load */}
        <div className="relative mt-auto overflow-hidden py-10 sm:py-14">
          <div className="marquee-mask marquee-rise">
            <div className="marquee-scroll flex w-max gap-5 px-5">
              {track.map((slide, i) => (
                <div
                  key={`${slide.src}-${i}`}
                  className="marquee-item-in relative h-32 w-52 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:h-40 sm:w-64"
                  style={{ animationDelay: `${(i % slides.length) * 70}ms` }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="256px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
