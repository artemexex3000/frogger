import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table
        .increments('id')
        .primary()
      table.string('username').notNullable().unique()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table
        .timestamp('email_verified_at')
        .nullable()
      table
        .string('password')
        .notNullable()
      table
        .boolean('is_admin')
        .defaultTo(false)
      table
        .string('remember_token')
        .nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
