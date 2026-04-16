import express from "express";

const app = express();

app.use(express.json());

// Defina aqui o mesmo token que você colocou no webhook do Asaas
const ASAAS_WEBHOOK_TOKEN = "whsec_za-z0WfOhF811J4ioFVRCkP4iw60HnKbeXyuDncDc-0";

app.post("/webhook/asaas", (req, res) => {
  try {
    const receivedToken =
      req.headers["asaas-access-token"] ||
      req.headers["authorization"] ||
      req.headers["token"];

    console.log("🔥 Webhook recebido em:", new Date().toISOString());
    console.log("Headers:", JSON.stringify(req.headers, null, 2));
    console.log("Body:", JSON.stringify(req.body, null, 2));

    if (receivedToken !== ASAAS_WEBHOOK_TOKEN) {
      console.log("❌ Token inválido recebido no webhook");
      return res.status(401).json({
        success: false,
        message: "Token inválido"
      });
    }

    const event = req.body?.event;
    const payment = req.body?.payment;
    const subscription = req.body?.subscription;

    console.log("📌 Evento recebido:", event);

    switch (event) {
      case "PAYMENT_CREATED":
        console.log("🟡 Cobrança criada");
        break;

      case "PAYMENT_RECEIVED":
        console.log("🟢 Pagamento recebido");
        if (payment) {
          console.log("ID do pagamento:", payment.id);
          console.log("Valor:", payment.value);
          console.log("Status:", payment.status);
        }
        break;

      case "PAYMENT_CONFIRMED":
        console.log("✅ Pagamento confirmado");
        if (payment) {
          console.log("ID do pagamento:", payment.id);
          console.log("Valor:", payment.value);
          console.log("Status:", payment.status);
        }
        break;

      case "PAYMENT_OVERDUE":
        console.log("🔴 Pagamento em atraso");
        if (payment) {
          console.log("ID do pagamento:", payment.id);
          console.log("Valor:", payment.value);
          console.log("Status:", payment.status);
        }
        break;

      case "SUBSCRIPTION_CREATED":
        console.log("🔁 Assinatura criada");
        if (subscription) {
          console.log("ID da assinatura:", subscription.id);
          console.log("Valor:", subscription.value);
        }
        break;

      case "SUBSCRIPTION_UPDATED":
        console.log("🔄 Assinatura atualizada");
        if (subscription) {
          console.log("ID da assinatura:", subscription.id);
          console.log("Valor:", subscription.value);
        }
        break;

      default:
        console.log("ℹ️ Evento não tratado ainda:", event);
        break;
    }

    return res.status(200).json({
      success: true,
      receivedEvent: event || null
    });
  } catch (error) {
    console.error("❌ Erro ao processar webhook:", error);

    return res.status(500).json({
      success: false,
      message: "Erro interno no servidor"
    });
  }
});

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
