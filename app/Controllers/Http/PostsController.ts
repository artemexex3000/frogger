import Post from "App/Models/Post";
import PostFactory from "Database/factories/PostFactory";

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class PostsController {
    public async index() {
        return Post.all()
    }

    public async factory() {
        return await PostFactory.with('users', 5).with('categories', 5).createMany(10)
    }
}
