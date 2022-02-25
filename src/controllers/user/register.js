const bcrypt = require('bcrypt')
const Joi = require('joi')
const storeEvent = require('../../utils/store-event')
const eventTypes =  require('../../models/event-types')
const createToken = require('../../utils/create-token')
const { userModel } = require('../../models/user')
const { REFRESH_TOKEN_TYPE, CONSUMER_TOKEN_TYPE } = require('../../utils/token-types')

module.exports = (request, response) => {
    const user = request.body

    const schema = Joi.object({
        nickname: Joi.string()
            .required(),
        password: Joi.string()
            .min(7)
            .max(50)
            .required()
    })

    const validationResult = schema.validate(user)

    if (!validationResult.error) {
        user.password = bcrypt.hashSync(user.password, 2)

        userModel.create({
            password: user.password,
            nickname: user.nickname,
            games: []

        }).then(user => {
            const userWithoutPassword = user.toObject()

            delete userWithoutPassword.games
            delete userWithoutPassword.password

            userWithoutPassword.token = createToken(user, CONSUMER_TOKEN_TYPE, '20m')
        
            userWithoutPassword.refreshToken = createToken(user, REFRESH_TOKEN_TYPE, '2d')

            storeEvent({
                type: eventTypes.REGISTER,
                context: { id: user.id }
            }).then().catch(error => { console.error(error) })

            response.json({
                user: userWithoutPassword
            })
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'No se pudo registrar el usuario',
            })
        })
    } else {
        response.status(400).json({
            message: validationResult.error
        })
    }
}
