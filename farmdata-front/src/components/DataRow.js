import React from 'react'

const DataRow = ({ d }) => {

  //const date = new Date(d.date)

  if (d === undefined) {
    return null
  }

  return (
    <>
      <tr>
        <td>{d.farm.name}</td>
        <td>{d.date}</td>
        <td>{d.value}</td>
      </tr>
    </>
  )
}

export default DataRow