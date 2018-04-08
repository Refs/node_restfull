const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbPath = 'mongodb://localhost:27017/node-shop';

const productRoutes = require('./api/routes/products');
const orderRoutes =  require('./api/routes/orders');

mongoose.connect(dbPath);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('It Open!')
});

/**
 * use the log middleware -- morgan
*/
app.use(morgan('dev'));

/**
 * use the body-parser middleware
 * Content-Type 内容类型，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件（浏览器会据此决定如何去显示返回的内容）
*/
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());


app.use((req,res,next)=>{
    res.header('Allow-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
        res.header(
            'Acess-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        )
        return res.status(200).json({});
    }
})


// app.use('/products', productRoutes);
app.use('/products', (req, res)=>{
    console.log('123');
    res.send('123');
});
// app.use('/orders', orderRoutes);
app.use('/orders', orderRoutes);

/**
 * handle the error request
 * 
*/
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