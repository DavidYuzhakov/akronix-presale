import { useTonConnectUI } from "@tonconnect/ui-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useProofApi } from "../hooks/useProofApi";

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider ({ children }) {
  const [tonConnectUI] = useTonConnectUI()
  const [isAuth, setIsAuth] = useState(Boolean(localStorage.getItem('token')) && tonConnectUI.connected)
  const ProofApi = useProofApi()

  const login = (newToken) => {
    setIsAuth(true)
    localStorage.setItem('token', newToken)
  } 

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('token')
  } 

  useEffect(() => {
    tonConnectUI.onStatusChange(async (w) => {
      if (w.connectItems?.tonProof && 'proof' in w.connectItems?.tonProof) {
        const proof = w.connectItems?.tonProof.proof
        const account = tonConnectUI.account
        const body = {
          address: account.address,
          network: account.chain,
          public_key: account.publicKey,
          proof: {
            payload: proof.payload,
            timestamp: proof.timestamp,
            domain: {
              value: proof.domain.value,
              length_bytes: proof.domain.lengthBytes,
            },
            signature: proof.signature,
            state_init: account.walletStateInit,
          },
        }

        const jwt = await ProofApi.checkProof(body)
        login(jwt)
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}