import React, { useState, useEffect } from 'react'

import Header from './components/Header'
import Togglable from './components/Togglable'
import AddData from './components/AddData'
import ViewData from './components/ViewData'

import dataService from './services/data'

const App = () => {

  const [ data, setData ] = useState([])
  const [ farms, setFarms ] = useState([])

  useEffect(() => {
    dataService.getAll().then(measurements => {
      const sortedData = measurements.sort((a, b) => b.date - a.date)
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

  const createMeasurement = (measurement) => {
    console.log(measurement)
    dataService
      .postMeasurement(measurement)
      .then(response => {
        console.log(response.data)
        const newData = {
          ...response.data,
          farm: { id: response.data.farm, name: measurement.farm }
        }
        console.log(newData)
        setData(data.concat(newData))
      })
  }

  return (
    <div className="container">
      <Header fetchData={fetchData} resetDatabase={resetDatabase}/>
      <Togglable openButtonLabel='Add data' closeButtonLabel='Hide form'>
        <AddData farms={farms} createMeasurement={createMeasurement}/>
      </Togglable>
      <br />
      <Togglable openButtonLabel='View data' closeButtonLabel='Hide data'>
        <ViewData data={data}/>
      </Togglable>
      <br />
    </div>

  )
}

export default App
