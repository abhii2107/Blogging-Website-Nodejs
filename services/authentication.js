const JWT = require('jsonwebtoken')

const secret = "$piderm@n123";

// user object lega aur uska token generate kar dega
function createTokenForUSer(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageUrl:user.profileImageUrl,
        role: user.role,
    }

    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenForUSer,
    validateToken,
}