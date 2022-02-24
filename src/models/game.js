const { model, Schema } = require('mongoose')

const gameSchema = new Schema({

    player: {
        type: Schema.Types.ObjectId, ref: 'users',
        required: false,
    },

    score: {
        type: Number,
        required: false,
    },

    opponent: {
        type: Schema.Types.ObjectId, ref: 'users',
        required: false,
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
    },

    opp_choices: {
        type: Array,
        required: false
    }

})

const gameModel = model('games', gameSchema)

module.exports = {
    gameSchema,
    gameModel
}