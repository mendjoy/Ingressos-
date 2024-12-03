import React from "react"
import styles from "./Pagination.module.css"

import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    if (totalPages <= 1) return null

    const buttons = []

    const handlePageChange = (newPage) => {

        if (newPage >= 0 && newPage < totalPages) {

            onPageChange(newPage)

        }
    }

    const pages = () => {
        
        for (let i = 0; i < totalPages; i++) {
            buttons.push(
                <button key={i}
                        onClick={() => onPageChange(i)}
                        className={`${styles.paginationButton} ${currentPage === i ? styles.active : ""}`}>
                    {i + 1}
                </button>
            )
        }
        
        return buttons
    }

    return (
        <div className={styles.pagination}>
            <button className={styles.paginationButton}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}>
                <IoMdArrowRoundBack />
            </button>

            {pages()}

            <button className={styles.paginationButton}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}>
                <IoMdArrowRoundForward />
            </button>
        </div>
    )
}

export default Pagination