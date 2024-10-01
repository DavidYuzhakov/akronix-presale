import styles from "./Rounds.module.scss"

import elImg from "../../assets/icons/sub-el.svg"
import arrow from "../../assets/icons/arrow.svg"
import cardEl from "../../assets/icons/banner-el.svg"
import bgImg from "../../assets/img/bg-rounds.png"
import lines from "../../assets/icons/lines-card.svg"

import { rounds } from "../../data"
import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { scrollToBlock } from "../../utils/main"
import { useTranslation } from "react-i18next"

export function Rounds () {
  const { t } = useTranslation()
  const {ref, inView} = useInView({
    threshold: .2,
    triggerOnce: true
  })

  return (
    <section id="rounds" ref={ref} className={`${styles.rounds} ${inView ? styles._animate : ''}`}>
      <img className={styles.bg} src={bgImg} alt="" />
      <div className="container">
        <h2 className="title">{t('rounds.title')}</h2>
        <img className={'subtitle-el'} src={elImg} alt="" />
        <div className={styles.cards}>
          {rounds.map((item, i) => {
            const [hide, setHide] = useState(i !== 0 && window.innerWidth <= 768)

            return (
            <div key={item.id} className={`${styles.card} ${hide ? styles.hide : ''}`}>
              <img className={styles.topEl} src={cardEl} alt="" />
              <img className={styles.bottomEl} src={cardEl} alt="" />

              <div className={styles.head}>
                <span 
                  style={{ 
                    background: item.active ? '#1BDD15' : '#E91F38',
                    boxShadow: `0 0 10px ${item.active ? '#1BDD15' : '#E91F38'}`
                  }} />
                <h4>{t('rounds.item.name')}{item.id}</h4>
                <img className={styles.arrow} onClick={() => setHide(prev => !prev)} src={arrow} alt="arrow-down" />
              </div>
              <div className={styles.content}>

              <div className={styles.token}>
                <img src={lines} alt="" />
                <span>{t('rounds.item.paragraph')} {item.precent}%</span>
                <img src={lines} alt="" />
              </div>
              <div className={styles.line} />
              <div className={styles.deadline}>
                <p>{t('rounds.item.deadline')}</p>
                <div>{ item.deadline }</div>
              </div>
              <div className={styles.block}>
                <button onClick={(e) => item.active ? scrollToBlock(e) : {}} type="button" className={`btn ${styles.btn} ${item.active ? '' : styles.opacity}`}>
                  {item.active ? t('rounds.item.button') : 'coming soon'}
                </button>
                <p>{t('rounds.item.text')}</p>
              </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}