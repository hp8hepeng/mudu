$(function(){
    var myChartBar1 = echarts.init(document.getElementById("bar1"));
    var optionbar = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        title:{
            text:' 医疗器械行政审批情况'
        },
        legend: {
            data: ['开办', '登记备案','许可','许可变更','许可延续']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis:  {
            type: 'value',
            axisLabel: {
                fontSize:18
            }
        },
        xAxis: {
            type: 'category',
            data: ['黄浦区','徐汇区','长宁区','静安区','普陀区','虹口区','杨浦区','闵行区','宝山区','嘉定区','浦东区','金山区','松江区','青浦区','奉贤区','崇明区'],

            axisLabel: {
                rotate: 0,
                fontSize:18
            }
        },
        label: {
            normal: {
                show: true,
                position: 'insideRight',
                fontSize:18,
            }
        },
        series: [
            {
                name: '开办',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight',
                        // fontSize:18,
                    }
                },
                data: [320, 302, 301, 334, 390, 330, 320,320, 302, 301, 334, 390, 330, 320,320, 302]
            },
            {
                name: '登记备案',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132]
            },
            {
                name: '许可',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310,220, 182]
            },
            {
                name: '许可变更',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [150, 212, 201, 154, 190, 330, 410,150, 212, 201, 154, 190, 330, 410,212, 201]
            },
            {
                name: '许可延续',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320,820, 832, 901, 934, 1290, 1330, 1320, 832, 901]
            }
        ]
    };
    myChartBar1.setOption(optionbar)
})