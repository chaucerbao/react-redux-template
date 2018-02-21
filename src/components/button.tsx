// Dependencies
import React from 'react'
import Link, { Props as LinkProps } from './link'

// Type definitions
interface Props {
  primary?: boolean
}
type ButtonProps = React.HTMLProps<HTMLButtonElement> & Props
type LinkButtonProps = LinkProps & Props

// Component
const Button = (props: ButtonProps | LinkButtonProps) => {
  const { children, primary, ...restProps } = props

  return (restProps as LinkProps).to ? (
    <Link {...restProps as LinkProps}>{children}</Link>
  ) : (
    <button {...restProps as React.HTMLProps<HTMLButtonElement>}>
      {children}
    </button>
  )
}

// Exports
export default Button
