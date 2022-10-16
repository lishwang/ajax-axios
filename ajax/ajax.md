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

