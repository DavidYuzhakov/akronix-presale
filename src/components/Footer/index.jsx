import styles from "./Footer.module.scss"
import bg from "../../assets/img/bg-footer.png"
import logo from "../../assets/img/logo-footer.png"
import el from "../../assets/icons/el.svg"
import { useInView } from "react-intersection-observer"
import { gotoHandler } from "../../utils/main"

export function Footer () {
  const {inView, ref} = useInView({
    threshold: .4,
    triggerOnce: true
  })

  return (
    <footer ref={ref} className={`${styles.footer} ${inView ? styles._animate : ''}`}>
      <img className={styles.bg} src={bg} alt="" />
      <div className="container">
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <nav className={styles.nav}>
          <ul>
            <li onClick={(e) => gotoHandler(e, 'about')}>
              <a href="">о AKRON COIN</a>
            </li>
            <li onClick={(e) => gotoHandler(e, 'rounds')}>
              <a href="">пресейл</a>
            </li>
            <li>
              <a href="https://axiomabio.com/pdf/test.pdf">White Paper</a>
            </li>
            <li>
              <a href="https://akronix.io">о Akronix</a>
            </li>
          </ul>
          <img src={el} alt="" />
        </nav>
        <div className={styles.copyright}>
        ©Copyright 2024 akronix. All Rights Reserved.
        <a href="">пользовательское соглашение</a>
        </div>
      </div>
    </footer>
  )
}