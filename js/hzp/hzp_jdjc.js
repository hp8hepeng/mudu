$(function() {
    var myChartpie1 = echarts.init(document.getElementById("pie1"));
    var myChartpie3 =echarts.init(document.getElementById("pie3"));
    var myChartpie6 =echarts.init(document.getElementById("pie6"));

    var optionPie  = {
        title : {
            text: '化妆品生产监管检查情况(监督分类)',
            x:'center',
            textStyle:{
                fontSize:16
            }

        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x:'left',
            data:['日常检查','专项检查','飞行检查','其他']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['60%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:335, name:'日常检查'},
                    {value:310, name:'专项检查'},
                    {value:234, name:'飞行检查'},
                    {value:135, name:'其他'}
                ]
            }
        ]
    };
    myChartpie1.setOption(optionPie)
    optionPie.title.text="化妆品经营监管检查情况（监督分类）"
    myChartpie6.setOption(optionPie)


    var myChartpie1 = echarts.init(document.getElementById("pie2"));
    var myChartpie7 = echarts.init(document.getElementById("pie7"));
    var myChartpie2opiton = {
        title : {
            text: '检查合格率',
            x:'center',
            textStyle:{
                fontSize:22
            }
        },
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
            {
                name: '业务指标',
                type: 'gauge',
                detail: {formatter:'{value}%'},
                data: [{value: 85, name: '合格率'}]
            }
        ]
    };

    myChartpie1.setOption(myChartpie2opiton)
    myChartpie7.setOption(myChartpie2opiton)


    //pie
    var myChartpie4 = echarts.init(document.getElementById("pie4"));
    var myChartpie5 = echarts.init(document.getElementById("pie5"));
    var myChartpie8 = echarts.init(document.getElementById("pie8"));
    var myChartpie9 = echarts.init(document.getElementById("pie9"));
    var myChartpie10 = echarts.init(document.getElementById("pie10"));
    var pie4option = {
        title  : {
            text: '化妆品生产监管检查结果情况（日常检查）',

            x:'center',
            textStyle:{
                fontSize:16
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x:'left',
            data: ['合格','不合格']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                    {value:1335, name:'合格'},
                    {value:31, name:'不合格'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChartpie3.setOption(pie4option);
    pie4option.title.text="化妆品生产监管检查结果情况（专项检查)"
    myChartpie4.setOption(pie4option);
    pie4option.title.text="化妆品生产监管检查结果情况（飞行检查)"
    myChartpie5.setOption(pie4option)
    pie4option.title.text="化妆品经营监管检查结果情况（日常检查)"
    myChartpie8.setOption(pie4option)
    pie4option.title.text="化妆品经营监管检查结果情况（专项检查)"
    myChartpie9.setOption(pie4option)
    pie4option.title.text="化妆品经营监管检查结果情况（飞行检查)"
    myChartpie10.setOption(pie4option)



})