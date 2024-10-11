import styles from "./Swap.module.scss"
import elImg from "../../assets/icons/sub-el.svg"
import bgImg from "../../assets/img/swap/bg.png"
import icon from "../../assets/img/swap/info.svg"
import patternBg from "../../assets/img/pattern.png"
import linesBg from "../../assets/img/swap/lines.svg"
import elTimer from "../../assets/img/swap/el.svg"
import coin1 from "../../assets/img/swap/coin-tl.png"
import coin2 from "../../assets/img/swap/coin-tr.png"
import coin3 from "../../assets/img/swap/coin-bl.png"
import coin4 from "../../assets/img/swap/coin-br.png"


import { Timer } from "../Timer"
import { Form } from "../Form"
import { Charts } from "../Charts"
import { Parallax } from "react-scroll-parallax"
import { useInView } from "react-intersection-observer"
import { useTranslation } from "react-i18next"
import { useForm } from "../../context/FormContext"

export function Swap () {
  const { infoPresale } = useForm()
  const date = new Date(infoPresale?.remain_time)
  const started = infoPresale?.presale_started

  const { t } = useTranslation()
  const {inView, ref} = useInView({
    threshold: .2,
    triggerOnce: true
  })

  return (
    <section id="swap" ref={ref} className={`${styles.swap} ${inView ? styles._animate : ''}`}>
      <img className={styles.bg} src={bgImg} alt="" />
      <div className={`container`}>     
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <img src={icon} alt="icon info" />
            <span>{t('swap.info.0')}</span>
          </div>
          <div className={styles.infoItem}>
            <img src={icon} alt="icon info" />
            <span>{t('swap.info.1')}</span>
          </div>
        </div>
        <div className={styles.container}>
        <h2 className="title">{t('swap.title')}</h2>
        <img className={'subtitle-el'} src={elImg} alt="" />
        <div className={styles.timer}>
          <div className={styles.elLeft}>
              <img height={100} src={elTimer} alt="" />
              <img src={elTimer} alt="" />
            </div>
          <Timer targetTime={date} />
          <div className={styles.elRight}>
            <img height={100} src={elTimer} alt="" />
            <img src={elTimer} alt="" />
          </div>
          <img className={styles.pattern} src={patternBg} alt="" />
          <img className={styles.timerLines} src={linesBg} alt="" />
        </div>
        <p className={styles.timerText}>{started === true ? t('swap.timer.paragraph') : t('swap.timer.paragraph_start')}</p>
        <div className={styles.coins}>
          <Parallax easing={"easeInOut"} speed={-10} className={styles.tl}>
            <img src={coin1} alt="coin" />
          </Parallax>
          <Parallax easing={"easeInOut"} speed={-15} className={styles.tr}>
            <img  src={coin2} alt="coin" />
          </Parallax>
          <Parallax easing={"easeInOut"} speed={-10} className={styles.bl}>
            <img src={coin3} alt="coin" />
          </Parallax>
          <Parallax easing={"easeInOut"} speed={-20} className={styles.br}>
            <img src={coin4} alt="coin" />
          </Parallax>
        </div>
        </div>
        <div className={styles.blocks}>
          <Charts />
          <Form />
        </div>
      </div>
    </section>
  )
}