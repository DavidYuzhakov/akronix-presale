import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from '@tonconnect/ui-react'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { gotoHandler, navHandler } from '../../utils/main'
import styles from './Header.module.scss'

import logoImg from '../../assets/img/header/logo.png'
import logoSmImg from '../../assets/img/header/logo-sm.svg'
import rusImg from '../../assets/img/langs/rus.png'
import engImg from '../../assets/img/langs/eng.png'
import arrowIcon from '../../assets/img/langs/arrow.svg'
import tgIcon from '../../assets/icons/tg.svg'
import ytIcon from '../../assets/icons/yt.svg'
import xIcon from '../../assets/icons/x.svg'
import check from '../../assets/icons/check.svg'
import logoutIcon from '../../assets/icons/logout.svg'

import { useAuth } from '../../context/AuthContext'
import { useProofApi } from '../../hooks/useProofApi'
import useTonConnect from '../../hooks/useTonConnect'

const list = [
  { name: 'rus', img: rusImg },
  { name: 'eng', img: engImg },
]

export function Header() {
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true,
  })
  const [tonConnectUI] = useTonConnectUI()
  const { isAuth, setIsAuth, logout } = useAuth()
  const userFriendlyAddress = useTonAddress()
  const tonAddress =
    userFriendlyAddress.slice(0, 4) + '...' + userFriendlyAddress.slice(-4)
  const TonConnect = useTonConnect()

  const [open, setOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [lang, setLang] = useState('eng')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [visible, setVisible] = useState(true)

  const [tonOptions, setTonOptions] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  function changeHandler(name) {
    if (lang === name) {
      return
    } else {
      setLang(name)
      setOpen(false)
    }
  }
  const handleScroll = () => {
    const header = document.querySelector('header')

    if (window.scrollY > lastScrollY) {
      setVisible(false)
    } else {
      setVisible(true)
    }

    if (window.innerWidth > 992) {
      if (window.scrollY > 1000) {
        header.style.position = 'fixed'
        header.style.top = '-100%'

        if (visible) {
          header.style.top = 0
        }
      } else {
        header.removeAttribute('style')
      }
    }

    setLastScrollY(scrollY)
  }

  function copyHandler() {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
    navigator.clipboard.writeText(userFriendlyAddress)
    setTonOptions(false)
  }

  async function disconnectHandler() {
    await tonConnectUI.disconnect()
    logout()
    setTonOptions(false)
  }

  function connectHandler() {
    if (!isAuth) {
      TonConnect.fetchGenPayload()
    } else {
      setTonOptions((prev) => !prev)
    }
  }

  useEffect(() => {
    if (isAuth) {
      TonConnect.fetchAuthUser()
    } else if (tonConnectUI.connected) {
      console.log('disconect #1')
      tonConnectUI.disconnect()
    }
  }, [isAuth])

  useEffect(() => {
    if (localStorage.getItem('token') && tonConnectUI.connected) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  })

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <div className={`${styles.overlay} ${isActive ? styles.active : ''}`} />
      <header
        ref={ref}
        className={`${styles.header} ${inView ? styles._animate : ''} ${
          visible ? styles.active : ''
        }`}
      >
        <div className="container">
          <div className={`${styles.wrapper} header-wrapper`}>
            <div className={styles.block}>
              <picture>
                <source srcSet={logoImg} media="(min-width: 992px)" />
                <img src={logoSmImg} alt="logo" />
              </picture>
              <div className={styles.langs}>
                <button onClick={() => setOpen((prev) => !prev)} type="button">
                  <img
                    width={20}
                    height={20}
                    src={lang === 'rus' ? rusImg : engImg}
                    alt=""
                  />
                  {lang}
                  <img
                    className={`${styles.arrow} ${open ? styles.opened : ''}`}
                    src={arrowIcon}
                    alt="arrow"
                  />
                </button>
                <ul className={open ? styles.active : ''}>
                  {list.map((item) => (
                    <li
                      key={item.name}
                      className={`${item.name === lang ? styles.active : ''}`}
                      onClick={() => changeHandler(item.name)}
                    >
                      <img
                        width={20}
                        height={20}
                        src={item.img}
                        alt={item.name}
                      />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <nav className={isActive ? styles.active : ''}>
              <ul>
                <li onClick={(e) => gotoHandler(e, 'about')}>
                  <a href="!#">о акрон коин</a>
                </li>
                <li onClick={(e) => gotoHandler(e, 'rounds')}>
                  <a href="!#">пресейл</a>
                </li>
                <li>
                  <a href="https://axiomabio.com/pdf/test.pdf">паппер</a>
                </li>
                <li>
                  <a href="https://akronix.io">о акроникс</a>
                </li>
              </ul>
              <div className={styles.social}>
                <a href="#!">
                  <img src={tgIcon} alt="telegram" />
                </a>
                <a href="#!">
                  <img src={ytIcon} alt="youtube" />
                </a>
                <a href="#!">
                  <img src={xIcon} alt="x social" />
                </a>
              </div>

              <button onClick={connectHandler} className={`${styles.btnMenu} btn`} type="button">
                {isAuth ? tonAddress : 'подключить кошелек'}
              </button>
              {isAuth && (
                <ul className={styles.tonOptionsMb}>
                  <li onClick={copyHandler}>
                    {isCopied ? (
                      <img width={20} height={20} src={check} alt="success" />
                    ) : (
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.5 15.5V3H5V0.5H20V15.5H17.5ZM0 5.5H15V20.5H0V5.5ZM2.5 8V18H12.5V8H2.5Z"
                          fill="#19C2EF"
                        />
                      </svg>
                    )}
                    <span>Copy address</span>
                  </li>
                  <li onClick={disconnectHandler}>
                    <svg
                      fill="#19C2EF"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384.971 384.971"
                      xmlSpace="preserve"
                    >
                      <path d="M180.455 360.91H24.061V24.061h156.394c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39.001 0 5.39 0 12.031V372.94c0 6.641 5.39 12.03 12.03 12.03h168.424c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.029-12.03z" />
                      <path d="m381.481 184.088-83.009-84.2a11.942 11.942 0 0 0-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46H96.279c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179a11.931 11.931 0 0 0 17.011 0l82.997-84.2c4.644-4.68 4.692-12.512.012-17.18z" />
                    </svg>
                    <span>disconnect</span>
                  </li>
                </ul>
              )}
            </nav>
            <div className={styles.tonOptions}>
              <button
                onClick={connectHandler}
                className={`${styles.button} btn`}
                type="button"
              >
                {isAuth ? tonAddress : 'подключить кошелек'}
              </button>
              {isAuth && (
                <ul
                  className={`${styles.options} ${
                    tonOptions ? styles.active : ''
                  }`}
                >
                  <li onClick={copyHandler}>
                    {isCopied ? (
                      <img width={20} height={20} src={check} alt="success" />
                    ) : (
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.5 15.5V3H5V0.5H20V15.5H17.5ZM0 5.5H15V20.5H0V5.5ZM2.5 8V18H12.5V8H2.5Z"
                          fill="#fff"
                        />
                      </svg>
                    )}

                    <span>Copy address</span>
                  </li>
                  <li onClick={disconnectHandler}>
                    <svg
                      fill="#fff"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384.971 384.971"
                      xmlSpace="preserve"
                    >
                      <path d="M180.455 360.91H24.061V24.061h156.394c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39.001 0 5.39 0 12.031V372.94c0 6.641 5.39 12.03 12.03 12.03h168.424c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.029-12.03z" />
                      <path d="m381.481 184.088-83.009-84.2a11.942 11.942 0 0 0-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46H96.279c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179a11.931 11.931 0 0 0 17.011 0l82.997-84.2c4.644-4.68 4.692-12.512.012-17.18z" />
                    </svg>
                    <span>disconnect</span>
                  </li>
                </ul>
              )}
            </div>

            <div className={styles.mobile}>
              <div className={`${styles.langs} ${styles.langsMobile}`}>
                <button onClick={() => setOpen((prev) => !prev)} type="button">
                  <img
                    width={20}
                    height={20}
                    src={lang === 'rus' ? rusImg : engImg}
                    alt=""
                  />
                  {lang}
                  <img
                    className={`${styles.arrow} ${open ? styles.opened : ''}`}
                    src={arrowIcon}
                    alt="arrow"
                  />
                </button>
                <ul className={open ? styles.active : ''}>
                  {list.map((item) => (
                    <li
                      key={item.name}
                      className={`${item.name === lang ? styles.active : ''}`}
                      onClick={() => changeHandler(item.name)}
                    >
                      <img
                        width={20}
                        height={20}
                        src={item.img}
                        alt={item.name}
                      />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => navHandler(isActive, setIsActive)}
                className={`${styles.burger} ${isActive ? styles.active : ''}`}
                type="button"
              >
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
