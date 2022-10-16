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
app.get('/server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 设置响应内容
  response.send('HELLO AJAX');
});

// 监听窗口启动服务
app.listen(8000, () => {
  console.log('服务已经启动，8000端口监听中...')
})