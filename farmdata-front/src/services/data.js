import axios from 'axios'
const baseUrlM = '/api/measurements'
const baseUrlF = '/api/farms'

const getMonthlyFarmData = (farmId, type, year, month) => {
  const url = baseUrlM+'/'+farmId+'/'+type+'/'+year+'/'+month
  const request = axios.get(url)
  return request.then(response => response.data)
}

const getMonthlyFarmMin = (farmId, type, year, month) => {
  const url = baseUrlM+'/min/'+farmId+'/'+type+'/'+year+'/'+month
  const request = axios.get(url)
  return request.then(response => response.data)
}

const getMonthlyFarmMax = (farmId, type, year, month) => {
  const url = baseUrlM+'/max/'+farmId+'/'+type+'/'+year+'/'+month
  const request = axios.get(url)
  return request.then(response => response.data)
}

const getMonthlyFarmAverage = (farmId, type, year, month) => {
  const url = baseUrlM+'/aver/'+farmId+'/'+type+'/'+year+'/'+month
  const request = axios.get(url)
  return request.then(response => response.data)
}

const postMeasurement = newMeasurement => {
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

export default {
  getMonthlyFarmData,
  getMonthlyFarmMin,
  getMonthlyFarmMax,
  getMonthlyFarmAverage,
  getFarms,
  postMeasurement,
  resetMeasurements,
  fetchData
}