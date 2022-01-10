import axios from 'axios'
const baseUrlM = '/api/measurements'
const baseUrlF = '/api/farms'

//const getAll = () => {
//  const request = axios.get(baseUrlM)
//  return request.then(response => response.data)
//}

const getMonthlyFarmData = (farmId, type, monthYear) => {
  const month = Number(monthYear.substr(5,2))-1
  const year = monthYear.substr(0,4)
  const url = baseUrlM+'/'+farmId+'/'+type+'/'+year+'/'+month
  const request = axios.get(url)
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

const resetMeasurements = () => {
  const request = axios.post(baseUrlM + '/reset')
  return request.then(response => response.data)
}

const fetchData = () => {
  const request = axios.post(baseUrlM + '/fetch')
  return request.then(response => response.data)
}

export default { getMonthlyFarmData, getFarms, postMeasurement, resetMeasurements, fetchData }