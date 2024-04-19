const express = require("express")
const productsRouter = require('./routers/productsRouts.js')
const usersRouter = require('./routers/usersRouts.js')
const app = express();
// const test =require('./models/productsModel.js')
const mongoose = require('mongoose');

app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)



const url = 'mongodb+srv://$_USERNAME_$:$_PASSWORD_$@cluster0.vmpbhyy.mongodb.net/$_DB_NAME_$?retryWrites=true&w=majority&appName=Cluster0'
const databaseUser = 'prafull';
const databasePassword = '12345';
const databaseName = 'Amazon-Backend';

let dbLink = url.replace("$_USERNAME_$", databaseUser)
dbLink = dbLink.replace("$_PASSWORD_$", databasePassword)
dbLink = dbLink.replace("$_DB_NAME_$", databaseName)

mongoose.connect(dbLink)
    .then(
        () => console.log(' ----data Connected!----')
    );

app.listen(1400,
    () => console.log("----App connect----")
);