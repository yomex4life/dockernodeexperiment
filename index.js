const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config');

const app = express();

const postRouter = require('./routes/postRoutes');
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

app.use(express.json());

app.use("/api/v1/post", postRouter);

const port = process.env.PORT || 3000;


app.get('/', (req, res) =>{
    return res.send("Hello to somebody there lala");
})

app.listen(port, () => console.log(`Listening on port ${port}`));