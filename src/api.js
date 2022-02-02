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

// Partidas
const getAllGames = require('./controllers/games/get-all')
const getGameById = require('./controllers/games/get-by-id')
const createGame = require('./controllers/games/create')
const updateGame = require('./controllers/games/update')

// Events
const createEvent = require('./controllers/events/create')

const getGroupedEvents = require('./controllers/events/get-grouped-events')
const getLoginRegisterGroupedEvents = require('./controllers/events/get-grouped-login-register-events')

const getLoginEventsInOverTime = require('./controllers/events/login/get-login-events-in-over-time')
const getLoginEvents = require('./controllers/events/login/get-login-events')
const getLoginEventsCount = require('./controllers/events/login/get-login-events-count')

const getRegisterEventsInOverTime = require('./controllers/events/register/get-register-events-in-over-time')
const getRegisterEvents = require('./controllers/events/register/get-register-events')
const getRegisterEventsCount = require('./controllers/events/register/get-register-events-count')

const getNavigationEventsInOverTime = require('./controllers/events/navigation/get-navigation-events-in-over-time')

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
app.get('/games', checkUserCredentials(), getAllGames)
app.get('/games/:id', checkUserCredentials(), getGameById)
app.post('/games', checkUserCredentials(), createGame)
app.put('/games/:id', checkUserCredentials(), updateGame)

// Stats
app.post('/events', checkUserCredentials(), createEvent)

app.get('/stats/events/login', checkUserCredentials(), getLoginEvents)
app.get('/stats/events/login/count', checkUserCredentials(), getLoginEventsCount)

app.get('/stats/events/register', checkUserCredentials(), getRegisterEvents)
app.get('/stats/events/register/count', checkUserCredentials(), getRegisterEventsCount)

app.get('/stats/events/grouped', checkUserCredentials(), getGroupedEvents)
app.get('/stats/events/grouped/login-register', checkUserCredentials(), getLoginRegisterGroupedEvents)

app.get('/stats/events/login/in-over-time', checkUserCredentials(), getLoginEventsInOverTime)
app.get('/stats/events/register/in-over-time', checkUserCredentials(), getRegisterEventsInOverTime)
app.get('/stats/events/navigation/in-over-time', checkUserCredentials(), getNavigationEventsInOverTime)

mongoose.connect(getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Comenzar a escuchar por conexiones
        app.listen(process.env.PORT)
    }).catch(error => {
        console.error('No fue posible conectarse a la base de datos', error)
    })