const natural = require('natural');
const stringSimilarity = require('string-similarity');
const fs = require('fs');

// Importa configuración y función para registrar preguntas no reconocidas
const { archivoConsultasNoReconocidas, UMBRAL_SIMILITUD } = require('./config');
const { registrarConsultaNoReconocida } = require('./utils');

const tokenizer = new natural.WordTokenizer(); // Tokenizador de palabras
const stemmer = natural.PorterStemmer; // stemmer

let corpus = [];             // Corpus original
let corpusProcesado = [];    // Corpus transformado con stemming

// Carga y preprocesa el corpus desde un archivo JSON
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

// Busca una respuesta según la similitud con el corpus
function buscarRespuesta(inputUsuario) {
  const inputProcesado = tokenizer.tokenize(inputUsuario.toLowerCase())
    .map(stemmer.stem)
    .join(' ');

  let mejorCoincidencia = {
    puntuacion: 0,
    respuesta: "Lo siento, no entendí tu pregunta. ¿Podrías reformularla?"
  };

  // Compara el input procesado con cada pregunta del corpus
  corpusProcesado.forEach(item => {
    const puntuacion = stringSimilarity.compareTwoStrings(inputProcesado, item.preguntaProcesada);
    if (puntuacion > mejorCoincidencia.puntuacion && puntuacion >= UMBRAL_SIMILITUD) {
      mejorCoincidencia = { puntuacion, respuesta: item.respuesta };
    }
  });

  // Si no encuentra una coincidencia válida, registra la consulta como no reconocida
  if (mejorCoincidencia.puntuacion < UMBRAL_SIMILITUD) {
    registrarConsultaNoReconocida(inputUsuario);
  }

  return mejorCoincidencia.respuesta;
}

module.exports = { buscarRespuesta };
