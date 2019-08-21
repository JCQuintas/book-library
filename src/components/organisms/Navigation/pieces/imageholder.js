import styled from 'styled-components'
import { COLORS } from 'consts'

export default styled.div.withConfig({ displayName: 'ImageHolder' })`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 50px;

  img {
    height: 90px;
    width: 90px;
    border-radius: 50%;
    margin: 0 auto;
    object-fit: cover;
  }

  svg {
    height: 110px;
    width: 110px;
    position: absolute;
    pointer-events: none;
    stroke: ${COLORS.PRIMARY_1};
    fill: transparent;
  }
`
