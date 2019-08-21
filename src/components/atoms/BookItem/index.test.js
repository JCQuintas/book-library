import React from 'react'
import ReactDOM from 'react-dom'
import Component from '.'
import { MemoryRouter } from 'react-router-dom'

const book = {
  id: 1,
  title: 'mock',
  author: 'mock',
  thumbnail: '',
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MemoryRouter>
      <Component book={book} layout={'list'} />
    </MemoryRouter>,
    div
  )
})
