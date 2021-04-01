require('dotenv').config();

const express = require('express');
const app = express();

//Port Number Gotten from local .env file
const port = process.env.PORT;

//Start of normal express/node boiler plate template
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
//End of normal boiler plate code

//Routes are imported to direct user request to a specific area in the api
const routes = require('./routes');
// Imported Default error handlers to help with errors from unknown paths, i.e if a call is made to an unexisting path
const handlers = require('./handlers');

app.get('/', (request, response) => {
    const {url} = request;
    response.json({
        "message": `Your current URL is root ${url}`
    });
}); 

//Hard coded paths, when visited its respective handler function is ran.
app.use('/api/auth', routes.auth);
app.use('/api/adminmodule', routes.adminModule);
app.use('/api/carmodule', routes.carModule);  
app.use('/api/visitmodule', routes.visitModule);
app.use('/api/usermodule', routes.userModule);

// If  a path on the server that hasn't been defined above is called the not found error handler is called 
app.use(handlers.notFound);
app.use(handlers.errorHandlers);

//define the port and instanciate the api service on that port
app.listen(port, console.log(`PGL Visitor Managment system is listening on port ${port}`))