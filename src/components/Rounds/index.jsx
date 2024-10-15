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
import { useForm } from "../../context/FormContext"
import { IS_CLOSED } from "../../App"

export function Rounds () {
  const { t } = useTranslation()
  const { infoPresale } = useForm()
  const started = infoPresale?.presale_started
  const {ref, inView} = useInView({
    threshold: .2,
    triggerOnce: true
  })

  const data = IS_CLOSED ? rounds.slice(3, 4) : rounds.slice(0, 3)

  return (
    <section id="rounds" ref={ref} className={`${styles.rounds} ${inView ? styles._animate : ''}`}>
      <img className={styles.bg} src={bgImg} alt="" />
      <div className="container">
        <h2 className="title">{t('rounds.title')}</h2>
        <img className={'subtitle-el'} src={elImg} alt="" />
        <div className={styles.cards}>
          {data.map((item, i) => {
            const [hide, setHide] = useState(i !== 0 && window.innerWidth <= 768)
            const isActive = started && infoPresale?.round_number === i + 1

            return (
            <div key={item.id} className={`${styles.card} ${hide ? styles.hide : ''}`}>
              <img className={styles.topEl} src={cardEl} alt="" />
              <img className={styles.bottomEl} src={cardEl} alt="" />

              <div className={styles.head}>
                <span 
                  style={{ 
                    background: isActive ? '#1BDD15' : '#E91F38',
                    boxShadow: `0 0 10px ${isActive ? '#1BDD15' : '#E91F38'}`
                  }} />
                <h4>{t('rounds.item.name')}{IS_CLOSED ? 1: item.id}</h4>
                <img className={styles.arrow} onClick={() => setHide(prev => !prev)} src={arrow} alt="arrow-down" />
              </div>
              <div className={styles.content}>

              <div className={styles.token}>
                <img src={lines} alt="" />
                <span>{t('rounds.item.paragraph')} {IS_CLOSED ? 20: item.precent}%</span>
                <img src={lines} alt="" />
              </div>
              <div className={styles.line} />
              <div className={styles.deadline}>
                <p>{t('rounds.item.deadline')}</p>
                <div>{ item.deadline }</div>
              </div>
              <div className={styles.block}>
                <button onClick={(e) => isActive ? scrollToBlock(e) : {}} type="button" className={`btn ${styles.btn} ${isActive ? '' : styles.opacity}`}>
                  {isActive ? t('rounds.item.button') : 'coming soon'}
                </button>
                <p>{IS_CLOSED ? t('rounds.item.closedText') : t('rounds.item.text')}</p>
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