const { userModel } = require('../../models/user')

module.exports = (request, response) => {
    userModel
        .findOne({ _id: request.user.id })
        .then(user => {
            user.games.push(request.body)

            user.save().then(() => {
                response.status(201).end()
            }).catch(error => {
                console.error(error)

                response.status(500).json({
                    message: 'Error al iniciar la partida'
                })
            })
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al iniciar la partida'
            })
        })
}
