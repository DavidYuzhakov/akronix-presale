import styles from './ProgressBar.module.scss'

const TOTAL_ITEMS = 82

export function ProgressBar ({ segments }) {
  return (
    <div className={styles.progressBar}>
      {Array.from({ length: TOTAL_ITEMS }, (_, i) => (
        <span
          key={i}
          className={i <= segments ? styles.fill : ''}
        />
      ))}
    </div>
  )
}
