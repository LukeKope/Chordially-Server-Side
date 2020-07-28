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

//Submit Data
//we don't need to write /submit, we can just use / as the route will direct the user to /submit anyways
router.get("/", (req,res) => {
    //Now that we've added the data, how do we get the data?
    //We need to use URL parameters!
    //Ex. localhost4000/submit?title=title=text=text&author=RandomName
    //Setting the queries to be in the url like with API queries
    let DatePostedVal = req.query.datePosted ? req.query.datePosted: '';
    let DescriptionVal = req.query.description ? req.query.description: '';
    let NotesVals = req.query.notes ? req.query.notes: '';
    let TitleVal = req.query.title ? req.query.title: '';
    let UserIDVal = req.query.userID ? req.query.userID: ''; //using turnary to check if the author query exists. We're actually getting the data we're adding to firebase

    db.collection("chords")
    .add({
        DatePosted: DatePostedVal,
        Description: DescriptionVal,
        Notes: NotesVals,       
        Title: TitleVal,
        UserID: UserIDVal
    })
    .then(ref => res.send(ref)) //send the data
    .catch(e => res.send(e));
} )

//we're exporting the router here.
module.exports = router;
