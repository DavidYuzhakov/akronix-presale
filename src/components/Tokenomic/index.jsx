import styles from './Tokenomic.module.scss'
import img from '../../assets/img/tokenomic/img.png'
import icon from '../../assets/img/tokenomic/icon.svg'
import elImg from '../../assets/icons/sup-el.svg'
import { tokenomic } from '../../data'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'

export function Tokenomic () {
  const { t } = useTranslation()
  const { ref, inView } = useInView({
    threshold: .3,
    triggerOnce: true
  })

  return (
    <div className="container">
    <section ref={ref} className={`${styles.tokenomic} ${inView ? styles._animate : ''}`}>
      <img className={styles.img} src={img} alt="tokenomic" />
      <div className={styles.content}>
        <h6 className="suptitle">about token</h6>
        <img className={styles.el} src={elImg} alt="element" />
        <h2 className="title">{t('tokenomic.title')} <br />100 000 000 000</h2>
        <div className={styles.items}>
          {tokenomic.map(({ color, text }, i) => (
            <div 
              key={color} 
              className={styles.item}
              style={{
                transition: `all .4s ease-in-out ${(i + 1) / 2 - .5}s`
              }}
            >
              <div className={styles.leftEl}>
                <span style={{ 
                  background: color,
                  boxShadow: `0 0 10px ${color}`
                }}></span>
                <img src={icon} alt="" />
              </div>
              <div className={styles.info}>
                <h5>{ t(`tokenomic.items.${i}`) }</h5>
                <span>= 2 125 000 akron</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}
