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

MDN参考文档：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS


* 为什么我们使用postman不会面临跨域的问题，而使用浏览器则会面临跨域的问题： 跨域问题是浏览器的安全策略，如在不改动服务器的前提下，在浏览器上面安装一个插件，就可以实现跨域；

> as the default the browser is saying it doesn't make sense(明智的) for you to get something from that server which is not the server you html page coming from . that is a security concept , but for restfull api , we want allow this , because restfull api are meant to be consumed by by our clients by orservers and not just the server which is the api runs on   

> we don't server an application from that api, we just server data, therefore we can overcome this we can disable this Cors mechanism by sending some headers `from server` to the client that essentially tell the browser which is running our client application which tell the client : "yeah! it is okay you can have access and then thw browser says "okay ! so here ylu go "

> so waht we have to do now is we have to ensure that we send the right headers back and 

> to append the headers to any response we sent back; we should do it before the request reach the routes , because routes will sent back a ronsponse. so before the toute we'll add another a middleware weith app.use() to funnel every request through it  

```js
app.use((req, res, next) => {
  // here we want to add some headers to the response, this will not send the response, it will just adjust the response . wherever we do send a response it has these headers .

  // the second parameter :  the value can be start to give access to any origin , you could also restrict it you could say only 'httpL//my-cool-page.com' should have access but typically for restfull api as you give access to any client, because you really want to narrow it down to one 
  // res.header('Access-Control-Allow-Origin', 'htpp://my-cool-page.com')
  res.header('Access-Control-Allow-Origin', '*');

  // define which kind of headers we want to accept ,  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requstted-With, Content-Type, Accept, Authorization');

  //  browser will always send an options request first when you send a post request or a put request this is basically somthing you can't avoid where the browser sees if you can make this request  用于接收浏览器的预检请求
  if (req.method === 'OPTIONS') {

    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH,DELETE');

    // here I don't need to go to routes because the OPTIONS request is just for finding out which options have and by sending back a response

    //  即 对于OPTIONS的请求，我们提前让其返回，而对于普通的请求，我们直接让其进入到路由；
    // 对于不满足要求的路由的非OPTIONS的路由，其悠久会进入到ROutes, 同样会获取数据，只不过我们的浏览器会将数据拦截，使其不返回给请求的源；
    return res.status(200).json({});
  }

  next();

})

```


> https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

* 跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。

* 对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。 
* Access-Control-Allow-Origin: *  表明，该资源可以被任意外域访问。

* Access-Control-Allow-Origin: http://foo.example 除了 http://foo.example，其它外域均不能访问该资源

* Access-Control-Allow-Methods 首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。


* Access-Control-Allow-Headers 首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。

### 为什么我们在使用postman的时候，不会有跨域的问题

postman is just a testing tool ,and it's not a browser. kepp in mind that CORS are a security mechanism and forced by browser that's why you can override them with headers the berowser then know to ignore it .
post doesn't care CORS , it just care for testing 


## course6 MongoDB and Mongoose



## course7 Mongoose Validation and Better Response


```js

var productSchema = new ProductSchema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
})


```

### 如果 我们的post数据的时候，除了给出必须的name与price , 还额外给出一个sales 的值， mongoose会怎么去操作？

* just sending the sales price as an argument to our route doesn't do anything  because here we are configuring the product we plan on storing and there we never extract the sales price we . we never assign it to a property in our object which is going to get stored 

### 优化response

* current response doesn't fulfill the constrains we mentioned earlier that the response should be all kind of self-destructive . so what we want to do is provide better responses

* `不想仅得到一个_id，向得到一个直接有_id 拼接号的url`:  当我们发送一个get请求的时候，我们会得到一个对象，对象中包含一个_id的属性，we can take the _id and appended at the end of the URL to get the object which is the _id refer.  but this is not necessarily when you are newcomer to this API. so It would be nicer if we would provide a link which you could then programmatically fetch to send another request to it 

* `得到一些除数据库真是返回的其它的东西` maybe we want to send（从server 向client send） some metadata like the amount of items we fetched so  we don't want to just return the docs here as the response . we want to return more

* It would be interesting to have more information on the individual rpoduct like the URL that leads us to the detail information for that product 

* the below code is how we should style our response and how we should structure our response . that is a better response for getting all the docs and od course you can find you just totally to your needs 

```js
router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,

            // the request is just meta information you can write this in whichever way you want pass whichever information you want . in this condition we want to pass information about which kind of requests do you have to send to which URL to get more information about this object 
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


```


```js

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:3000/products/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

```

> It's something you should always keep in mind though you create descriptive apis, if  you plan on using them publicly , if you want to create an API that is used by other people you should clear about how to use it and do that by using like ablove 

## Course8 Managing Orders with Mongoose

> the interesting part here is that orders are connected to products 

```js
// /api/models/order.js 中

const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // the type here will acturally also be an ObjectId, because we will store the ID of the product which is related to this order .  now there is something important we are nwe creating like a relation and MongoDB is a non realtional database you can build these relations as we're about to do that and that is okay to some degree . but if you find yourself building a lot of relations and sticking very much in that sql database world then you might indeed wanna pick a sequel database .

    // the key word ref : you need to use ref here to configure this type  and ref should hold a string with the name of the model you want to connenct...| here we want to connect this schema with my product and with that we store order where we ordered this product 
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema);

```

```js
router.post("/", (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      // 此处之所以要进行判别是因为，若mongodb依据检索的条件，找不到对应doc, 其不会去报错，只会给一个null; 即不会跑到catch error中
      // 而我们要实现的就是，若_id 对应的product 不存在，就不让order生成，所以此处应将其处理一下。 让其直接return;

      // Itworks but can't store orders for products we don't have which of course is very useful 
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

```

> 上面讲的内容有一点要注意，就是当mongodb 依据指定的条件，搜索不到对应的doc时，其不会去报错，而只会返回一个null ，而此时我们要做一个判断处理。 因为大多说的时候，我们将`未找到 ` 当成一种错误进行处理；


## Course9 Populating Queries with Mongoose

Populated paths are no longer set to their original _id , their value is replaced with the mongoose document returned from the database by performing a separate query before returning the results.

## Course10 Uploading an Image

> how can we accept and files 

> let's implement file uploading and let's say we want to do this foe products ; For posting a new product it might make sense to be able to accept an image which would store on our server and we also store an entry in the database with the location that stored image so that we can sent it back with a get request . so when we get all products  


### accept images in the post route --  利用multer

> there are two different approaches you could take here.  the first approach is that you build an additional end point where  you accept binary data only so you don't try to get request body , because the body isn't available, because the binary body won't be parsed by our body-parser package , since it only parses URL encoded or JSON bodies instead we could read out the raw body ;

> we will get a request body here which is coming frome our body-parser plugin which parses the incoming JSON body . new if we accept a different kind of body namely form data to be precise multi-part form data 

> to be able to read incoming requests which hold form data , we will need a plugin -- multer

```js

router.post('/', (req, res, next) => {

    const product = new ProductModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    ProductModel.createProduct(product).then(
            (result) => {
                res.status(201).json({
                    message: "Created product successfully",
                    createdProduct: {
                        name: result.name,
                        price: result.price,
                        _id: result._id,
                         request: {
                            type: "GET",
                            url: "http://127.0.0.1:3000/products/" + result._id
                        }
                    }
                });
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


})

```

### 利用multer 我们可以很方便的将上传的文件存储到服务器上面，但是我们如何去获取我们已经存储的文件；

> we store the files on our backend that's nice , but we also want to store an entry in the database so that we we get a list of all the files we can access them 
*  我们的在存储product 的时候，应该在product 的schema上面去添加一个字段，用来存放图片的url地址；

```js
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },


    productImage: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);

```

* 当我们在浏览器上访问http://127.0.0.1:3000/uploads/dfasdfa.png 的时候，我们访问不到任何东西

>  这是因为我们uploads 目录没有被 node 服务器托管； 即node上面没有处理到 /uploads/dxxx.png 的路由

```js

app.use('/uploads',express.static('uploads'));

```



## 实际项目中的的应用是像请求mongodb服务器一样去请求，本公司的java服务器。 java 服务帮自己去查询与返回mysql 中的数据；  node 负责前端的登陆验证与数据的返回；

client --> nginx 返回静态资源  ---> node mongodb 数据  --> java mysql数据

关键字 RPC   SOPA 前后端分离的思考与实践(淘宝前端团队)