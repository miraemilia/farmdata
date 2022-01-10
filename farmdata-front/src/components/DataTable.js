import React from 'react'
import DataRow from './DataRow'

import { Table } from 'react-bootstrap'

const DataTable = ({ filteredData, unit }) => {

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Farm</th>
            <th>Date</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(d =>
            <DataRow key={d.id} d={d} unit={unit} s/>
          )}
        </tbody>
      </Table>
    </>
  )

}

export default DataTable