// Utilidad para leer variables de entorno (archivo .env)
require('dotenv').config()

// Dependencias externas a utilizar
const bcrypt = require('bcrypt')
const faker = require('faker')
const mongoose = require('mongoose')
const getDbConnectionString = require('../utils/get-db-connection-string')

// Importo los modelos a utilizar
const { userModel } = require('../models/user')
const { gameModel } = require('../models/game')

// Password para utilizar en los usuarios a crear
const userPassword = bcrypt.hashSync('super_super_secret', 2)

// Declaramos lista de documentos a insertar en las colecciones

const users = []

// Generar una lista de usuarios

for (let numeroDeIteracion = 0; numeroDeIteracion <= 15; numeroDeIteracion++) {
    users.push({
        nickname: faker.name.findName(),
        password: userPassword
    })
}

console.log('#############################')
console.log('Seed de datos')
console.log('#############################')
console.log('Se van a insertar:')
console.log(`${users.length} Usuarios`)

mongoose.connect(getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        userModel.insertMany(users).then((usersInsertados) => {
            const games = []

            // Generar una lista de partidas
            for (let i = 0; i < usersInsertados.length; i += 2) {
                games.push({
                    player: usersInsertados[i]._id,
                    opponent: usersInsertados[i + 1]._id,
                    choices: [
                        [
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                        ],
                        [
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                        ],
                        [
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                        ],
                    ],

                    opp_choices: [
                        [
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                        ],
                        [
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                        ],
                        [
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                        ],
                    ],

                    score: faker.datatype.number({
                        min: 0,
                        max: 5
                    }),
                    opp_score: faker.datatype.number({
                        min: 0,
                        max: 5
                    }),
                    finished: faker.datatype.boolean(),
                    result: faker.random.arrayElement(['Perdido', 'Ganado', 'Empate']),
                })
            }
    
    
            console.log('#############################')
            console.log('Seed de datos')
            console.log('#############################')
            console.log('Se van a insertar:')
            console.log(`${games.length} Games`)

            gameModel.insertMany(games)
               
        })

    }).catch(error => {
        console.error('No fue posible conectarse a la base de datos', error)
    })