import React from 'react'
import ReactDOM from 'react-dom'
import Component from '.'
import { MemoryRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MemoryRouter>
      <Component />
    </MemoryRouter>,
    div
  )
})
