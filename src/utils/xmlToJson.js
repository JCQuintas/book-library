import changeCase from 'change-case'

const removeDataSection = object => {
  if (!object || typeof object !== 'object') return object
  return Object.keys(object)
    .map(property => {
      if (object.hasOwnProperty(property)) {
        if (property === 'text') return null
        if (object[property] && object[property].cdataSection !== undefined)
          return { [property]: object[property].cdataSection }
        if (Array.isArray(object[property])) {
          return { [property]: object[property].map(v => removeDataSection(v)) }
        }
        if (typeof object[property] === 'object') {
          return { [property]: removeDataSection(object[property]) }
        } else {
          return { [property]: object[property] }
        }
      } else {
        return { [property]: object[property] }
      }
    })
    .reduce((acc, o) => ({ ...acc, ...o }), {})
}

// Changes XML to JSON
// Modified version from here: http://davidwalsh.name/convert-xml-json
export default function xmlToJson(xml) {
  // Create the return object
  let obj = {}

  if (xml.nodeType === 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj['@attributes'] = {}
      for (let j = 0; j < xml.attributes.length; j += 1) {
        const attribute = xml.attributes.item(j)
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue
      }
    }
  } else if (xml.nodeType === 3 || xml.nodeType === 4) {
    // text
    obj = xml.nodeValue
  }

  // do children
  // If just one text node inside
  if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
    obj = xml.childNodes[0].nodeValue
  } else if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i += 1) {
      const item = xml.childNodes.item(i)
      const nodeName = changeCase.camelCase(item.nodeName)
      if (typeof obj[nodeName] === 'undefined') {
        obj[nodeName] = xmlToJson(item)
      } else {
        if (typeof obj[nodeName].push === 'undefined') {
          const old = obj[nodeName]
          obj[nodeName] = []
          obj[nodeName].push(old)
        }
        obj[nodeName].push(xmlToJson(item))
      }
    }
  }

  return removeDataSection(obj)
}
