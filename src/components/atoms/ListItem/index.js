import React from 'react'
import styled from 'styled-components'
//import PropTypes from 'prop-types'

const Container = styled.div`
  height: 60px;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  display: flex;
`

const ListItem = ({ ...props }) => <Container {...props} />

ListItem.propTypes = {}

ListItem.defaultProps = {}

ListItem.displayName = 'ListItem'

export default ListItem
