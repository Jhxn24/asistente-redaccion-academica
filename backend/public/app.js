document.addEventListener("DOMContentLoaded", () => {
  const btnHumanizar = document.getElementById("btn-humanizar");
  const inputTexto = document.getElementById("texto-ia");
  const outputTexto = document.getElementById("texto-humano");

  btnHumanizar.addEventListener("click", async () => {
    const textoOriginal = inputTexto.value.trim();

    if (!textoOriginal) return alert("Por favor, ingresa un texto.");

    btnHumanizar.textContent = "Procesando...";
    btnHumanizar.disabled = true;

    try {
      // Hacemos la petición a nuestra propia API
      const respuesta = await fetch("/api/humanizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ textoOriginal }),
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        outputTexto.value = data.textoHumanizado;
      } else {
        outputTexto.value = `Error: ${data.error}`;
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      outputTexto.value = "Error al conectar con el servidor.";
    } finally {
      btnHumanizar.textContent = "Humanizar Texto";
      btnHumanizar.disabled = false;
    }
  });
});
