import React from 'react'
import ReactDOM from 'react-dom'
import Component from '.'

const Div = props => <div>Test</div>

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Div>{Component(Div)}</Div>, div)
})
