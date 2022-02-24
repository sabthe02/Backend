const { gameModel } = require('../../models/game')

module.exports = (request, response) => {
    gameModel
        .findOne({ _id: request.params.id })
        .then(user => {
            const game = user.games.id(request.params.id)

            game.set(request.body)

            user.save().then(() => {
                response.status(200).end()
            }).catch(error => {
                console.error(error)

                response.status(500).json({
                    message: 'Error al intentar modificar una partida'
                })
            })
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al intentar modificar una partida'
            })
        })
}
