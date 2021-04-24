const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, SESSION_SECRET, COOKIE_NAME, REDIS_URL, REDIS_PORT } = require('./config');

const redis = require('redis');
const session = require('express-session');
const connectRedis = require('connect-redis');

const app = express();

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authsource=admin`;

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({host: REDIS_URL, port: REDIS_PORT});

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

app.use(session({
    name: COOKIE_NAME,
    store: new RedisStore({client: redisClient, disableTouch: true}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax'
        //secure: true
    },
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: false
}))
app.use(express.json());

app.use("/api/v1/post", postRouter);
app.use("/api/v1/user", userRouter)

const port = process.env.PORT || 3000;


app.get('/', (req, res) =>{
    return res.send("Hello to somebody there lala");
})

app.listen(port, () => console.log(`Listening on port ${port}`));