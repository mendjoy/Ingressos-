import React from 'react'
import  styles from "./EventCard.module.css"

const EventCard = ({ name, date, location, urlImage, onClick }) => {
  return (
    <div className={styles.eventCard}  onClick={onClick}>
      <img src={urlImage} alt={name} className={styles.eventCardImage} />
      <div className={styles.eventCardContent}>
        <h3 className={styles.eventCardTile}>{name}</h3>
        <div className={styles.eventCardDetails}>
          <p><span>Data:</span> {new Date(date).toLocaleDateString()}</p>
          <p><span>Local:</span> {location}</p>
        </div>
      </div>
    </div>
  )
}

export default EventCard
