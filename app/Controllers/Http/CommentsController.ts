import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from "App/Models/Comment";

export default class CommentsController {
  public async index() {
    return Comment.all()
  }

  public async store({ request }: HttpContextContract) {
    return Comment.create(request.body())
  }
}
