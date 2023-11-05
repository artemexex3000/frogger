import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthValidator from 'App/Validators/AuthValidator'

export default class AuthController {
  public async store(ctx: HttpContextContract) {
    const { uid, password } = await ctx.request.validate(AuthValidator)

    try {
      const token = await ctx.auth.use('api').attempt(uid, password, {
        expiresIn: '24hours',
      })

      return token.toJSON()
    } catch (error) {
      return ctx.response.created(error)
    }
  }

  public async destroy(ctx: HttpContextContract) {
    try {
      await ctx.auth.logout()

      return ctx.response.status(200)
    } catch (error) {
      return ctx.response.abort(error)
    }
  }
}
