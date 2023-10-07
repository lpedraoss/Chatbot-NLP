const { NlpManager } = require('node-nlp');

class NlpProcessor {
    constructor() {
        this.manager = new NlpManager({ languages: ['es'] });
    }

    loadTrainingData(intenciones, respuestas) {
        intenciones.forEach((intencion, index) => {
            this.manager.addDocument('es', intencion, respuestas[index]);
        });
    }

    async modelTraining() {
        await this.manager.train();
        this.manager.save();
        console.log('Modelo entrenado y guardado.');
    }

    async processMssg(texto) {

        const response = await this.manager.process('es', texto);

        return response.intent.toString(); // Convertir la respuesta a un string.
    }
}

module.exports = NlpProcessor;
