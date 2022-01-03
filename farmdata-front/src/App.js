import React, { useState, useEffect } from 'react'

import Togglable from './components/Togglable'
import AddData from './components/AddData'
import ViewData from './components/ViewData'

import dataService from './services/data'

import { Button, Row, Col } from 'react-bootstrap'

const App = () => {

  const [ data, setData ] = useState([])

  useEffect(() => {
    dataService.getAll().then(measurements => {
      const sortedData = measurements.sort((a, b) => b.date - a.date)
      setData(sortedData)
    })
  })

  return (
    <div className="container">
      <Header/>
      <Togglable openButtonLabel='Add data' closeButtonLabel='Hide form'>
        <AddData />
      </Togglable>
      <Togglable openButtonLabel='View data' closeButtonLabel='Hide data'>
        <ViewData data={data}/>
      </Togglable>
    </div>

  )
}

const Header = () => {
  return (
    <div className="container">
      <Row>
        <Col><h2>Farm data</h2></Col>
        <Col>
          <Button variant="outline-secondary" size="sm">Fetch data</Button>
          <Button variant="outline-secondary" size="sm">Empty database</Button>
        </Col>
      </Row>
    </div>
  )
}

export default App
