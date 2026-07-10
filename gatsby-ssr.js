import React from 'react'
import '@dnb/eufemia/style/core'
import '@dnb/eufemia/style/themes/theme-ui/ui-theme-fonts.min.css'
import '@dnb/eufemia/style/themes/theme-ui/ui-theme-basis.min.css'
import { ThemeProvider } from './src/context/ThemeContext'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    {element}
  </ThemeProvider>
)
