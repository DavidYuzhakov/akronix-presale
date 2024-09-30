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

export function FormContent({ available, price, tonPrice }) {
  const ProofApi = useProofApi()
  const TonConnect = useTonConnect()

  const { isAuth } = useAuth()
  const { showAlert } = useAlert()
  const { currency, amount, balance, setAkron, fetchGetBalance, fetchUserInfo } = useForm()

  const [activeTab, setActiveTab] = useState('buy')
  const [isSuccess, setIsSuccess] = useState(false)

  function buyHandler (cur, min, max) {
    if (amount < min || amount > max) {
      return showAlert(`Общее количество должно быть не менее ${min} ${cur} и не более ${max}`)
    }
    if (balance[cur] < amount) {
      return showAlert('Недостаточно средств, пополните баланс')
    }

    return cur === 'ton' ? amount * tonPrice : amount
  }

  async function submitHandler (e) {
    e.preventDefault()
    const type = e.target.dataset.type
    if (type === 'buy') {
      if (!isAuth) {
        await TonConnect.fetchGenPayload()
      } else {
        const limits = currency === 'ton' ? [0.5, 5000] : [5, 25000]
        const amountInUsd = buyHandler(currency, ...limits)
        if (available < amountInUsd) {
          return showAlert(`Максимальное кол-во токенов, которые вы можете купить - ${available}$, у вас ${amountInUsd}`)
        }

        if (amountInUsd) {
          const txFillInfo = await ProofApi.getTxFill({
            type: currency === 'ton' ? 1 : 2,
            amount: parseFloat(amount)
          })
          const { success } = await TonConnect.fetchSendTransaction(txFillInfo.receiver, txFillInfo.amount, txFillInfo.payload)
          if (success) {
            setIsSuccess(true)
            return showAlert('Транзакция успешно отправилась', 'success')
          } else {
            setIsSuccess(false)
            return showAlert('Неудалось совершить транзакцию, попробуйте позже')
          }
        }
      }
    } else if (type === 'partner') {
      if (userInfo.can_claim_ref_rewards) {
        const txFillInfo = await ProofApi.getTxFill({ type: 2000, amount: 0 })
        const { success } = await TonConnect.fetchSendTransaction(txFillInfo.receiver, txFillInfo.amount, txFillInfo.payload)
        if (success) {
          setIsSuccess(true)
          return showAlert('Клеим вознаграждения успешно выполнился', 'success')
        } else {
          setIsSuccess(false)
          return showAlert('Неудалось совершить клеим вознаграждения, попробуйте позже')
        }
      }
    } else if (type === 'nft') {
      const txFillInfo = await ProofApi.getTxFill({ 
        type: 2001, 
        amount: 0 
      })
      const { success } = await TonConnect.fetchSendTransaction(txFillInfo.receiver, txFillInfo.amount, txFillInfo.payload)
      if (success) {
        setIsSuccess(true)
        return showAlert('Клеим nft успешно выполнился', 'success')
      } else {
        setIsSuccess(false)
        return showAlert('Неудалось совершить клеим nft, попробуйте позже')
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
          купить
        </div>
        <div
          onClick={() => tabHandler('claim')}
          className={`${styles.tab} ${styles.claim} ${activeTab === 'claim' ? styles.active : ''}`}
        >
          CLAIM
        </div>
        <div
          onClick={() => tabHandler('partner')}
          className={`${styles.tab} ${styles.partner} ${activeTab === 'partner' ? styles.active : ''}`}
        >
          партнеры
        </div>
        <div
          onClick={() => tabHandler('nft')}
          className={`${styles.tab} ${styles.nft} ${activeTab === 'partner' ? styles.active : ''}`}
        >
          nft
        </div>
      </div>
      {activeTab === 'buy' && <BuyTab />}
      {activeTab === 'claim' && <ClaimTab />}
      {activeTab === 'partner' && <PartnerTab />}
      {activeTab === 'info' &&
        <div className={styles.information}>
          <p className={styles.text}>вы не подключили кошелек:</p>
          <button onClick={() => setActiveTab('buy')} className='btn' type='button'>подключить кошелек</button>
        </div>
      }
      {activeTab === 'nft' && <NftTab />}
    </form>
  )
}