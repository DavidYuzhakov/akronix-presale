import bg from "../assets/img/bg.jpg"

export function LayoutBg () {
  return (
    <div className="bg">
      {[...new Array(38)].map((item, i) => <img key={i} src={bg} alt="" />)}
    </div>
  )
}

