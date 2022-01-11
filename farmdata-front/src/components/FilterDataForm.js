import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'

const FilterDataForm = ({ farms, filterAndShowData }) => {

  const [ farmFilter, setFarmFilter ] = useState('')
  const [ monthFilter, setMonthFilter ] = useState('')
  const [ typeFilter, setTypeFilter ] = useState('')

  const handleFarmFilter = (event) => {
    setFarmFilter(event.target.value)
  }

  const handleTypeFilter = (event) => {
    setTypeFilter(event.target.value)
  }

  const handleMonthFilter = (event) => {
    setMonthFilter(event.target.value)
  }

  const filter = (event) => {
    event.preventDefault()

    const month = Number(monthFilter.substring(5,7))-1
    console.log(month)
    const year = monthFilter.substring(0,4)
    console.log(year)
    filterAndShowData(farmFilter, typeFilter, year, month)
  }

  return (
    <Form id='filterDataForm' onSubmit={filter}>

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

      <br />
      <Button id='filter-button' variant='outline-primary' type='submit' >Filter</Button>

    </Form>
  )
}

export default FilterDataForm