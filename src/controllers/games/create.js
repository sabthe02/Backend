const { userModel } = require('../../models/user')
const { gameModel } = require('../../models/game')

module.exports = (request, response) => {
    userModel
        .findOne({ _id: request.user.id })
        .then (() => {
            module.exports = (request, response) => {
                
                const game = request.body

                gameModel.create({
                    player: user.id,
                    score: 0,
                    opponent: , // ?? cómo obtenerlo?
                    opp_score: 0,
                    finished: false,
                    result: ['Perdido', 'Ganado', 'Empate'],
                    choices: [
                        [
                            { choice: ['Piedra', 'Papel', 'Tijera'] },
                            { choice: ['Piedra', 'Papel', 'Tijera'] },
                            { choice: ['Piedra', 'Papel', 'Tijera'] },
                            { choice: ['Piedra', 'Papel', 'Tijera'] },
                            { choice: ['Piedra', 'Papel', 'Tijera'] }
                        ]
                    ],
                    opp_choices: [
                        [
                            { choice: ['Piedra', 'Papel', 'Tijera'] },
                            { choice: ['Piedra', 'Papel', 'Tijera'] },
                            { choice: ['Piedra', 'Papel', 'Tijera'] },
                            { choice: ['Piedra', 'Papel', 'Tijera'] },
                            { choice: ['Piedra', 'Papel', 'Tijera'] }
                        ]
                    ]

         /*            request.on('end', function () {                      
                        const choice = body
                        const opp_choice = opp_choices[Math.floor(Math.random() * opp_choices.length)]
                      
                        let result
                      
                          const tied = 'Empate'
                          const win = 'Ganado'
                          const lost = 'Perdido'
                      
                          if (choice === opp_choice) {
                            result = tied
                          } else if (
                              (choice === 'Piedra' && opp_choice === 'Papel') ||
                              (choice === 'Papel' && opp_choice === 'Tijera') ||
                              (choice === 'Tijera' && opp_choice === 'Piedra')
                          ) {
                            result = lost
                          } else {
                            result = win
                          }
                          response.writeHead(200, { 'Content-Type': 'text/plain' })
                          response.end(`Elegiste ${choice}. El juego fue ${result}`)
                        })
                      } */
//------------------
        
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
        }
}
