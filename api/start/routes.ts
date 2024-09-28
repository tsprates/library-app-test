/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const BooksController = () => import('#controllers/books_controller')
const AuthorsController = () => import('#controllers/authors_controller')
import router from '@adonisjs/core/services/router'

router.on('/').redirect('/books')
router.get('/books', [BooksController, 'index']).as('books.index')
router.get('/books/:id', [BooksController, 'show']).as('books.show')
router.post('/books', [BooksController, 'store']).as('books.store')
router.put('/books/:id', [BooksController, 'update']).as('books.update')
router.delete('/books/:id', [BooksController, 'destroy']).as('books.destroy')

router.get('/authors', [AuthorsController, 'index']).as('authors.index')
router.get('/authors/:id', [AuthorsController, 'show']).as('authors.show')
router.post('/authors', [AuthorsController, 'store']).as('authors.store')
router.put('/authors/:id', [AuthorsController, 'update']).as('authors.update')
router.delete('/authors/:id', [AuthorsController, 'destroy']).as('authors.destroy')
