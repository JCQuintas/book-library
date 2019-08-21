import styled from 'styled-components'
import { FONT_SIZES } from 'consts'

export default styled.form.withConfig({ displayName: 'SearchForm' })`
  height: 40px;
  display: flex;
  flex-direction: row;
  position: relative;

  &:after {
    content: ' ';
    position: absolute;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  div {
    position: absolute;
    left: 10px;
    top: 0;
    height: 40px;
    pointer-events: none;
    display: ${({ value }) => (value === '' ? 'flex' : 'none')};
    align-items: center;
    line-height: 40px;
  }

  &:focus-within div {
    display: none;
  }

  input {
    height: 40px;
    line-height: 40px;
    border: none;
    padding-left: 10px;
    display: inline-flex;
    font-size: ${FONT_SIZES.S16};
    flex: 1;
  }
`
