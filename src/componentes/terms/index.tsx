'use client'
import styles from './terms.module.css'
import { useState } from 'react'

interface TermosProps {
  description: string
}

export default function Termos({ description }: TermosProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const descriptionLimit = 0

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentDescription}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p className={styles.subtitle}>Termos do sorteio</p>
          {description.length > descriptionLimit && (
            <button className={styles.readMoreButton} onClick={toggleReadMore} type='button'>
              {isExpanded ? 'Ver menos' : 'Ver termos'}
            </button>
          )}
        </div>
        <p className={styles.description}>
          {isExpanded || description.length <= descriptionLimit
            ? description
            : `${description.substring(0, descriptionLimit)}`}
        </p>
      </div>
    </div>
  )
}