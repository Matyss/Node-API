import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//importing the created model
import { Task } from './models/todoListModel';

//importing db config
import { HOST_URL } from './config/db'

//create app & port
const app  = express();
const port = process.env.PORT || 3000;

//mongoose instance url connection
mongoose.Promise = global.Promise;
mongoose.connect(HOST_URL);

//handling conncetion scenarios
mongoose.connection.on('error', () => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', () => {
    console.log("Successfully connected to the database");
})

//parsing the responses
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//error handling
// app.use((req, res, err) => {
//     if(err) {
//         res.status(404).send({message: `Opps! Something went wrong. The requested url: ${req.originalUrl} was not found`});
//     }
// });

//connect routes
const routes = require('./routes/todoListRoutes');
routes(app);

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});
