import { FC, useEffect, useRef, useState } from "react"
import { getCurrentInstance } from "@tarojs/taro"
import * as echarts from "../../../../components/ec-canvas/echarts"
import { View } from "@tarojs/components";
import './index.scss'
import { getPerformanceData } from '../../../../api/fund';
import { FundCell } from "../FundCell";

const time = [
  { id: '1Y', name: '近1月' },
  { id: '6Y', name: '近3月' },
  { id: '1n', name: '近1年' },
  { id: '3n', name: '近3年' },
  { id: 'ln', name: '成立来' },
]
const LineChart: FC<{ code: string }> = ({ code }) => {
  // const [ec, setec] = useState({ lazyLoad: true })
  const [data, setData] = useState<any[]>([])
  const [action, setAction] = useState('3n')
  const ec = { lazyLoad: true };
  useEffect(() => {
    fetchData()

  }, [])

  function fetchData(RANGE = '3n') {
    //, INDEXYIELD: '000300' 
    getPerformanceData({ FCODE: code, RANGE }).then(v => {
      setData(v.data?.data)
      setAction(RANGE)
    })
  }

  useEffect(() => {
    setTimeout(() => {
      refresh()
    }, 100)
  }, [data])
  function setChartData(chart) {
    var date = data?.map(item => item.PDATE);
    var benchquote = data?.map(item => item.BENCHQUOTE);
    var fundtypeyield = data?.map(item => item.FUNDTYPEYIELD);
    var indexyield = data?.map(item => item.INDEXYIELD);
    var yields = data?.map(item => item.YIELD);

    let option = {
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        left: '0px',
        top: '10px',
        right: '20px',
        bottom: '2%',
        containLabel: true
      },
      // legend: {
      //   data: ['本基金', '同类平均', '沪深300']
      // },
      xAxis: {
        type: 'category',
        data: date,
        axisTick: {
          show: false // 隐藏x轴刻度
        },
        axisLine: {
          show: false,
          onZero: false

        },
        axisLabel: {
          interval: Math.floor(data?.length / 2), // 设置刻度间隔距离为1
          fontSize: 11,
          color: '#bbb'
        },
      },
      yAxis: {
        type: 'value',
        splitNumber: 3,

        axisLabel: {
          formatter: '{value}.00%',
          fontSize: 11,
          color: '#bbb'
        },
      },
      series: [
        {
          name: '本基金',
          lineStyle: {
            width: 2, // 修改线条粗细
            color: "#5c7bd9"
          },
          type: 'line',
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#e2eef9'
              },
              {
                offset: 1,
                color: "#fff"
              }
            ])
          },
          showSymbol: false,
          data: yields
        },
        {
          name: '同类平均',
          lineStyle: {
            width: 1,
            color: "#7ed3f4"

          },
          type: 'line',
          showSymbol: false,
          data: fundtypeyield
        },
        {
          name: '沪深300',
          lineStyle: {
            width: 1,
            color: "#f2d87e"
          },
          type: 'line',
          showSymbol: false,
          data: indexyield
        }

      ]
    };
    chart.setOption(option);
  }
  function refresh() {
    getCurrentInstance().page.selectComponent('#mychart-area').init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      
      setChartData(chart);
      return chart;
    });
  }

  return (
    <View className="charts_box">
      <View className="title dis_ac">
        <View>
          <View className="v1">本基金</View>
          <FundCell data={data[data?.length - 1]?.YIELD} style={{ fontSize: 12, fontWeight: 300 }} />
        </View>
        <View>
          <View className="v2">同类平均</View>
          <FundCell data={data[data?.length - 1]?.FUNDTYPEYIELD} style={{ fontSize: 12, fontWeight: 300 }} />
        </View>
        <View>
          <View className="v3">沪深300</View>
          <FundCell data={data[data?.length - 1]?.INDEXYIELD} style={{ fontSize: 12, fontWeight: 300 }} />
        </View>
      </View>
      <View className='mychart_area'>
        <ec-canvas
          id='mychart-area'
          canvasId='mychart-area'
          ec={ec}
        />
      </View>
      <View className="select dis_ac">
        {
          time.map(v => (
            <View className={`item dis_aj ${action === v.id ? 'action' : ''}`}
              onClick={() => fetchData(v.id)} >{v.name}</View>
          ))
        }
      </View>
    </View>
  );
}

export default LineChart