/**
 * URL do Stripe Payment Link (RF-01/RF-02).
 *
 * Nunca hardcoded: teste e produção são links distintos e trocá-los não pode
 * exigir mexer em componente. `NEXT_PUBLIC_*` é inlinado em build time, então
 * o valor é congelado no bundle — quem faz o deploy precisa definir a variável
 * no ambiente de *build*, não no de runtime.
 */

const link = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? "";

if (!link && process.env.NODE_ENV === "production") {
  // Quebrar o build é melhor do que publicar CTAs que não levam a lugar nenhum.
  throw new Error(
    "NEXT_PUBLIC_STRIPE_PAYMENT_LINK não está definida. Sem ela os botões de " +
      "compra apontariam para lugar nenhum. Defina a variável no ambiente de " +
      "build (ver .env.example e docs/stripe-config.md).",
  );
}

if (!link && process.env.NODE_ENV !== "production") {
  console.warn(
    "[publeTV] NEXT_PUBLIC_STRIPE_PAYMENT_LINK não definida — os CTAs de " +
      "compra apontam para '#'. Copie .env.example para .env.local.",
  );
}

export const PAYMENT_LINK = link || "#";
