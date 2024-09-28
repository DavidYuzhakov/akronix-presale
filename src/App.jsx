import { AuthProvider } from './context/AuthContext'
import { AlertProvider } from './context/AlertContext'
import { AppLayout } from './layouts/AppLayout'

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <AppLayout />
      </AlertProvider>
    </AuthProvider>
  )
}

export default App
