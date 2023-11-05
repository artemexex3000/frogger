/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * 
 * TODO: make middleware: auth, guest
 * 
 */

Route.on('/').redirectToPath('posts')

Route
  .resource('register', 'RegistrationController')
  .only(['index', 'store'])
  .middleware({
    store: ['guest'],
    index: ['auth']
  })

Route.post('session/store', 'AuthController.store').middleware('guest')
Route.post('session/destroy', 'AuthController.destroy').middleware('auth')


/**
 * 
 * @param user_id
 * @param categoryId
 * @param slug
 * @param title
 * @param except
 * @param body
 * 
 */
Route
  .resource('posts', 'PostsController')
  .except(['create', 'edit'])
  .middleware({
    store: ['admin'],
    update: ['admin'],
    destroy: ['admin']
  })

Route
  .resource('comments', 'CommentsController')
  .except(['create', 'edit', 'show'])
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['admin']
  })

/******************************/

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.post('/factory', "RegistrationController.factory")

Route.get('test', async (ctx: HttpContextContract) => {
  return ctx.auth.use('api').isAuthenticated
})