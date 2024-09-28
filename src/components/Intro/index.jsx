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

export function Intro() {
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
          <h1>пресейл токена открыт!</h1>
          <Button text={'купить akron'} clickHandler />
          <div className={styles.social}>
            <img src={tgIcon} alt="telegram" />
            <img src={ytIcon} alt="youtube" />
            <img src={xIcon} alt="x" />
            <img src={dextoolIcon} alt="dextool" />
            <img src={stonefiIcon} alt="stonefi" />
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
