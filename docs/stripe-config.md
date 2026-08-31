# Configuração do Stripe — publeTV

Referência operacional do PRD-01. **Este documento é um template a preencher**
conforme o Helian cria os objetos no dashboard. Enquanto os campos estiverem
como `_a preencher_`, a landing está rodando com valores placeholder.

---

## 1. Produtos e preços

| Item | Tipo | Intervalo | Moeda | Price ID (teste) | Price ID (produção) |
|---|---|---|---|---|---|
| TV Box | `one_time` | — | BRL | _a preencher_ | _a preencher_ |
| Assinatura publeTV | `recurring` | `month` | BRL | _a preencher_ | _a preencher_ |

Valor da TV Box: _a preencher_
Valor da mensalidade: _a preencher_

> Em modo `subscription` o Stripe aceita line items one-time. A TV Box entra na
> **primeira fatura**, junto com o primeiro mês. Não criar duas transações.

⚠️ Ao definir os valores, atualizar `src/app/lib/pricing.ts` na mesma passada.
Preço divergente entre landing e Stripe é o gerador nº 1 de chargeback.

---

## 2. Payment Link — checklist de criação

Dashboard → Payment Links → New. Marcar cada item ao conferir:

- [ ] Os **dois** line items adicionados, quantidade 1 cada
- [ ] Quantidade **não editável** pelo cliente
- [ ] Coleta de e-mail habilitada
- [ ] `phone_number_collection` habilitado — **não vem por padrão**
- [ ] Endereço de **cobrança** obrigatório (necessário para nota fiscal)
- [ ] Endereço de **entrega DESABILITADO** — coletado no onboarding (PRD 02)
- [ ] **Nenhuma shipping rate.** O frete já está embutido no preço da TV Box;
      configurar uma faz o cliente pagar frete duas vezes
- [ ] **Nenhum trial.** A assinatura inicia na data da compra (§1.1)
- [ ] Campo customizado: label `CPF ou CNPJ`, tipo `text`, obrigatório,
      key **`cpf_cnpj`** — o webhook do PRD 02 depende dessa key exata
- [ ] Métodos: cartão + Pix. **Boleto não** (atrasa o provisionamento em dias)
- [ ] Página de sucesso → `https://publetv.com.br/obrigado?session_id={CHECKOUT_SESSION_ID}`

### URLs geradas

| Ambiente | URL | Variável de ambiente |
|---|---|---|
| Teste | _a preencher_ | `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` no preview/local |
| Produção | _a preencher_ | `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` no ambiente de produção |

> São objetos diferentes com URLs diferentes. `NEXT_PUBLIC_*` é congelado em
> build time — trocar o valor exige **rebuild**, não só redeploy de env.

---

## 3. Outras configurações do dashboard

**Customer Portal** (Settings → Billing → Customer portal) — habilitar agora,
consumido no PRD 02:

- [ ] Atualizar forma de pagamento
- [ ] Ver histórico de faturas
- [ ] Cancelar assinatura, com "cancelar ao fim do período" (não imediato)
- [ ] Trocar de plano **desabilitado** (só faz sentido com mais de um plano)

**Recuperação de carrinho abandonado** (Settings → Billing → Subscriptions and
emails):

- [ ] Recover abandoned carts habilitado

---

## 4. Critério de aceite do PRD-01

Uma compra de teste precisa produzir um `checkout.session.completed` com os
**7 campos** abaixo preenchidos. Sem isso, o PRD 02 não funciona.

| Dado | Caminho no payload | Depende de |
|---|---|---|
| Nome | `customer_details.name` | endereço de cobrança habilitado |
| E-mail | `customer_details.email` | padrão |
| Telefone | `customer_details.phone` | `phone_number_collection` |
| CPF/CNPJ | `custom_fields[]` com `key = cpf_cnpj` | campo customizado |
| Customer ID | `customer` | modo subscription |
| Subscription ID | `subscription` | modo subscription |
| Valor total | `amount_total` | padrão |

---

## 5. Variáveis de ambiente da landing

Ver `.env.example`. Só `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` é obrigatória — o
build de produção falha sem ela, de propósito (`src/app/lib/checkout.ts`).

Não existe secret key neste repo. A landing é estática e não fala com a API do
Stripe; a RF-07 (exibir na `/obrigado` o e-mail usado na compra) foi cortada
justamente para manter isso. A consequência é que um typo no e-mail só é
recuperável pelo bloco de suporte da `/obrigado` e pelo reenvio manual no
admin do PRD 03.
