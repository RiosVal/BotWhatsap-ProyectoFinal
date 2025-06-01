const { client } = require('./whatsappClient');
require('./messageHandler');
require('./bienvenida');

client.initialize().catch(err => {
  console.error("Error fatal durante la inicialización del cliente:", err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

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
