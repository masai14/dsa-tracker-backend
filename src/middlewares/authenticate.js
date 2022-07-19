const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) return reject(err);

            return resolve(user);
        })

    })
}

module.exports = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).send({ message: "Unauthorized or invalid token" });
    }

    if (!req.headers.authorization.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Unauthorized or invalid token2" });
    }

    let token = req.headers.authorization.split(" ")[1];

    let user;

    try {
        user = await verifyToken(token);
    } catch (err) {
        return res.status(401).send({ message: "Unauthorized or invalid token3" });
    }
    
    req.user = user.user;

    // need to update when the admin role comes in
    // what if the other user trying to get the details of another one?

    return next();
}