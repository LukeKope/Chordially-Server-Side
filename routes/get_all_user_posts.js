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

var getOptions = {
    source: "default"
};

let userArr = []
router.get("/:id", (req, res) => {
    let queryId = req.params.id ? req.params.id: ''; //we've defined ID above, we're able to get it as a param
    let docRef = db.collection("chords"); //We're setting the query ID, then we're passing it into the blog-posts collection in our firebase as a reference which we will use to get data
    let query = docRef
        .where("UserID", "==", queryId)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log("No matching documents.");
                return;
            }
            snapshot.forEach(doc => {
                userArr.push(doc.data());
            });
            res.send(userArr);
        })
        .catch(err => {
            console.log("Error getting documents", err);
        });

        userArr = [];
                   
});





//we're exporting the router here.
module.exports = router;
