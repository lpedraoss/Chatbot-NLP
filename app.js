// main.js
const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const saludo = require('./mssg/saludo.json')
const preguntaFacultad = require('./mssg/preguntaFacultad.json')
const agradecimiento = require('./mssg/agradecimiento.json')
const servicios = require('./mssg/servicios.json')
const { MSSG_STATE } = require('./mssg/mssg');
const NlpProcessor = require('./NLP/NlpProcessor');

// Crea una instancia de NlpProcessor
const nlpProcessor = new NlpProcessor();

// Carga ejemplos de entrenamiento
nlpProcessor.cargarEjemplos(servicios.intenciones, servicios.respuestas)
nlpProcessor.cargarEjemplos(saludo.intenciones, saludo.respuestas);
nlpProcessor.cargarEjemplos(preguntaFacultad.intenciones, preguntaFacultad.respuestas);
nlpProcessor.cargarEjemplos(agradecimiento.intenciones, agradecimiento.respuestas);
// Entrena el modelo
(async () => {
    await nlpProcessor.entrenarModelo();
})();

const flowBienvenida = addKeyword(EVENTS.WELCOME)
    .addAnswer(MSSG_STATE.ALTERN, {
        delay: 1000,
    }, async (ctx, { flowDynamic }) => {
        const text = await ctx.body.toString();
        console.log(text);
        try {
            // Debes esperar la respuesta de la función processMssg aquí, utilizando await
            const respuesta = await nlpProcessor.processMssg(text);
            console.log(respuesta)
            console.log('respuesta', typeof respuesta);
            console.log('entrada', typeof ctx.body);
            // Utiliza un template literal para incluir la respuesta en el mensaje
            await flowDynamic(`${respuesta}`);
        } catch (error) {
            console.error("Error al procesar el mensaje:", error);
        }

    });
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowBienvenida])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()

}

main();
