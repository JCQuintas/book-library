import { injectGlobal } from 'styled-components'
import { COLORS } from 'consts'

export default () => {
  injectGlobal`

    html {
      font-size: 100%;
      -webkit-text-size-adjust: 100%;
      font-variant-ligatures: none;
      -webkit-font-variant-ligatures: none;
      text-rendering: optimizeLegibility;
      -moz-osx-font-smoothing: grayscale;
      font-smoothing: antialiased;
      -webkit-font-smoothing: antialiased;
      text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
      box-sizing: border-box;
    }

    body {
      font-family: 'Lato', Arial, sans-serif;
      font-weight: 400;
      font-size: 16px;
      margin: 0;
      padding: 0;
      color: ${COLORS.PRIMARY_TEXT_DARK};
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    #root {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
    }

    *,
    *::after,
    *::before {
      box-sizing: inherit;
    }

    button,
    input,
    select,
    textarea {
      font-family: inherit;
      font-weight: inherit;
      font-size: inherit;
      color: inherit;
    }

    *:focus {
      outline: none;
    }
  `
}
