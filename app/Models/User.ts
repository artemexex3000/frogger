import { DateTime } from 'luxon'
import { 
  BaseModel, 
  column,
  hasMany,
  HasMany,
  beforeSave
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Post from './Post'
import Comment from './Comment'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public name: string

  @column()
  public email: string

  @column.dateTime()
  public email_verified_at: DateTime

  @column({ serializeAs: null })
  public password: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column()
  public is_admin: boolean

  @column()
  public remember_token: string

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
