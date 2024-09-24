import React from 'react'
import styles from './ErrorMessage.module.css'

const ErrorMessage = ({ message }) => {
  if (!message) return null 

  const errorLines = message.split('\n')

  return (
    <div className={styles.errorContainer}>
        {errorLines.map((line, index) => (
            <p key={index}>{line}</p> 
        ))}
    </div>
  )
}

export default ErrorMessage;