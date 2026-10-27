/**
 * Wrapper de analytics (RF-03 / RF-09).
 *
 * Nada aqui é obrigatório: se GA4 ou Meta Pixel não estiverem carregados
 * (IDs ausentes no ambiente), cada chamada vira um no-op silencioso e a
 * página segue funcionando.
 *
 * O mapeamento é explícito em vez de passthrough genérico porque GA4 e Meta
 * usam nomes e formatos diferentes para os mesmos eventos padrão — mandar o
 * mesmo payload para os dois faria a conversão não registrar em um deles.
 */

import { TOTAL_HOJE_CENTAVOS } from "./pricing";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** De onde partiu o clique, para atribuição entre os CTAs da página. */
export type OrigemCheckout = "hero" | "planos" | "final";

// Determinístico: a quantidade é fixa em 1 aparelho + 1 ponto (PRD-01 §3.2).
const VALOR_TOTAL = TOTAL_HOJE_CENTAVOS / 100;

/** Clique em qualquer CTA que leva ao Payment Link. */
export function trackCheckoutIniciado(origem: OrigemCheckout) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "begin_checkout", {
    currency: "BRL",
    value: VALOR_TOTAL,
    origem,
  });
  window.fbq?.("track", "InitiateCheckout", {
    currency: "BRL",
    value: VALOR_TOTAL,
  });

  // Nome custom pedido no PRD, para quem consumir via GTM.
  window.gtag?.("event", "checkout_iniciado", { origem });
}

/**
 * Eventos do vídeo, com os nomes padrão do GA4 (video_start, video_progress,
 * video_complete) para aparecerem nos relatórios sem configuração extra.
 * Sem equivalente no Pixel da Meta: vai como evento custom.
 */
export function trackVideo(
  evento: "video_start" | "video_progress" | "video_complete",
  percentual?: number,
) {
  if (typeof window === "undefined") return;

  const params = {
    video_title: "publeTV VSL",
    video_url: "/publetv-vsl.mp4",
    ...(percentual !== undefined && { video_percent: percentual }),
  };
  window.gtag?.("event", evento, params);
  window.fbq?.("trackCustom", evento, params);
}

/** Conversão, disparada uma única vez por sessão de checkout na /obrigado. */
export function trackPurchase(sessionId: string) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "purchase", {
    transaction_id: sessionId,
    currency: "BRL",
    value: VALOR_TOTAL,
  });
  window.fbq?.("track", "Purchase", {
    currency: "BRL",
    value: VALOR_TOTAL,
  });
}
