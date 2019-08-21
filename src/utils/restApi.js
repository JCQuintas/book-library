import applyConverters from 'axios-case-converter'
import axios from 'axios'

class Axios {
  constructor() {
    const isDev = process.env.NODE_ENV === 'development'
    this.axios = applyConverters(
      axios.create({
        baseURL: isDev ? 'http://localhost:8081/api' : '/api',
      })
    )
  }

  /*
    We use axios-case-converter to:
    Convert outgoing data & params object keys into snake_case
    Convert incoming data object keys into camelCase
    Convert outgoing headers object keys into Header-Case
    Convert incoming headers object keys into camelCase
  */

  /**
   * Get all categories
   */
  categories = params => this.axios.get(`/categories`, { params })

  /**
   * Get books
   *
   * @param {String} category the category to filter the books by
   */
  books = params => this.axios.get(`/books`, { params })

  /**
   * Get book
   *
   * @param {String} bookId the book id to retrieve
   */
  book = ({ bookId, ...params }) => this.axios.get(`/books/${bookId}`, { params })

  createBook = data => this.axios.post(`/books`, data)
}

export default new Axios()
