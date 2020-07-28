// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");


const express = require('express');
const app = express();
//to run the server you need to run in command line node app.js (note the name of this file is app.js)
//accessing the environmental variable of port that Heroku gives you
//If the process environmental variable exists, it will use it, otherwise it will default to 3000
const port = process.env.PORT || 4000;
const path = require("path"); //


//Adding CORS here to allow for the client-side to make requests to the API without getting the Access Allow Origin missing error
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://eloquent-jackson-ba0dff.netlify.app"); // "http://localhost:3000" // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/*This is a simple route. There's a pattern to it. get is an http method. You could put post and it would post the data you're passing in as parameter. The data here is a route and a callback function
This is the basis for an API request right here. The app.get('/' is just express syntax. The next part we've seen before
Because the http method is in the route, we're not using app.get, we're using app.use */
 
const indexRoute = require('./routes/index.js');
const createPostRoute = require('./routes/create_post.js');
const getAllUserPostsRoute = require('./routes/get_all_user_posts.js');


/*----Serve files in Express. This is a more explicit way to get your directory----*/
app.use(express.static(path.join(__dirname, "public")));


//Routing in express
app.use("/", indexRoute);
app.use("/create-post", createPostRoute);
app.use("/get-all-user-posts", getAllUserPostsRoute);


/* Here were going to set up a form to submit from. We already have an endpoint above but juts to demonstrate the usage of this let's create a form
Set the route to the form here. So we need to go to /submit-form*/
//app.use("/submit-form", (req, res) => 
 // res.sendFile("/public/form.html", {root: __dirname}) //specify root if you want this to work across multiple platforms
//);

/*app.listen (listen is a method inside of express) The first argument it recieves is a port, the second is a callback function. listen allows you to listen for anythin that happens in that express isntance
You can log IP's, etc. It creates a listen event and that event allows you to use this in the browser */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));




