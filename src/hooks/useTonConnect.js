import { useTonConnectUI } from "@tonconnect/ui-react"
import { useProofApi } from "./useProofApi";
import { useAuth } from "../context/AuthContext";

const useTonConnect = () => {
  const { logout } = useAuth()
  const [tonConnectUI] = useTonConnectUI()
  const ProofApi = useProofApi()

  async function fetchGenPayload() {
    await tonConnectUI.openModal()
    tonConnectUI.setConnectRequestParameters({
      state: 'loading'
    });

    const payload = await ProofApi.generatePayload()
    if (payload) {
      tonConnectUI.setConnectRequestParameters({
        state: 'ready',
        value: {
            tonProof: payload
        }
      });
    } else {
      tonConnectUI.setConnectRequestParameters(null)
    }
  } 

  async function fetchAuthUser() {
    const isLogged = await ProofApi.checkAuth()
    if (!isLogged) {
      logout()

      if (tonConnectUI.connected) {
        console.log('discconect #2')
        await tonConnectUI.disconnect()
      }
    }
  }

  async function fetchSendTransaction(address, amount = 0, payload = null) {
    const fillTx = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [{ address, amount, payload }],
    }
    try {
      await tonConnectUI.sendTransaction(fillTx);
      return {
        success: true
      }
    } catch (e) {
      console.log('Failed to send transaction: ', e)
    }
  }

  return { fetchGenPayload, fetchAuthUser, fetchSendTransaction }
}

export default useTonConnect