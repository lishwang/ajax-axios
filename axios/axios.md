### 搭建一个服务器

- 上次 ajax 用的 express 框架搭建的服务器，本次 axios 采用 json-server 这个包来搭建服务器

##### json-server 搭建服务器

```
1、全局安装（注意：必须要全局安装，本电脑已经安装--神舟--2022.10.20）
npm install -g json-server

2、在根目录下创建一个 db.json 文件，这个文件内就是放服务器返回的数据的

3、在控制台执行 json-server --watch db.json 
注：json-server 表示启用服务器， watch db.json 表示服务器数据在 db.json 这个文件内找

4、在控制台执行 json-server --watch db.json -d 2000
注： -d 2000 表示 delay 所有接口都延时2秒响应
```

服务器端代码  db.json 文件，本次 axios 练习全部使用这个服务器及以下代码

```
{
  "posts": [
    {
      "id": 1,
      "title": "json-server1",
      "author": "typicode1"
    },
    {
      "id": 2,
      "title": "json-server2",
      "author": "typicode2"
    }
  ],
  "comments": [
    {
      "id": 1,
      "body": "some comment",
      "postId": 1
    }
  ],
  "profile": {
    "name": "typicode"
  }
}
```



### axios简介

- axios 是一个基于 promise 的 HTTP 客户端，可以在 nodejs和浏览器 两个环境中运行；

### axios的使用

##### axios可以设置默认配置

```
### 设置默认的请求类型为 GET
axios.defaults.method = 'GET';

### 设置基础 URL
axios.defaults.baseURL = 'http://127.0.0.1:8000';

### 设置默认请求体参数
axios.defaults.params = { id: 1 };

### 基本上axios配置中的属性都可以设置默认值
```

##### 创建 axios 实例（可以同时创建多个实例，向不同的域名发送请求）

- **创建 axios 实例，创建的实例的使用方式与 axios 几乎相同，而且创建实例时传入的配置参数全被当做 默认配置**

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.bootcdn.net/ajax/libs/axios/1.1.2/axios.min.js"></script>
</head>
<body>
  <button>发送 GET 请求</button>
  <button>发送 POST 请求</button>
  <script>
    const btn = document.getElementsByTagName('button');
    // 创建 axios 实例对象，之后wlsRequest的使用方式和axios几乎是相同的，而且wlsRequest中的配置都是基础默认配置
    const wlsRequest = axios.create({
      // 相当于设置基础请求类型为 GET
      method: 'GET',
      // 相当于设置了 基础URL
      baseURL: 'http://127.0.0.1:3000',
      timeout: 3000,
    })

    // GET
    btn[0].onclick = function () {
      // 使用 wlsRequest 发送 axios 请求（方式一）
      wlsRequest({
        // method: 'GET', // 可省略
        url: '/posts/1',
      }).then(res => {
        console.log(res);
      })

      // 使用 wlsRequest 发送 axios 请求（方式二）
      // wlsRequest('/posts/1').then(res => {
      //   console.log(res);
      // })
    }


    // POST 添加（向db.json文件内的posts对象添加内容）
    btn[1].onclick = function () {
      // 发送 axios 请求（方式一）
      // wlsRequest({
      //   method: 'POST',
      //   url: '/posts',
      //   data: {
      //     title: 'wwww',
      //     author: 'wls',
      //   }
      // }).then(res => {
      //   console.log(res);
      // })

      // 使用 wlsRequest 发送 axios 请求（方式二）
      // 参数一：url； 参数二：请求体； 参数三：配置对象
      wlsRequest.post('http://127.0.0.1:3000/posts', {
        title: 'wwww',
        author: 'wls',
      }).then(res => {
        console.log(res);
      })
    }
  </script>
</body>
</html>
```

