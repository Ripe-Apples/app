import React from 'react'
import Chart from 'react-google-charts'

const pieOptions = {
  title: 'Apple Pie Meter',
  slices: [
    {
      color: '#2BB673'
    },
    {
      color: '#d91e48'
    },
    {
      color: '#007fad'
    },
    {
      color: '#e9a227'
    }
  ],
  legend: {
    position: 'middle',
    alignment: 'center',
    textStyle: {
      color: '233238',
      fontSize: 18
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: '100%',
    height: '80%'
  },
  fontName: 'Roboto'
}

const ApplePie = props => {
  const {averageScore} = props

  const data = [
    ['Ripe', 'Rotten'],
    ['Ripe', Number(averageScore)],
    ['Rotten', 100 - Number(averageScore)]
  ]

  return (
    <div className="App">
      <Chart
        chartType="PieChart"
        data={data}
        options={pieOptions}
        graph_id="PieChart"
        width={'300px'}
        height={'170px'}
        legend_toggle
      />
    </div>
  )
}

export default ApplePie
