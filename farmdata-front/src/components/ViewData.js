import React, { useState } from 'react'
import DataTable from './DataTable'

import { Form } from 'react-bootstrap'

const ViewData = ({ farms, data }) => {

  const [ farmFilter, setFarmFilter ] = useState('')
  const [ monthFilter, setMonthFilter ] = useState('')
  //const [ showPH, setShowPH ] = useState(true)
  //const [ showRainFall, setShowRainFall ] = useState(true)
  //const [ showTemperature, setShowTemperature ] = useState(true)

  const handleFarmFilter = (event) => {
    setFarmFilter(event.target.value)
  }

  const handleMonthFilter = (event) => {
    setMonthFilter(event.target.value)
  }

  //const farmData = data.filter(d => d.farm.name === farmFilter)
  const monthlyFarmFilter = (d) => {
    const monthYear = d.date.substr(0,7)
    if (monthFilter === '') {
      return d.farm.name === farmFilter
    }
    return d.farm.name === farmFilter && monthYear === monthFilter
  }
  const monthlyFarmData = data.filter(d => monthlyFarmFilter(d))
  const pH = monthlyFarmData.filter(d => d.type === 'pH')
  const rainFall = monthlyFarmData.filter(d => d.type === 'rainFall')
  const temperature = monthlyFarmData.filter(d => d.type === 'temperature')

  return (
    <div>
      <br />
      <Form>
        <Form.Group>
          <Form.Label>Set Farm</Form.Label>
          <Form.Select id='selectFarmToFilter' value={farmFilter} onChange={handleFarmFilter}>
            <option disabled/>
            {farms.map(farm =>
              <option key={farm.name} value={farm.name}>{farm.name}</option>
            )}
          </Form.Select>
        </Form.Group>
      </Form>

      <Form>
        <Form.Group>
          <Form.Label>Set month</Form.Label>
          <Form.Control id='selectMonthToFilter' value={monthFilter} type='month' onChange={handleMonthFilter}></Form.Control>
        </Form.Group>
      </Form>

      <h3>pH</h3>
      <DataTable id='pHTable' filteredData={pH}/>
      <h3>Rainfall</h3>
      <DataTable id='rainFallTable' filteredData={rainFall}/>
      <h3>Temperature</h3>
      <DataTable id='temperatureTable' filteredData={temperature}/>
    </div>
  )

}

export default ViewData