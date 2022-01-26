const jwt = require('jsonwebtoken')

module.exports = (tokenType = 'CONSUMER') => {
    return (request, response, next) => {
        // Obtenemos token del header
        const token = request.headers.authorization
    
        try {
            // Valido que el token enviado por el usuario sea correcto
            const decoded = jwt.verify(token, process.env.JWT_KEY)

            if (decoded.type === tokenType) {
                // Inserto el id del usuario en la request
                request.user = {
                    id: decoded.id,
                    nickname: decoded.nickname
                }
        
                // Inserto informacion del token en la request
                request.token = {
                    value: token,
                    type: decoded.type
                }
        
                // Invoco al siguiente middleware
                next()
            } else {
                return response.status(401).json({
                    message: 'Tipo de token invalido'
                })
            }
        } catch(error) {
            console.error('Error en token', error)
    
            // Retorno error 401 en caso de que el token es invalido
            return response.status(401).json({
                message: 'Credenciales invalidas'
            })
        }
    }
}