import styles from './Form.module.scss'

import el from '../../assets/icons/sub-el.svg'
import lines from '../../assets/img/swap/lines-form.svg'
import { FormContent } from '../FormContent'
import { useEffect, useState } from 'react'
import { useProofApi } from '../../hooks/useProofApi'

export function Form() {
  const [infoPresale, setInfoPresale] = useState({
    price: 0,
    ton_price: 0
  })
  const [maxAmount, setMaxAmount] = useState(null)
  const [currentAmount, setCurrentAmount] = useState(null)
  const ProofApi = useProofApi()

  useEffect(() => {
    async function fetchInfo () {
      const info = await ProofApi.getPresaleInfo()
      setMaxAmount(info.max_amount * info.price)
      setCurrentAmount(info.current_amount * info.price)
      setInfoPresale({ price: info.price, ton_price: info.ton_price}) 
    }
    fetchInfo()

    const subscribe = setInterval(() => {
      fetchInfo()
    }, 20000);

    return () => clearInterval(subscribe)
  }, [])

  return (
    <div className={styles.block}>
      <div className={styles.head}>
        <h3>собрано более ${currentAmount}</h3>
        <div className={styles.headLabel}>
          <span>текущий прогресс:</span>
          <span>макс <span className={styles.max}>{ maxAmount } usd</span></span>
        </div>
        <div className={styles.progress}>
          <span style={{ width: `${100 * (maxAmount / currentAmount)}%` }} />
        </div>
      </div>
      <img className={styles.el} src={el} alt="" />
      <div className={styles.fragment}>
        <img src={lines} alt="" />
        <span className={styles.price}>1 akron = ${infoPresale.price ? infoPresale.price : '...'}</span>
        <img src={lines} alt="" />
      </div>
      <FormContent available={maxAmount - currentAmount} price={infoPresale.price} tonPrice={infoPresale.ton_price} />
      <p className={styles.text}>для корректной работы с блокчейном реккомендуем использовать кошелек Tonkeeper</p>
    </div>
  )
}
