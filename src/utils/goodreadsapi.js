import applyConverters from 'axios-case-converter'
import axios from 'axios'

class Axios {
  constructor() {
    const isDev = process.env.NODE_ENV === 'development'
    const apiUrl = '/api/proxy/https://www.goodreads.com/'
    this.axios = applyConverters(
      axios.create({
        baseURL: isDev ? `http://localhost:8081${apiUrl}` : apiUrl,
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
   * Search for books on the api
   *
   * @param {String} q the query to search for
   */
  search = (params, ...args) => {
    const { q } = params
    return this.axios.get(`/search/index.xml?key=YmKhSypTanyQgOWlq9oXFQ&q=${encodeURI(q)}`, { ...args })
  }

  getById = (params, ...args) => {
    const { id } = params
    return this.axios.get(`/book/show/${id}.xml?key=YmKhSypTanyQgOWlq9oXFQ`, { ...args })
  }
}

export default new Axios()
