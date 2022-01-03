import React from 'react'
import DataRow from './DataRow'

import { Table } from 'react-bootstrap'

const ViewData = ({ data }) => {

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Farm</th>
            <th>Date</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d =>
            <DataRow key={d.id} d={d} />
          )}
        </tbody>
      </Table>
    </>
  )

}

export default ViewData