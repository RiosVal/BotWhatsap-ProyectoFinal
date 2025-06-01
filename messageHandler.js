// Importa el cliente de WhatsApp y la función de búsqueda de respuesta (NLP)
const { client } = require('./whatsappClient');
const { buscarRespuesta } = require('./nlp');

// Escucha todos los mensajes que llegan
client.on('message', async message => {
  // Ignora los mensajes enviados por el propio bot o los estados
  if (message.fromMe || message.isStatus) return;

  const remitente = message.from;
  const texto = message.body;

  // Si el mensaje está vacío o es demasiado corto, lo ignora
  if (!texto || texto.trim().length < 2) return;

  console.log(`Mensaje recibido de ${remitente}: ${texto}`);

  // Obtiene una respuesta usando procesamiento de lenguaje natural
  const respuesta = buscarRespuesta(texto);

  try {
    // Envía la respuesta al remitente
    await client.sendMessage(remitente, respuesta);
    console.log(`Respuesta enviada a ${remitente}`);
  } catch (err) {
    console.error(`Error al enviar mensaje a ${remitente}:`, err);
  }
});
