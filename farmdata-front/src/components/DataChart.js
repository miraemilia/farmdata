import React from 'react'
/* eslint-disable */
import Chart from 'chart.js/auto'
/* eslint-enable */
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'

const DataChart = ({ filteredData, unit }) => {

  const dataList = filteredData.map(d => ({ x: new Date(d.date), y: d.value }) )
  const data = {
    datasets: [
      {
        label: unit,
        data: dataList
      }
    ]
  }
  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      }
    }
  }

  return (
    <Line id='chart' data = {data} options = {options}
    />
  )
}

export default DataChart