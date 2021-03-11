require('dotenv').config();


const express = require('express');
const app = express();
const port = process.env.PORT;

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routes = require('./routes');
const handlers = require('./handlers');

app.get('/', (request, response) => {
    const {url} = request;
    response.json({
        "message": `Your current URL is root ${url}`
    });
}); 

app.use('/api/auth', routes.auth);
app.use('/api/adminmodule', routes.adminModule);
app.use('/api/carmodule', routes.carModule);  
app.use('/api/visitmodule', routes.visitModule);
app.use('/api/usermodule', routes.userModule);

app.use(handlers.notFound);
app.use(handlers.errorHandlers);

app.listen(port, console.log(`PGL Visitor Managment system is listening on port ${port}`))