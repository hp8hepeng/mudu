$(function() {
    var myChartpie1 = echarts.init(document.getElementById("pie1"));
    var myChartpie3 =echarts.init(document.getElementById("pie3"));
    var myChartpie6 =echarts.init(document.getElementById("pie6"));

    var optionPie  = {
        title : {
            text: '药品生产监管检查情况（监督分类）',
            x:'center',
            textStyle:{
                fontSize:30
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
            data:['日常检查','GMP跟踪检查','飞行检查','其他']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
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
                    {value:310, name:'GMP跟踪检查'},
                    {value:234, name:'飞行检查'},
                    {value:135, name:'其他'}
                ]
            }
        ]
    };
    myChartpie1.setOption(optionPie)
    optionPie.title.text="药品流通监管检查情况（监督分类）"
    myChartpie6.setOption(optionPie)


    var myChartpie1 = echarts.init(document.getElementById("pie2"));
    var myChartpie7 = echarts.init(document.getElementById("pie7"));
    var myChartpie2opiton = {
            title : {
                text: '检查合格率',
                x:'center',
                textStyle:{
                    fontSize:30
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
            text: '药品生产监管检查结果情况（日常检查）',

            x:'center',
            textStyle:{
                fontSize:30
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
    pie4option.title.text="药品生产监管检查结果情况（GMP跟踪检查)"
    myChartpie4.setOption(pie4option);
    pie4option.title.text="药品生产监管检查结果情况（飞行检查)"
     myChartpie5.setOption(pie4option)
    pie4option.title.text="药品流通监管检查结果情况（网上检查)"
    myChartpie8.setOption(pie4option)
    pie4option.title.text="药品流通监管检查结果情况（日常监管)"
    myChartpie9.setOption(pie4option)
    pie4option.title.text="药品流通监管检查结果情况（专项检查)"
    myChartpie10.setOption(pie4option)



    //pie5
    var myChartpie11 = echarts.init(document.getElementById("pie11"));
    var myChartpie12 = echarts.init(document.getElementById("pie12"));
    var myChartpie13 = echarts.init(document.getElementById("pie13"));
    var optionPie5  = {
        title : {
            text: '药品网上检查情况（企业类型）',
            x:'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            y:'bottom',
            data:['药品批发企业','药品连锁企业','药品零售企业','合格','不合格'],
            selectedMode:false
        },
        series: [
            {
                name:'企业类型',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '70%'],

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
                data:[
                    {value:335, name:'药品批发企业'},
                    {value:800, name:'药品连锁企业'},
                    {value:1500, name:'药品零售企业'}
                ]
            },
            {
                name:'',
                type:'pie',
                radius: ['60%', '75%'],
                label: {
                    normal: {
                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                        backgroundColor: '#eee',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        show:false,
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
                data:[
                    {value:300, name:'合格'},
                    {value:35, name:'不合格'},
                    {value:500, name:'合格'},
                    {value:300, name:'不合格'},
                    {value:1200, name:'合格'},
                    {value:300, name:'不合格'}
                ]
            }
        ]
    };
    myChartpie11.setOption(optionPie5)
    console.log(optionPie5)
    optionPie5.title.text="药品日常监管情况（企业类型）"

    myChartpie12.setOption(optionPie5)
    optionPie5.title.text="药品专项检查情况（企业类型）"
    myChartpie13.setOption(optionPie5)
})