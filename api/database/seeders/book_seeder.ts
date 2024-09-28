import { BookFactory } from '#database/factories/book_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await BookFactory.with('authors', 2).createMany(10)
  }
}