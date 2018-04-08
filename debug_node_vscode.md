
## debug node application on chrome

> To debug your node applications 

```bash

# 复制产生的链接到 chrome 既可以进行调试了；
node --debug-brk --inspect app.js


```


## 通常的 node.js 启动程序

> 下面的配置用于匹配 当前打来的任意的文件，也就是调试的文件名称，并不一定要在文件中写死，下面是动态文件名 主要是利用${file} 这个变量；

```js

   {
        "type": "node",
        "request": "launch",
        "name": "Launch Program",
        // 当前打开的文件
        "program": "${file}",
        // 任务执行的目录
        "cwd": "${workspaceRoot}"

    },

```


## 调试程序附加到进程 （Attach）

Attach: Attach to the debug port of a locally running Node.js program. Make sure that the Node.js program to debug has been started in debug mode and the debug port used is the same as the one specified in the snippet.

> This is going to allow you to attach the VSC debugger to an existing node application that's running under debug mode . 

> the reson why would you ever want to do this well , thingk about sonething like nodemon . nodemon automatically restart you program every single time you change a file . 

> with 'attach to process' configration , we can reattach the debugger evertime we make a change to the program and nodemon restarts 

