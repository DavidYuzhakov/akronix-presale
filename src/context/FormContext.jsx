import { createContext, useContext, useState } from 'react'
import { useProofApi } from '../hooks/useProofApi'

const FormContext = createContext(null)
export const useForm = () => useContext(FormContext)
export function FormProvider({ children }) {
  const ProofApi = useProofApi()

  const [akron, setAkron] = useState(0)
  const [amount, setAmount] = useState(0)
  const [balance, setBalance] = useState(0)
  const [userInfo, setUserInfo] = useState({})
  const [isCopied, setIsCopied] = useState(false)
  const [currency, setCurrency] = useState('usdt')

  function updateAmount(e) {
    const value = e.target.value
    if (value < 0) return
    setAmount(value)
  }

  async function fetchUserInfo() {
    const info = await ProofApi.getUserInfo()
    setUserInfo(info)
  }
  async function fetchGetBalance() {
    const balance = await ProofApi.getBalance()
    setBalance(balance)
  }

  function copyHandler () {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
    navigator.clipboard.writeText(userInfo.invite_link)
  }

  return (
    <FormContext.Provider
      value={{ updateAmount, amount, setAmount, fetchUserInfo, fetchGetBalance, balance, akron, setAkron, userInfo, currency, setCurrency, copyHandler, isCopied }}
    >
      {children}
    </FormContext.Provider>
  )
}
