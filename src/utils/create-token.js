const jwt = require('jsonwebtoken')

module.exports = (user, tokenType, expiresIn) => {
    return jwt.sign({
        id: user.id,
        nickname: user.nickname,
        type: tokenType
    }, process.env.JWT_KEY, { expiresIn })
}
