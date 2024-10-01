import styles from "./Charts.module.scss"
import elImg from "../../assets/icons/sub-el.svg"
import { charts } from "../../data"

import { ChartItem } from "../ChartItem"
import { useTranslation } from "react-i18next"

export function Charts () {
  const { t } = useTranslation()

  return (
    <div className={styles.charts}>
      <h3>{t('swap.charts.title.first')} <br />{t('swap.charts.title.second')}</h3>
      <img className={styles.el} src={elImg} alt="" />
      <div className={styles.items}>
        {charts.map((chart, i) => <ChartItem key={t(`swap.charts.items.${i}`)} {...chart} label={t(`swap.charts.items.${i}`)} />)}
      </div>
      <p>{t('swap.charts.text')}</p>
    </div>
  )
}