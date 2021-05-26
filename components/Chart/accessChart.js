import moment from 'moment'
import React from 'react'
import Chart from 'react-apexcharts'

const AccessChart = (props) => {
  const apexLineChartWithLables = {
    chart: {
      height: 296,
      type: 'area',
      toolbar: {
        show: false,
      },
      parentHeightOffset: 0,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 4,
    },
    zoom: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    colors: ['#3B82F6'],
    xaxis: {
      type: 'string',
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {},
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [45, 100],
      },
    },
    tooltip: {
      theme: 'dark',
      x: { show: false },
    },
  }
  const [currentData, setCurrentData] = React.useState([])
  React.useEffect(() => {
    let now = new Date()
    let newData = []
    for (let i = 15; i >= 0; i--) {
      var date = new Date()
      date.setDate(now.getDate() - i)
      let lable = moment(date).format('DD-MM')
      let check = false
      props.data.forEach((dt) => {
        if (moment(dt.date).format('DD-MM') == lable) {
          newData.push({
            x: lable,
            y: dt.total,
          })
          check = true
        }
      })
      if (!check) {
        newData.push({
          x: lable,
          y: 0,
        })
      }
    }
    setCurrentData(newData)
  }, [props.data])
  return (
    <Chart
      options={apexLineChartWithLables}
      series={[
        {
          name: 'Lược truy cập',
          data: [...currentData],
        },
      ]}
      type="area"
      className="apex-charts mt-3"
      height={296}
    />
  )
}

export default AccessChart
