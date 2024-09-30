import styles from './ProgressBar.module.scss'

const TOTAL_ITEMS = 82

export function ProgressBar ({ segements }) {
  return (
    <div className={styles.progressBar}>
      {Array.from({ length: TOTAL_ITEMS }, (_, i) => (
        <span
          key={i}
          className={i <= segements ? styles.fill : ''}
        />
      ))}
    </div>
  )
}
