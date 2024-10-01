import styles from "./Article.module.scss"
import elImg from "../../assets/icons/banner-el.svg"
import tgIcon from "../../assets/icons/tg.svg"
import ytIcon from "../../assets/icons/yt.svg"
import xIcon from "../../assets/icons/x.svg"
import { useInView } from "react-intersection-observer"
import { useTranslation } from "react-i18next"

export function Article () {
  const { t } = useTranslation()
  const {inView, ref} = useInView({
    threshold: 1,
    triggerOnce: true
  })

  return (
    <div className="container">
    <article ref={ref} className={`${styles.article} ${inView ? styles._animate : ''}`}>
      <div>
        <h2 className={styles.title}>{t('article.title.first')}<br /> {t('article.title.second')}</h2>
      </div>
      <div className={styles.social}>
        <a href=""><img src={tgIcon} alt="telegram" /></a>
        <a href=""><img src={ytIcon} alt="youtube" /></a>
        <a href=""><img src={xIcon} alt="x" /></a>
      </div>

      <img className="el el-tl" src={elImg} alt="" />
      <img className="el el-tr" src={elImg} alt="" />
      <img className="el el-bl" src={elImg} alt="" />
      <img className="el el-br" src={elImg} alt="" />
    </article>
    </div>

  )
}