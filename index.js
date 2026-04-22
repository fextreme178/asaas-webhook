[14:20, 22/04/2026] Lucas Lino: import express from "express";

const app = express();
app.use(express.json());

const WEBHOOK_TOKEN = "whsec_za-z0WfOhF811J4ioFVRCkP4iw60HnKbeXyuDncDc-0";

app.get("/", (_req, res) => {
  res.send("API de webhook rodando 🚀");
});

app.post("/webhook/asaas", (req, res) => {
  const headerToken =
    req.headers["asaas-access-token"] ||
    req.headers["x-webhook-token"];

  const queryToken = req.query.token;
  const receivedToken = headerToken || queryToken;

  if (receivedToken !== WEBHOOK_TOKEN) {
    return res.status(401).json({
      success: false,
      message: "Token inválido",
    });
  }

  console.log("📩 Webhook Asaas recebido:");
  console.log(JSON.stringify(req.body, null, 2));

  const event = req.body?.event;

  switch (event) {
    case "PAYMENT_CREATED":
      console.log("Cobrança criada");
      break;

    case "PAYMENT_CONFIRMED":
      console.log("Pagamento confirmado");
      break;

    case "PAYMENT_RECEIVED":
      console.log("Pagamento recebido");
      break;

    case "PAYMENT_OVERDUE":
      console.log("Pagamento em atraso");
      break;

    case "PAYMENT_REFUNDED":
      console.log("Pagamento reembolsado");
      break;

    case "PAYMENT_DELETED":
      console.log("Pagamento removido");
      break;

    case "PAYMENT_SUBSCRIPTION_CANCELLED":
      console.log("Assinatura cancelada por evento de pagamento");
      break;

    case "SUBSCRIPTION_CREATED":
      console.log("Assinatura criada");
      break;

    case "SUBSCRIPTION_UPDATED":
      console.log("Assinatura atualizada");
      break;

    case "SUBSCRIPTION_DELETED":
      console.log("Assinatura deletada");
      break;

    default:
      console.log("Evento não tratado:", event);
      break;
  }

  return res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(Servidor rodando na porta ${PORT});
});
[14:20, 22/04/2026] Lucas Lino: Use este código corrigido: 1 webhook ativo, 1 token, 1 endpoint, que é o formato compatível com o sistema atual
