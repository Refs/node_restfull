# node_restfull

## course 1  What is a RESTfull API ?

## Planing & First Steps

```bash
npm init
npm install -s express 
touch server.js
touch app.js
```

```js
// server.js中

const http = require('http');
const app = require('./app')

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

```

```js
// app.js中
const express = require('express');
const app = express();

app.use(
    (req, res, next) => {
        res.status(200).json({
            message: 'It Works !'
        })
    }
)

module.exports = app;


```




## Adding more Routes to the API




There is no difference. http.createServer() only does one thing: it calls http.Server() internally and returns the resulting instance.