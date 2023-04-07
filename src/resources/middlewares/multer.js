const multer = require('multer');
const firebase = require('firebase/app');

const firebaseConfig = {
    apiKey: 'AIzaSyBFtpd0_wPsR1k2uj3Ih4T4uRvSnpeFlMA',
    authDomain: 'esdc-final-project-ff2be.firebaseapp.com',
    projectId: 'esdc-final-project-ff2be',
    storageBucket: 'esdc-final-project-ff2be.appspot.com',
    messagingSenderId: '149475071880',
    appId: '1:149475071880:web:b36eb3c084491257650c3d',
    measurementId: 'G-4E13SQXCS1',
};

firebase.initializeApp(firebaseConfig);

const upload = multer({ storage: multer.memoryStorage() });

module.exports = upload;
