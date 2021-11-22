const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seedDb = require('./seed');
const foodRouter = require('./api/foodRoute');
const cors = require('cors');
const userRouter = require('./api/userRoute');
const cookieParser = require('cookie-parser')
require('dotenv').config();



mongoose.connect('mongodb://localhost:27017/GrabHub')
    .then(() => {
        console.log('Connected to database GrabHub');
    })
    .catch((e) => {
        console.log(e);
    })
// seedDb();


app.use(cors({
    credentials: true
}));
app.options('*', cors())
app.use(express.json());
app.use(cookieParser());

app.use(foodRouter);
app.use(userRouter);






const port = process.env.PORT || 8000;

app.listen(port, () => {

    console.log(`Connected at port ${port}`);
})