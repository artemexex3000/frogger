import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public categoryId: number

  @belongsTo(() => Category)
  public categories: BelongsTo<typeof Category>

  @belongsTo(() => User)
  public users: BelongsTo<typeof User>

  @column()
  public slug: string

  @column()
  public title: string

  @column()
  public excerpt: string

  @column()
  public body: string

  @column()
  public thumbnail: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
