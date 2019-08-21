import React, { createContext } from 'react'
import { BREAKPOINTS } from 'consts'

const NavigationContext = createContext({
  isNavigationOpen: window.matchMedia(BREAKPOINTS.TABLET_PORTRAIT_UP).matches,
  toggleNavigation: () => {},
})

const AddNavigation = ({ children, ...props }) => (
  <NavigationContext.Consumer>
    {context =>
      React.Children.map(children, child => {
        if (child) return React.cloneElement(child, { ...props, ...context })
      })
    }
  </NavigationContext.Consumer>
)

export { AddNavigation }

export default NavigationContext
