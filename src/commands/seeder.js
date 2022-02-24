require('dotenv').config()

const bcrypt = require('bcrypt')
const faker = require('faker')
const mongoose = require('mongoose')
const getDbConnectionString = require('../utils/get-db-connection-string')

const { userModel } = require('../models/user')
const { gameModel } = require('../models/game')

const userPassword = bcrypt.hashSync('super_super_secret', 2)

const users = []


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
                        ],
                        [
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                        ],
                        [
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
                        ],
                        [
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) },
                            { choice: faker.random.arrayElement(['Piedra', 'Papel', 'Tijera']) }
                        ],
                        [
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

            gameModel.insertMany(games).then(() => {
                mongoose.connection.close()
            })
               
        })

    }).catch(error => {
        console.error('No fue posible conectarse a la base de datos', error)
    })