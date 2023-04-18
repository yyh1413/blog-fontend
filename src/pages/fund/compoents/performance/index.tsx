import { Component, FC, useEffect, useRef, useState } from "react"
import { getCurrentInstance } from "@tarojs/taro"
import * as echarts from "../../../../components/ec-canvas/echarts"
import { View } from "@tarojs/components";
import './index.scss'

const LineChart: FC = () => {
  // const [ec, setec] = useState({ lazyLoad: true })
  const ec = { lazyLoad: true };
  useEffect(() => {
    setTimeout(() => {
      refresh()
    }, 100)
  }, [])
  function setChartData(chart) {
    let option = {
      // tooltip: {
      //   trigger: 'axis'
      // },
      // legend: {
      //   data: ['本基金', '同类']
      // },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Email',
          showSymbol: false,
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101]
        },
        {
          showSymbol: false,
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201]
        },
      ]
    };
    chart.setOption(option);
  }
  function refresh() {
    getCurrentInstance().page.selectComponent('#mychart-area').init((canvas, width, height) => {
      console.log('canvas', canvas)
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setChartData(chart);
      return chart;
    });
  }

  return (
    <View className='mychart_area'>
      <ec-canvas
        id='mychart-area'
        canvasId='mychart-area'
        ec={ec}
      />
    </View>
  );
}

export default LineChart