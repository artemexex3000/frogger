import Category from 'App/Models/Category'
import Factory from '@ioc:Adonis/Lucid/Factory'
import PostFactory from './PostFactory'

export default Factory.define(Category, ({ faker }) => {
  return {
    slug: faker.lorem.slug(),
    name: faker.person.fullName(),
    description: faker.lorem.sentence()
  }
})
.relation('posts', () => PostFactory)
.build()
