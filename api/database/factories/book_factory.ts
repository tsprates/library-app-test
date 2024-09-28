import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'
import { AuthorFactory } from './author_factory.js'

export const BookFactory = factory
  .define(Book, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentences(3),
      date: faker.date.anytime()
    }
  })
  .relation('authors', () => AuthorFactory)
  .build()