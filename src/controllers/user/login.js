const bcrypt = require('bcrypt')
const createToken = require('../../utils/create-token')
const storeEvent = require('../../utils/store-event')
const eventTypes =  require('../../models/event-types')
const { userModel } = require('../../models/user')
const { CONSUMER_TOKEN_TYPE, REFRESH_TOKEN_TYPE } = require('../../utils/token-types')

const returnCredentials = (user, response) => {
    // Elimino campos que no quiero mostrar en la respuesta
    const userWithoutPassword = user.toJSON()

    delete userWithoutPassword.games
    delete userWithoutPassword.password

    // Agregamos token de usuario
    userWithoutPassword.token = createToken(user, CONSUMER_TOKEN_TYPE, '20m')

    // Agregamos refresh token de usuario
    userWithoutPassword.refreshToken = createToken(user, REFRESH_TOKEN_TYPE, '2d')

    // Creamos evento de tipo LOGIN
    storeEvent({
        type: eventTypes.LOGIN,
        context: { id: user.id }
    }).then().catch(error => { console.error(error) })

    // Retornamos el usuario
    response.json({
        user: userWithoutPassword
    })
}

module.exports = (request, response) => {
    userModel.findOne({
        nickname: request.body.nickname
    }).then(user => {
        if (user) {
            // Comparamos la password ingresada por el usuario con la guardada en la base de datos
            const match = bcrypt.compareSync(request.body.password, user.password)

            if (match) {
               returnCredentials(user, response)
                }
            else {
                console.error('Password no coincide')
                response.status(401).end()
            }
            } else {
            console.error('No se encontro el usuario')
            response.status(401).end()
        }
    }).catch(error => {
        console.error(error)

        response.status(500).json({
            message: 'Error al intentar iniciar sesion'
        })
    })
}
