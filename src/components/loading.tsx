// Dependencies
import React from 'react'

// Type definitions
interface Props {
  error?: boolean
  pastDelay?: boolean
  timedOut?: boolean
}

// Component
const Loading = (_props: Props) => <div>Loading...</div>

// Exports
export default Loading
