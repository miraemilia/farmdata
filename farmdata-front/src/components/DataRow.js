import React from 'react'
import dateFnsFormat from 'date-fns/format'

const DataRow = ({ d, unit }) => {

  const date = new Date(d.date)

  if (d === undefined) {
    return null
  }

  return (
    <>
      <tr>
        <td>{d.farm.name}</td>
        <td>{dateFnsFormat(date, 'dd.MM.yyyy HH:mm')}</td>
        <td>{d.value} {unit}</td>
      </tr>
    </>
  )
}

export default DataRow