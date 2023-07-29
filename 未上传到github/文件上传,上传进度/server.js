const http = require('http')
const fs = require('fs')
const path = require('path')

const app = http.createServer((req,res) => {
  res.setHeader('Access-Control-Allow-Origin','*')

  let file = [];
  req.on('data',(chunk)=> {
    console.log(chunk)
    file.push(chunk)
  });
  req.on('end',() => {
    const data = Buffer.concat(file)
    console.log(data)
    // 写入文件
    fs.writeFile(path.resolve(__dirname,new Date().getTime() + '.png'),data,(err)=> {
      console.log(err)
    })
    res.end('ok')
  })
})

app.listen(5500,() => {
  console.log('服务器创建成功')
})