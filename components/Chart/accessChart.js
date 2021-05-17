import React from 'react'
import Chart from 'react-apexcharts'

const AccessChart = () => {
  const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1)
    var days = []
    var idx = 0
    while (date.getMonth() === month && idx < 15) {
      var d = new Date(date)
      days.push(
        d.getDate() + ' ' + d.toLocaleString('en-us', { month: 'short' })
      )
      date.setDate(date.getDate() + 1)
      idx += 1
    }
    return days
  }

  var now = new Date()
  var labels = getDaysInMonth(now.getMonth(), now.getFullYear())

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
      categories: labels,
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

  const apexLineChartWithLablesData = [
    {
      name: 'Lược truy cập',
      data: [10, 20, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40, 30, 50, 35],
    },
  ]

  return (
    <Chart
      options={apexLineChartWithLables}
      series={apexLineChartWithLablesData}
      type="area"
      className="apex-charts mt-3"
      height={296}
    />
  )
}

export default AccessChart
