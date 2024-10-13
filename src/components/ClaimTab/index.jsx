import { useEffect, useState } from 'react'
import { useForm } from '../../context/FormContext'
import styles from './ClaimTab.module.scss'
import { calculateTimeLeft } from '../../utils/main'
import { useTranslation } from 'react-i18next'
import {IS_CLOSED} from "../../App.jsx";

export function ClaimTab() {
  const { t } = useTranslation()
  const { userInfo } = useForm() 
  const targetTime = new Date(userInfo.claim_info.next_unlock_time)
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime))

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetTime)
      setTimeLeft(newTimeLeft)

      if (newTimeLeft.days < 0 && newTimeLeft.hours < 0 && newTimeLeft.minutes < 0) {
        clearInterval(intervalId)
        setTimeLeft({ days: 0, hours: 0, minutes: 0 })
      }
    }, 1000)

    return () => clearInterval(intervalId);
  }, [targetTime])

  return (
    <div className={styles.claim}>
      <p className={'form-text'}>{t('swap.form.tabs.1.paragraph')}</p>
      <h3>{IS_CLOSED ? userInfo.user_info.akron_closed : userInfo.user_info.akron} akron</h3>
      <ul className={'list'}>
        <li>
          <div>
            <span>{t('swap.form.tabs.1.list.0.type')}</span>
            <span>{userInfo.claim_info.next_unlock_value}</span>
          </div>
        </li>
        <li>
          <div>
            <span>{t('swap.form.tabs.1.list.1.type')}</span>
            <span>
              {timeLeft.days + 'd : ' + timeLeft.hours + 'h : ' + timeLeft.minutes + 'm'}
            </span>
          </div>
        </li>
        <li>
          <div>
            <span>{t('swap.form.tabs.1.list.2.type')}</span>
            <span>{userInfo.claim_info.monthly_value} AKRON</span>
          </div>
        </li>
        <li>
          <div>
            <span>{t('swap.form.tabs.1.list.3.type')}</span>
            <span>{userInfo.claim_info.total_unlocked_value} akron</span>
          </div>
        </li>
      </ul>
      <button className="btn" type="submit">
        claim akron
      </button>
    </div>
  )
}
