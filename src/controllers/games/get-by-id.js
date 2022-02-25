const { gameModel } = require('../../models/game')

module.exports = (request, response) => {
    gameModel
        .findOne({ game: request.params.game })
        .populate('player')
        .populate('opponent')
        .then(game => {
            response.status(200).json({
                game
            })
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al intentar obtener una partida'
            })
        })
}