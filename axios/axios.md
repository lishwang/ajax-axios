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

