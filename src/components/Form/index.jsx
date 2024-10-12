import styles from './Form.module.scss'

import el from '../../assets/icons/sub-el.svg'
import lines from '../../assets/img/swap/lines-form.svg'
import { FormContent } from '../FormContent'
import { useEffect, useState } from 'react'
import { useProofApi } from '../../hooks/useProofApi'
import { useTranslation } from 'react-i18next'
import { useForm } from '../../context/FormContext'

export function Form() {
  const { t } = useTranslation()
  const { infoPresale } = useForm()
  const maxAmount = infoPresale?.max_amount * infoPresale?.price
  const currentAmount = infoPresale?.current_amount * infoPresale?.price

  return (
    <div className={styles.block} id="form">
      <div className={styles.head}>
        <h3>{t('swap.form.title.first')} {t('swap.form.title.second')} ${ parseFloat(currentAmount.toFixed(2))}</h3>
        <div className={styles.headLabel}>
          <span>{t('swap.form.progress.0')}</span>
          <span>{t('swap.form.progress.1')} <span className={styles.max}>{ Math.round(maxAmount) } usd</span></span>
        </div>
        <div className={styles.progress}>
          <span style={{ width: `${100 * ((currentAmount) / Math.round(maxAmount))}%` }} />
        </div>
      </div>
      <img className={styles.el} src={el} alt="" />
      <div className={styles.fragment}>
        <img src={lines} alt="" />
        <span className={styles.price}>1 akron = ${infoPresale?.price || '...'}</span>
        <img src={lines} alt="" />
      </div>
      <FormContent available={maxAmount - currentAmount} price={infoPresale?.price} tonPrice={infoPresale?.ton_price} />
      <p className={styles.text}>{t('swap.form.text')}</p>
    </div>
  )
}
