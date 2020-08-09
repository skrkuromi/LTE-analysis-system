import React from 'react';

var echarts = require('echarts');
class GraphModel extends React.Component {
    createGraph = () => {
        const { data, attrName } = this.props;
        if (data.length !== 0) {

            var myChart = echarts.init(document.getElementById('main'));
            const xData = [], yData = [];

            for (let value in data) {
                const temp = data[value];
                xData.push(temp['起始时间']);
                yData.push(temp[attrName]);
            }

            var option = {
                title: {
                    text: attrName + '-时间图'
                },
                tooltip: {},
                xAxis: {
                    data: xData
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: { show: true, type: ['line', 'bar'] },
                        saveAsImage: { show: true }
                    }
                },
                yAxis: {},
                series: [{
                    name: attrName,
                    type: 'bar',
                    data: yData,
                    barMaxWidth: 50
                }],
                color: ['#1890ff']
            };

            myChart.setOption(option);
        }
    }

    componentDidMount() {
        this.createGraph();
    }

    componentDidUpdate() {
        this.createGraph();
    }

    render() {
        const { parent } = this.props;
        if (parent === "PRB") {
            return (
                <div>
                    <div id="main" style={{ width: 1000, height: 400 }}></div>
                </div>
            );
        } else if (parent === "KPI") {
            return (
                <div>
                    <div id="main" style={{ width: 800, height: 400 }}></div>
                </div>
            );
        }

    }
}

export default GraphModel;