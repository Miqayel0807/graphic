import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './chart.module.css'
const Chart = (props) => {

  const [chartData, setData] = useState({

    first: [],
    second: []
  })

  useEffect(() => {
      getData()
    
  }, [props])

  const getData = () => {

    const { first } = chartData
    const { second } = chartData

    props.data.forEach(index => {
      first.push(index)
    })
    props.inputData.forEach(index => {
      second.push(index)
    })

    setData({
      ...chartData,
      first,
      second
    })

  }

  const data = {
    labels: ['1 quarter', '2 quarter', '3 quarter', '4 quarter'],
    datasets: [

      {
        label: 'Grey ',
        data: chartData.first,
        backgroundColor: 'grey',
      },
      {
        label: ' Blue ',
        data: chartData.second,
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className='header'>
        <div className='links'>

        </div>
      </div>
      <Bar className={styles.chart} data={data} options={options} />
    </>
  )
};

export default Chart;