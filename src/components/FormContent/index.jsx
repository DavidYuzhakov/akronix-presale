import { useEffect, useRef, useState } from 'react'
import styles from './FormContent.module.scss'

import ton from '../../assets/img/swap/ton.svg'
import usdt from '../../assets/img/swap/usdt.svg'
import copy from '../../assets/icons/copy.svg'
import copied from '../../assets/icons/check.svg'
import notPassed from '../../assets/img/nft/item.svg'
import passed from '../../assets/icons/check.svg'
import arrow from '../../assets/img/nft/arrow.svg'

import { nft } from '../../data'

import { useAuth } from '../../context/AuthContext'
import { useAlert } from '../../context/AlertContext'

import { useProofApi } from '../../hooks/useProofApi'
import useTonConnect from '../../hooks/useTonConnect'

export function FormContent({ available, price, tonPrice }) {
  const ProofApi = useProofApi()
  const TonConnect = useTonConnect()

  const myScore = 750

  const { isAuth } = useAuth()
  const { showAlert } = useAlert()

  const [activeTab, setActiveTab] = useState('buy')
  const [currency, setCurrency] = useState('usdt')

  const [amount, setAmount] = useState(0)
  const [akron, setAkron] = useState(0)
  const [balance, setBalance] = useState(0)

  const [userInfo, setUserInfo] = useState({})

  const [isUsdt, setIsUsdt] = useState(false)
  const [isCopied, setIsCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)

  function changeHandler(e) {
    const value = e.target.value
    if (value < 0) return
    setAmount(value)  
  }

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

  function copyHandler () {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
    navigator.clipboard.writeText(reference)
  }

  function tabHandler (newTab) {
    if (!isAuth) {
      setActiveTab('info')
    } else {
      setActiveTab(newTab)
    }
  }

  useEffect(() => {
    setAkron(((amount * (currency === 'usdt' ? 1 : tonPrice)) / price).toFixed(4))
  }, [currency, amount, price])

  useEffect(() => {
    if (isAuth) {
      async function fetchUserInfo () {
        const info = await ProofApi.getUserInfo()
        setUserInfo(info)
      }
      async function fetchGetBalance () {
        const balance = await ProofApi.getBalance()
        setBalance(balance)
      }
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
          Партнерка
        </div>
        <div
          onClick={() => tabHandler('nft')}
          className={`${styles.tab} ${styles.nft} ${activeTab === 'partner' ? styles.active : ''}`}
        >
          nft
        </div>
      </div>
      {activeTab === 'buy' &&
        <div className={styles.buy}>
          <fieldset>
            <legend className={styles.text}>Выберите валюту обмена:</legend>
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
          <div className={styles.inputField}>
            <label htmlFor="amount">
              <span>{currency} вы платите:</span>
              <span>
                БАЛАНС: {balance[currency]}
              </span>
            </label>
            <input
              id="amount"
              value={amount}
              type="number"
              onChange={changeHandler}
            />
          </div>
          <div className={styles.inputField}>
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
      }
      {activeTab === 'claim' &&
        <div className={styles.claim}>
          <p className={styles.text}>всего вы получите</p>
          <h3>12345.67 akron</h3>
          <ul className={styles.list}>
            <li>
              <div>
                <span>Объем разлока:</span>
                <span>125 дней</span>
              </div>
            </li>
            <li>
              <div>
                <span>До разлока:</span>
                <span>12:55:34:12</span>
              </div>
            </li>
            <li>
              <div>
                <span>Ежемесячный разлок:</span>
                <span>4567 AKRON</span>
              </div>
            </li>
            <li>
              <div>
                <span>всего разлочено:</span>
                <span>482398.43 akron</span>
              </div>
            </li>
          </ul>
          <button className='btn' type="submit">claim akron</button>
        </div>
      }
      {activeTab === 'partner' &&
        <div className={styles.partner}>
          <p className={styles.text}>ваша партнерская ссылка:</p>
          <div className={`${styles.inputField} ${styles.field}`}>
            <input
              value={userInfo?.invite_link}
              type="text"
              disabled
            />
            <img onClick={copyHandler} src={isCopied ? copied : copy} alt="copy" />
          </div>
          <ul className={styles.list}>
            <li>
              <div>
                <span>Ваших партнеров:</span>
                <span>{ userInfo.refs_count }</span>
              </div>
            </li>
            <li>
              <div>
                <span>Партнеры инвестировали:</span>
                <span>${ userInfo?.refs_invested }</span>
              </div>
            </li>
          </ul>
          <div className={styles.info}>
            <div className={styles.card}>
              <h5>вы заработали:</h5>
              <p>{ userInfo.user_info.total_tons_earned } ton</p>
              <p>{ userInfo.user_info.total_usdt_earned } usdt</p>
            </div>
            <div className={styles.card}>
              <h5>доступно для клейма:</h5>
              <p>{ userInfo.user_info.available_tons } ton</p>
              <p>{ userInfo.user_info.available_tons } usdt</p>
            </div>
          </div>
          <button className='btn' type="submit">claim rewards</button>
        </div>
      }
      {activeTab === 'info' &&
        <div className={styles.information}>
          <p className={styles.text}>вы не подключили кошелек:</p>
          <button onClick={() => setActiveTab('buy')} className='btn' type='button'>подключить кошелек</button>
        </div>
      }
      {activeTab === 'nft' && 
        <div className={styles.nft}>
          <div className={styles.nftTop}>
            <legend>ваш прогресс бонусных NFT:</legend>
            <div className={styles.switch}>
              <label className={isUsdt ? styles.active : ''}>
                <img src={usdt} alt="usdt" />
                usdt
              </label>
              <label className={styles.switcher}>
                <input checked={isUsdt} type="checkbox" onChange={() => setIsUsdt(prev => !prev)} />
                <span className={isUsdt ? styles.left : ''} />
              </label>
              <label className={!isUsdt ? styles.active : ''}>
                <img src={ton} alt="ton" />
                ton
              </label>
            </div>
          </div>
          <div className={styles.nftContent}>
            <div className={styles.progressBar}>
              {[...new Array(82)].map((_, i) => (
                <span key={i} className={(i + 1) <= 45 ? styles.fill : ''} />
              ))}
            </div>
            {nft.map(card => (
              <div key={card.id} className={styles.nftCard}>
                <img src={arrow} alt="arrow" />
                <div className={styles.content}>
                  <div className={styles.score}>
                    { card.score }
                  </div>
                  <div className={styles.el}>
                    <img src={myScore > card.score ? passed : notPassed} alt="" />
                  </div>
                  <img className={styles.char} src={`/akronix-presale/nft/${card.id}.png`} alt="character" />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.info}>
            <div className={styles.card}>
              <h5>вы инвестировали:</h5>
              <p>
                { isUsdt ? userInfo.user_info.amount_usdt : userInfo.user_info.amount_tons } { isUsdt ? 'usdt' : 'ton'}
              </p>
            </div>
            <div className={styles.card}>
              <h5>до след. NFT:</h5>
              <p>760.56 { isUsdt ? 'usdt' : 'ton'}</p>
            </div>
          </div>
          <button className='btn' type='submit'>
            claim nft
          </button>
        </div>
      }
    </form>
  )
}