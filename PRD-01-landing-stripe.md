# PRD 01 — Landing Page + Checkout Stripe (publeTV)

**Repositório:** landing page (repo do Helian)
**Escopo:** levar o visitante da landing até o pagamento concluído no Stripe, com todos os dados necessários para o provisionamento automático.
**Fora de escopo:** criação de usuário, e-mail de acesso, onboarding, painel (ver PRD 02 e 03).

---

## 1. Contexto

O publeTV vende dois itens em conjunto na primeira compra:

| Item | Tipo de preço | Cobrança |
|---|---|---|
| TV Box (hardware) | `one_time` | Uma vez, na primeira fatura |
| Assinatura publeTV | `recurring` (mensal) | Recorrente, **a partir da data da compra** |

O Helian já cadastrou os dois produtos no Stripe.

### 1.1 Decisões travadas

| Decisão | Escolha | Consequência |
|---|---|---|
| **Frete** | Grátis, embutido no preço da TV Box | Nenhum cálculo dinâmico necessário → **Payment Link é viável** |
| **Assinatura** | Cobrada junto no checkout, **sem trial** | Primeira mensalidade corre desde o dia da compra |

> **Nota operacional (fase 1):** nas primeiras vendas o Helian entrega pessoalmente nos estabelecimentos locais. Isso não altera nada na arquitetura — o modelo de entrega segue desenhado para envio por transportadora, que é o estado permanente. A entrega em mãos é apenas um pedido que passa rápido pelos mesmos estados.

A decisão de arquitetura é **não coletar dados na landing page** — o visitante vai direto para o checkout do Stripe, que já é uma tela otimizada, com PCI compliance e suporte a Pix/cartão. Os dados do cliente são capturados **dentro do checkout** e chegam ao publeTV via webhook. Endereço de entrega é coletado depois, no onboarding (PRD 02).

### 1.2 Por que o concorrente coleta dados antes (e nós não precisamos)

O QR TV Indoor coleta nome/e-mail/senha, quantidade e endereço completo **antes** de mandar pro Stripe. Isso não é escolha de UX — é imposição técnica: eles cobram frete calculado por CEP (PAC/SEDEX via Correios), e o Stripe precisa do valor final antes de criar a sessão de pagamento.

Como o publeTV embute o frete no preço, essa restrição desaparece. Podemos ir direto ao checkout, com muito menos código.

**Diferença adicional:** o QR TV **não** vende a assinatura no checkout — o aviso deles diz que cada TV exige um ponto ativo a partir de R$ 29,90/mês, ativado no painel após o recebimento do aparelho. O publeTV vende os dois juntos. Ver §1.3.

### 1.3 Riscos das decisões (aceitos, com mitigação)

**Frete embutido:** o preço único precisa absorver o frete mais caro que você aceita atender. Um envio para o Norte/Nordeste pode passar de R$ 80 e comer a margem inteira de um aparelho.
- Mitigação: calcular o frete médio ponderado pelas regiões-alvo antes de fechar o preço, e definir se existe restrição de região de atendimento.
- Como o frete é grátis para o cliente, use a modalidade mais rápida que a margem permitir. Reduz o gap descrito abaixo.

**Assinatura sem trial:** o cliente começa a pagar a mensalidade no dia da compra, mas só usa o produto quando a caixa chegar — alguns dias depois. Esse gap é a principal fonte de pedido de estorno em venda de hardware + SaaS.
- Mitigação obrigatória: a landing e a página de sucesso precisam dizer isso de forma explícita e antecipada (RF-05 e RF-06a). Cliente que foi avisado não abre chargeback; cliente surpreendido abre.
- Reavaliar após os 10 primeiros pedidos. Se aparecer atrito, `subscription_data.trial_period_days` alinha a primeira cobrança com a entrega sem mudar mais nada na arquitetura.

---

## 2. Decisão técnica principal: Payment Link, não Checkout Session

**Usar Stripe Payment Link.** A landing page é estática e não precisa de backend só para gerar sessão de checkout.

- Payment Link suporta os dois line items (one-time + recurring) na mesma transação.
- Suporta campos customizados (CPF), coleta de telefone e endereço.
- Gera exatamente o mesmo evento `checkout.session.completed` que uma Checkout Session criada via API.
- Zero backend na landing.

Só migrar para Checkout Session via API se no futuro houver cupom dinâmico, preço variável ou múltiplos planos escolhidos em tela.

---

## 3. Configuração no Stripe (fazer antes de codar)

### 3.1 Produtos e preços
Confirmar com o Helian e anotar os IDs:

- `price_...` — TV Box, tipo **one-time**, moeda BRL
- `price_...` — Assinatura publeTV, tipo **recurring**, intervalo `month`, moeda BRL

> **Importante:** em modo `subscription`, o Stripe aceita line items one-time. O valor da TV Box entra na **primeira fatura** junto com o primeiro mês. Não criar duas transações separadas.

### 3.2 Criar o Payment Link
Dashboard → Payment Links → New:

- **Line items:** adicionar os dois preços acima, quantidade 1 cada, quantidade não editável pelo cliente.
- **Coleta de e-mail:** habilitado (padrão, obrigatório).
- **Coleta de telefone:** habilitar `phone_number_collection`. **Não vem por padrão.**
- **Coleta de endereço de cobrança:** obrigatório (necessário para nota fiscal futura).
- **Coleta de endereço de entrega:** **desabilitado.** O endereço de entrega e o responsável pelo recebimento são coletados no onboarding (PRD 02), porque precisamos de campos que o Stripe não suporta (nome do recebedor, ponto de referência, horário de entrega).
- **Shipping rates:** **nenhuma.** O frete está embutido no preço da TV Box. Não configurar `shipping_options` — se configurar, o Stripe soma um valor extra e o cliente paga frete duas vezes.
- **Campo customizado — CPF/CNPJ:**
  - Label: `CPF ou CNPJ`
  - Tipo: `text`
  - Obrigatório: sim
  - Key: `cpf_cnpj` (anotar essa key, o webhook vai depender dela)
- **Página de sucesso:** redirecionar para `https://publetv.com.br/obrigado?session_id={CHECKOUT_SESSION_ID}` (ver §5).
- **Métodos de pagamento:** cartão + Pix (se disponível na conta). Boleto **não** — atrasa o provisionamento em dias.
- **Trial:** **nenhum.** A assinatura inicia na data da compra (decisão §1.1). Não configurar `trial_period_days`.
- **Quantidade de aparelhos:** fixa em 1 na fase 1. Se no futuro permitir múltiplas TVs, a quantidade precisa ser espelhada nos dois line items (1 aparelho = 1 ponto de assinatura), o que o Payment Link não faz sozinho — nesse momento migra para Checkout Session via API.

### 3.3 Customer Portal (habilitar agora, usar no PRD 02)
Dashboard → Settings → Billing → Customer portal. Habilitar:
- Atualizar forma de pagamento ✅
- Ver histórico de faturas ✅
- Cancelar assinatura ✅ (com "cancelar ao fim do período", não imediato)
- Trocar de plano ❌ (só quando houver mais de um plano)

### 3.4 Ambientes
Fazer todo o setup **em modo teste primeiro**. Payment Link de teste e de produção são objetos diferentes com URLs diferentes. Documentar as duas URLs.

---

## 4. Implementação na landing page

### 4.1 CTA
Todos os botões de compra apontam para a URL do Payment Link:

```html
<a href="https://buy.stripe.com/XXXXXXXX"
   class="btn-cta"
   data-evento="checkout_iniciado">
  Quero minha TV Box
</a>
```

A URL vive em variável de ambiente (`VITE_STRIPE_PAYMENT_LINK` ou equivalente) para não recompilar ao trocar teste ↔ produção.

### 4.2 Requisitos
- **RF-01:** Todo CTA de compra na página leva ao Payment Link.
- **RF-02:** A URL do link vem de variável de ambiente, nunca hardcoded.
- **RF-03:** Antes do redirect, disparar evento de analytics `checkout_iniciado` (Meta Pixel / GA4, o que já estiver instalado).
- **RF-04:** Seção de preço na landing deve refletir exatamente os valores do Stripe. Divergência gera chargeback e reclamação.
- **RF-05:** A landing deve deixar explícito, próximo ao CTA e antes do clique:
  1. Valor da TV Box — cobrança única, **frete grátis incluso**
  2. Valor da mensalidade — **primeira cobrança hoje**, renovação automática
  3. Prazo estimado de entrega
  4. Que o acesso ao painel chega por e-mail logo após o pagamento, antes do aparelho chegar

  O item 2 é o mais importante: a mensalidade inicia na compra, não na entrega. Omitir isso é o que gera chargeback.
- **RF-05a:** Exibir o "total hoje" somando TV Box + primeira mensalidade. O cliente não pode descobrir o valor real só na tela do Stripe.

### 4.3 Página `/obrigado`
Nova página estática na landing. Requisitos:

- **RF-06:** Confirmar o pagamento e explicar os próximos passos: *"Enviamos um e-mail com seu link de acesso — confira também a caixa de spam. Você já pode configurar sua conta enquanto a TV Box está a caminho."*
- **RF-06a:** Reforçar o que foi cobrado hoje (aparelho + primeira mensalidade) e quando cai a próxima cobrança. Repetição intencional da RF-05; é a última tela antes do e-mail.
- **RF-07:** Exibir o e-mail usado na compra, lido de `session_id` via uma rota serverless leve que faz `stripe.checkout.sessions.retrieve()`. **Nunca** expor a secret key no cliente.
- **RF-08:** Abaixo do e-mail, texto: *"Não é esse seu e-mail? Fale com a gente"* + link para WhatsApp do suporte.
- **RF-09:** Disparar evento de conversão (`purchase`) com o valor da transação.

> **Por que a RF-07/08 importa:** no fluxo checkout-first, um typo no e-mail significa cliente que pagou e nunca recebe acesso. Essa tela é a única chance de o cliente perceber o erro na hora.

---

## 5. Dados que precisam chegar ao webhook

Checklist do que o PRD 02 vai consumir de `checkout.session.completed`:

| Dado | Origem no payload | Depende de |
|---|---|---|
| Nome | `customer_details.name` | Coleta de endereço de cobrança habilitada |
| E-mail | `customer_details.email` | Padrão |
| Telefone | `customer_details.phone` | `phone_number_collection` habilitado |
| CPF/CNPJ | `custom_fields[].text.value` onde `key = cpf_cnpj` | Campo customizado criado |
| Stripe Customer ID | `customer` | Modo subscription |
| Subscription ID | `subscription` | Modo subscription |
| Valor total | `amount_total` | Padrão |

**Critério de aceite do PRD 01:** uma compra de teste produz um evento `checkout.session.completed` contendo os 7 campos acima preenchidos. Sem isso, o PRD 02 não funciona.

---

## 6. Recuperação de carrinho abandonado

Habilitar no Stripe: Settings → Billing → Subscriptions and emails → **Recover abandoned carts**. O Stripe envia e-mail automático para quem preencheu o e-mail e não concluiu. Custo zero de desenvolvimento. Substitui parcialmente a captura de lead que o concorrente faz com formulário.

---

## 7. Entregáveis

1. Payment Link de teste configurado, com os dois line items, telefone e campo CPF/CNPJ.
2. Payment Link de produção idem.
3. Landing com CTAs apontando para o link via env var.
4. Página `/obrigado` com confirmação, e-mail exibido e fallback de contato.
5. Eventos de analytics `checkout_iniciado` e `purchase`.
6. Documento curto (`docs/stripe-config.md`) com os IDs de preço, keys de campo customizado e URLs dos dois ambientes.

---

## 8. Riscos

| Risco | Mitigação |
|---|---|
| Typo no e-mail → cliente paga e não recebe acesso | Página `/obrigado` exibe o e-mail (RF-07/08) + painel admin permite reenvio (PRD 03) |
| Preço na landing divergente do Stripe | Checklist de conferência antes de publicar; considerar puxar preço via API no futuro |
| Payment Link de teste usado em produção | Env var separada por ambiente; smoke test pós-deploy |
| Cliente compra duas vezes por engano | Detecção de e-mail duplicado no webhook (PRD 02) + alerta no admin |
| Frete real acima do embutido corrói margem | Frete médio ponderado calculado antes de fixar o preço; definir região de atendimento |
| Cliente reclama de mensalidade cobrada antes de receber o aparelho | RF-05 / RF-06a (transparência antecipada) + envio na modalidade mais rápida que a margem permitir; reavaliar trial após 10 pedidos |
| Shipping rate configurada por engano no Stripe | Checklist §3.2 — nenhuma shipping rate; conferir no smoke test |
