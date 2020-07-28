const express = require('express');
//We've referenced our express file
const router = express.Router();
const firebase = require('firebase');

const firebaseConfig = {
    //Best practice is to remove the API key into the .env.local file so that people can't see your key! Make sure to add .env.local to the gitIgnore, and make sure to add
    //the name you call it (here it's FIREBASE_API_KEY), and add that to the config variables in Heroku with the same name and value
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECTID
};
if (!firebase.apps.length) { //checks to see if firebase exists/has already loaded so we don't have duplicate instances of firebase
    firebase.initializeApp(firebaseConfig);
}
//this gives you access to the firestore database
const db = firebase.firestore();

//This is the code to get all of the chords
let userArr = [];
db.collection('chords').get()
    .then(user => {            
            user.forEach(userData =>{
                userArr.push(userData.data());
            });            
            console.log('Users', userArr);
        }
    )
    .catch(err => {
        console.log('error', err);
    })

router.get('/', (req, res) => {
    res.send(userArr);
});


//we're exporting the router here.
module.exports = router;

