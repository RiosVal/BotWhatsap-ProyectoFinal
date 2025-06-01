const fs = require('fs');
// Importa la ruta del archivo de log desde la configuración
const { archivoConsultasNoReconocidas } = require('./config');

// Registrar las consultas no reconocidas en un archivo de texto
function registrarConsultaNoReconocida(consulta) {
  const timestamp = new Date().toISOString();
  const log = `${timestamp} - Consulta no reconocida: "${consulta}"\n`;

  // Añade la consulta al archivo de log, creando el archivo si no existe
  fs.appendFile(archivoConsultasNoReconocidas, log, err => {
    if (err) {
      console.error('Error al registrar consulta:', err);
    } else {
      console.log(`Consulta registrada: "${consulta}"`);
    }
  });
}

module.exports = { registrarConsultaNoReconocida };
