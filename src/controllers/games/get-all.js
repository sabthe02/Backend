const mongoose = require('mongoose')
const { userModel } = require('../../models/user')

module.exports = (request, response) => {
    userModel
        .findOne({ _id: request.user.id })
        .select('games')
        .then(user => {
            userModel.aggregate([{
                $match: { _id: mongoose.Types.ObjectId(request.user.id) }
            }, {
                $project: {
                    count: { $size: '$games' }
                }
            }]).then(countAggregation => {
                const count = countAggregation[0].count
                const meta = {
                    count
                }

                response.status(200).json({
                    meta,
                    games: user.games
                })
            }).catch(error => {
                console.error(error)
            
                    response.status(500).json({
                        message: 'Error al intentar listar las partidas'
                    })
            })
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al intentar listar las partidas'
            })
        })
}
