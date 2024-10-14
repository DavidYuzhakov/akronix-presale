import { ParallaxProvider } from 'react-scroll-parallax'

import {
  About,
  Article,
  Bonus,
  Footer,
  Header,
  Intro,
  LayoutBg,
  Rounds,
  Swap,
  Tokenomic,
} from '../components'

import { useAlert } from '../context/AlertContext'
import checkIcon from '../assets/icons/check.svg'
import errorIcon from '../assets/icons/error.svg'

export function AppLayout () {
  const { error, type } = useAlert()


  return (
    <div className='wrapper'>
      <ParallaxProvider>
        <LayoutBg />
        <Header />
        <main>
          <Intro />
          <About />
          <Tokenomic />
          <Rounds />
          <Bonus />
          <Swap />
          <Article />
        </main>
        <Footer />
      </ParallaxProvider>
      <div className={`alert ${type === 'error' ? 'error' : 'success'} ${error ? 'active' : ''}`}>
        <img width={30} height={30} src={type === 'error' ? errorIcon : checkIcon} alt={type} />
        {error}
      </div>
    </div>
  )
}