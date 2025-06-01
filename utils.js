const fs = require('fs');
const { archivoConsultasNoReconocidas } = require('./config');

function registrarConsultaNoReconocida(consulta) {
  const timestamp = new Date().toISOString();
  const log = `${timestamp} - Consulta no reconocida: "${consulta}"\n`;
  fs.appendFile(archivoConsultasNoReconocidas, log, err => {
    if (err) console.error('Error al registrar consulta:', err);
    else console.log(`Consulta registrada: "${consulta}"`);
  });
}

module.exports = { registrarConsultaNoReconocida };
