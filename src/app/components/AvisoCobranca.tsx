import {
  PRAZO_ENTREGA,
  PRECO_MENSAL_CENTAVOS,
  PRECO_TVBOX_CENTAVOS,
  TOTAL_HOJE_CENTAVOS,
  formatBRL,
} from "../lib/pricing";

/**
 * Bloco de transparência da cobrança (RF-05 na landing, RF-06a na /obrigado).
 *
 * A repetição entre as duas telas é intencional. O ponto crítico é o destaque
 * do meio: a mensalidade começa no dia da compra, não na entrega. Cliente que
 * descobre isso depois abre chargeback; cliente avisado antes, não.
 */
export function AvisoCobranca({
  variant = "compra",
}: {
  variant?: "compra" | "confirmacao";
}) {
  const confirmado = variant === "confirmacao";

  const itens = [
    `Entrega em ${PRAZO_ENTREGA}, com frete grátis já incluso no preço.`,
    confirmado
      ? "Seu acesso ao painel chega por e-mail em instantes — antes mesmo de o aparelho chegar."
      : "O acesso ao painel chega por e-mail logo após o pagamento, antes de o aparelho chegar.",
    "Pagamento com cartão ou Pix, processado pelo Stripe.",
  ];

  return (
    <div className="rounded-2xl border border-border bg-background/60 p-6 text-left">
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          {confirmado ? "Cobrado hoje" : "Total hoje"}
        </span>
        <span className="font-heading text-2xl font-bold text-cyan sm:text-3xl">
          {formatBRL(TOTAL_HOJE_CENTAVOS)}
        </span>
      </div>

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-[#EEEEEE]">
            TV Box{" "}
            <span className="text-muted">
              — cobrança única, frete grátis incluso
            </span>
          </dt>
          <dd className="shrink-0 tabular-nums text-foreground">
            {formatBRL(PRECO_TVBOX_CENTAVOS)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-[#EEEEEE]">
            Assinatura publeTV <span className="text-muted">— primeiro mês</span>
          </dt>
          <dd className="shrink-0 tabular-nums text-foreground">
            {formatBRL(PRECO_MENSAL_CENTAVOS)}
          </dd>
        </div>
      </dl>

      <p className="mt-5 rounded-xl border border-cyan/30 bg-cyan/10 p-4 text-sm leading-6 text-[#EEEEEE]">
        <strong className="font-semibold text-cyan">
          {confirmado
            ? "A mensalidade já começou a contar hoje"
            : "A mensalidade começa hoje, no dia da compra"}
        </strong>{" "}
        — não na entrega. A próxima cobrança de{" "}
        {formatBRL(PRECO_MENSAL_CENTAVOS)} cai daqui a 30 dias e se renova
        automaticamente. Você pode cancelar quando quiser.
      </p>

      <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
        {itens.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Versão de uma linha, para CTAs que ficam longe do card de planos.
 * Cobre os dois itens que geram disputa — total de hoje e início da
 * mensalidade — sem repetir o bloco inteiro na mesma página.
 */
export function ResumoCobranca({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm leading-6 text-muted ${className}`}>
      <strong className="font-semibold text-foreground">
        {formatBRL(TOTAL_HOJE_CENTAVOS)} hoje
      </strong>{" "}
      — {formatBRL(PRECO_TVBOX_CENTAVOS)} pela TV Box com frete grátis, mais{" "}
      {formatBRL(PRECO_MENSAL_CENTAVOS)} da primeira mensalidade. Depois,{" "}
      {formatBRL(PRECO_MENSAL_CENTAVOS)}/mês com renovação automática. A
      assinatura começa hoje, não na entrega. Entrega em {PRAZO_ENTREGA}.
    </p>
  );
}
