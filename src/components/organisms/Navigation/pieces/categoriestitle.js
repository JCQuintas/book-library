import styled from 'styled-components'
import { COLORS, FONT_SIZES } from 'consts'

export default styled.h2.withConfig({ displayName: 'CategoriesTitle' })`
  position: relative;
  height: 50px;
  line-height: 50px;
  margin: 0;
  font-weight: 400;
  background-color: ${COLORS.PRIMARY_4};
  font-size: ${FONT_SIZES.S14};
  color: ${COLORS.SECONDARY_TEXT_LIGHT};
  fill: ${COLORS.SECONDARY_TEXT_LIGHT};
  padding: 0 13px;
  display: flex;
  align-items: center;

  & > :first-child {
    margin-right: 13px;
  }

  &:after {
    top: 100%;
    left: 25px;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-top-color: ${COLORS.PRIMARY_4};
    border-width: 8px;
    margin-left: -8px;
    z-index: 10;
  }
`
