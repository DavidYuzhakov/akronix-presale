import { useEffect, useState } from 'react'
import styles from './FormContent.module.scss'

import { useAuth } from '../../context/AuthContext'
import { useAlert } from '../../context/AlertContext'

import { useProofApi } from '../../hooks/useProofApi'
import useTonConnect from '../../hooks/useTonConnect'
import { BuyTab } from '../BuyTab'
import { useForm } from '../../context/FormContext'
import { ClaimTab } from '../ClaimTab'
import { PartnerTab } from '../PartnerTab'
import { NftTab } from '../NftTab'
import { useTranslation } from 'react-i18next'
import { IS_CLOSED } from '../../App'

export function FormContent({ available, price, tonPrice }) {
  const ProofApi = useProofApi()
  const TonConnect = useTonConnect()
  
  const { t } = useTranslation()
  const { isAuth } = useAuth()
  const { showAlert } = useAlert()
  const { currency, amount, balance, setAkron, fetchGetBalance, fetchUserInfo, userInfo, infoPresale } = useForm()

  const [activeTab, setActiveTab] = useState('buy')
  const [isSuccess, setIsSuccess] = useState(false)

  function buyHandler (cur, min, max) {
    if (amount < min || amount > max) {
      return showAlert(t('alert.buy.handler.0'))
    }
    if (balance[cur] < amount) {
      return showAlert(t('alert.buy.handler.0'))
    }

    return cur === 'ton' ? amount * tonPrice : amount
  }

  async function submitHandler (e) {
    e.preventDefault()
    const type = e.target.dataset.type
    if (type === 'buy') {
      if(infoPresale.presale_started === false)
        return;
      if (!isAuth) {
        await TonConnect.fetchGenPayload()
      } else {
        const limits = IS_CLOSED ? (currency === 'ton' ? [5000, 25000] : [25000, 125000]) : (currency === 'ton' ? [1, 5000] : [5, 25000])
        const amountInUsd = buyHandler(currency, ...limits)
        if (available < amountInUsd) {
          return showAlert(t('alert.buy.availabel'))
        }

        if (amountInUsd) {
          const txFillInfo = await ProofApi.getTxFill({
            type: currency === 'ton' ? (IS_CLOSED ? 3 : 1) : (IS_CLOSED ? 4 : 2),
            amount: parseFloat(amount),
            closed: IS_CLOSED
          })

          if(txFillInfo.code === 1)
          {
            setIsSuccess(false)
            return showAlert(t('alert.buy.availabel'))
          }
          else if(txFillInfo.code === 2)
          {
            setIsSuccess(false)
            return showAlert(t('alert.buy.stageFull'))
          }

          const { success } = await TonConnect.fetchSendTransaction(txFillInfo.receiver, txFillInfo.amount, txFillInfo.payload)
          if (success) {
            setIsSuccess(true)
            return showAlert(t('alert.buy.success'), 'success')
          } else {
            setIsSuccess(false)
            return showAlert(t('alert.buy.error'))
          }
        }
      }
    } else if (type === 'partner') {
      if (userInfo.can_claim_ref_rewards)
      {
        const txFillInfo = await ProofApi.getTxFill({ type: 2000, amount: 0 })
        const { success } = await TonConnect.fetchSendTransaction(txFillInfo.receiver, txFillInfo.amount, txFillInfo.payload)
        if (success) {
          setIsSuccess(true)
          return showAlert(t('alert.partner.success'), 'success')
        } else {
          setIsSuccess(false)
          return showAlert(t('alert.partner.error'))
        }
      }
    } else if (type === 'nft') {
      if (userInfo.can_claim_nft === true) {
        const txFillInfo = await ProofApi.getTxFill({ 
          type: 2001, 
          amount: 0 
        })
        const { success } = await TonConnect.fetchSendTransaction(txFillInfo.receiver, txFillInfo.amount, txFillInfo.payload)
        if (success) {
          setIsSuccess(true)
          return showAlert(t('alert.nft.success'), 'success')
        } else {
          setIsSuccess(false)
          return showAlert(t('alert.nft.error'))
        }
      }
    } else if(type === 'claim')
    {
      if (userInfo.can_claim_tge > 0) {
        const txFillInfo = await ProofApi.getTxFill({
          type: 2002,
          amount: 0
        })
        const { success } = await TonConnect.fetchSendTransaction(txFillInfo.receiver, txFillInfo.amount, txFillInfo.payload)
        if (success) {
          setIsSuccess(true)
          return showAlert(t('alert.nft.success'), 'success')
        } else {
          setIsSuccess(false)
          return showAlert(t('alert.nft.error'))
        }
      }
    }
  }

  function tabHandler (newTab) {
    if (!isAuth) {
      setActiveTab('info')
    } else {
      setActiveTab(newTab)
    }
  }

  useEffect(() => {
    setAkron(((amount * (currency === 'usdt' ? 1 : tonPrice)) / price).toFixed(2))
  }, [currency, amount, price])

  useEffect(() => {
    if (isAuth) {
      fetchGetBalance()
      fetchUserInfo()
    }
  }, [isAuth, isSuccess])


  return (
    <form data-type={activeTab} onSubmit={submitHandler}>
      <div className={styles.tabs}>
        <div
          onClick={() => setActiveTab('buy')}
          className={`${styles.tab} ${styles.buy} ${activeTab === 'buy' ? styles.active : ''}`}
        >
          {t('swap.form.tabs.0.tab')}
        </div>
        <div
          onClick={() => tabHandler('claim')}
          className={`${styles.tab} ${styles.claim} ${activeTab === 'claim' ? styles.active : ''}`}
        >
          {t('swap.form.tabs.1.tab')}
        </div>
        <div
          onClick={() => tabHandler('partner')}
          className={`${styles.tab} ${styles.partner} ${activeTab === 'partner' ? styles.active : ''}`}
        >
          {t('swap.form.tabs.2.tab')}
        </div>
        <div
          onClick={() => tabHandler('nft')}
          className={`${styles.tab} ${styles.nft} ${activeTab === 'partner' ? styles.active : ''}`}
        >
          {t('swap.form.tabs.3.tab')}
        </div>
      </div>
      {activeTab === 'buy' && <BuyTab />}
      {activeTab === 'claim' && <ClaimTab />}
      {activeTab === 'partner' && <PartnerTab />}
      {activeTab === 'info' &&
        <div className={styles.information}>
          <p className={styles.text}>{ t('swap.form.tabs.4.text') }</p>
          <button onClick={() => setActiveTab('buy')} className='btn' type='button'>{ t('swap.form.tabs.4.button') }</button>
        </div>
      }
      {activeTab === 'nft' && <NftTab />}
    </form>
  )
}