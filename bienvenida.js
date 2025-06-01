// Módulo para interactuar con el sistema de archivos
const fs = require('fs');

// Importa el cliente de WhatsApp
const { client } = require('./whatsappClient');

// Importa configuración: lista de usuarios a los que se enviará la bienvenida, el mensaje de texto, y la ruta de la imagen
const { usuariosBienvenida, mensajeBienvenidaTexto, rutaImagenPromocional } = require('./config');

// Para enviar archivos multimedia por WhatsApp
const { MessageMedia } = require('whatsapp-web.js');

// Evento que se dispara cuando el cliente de WhatsApp está listo y conectado
client.on('ready', async () => {
  console.log('Cliente de WhatsApp listo.');
  console.log(`Bot operando como: ${client.info.pushname} (${client.info.wid.user})`);

  // Si no hay usuarios en la lista de bienvenida, salir sin hacer nada
  if (usuariosBienvenida.length === 0) return;

  console.log('Enviando mensajes de bienvenida...');

  try {
    // Si no existe la imagen promocional, se envía solo el mensaje de texto
    if (!fs.existsSync(rutaImagenPromocional)) {
      for (const chatId of usuariosBienvenida) {
        await client.sendMessage(chatId, mensajeBienvenidaTexto);
        // Espera 2 segundos entre mensajes para evitar ser marcado como spam
        await new Promise(r => setTimeout(r, 2000));
      }
    } else {
      // Si la imagen existe, se carga y se envía junto con el mensaje de bienvenida
      const media = MessageMedia.fromFilePath(rutaImagenPromocional);
      for (const chatId of usuariosBienvenida) {
        await client.sendMessage(chatId, media, { caption: mensajeBienvenidaTexto });
        await new Promise(r => setTimeout(r, 2000)); // Delay para evitar saturación
      }
    }
  } catch (err) {
    // Manejo de errores en el envío de mensajes
    console.error('Error enviando mensajes de bienvenida:', err);
  }
});
