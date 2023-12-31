import Post from 'App/Models/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'
import UserFactory from './UserFactory'
import CategoryFactory from './CategoryFactory'
import CommentFactory from './CommentFactory'

export default Factory.define(Post, ({ faker }) => {
  return {
    slug: faker.lorem.slug(),
    title: faker.music.songName(),
    excerpt: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(),
  }
})
.relation('user', () => UserFactory)
.relation('category', () => CategoryFactory)
.relation('comments', () => CommentFactory)
.build()
