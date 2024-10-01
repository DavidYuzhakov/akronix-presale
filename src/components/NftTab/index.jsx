import { useState } from 'react'
import styles from './NftTab.module.scss'

import ton from '../../assets/img/swap/ton.svg'
import usdt from '../../assets/img/swap/usdt.svg'
import notPassed from '../../assets/img/nft/item.svg'
import passed from '../../assets/icons/check.svg'
import arrow from '../../assets/img/nft/arrow.svg'

import { nft } from '../../data'
import { ProgressBar } from '../ProgressBar'
import { useForm } from '../../context/FormContext'
import { useTranslation } from 'react-i18next'

export function NftTab() {
  const { t } = useTranslation()
  const [isUsdt, setIsUsdt] = useState(false)
  const { userInfo } = useForm()

  return (
    <div className={styles.nft}>
      <div className={styles.nftTop}>
        <legend>{ t('swap.form.tabs.3.paragraph') }</legend>
        <div className={styles.switch}>
          <label className={isUsdt ? styles.active : ''}>
            <img src={usdt} alt="usdt" />
            usdt
          </label>
          <label className={styles.switcher}>
            <input
              checked={isUsdt}
              type="checkbox"
              onChange={() => setIsUsdt((prev) => !prev)}
            />
            <span className={isUsdt ? styles.left : ''} />
          </label>
          <label className={!isUsdt ? styles.active : ''}>
            <img src={ton} alt="ton" />
            ton
          </label>
        </div>
      </div>
      <div className={styles.nftContent}>
        <ProgressBar
          segments={
            isUsdt
              ? userInfo.nft_info.usdt_segments
              : userInfo.nft_info.ton_segments
          }
        />
        {nft.map((card, i) => (
          <div key={card.id} className={styles.nftCard}>
            <img src={arrow} alt="arrow" />
            <div className={styles.content}>
              <div className={styles.score}>
                {isUsdt ? card.score.usdt : card.score.ton}
              </div>
              <div className={styles.el}>
                <img
                  src={userInfo.nft_info.claimed_nfts[i] ? passed : notPassed}
                  alt=""
                />
              </div>
              <img
                className={styles.char}
                src={`/akronix-presale/nft/${card.id}.png`}
                alt="character"
              />
            </div>
          </div>
        ))}
      </div>
      <div className={'info'}>
        <div className={'card'}>
          <h5>{ t('swap.form.tabs.3.cards.0.title') }</h5>
          <p>
            {isUsdt
              ? userInfo.user_info.amount_usdt
              : userInfo.user_info.amount_tons}{' '}
            {isUsdt ? 'usdt' : 'ton'}
          </p>
        </div>
        <div className={'card'}>
          <h5>{ t('swap.form.tabs.3.cards.1.title') }</h5>
          <p>
            {isUsdt
              ? `${userInfo.nft_info.remaining_usdt} usdt`
              : `${userInfo.nft_info.remaining_ton} ton`}
          </p>
        </div>
      </div>
      <button className="btn" type="submit">
        claim nft
      </button>
    </div>
  )
}
