import { createContext, useContext, useRef, useState } from "react";

const AlertContext = createContext(null)
export const useAlert = () => useContext(AlertContext)

export function AlertProvider ({ children }) {
  const [error, setError] = useState('')
  const [type, setType] = useState('error')
  const timeoutId = useRef(null)
  
  const showAlert = (text, t = 'error') => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    setType(t)
    setError(text)

    timeoutId.current = setTimeout(() => {
      setError('')
    }, 2500)
  }

  return (
    <AlertContext.Provider value={{ error, showAlert, type }}>
      { children }
    </AlertContext.Provider>
  )
}