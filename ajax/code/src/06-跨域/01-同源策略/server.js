
/**
 * 执行 nodemon .\server.js 
 * 然后在浏览器打开 http://127.0.0.1:9000/home
 * 即可 展示 ./index.html 的内容
 */
const express = require('express');

const app = express();

app.get('/home', (request, response) => {
  // 响应一个页面（在浏览器直接渲染 index.html），需要传入 文件的绝对路径
  response.sendFile(__dirname + '/index.html');
})

app.get('/getData', (request, response) => {
  // 响应一个页面（在浏览器直接渲染 index.html），需要传入 文件的绝对路径
  response.send('同源策略下的服务器返回数据');
})

app.listen('9000', () => {
  console.log('9000服务启动了...')
})