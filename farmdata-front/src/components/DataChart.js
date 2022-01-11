import React from 'react'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'

const DataChart = ({ filteredData, unit }) => {

  const dataList = filteredData.map(d => ({ x: new Date(d.date), y: d.value }) )

  return (
    <Line
      data = {
        {
          datasets: [
            {
              label: unit,
              data: dataList
            }
          ]
        }
      }
      options = {{
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            }
          }
        }
      }}
    />
  )
}

export default DataChart