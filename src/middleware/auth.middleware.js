const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5Password = require('../utils/password-handle')
const {PUBLIC_KEY} = require('../app/config')
const jwt = require('jsonwebtoken')

const verifyLogin = async (ctx,next) => {
  const { name,password } = ctx.request.body
  //密码账号不能为空
  if(!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error',error,ctx)
  }
  //用户名不存在
  const result = await userService.getUserByName(name)
  const user = result[0]

  if(!user) {
    const error = new Error(errorTypes.USER_IS_NOT_EXISTS)

    return ctx.app.emit('error',error,ctx)
  }
  //密码错误
  if(md5Password(password) != user.password) {
    const error = new Error(errorTypes.PASSWORD_ERROR)
    return ctx.app.emit('error',error,ctx)
  }
  ctx.user = user
  await next()
}

const verifyAuth = async(ctx,next) => {
  const authorization = ctx.headers.authorization
  const token  = authorization.replace('Bearer ', '')
  if(!authorization) {
    const error = new Error(errorTypes.NO_AUTHORIZATION)
    return ctx.app.emit('error',error,ctx)
  }
  try {
    const result = jwt.verify(token,PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorTypes.NO_AUTHORIZATION)
    return ctx.app.emit('error',error,ctx)
  }
}

const verifyPermission = async (ctx,next) => {
  const {momentId} = ctx.params
  const {id} = ctx.user
  try {
    const isPermission = await authService.checkMoment(momentId,id)
    if(!isPermission) throw new Error()
    await next()
  } catch {
    const error = new Error(errorTypes.NO_PERMISSION)
    return ctx.app.emit('error',error,ctx)
  }
}
const aa = async (ctx,next) => {}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
  aa
}