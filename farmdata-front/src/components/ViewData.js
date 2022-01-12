import React, { useState } from 'react'
import FilterDataForm from './FilterDataForm'
import DataTable from './DataTable'
import DataChart from './DataChart'
import Notification from './Notification'
import dataService from '../services/data'

import { Button } from 'react-bootstrap'

import dateFnsFormat from 'date-fns/format'

const ViewData = ({ farms }) => {

  const [ unit, setUnit ] = useState('')
  const [ data, setData ] = useState([])
  const [ max, setMax ] = useState([])
  const [ min, setMin ] = useState([])
  const [ average, setAverage ] = useState([])
  const [ showTableNotChart, setShowTableNotChart ] = useState(true)
  const [ message, setMessage ] = useState(true)
  const [ messageColor, setMessageColor ] = useState('')

  const handleTableToChart = () => {
    setShowTableNotChart(!showTableNotChart)
  }

  const filterAndShowData = async (farm, type, year, month) => {

    try {
      const response = await dataService.getMonthlyFarmData(farm, type, year, month)
      const sortedData = await response.sort((a, b) => new Date(a.date) - new Date(b.date))
      setData(sortedData)

      const min = await dataService.getMonthlyFarmMin(farm, type, year, month)
      setMin(min)

      const max = await dataService.getMonthlyFarmMax(farm, type, year, month)
      setMax(max)

      const average = await dataService.getMonthlyFarmAverage(farm, type, year, month)
      setAverage(average.toFixed(1))

      if (type === 'pH') {
        setUnit('pH')
      } else if (type === 'rainFall') {
        setUnit('mm')
      } else if (type === 'temperature') {
        setUnit('\u00B0'+'C')
      }
    } catch (exception) {
      console.log(exception)
      setMessageColor('red')
      setMessage('Unable to get data.')
      setTimeout(() => {
        setMessage('')
      }, 4000)
    }
  }

  return (
    <div>
      <br />
      <FilterDataForm farms={farms} filterAndShowData={filterAndShowData} />
      <Notification message={message} messageColor={messageColor} />
      <br />
      <h4>{data.length > 0 ? data[0].farm.name : ''}, {data.length > 0 ? dateFnsFormat(new Date(data[0].date), 'MMMM yyyy') : ''}</h4>
      <b>Minimum value: </b>{min.length > 0 ? min[0].value.toFixed(1) : ''} {unit}
      <br />
      <b>Maximum value: </b>{max.length > 0 ? max[0].value.toFixed(1) : ''} {unit}
      <br />
      <b>Average: </b>{average} {unit}
      <br />
      <Button
        id='tableOrChart-button'
        variant='outline-primary'
        onClick={handleTableToChart}
      >
        {showTableNotChart ? 'Show data in chart' : 'Show data in table'}
      </Button>
      {showTableNotChart
        ? <DataTable id='table' filteredData={data} unit={unit}/>
        : <DataChart filteredData={data} unit={unit}/>
      }
    </div>
  )

}

export default ViewData