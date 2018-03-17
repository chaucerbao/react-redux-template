// Dependencies
import React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

// Type definitions
export interface Props extends RouterLinkProps {
  external?: boolean
}

// Component
const Link = (props: Props) => {
  const { external, children, to, ...restProps } = props

  return external && typeof to === 'string' ? (
    <a {...restProps} href={to} target="_blank" rel="noopener">
      {children}
    </a>
  ) : (
    <RouterLink {...restProps} to={to}>
      {children}
    </RouterLink>
  )
}

// Exports
export default Link
