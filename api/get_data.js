const mockApi = {
    fetchData: async () => {
        try {
            const response = await fetch('https://651ec35444a3a8aa4768f653.mockapi.io/brain/');
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
