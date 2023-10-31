import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import PostFactory from './PostFactory'
import CommentFactory from './CommentFactory'

export default Factory.define(User, ({ faker }) => {
  return {
    username: faker.internet.userName(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    is_admin: false,
  }
})
.relation('posts', () => PostFactory)
.relation('comments', () => CommentFactory)
.build()
