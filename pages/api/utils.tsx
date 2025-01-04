const jwt = require('jsonwebtoken');


function signJWT(payload: any) {
    const options = {
        expiresIn: "100000h",
    };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
}

export { signJWT }