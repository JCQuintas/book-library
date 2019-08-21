import React, { Component } from 'react'
import styled from 'styled-components'
//import PropTypes from 'prop-types'
import { GOODREADS_API, REST_API, getProperty, xmlToJson, parsePublicationDate } from 'utils'
import moment from 'moment'
import queryString from 'query-string'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Scroll, Button } from 'components'
import { REGEXP, BREAKPOINTS, EBOOK_FORMATS } from 'consts'

const Form = styled.form`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;

  & > span {
    margin-top: 10px;
    color: #f44336;
  }

  & > img {
    width: 100%;
    max-width: 100px;
    min-height: 100px;
    max-height: 100px;
    object-fit: contain;
    margin: 30px 0;
  }

  @media ${BREAKPOINTS.TABLET_PORTRAIT_UP} {
    padding: 40px 40px 100px;
  }
`

const StyledButton = styled(Button)`
  height: 32px;
  line-height: 32px;
  border-radius: 10px;
  margin-top: 50px;
  align-self: flex-end;
`

class CreateForm extends Component {
  lastFetched = null
  state = {
    title: '',
    author: '',
    description: '',
    thumbnail: '',
    publishedAt: '',
    externalId: '',
    isbn: '',
    isbn13: '',
    pages: '',
    category: 0,
    downloadLinks: [''],
    errors: {},
    loading: true,
    categories: [],
    error: '',
  }

  getBookId() {
    const { match } = this.props
    if (match && match.params && match.params.id) {
      return match.params.id
    }
    return ''
  }

  getAuthor(authors) {
    if (!authors || !authors.author) return ''
    const { author } = authors
    if (author && author[0] && author[0].name) return author[0].name
    if (author && author.name) return author.name
    return ''
  }

  fetchBookInfo() {
    const id = this.getBookId()
    this.lastFetched = id
    this.setState({ loading: true })
    if (id) {
      GOODREADS_API.getById({ id }).then(r => {
        const jsonified = xmlToJson(new DOMParser().parseFromString(r.data, 'application/xml'))
        const result = getProperty(jsonified, 'goodreadsResponse.book', {})
        const originalPublication = parsePublicationDate(
          result.work.originalPublicationYear,
          result.work.originalPublicationMonth,
          result.work.originalPublicationDay
        )
        const resultPublication = parsePublicationDate(
          result.publicationYear,
          result.publicationMonth,
          result.publicationDay
        )
        const publication = isNaN(originalPublication) ? resultPublication : originalPublication
        this.setState({
          title: result.title,
          author: this.getAuthor(result.authors),
          description: result.description,
          thumbnail: result.imageUrl,
          publishedAt: moment(publication).format('DD/MM/YYYY'),
          externalId: id,
          isbn: result.isbn,
          isbn13: result.isbn13,
          pages: result.numPages,
          loading: false,
        })
      })
    } else {
      this.setState({ loading: false })
    }
  }

  componentDidMount() {
    this.fetchBookInfo()
    REST_API.categories().then(({ data: categories }) => this.setState({ categories }))
  }

  componentDidUpdate() {
    const id = this.getBookId()
    if (id !== this.lastFetched) this.fetchBookInfo()
  }

  getError(name, value) {
    if (name === 'title' && (!value || value.length < 3)) return [{ title: 'The book needs a Title' }]
    if (name === 'author' && (!value || value.length < 3)) return [{ author: 'The book needs an Author' }]
    if (name === 'category' && !value) return [{ category: 'The book needs a Category' }]
    if (name === 'publishedAt' && !moment(value).isValid() && REGEXP.DATE.test(value))
      return [{ publishedAt: 'The book publication date needs to be formated as DD/MM/YYYY' }]
    if (name === 'downloadLinks' && value.every(v => v === '' || v === undefined || v === null || !REGEXP.URL.test(v)))
      return [{ downloadLinks: 'The book needs at least one valid Link' }]
    return [{ [name]: undefined }]
  }

  handleChange = name => event => {
    const { errors } = this.state
    const err = this.getError(name, event.target.value)

    this.setState({
      errors: Object.assign(errors, ...err),
      [name]: event.target.value,
    })
  }

  handleLinkChange = index => event => {
    const { downloadLinks, errors } = this.state
    const err = this.getError('downloadLinks', downloadLinks)
    const arr = downloadLinks.slice()
    arr[index] = event.target.value
    this.setState({
      errors: Object.assign(errors, ...err),
      downloadLinks: arr,
    })
  }

  verifyForm = e => {
    e.preventDefault()
    this.submit()
  }

  submit() {
    const {
      title,
      author,
      publishedAt,
      pages,
      description,
      downloadLinks,
      errors,
      thumbnail,
      category,
      categories,
      externalId,
      isbn,
      isbn13,
    } = this.state
    const decideFileType = url => {
      const format = url
        .split('.')
        .slice(-1)[0]
        .toLowerCase()
      return EBOOK_FORMATS.includes(format) ? format : 'und'
    }
    if (Object.keys(errors).some(k => errors[k] !== '' || errors[k] !== null || errors[k] !== undefined)) {
      REST_API.createBook({
        title,
        author,
        publishedAt: moment(publishedAt, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        pages,
        description,
        downloadLinks: downloadLinks.map(l => ({
          url: l,
          type: decideFileType(l),
        })),
        thumbnail,
        category_id: categories.find(obj => obj.name === category).id,
        externalId,
        isbn,
        isbn13,
      })
        .then(r => {
          if (r.status === 201) {
            const q = queryString.stringify({ q: this.state.search })
            this.props.history.push(`/create?${q}`)
          }
        })
        .catch(error => this.setState({ error }))
    }
  }

  getRequestError(error) {
    if (typeof error === 'object') {
      if (error.error) return error.error
    } else if (typeof error === 'string') {
      return error
    }
    return 'Unknown error occured'
  }

  render() {
    const {
      title,
      author,
      publishedAt,
      pages,
      description,
      downloadLinks,
      errors,
      loading,
      thumbnail,
      categories,
      category,
      error,
    } = this.state
    const parsedError = this.getRequestError(error)
    return (
      <Scroll>
        <Form onSubmit={this.verifyForm}>
          {thumbnail && <img src={thumbnail} alt={title} />}
          <TextField
            id="title"
            label="Title"
            value={title}
            onChange={this.handleChange('title')}
            margin="dense"
            fullWidth
            required
            error={!!errors.title}
            helperText={errors.title}
            disabled={loading}
          />
          <TextField
            id="author"
            label="Author"
            value={author}
            onChange={this.handleChange('author')}
            margin="normal"
            fullWidth
            required
            error={!!errors.author}
            helperText={errors.author}
            disabled={loading}
          />
          <TextField
            id="publishedAt"
            label="Publication Date"
            value={publishedAt}
            onChange={this.handleChange('publishedAt')}
            margin="dense"
            fullWidth
            required
            error={!!errors.publishedAt}
            helperText={errors.publishedAt}
            disabled={loading}
          />
          <TextField
            id="category"
            select
            required
            fullWidth
            label="Category"
            value={category}
            onChange={this.handleChange('category')}
            SelectProps={{
              native: true,
            }}
            error={!!errors.category}
            helperText={errors.category}
            margin="dense"
          >
            <option key={0} value="" />
            {categories.map(option => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </TextField>
          <TextField
            id="pages"
            label="Pages"
            value={pages}
            onChange={this.handleChange('pages')}
            margin="dense"
            fullWidth
            type="number"
            disabled={loading}
          />
          <TextField
            id="description"
            label="Description"
            value={description}
            onChange={this.handleChange('description')}
            margin="dense"
            fullWidth
            multiline
            rowsMax="6"
            disabled={loading}
          />
          {downloadLinks &&
            Array(downloadLinks.length + 1)
              .fill()
              .map((v, i) => {
                return (
                  <TextField
                    key={i}
                    label={i === 0 ? 'Links' : undefined}
                    id={`downloadLinks${i}`}
                    value={downloadLinks[i]}
                    onChange={this.handleLinkChange(i)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{`${i + 1}.`}</InputAdornment>,
                    }}
                    margin={i === 0 ? 'normal' : 'dense'}
                    fullWidth
                    required={i === 0 ? true : false}
                    error={i === 0 ? !!errors.downloadLinks : undefined}
                    helperText={i === 0 ? errors.downloadLinks : undefined}
                    disabled={loading}
                  />
                )
              })}
          <StyledButton type="submit">Submit</StyledButton>
          <span>{parsedError}</span>
        </Form>
      </Scroll>
    )
  }
}

CreateForm.propTypes = {}

CreateForm.defaultProps = {}

CreateForm.displayName = 'CreateForm'

export default CreateForm
