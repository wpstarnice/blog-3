---
title: Express框架快速入门
date: 2017-03-19T10:00:47+00:00
category: JavaScript
---

Node.js本身就可以依靠自己HTTP模块来搭建一个简单的Web服务器，但是一般我们使用框架来帮助完成，`Express`就是一个基于Node.js的简洁高效的Web框架。

## 一、安装Express

Express的上手十分简单，我们先创建一个项目目录，取名为hello-express。

```
$ mkdir hello-express
```

进入该目录，初始化package.json

```
$ npm init
```

安装express

```
$ npm install express --save
```

## 二、创建启动文件

我们在项目根目录新建一个启动文件，取名为index.js，输入以下代码：

```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
```

上面的代码启动一个服务并监听从 3000 端口进入的所有连接请求。他将对所有 (/) URL 或 路由 返回 “Hello World!” 字符串。对于其他所有路径全部返回 404 Not Found。

通过如下命令启动此应用：

```
$ node app.js
```


然后在浏览器中打开 http://localhost:3000/ 并查看输出结果。

![](/pics/2017/03/1401.png)

Express已经在正常工作了。

### 基本介绍

`var app = express()`生成了一个express实例 app。


上述index.js中的`app.get`用于指定不同的访问路径所对应的回调函数，这叫做“路由”（routing）。上面代码只指定了根目录的回调函数，因此只有一个路由记录，实际应用中，可能有多个路由记录。这时，最好就把路由放到一个单独的文件夹中，使用Express应用生成器（express-generator）就是这样做的，把路由文件放到一个名为routes的文件夹内。然后用如下方法访问它：

```js
var route = require('./routes/index');
```

这是一种推荐的方法。

`app.listen`用来设置监听的端口。设置`app.listen(80)`就可以直接通过localhost访问了

## 运行原理

### http模块

Express框架建立在Node.js内置的`http`模块上。http模块生成服务器的原始代码如下。

```js

var http = require("http");

var app = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello world!");
});

app.listen(3000, "localhost");
```


上面代码的关键是http模块的`createServer`方法，表示生成一个HTTP服务器实例。该方法接受一个回调函数，该回调函数的参数，分别为代表HTTP请求和HTTP回应的`request`对象和`response`对象。

**对http模块的再包装**

Express框架的核心是对http模块的再包装。上面的代码用Express改写如下。

```js
var express = require('express');
var app = express();
app.get('/', function (req, res) {  
    res.send('Hello world!');
});
app.listen(3000);  

var express = require("express");
var http = require("http");

var app = express();

app.use(function(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello world!\n");
});

http.createServer(app).listen(1337);
```

比较两段代码，可以看到它们非常接近，唯一的差别是createServer方法的参数，从一个回调函数变成了一个Epress对象的实例。而这个实例使用了use方法，加载了与上一段代码相同的回调函数。

Express框架等于在http模块之上，加了一个中间层，而use方法则相当于调用中间件。

### 中间件

简单说，中间件（middleware）就是处理HTTP请求的函数，用来完成各种特定的任务，比如检查用户是否登录、分析数据、以及其他在需要最终将数据发送给用户之前完成的任务。它最大的特点就是，一个中间件处理完，再传递给下一个中间件。

Node.js的内置模块http的`createServer`方法，可以生成一个服务器实例，该实例允许在运行过程中，调用一系列函数（也就是中间件）。当一个HTTP请求进入服务器，服务器实例会调用第一个中间件，完成后根据设置，决定是否再调用下一个中间件。中间件内部可以使用服务器实例的`response`对象（ServerResponse，即回调函数的第二个参数），以及一个`next`回调函数（即第三个参数）。每个中间件都可以对HTTP请求（request对象）做出回应，并且决定是否调用next方法，将request对象再传给下一个中间件。

一个不进行任何操作、只传递request对象的中间件，大概是下面这样：


```js

function uselessMiddleware(req, res, next) { 
    next();
}
```

上面代码的`next`为中间件的回调函数。如果它带有参数，则代表抛出一个错误，参数为错误文本。

```js
function uselessMiddleware(req, res, next) { 
    next('出错了！');
}
```
抛出错误以后，后面的中间件将不再执行，直到发现一个错误处理函数为止。

### use方法

`use`是express调用中间件的方法，它返回一个函数。下面是一个连续调用两个中间件的例子。

```js
var express = require("express");
var http = require("http");

var app = express();

app.use(function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});

app.use(function(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello world!\n");
});

http.createServer(app).listen(1337);

```
上面代码先调用第一个中间件，在控制台输出一行信息，然后通过`next`方法，调用第二个中间件，输出HTTP回应。由于第二个中间件没有调用next方法，所以不再request对象就不再向后传递了。

使用use方法，可以根据请求的网址，返回不同的网页内容。


```js
var express = require("express");
var http = require("http");

var app = express();

app.use(function(request, response, next) {
  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the homepage!\n");
  } else {
    next();
  }
});

app.use(function(request, response, next) {
  if (request.url == "/about") {
    response.writeHead(200, { "Content-Type": "text/plain" });
  } else {
    next();
  }
});

app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 error!\n");
});

http.createServer(app).listen(1337);
```

上面代码通过request.url属性，判断请求的网址，从而返回不同的内容。

除了在回调函数内部，判断请求的网址，Express也允许将请求的网址写在use方法的第一个参数。

```js
app.use('/', someMiddleware);
```

上面代码表示，只对根目录的请求，调用某个中间件。

因此，上面的代码可以写成下面的样子。


```js
var express = require("express");
var http = require("http");

var app = express();

app.use("/", function(request, response, next) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the homepage!\n");
});

app.use("/about", function(request, response, next) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the about page!\n");
});

app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 error!\n");
});

http.createServer(app).listen(1337);
```

## Express的方法

`all`方法和`HTTP`动词方法

针对不同的请求，Express提供了`use`方法的一些别名。比如，上面代码也可以用别名的形式来写。
```js
var express = require("express");
var http = require("http");
var app = express();

app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get("/", function(request, response) {
  response.end("Welcome to the homepage!");
});

app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});

app.get("*", function(request, response) {
  response.end("404!");
});

http.createServer(app).listen(1337);
```

上面代码的all方法表示，所有请求都必须通过该中间件，参数中的`*`表示对所有路径有效。get方法则是只有GET动词的HTTP请求通过该中间件，它的第一个参数是请求的路径。由于get方法的回调函数没有调用next方法，所以只要有一个中间件被调用了，后面的中间件就不会再被调用了。

除了get方法以外，Express还提供`post`、`put`、`delete`方法，即HTTP动词都是Express的方法。

这些方法的第一个参数，都是请求的路径。除了绝对匹配以外，Express允许模式匹配。

```js
app.get("/hello/:who", function(req, res) {
  res.end("Hello, " + req.params.who + ".");
});
```


上面代码将匹配“/hello/alice”网址，网址中的alice将被捕获，作为`req.params.who`属性的值。需要注意的是，捕获后需要对网址进行检查，过滤不安全字符，上面的写法只是为了演示，生产中不应这样直接使用用户提供的值。

如果在模式参数后面加上问号，表示该参数可选。

```js
app.get('/hello/:who?',function(req,res) {
    if(req.params.id) {
        res.end("Hello, " + req.params.who + ".");
    }
    else {
        res.send("Hello, Guest.");
    }
});
```

下面是一些更复杂的模式匹配的例子。

```js
app.get('/forum/:fid/thread/:tid', middleware)

// 匹配/commits/71dbb9c
// 或/commits/71dbb9c..4c084f9这样的git格式的网址
app.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function(req, res){
  var from = req.params[0];
  var to = req.params[1] || 'HEAD';
  res.send('commit range ' + from + '..' + to);
});
```

### set方法

set方法用于指定变量的值。

```js
app.set("views", __dirname + "/views");

app.set("view engine", "jade");
```

上面代码使用set方法，为系统变量`views`和`view engine`指定值。

### response对象

（1）response.redirect方法

`response.redirect`方法允许网址的重定向。

```js
response.redirect("/hello/anime");

response.redirect("http://www.example.com");

response.redirect(301, "http://www.example.com");
```

（2）response.sendFile方法

`response.sendFile`方法用于发送文件。
```js
response.sendFile("/path/to/anime.mp4");
```

（3）response.render方法

`response.render`方法用于渲染网页模板。

```js
app.get("/", function(request, response) {
  response.render("index", { message: "Hello World" });
});
```


上面代码使用`render`方法，将message变量传入index模板，渲染成HTML网页。

### requst对象

（1）request.ip

`request.ip`属性用于获得HTTP请求的IP地址。

（2）request.files

`request.files`用于获取上传的文件。

## express-generator

通过应用生成器工具 express 可以快速创建一个应用的骨架。

安装方法：

```zsh
$ npm install express-generator -g
```

例如，下面的示例就是在当前工作目录下创建一个命名为 myapp 的应用。

```
$ express myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.jade
   create : myapp/views/layout.jade
   create : myapp/views/error.jade
   create : myapp/bin
   create : myapp/bin/www

```


然后安装所有依赖包：

```
$ cd myapp 
$ npm install
```

运行

```
$ DEBUG=blog node ./bin/www(windows 下：DEBUG=blog:* npm start )
```

然后在浏览器中打开` http://localhost:3000/` 网址就可以看到这个应用了。i

通过 Express 应用生成器创建的应用一般都有如下目录结构：

```
.
├── app.js
├── bin                ## 存放可执行文件
│   └── www
├── package.json
├── public             ## 存放 image、css、js 等文件
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes             ## 存放路由文件
│   ├── index.js
│   └── users.js
└── views              ## 存放视图文件或者说模版文件
    ├── error.jade
    ├── index.jade
    └── layout.jade

7 directories, 9 files

```

### 模版引擎

模板引擎（Template Engine）是一个将页面模板和要显示的数据结合起来生成 HTML 页面的工具。

> 模板引擎的功能是将页面模板和要显示的数据结合起来生成 HTML 页面。它既可以运 行在服务器端又可以运行在客户端，大多数时候它都在服务器端直接被解析为 HTML，解析完成后再传输给客户端，因此客户端甚至无法判断页面是否是模板引擎生成的。有时候模板引擎也可以运行在客户端，即浏览器中，典型的代表就是 XSLT，它以 XML 为输入，在客户端生成 HTML 页面。但是由于浏览器兼容性问题，XSLT 并不是很流行。目前的主流还是由服务器运行模板引擎。在 MVC 架构中，模板引擎包含在服务器端。控制器得到用户请求后，从模型获取数据，调用模板引擎。模板引擎以数据和页面模板为输入，生成 HTML 页面，然后返回给控制器，由控制器交回客户端。             ——《Node.js开发指南》

早期的Express应用生成使用`ejs`模板引擎（hexo博客生成系统使用的引擎），现在使用的是`jade`模板引擎。

#### 使用模板引擎

我们可以通过以下两行代码设置了模板文件的存储位置和使用的模板引擎：

```js
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
```

我们看一下`/views/index.jade`文件

```jade
extends layout

block content
  h1= title
  p Welcome to #{title}
```

我们不难发现，其实大部分的模板引擎语法相似。

再看一下`/routes/index.js`文件

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

当我们 `res.render('index', { title: 'Express' });` 时，模板引擎会把 `#{title}` 替换成 Express，然后把替换后的页面显示给用户。这就是模板渲染

更多关于模板引擎的相关知识自行查找相应模板引擎文档了解。


