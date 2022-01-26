const { userModel } = require('../../models/user')

module.exports = (request, response) => {
    userModel
        .findOne({ _id: request.params.id })
        .select('-password -games')
        .then(user => {
            response.status(200).json({
                user
            })
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al intentar obtener un usuario'
            })
        })
}
