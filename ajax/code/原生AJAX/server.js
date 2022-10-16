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
  response.send('HELLO AJAX GET');
});

// all 可以接收任意类型的请求，get、post、put、delete等都可以
app.all('/server', (request, response) => {
  // 设置响应头 允许用户自定义请求头属性和内容，一般情况下，服务器不允许自定义请求头属性以及内容
  response.setHeader('Access-Control-Allow-Headers', '*');
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 设置响应内容
  response.send('HELLO AJAX POST');
});


app.all('/server-json', (request, response) => {
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

// 监听窗口启动服务
app.listen(8000, () => {
  console.log('服务已经启动，8000端口监听中...')
})