// Carga las variables del archivo .env si existe
require('dotenv').config();

module.exports = {
  // Lista de usuarios a los que se les enviará mensaje de bienvenida. Se lee desde una variable de entorno y se convierte en array.
  usuariosBienvenida: process.env.USUARIOS_BIENVENIDA ? 
    process.env.USUARIOS_BIENVENIDA.split(',').map(user => user.trim()) : 
    [],

  // Nombre de la universidad que se utilizará en los mensajes
  nombreEmpresaOServicio: "Universidad de San Buenaventura Cali",

  // Texto del mensaje de bienvenida personalizado
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

  // Ruta de la imagen que se enviará junto al mensaje de bienvenida
  rutaImagenPromocional: 'media/imagenUSB.jpg',

  // Archivo donde se registran las consultas que no se pudieron reconocer
  archivoConsultasNoReconocidas: 'consultas_no_reconocidas.log',

  // Umbral de similitud mínima para considerar que una pregunta coincide con una del corpus
  UMBRAL_SIMILITUD: 0.6,
};
