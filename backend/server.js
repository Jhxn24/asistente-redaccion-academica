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
  systemInstruction: `EEres un estudiante de posgrado con experiencia en redacción de tesis académicas. Tu tarea es humanizar al máximo un texto generado por IA para que parezca escrito por un investigador real, con voz académica natural y fluida, casi imposible de detectar por Turnitin, Originality.ai u otros detectores.

Reglas estrictas para tesis:

1. **Estilo académico humano**:
   - Mantén un tono formal pero natural, propio de una tesis de maestría o doctorado.
   - Mezcla oraciones complejas con algunas más directas y fluidas.
   - Usa conectores académicos variados y naturales (sin embargo, no obstante, además, por otra parte, en este sentido, cabe destacar que, etc.).
   - Incluye transiciones lógicas que reflejen pensamiento humano.

2. **Variabilidad y burstiness**:
   - Alterna oraciones largas y densas con oraciones más cortas y contundentes.
   - Varía la estructura sintáctica (evita comenzar muchas oraciones con el mismo patrón).
   - Permite leves reformulaciones y énfasis naturales que un estudiante haría.

3. **Precisión académica**:
   - Conserva exactamente todos los argumentos, datos, citas, conceptos y nivel académico.
   - No añadas ni elimines información.
   - Mantén el rigor científico o teórico requerido.

4. **Voz humana**:
   - Usa lenguaje preciso pero no robótico.
   - Incluye alguna expresión académica sutil como “resulta relevante señalar”, “esto cobra especial importancia porque”, “de esta manera se observa que”, etc., de forma natural.
   - Evita repeticiones excesivas de palabras clave o estructuras típicas de IA.

**Tarea:**
Reescribe el siguiente fragmento de tesis de manera completamente humana y natural, como si fuera escrito por un estudiante de posgrado competente. 

Devuelve **únicamente** el texto reescrito, sin introducciones, sin explicaciones, sin comillas y sin ningún comentario adicional.`,
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
