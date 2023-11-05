import User from "App/Models/User";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistrationValidator from "App/Validators/RegistrationValidator";
import UserFactory from "Database/factories/UserFactory";

export default class RegistrationController {
  public async index() {
    return User.all()
  }

  /**
   * 
   * @param username
   * @param name
   * @param email
   * @param password
   * @param password_confirmation
   * @param is_admin // default = false
   * 
   */
  public async store(ctx: HttpContextContract) {
    try {
      const data = await ctx.request.validate(RegistrationValidator)
      const user = await User.create(data)

      return ctx.response.created(user)
    } catch (error) {
      return ctx.response.abort(error)
    }
  }

  public async factory() {
    return await UserFactory
        .with('posts', 5, (post) => {
          post.with('category')
        })
        .create()
  }
}
