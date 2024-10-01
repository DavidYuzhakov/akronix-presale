import { useInView } from "react-intersection-observer"

import styles from "./Bonus.module.scss"
import { bonus } from "../../data"

import elImg from "../../assets/icons/sub-el.svg"
import ton from '../../assets/img/swap/ton.svg';
import usdt from '../../assets/img/swap/usdt.svg';
import { gotoHandler, scrollToBlock } from "../../utils/main";
import { useTranslation } from "react-i18next";

export function Bonus () {
  const { t } = useTranslation() 
  const {ref, inView} = useInView({
    threshold: .1,
    triggerOnce: true
  })

  return (
    <section ref={ref} className={`${styles.bonus} ${inView ? styles._animate : ''}`}>
      <div className="container">
        <h2 className="title">{t('bonus.title')}</h2>
        <img className={'subtitle-el'} src={elImg} alt="" />
        <div className={styles.cards}>
          {bonus.map((item, i) => (
            <div 
              key={item.id} 
              className={styles.card}
              style={{
                transition: `all .4s ease-in-out ${(i + 1) / 2 - .5}s`
              }}
            >
              <div className={styles.pattern} />
              <div
                style={{ background: `linear-gradient(to bottom, ${item.color}, transparent)`}} 
                className={styles.gradient} 
              />
              <div style={{ 
                backgroundImage: `url(/akronix-presale/bonus/${item.id}.png)`,
              }} className={styles.img}>
                <span style={{ boxShadow: `0 0 70px 0 ${item.color}` }} />
              </div>
              <span>{t('bonus.suptitle')}</span>
              <h4>{ item.title }</h4>
              <p>{t('bonus.text')}</p>
              <div className={styles.currency}>
                <div className={styles.buy}>
                  <img src={ton} alt="ton" />
                  {item.ton}
                </div>
                <div className={styles.buy}>
                  <img src={usdt} alt="usdt" />
                  {item.usdt}
                </div>
              </div>
              <button onClick={(e) => scrollToBlock(e, 'form')} className={`btn`} type="button">
                {t('bonus.button')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}