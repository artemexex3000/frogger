import Post from "App/Models/Post";
import PostValidator from "App/Validators/PostValidator";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostsController {
    public async index() {
        return Post.all()
    }

    public async show(ctx: HttpContextContract) {
        return Post.findOrFail(ctx.request.param('id'))
    }

    public async store(ctx: HttpContextContract) {
        try {
            const data = await ctx.request.validate(PostValidator)
            const post = await Post.create(data)

            return ctx.response.created(post)
        } catch (error) {
            return ctx.response.abort(error)
        }
    }

    /**
     * 
     * @param body
     * 
     */
    public async update(ctx: HttpContextContract) {
        const post = await Post.findOrFail(ctx.request.param('id'))

        const result = await post.merge({
            body: (ctx.request.body()).body
        }).save()

        return result
    }

    public async destroy(ctx: HttpContextContract)  {
        const post = await Post.findOrFail(ctx.request.param('id'))

        const result = Post
            .query()
            .delete()
            .where('id', post.id)

        return result
    }
}
