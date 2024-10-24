import React from 'react'

const ErrorMessage = ({ message }) => {
  if (!message) return null 
  
  return (
    <div className="errorContainer">
        {message}
    </div>
  )
}

export default ErrorMessage