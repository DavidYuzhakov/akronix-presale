import { createContext, useContext, useEffect, useState } from 'react'
import { useProofApi } from '../hooks/useProofApi'
import { IS_CLOSED } from '../App'

const FormContext = createContext(null)
export const useForm = () => { 
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useForm have not context')
  } 
  return context
}
export function FormProvider({ children }) {
  const ProofApi = useProofApi()

  const [akron, setAkron] = useState(0)
  const [amount, setAmount] = useState(0)
  const [balance, setBalance] = useState(0)
  const [userInfo, setUserInfo] = useState({})
  const [isCopied, setIsCopied] = useState(false)
  const [currency, setCurrency] = useState('usdt')
  const [infoPresale, setInfoPresale] = useState(null)

  function updateAmount(e) {
    const value = e.target.value
    if (value < 0) return
    setAmount(value)
  }

  async function fetchUserInfo() {
    const info = await ProofApi.getUserInfo(IS_CLOSED)
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

  useEffect(() => {
    async function fetchInfo () {
      const info = await ProofApi.getPresaleInfo(IS_CLOSED)
      setInfoPresale(info)
    }
    fetchInfo()

    const subscribe = setInterval(() => {
      fetchInfo()
    }, 20000);

    return () => clearInterval(subscribe)
  }, [])

  return (
    <FormContext.Provider
      value={{ updateAmount, amount, setAmount, fetchUserInfo, fetchGetBalance, balance, akron, setAkron, userInfo, currency, setCurrency, copyHandler, isCopied, infoPresale }}
    >
      {children}
    </FormContext.Provider>
  )
}
