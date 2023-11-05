import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    if (await ctx.auth.check()) {
      if (!ctx.auth.user?.is_admin) {
        return ctx.response.badRequest()
      }
    } else {
      return ctx.response.abort(400)
    }
    await next()
  }
}
