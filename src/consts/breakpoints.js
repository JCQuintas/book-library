import changeCase from 'change-case'

const sizes = {
  PHONE_ONLY: {
    maxWidth: '599px',
  },
  TABLET_PORTRAIT_UP: {
    minWidth: '600px',
  },
  TABLET_LANDSCAPE_UP: {
    minWidth: '900px',
  },
  DESKTOP_UP: {
    minWidth: '1200px',
  },
  BIG_DESKTOP_UP: {
    minWidth: '1800px',
  },
}

const media = Object.keys(sizes).reduce((acc, label) => {
  const query = Object.keys(sizes[label])
    .map(v => `(${changeCase.paramCase(v)}: ${sizes[label][v]})`)
    .join(' and ')
  acc[label] = query
  return acc
}, {})

export default media
