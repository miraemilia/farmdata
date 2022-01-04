import React from 'react'

import { Button, Col, Row } from 'react-bootstrap'

const Header = ({ fetchData, resetDatabase }) => {
  return (
    <div className="container">
      <Row>
        <Col><h2>Farm data</h2></Col>
        <Col>
          <Button onClick={fetchData} variant="outline-secondary" size="sm">Fetch data</Button>
          <Button onClick={resetDatabase} variant="outline-secondary" size="sm">Empty database</Button>
        </Col>
      </Row>
    </div>
  )
}

export default Header