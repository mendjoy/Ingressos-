import React from 'react'
import styles from './SuccessMessage.module.css'

const SuccessMessage = ({ message }) => {

    return (
        <div className={styles.successContainer}>
            <p>{message}</p>
        </div>
    )
}

export default SuccessMessage
