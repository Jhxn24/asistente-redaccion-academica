# Humanizador de Textos Académicos (Anti-Detección IA)

## Descripción

Aplicación web Full-Stack diseñada para resolver una problemática crítica en la redacción académica: la marcación de falsos positivos y textos generados por IA en detectores como Turnitin. 

La herramienta recibe un texto generado por IA y, mediante técnicas avanzadas de *prompt engineering*, reconstruye la estructura sintáctica y estadística del párrafo para emular la escritura de un investigador humano, manteniendo el rigor académico y el modo impersonal.

## El Problema de Negocio

Los detectores de IA actuales rastrean la "perplejidad" (previsibilidad de las palabras) y la "ráfaga" (simetría en la longitud de las oraciones). Los modelos tradicionales como ChatGPT fallan al generar textos con alta simetría.

**La Solución:** Este motor utiliza Google Gemini para inyectar "fricción sintáctica" y asimetría controlada, rompiendo los patrones algorítmicos sin perder la fidelidad de los datos originales ni la formalidad exigida por los jurados de tesis.

## Tecnologías utilizadas

- **Backend:** Node.js, Express.js
- **Motor de IA:** Google Gemini API (gemini-2.5-flash para optimización de cuotas y velocidad)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (Arquitectura Cliente-Servidor)

## Arquitectura y Técnicas Aplicadas

- **Control de Ráfaga (Burstiness):** Alternancia forzada entre oraciones extremadamente cortas y cláusulas subordinadas largas.
- **Fricción Sintáctica:** Inversión del orden clásico Sujeto-Verbo-Predicado para aumentar la perplejidad del algoritmo detector.
- **Conector Cero:** Eliminación de transiciones predecibles ("En conclusión", "Por lo tanto") a favor de conexiones temáticas orgánicas.
- **Modo Impersonal Estricto:** Evita el uso de primera persona para cumplir con los estándares de redacción de tesis de grado y posgrado.

## Instalación y Despliegue Local

1. Clona este repositorio:

```bash
git clone https://github.com/tu_usuario/asistente-redaccion-academica.git
cd asistente-redaccion-academica
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno:

Crea un archivo llamado `.env` en la raíz del proyecto y añade tu clave de Google AI Studio:

```env
GEMINI_API_KEY=tu_api_key_aqui
```

4. Ingresa al directorio backend:

```bash
cd backend
```

5. Inicia el servidor:

```bash
node server.js
```
