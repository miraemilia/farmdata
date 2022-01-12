import React, { useState, useEffect } from 'react'

import Header from './components/Header'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import AddData from './components/AddData'
import ViewData from './components/ViewData'

import dataService from './services/data'

const App = () => {

  const [ farms, setFarms ] = useState([])
  const [ message, setMessage ] = useState('')
  const [ messageColor, setMessageColor ] = useState('')

  useEffect(() => {
    dataService.getFarms().then(farms => {
      setFarms(farms)
    })
  }, [])

  const fetchData = () => {
    console.log('fetching data...')
    try {
      dataService.fetchData().then(response => {
        console.log(response)
        setMessage('Data fetched')
        setMessageColor('green')
        setTimeout(() => {
          setMessage('')
        }, 4000)
      })
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
      try {
        dataService.resetMeasurements().then(response => {
          console.log(response)
          setMessage('Database empty')
          setMessageColor('green')
          setTimeout(() => {
            setMessage('')
          }, 4000)
        })
      } catch (error) {
        console.log('failed fetching data')
        setMessage(`Fetching data failed ${error}`)
        setMessageColor('red')
        setTimeout(() => {
          setMessage('')
        }, 4000)
      }
      //setData([])
    }
  }

  const createMeasurement = async (measurement) => {
    try {
      const response = await dataService.postMeasurement(measurement)
      const newData = {
        ...response.data,
        farm: { id: response.data.farm, name: measurement.farm }
      }
      console.log(newData)
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
        <ViewData farms={farms} />
      </Togglable>
      <br />
    </div>

  )
}

export default App
