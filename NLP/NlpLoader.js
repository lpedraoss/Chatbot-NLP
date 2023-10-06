const NlpProcessor = require('./NlpProcessor');
const mockApi = require('../api/mock_api');
const firebaseApi = require('../api/firebase_api');

class NlpLoader {
    constructor() {
        this.nlpProcessor = new NlpProcessor();
    }

    // Carga ejemplos de entrenamiento desde MockApi
    async loadTrainingDataFromMockApi() {
        try {
            const data = await mockApi.fetchData();

            data.forEach(item => {
                this.nlpProcessor.loadTrainingData(item.intenciones, item.respuestas);
            });

            console.log('Datos cargados desde la API exitosamente.');
        } catch (error) {
            console.error('Error al cargar los datos desde la API:', error.message);
        }
    }
    // Carga ejemplos de entrenamiento desde Firebase
    async loadTrainingDataFromFirebase() {
        try {
            const data = await firebaseApi.getBrainData()

            data.forEach(item => {
                this.nlpProcessor.loadTrainingData(item.intenciones, item.respuestas);
            });

            console.log('Datos cargados desde Firebase exitosamente.');
        } catch (error) {
            console.error('Error al cargar los datos desde Firebase:', error.message);
        }
    }

    async modelTraining() {
        await this.nlpProcessor.modelTraining();
    }

    async processMssg(texto) {
        return await this.nlpProcessor.processMssg(texto);
    }
}

module.exports = NlpLoader;
