import styles from './BuyTab.module.scss'
import usdt from '../../assets/img/swap/usdt.svg'
import ton from '../../assets/img/swap/ton.svg'
import { useForm } from '../../context/FormContext'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'

export function BuyTab () {
  const { t } = useTranslation()
  const { isAuth } = useAuth()
  const { updateAmount, balance, amount, setAmount, akron, currency, setCurrency } = useForm()

  return (
    <div className={styles.buy}>
      <fieldset>
        <legend className={'form-text'}>{t('swap.form.tabs.0.paragraph')}</legend>
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
          <span>{currency} {t('swap.form.tabs.0.inputAmount.label')}</span>
          <span>
            {t('swap.form.tabs.0.inputAmount.paragraph')} {balance[currency] ?? 0}
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
          <span>AKRON {t('swap.form.tabs.0.inputAkron.label')}</span>
          <button onClick={() => setAmount(balance[currency])} type="button">{t('swap.form.tabs.0.inputAkron.paragraph')}</button>
        </label>
        <input
          id="akron"
          readOnly
          value={akron}
          type='number'
        />
      </div>
      <button className={'btn'} type="submit">
        {isAuth ? t('swap.form.tabs.0.button.0') : t('swap.form.tabs.0.button.1')}
      </button>
    </div>
  )
}