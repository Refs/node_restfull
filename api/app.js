const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const controlCors = require('./api/middleware/control-cors')
const deviceplatformRoutes = require('./api/routes/deviceplatformRoutes');



app.use(morgan('dev'));

app.use(controlCors);

app.use('/uploads',express.static('./uploads/'))


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());



app.use('/deviceplatform', deviceplatformRoutes);



app.use(
    (req,res,next) => {
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
    }
)

app.use(
    (error,req,res,next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        })
    }
)

module.exports = app;