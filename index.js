import express from "express";

const app = express();

app.use(express.json());

app.post("/webhook/asaas", (req, res) => {
  console.log("🔥 Webhook recebido:");
  console.log(req.body);

  return res.status(200).json({
    success: true
  });
});

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
