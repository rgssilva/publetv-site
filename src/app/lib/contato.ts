/**
 * Canal de suporte (RF-08).
 *
 * Como a /obrigado não consegue exibir o e-mail usado na compra (decisão de
 * não ter backend), este link é a única forma de o cliente corrigir um typo
 * no e-mail antes de virar um ticket. Ele precisa sempre resolver para algum
 * canal válido — daí o fallback para o e-mail já usado na landing.
 */

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_SUPORTE ?? "";

export const EMAIL_CONTATO = "contato@publetv.com.br";

export const LINK_SUPORTE = whatsapp
  ? `https://wa.me/${whatsapp}`
  : `mailto:${EMAIL_CONTATO}`;

export const LABEL_SUPORTE = whatsapp
  ? "Chamar no WhatsApp"
  : EMAIL_CONTATO;
