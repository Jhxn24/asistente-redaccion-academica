document.addEventListener("DOMContentLoaded", () => {
  const btnHumanizar = document.getElementById("btn-humanizar");
  const btnCopiar = document.getElementById("btn-copiar");
  const inputTexto = document.getElementById("texto-ia");
  const outputTexto = document.getElementById("texto-humano");

  btnHumanizar.addEventListener("click", async () => {
    const textoOriginal = inputTexto.value.trim();

    if (!textoOriginal) {
      alert("Por favor, pega un texto generado por IA primero.");
      return;
    }

    btnHumanizar.textContent = "Procesando con Gemini...";
    btnHumanizar.disabled = true;
    btnCopiar.disabled = true;
    outputTexto.value = "";

    try {
      const respuesta = await fetch("/api/humanizar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ textoOriginal: textoOriginal }),
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        outputTexto.value = data.textoHumanizado;
        btnCopiar.disabled = !data.textoHumanizado;
      } else {
        outputTexto.value = `Error del servidor: ${data.error}`;
      }
    } catch (error) {
      console.error("Error al conectar:", error);
      outputTexto.value =
        "Error crítico al intentar conectar con el servidor. Verifica que node server.js esté corriendo.";
    } finally {
      btnHumanizar.textContent = "Humanizar Texto";
      btnHumanizar.disabled = false;
    }
  });

  btnCopiar.addEventListener("click", async () => {
    const textoACopiar = outputTexto.value.trim();

    if (!textoACopiar) {
      alert("No hay texto corregido para copiar.");
      return;
    }

    try {
      await navigator.clipboard.writeText(textoACopiar);
      btnCopiar.textContent = "Copiado";
      setTimeout(() => {
        btnCopiar.textContent = "Copiar texto corregido";
      }, 1500);
    } catch (error) {
      console.error("Error al copiar al portapapeles:", error);
      alert("No se pudo copiar el texto. Intenta nuevamente.");
    }
  });
});
