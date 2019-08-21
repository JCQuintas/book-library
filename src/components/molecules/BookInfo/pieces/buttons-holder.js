import styled from 'styled-components'

export default styled.div.withConfig({ displayName: 'ButtonsHolder' })`
  display: flex;
  flex-direction: row;
  margin-top: 20px;

  & > a {
    margin-left: 10px;
  }
`
