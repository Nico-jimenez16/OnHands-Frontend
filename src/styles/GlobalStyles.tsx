'use client'

import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    height: 100%;
  }

  body {
    margin: 0;
    height: 100vh;
    overflow: hidden;
    font-family: ${theme.fonts.sans};
    font-size: ${theme.fontSize.base};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.bg.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  ul, ol {
    list-style: none;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }
`
