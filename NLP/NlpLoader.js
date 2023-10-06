const NlpProcessor = require('./NlpProcessor');
const mockApi = require('../api/mock_api');
const firebaseApi = require('../api/firebase_api');

class NlpLoader {
    constructor() {
        this.nlpProcessor = new NlpProcessor();
    }

    async loadTrainingDataFromApi(apiFunction) {
        try {
            const data = await apiFunction();
            data.forEach(async item => {
                this.nlpProcessor.loadTrainingData(item.intenciones, item.respuestas);
                await this.nlpProcessor.modelTraining();
            });
            console.log('Datos cargados exitosamente.');
        } catch (error) {
            console.error('Error al cargar los datos:', error.message);
        }
    }

    async loadTrainingDataFromMockApi() {
        await this.loadTrainingDataFromApi(mockApi.fetchData.bind(mockApi));
    }

    async loadTrainingDataFromFirebase() {
        await this.loadTrainingDataFromApi(firebaseApi.getBrainData.bind(firebaseApi));
    }

    async processMssg(texto) {
        return await this.nlpProcessor.processMssg(texto);
    }
}

module.exports = NlpLoader;
