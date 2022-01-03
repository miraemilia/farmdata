import React from 'react'

const DataRow = ({ d }) => {
  return (
    <>
      <tr>
        <td>{d.farm.name}</td>
        <td>{d.date}</td>
        <td>{d.type}</td>
        <td>{d.value}</td>
      </tr>
    </>
  )
}

export default DataRow