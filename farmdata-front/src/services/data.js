import axios from 'axios'
const baseUrlM = '/api/measurements'
const baseUrlF = '/api/farms'

const getAll = () => {
  const request = axios.get(baseUrlM)
  return request.then(response => response.data)
}

const postMeasurement = newMeasurement => {
  console.log('post called')
  return axios.post(baseUrlM, newMeasurement)
}

const getFarms = () => {
  const request = axios.get(baseUrlF)
  return request.then(response => response.data)
}

export default { getAll, getFarms, postMeasurement }