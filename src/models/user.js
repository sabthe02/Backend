const { model, Schema } = require('mongoose')

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
    }
})

const userModel = model('users', userSchema)

module.exports = {
    userSchema,
    userModel
}