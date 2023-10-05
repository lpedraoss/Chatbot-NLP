const { getFirestore, collection, getDocs } = require('firebase/firestore');
const { firebaseApp } = require('../firebaseConfig')
const db = getFirestore(firebaseApp);

const getBrainData = async () => {
    const colRef = collection(db, 'brain'); // 'brain' es el nombre de la colección
    const data = await getDocs(colRef);
    return data.docs.map(doc => doc.data());
};

module.exports = { getBrainData };
