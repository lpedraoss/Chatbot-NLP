const { BRAIN } = require('../common/brain.enum')
const mockApi = {
    fetchData: async () => {
        try {
            const response = await fetch(BRAIN.brainUrl);
            if (!response.ok) {
                throw new Error('Error al obtener datos de la API');
            }
            return await response.json();
        } catch (error) {
            throw new Error('Error al obtener datos de la API: ' + error.message);
        }
    },
};

module.exports = mockApi;
