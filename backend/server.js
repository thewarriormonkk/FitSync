const express = require('express')
const mongoose = require('mongoose')
// const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
require('dotenv').config()
const userRoutes = require('./routes/user')

// express app
const app = express();

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
// app.use(cors())

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for incoming requests
        app.listen(process.env.PORT || 3000, () => {
            console.log(`connected to db & listening on port ${process.env.PORT} `)
        });
    }).catch((err) => {
        console.log(err)
    })


