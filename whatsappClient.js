// Importa el generador de códigos QR para mostrar en consola
const qrcode = require('qrcode-terminal');

// Importa el cliente de WhatsApp y la estrategia de autenticación local
const { Client, LocalAuth } = require('whatsapp-web.js');

// Crea una instancia del cliente de WhatsApp
const client = new Client({
  // Usa autenticación local para guardar la sesión en el disco
  authStrategy: new LocalAuth(),

  // Configura Puppeteer (navegador controlado por código) en modo headless
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

// Se genera un código QR para emparejar con WhatsApp
client.on('qr', qr => {
  console.log('Escanea este código QR con tu WhatsApp:');
  qrcode.generate(qr, { small: true }); // Muestra el QR en consola
});

// El cliente fue autenticado exitosamente
client.on('authenticated', () => console.log('Autenticado exitosamente.'));

// Fallo en el proceso de autenticación
client.on('auth_failure', msg => {
  console.error('Fallo en la autenticación:', msg);
});

// El cliente se desconectó de WhatsApp
client.on('disconnected', reason => {
  console.warn('Cliente de WhatsApp desconectado:', reason);
});

// Exporta el cliente para que pueda ser usado en otros archivos
module.exports = { client };
