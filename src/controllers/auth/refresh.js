const createToken = require('../../utils/create-token')
const { REFRESH_TOKEN_TYPE, CONSUMER_TOKEN_TYPE } = require('../../utils/token-types')

module.exports = (request, response) => {
    if (request.token.type === 'REFRESH') {
        // Token de usuario
        const token = createToken(request.user, CONSUMER_TOKEN_TYPE, '20m')

        // Refresh token de usuario
        const refreshToken = createToken(request.user, REFRESH_TOKEN_TYPE, '2d')

        // Retornamos los nuevos tokens
        response.json({
            token,
            refreshToken
        })
    } else {
        response.status(401).end()
    }
}
