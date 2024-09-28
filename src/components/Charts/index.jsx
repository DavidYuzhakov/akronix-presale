import styles from "./Charts.module.scss"
import elImg from "../../assets/icons/sub-el.svg"
import { charts } from "../../data"

import { ChartItem } from "../ChartItem"

export function Charts () {
  return (
    <div className={styles.charts}>
      <h3>Назначение <br />собранных средств</h3>
      <img className={styles.el} src={elImg} alt="" />
      <div className={styles.items}>
        {charts.map(chart => <ChartItem key={chart.label} {...chart} />)}
      </div>
      <p>Распределение TON за любые покупки пользователей на платформе Akronix</p>
    </div>
  )
}