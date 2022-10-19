
const express = require('express');

let app = express();

app.all('/test-jsonp', (require, response) => {
  let data = {
    exit: true,
    msg: '测试成功',
  };
  let str = JSON.stringify(data);
  // 返回函数调用
  response.send(`handle(${str})`);
})

app.listen('9999', () => {
  console.log('9999端口开启中...');
})