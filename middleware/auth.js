const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token is required for authentication' });
    }

    try {
        const decoded =jwt.verify(token, config.TOKEN_KEY);
        req.username = decoded;
    } catch(err)
        {
            return next();
        }

};

module.exports = verifyToken;