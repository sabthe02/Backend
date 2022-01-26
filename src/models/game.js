const { model, Schema } = require('mongoose')

const gameSchema = new Schema({

    player: {
        type: String,
        required: false,
        trim: true
    },

    score: {
        type: Number,
        required: false,
    },

    opponent: {
        type: String,
        required: false,
        trim: true
    },

    opp_score: {
        type: Number,
        required: false
    },

    finished: {
        type: Boolean,
        required: false
    },

    result: {
        type: Array,
        required: false
    },

    choices: {
        type: Array,
        required: false
    }
})

const gameModel = model('games', gameSchema)

module.exports = {
    gameSchema,
    gameModel
}
