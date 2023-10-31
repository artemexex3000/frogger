import Post from "App/Models/Post";
import PostValidator from "App/Validators/PostValidator";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostsController {
    public async index() {
        return Post.all()
    }

    public async store({ request, response }: HttpContextContract) {
        try {
            const data = await request.validate(PostValidator)
            const post = await Post.create(data)

            return response.created(post)
        } catch (error) {
            return response.abort(error)
        }
    }

    public async show({ params }) {
        return Post.findOrFail(params.id)
    }

    /**
     * 
     * @param edit_body in JSON request
     * 
     */
    public async update(ctx: HttpContextContract) {
        const post = await Post.findOrFail(ctx.request.param('id'))

        const result = await post.merge({
            body: (ctx.request.body()).edit_body
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
