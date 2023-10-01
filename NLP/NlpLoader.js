// nlpLoader.js
const NlpProcessor = require('./NlpProcessor');
const saludo = require('../mssg/saludo.json');
const preguntaFacultad = require('../mssg/preguntaFacultad.json');
const agradecimiento = require('../mssg/agradecimiento.json');
const servicios = require('../mssg/servicios.json');

class NlpLoader {
    constructor() {
        this.nlpProcessor = new NlpProcessor();
    }
    // Carga ejemplos de entrenamiento
    async loadTrainingData() {
        await this.nlpProcessor.loadTrainingData(servicios.intenciones, servicios.respuestas);
        await this.nlpProcessor.loadTrainingData(saludo.intenciones, saludo.respuestas);
        await this.nlpProcessor.loadTrainingData(preguntaFacultad.intenciones, preguntaFacultad.respuestas);
        await this.nlpProcessor.loadTrainingData(agradecimiento.intenciones, agradecimiento.respuestas);
    }

    async modelTraining() {
        await this.nlpProcessor.modelTraining();
    }

    async processMssg(texto) {
        return await this.nlpProcessor.processMssg(texto);
    }
}

module.exports = NlpLoader;
