import Chart from 'react-apexcharts'
export default function TopUserChart(props) {
  return (
    <Chart
      options={chartOption}
      series={[
        {
          name: 'Bài đăng',
          data: [...props.data],
        },
      ]}
      type="bar"
      className="apex-charts mt-3"
      height={296}
    />
  )
}

const colors = [
  '#EF4444',
  '#F59E0B',
  '#10B981',
  '#3B82F6',
  '#6366F1',
  '#8B5CF6',
  '#EC4899',
]
const chartOption = {
  chart: {
    height: 296,
    type: 'bar',
    toolbar: {
      show: false,
    },
    parentHeightOffset: 0,
    events: {
      click: function (chart, w, e) {
        // console.log(chart, w, e)
      },
    },
  },
  colors: colors,
  plotOptions: {
    bar: {
      columnWidth: '20%',
      borderRadius: 6,
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    labels: {
      style: {
        colors: colors,
        fontSize: '12px',
      },
    },
  },
  tooltip: {
    theme: 'dark',
    x: { show: false },
  },
}
