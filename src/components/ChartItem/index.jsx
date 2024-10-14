import styles from "./ChartItem.module.scss"
import leftEl from "../../assets/img/swap/el-left.svg";

export function ChartItem ({ label, precent, color }) {
  return (
    <div className={styles.item}>
      <div className={styles.head}>
        <div className={styles.label}>
          { label }
          <img src={leftEl} alt="decoration" />
        </div>
        <div className={styles.precent}>
          <span> { precent }%</span>
        </div>
      </div>
      <div className={styles.progress}>
        <span style={{ 
          width: `${precent * 2.5 }%`,
          boxShadow: `0 0 10px ${color}`,
          backgroundColor: color
        }} />
      </div>
    </div>
  )
}