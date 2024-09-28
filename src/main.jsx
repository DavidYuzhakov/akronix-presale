import { createRoot } from 'react-dom/client'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import App from './App.jsx'
import './scss/app.scss'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TonConnectUIProvider manifestUrl='https://wallet.akronix.io/tonconnect.json'>
      <App />
    </TonConnectUIProvider> 
  </BrowserRouter>
)
