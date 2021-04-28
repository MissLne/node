class AuthController {
  async login(ctx, next) {
    const { name } = ctx.request.body
    ctx.body = `登录成功,${name}欢迎回来~`
  }
}

module.exports = new AuthController()