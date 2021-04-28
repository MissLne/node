const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const useRouter = require('../router/index')
const app = new Koa()


const userRouter = require('../router/user.router')
const authRouter = require('../router/auth.router')
const errorHandle = require('../app/error-handle')

app.use(bodyParser())
useRouter(app)

app.on('error',errorHandle)
module.exports = app