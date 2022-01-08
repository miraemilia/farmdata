import React, { useState } from 'react'
import DataTable from './DataTable'

import { Form, Button } from 'react-bootstrap'

const ViewData = ({ farms, data }) => {

  const [ farmFilter, setFarmFilter ] = useState('')
  const [ monthFilter, setMonthFilter ] = useState('')
  const [ pHData, setPHData ] = useState([])
  const [ rainFallData, setRainFallData ] = useState([])
  const [ temperatureData, setTemperatureData ] = useState([])
  //const [ showPH, setShowPH ] = useState(true)
  //const [ showRainFall, setShowRainFall ] = useState(true)
  //const [ showTemperature, setShowTemperature ] = useState(true)

  const handleFarmFilter = (event) => {
    setFarmFilter(event.target.value)
  }

  const handleMonthFilter = (event) => {
    setMonthFilter(event.target.value)
  }

  const monthlyFarmFilter = (d) => {
    const monthYear = d.date.substr(0,7)
    return d.farm.name === farmFilter && monthYear === monthFilter
  }

  const filterAndShowData = () => {
    event.preventDefault()
    const monthlyFarmData = data.filter(d => monthlyFarmFilter(d))
    setPHData(monthlyFarmData.filter(d => d.type === 'pH'))
    setRainFallData(monthlyFarmData.filter(d => d.type === 'rainFall'))
    setTemperatureData(monthlyFarmData.filter(d => d.type === 'temperature'))
  }

  return (
    <div>
      <br />
      <Form id='filterDataForm' onSubmit={filterAndShowData}>

        <Form.Group>
          <Form.Label>Set Farm</Form.Label>
          <Form.Select id='selectFarmToFilter' value={farmFilter} onChange={handleFarmFilter}>
            <option disabled/>
            {farms.map(farm =>
              <option key={farm.name} value={farm.name}>{farm.name}</option>
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Set month</Form.Label>
          <Form.Control id='selectMonthToFilter' value={monthFilter} type='month' onChange={handleMonthFilter}></Form.Control>
        </Form.Group>

        <Button id='filter-button' type='submit' >Filter</Button>
      </Form>

      <h3>pH</h3>
      <DataTable id='pHTable' filteredData={pHData}/>
      <h3>Rainfall</h3>
      <DataTable id='rainFallTable' filteredData={rainFallData}/>
      <h3>Temperature</h3>
      <DataTable id='temperatureTable' filteredData={temperatureData}/>
    </div>
  )

}

export default ViewData