if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seedDb = require('./seed');
const foodRouter = require('./api/foodRoute');
const cors = require('cors');
const userRouter = require('./api/userRoute');
const cookieParser = require('cookie-parser')
require('dotenv').config();


// mongodb://localhost:27017/
//process.env.MONGO_URL
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to database GrabHub');
    })
    .catch((e) => {
        console.log(e);
    })
// seedDb();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://grabhub.netlify.app'],
    credentials: true
}, ))

app.options('*', cors())
app.use(cookieParser());


app.use(foodRouter);
app.use(userRouter);



const port = process.env.PORT || 8000;

app.listen(port, () => {

    console.log(`Connected at port ${port}`);
})

var http = require('http'); //importing http

function startKeepAlive() {
    setInterval(function () {
        var options = {
            host: 'https://grabhub-api.herokuapp.com/',
            port: 80,
            path: '/'
        };
        http.get(options, function (res) {
            res.on('data', function (chunk) {
                try {
                    // optional logging... disable after it's working
                    console.log("HEROKU RESPONSE: " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function (err) {
            console.log("Error: " + err.message);
        });
    }, 20 * 60 * 1000); // load every 20 minutes
}

startKeepAlive();