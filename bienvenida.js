const fs = require('fs');
const { client } = require('./whatsappClient');
const { usuariosBienvenida, mensajeBienvenidaTexto, rutaImagenPromocional } = require('./config');
const { MessageMedia } = require('whatsapp-web.js');

client.on('ready', async () => {
  console.log('Cliente de WhatsApp listo.');
  console.log(`Bot operando como: ${client.info.pushname} (${client.info.wid.user})`);

  if (usuariosBienvenida.length === 0) return;

  console.log('Enviando mensajes de bienvenida...');

  try {
    if (!fs.existsSync(rutaImagenPromocional)) {
      for (const chatId of usuariosBienvenida) {
        await client.sendMessage(chatId, mensajeBienvenidaTexto);
        await new Promise(r => setTimeout(r, 2000));
      }
    } else {
      const media = MessageMedia.fromFilePath(rutaImagenPromocional);
      for (const chatId of usuariosBienvenida) {
        await client.sendMessage(chatId, media, { caption: mensajeBienvenidaTexto });
        await new Promise(r => setTimeout(r, 2000));
      }
    }
  } catch (err) {
    console.error('Error enviando mensajes de bienvenida:', err);
  }
});
