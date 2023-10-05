// main.js
const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const { MSSG_STATE } = require('./common/mssg.enum');
const NlpLoader = require('./NLP/NlpLoader');

// Crea una instancia de NlpLoader
const nlpLoader = new NlpLoader();

const flowBienvenida = addKeyword(EVENTS.WELCOME)
    .addAnswer(MSSG_STATE.ALTERN, {
        delay: 1000,
    }, async (ctx, { flowDynamic }) => {
        const text = await ctx.body.toString();
        console.log(text);
        console.log('celular', ctx.from)
        try {
            // Debes esperar la respuesta de la función processMssg aquí, utilizando await
            const respuesta = await nlpLoader.processMssg(text);
            console.log(respuesta)
            console.log('respuesta', typeof respuesta);
            console.log('entrada', typeof ctx.body);
            if (respuesta.includes('None')) {
                return flowDynamic('No te entendí, por favor escribe de nuevo')
            } else {
                // Utiliza un template literal para incluir la respuesta en el mensaje
                await flowDynamic(`${respuesta}`);
            }

        } catch (error) {
            console.error("Error al procesar el mensaje:", error);
        }

    });
const main = async () => {

    // Entrena el modelo
    await nlpLoader.loadTrainingData();
    await nlpLoader.modelTraining();
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
