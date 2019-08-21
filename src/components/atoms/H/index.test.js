import React from 'react'
import ReactDOM from 'react-dom'
import Component from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Component.H1 />, div)
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Component.H2 />, div)
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Component.H3 />, div)
})
