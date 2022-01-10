import React from 'react'
import dateFnsFormat from 'date-fns/format'

const DataRow = ({ d }) => {

  const date = new Date(d.date)

  if (d === undefined) {
    return null
  }

  return (
    <>
      <tr>
        <td>{d.farm.name}</td>
        <td>{dateFnsFormat(date, 'dd.MM.yyyy HH:mm')}</td>
        <td>{d.value}</td>
      </tr>
    </>
  )
}

export default DataRow