import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AvisoCobranca } from "../components/AvisoCobranca";
import { LABEL_SUPORTE, LINK_SUPORTE } from "../lib/contato";
import { PurchaseTracker } from "./PurchaseTracker";

export const metadata: Metadata = {
  title: "Pedido confirmado — publeTV",
  description: "Confirmação da sua compra da TV Box publeTV.",
  // URL de retorno do checkout: não faz sentido em busca e pode vazar
  // parâmetros de sessão no índice.
  robots: { index: false, follow: false },
};

function IconCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-7 w-7"
    >
      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Obrigado() {
  return (
    <div className="flex flex-1 flex-col">
      <PurchaseTracker />

      <header className="px-3 py-4 sm:px-6 sm:py-5">
        <Link href="/" className="inline-block">
          <Image
            src="/logo-publetv.webp"
            alt="publeTV"
            width={166}
            height={47}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>
      </header>

      <main className="mx-auto w-full max-w-xl flex-1 px-6 pb-24 pt-10 sm:pt-16">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-cyan">
            <IconCheck />
          </div>
          <h1 className="font-heading mt-6 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Pagamento confirmado.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#EEEEEE]">
            Enviamos um e-mail com seu link de acesso — confira também a caixa
            de spam. Você já pode configurar sua conta enquanto a TV Box está a
            caminho.
          </p>
        </div>

        <div className="mt-10">
          <AvisoCobranca variant="confirmacao" />
        </div>

        {/* Sem exibir o e-mail da compra, este bloco é a única chance de o
            cliente corrigir um endereço digitado errado antes de virar
            suporte. Por isso fica em destaque, e não em letra miúda. */}
        <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-heading text-base font-semibold text-foreground">
            Não recebeu o e-mail?
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Se em alguns minutos nada chegar — nem na caixa de entrada, nem no
            spam — pode ser um erro de digitação no endereço. Fale com a gente
            que corrigimos e reenviamos seu acesso.
          </p>
          <a
            href={LINK_SUPORTE}
            className="font-heading mt-5 inline-block rounded-full border border-cyan/40 px-6 py-2.5 text-sm font-semibold text-cyan transition hover:bg-cyan/10"
          >
            {LABEL_SUPORTE}
          </a>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-sm text-muted underline underline-offset-4 transition hover:text-foreground"
          >
            Voltar para o site
          </Link>
        </div>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted sm:flex-row">
          <span className="font-heading">
            publi<span className="text-cyan font-semibold">TV</span> — mídia
            indoor premium
          </span>
          <span>
            © {new Date().getFullYear()} publeTV. Todos os direitos reservados.
          </span>
        </div>
      </footer>
    </div>
  );
}
