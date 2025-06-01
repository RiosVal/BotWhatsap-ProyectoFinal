const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-extensions',
      '--disable-gpu',
    ]
  }
});

client.on('qr', qr => {
  console.log('Escanea este código QR con tu WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => console.log('Autenticado exitosamente.'));
client.on('auth_failure', msg => {
  console.error('Fallo en la autenticación:', msg);
});
client.on('disconnected', reason => {
  console.warn('Cliente de WhatsApp desconectado:', reason);
});

module.exports = { client };
