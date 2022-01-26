const eventTypes = require('../../../models/event-types')
const { eventModel } = require('../../../models/event')

module.exports = (request, response) => {
    eventModel
        .find({ type: eventTypes.REGISTER })
        .select('-_id -context -type')
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
