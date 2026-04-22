import express from "express";

const app = express();
app.use(express.json());

const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN;

app.get("/", (_req, res) => {
  res.send("API de webhook rodando 🚀");
});

app.post("/webhook/asaas", (req, res) => {
  try {
    const receivedToken = req.headers["asaas-access-token"];

    if (receivedToken !== WEBHOOK_TOKEN) {
      return res.status(401).json({
        success: false,
        message: "Token inválido",
      });
    }

    console.log("📩 Webhook Asaas recebido:");
    console.log(JSON.stringify(req.body, null, 2));

    const event = req.body?.event;
    const payment = req.body?.payment;
    const subscription = req.body?.subscription;

    switch (event) {
      case "PAYMENT_CREATED":
        console.log("💰 Cobrança criada");
        if (payment) {
          console.log("ID do pagamento:", payment.id);
          console.log("Status:", payment.status);
          console.log("Valor:", payment.value);
        }
        break;

      case "PAYMENT_CONFIRMED":
        console.log("✅ Pagamento confirmado");
        if (payment) {
          console.log("ID do pagamento:", payment.id);
          console.log("Status:", payment.status);
          console.log("Valor:", payment.value);
        }
        break;

      case "PAYMENT_RECEIVED":
        console.log("🟢 Pagamento recebido");
        if (payment) {
          console.log("ID do pagamento:", payment.id);
          console.log("Status:", payment.status);
          console.log("Valor:", payment.value);
        }
        break;

      case "PAYMENT_OVERDUE":
        console.log("🔴 Pagamento em atraso");
        if (payment) {
          console.log("ID do pagamento:", payment.id);
          console.log("Status:", payment.status);
          console.log("Valor:", payment.value);
        }
        break;

      case "PAYMENT_REFUNDED":
        console.log("↩️ Pagamento reembolsado");
        if (payment) {
          console.log("ID do pagamento:", payment.id);
          console.log("Status:", payment.status);
          console.log("Valor:", payment.value);
        }
        break;

      case "PAYMENT_DELETED":
        console.log("🗑️ Pagamento removido");
        if (payment) {
          console.log("ID do pagamento:", payment.id);
          console.log("Status:", payment.status);
          console.log("Valor:", payment.value);
        }
        break;

      case "PAYMENT_SUBSCRIPTION_CANCELLED":
        console.log("⛔ Assinatura cancelada por evento de pagamento");
        if (payment) {
          console.log("ID do pagamento:", payment.id);
          console.log("Status:", payment.status);
        }
        break;

      case "SUBSCRIPTION_CREATED":
        console.log("🔁 Assinatura criada");
        if (subscription) {
          console.log("ID da assinatura:", subscription.id);
          console.log("Status:", subscription.status);
          console.log("Valor:", subscription.value);
        }
        break;

      case "SUBSCRIPTION_UPDATED":
        console.log("🔄 Assinatura atualizada");
        if (subscription) {
          console.log("ID da assinatura:", subscription.id);
          console.log("Status:", subscription.status);
          console.log("Valor:", subscription.value);
        }
        break;

      case "SUBSCRIPTION_DELETED":
        console.log("🗑️ Assinatura deletada");
        if (subscription) {
          console.log("ID da assinatura:", subscription.id);
          console.log("Status:", subscription.status);
        }
        break;

      default:
        console.log("ℹ️ Evento não tratado:", event);
        break;
    }

    return res.status(200).json({
      success: true,
      receivedEvent: event || null,
    });
  } catch (error) {
    console.error("❌ Erro ao processar webhook:", error);

    return res.status(500).json({
      success: false,
      message: "Erro interno no servidor",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
