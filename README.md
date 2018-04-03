# node_restfull

## course 1  What is a RESTfull API ?

## Course 2 Planing & First Steps

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




## Course 3 Adding more Routes to the API




There is no difference. http.createServer() only does one thing: it calls http.Server() internally and returns the resulting instance.

## Course 4 Handing Error & improving the Project Setup 


* 安装nodemon package

```bash
# 安装nodemon
npm install nodemon --save-dev

# will fail because it's not a globalpackage installed on our machine , we can easily work around this by going to the package.json file 
nodemon server.js

```

```js
{
  "name": "rest-shop",
  "version": "1.0.0",
  "description": "A Node.js RESTful API Tutorial Project (Build a simple shop API)",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    /**
     * here we can use nodemon which is a --save-dev package,because this will not search for our system but in our project and we just indtalled it 
    */
    "start" "nodemon server.js"
  },
  "keywords": [
    "node",
    "restful",
    "api"
  ],
  "author": "Maximilian Schwarzmüller",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.2"
  }
}

```

> 即我们不需要去全局的安装nodemon 就可以利用npm  指令去全局的使用nodemon, 了解这个使用的方式；

* 安装 morgan package

>  it's a logging package for node.js we can use it really easy 

> we tell Express to funnel all requests through the morgan middleware worgan then will log something and let the request continue 


*  错误的处理方式： 见代码

## Course 5 Parsing the Body & Handing CORS 

### how we can extract the request body of an incoming request like let's say for a post request 

### how we can handle a cors errors 