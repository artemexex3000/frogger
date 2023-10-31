import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @column()
  public slug: string

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
