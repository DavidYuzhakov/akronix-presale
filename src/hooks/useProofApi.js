import axios from '../axios'

export const useProofApi = () => {
  const checkProof = async (body) => {
    try {
      const { data } = await axios.post('/auth/checkProof', body)
      return data.jwt
    } catch (e) {
      console.log('Failed to send checkProof fn')
    }
  }

  const generatePayload = async () => {
    try {
      const { data } = await axios.get('/auth/generatePayload')
      return data.payload
    } catch (e) {
      console.log('Failed to generate payload: ', e)
    }
  }

  const checkAuth = async () => {
    try {
      const idParam = new URLSearchParams(window.location.search).get('id')
      const body = { ref_id: idParam ? parseInt(idParam) : -1 }

      const { data } = await axios.post('/presale/auth', JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      return data.code === 1
    } catch (err) {
      console.log('Failed to check authentificate', err)
      return false
    }
  }

  const getPresaleInfo = async () => {
    try {
      const { data } = await axios.get('/presale/getPresaleInfo')
      return data
    } catch (err) {
      console.log('Failed to get presale info', err)
    }
  }

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get('/presale/getUserInfo')
      return data
    } catch (err) {
      console.log('Failed to get user info', err)
    }
  }

  const getBalance = async () => {
    try {
      const { data } = await axios.get('/presale/getBalance')

      return data
    } catch (err) {
      console.log('Failed to get balance', err)
    }
  }

  const getTxFill = async (body) => {
    try {
      const { data } = await axios.get('/presale/getTxFill', { params: body })
      return data
    } catch (err) {
      console.log('Failed to get text for transaction', err)
    }
  }

  return { generatePayload, checkProof, checkAuth, getPresaleInfo, getUserInfo, getBalance, getTxFill }
}
