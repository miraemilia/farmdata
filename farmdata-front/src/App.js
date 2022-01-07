import React, { useState, useEffect } from 'react'

import Header from './components/Header'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import AddData from './components/AddData'
import ViewData from './components/ViewData'

import dataService from './services/data'

const App = () => {

  const [ data, setData ] = useState([])
  const [ farms, setFarms ] = useState([])
  const [ message, setMessage ] = useState('')
  const [ messageColor, setMessageColor ] = useState('')

  useEffect(() => {
    dataService.getAll().then(measurements => {
      const sortedData = measurements.sort((a, b) => new Date(b.date) - new Date(a.date))
      setData(sortedData)
    })
  }, [])

  useEffect(() => {
    dataService.getFarms().then(farms => {
      setFarms(farms)
    })
  }, [])

  const fetchData = () => {
    console.log('fetching data...')
    try {
      console.log('fetch data')
    } catch (exception) {
      console.log('failed fetching data')
      setMessage(`Fetching data failed ${exception}`)
      setMessageColor('red')
      setTimeout(() => {
        setMessage('')
      }, 4000)
    }
  }

  const resetDatabase = () => {
    if (window.confirm('Are you sure you want to reset the database? The database will be emptied.')) {
      console.log('resetting database...')
      dataService.resetMeasurements().then(response => {
        console.log(response)
      })
      setData([])
    }
  }

  const createMeasurement = async (measurement) => {
    console.log(measurement)
    try {
      const response = await dataService.postMeasurement(measurement)
      console.log(response.data)
      const newData = {
        ...response.data,
        farm: { id: response.data.farm, name: measurement.farm }
      }
      console.log(newData)
      const allData = data.concat(newData)
      const sortedData = allData.sort((a, b) => new Date(b.date) - new Date(a.date))
      setData(sortedData)
      setMessage('New data added')
      setMessageColor('green')
      setTimeout(() => {
        setMessage('')
      }, 4000)
    } catch (exception) {
      console.log('failed adding measurement')
      setMessage(`Adding data failed ${exception}`)
      setMessageColor('red')
      setTimeout(() => {
        setMessage('')
      }, 4000)
    }
  }

  return (
    <div className="container">
      <Header fetchData={fetchData} resetDatabase={resetDatabase}/>
      <Notification message={message} messageColor={messageColor}/>
      <Togglable
        openButtonLabel='Add data'
        openButtonId='addData-button'
        closeButtonLabel='Hide form'
        closeButtonId='hideForm-button'>
        <AddData farms={farms} createMeasurement={createMeasurement}/>
      </Togglable>
      <br />
      <Togglable
        openButtonLabel='View data'
        openButtonId='viewData-button'
        closeButtonLabel='Hide data'
        closeButtonId='hideData-button'>
        <ViewData data={data}/>
      </Togglable>
      <br />
    </div>

  )
}

export default App
