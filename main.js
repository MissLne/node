const app = require('./src/app')
require('./src/app/database')
const config = require('./src/app/config')

app.listen(config.APP_PORT,() => {
  console.log("服务器启动成功")
})