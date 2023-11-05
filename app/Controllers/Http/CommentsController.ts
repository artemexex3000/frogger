import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from "App/Models/Comment";

export default class CommentsController {
  public async index() {
    return Comment.all()
  }

  public async store(ctx: HttpContextContract) {
    return Comment.create(ctx.request.body())
  }

  public async update(ctx: HttpContextContract) {
    const comment = await Comment.findOrFail(ctx.request.param('id'))

    const result = await comment.merge({
      body: (ctx.request.body()).body
    }).save()

    return result
  }

  public async destroy(ctx: HttpContextContract)  {
    const comment = await Comment.findOrFail(ctx.request.param('id'))

    const result = Comment
        .query()
        .delete()
        .where('id', comment.id)

    return result
}
}
