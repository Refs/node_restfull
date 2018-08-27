const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const axios = require('axios');
var FormData = require('form-data');

(() => {
    const form = new FormData()
    form.append('user', 'xxx')
    form.append('password', 'xxx')
    // axios('https://jsonplaceholder.typicode.com/posts', {
    axios('http://218.22.29.213:8101/permission/rest/user/checkLogin/jtcn/E10ADC3949BA59ABBE56E057F20F883E', {
        method: 'get',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        // data: form
      }).then(response => {
        console.log(response)
        })
})();


app.use(morgan('dev'));


app.use('/uploads',express.static('./uploads/'))

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());





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