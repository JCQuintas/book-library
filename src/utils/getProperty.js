export default (obj, key, def) =>
  key.split('.').reduce((o, x) => (typeof o === 'undefined' || o === null ? o : o[x] || def), obj)
