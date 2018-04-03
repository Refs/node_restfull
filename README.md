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

* 安装 morgan package --- logger middleware

>  it's a logging package for node.js we can use it really easy 

> we tell Express to funnel all requests through the morgan middleware worgan then will log something and let the request continue 


*  错误的处理方式： 见代码

## Course 5 Parsing the Body & Handing CORS 

### how we can extract the request body of an incoming request like let's say for a post request 

> doc 文档： https://www.npmjs.com/package/body-parser

```bash
npm install --save body-parser

# body-parser does not support files for example but it does support URL encoded bosies and it also supports json data .
# so if we receive a post request that comtains json data, we can use this middleware to parser data;

```

```js
// app.js 中

const bodyParser = require('body-parser');

/**
* apply the middleware to erery incoming requests
*
*/
// the bosyParser middleware need some additional information which kind of bodies do you want to parse first I want to parse the URL encoded bodies
// we can set extened to either true ro false , true allows you to parse extended bodies with rich data in it ; and dlase to only simple bodies for URL encoded data 
app.use(bodyParser.urlencoded({extended: true}));

// this will now extract JSON data and makes it easily to us 
app.use(bodyParser.json());

```

* bodyParser.json() 与 bodyParser.urlencoded() 的区别与联系
  + The bodyParser object exposes various factories to create middlewares. 也就是上述两者，都是bodyParser的中间件工厂方法，都会返回一个中间件
  + bodyParser.urlencoded() 接受form请求，bodyParser.json() 接受json请求
  + options可选 ， 这个方法返回一个仅仅用来解析json格式的中间件。这个中间件能接受任何body中任何Unicode编码的字符。支持自动的解析gzip和 zlib。
  + bodyParser.urlencoded(options) options可选，这个方法也返回一个中间件，这个中间件用来解析body中的urlencoded字符， 只支持utf-8的编码的字符。同样也支持自动的解析gzip和 zlib。

*  bodyParser.urlencoded({ extended: true }) 与 bodyParser.urlencoded({ extended: false })的区别：

```js
// bodyParser.urlencoded({ extended: true })的解析结果

{ 
   movie: { 
     _id: 'undefined',
     title: '电影名称11121',
     poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
   } 
}

```

```js
// bodyParser.urlencoded({ extended: false }) 的解析结果
{ 
  'movie[_id]': 'undefined',
  'movie[title]': '电影名称11121',
  'movie[poster]': 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
}

// 既然选择了远方，便只顾风雨兼程；
```




### how we can handle a cors errors 

* 为什么我们使用postman不会面临跨域的问题，而使用浏览器则会面临跨域的问题： 跨域问题是浏览器的安全策略，如在不改动服务器的前提下，在浏览器上面安装一个插件，就可以实现跨域；

> as the default the browser is saying it doesn't make sense(明智的) for you to get something from that server which is not the server you html page coming from . that is a security concept , but for restfull api , we want allow this , because restfull api are meant to be consumed by by our clients by orservers and not just the server which is the api runs on   

> we don't server an application from that api, we just server data, therefore we can overcome this we can disable this Cors mechanism by sending some headers `from server` to the client that essentially tell the browser which is running our client application which tell the client : "yeah! it is okay you can have access and then thw browser says "okay ! so here ylu go "

> so waht we have to do now is we have to ensure 

