const { userModel } = require('../../models/user')

module.exports = (request, response) => {
    userModel
        .findOne({ _id: request.user.id })
        .then(user => {
            const playedGame = user.games.id(request.params.id)

            response.status(200).json({
                playedGame
            })
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al intentar obtener una partida'
            })
        })
}
