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
                formatter: function(info) {
                    var value = info.data.value;
                    var type = ''
                    if (info.data.type == 'up') {
                        type = "↑"
                    } else if (info.data.type == 'down') {
                        type = "↓"
                    }
                    return [
                        '数据: ' + value + type,
                    ].join('');
                }
            },
            backgroundColor: '#FFF',
            label: {
                normal: {
                    position: 'insideTopLeft',
                    formatter: function(params) {
                        var arr = [
                            '{name|' + params.data.name + '}',
                            '{hr|}',
                            '{budget| ' + echarts.format.addCommas(params.data.value) + '}'
                        ];

                        // arr.push(
                        //     '{household| ' + echarts.format.addCommas(params.data.infovalue) + '}'
                        // );
                        return arr.join('\n');
                    },
                    rich: {
                        budget: {
                            fontSize: 22,
                            lineHeight: 30,
                            color: 'yellow'
                        },
                        household: {
                            fontSize: 14,
                            color: '#fff'
                        },
                        label: {
                            fontSize: 9,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            color: '#fff',
                            borderRadius: 2,
                            padding: [2, 4],
                            lineHeight: 25,
                            align: 'right'
                        },
                        name: {
                            fontSize: 12,
                            color: '#fff'
                        },
                        hr: {
                            width: '100%',
                            borderColor: 'rgba(255,255,255,0.2)',
                            borderWidth: 0.5,
                            height: 0,
                            lineHeight: 10
                        }
                    }
                }
            },
            series: [{
                type: 'treemap',
                itemStyle: {
                    normal: {
                        borderColor: '#fff'
                    }
                },
                data: this.data,
                color: ['#2894f2', '#9bcffd']
            }]
        }
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
    setOption() {
        this.myChart.setOption(this.option);
    },
    clickBack() {
        if (this.callback != 'undefined') {
            this.myChart.on('click', function(params) {
                console.log(params)
                this.callback(params)
            });
        }
    }
}