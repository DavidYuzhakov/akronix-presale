import { AuthProvider } from './context/AuthContext'
import { AlertProvider } from './context/AlertContext'
import { AppLayout } from './layouts/AppLayout'
import { FormProvider } from './context/FormContext'

export const IS_CLOSED = true

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <FormProvider>
          <AppLayout />
        </FormProvider>
      </AlertProvider>
    </AuthProvider>
  )
}

export default App
