const { userModel } = require('../../models/user')

module.exports = (request, response) => {
    userModel
        .findOne({ _id: request.user.id })
        .then(user => {
            const playedGame = user.games.id(request.params.id)

            playedGame.set(request.body)

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
