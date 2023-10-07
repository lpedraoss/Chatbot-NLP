const NlpLoader = require('../../NLP/NlpLoader');
const expectedFacultyResponses = require('../response/preguntasFacultad.json')
/* TO DO
  - SALUDOS
  - DESPEDIDAS
  - OTROS CASOS */
///test para los datos cargados de mockApi
test('processMssg procesa correctamente después de cargar datos y entrenar con mockApi', async () => {
  const nlpLoader = new NlpLoader();

  await nlpLoader.loadTrainingDataFromMockApi();
  await nlpLoader.nlpProcessor.modelTraining();

  const respuesta = await nlpLoader.processMssg('la universidad que tiene');

  // Verifica que la respuesta obtenida esté dentro de las respuestas esperadas
  expect(expectedFacultyResponses.respuestas).toContain(respuesta);
  console.log('respuesta correcta ==> ',respuesta);
});

