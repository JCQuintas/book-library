#!/bin/bash
type=$1
name=$2

function nameInput() {
  echo "What is the Component name?"
  read name
}

function typeInput() {
  options=("atoms" "molecules" "organisms" "pages" "templates")
  select opt in "${options[@]}"
  do
      case $opt in
          "atoms")
              printf "You chose $opt\n\n"
              type="$opt"
              break
              ;;
          "molecules")
              printf "You chose $opt\n\n"
              type="$opt"
              break
              ;;
          "organisms")
              printf "You chose $opt\n\n"
              type="$opt"
              break
              ;;
          "pages")
              printf "You chose $opt\n\n"
              type="$opt"
              break
              ;;
          "templates")
              printf "You chose $opt\n\n"
              type="$opt"
              break
              ;;
          *) echo invalid option;;
      esac
  done
  nameInput
}

if [[ $# = 0 ]]; then
  printf "No type was inputed, please select a Component type:\n\n"
  typeInput
elif [[ "$type" = "atoms" ]]; then
  printf "Type is: $type\n\n"
elif [[ "$type" = "molecules" ]]; then
  printf "Type is: $type\n\n"
elif [[ "$type" = "organisms" ]]; then
  printf "Type is: $type\n\n"
elif [[ "$type" = "pages" ]]; then
  printf "Type is: $type\n\n"
elif [[ "$type" = "templates" ]]; then
  printf "Type is: $type\n\n"
else
  printf "A wrong type was inputed, please select a Component type:\n\n"
  typeInput
fi

if [[ "$name" = "" ]]; then
  printf "No 'Name' was inputed\n\n"
  nameInput
fi

name="$(tr '[:lower:]' '[:upper:]' <<< ${name:0:1})${name:1}"

mkdir -p src/components/$type/$name
cd src/components
printf "export { default as $name } from './$type/$name'\n" >> index.js
cd $type
cd $name

printf "Name is: $name\n\n"

echo "Generating test file..."
printf "\
import React from 'react'\n\
import ReactDOM from 'react-dom'\n\
import Component from '.'\n\
\n\
it('renders without crashing', () => {\n\
  const div = document.createElement('div')\n\
  ReactDOM.render(<Component/>, div)\n\
})" > index.test.js

echo "Generating component file..."
printf "\
import React from 'react'\n\
import styled from 'styled-components'\n\
//import PropTypes from 'prop-types'\n\
\n\
const ${name} = ({...props}) => {\n\
  return (\n\
    <div>\n\
      ${name}
    </div>\n\
  )\n\
}\n\
\n\
${name}.propTypes = {}\n\
\n\
${name}.defaultProps = {}\n\
\n\
${name}.displayName = '${name}'\n\
\n\
export default ${name}" > index.js

sleep 2
