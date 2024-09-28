import styles from "./Button.module.scss"
import elLeft from "../../assets/icons/el-left.svg"
import elRight from "../../assets/icons/el-right.svg"
import { scrollToBlock } from "../../utils/main"

export function Button ({ text, clickHandler }) {
  return (
    <div className={styles.btn}>
      <img src={elLeft} alt="decoration" />
      <button onClick={(e) => clickHandler ? scrollToBlock(e) : {}} className="btn" type="button">{ text }</button>
      <img src={elRight} alt="decoration" />
    </div>
  )
}