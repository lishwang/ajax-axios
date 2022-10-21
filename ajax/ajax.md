### XML简介

- XML 可扩展标记语言，用来传输和存储数据；
- HTML 用来在网页中呈现数据；
- XML 和 HTML 类似，不同的是 HTML 中都是预定义标签，而 XML 中没有预定义标签，全都是自定义标签，用来表示一些数据；
- 曾经ajax中数据的传输都是用的 XML，现在使用的 JSON字符串；

### ajax的特点

- 在网页不刷新的情况下向服务端发送http请求，得到http响应

##### 优点：

- 可以不刷新页面直接与服务器进行通信
- 允许你根据用户事件来更新部分页面内容

##### 缺点：

- 没有浏览历史，不能回退
- 存在跨域问题（同源策略）
- SEO（搜索引擎优化） 不友好

### HTTP 协议

- HTTP协议，超文本传输协议，协议详细规定了浏览器和万维网服务器之间互相通信的规则；

### express 框架 搭建简单的服务

##### 使用步骤

- 初始化包管理工具

  npm init -y

- 安装 express

  npm install express

- 使用 express 框架搭建简单的服务器，代码如下：

  ```
  # js 文件内
  /**
   * 执行该文件：
   * 先 cd 到该文件所在层级
   * 再执行 node + 文件名
   * 然后即可在页面中访问 http://127.0.0.1:8000/ 查看运行结果
   */
  
  // 引入express框架
  const { response } = require('express');
  const express = require('express');
  
  // 创建应用对象
  const app = express();
  
  // 创建路由规则
  // request 对请求报文的封装
  // response 对响应报文的封装
  app.get('/', (request, response) => {
    // 设置响应内容
    response.send('HELLO express');
  });
  
  // 监听窗口启动服务
  app.listen(8000, () => {
    console.log('服务已经启动，8000端口监听中...')
  })
  ```

- 每次修改服务器中的代码，都需要重启服务器，可以安装 nodemon 这个包，然后执行 nodemon + 文件名，即可在下次修改服务器代码后自动重启服务器；

### 解决IE浏览器的缓存问题

原因：IE浏览器会对请求结果做缓存，当下一次再去发送请求时，还是用的上一次的缓存结果，而不是服务器返回的最新数据；

解决方案：在url后面拼接一个时间戳，保证每次请求的url都不一样，用于解决IE浏览器缓存响应结果的问题；

```
// 在url后面拼接一个时间戳，保证每次请求的url都不一样，用于解决IE浏览器缓存响应结果的问题
xhr.open('get', 'http://127.0.0.1:8000/server-json?t=' + Date.now());
```

### ajax 发送 get 请求

```
# dom
<button>点击发送AJAX请求</button>
<div>服务端响应 get 内容在此展示：</div>
<div id="get-result"></div>

# js
// 发送 get 请求
    const btn = document.getElementsByTagName('button')[0];
    const getResultDom = document.getElementById('get-result');
    btn.onclick = () => {
      // 1、创建xhr对象实例
      const xhr = new XMLHttpRequest();
      // 设置超时时间
      xhr.timeout = 2000;
      // 超时回调
      xhr.ontimeout = function () {
        alert('网络超时！！！')
      };
      // 网络异常回调
      xhr.onerror = function () {
        alert('网络异常')
      };
      // 2、初始化 设置请求方法和url
      // xhr.open('get', 'http://127.0.0.1:8000/server?a=100&b=200');
      // 网络超时验证
      xhr.open('get', 'http://127.0.0.1:8000/server-timeout');
      // 3、发送请求，可以携带JSON格式的数据
      xhr.send();
      // 4、监听当前状态
      // readystate是xhr对象中的属性，表示状态，有五种状态 0 1 2 3 4；
      // 0：表示未初始化； 1：表示open方法已经调用完毕； 2：表示send方法已经调用完毕；
      // 3：服务端返回了部分的结果； 4：表示服务端返回了所有结果；
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            // 处理服务器响应结果：响应行、响应头、空行、响应体
            console.log(xhr.status); // 响应状态码
            console.log(xhr.statusText); // 响应状态字符串
            console.log(xhr.getAllResponseHeaders()); // 所有响应头
            console.log(xhr.response); // 响应体
            getResultDom.innerHTML = xhr.response; // 把响应结果展示在页面中
          } else {
            console.log('服务器响应失败')
          }
        }
      }
    }
    
# 服务端 代码js
app.get('/server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 设置响应内容
  response.send('HELLO AJAX GET');
});
// 网络超时验证
app.get('/server-timeout', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 设置响应内容
  setTimeout(() => {
    response.send('HELLO AJAX GET');
  }, 3000);
});
```

### ajax 发送 post 请求

- content-type，传输数据类型，即服务器需要我们传送的数据类型

  `  xhr.setRequestHeader ("content-type", "application/x-www-form-urlencoded" )  `

```
# dom
<div>服务端响应 post 内容在此展示：</div>
<div id="post-result"></div>\

# js
// 发送 post 请求
    const postResultDom = document.getElementById('post-result');
    postResultDom.addEventListener('mouseover', () => {
      // 1、创建xhr对象实例
      const xhr = new XMLHttpRequest();
      // 自动将响应结果进行 JSON.parse() 解析转换
      xhr.responseType = 'json';
      // 2、初始化 设置请求方法和url
      xhr.open('post', 'http://127.0.0.1:8000/server?a=100&b=200');
      // 设置请求头
      // Content-Type 用于设置请求体内容的类型
      // application/x-www-form-urlencoded 是固定写法
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      // 自定义请求头属性和内容，一般情况下，服务器不允许自定义请求头属性以及内容，需要在服务端做适配
      xhr.setRequestHeader('wls-zidingyi', 'aaaaa');
      // 3、发送请求，可以携带JSON格式的数据
      xhr.send('c=300&d=400');
      // 4、监听当前状态
      // readystate是xhr对象中的属性，表示状态，有五种状态 0 1 2 3 4；
      // 0：表示未初始化； 1：表示open方法已经调用完毕； 2：表示send方法已经调用完毕；
      // 3：服务端返回了部分的结果； 4：表示服务端返回了所有结果；
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            // 处理服务器响应结果：响应行、响应头、空行、响应体
            // 方法一：手动对响应数据进行转换
            // console.log(xhr.response);
            // let data = JSON.parse(xhr.response);
            // postResultDom.innerHTML = data.wls;
            // 方法二：自动对响应数据进行转化
            postResultDom.innerHTML = xhr.response.wls; // 把响应结果展示在页面中
          } else {
            console.log('服务器响应失败')
          }
        }
      }
    })
    
# 服务端 代码js
// all 可以接收任意类型的请求，get、post、put、delete等都可以
app.all('/server', (request, response) => {
  // 设置响应头 允许用户自定义请求头属性和内容，一般情况下，服务器不允许自定义请求头属性以及内容
  response.setHeader('Access-Control-Allow-Headers', '*');
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 设置响应内容（响应内容必须是一个字符串）
  const data = {
    wls: 'aaaaaa'
  };
  const str = JSON.stringify(data);
  response.send(str);
});
```

### ajax 取消请求

- 调用 **xhr.abort();** 方法即可手动取消还未响应成功的 ajax 请求；

```
# dom
<button>点击发送AJAX请求</button>
<button>取消请求</button>
<div>服务端响应 get 内容在此展示：</div>
<div id="get-result"></div>

# js
// 发送 get 请求
const btn = document.getElementsByTagNam
const getResultDom = document.getElement
let xhr;
// 发送请求
btn[0].onclick = () => {
  // 1、创建xhr对象实例
  xhr = new XMLHttpRequest();
  // 2、初始化 设置请求方法和url
  xhr.open('get', 'http://127.0.0.1:8000
  // 3、发送请求，可以携带JSON格式的数据
  xhr.send();
  // 4、监听当前状态
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.statu
        // 处理服务器响应结果
        getResultDom.innerHTML = xhr.res
      } else {
        console.log('服务器响应失败')
      }
    }
  }
}
// 取消请求
btn[1].onclick = () => {
  xhr.abort();
}

# 服务器 代码js
// 网络超时验证
app.get('/server-timeout', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 设置响应内容
  setTimeout(() => {
    response.send('HELLO AJAX GET');
  }, 3000);
});
```

### jquery 发送 ajax 请求

- 采用 link 或者 script 标签引入 cdn 地址时，设置 crossorigin="anonymous" 这个属性，是一个跨源请求的属性设置，anonymous是匿名的意思，加上这个属性后，再向后面的href或者src地址请求资源时不会携带当前域名下的cookie；

```
# html 文件
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- 
    crossorigin="anonymous" 是一个跨源请求的属性设置，anonymous是匿名的意思，加上这个属性后，
    再向后面的href或者src地址请求资源时不会携带当前域名下的cookie
   -->
  <link crossorigin="anonymous" rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.2/css/bootstrap.min.css">
  <script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
</head>

<body>
  <div class="container">
    <h2 class="page-header">jquery发送ajax请求</h2>
    <button class="btn btn-primary">GET</button>
    <button class="btn btn-danger">POST</button>
    <button class="btn btn-info">通用型方法ajax</button>
  </div>

  <script>
    // get
    $('button').eq(0).click(() => {
      $.get('http://127.0.0.1:8000/jquery-server', { a: 100, b: 200 }, function (data) {
        console.log(data);
      })
    });
    // post
    $('button').eq(1).click(() => {
      $.post('http://127.0.0.1:8000/jquery-server', { a: 100, b: 200 }, function (data) {
        console.log(data);
      })
    });
    // get-json格式数据
    // 参数一：请求url； 参数二：查询字符串（请求数据）； 参数三：是否处理服务器返回的JSON格式的数据（JSON.parse()处理）
    $('button').eq(0).click(() => {
      $.get('http://127.0.0.1:8000/jquery-server-json', { a: 100, b: 200 }, function (data) {
        console.log(data);
      })
    }, 'json');
    // post-json格式数据
    $('button').eq(1).click(() => {
      $.post('http://127.0.0.1:8000/jquery-server-json', { a: 100, b: 200 }, function (data) {
        console.log(data);
      })
    }, 'json');
  </script>
</body>

</html>

# 服务器 代码
// jquery-server
app.all('/jquery-server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 设置响应内容
  response.send('HELLO AJAX GET');
});

// jquery-server-json
app.all('/jquery-server-json', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 设置响应内容
  let data = { aa: '123' }
  response.send(JSON.stringify(data));
});
```

### 同源策略

- 同源：协议、域名、端口号 完全相同；
- 跨域：违背同源策略就是跨域；

### 解决跨域

##### JSONP

- JSONP 是一个非官方的跨域解决方案，只支持 get 请求；
- 在网页有一些标签天生具有跨域能力，比如  img、link、iframe、script ；JSONP 就是利用 script 这些标签的跨域能力来发送请求的；
- 注意：利用 script 可以发送 JSONP 请求，但是 请求返回的内容必须是 JS 代码，这样前端的 JS 引擎才能解析并执行里面的内容；例如 ` console.log('xxx'); `

###### JSONP实现跨域的原理

- 服务端返回结果的形式是 函数的调用，这个函数的参数就是服务器想给客户端返回的结果数据，这个函数需要在客户端提前声明，在这个函数中，客户端可以处理服务端返回的数据；
- 代码实现如下：

```
##### 客户端代码 .html文件
<div id="result"></div>
<script>
    // 定义函数，用于后面服务端返回这个函数的调用，并由服务端给这个函数传递入参（服务端返回的实际数据）
    function handle (data) {
        // 在这里对服务端返回的数据进行处理
        const result = document.getElementById('result');
        result.innerHTML = data.name;
    }
</script>
<!-- 跨域，本地在浏览器打开html文件，协议为 file:/// ；请求url协议为 http，协议不同，因此跨域，使用script可以跨域get请求 -->
<script src="http://127.0.0.1:8000/jsonp-server"></script>

##### 服务端代码 .js代码

// 引入express框架
const express = require('express');

// 创建应用对象
const app = express();

// jsonp-server 跨域
app.all('/jsonp-server', (request, response) => {
  // 设置响应内容，最好不要直接返回一个字符串，应该返回一个js代码，比如 aaa = 'sss';
  // response.send('sss');
  let data = { name: 'wls' }
  let str = JSON.stringify(data)
  // end 不会加特殊响应头
  // 返回结果的形式是 函数的调用，这个函数的参数就是服务器想给客户端返回的结果数据，这个函数需要在客户端提前声明
  response.end(`handle(${str})`);
});

// 监听窗口启动服务
app.listen(8000, () => {
  console.log('服务已经启动，8000端口监听中...')
})
```

##### jQuery 发送 JSONP 请求

- jquery发送JSONP请求时，url后面要拼接上 ?callback=? 这个字符串，在浏览器请求载荷中可以看到，jquery自动生成了这个回调函数名字为 jQuery+随机值 组成；可以在服务器中通过 request.query.callback 来获取这个函数名，然后返回这个函数名的调用，并传入数据；这样在客户端就可以直接拿到服务器返回的实际数据；

```
##### 客户端代码 .html文件
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    p {
      width: 200px;
      height: 100px;
      border: 1px solid #f00;
      text-align: center;
    }
  </style>
  <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
</head>
<body>
  <button>jQuery发JSONP请求</button>
  <p></p>
  <script>
    $('button').eq(0).click(() => {
      // jquery发送JSONP请求时，url后面要拼接上 ?callback=? 这个字符串，在浏览器请求载荷中可以看到，
      // jquery自动生成了这个回调函数名字为 jQuery+随机值 组成；
      // 可以在服务器中通过 request.query.callback 来获取这个函数名，然后返回这个函数名的调用，并传入数据；
      // 这样在客户端就可以直接拿到服务器返回的实际数据；
      $.getJSON('http://127.0.0.1:9999/jquery-jsonp?callback=?', (data) => {
        $('p').eq(0).html(`返回值：${data.msg}<br/>换行`);
      })
    })
  </script>
</body>
</html>

##### 服务端代码 .js文件

const express = require('express');

let app = express();

// jQuery发送JSONP接口
app.all('/jquery-jsonp', (request, response) => {
  // 获取jQuery生成的随机函数名
  let functionName = request.query.callback;
  // 定义返回数据
  let data = {
    exit: true,
    msg: '测试成功',
  };
  let str = JSON.stringify(data);
  // 返回函数调用
  response.send(`${functionName}(${str})`);
})

app.listen('9999', () => {
  console.log('9999端口开启中...');
})
```

##### CORS 解决跨域问题

- [CORS 学习链接](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS)

- CORS ：跨域资源共享，CORS 是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持 get 和 post 请求。跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源；

- 原理：CORS 是通过设置一个相应头来告诉浏览器，该请求允许跨域，浏览器收到该响应后就会对响应放行；
- 常用的服务端设置
  - 设置允许跨域
      ` response.setHeader('Access-Control-Allow-Origin', '*'); `
  - 设置允许自定义请求头内容
     ` response.setHeader('Access-Control-Allow-Headers', '*'); `
  - 设置允许所有的HTTP方法访问（默认是get/post，设置后，可以允许所有的方法访问）
      ` response.setHeader('Access-Control-Allow-Methods', '*'); `
- 练习：

```
##### 客户端代码 .html文件
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    p {
      width: 200px;
      height: 100px;
      border: 1px solid #f00;
      text-align: center;
    }
  </style>
</head>
<body>
  <button>跨域CORS配置</button>
  <p></p>
  <script>
    const btn = document.querySelector('button');
    const p = document.querySelector('p');
    btn.onclick = function () {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://127.0.0.1:8888/cors-server');
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            p.innerHTML = xhr.response;
          }
        }
      }
    }
  </script>
</body>
</html>

##### 服务端代码 .js文件

const express = require('express');

const app = express();

app.all('/cors-server', (request, response) => {
  // 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 设置允许自定义请求头
  response.setHeader('Access-Control-Allow-Headers', '*');
  // 设置允许所有的HTTP方法访问（默认是get/post，设置后，可以允许所有的方法访问）
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.send('hello CORS');
})

app.listen('8888', () => {
  console.log('8888端口服务已启动...')
})
```

