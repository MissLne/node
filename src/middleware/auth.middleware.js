const errorTypes = require('../constants/error-types')
const service = require('../service/user.service')
const md5Password = require('../utils/password-handle')
const verifyLogin = async (ctx,next) => {
  const { name,password } = ctx.request.body
  //密码账号不能为空
  if(!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error',error,ctx)
  }
  //用户名不存在
  const result = await service.getUserByName(name)
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
  await next()
}

module.exports = {
  verifyLogin
}