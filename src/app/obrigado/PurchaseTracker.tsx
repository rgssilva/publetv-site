"use client";

import { useEffect } from "react";
import { trackPurchase } from "../lib/analytics";

/**
 * Dispara o evento de conversão (RF-09).
 *
 * Lê o `session_id` de `window.location.search` em vez de `useSearchParams`
 * para não exigir um boundary de Suspense e manter a /obrigado estática.
 *
 * O dedupe por sessionStorage existe porque a página é a URL de retorno do
 * Stripe: um refresh, um "voltar" do navegador ou o cliente reabrindo o
 * histórico contariam a mesma venda de novo e inflariam o ROAS.
 */
export function PurchaseTracker() {
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id",
    );
    if (!sessionId) return;

    const chave = `publetv:purchase:${sessionId}`;
    try {
      if (sessionStorage.getItem(chave)) return;
      sessionStorage.setItem(chave, "1");
    } catch {
      // Navegação privada ou storage bloqueado: melhor contar duas vezes do
      // que perder a conversão.
    }

    trackPurchase(sessionId);
  }, []);

  return null;
}
