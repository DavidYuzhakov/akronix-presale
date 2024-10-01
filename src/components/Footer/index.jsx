import styles from "./Footer.module.scss"
import bg from "../../assets/img/bg-footer.png"
import logo from "../../assets/img/logo-footer.png"
import el from "../../assets/icons/el.svg"
import { useInView } from "react-intersection-observer"
import { gotoHandler } from "../../utils/main"
import { useTranslation } from "react-i18next"

export function Footer () {
  const { t } = useTranslation()
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
              <a href="">{t('navigation.0')}</a>
            </li>
            <li onClick={(e) => gotoHandler(e, 'rounds')}>
              <a href="">{t('navigation.1')}</a>
            </li>
            <li>
              <a href="https://axiomabio.com/pdf/test.pdf">{t('navigation.2')}</a>
            </li>
            <li>
              <a href="https://akronix.io">{t('navigation.3')}</a>
            </li>
          </ul>
          <img src={el} alt="" />
        </nav>
        <div className={styles.copyright}>
        ©Copyright 2024 akronix. All Rights Reserved.
        <a href="">{ t('footer.agreement')}</a>
        </div>
      </div>
    </footer>
  )
}