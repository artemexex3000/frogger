import Comment from 'App/Models/Comment'
import Factory from '@ioc:Adonis/Lucid/Factory'
import UserFactory from './UserFactory'
import PostFactory from './PostFactory'

export default Factory.define(Comment, ({ faker }) => {
  return {
    body: faker.lorem.paragraph()
  }
})
.relation('post', () => PostFactory)
.relation('user', () => UserFactory)
.build()
