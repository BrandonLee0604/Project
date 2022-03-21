import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/grid'

import React from 'react';

class HourlyChart extends React.Component {
    componentWillReceiveProps(nextProps) {
        var myChart = echarts.init(document.getElementById('forecast-chart'));
        // console.log(nextProps.xdata)
        if (nextProps.xdata.length == 0){
            return
        }
        const xdata = nextProps.xdata
        const ydata = {
            ydata1:nextProps.ydata
        }
        const xdesc = nextProps.xdesc
        myChart.setOption({
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['Temperature']
            },
            toolbox: {
                show : true,
                feature : {
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {
                        show: true,
                        type: 'jpg'
                    }
                }
            },
            xAxis : [
                {
                    type : 'category',
                    data : xdata,
                },
                {
                    type : 'category',
                    data : xdesc,
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel: {
                        show:true,
                        formatter:'{value} °C'
                    },
                }
            ],
            series : [
                {
                    name:'Temperature',
                    type:'line',
                    data: ydata.ydata1,
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        });
    }

    render() {
        return (
            <div className='chart-wrapper'>
                <div id='forecast-chart' style={{ width: '100%', height: 500 }}>

                </div>
            </div>

        )
    }
}

export default HourlyChart

