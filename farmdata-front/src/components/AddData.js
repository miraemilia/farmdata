import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'

const AddData = ({ farms, createMeasurement }) => {

  const [selectedFarm, setSelectedFarm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [newValue, setValue] = useState(0)

  const handleFarmChange = (event) => {
    setSelectedFarm(event.target.value)
  }

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value)
  }

  const handleValueChange = (event) => {
    setValue(event.target.value)
  }

  const addMeasurement = (event) => {
    event.preventDefault()
    createMeasurement({
      farm: selectedFarm,
      type: selectedType,
      value: newValue
    })
    setSelectedFarm('')
    setSelectedType('')
    setValue(0)
  }

  return (
    <div>
      <Form onSubmit={addMeasurement}>

        <Form.Group>
          <Form.Label>Farm</Form.Label>
          <Form.Select value={selectedFarm} onChange={handleFarmChange}>
            <option disabled />
            {farms.map(farm =>
              <option key={farm.name} value={farm.name}>{farm.name}</option>
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Metric type</Form.Label>
          <Form.Select value={selectedType} onChange={handleTypeChange}>
            <option disabled />
            <option value="pH">pH</option>
            <option value="rainFall">Rainfall</option>
            <option value="temperature">Temperature</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Metric value</Form.Label>
          <Form.Control
            required
            type="number"
            value={newValue}
            onChange={handleValueChange}
          />
        </Form.Group>

        <br />
        <Button type="submit">Submit</Button>

      </Form>
    </div>
  )

}

export default AddData