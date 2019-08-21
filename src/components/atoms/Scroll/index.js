import React from 'react'
import styled from 'styled-components'
//import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

const StyledScroll = styled(Scrollbars)``

const Scroll = ({ ...props }) => <StyledScroll {...props} hideTracksWhenNotNeeded />

Scroll.propTypes = {}

Scroll.defaultProps = {}

Scroll.displayName = 'Scroll'

export default Scroll
