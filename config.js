require('dotenv').config();

module.exports = {
  usuariosBienvenida: process.env.USUARIOS_BIENVENIDA ? 
    process.env.USUARIOS_BIENVENIDA.split(',').map(user => user.trim()) : 
    [],
  nombreEmpresaOServicio: "Universidad de San Buenaventura Cali",
  mensajeBienvenidaTexto: `🎓 ¡Bienvenido/a al Bot Oficial de la USB Cali! 🎓.\n
¡Hola! Soy tu asistente virtual de la Universidad de San Buenaventura Sede Cali y estoy aquí para ayudarte 24/7.\n
🔹 ¿Qué puedo hacer por ti?\n
📚 Información Académica:\n
🏛️ Servicios Universitarios:\n
📍 Información General:\n
🚀 ¿Cómo usar el bot?\n
Simplemente escribe tu consulta o selecciona una opción del menú. Por ejemplo:\n

- "Carreras disponibles"
- "Fechas de inscripción"
- "Ubicación USB Cali"
- "Contacto"`,
  rutaImagenPromocional: 'media/imagenUSB.jpg',
  archivoConsultasNoReconocidas: 'consultas_no_reconocidas.log',
  UMBRAL_SIMILITUD: 0.6,
};
