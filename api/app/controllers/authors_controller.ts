import Author from '#models/author'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthorsController {
  public async index({ response }: HttpContext) {
    const authors = await Author.all()
    return response.json({ data: authors })
  }

  public async show({ params, response }: HttpContext) {
    const id = params.id
    try {
      const author = await Author.query().where('id', id).preload('books').firstOrFail()
      return response.json({ data: author })
    } catch (error) {
      return response.status(404).json({ message: 'Author not found' })
    }
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['name'])
    const author = await Author.create(data)
    return response.status(201).json({ message: 'Author created', data: author })
  }

  public async update({ params, request, response }: HttpContext) {
    const id = params.id
    try {
      const author = await Author.findOrFail(id)
      const data = request.only(['name'])
      author.merge(data)
      await author.save()
      return response.json({ message: 'Author updated', data: author })
    } catch (error) {
      return response.status(404).json({ message: 'Author not found' })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    const id = params.id
    try {
      const author = await Author.findOrFail(id)
      await author.delete()
      return response.json({ message: 'Author deleted' })
    } catch (error) {
      return response.status(404).json({ message: 'Author not found' })
    }
  }
}
