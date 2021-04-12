const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

const userRouter = require('../router/user.router')
const errorHandle = require('../app/error-handle')

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.on('error',errorHandle)
module.exports = app