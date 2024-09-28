import Author from '#models/author'
import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  public async index({ response }: HttpContext) {
    const books = await Book.query().preload('authors')
    return response.json({ data: books })
  }

  public async show({ params, response }: HttpContext) {
    const id = params.id
    try {
      const book = await Book.query().where('id', id).preload('authors').firstOrFail()
      return response.json({ data: book })
    } catch (error) {
      return response.status(404).json({ message: 'Book not found' })
    }
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'author'])

    const author = await Author.findBy('name', data['author'])
    if (!author) {
      return response.status(404).json({ message: 'Author not found' })
    }

    const book = await Book.create({ title: data['title'] })
    await book.related('authors').attach([author.id])

    return response.status(201).json({ message: 'Book created', data: book })
  }

  public async update({ params, request, response }: HttpContext) {
    const bookId = params.id
    const data = request.only(['title', 'author'])

    try {
      const book = await Book.findOrFail(bookId)

      if (data['title']) {
        book.title = data['title']
        await book.save()
      }

      if (data['author']) {
        const author = await Author.findBy('name', data['author'])
        if (!author) {
          return response.status(404).json({ message: 'Author not found' })
        }
        await book.related('authors').sync([author.id])
      }

      return response.json({ message: 'Book updated', data: book })
    } catch (error) {
      return response.status(404).json({ message: 'Book not found' })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    const bookId = params.id
    try {
      const book = await Book.findOrFail(bookId)
      await book.delete()
      return response.json({ message: 'Book deleted' })
    } catch (error) {
      return response.status(404).json({ message: 'Book not found' })
    }
  }
}
