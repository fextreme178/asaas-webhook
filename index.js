import express from "express";

const app = express();
app.use(express.json());

// Tokens dos webhooks
const PAYMENT_WEBHOOK_TOKEN = "whsec_7UcyXTcjRpbqSI9_FPQEwFO7QnCEhX4G0vH9pSVtI0Y";
const SUBSCRIPTION_WEBHOOK_TOKEN = "whsec_za-z0WfOhF811J4ioFVRCkP4iw60HnKbeXyuDncDc-0";

// Rota inicial
app.get("/", (req, res) => {
  res.send("API de webhooks rodando 🚀");
});

// Webhook de pagamentos
app.post("/webhook/payments", (req, res) => {
  const token = req.headers["asaas-access-token"];

  if (token !== PAYMENT_WEBHOOK_TOKEN) {
    return res.status(401).json({
      success: false,
      message: "Token inválido para pagamentos"
    });
  }

  console.log("💰 Webhook de pagamentos recebido:");
  console.log(JSON.stringify(req.body, null, 2));

  const event = req.body?.event;

  switch (event) {
    case "PAYMENT_CREATED":
      console.log("Cobrança criada");
      break;
    case "PAYMENT_RECEIVED":
      console.log("Pagamento recebido");
      break;
    case "PAYMENT_CONFIRMED":
      console.log("Pagamento confirmado");
      break;
    case "PAYMENT_OVERDUE":
      console.log("Pagamento em atraso");
      break;
    default:
      console.log("Evento de pagamento não tratado:", event);
      break;
  }

  return res.status(200).json({ success: true });
});

// Webhook de assinaturas
app.post("/webhook/subscriptions", (req, res) => {
  const token = req.headers["asaas-access-token"];

  if (token !== SUBSCRIPTION_WEBHOOK_TOKEN) {
    return res.status(401).json({
      success: false,
      message: "Token inválido para assinaturas"
    });
  }

  console.log("🔁 Webhook de assinaturas recebido:");
  console.log(JSON.stringify(req.body, null, 2));

  const event = req.body?.event;

  switch (event) {
    case "SUBSCRIPTION_CREATED":
      console.log("Assinatura criada");
      break;
    case "SUBSCRIPTION_UPDATED":
      console.log("Assinatura atualizada");
      break;
    default:
      console.log("Evento de assinatura não tratado:", event);
      break;
  }

  return res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
