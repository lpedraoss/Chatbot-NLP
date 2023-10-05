const NlpProcessor = require('./NlpProcessor');
const mockApi = require('../api/get_data');

class NlpLoader {
    constructor() {
        this.nlpProcessor = new NlpProcessor();
    }

    // Carga ejemplos de entrenamiento desde la API
    async loadTrainingData() {
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

    async modelTraining() {
        await this.nlpProcessor.modelTraining();
    }

    async processMssg(texto) {
        return await this.nlpProcessor.processMssg(texto);
    }
}

module.exports = NlpLoader;
