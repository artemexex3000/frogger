import User from "App/Models/User";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistrationValidator from "App/Validators/RegistrationValidator";

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
      return response.created(error)
    }
  }
}
