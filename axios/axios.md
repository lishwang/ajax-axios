### 搭建一个服务器

- 上次 ajax 用的 express 框架搭建的服务器，本次 axios 采用 json-server 这个包来搭建服务器

##### json-server 搭建服务器

```
1、全局安装（注意：必须要全局安装，本电脑已经安装--神舟--2022.10.20）
npm install -g json-server

2、在根目录下创建一个 db.json 文件，这个文件内就是放服务器返回的数据的

3、在控制台执行 json-server --watch db.json 
注：json-server 表示启用服务器， watch db.json 表示服务器数据在 db.json 这个文件内找

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

