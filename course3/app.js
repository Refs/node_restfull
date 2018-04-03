const express = require('express');
const app = express();

/**
 * A route will match any path that follows its path immediately with a “/”. For example: app.use('/apple', ...) will match “/apple”, “/apple/images”, “/apple/images/news”, and so on.
 * 
 * Since path defaults to “/”, middleware mounted without a path will be executed for every request to the app.
For example, this middleware function will be executed for every request to the app:
*/
app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

module.exports = app;