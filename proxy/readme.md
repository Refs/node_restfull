## 使用 node.js 模拟登陆 并获取 session

1. 核心代码： https://github.com/axios/axios/issues/943
2. video: Build An Express App ( Node / Express ) (Fetch Data With Axios)

```js

 handleSearch() {
      const form = new FormData()
      form.append('user', 'xxx')
      form.append('password', 'xxx')
      axios('/api/Basic/Login/verify', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: form
      }).then(response => {
        console.log(response)
        })
      })
    }

```

2. form-data 插件 ： https://www.npmjs.com/package/form-data

```js
var FormData = require('form-data');
var fs = require('fs');
 
var form = new FormData();
form.append('my_field', 'my value');
form.append('my_buffer', new Buffer(10));
form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

```

## session 获取之后， 使用 http-proxy-middleware 去 代理请求 到服务器，  核心代码 ：

```js
const proxyOptions = {
  onProxyReq: relayRequestHeaders,
  onProxyRes: relayResponseHeaders
}

function relayRequestHeaders(proxyReq, req) {
  Object.keys(req.headers).forEach(function (key) {
    proxyReq.setHeader(key, req.headers[key]);
  });
}

function relayResponseHeaders(proxyRes, req, res) {
  Object.keys(proxyRes.headers).forEach(function (key) {
    res.append(key, proxyRes.headers[key]);
  });
}

```


