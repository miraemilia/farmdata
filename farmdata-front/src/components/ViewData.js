import React, { useState } from 'react'
import DataTable from './DataTable'

import dataService from '../services/data'

import { Form, Button } from 'react-bootstrap'

const ViewData = ({ farms }) => {

  const [ farmFilter, setFarmFilter ] = useState('')
  const [ monthFilter, setMonthFilter ] = useState('')
  const [ typeFilter, setTypeFilter ] = useState('')
  const [ data, setData ] = useState([])
  //const [ showPH, setShowPH ] = useState(true)
  //const [ showRainFall, setShowRainFall ] = useState(true)
  //const [ showTemperature, setShowTemperature ] = useState(true)

  const handleFarmFilter = (event) => {
    setFarmFilter(event.target.value)
  }

  const handleTypeFilter = (event) => {
    setTypeFilter(event.target.value)
  }

  const handleMonthFilter = (event) => {
    setMonthFilter(event.target.value)
  }

  const filterAndShowData = async (event) => {
    event.preventDefault()
    const response = await dataService.getMonthlyFarmData(farmFilter, typeFilter, monthFilter)
    const sortedData = await response.sort((a, b) => new Date(a.date) - new Date(b.date))
    setData(sortedData)
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
              <option key={farm.name} value={farm.id}>{farm.name}</option>
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Set type</Form.Label>
          <Form.Select id='selectTypeToFilter' value={typeFilter} onChange={handleTypeFilter}>
            <option disabled/>
            <option value="pH">pH</option>
            <option value="rainFall">Rainfall</option>
            <option value="temperature">Temperature</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Set month</Form.Label>
          <Form.Control id='selectMonthToFilter' value={monthFilter} type='month' onChange={handleMonthFilter}></Form.Control>
        </Form.Group>

        <Button id='filter-button' type='submit' >Filter</Button>
      </Form>

      <DataTable id='table' filteredData={data}/>
    </div>
  )

}

export default ViewData