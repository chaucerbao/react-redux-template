// Dependencies
import React from 'react'
import RouterLink, { LinkProps } from 'redux-first-router-link'

// Type definitions
interface Props extends LinkProps {
  external?: boolean
}

// Component
const Link = (props: Props) => {
  const { external, children, to, ...linkProps } = props

  return external && typeof to === 'string' ? (
    <a {...linkProps} href={to} target="_blank" rel="noopener">
      {children}
    </a>
  ) : (
    <RouterLink {...linkProps} to={to}>
      {children}
    </RouterLink>
  )
}

// Exports
export default Link
