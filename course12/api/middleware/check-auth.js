const jwt = require('jsonwebtoken');

// It's default middleware pattern we use in Express Apps
module.exports = (req,res,next) => {

    try{
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY); 
        
        // 中间件的变量传递，是通过将变量挂载到req res 上面实现的；
        // so we add a new field(userData) to my request and in the future request , we could extract a userData on the field;   
        // 将 req上携带的token 处理之后，有重新挂载到req 上面，然后进入到下一个中间件；
        
        req.userData = decoded;

        next();
    } catch (error) {
        return res.status(401)
            .json({
                message: 'Auth failed'
             });
    }

    // we have to call next() if we did sucessfully authenticate and we want to not call it , we want to return an error instead if we did not successed .

    // so that we need some information from the JWT package 
}