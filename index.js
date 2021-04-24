const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config');

const app = express();
//mongoose.connect("mongodb://admin:password@mongodb:27017/?authsource=admin")
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authsource=admin`;

const connectWithRetry = () =>{
    mongoose.connect(mongoURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => {
        console.log(e)
        setTimeout(connectWithRetry, 5000)
    });
}
connectWithRetry();


const port = process.env.PORT || 3000;


app.get('/', (req, res) =>{
    return res.send("Hello to somebody there lala");
})

app.listen(port, () => console.log(`Listening on port ${port}`));