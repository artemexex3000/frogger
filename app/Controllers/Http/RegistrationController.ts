import User from "App/Models/User";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistrationValidator from "App/Validators/RegistrationValidator";
import UserFactory from "Database/factories/UserFactory";

export default class RegistrationController {
  public async index() {
    return User.all()
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(RegistrationValidator)
      const user = await User.create(data)

      return response.created(user)
    } catch (error) {
      return response.abort(error)
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
