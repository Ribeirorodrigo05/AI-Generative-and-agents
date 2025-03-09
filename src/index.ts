import express from "express";
import dotenv from "dotenv";
import { AgentService } from "./services/agentservice";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user-input", async (req, res) => {
  const { input } = req.body;
  const agentService = new AgentService();
  const message = await agentService.getMessage(input);
  res.send(`You sent: ${req.body.input}, AgentService says: ${message}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
