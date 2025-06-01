const { client } = require('./whatsappClient');
const { buscarRespuesta } = require('./nlp');

client.on('message', async message => {
  if (message.fromMe || message.isStatus) return;
  const remitente = message.from;
  const texto = message.body;

  if (!texto || texto.trim().length < 2) return;

  console.log(`Mensaje recibido de ${remitente}: ${texto}`);
  const respuesta = buscarRespuesta(texto);

  try {
    await client.sendMessage(remitente, respuesta);
    console.log(`Respuesta enviada a ${remitente}`);
  } catch (err) {
    console.error(`Error al enviar mensaje a ${remitente}:`, err);
  }
});
