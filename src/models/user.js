const { model, Schema } = require('mongoose')
const { gameSchema } = require('./game')

const userSchema = new Schema({
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    games: {
        type: [gameSchema],
        default: () => ([])
    }
})

const userModel = model('users', userSchema)

module.exports = {
    userSchema,
    userModel
}
