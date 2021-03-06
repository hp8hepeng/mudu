(function() {
    $.fn.EasyChart = function(data, type, callback) {
        var obj = $(this)
        obj.empty()
        return new EasyChart(obj, data, type, callback)
    }
})($)

function EasyChart(obj, data, type, callback) {
    this.obj = obj
    this.data = data
    this.type = type
    this.callback = callback


    this.init()
    this.option = eval('this.' + type + "()")
    this.setOption()


}

EasyChart.prototype = {
    init() {
        console.log('init')
        this.myChart = echarts.init(this.obj[0]);
    },
    // 矩形图
    Treemap() {
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            legend: {
                data: ['售卖', '生产']
            },
            xAxis: [{
                type: 'category',
                data: ['零售企业', '连锁企业', '生产企业', '医疗机构', '批发企业'],
                axisPointer: {
                    type: 'shadow'
                }
            }],
            yAxis: [{
                    type: 'value',
                    name: '',
                    axisLabel: {
                        formatter: '{value}'
                    },
                    splitLine: {
                        show: false
                    }
                },
                {
                    name: '',
                    axisLabel: {
                        formatter: '{value}'
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [{
                    name: '售卖',
                    type: 'bar',
                    data: [3464, 750, 720, 100, 200]
                },
                {
                    name: '生产',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [100, 1, 1, 2, 0, 5]
                }
            ]
        };
        return option
    },
    // 三个联动pie 统一按钮控制
    Pielinkage3() {
        var xData = [];
        $.each(this.data[0], function(k, v) {
            xData.push(v.name)
        })
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: xData
            },
            backgroundColor: '#FFF',
            Color: ['#26c6da', '#9785f1', '#9785f1'],
            calculable: true,
            series: [{
                    type: 'pie',
                    radius: ['35%', '50%'],
                    center: ['20%', 'center'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: this.data[0],
                    color: ['#26c6da', '#9785f1', '#1e88e5']
                },
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: ['35%', '50%'],
                    center: ['center', 'center'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: this.data[1]
                },
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: ['35%', '50%'],
                    center: ['80%', 'center'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: this.data[2]
                }
            ]
        }
        return option
    },
    // 多个状图
    MultipleLine() {
        var serieDate = {
            name: '',
            type: 'bar',
            data: [],
            itemStyle: {
                normal: {
                    barBorderRadius: [20, 20, 20, 20]
                }
            },
            // color: '',
            barWidth: '10',
            barCategoryGap: '20'
        };

        var arr = new Array()
        var that = this
        $.each(this.data.data, function(k, v) {
            var vDate = JSON.parse(JSON.stringify(serieDate))
            vDate.name = that.data.ldata[k]
            vDate.data = v

            // vDate.color = that.data.color
            if (that.data.isColor != undefined) {
                vDate.itemStyle.normal.color = eval('(' + that.data.isColor[k] + ')');
            }
            arr.push(vDate)
        })

        option = {
            title: {
                text: this.data.title || ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            color: this.data.color || [],
            legend: {
                data: this.data.ldata
            },
            xAxis: [{
                type: 'category',
                data: this.data.xdata,
                axisPointer: {
                    type: 'shadow'
                }
            }],
            backgroundColor: '#FFF',
            yAxis: [{
                type: 'value',
                name: '（个）'
            }],
            series: JSON.parse(JSON.stringify(arr))
        };
        return option

    },
    // 圆弧 线形图
    arcLine() {
        var serieDate = {
            name: '',
            type: 'line',
            stack: '总量',
            data: [],
            smooth: true,
            areaStyle: {
                normal: {

                }
            }
        };
        var arr = new Array()
        var that = this
        $.each(this.data.data, function(k, v) {
            var vDate = JSON.parse(JSON.stringify(serieDate))
            vDate.name = that.data.ldata[k]
            vDate.data = v
            vDate.areaStyle.normal.color = that.data.color[k] || ''
            vDate.areaStyle.normal.opacity = '0.2';
            arr.push(vDate)
            console.log(arr, vDate)
        })
        option = {
            title: {
                text: ''
            },
            backgroundColor: '#fff',
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: this.data.ldata
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.data.xdata,
                name: '(个)'
            },
            yAxis: {
                type: 'value'
            },
            color: ['#9785f1', '#26c6da', '#1e88e5', '#edba62'],
            series: arr
        };
        return option
    },
    // 普通线形图
    setLine() {
        var serieDate = {
            name: '',
            type: 'line',
            stack: '总量',
            data: []
        }
        var arr = new Array()
        var that = this
        $.each(this.data.data, function(k, v) {
            var vDate = JSON.parse(JSON.stringify(serieDate))
            vDate.name = that.data.ldata[k]
            vDate.data = v
            arr.push(vDate)
            console.log(arr, vDate)
        })

        option = {
            title: {
                text: this.data.title || ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: this.data.ldata
            },
            grid: {
                left: '3%',
                right: '6%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.data.xdata,
                name: "年份"
            },
            yAxis: {
                type: 'value',
                name: '药品种类数量'
            },
            backgroundColor: '#fff',
            series: arr
        }
        return option
    },
    // 嵌套环形图
    qthxt() {
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            title: {
                text: ' 药品抽验情况',
                x: 'center',
            },
            legend: {
                orient: 'vertical',
                x: 'left',

                data: ['国抽批次数', '市抽批次数', '其他', '合格', '不合格']
            },
            series: [{
                    name: '药品抽检情况',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '60%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: 1000, name: '国抽批次数' },
                        { value: 1600, name: '市抽批次数' },
                        { value: 800, name: '其他' }
                    ]
                },
                {
                    name: '药品抽检情况',
                    type: 'pie',
                    radius: ['60%', '75%'],
                    label: {
                        normal: {
                            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                            backgroundColor: '#eee',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            borderRadius: 4,
                            show: false,
                            // shadowBlur:3,
                            // shadowOffsetX: 2,
                            // shadowOffsetY: 2,
                            // shadowColor: '#999',
                            // padding: [0, 7],
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 16,
                                    lineHeight: 33
                                },
                                per: {
                                    color: '#eee',
                                    backgroundColor: '#334455',
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
                            }
                        }
                    },
                    data: [
                        { value: 800, name: '合格' },
                        { value: 200, name: '不合格' },
                        { value: 1500, name: '合格' },
                        { value: 100, name: '不合格' },
                        { value: 700, name: '合格' },
                        { value: 100, name: '不合格' },

                    ]
                }
            ]
        }
        return option
    },
    // 仪表盘
    ybp() {
        option = {
            title: {
                text: '抽验计划完成情况',
                x: 'center'
            },
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },

            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [{
                name: '业务指标',
                type: 'gauge',
                detail: { formatter: '{value}%' },
                data: [{ value: 66.66, name: '抽验计划完成率' }]
            }]
        };
        return option
    },
    // 耳机Bar
    twoBar() {

        option = {
            color: ['#003366', '#e5323e'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            title: {
                text: '药品抽检情况(按事二级分类)',
                x: 'left'
            },
            legend: {
                data: ['合格', '不合格']

            },
            calculable: true,
            xAxis: [{
                type: 'category',
                axisTick: { show: false },
                data: ['专题/专项抽验', '摸底性抽验', '评价性抽验', '监督性抽验', '涉案抽验']
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                    name: '合格',
                    type: 'bar',
                    barGap: 0,
                    data: [320, 332, 301, 334, 390]
                },
                {
                    name: '不合格',
                    type: 'bar',
                    data: [20, 12, 11, 34, 20]
                },

            ]
        };
        return option
    },
    twobar2() {
        option = {
            color: ['#003366', '#e5323e'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            title: {
                text: '各药品品种抽样情况',
                x: 'left'
            },
            legend: {
                data: ['合格', '不合格']

            },
            calculable: true,
            xAxis: [{
                type: 'category',
                axisTick: { show: false },
                data: ['H-化学药品', 'Z-中药', 'B-保健药品', 'S-生物制品', 'T-体外化学诊断试剂', 'F-药用辅料', 'J-进口分包装药品'],
                axisLabel: {
                    rotate: 25
                }
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                    name: '合格',
                    type: 'bar',
                    barGap: 0,
                    data: [320, 332, 301, 334, 390, 350, 320]
                },
                {
                    name: '不合格',
                    type: 'bar',
                    data: [20, 18, 19, 34, 20, 22, 20]
                },

            ]
        }
        return option
    },
    pie1() {
        option = {
            title: {
                text: this.data.name,
                x: 'center',
                y: 80
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['不合格数', '合格数'],
                top: 80
            },
            series: [{
                name: '抽样批次',
                type: 'pie',
                radius: '70%',
                center: ['50%', '60%'],
                data: [
                    { value: 10, name: '不合格数' },
                    { value: 335, name: '合格数' }

                ],
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        return option
    },
    linefiv() {
        option = {
            title: {
                text: '年度流通量大药品流通量变化趋势 ',
                top: 20
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['1号药品', '2号药品', '3号药品', '4号药品', '5号药品']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                    name: '1号药品',
                    type: 'line',
                    stack: '总量',
                    data: [234212, 435324, 235633, 245632, 234563, 234535, 234676, 234213, 234213, 123455, 123421]
                },
                {
                    name: '2号药品',
                    type: 'line',
                    stack: '总量',
                    data: [234213, 345445, 346323, 345636, 356757, 467544, 346456, 353453, 353563, 446464, 445345]
                },
                {
                    name: '3号药品',
                    type: 'line',
                    stack: '总量',
                    data: [454564, 457456, 467456, 467567, 476335, 463546, 456446, 456735, 463464, 462446, 462462]
                },
                {
                    name: '4号药品',
                    type: 'line',
                    stack: '总量',
                    data: [567566, 584674, 583536, 573463, 524356, 573775, 573246, 573573, 584684, 537337, 583583]
                },
                {
                    name: '5号药品',
                    type: 'line',
                    stack: '总量',
                    data: [69848, 68484, 694846, 684836, 626727, 673273, 737367, 788537, 763573, 737333, 734325]
                }
            ]
        }
        return option;
    },
    jgclfxBar() {

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            title: {
                text: this.data.title,
                top: 10,
                left: 10
            },
            legend: {
                data: ['企业数量']
            },
            xAxis: [{
                type: 'category',
                data: ['0', '1', '2', '3'],
                axisPointer: {
                    type: 'shadow'
                }
            }],
            yAxis: [{
                type: 'value',
                name: '企业数量'
            }],
            series: [{
                name: '企业数量',
                type: 'bar',
                data: this.data.data,
                barWidth: '30',
                barCategoryGap: '20',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [
                                { offset: 0, color: '#83bff6' },
                                { offset: 0.5, color: '#188df0' },
                                { offset: 1, color: '#188df0' }
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [
                                { offset: 0, color: '#2378f7' },
                                { offset: 0.7, color: '#2378f7' },
                                { offset: 1, color: '#83bff6' }
                            ]
                        )
                    }
                },
            }]
        };
        return option
    },
    setLine4() {
        option = {
            title: {
                text: '年度流通量排名前五医疗器械',
                top: 20
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['第五名', '第四名', '第三名', '第二名', '第一名']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                    name: '第五名',
                    type: 'line',
                    stack: '采购量',
                    areaStyle: { normal: {} },
                    data: [4534, 4634, 4452, 4526, 5784, 4673, 4678, 4673, 4673, 4689, 5213, 5323]
                },
                {
                    name: '第四名',
                    type: 'line',
                    stack: '采购量',
                    areaStyle: { normal: {} },
                    data: [5356, 5763, 5768, 5673, 5768, 5743, 5784, 5895, 5784, 5783, 5784, 5798]
                },
                {
                    name: '第三名',
                    type: 'line',
                    stack: '采购量',
                    areaStyle: { normal: {} },
                    data: [5756, 5789, 6789, 6895, 6885, 6837, 5784, 6342, 6884, 6895, 6943, 6846]
                },
                {
                    name: '第二名',
                    type: 'line',
                    stack: '采购量',
                    areaStyle: { normal: {} },
                    data: [6884, 6899, 6873, 6988, 6995, 7534, 6785, 7996, 7895, 7899, 6685, 7895]
                },
                {
                    name: '第一名',
                    type: 'line',
                    stack: '采购量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: { normal: {} },
                    data: [8688, 9656, 7689, 8966, 9665, 7855, 8685, 9668, 5888, 8998, 9678, 9665, 8564, ]
                }
            ]
        };
        return option
    },
    setOption() {
        this.myChart.setOption(this.option);
    },
    clickBack() {
        if (this.callback != 'undefined') {
            this.myChart.on('click', function(params) {
                this.callback(params)
            });
        }
    }
}