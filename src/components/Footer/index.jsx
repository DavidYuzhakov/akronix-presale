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

  function handleScrollTo(e, id) {
    e.preventDefault()

    const block = document.getElementById(id)
    if (block) {
      window.scrollTo({
        top: block.getBoundingClientRect().top + window.scrollY - document.querySelector('header').offsetHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer ref={ref} className={`${styles.footer} ${inView ? styles._animate : ''}`}>
      <img className={styles.bg} src={bg} alt="" />
      <div className="container">
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <nav className={styles.nav}>
          <ul>
            <li onClick={(e) => handleScrollTo(e, 'about')}>
              <a href="#">{t('navigation.0')}</a>
            </li>
            <li onClick={(e) => handleScrollTo(e, 'rounds')}>
              <a href="#">{t('navigation.1')}</a>
            </li>
            <li>
              <a href={t('whitepaper')} target={"_blank"}>{t('navigation.2')}</a>
            </li>
            <li>
              <a href="https://akronix.io" target={"_blank"}>{t('navigation.3')}</a>
            </li>
          </ul>
          <img src={el} alt="" />
        </nav>
        <div className={styles.copyright}>
        ©Copyright 2024 akronix. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}