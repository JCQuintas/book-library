#!/bin/bash
name=$1

function nameInput() {
  echo "What is the Context name?"
  read name
}

if [[ "$name" = "" ]]; then
  printf "No 'Name' was inputed\n\n"
  nameInput
fi

name="$(tr '[:upper:]' '[:lower:]' <<< ${name})"
upperName="$(tr '[:lower:]' '[:upper:]' <<< ${name:0:1})${name:1}"

cd src/contexts
printf "export { Add${upperName} } from './$name-context'\n" | cat - index.js > temp && mv temp index.js
printf "export { default as ${upperName}Context } from './$name-context'\n" | cat - index.js > temp && mv temp index.js
printf "Name is: $name\n\n"

echo "Generating context file..."
printf "import React, { createContext } from 'react'\n\
\n\
const ${upperName}Context = createContext({})\n\
\n\
const Add${upperName} = ({ children, ...props }) => (\n\
  <${upperName}Context.Consumer>\n\
    {context =>\n\
      React.Children.map(children, child => {\n\
        if (child) return React.cloneElement(child, { ...props, ...context })\n\
      })\n\
    }\n\
  </${upperName}Context.Consumer>\n\
)\n\
\n\
export { Add${upperName} }\n\
\n\
export default ${upperName}Context\n\
" > $name-context.js

sleep 1
