
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