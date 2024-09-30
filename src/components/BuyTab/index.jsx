import styles from './BuyTab.module.scss'
import usdt from '../../assets/img/swap/usdt.svg'
import ton from '../../assets/img/swap/ton.svg'
import { useForm } from '../../context/FormContext'
import { useAuth } from '../../context/AuthContext'

export function BuyTab () {
  const { isAuth } = useAuth()
  const { updateAmount, balance, amount, setAmount, akron, currency, setCurrency } = useForm()

  return (
    <div className={styles.buy}>
      <fieldset>
        <legend className={'form-text'}>Выберите валюту обмена:</legend>
        <label
          className={`${styles.currency} ${
            currency === 'usdt' ? styles.active : ''
          }`}
          htmlFor="usdt"
        >
          <input type="radio" id="usdt" onClick={() => setCurrency('usdt')} />
          <img src={usdt} alt="usdt" />
          <span>USDT</span>
        </label>
        <label
          className={`${styles.currency} ${
            currency === 'ton' ? styles.active : ''
          }`}
          htmlFor="ton"
        >
          <input type="radio" id="ton" onClick={() => setCurrency('ton')} />
          <img src={ton} alt="usdt" />
          <span>ton</span>
        </label>
      </fieldset>
      <div className={'inputField'}>
        <label htmlFor="amount">
          <span>{currency} вы платите:</span>
          <span>
            БАЛАНС: {balance[currency] ?? 0}
          </span>
        </label>
        <input
          id="amount"
          value={amount}
          type="number"
          onChange={updateAmount}
        />
      </div>
      <div className={'inputField'}>
        <label htmlFor="akron">
          <span>AKRON вы получаете:</span>
          <button onClick={() => setAmount(balance[currency])} type="button">макс.</button>
        </label>
        <input
          id="akron"
          readOnly
          value={akron}
          type='number'
        />
      </div>
      <button className={'btn'} type="submit">
        {isAuth ? 'Купить' : 'Подключить кошелек'}
      </button>
    </div>
  )
}