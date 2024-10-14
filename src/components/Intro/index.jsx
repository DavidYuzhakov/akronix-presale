import { Button } from '../Button'
import styles from './Intro.module.scss'
import { Parallax } from 'react-scroll-parallax'

import patternImg from '../../assets/img/pattern.png'
import logoImg from '../../assets/img/intro/img.png'

import tgIcon from '../../assets/icons/tg.svg'
import ytIcon from '../../assets/icons/yt.svg'
import xIcon from '../../assets/icons/x.svg'
import stonefiIcon from '../../assets/icons/stonefi.svg'
import dextoolIcon from '../../assets/icons/dextool.svg'
import coin1 from '../../assets/img/swap/coin-tl.png'
import coin2 from '../../assets/img/swap/coin-tr.png'
import coin3 from '../../assets/img/swap/coin-bl.png'
import coin4 from '../../assets/img/swap/coin-br.png'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'

export function Intro() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div
      ref={ref}
      className={`${styles.intro} ${inView ? styles._animate : ''}`}
    >
      <div className={styles.pattern}>
        <img src={patternImg} alt="" />
        <img src={patternImg} alt="" />
      </div>
      <div className={`container ${styles.container}`}>
        <img className={styles.logo} src={logoImg} alt="logo" />
        <div className={styles.content}>
          <h1>{t ('intro.title')}</h1>
          <Button text={t('button')} clickHandler />
          <div className={styles.social}>
            <a href='https://t.me/akronix_p2e'  target="_blank">
              <img src={tgIcon} alt="telegram" />
            </a>
            <a href='https://youtube.com/@akronix_legacy'  target="_blank">
              <img src={ytIcon} alt="youtube" />
            </a>
            <a href='https://x.com/akronix_p2e' target="_blank">
              <img src={xIcon}  alt="x" />
            </a>
            {/*<a href='https://x.com/akronix_p2e'>*/}
            {/*  <img src={dextoolIcon} alt="dextool" />*/}
            {/*</a>*/}
            {/*<a href='https://x.com/akronix_p2e'>*/}
            {/*  <img src={stonefiIcon} alt="stonefi" />*/}
            {/*</a>*/}
          </div>
        </div>
        <div className={styles.coins}>
          <Parallax easing={'easeInOut'} speed={-20} className={styles.tl}>
            <img src={coin1} alt="coin" />
          </Parallax>
          <Parallax easing={'easeInOut'} speed={-15} className={styles.tr}>
            <img src={coin2} alt="coin" />
          </Parallax>
          <Parallax easing={'easeInOut'} speed={-10} className={styles.bl}>
            <img src={coin3} alt="coin" />
          </Parallax>
          <Parallax easing={'easeInOut'} speed={-10} className={styles.br}>
            <img src={coin4} alt="coin" />
          </Parallax>
        </div>
      </div>
    </div>
  )
}
