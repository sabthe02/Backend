const { gameModel } = require('../../models/game')

module.exports = (request, response) => {
    gameModel
        .find({ $or: [{ player: request.user.id }, { opponent: request.user.id }] })
        .populate('player') 
        .populate('opponent')
        .then(games => {
            response.status(200).json({
                games
            })
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al intentar obtener las partidas'
        })
    })
}
