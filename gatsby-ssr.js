import React from 'react'
import '@dnb/eufemia/style/core'
import '@dnb/eufemia/style/themes/theme-ui/ui-theme-fonts.min.css'
import '@dnb/eufemia/style/themes/theme-ui/ui-theme-basis.min.css'
import { ThemeProvider } from './src/context/ThemeContext'
import { SettingsProvider } from './src/context/SettingsContext'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <SettingsProvider>
      {element}
    </SettingsProvider>
  </ThemeProvider>
)

// Single adaptive favicon: the SVG carries its own
// @media (prefers-color-scheme: dark) rule to swap fill color.
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="favicon"
      rel="icon"
      type="image/svg+xml"
      href="/favicon.svg"
    />,
  ])
}
