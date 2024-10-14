import { createRoot } from 'react-dom/client'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import App from './App.jsx'
import './scss/app.scss'
import './i18n.js'

createRoot(document.getElementById('root')).render(
  <TonConnectUIProvider restoreConnection={false} manifestUrl='https://wallet.akronix.io/tonconnect.json'>
    <App />
  </TonConnectUIProvider> 
)
