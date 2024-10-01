import styles from './PartnerTab.module.scss'
import { useForm } from '../../context/FormContext'
import copy from '../../assets/icons/copy.svg'
import copied from '../../assets/icons/check.svg'
import { useTranslation } from 'react-i18next'

export function PartnerTab() {
  const { t } = useTranslation()
  const { userInfo, copyHandler, isCopied } = useForm()

  return (
    <div className={styles.partner}>
      <p className={'form-text'}>{t('swap.form.tabs.2.paragraph')}</p>
      <div className={`inputField ${styles.field}`}>
        <input value={userInfo?.invite_link} type="text" disabled />
        <img onClick={copyHandler} src={isCopied ? copied : copy} alt="copy" />
      </div>
      <ul className={'list'}>
        <li>
          <div>
            <span>{t('swap.form.tabs.2.list.0.type')}</span>
            <span>{userInfo.refs_count}</span>
          </div>
        </li>
        <li>
          <div>
            <span>{t('swap.form.tabs.2.list.1.type')}</span>
            <span>${userInfo?.refs_invested}</span>
          </div>
        </li>
      </ul>
      <div className={'info'}>
        <div className={'card'}>
          <h5>{t('swap.form.tabs.2.cards.0.title')}</h5>
          <p>{userInfo.user_info.total_tons_earned} ton</p>
          <p>{userInfo.user_info.total_usdt_earned} usdt</p>
        </div>
        <div className={'card'}>
          <h5>{t('swap.form.tabs.2.cards.1.title')}</h5>
          <p>{userInfo.user_info.available_tons} ton</p>
          <p>{userInfo.user_info.available_tons} usdt</p>
        </div>
      </div>
      <button className="btn" type="submit">
        claim rewards
      </button>
    </div>
  )
}
