import styles from './ProgressBar.module.scss'

const TOTAL_ITEMS = 82
const QUARTER_ITEMS = TOTAL_ITEMS / 4

export function ProgressBar ({ claimed }) {
  const trueCount = claimed.filter(Boolean).length
  const filledItems = Math.floor(trueCount * QUARTER_ITEMS)

  return (
    <div className={styles.progressBar}>
      {Array.from({ length: TOTAL_ITEMS }, (_, i) => (
        <span
          key={i}
          className={i < filledItems ? styles.fill : ''}
        />
      ))}
    </div>
  )
}
