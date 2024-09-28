import styles from "./About.module.scss"
import akronImg from '../../assets/img/about/img.png'
import elImg from '../../assets/icons/sup-el.svg'
import { Button } from '../Button'
import { about } from "../../data"
import { useInView } from "react-intersection-observer"

export function About () {
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
          <h2 className="title">AKRON — это основной токен платформы Akronix</h2>
          <div className={styles.text}>
            <p>Токен AKRON — это ключевой элемент криптовалютной игровой платформы Akronix на сети TON, обеспечивающий множество функций и возможностей и использующийся для всех внутренних транзакций на площадке.</p>
            <div className={styles.title}>
              платформа Akronix
              <span />
            </div>
            <p>Платформа предназначена для геймеров, разработчиков игр и инвесторов, обеспечивая интеграцию криптовалюты в игровую индустрию и создавая уникальные возможности для взаимодействия и монетизации.</p>
          </div>
        </div>
        <img className={styles.img} src={akronImg} alt="akron" />
      </div>
      <div className={styles.features}>
        <div className={styles.top}>
          {about.slice(0, 2).map(({ id, text }, i) => (
            <div 
              key={id} 
              className={styles.card} 
              style={{ 
                transition: `all .4s ease-in-out ${(i + 1) / 2 - .5}s`,
              }}
            >
              <img src={`/akronix-presale/about/${id}.svg`} alt="icon" />
              <p>{ text }</p>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          {about.slice(2).map(({ id, text }, i) => (
            <div 
              key={id} 
              className={styles.card}
              style={{ 
                transition: `all .4s ease-in-out ${(i + 3) / 2 - .5}s`,
              }}
            >
              <img src={`/akronix-presale/about/${id}.svg`} alt="icon" />
              <p>{ text }</p>
            </div>
          ))}
        </div>
      </div>
      <Button text={'купить akron'} clickHandler />
      </div>
    </section>
  )
}