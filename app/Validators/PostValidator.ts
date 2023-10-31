import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    category_id: schema.number([
      rules.required(),
      rules.exists({ table: 'categories', column: 'id' })
    ]),
    user_id: schema.number([
      rules.required(),
      rules.exists({ table: 'users', column: 'id' })
    ]),
    slug: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(50),
      rules.unique({ table: 'posts', column: 'slug' }),
      rules.regex(/^[a-zA-Z0-9-_]+$/),
    ]),
    title: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    excerpt: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(500),
    ]),
    body: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(2555),
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
