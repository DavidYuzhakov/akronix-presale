import { useState, useEffect } from "react";
import { calculateTimeLeft } from "../../utils/main.js";
import styles from "./Timer.module.scss"
import { useTranslation } from "react-i18next";


export function Timer ({ targetTime }) {
  const { t } = useTranslation()
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetTime);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.days < 0 && newTimeLeft.hours < 0 && newTimeLeft.minutes < 0 && newTimeLeft.seconds < 0) {
        clearInterval(intervalId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0})
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetTime])

  return (
    <div className={styles.timer}>
      <div className={styles.item}>
        <span className={styles.time}>{t('swap.timer.days')}</span>
        <div className={styles.value}>{ timeLeft.days }</div>
      </div>
      <span className={styles.colon}>:</span>
      <div className={styles.item}>
        <span className={styles.time}>{t('swap.timer.hours')}</span>
        <div className={styles.value}>{ timeLeft.hours }</div>
      </div>
      <span className={styles.colon}>:</span>
      <div className={styles.item}>
        <span className={styles.time}>{t('swap.timer.minutes')}</span>
        <div className={styles.value}>{ timeLeft.minutes }</div>
      </div>
      <span className={`${styles.colon} ${styles.colonSeconds}`}>:</span>
      <div className={styles.item}>
        <span className={styles.time}>{t('swap.timer.seconds')}</span>
        <div className={styles.value}>{ timeLeft.seconds }</div>
      </div>
    </div>
  )
}