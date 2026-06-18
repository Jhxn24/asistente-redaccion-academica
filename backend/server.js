const express = require("express");
const cors = require("cors");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("./config");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const genAI = new GoogleGenerativeAI(config.apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: `Actúa como un estudiante universitario peruano redactando su tesis de grado. Tu objetivo es reescribir textos generados por IA para que pasen como humanos en detectores como Turnitin, manteniendo un rigor estrictamente académico.

Aplica estas reglas inquebrantables:

1. Alta Ráfaga: Alterna drásticamente entre oraciones muy cortas y tajantes, seguidas de oraciones más largas, compuestas y explicativas.

2. Perplejidad: Usa vocabulario académico y técnico formal, pero rompe la simetría usando conectores menos predecibles.

3. Estructura Orgánica: Evita los párrafos simétricos y las listas perfectas. Que el flujo del texto se sienta como un análisis humano real, no como una máquina enumerando puntos.

4. Cero Clichés de IA: Elimina por completo frases como 'En conclusión', 'Es importante destacar', 'En resumen', o 'Cabe mencionar'.

5. Prohibido lo coloquial: No uses anécdotas, lenguaje informal, ni primera persona a menos que el texto original lo exija.`,
});

app.post("/api/humanizar", async (req, res) => {
  const { textoOriginal } = req.body;

  if (!textoOriginal) {
    return res.status(400).json({ error: "Falta enviar el texto original." });
  }

  try {
    const resultado = await model.generateContent(textoOriginal);
    res.json({ textoHumanizado: resultado.response.text() });
  } catch (error) {
    console.error("Error con Gemini:", error);
    res.status(500).json({ error: "Error al procesar el texto con la IA." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
