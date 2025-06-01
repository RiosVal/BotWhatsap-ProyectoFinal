// Importa el cliente de WhatsApp desde su archivo de configuración
const { client } = require('./whatsappClient');

// Importa message handler y el sistema de bienvenida
require('./messageHandler');
require('./bienvenida');

// Inicializa el cliente y maneja errores si falla
client.initialize().catch(err => {
  console.error("Error fatal durante la inicialización del cliente:", err);
  process.exit(1);
});

// Captura promises no manejadas para evitar que el proceso se caiga
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Captura errores
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Permite Ctrl+C para cerrar el cliente de forma limpia
process.on('SIGINT', async () => {
  console.log("\nRecibida señal SIGINT. Desconectando cliente de WhatsApp...");
  if (client) {
    try {
      await client.destroy();
      console.log("Cliente de WhatsApp desconectado exitosamente.");
    } catch (e) {
      console.error("Error al destruir el cliente:", e);
    }
  }
  process.exit(0);
});
