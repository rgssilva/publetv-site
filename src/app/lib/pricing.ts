/**
 * Fonte única de verdade dos valores exibidos na landing (RF-04/05/05a).
 *
 * TODO: substituir pelos valores reais cadastrados no Stripe antes de publicar.
 * Divergência entre o que aparece aqui e o que o Stripe cobra gera chargeback
 * e reclamação — é o risco listado no §8 do PRD-01.
 */

/** TV Box, preço one-time. */
export const PRECO_TVBOX_CENTAVOS = 29900;

/** Assinatura publeTV, preço recorrente mensal. */
export const PRECO_MENSAL_CENTAVOS = 2990;

/**
 * O que sai do bolso do cliente no dia da compra: aparelho + primeira
 * mensalidade, cobrados na mesma fatura. A assinatura não tem trial, então
 * o primeiro mês corre desde a data da compra (PRD-01 §1.1).
 */
export const TOTAL_HOJE_CENTAVOS = PRECO_TVBOX_CENTAVOS + PRECO_MENSAL_CENTAVOS;

/** TODO: confirmar o prazo real praticado. */
export const PRAZO_ENTREGA = "5 a 10 dias úteis";

/**
 * Formata centavos como BRL sem depender de `Intl`.
 *
 * `toLocaleString` pode devolver espaços diferentes (normal vs. não-quebrável)
 * entre o Node que renderiza no servidor e o navegador que hidrata, o que
 * dispara mismatch de hidratação. Para um punhado de valores estáticos, não
 * vale o risco.
 */
export function formatBRL(centavos: number): string {
  const reais = Math.floor(centavos / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const resto = String(centavos % 100).padStart(2, "0");
  return `R$ ${reais},${resto}`;
}
