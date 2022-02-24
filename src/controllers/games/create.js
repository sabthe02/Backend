const { gameModel } = require('../../models/game')
const { eventModel } = require('../../models/event')

module.exports = (request, response) => {

    eventModel
        .count({ type: eventTypes.REGISTER })
        .then(events => {
            response.status(200).json({
                events
            })
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al contar los eventos de registro'
            })
        })
        if (events > 0 && request.user.games.finished !== false) {
            gameModel.create({
                player: request.user.id,
                score: 0,
                opponent: request.body.opponent, 
                opp_score: 0,
                finished: false,
                result: ['Perdido', 'Ganado', 'Empate'],
                choices: [
                            [
                                { choice: ['Piedra', 'Papel', 'Tijera'] },
                                { choice: ['Piedra', 'Papel', 'Tijera'] },
                                { choice: ['Piedra', 'Papel', 'Tijera'] },
                            ]
                        ],
                opp_choices: [
                            [
                                { choice: ['Piedra', 'Papel', 'Tijera'] },
                                { choice: ['Piedra', 'Papel', 'Tijera'] },
                                { choice: ['Piedra', 'Papel', 'Tijera'] },
                            ]
                        ]

            }).then(game => { 
                response.status(200).json({
                game
                })
            }).catch(error => {
                console.error(error)
                    
                response.status(500).json({
                    message: 'No se pudo crear la partida'
                })
            })
        }
        else {
            response.status(500).json({
                message: 'No hay usuarios contra quienes iniciar la partida o ya hay una partida en curso contra este usuario'
            })
        } 
    } 
        


