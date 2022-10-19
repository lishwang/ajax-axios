
const express = require('express');

let app = express();

// 原生JS发送JSONP接口
app.all('/test-jsonp', (request, response) => {
  let data = {
    exit: true,
    msg: '测试成功',
  };
  let str = JSON.stringify(data);
  // 返回函数调用
  response.send(`handle(${str})`);
})


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