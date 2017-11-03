'use strict';

/**
* We are using express as the backbone of our project. We are importing express
* into our project.
*/
const express = require('express');

/**
* NodeJS's primary module. Does not require to install it. It provides utilities
* for working with files and directories.
*/
const path = require('path');

const app = express();

/**
* Here we are registering a route to /data. That means we are trying to say what will
* happen when a get request will come on /data.
*/
app.get('/data', (req,res) => {
    res.send('Hello World.');
});

/**
* So in our application we are trying to serve the view.html when the / route is
* accessed. That page will call another route to get some data and will serve the
* page.
*/
app.get('/', (req, res) => {
    res.sendFile(path.resolve('view/view.html'));
});

/**
* We are making our app to listen to a certain port.
*/
app.listen(<%=PORT%>, () => {
    console.log('Our App is running at port <%=PORT%>');
});