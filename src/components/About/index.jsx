import styles from "./About.module.scss"
import akronImg from '../../assets/img/about/img.png'
import elImg from '../../assets/icons/sup-el.svg'
import { Button } from '../Button'
import { about } from "../../data"
import { useInView } from "react-intersection-observer"
import { useTranslation } from "react-i18next"

export function About () {
  const { t } = useTranslation()
  const { inView, ref} = useInView({
    threshold: .1,
    triggerOnce: true
  })

  return (
    <section ref={ref} id="about" className={`${styles.about} ${inView ? styles._animate : ''}`}>
      <div className="container">
      <div className={styles.info}>
        <div className={styles.content}>
          <h6 className="suptitle">about token</h6>
          <img className={styles.el} src={elImg} alt="element" />
          <h2 className="title">{t('about.title')}</h2>
          <div className={styles.text}>
            <p>{t('about.text.first')}</p>
            <div className={styles.title}>
              {t('about.paragraph')}
              <span />
            </div>
            <p>{t('about.text.second')}</p>
          </div>
        </div>
        <img className={styles.img} src={akronImg} alt="akron" />
      </div>
      <div className={styles.features}>
        <div className={styles.top}>
          {[...new Array(2)].map((_, i) => (
            <div 
              key={i} 
              className={styles.card} 
              style={{ 
                transition: `all .4s ease-in-out ${(i + 1) / 2 - .5}s`,
              }}
            >
              <img src={`/akronix-presale/about/${i + 1}.svg`} alt="icon" />
              <p>{ t(`about.cards.${i}`) }</p>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          {[...new Array(2)].map((_, i) => (
            <div 
              key={i} 
              className={styles.card} 
              style={{ 
                transition: `all .4s ease-in-out ${(i + 3) / 2 - .5}s`,
              }}
            >
              <img src={`/akronix-presale/about/${i + 3}.svg`} alt="icon" />
              <p>{ t(`about.cards.${i + 2}`) }</p>
            </div>
          ))}
        </div>
      </div>
      <Button text={t('button')} clickHandler />
      </div>
    </section>
  )
}