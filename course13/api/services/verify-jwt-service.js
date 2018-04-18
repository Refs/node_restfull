const jwt = require('jsonwebtoken');

module.exports = (token, secretOrPublicKey) => {
    return new Promise( (resolve,reject) => {
        jwt.verify(token, secretOrPublicKey, (err, userData)=>{
            if(err) {
                reject(err);
            } else {
                resolve(userData);
            }
        })
    } )

}