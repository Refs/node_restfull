const jwt  = require('jsonwebtoken');
const verifyJWT = require('../services/verify-jwt-service');

module.exports = (req, res, next) => {
    if( !req.headers.authorization ) {
        return res.status(500)
                .json({
                    error: 'Auth failed'
                })
    }
    const token = req.headers.authorization.split(' ')[1];

    verifyJWT(token, process.env.JWT_KEY)
        .then(
            (userData) => {
                req.userData = userData;
                next();
            }
        )
        .catch(
            (err) => {
                return res.status(500)
                .json({
                    message: err
                })
            }
        )

}


