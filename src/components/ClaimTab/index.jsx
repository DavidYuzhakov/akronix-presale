import { useEffect, useState } from 'react'
import { useForm } from '../../context/FormContext'
import styles from './ClaimTab.module.scss'
import { calculateTimeLeft } from '../../utils/main'

export function ClaimTab() {
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
      <p className={'form-text'}>всего вы получите</p>
      <h3>{userInfo.user_info.akron} akron</h3>
      <ul className={'list'}>
        <li>
          <div>
            <span>Объем разлока:</span>
            <span>{userInfo.claim_info.next_unlock_value}</span>
          </div>
        </li>
        <li>
          <div>
            <span>Дата разлока:</span>
            <span>
              {timeLeft.days + 'd : ' + timeLeft.hours + 'h : ' + timeLeft.minutes + 'm'}
            </span>
          </div>
        </li>
        <li>
          <div>
            <span>Ежемесячный разлок:</span>
            <span>{userInfo.claim_info.monthly_value} AKRON</span>
          </div>
        </li>
        <li>
          <div>
            <span>всего разлочено:</span>
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
