require('dotenv').config()

const mongoose = require('mongoose')
const mongooseToJson = require('@meanie/mongoose-to-json')
const express = require('express')
const cors =  require('cors')
const getDbConnectionString = require('./utils/get-db-connection-string')

mongoose.plugin(mongooseToJson)


const app = express()


const checkUserCredentials = require('./middlewares/check-user-credentials')

app.use(cors())
app.use(express.json())


const refresh = require('./controllers/auth/refresh')

// Users
const login = require('./controllers/user/login')
const register = require('./controllers/user/register')
const getAllUsers = require('./controllers/user/get-all')
const getUserById = require('./controllers/user/get-by-id')

// Games
const getGamesByUser = require('./controllers/games/get-games-by-user')
const createGame = require('./controllers/games/create')
const updateGame = require('./controllers/games/update')
const viewGame = require('./controllers/games/get-by-id')

// Events
const createEvent = require('./controllers/events/create')

const getRegisterEventsCount = require('./controllers/events/register/get-register-events-count')


// ############################
// Definicion de rutas
// ############################

// Security
app.get('/auth/refresh', checkUserCredentials('REFRESH'), refresh)

// Users
app.post('/login', login)
app.post('/register', register)
app.get('/users', checkUserCredentials(), getAllUsers)
app.get('/users/:id', checkUserCredentials(), getUserById)

// Games
app.get('/games/users', checkUserCredentials(), getGamesByUser)
app.post('/games', checkUserCredentials(), createGame)
app.put('/games/game', checkUserCredentials(), updateGame)
app.get('/games/:id', checkUserCredentials(), viewGame)

// Stats
app.post('/events', checkUserCredentials(), createEvent)

app.get('/stats/events/register/count', checkUserCredentials(), getRegisterEventsCount)

mongoose.connect(getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Comenzar a escuchar por conexiones
        app.listen(process.env.PORT)
    }).catch(error => {
        console.error('No fue posible conectarse a la base de datos', error)
    })