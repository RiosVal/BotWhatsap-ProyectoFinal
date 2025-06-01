const natural = require('natural');
const stringSimilarity = require('string-similarity');
const fs = require('fs');
const { archivoConsultasNoReconocidas, UMBRAL_SIMILITUD } = require('./config');
const { registrarConsultaNoReconocida } = require('./utils');

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

let corpus = [];
let corpusProcesado = [];

try {
  const data = fs.readFileSync('corpus.json', 'utf8');
  corpus = JSON.parse(data);

  corpusProcesado = corpus.map(item => {
    const stems = tokenizer.tokenize(item.pregunta.toLowerCase()).map(stemmer.stem);
    return { ...item, preguntaProcesada: stems.join(' ') };
  });
} catch (error) {
  console.error('Error cargando corpus:', error);
  process.exit(1);
}

function buscarRespuesta(inputUsuario) {
  const inputProcesado = tokenizer.tokenize(inputUsuario.toLowerCase())
    .map(stemmer.stem)
    .join(' ');

  let mejorCoincidencia = {
    puntuacion: 0,
    respuesta: "Lo siento, no entendí tu pregunta. ¿Podrías reformularla?"
  };

  corpusProcesado.forEach(item => {
    const puntuacion = stringSimilarity.compareTwoStrings(inputProcesado, item.preguntaProcesada);
    if (puntuacion > mejorCoincidencia.puntuacion && puntuacion >= UMBRAL_SIMILITUD) {
      mejorCoincidencia = { puntuacion, respuesta: item.respuesta };
    }
  });

  if (mejorCoincidencia.puntuacion < UMBRAL_SIMILITUD) {
    registrarConsultaNoReconocida(inputUsuario);
  }

  return mejorCoincidencia.respuesta;
}

module.exports = { buscarRespuesta };
