const { eventModel } = require('../../models/event')

module.exports = (request, response) => {
    eventModel
        .aggregate([{
            $group: {
                _id: '$type',
                count: {
                    $sum: 1
                }
            }
        }, {
            $project: {  
                _id: false,
                type: '$_id',
                count: 1
            }
        }])
        .then(events => {
            response.status(200).json({
                events
            })
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al intentar obtener estadisticas'
            })
        })
}
