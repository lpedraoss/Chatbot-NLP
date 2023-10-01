// NlpProcessor.js
const { NlpManager } = require('node-nlp');

class NlpProcessor {
    constructor() {
        this.manager = new NlpManager({ languages: ['es'] });
    }

    cargarEjemplos(intenciones, respuestas) {
        intenciones.forEach((intencion, index) => {
            this.manager.addDocument('es', intencion, respuestas[index]);
        });
    }

    async entrenarModelo() {
        await this.manager.train();
        this.manager.save();
        console.log('Modelo entrenado y guardado.');
    }
    async processMssg(texto) {
        const secund = await this.manager.process('es', 'hola')
        const secundAns = await secund.intent;
        console.log('adentro del prc', secundAns);

        const response = await this.manager.process('es', texto);

        const intent = await response.intent;
        const answer = await response.answer;

        return intent.toString(); // Convertir la respuesta a un string.
    }

}

module.exports = NlpProcessor;
