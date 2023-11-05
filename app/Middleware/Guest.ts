import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    if (ctx.auth.use('api').isAuthenticated) {
      return ctx.response.redirect('posts') 
    }

    await next()
  }
}
