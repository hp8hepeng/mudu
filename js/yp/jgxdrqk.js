
$(function(){
    alert("aaa")
    var myChart = echarts.init(document.getElementById("line"));
    var mychart_line3 =echarts.init(document.getElementById("line3"));
    var mychart_line4 =echarts.init(document.getElementById("line4"));
    var mychart_line5 = echarts.init(document.getElementById("line5"));

    var option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        title:{
            text:'各区药品生产企业分布情况'
        },

        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value',
            splitLine:{
                show:false
            },
            axisLabel: {
                fontSize:18
            }
        },

        yAxis: {
            type: 'category',
            data: ['黄浦区','徐汇区','长宁区','静安区','普陀区','虹口区','杨浦区','闵行区','宝山区','嘉定区','浦东区','金山区','松江区','青浦区','奉贤区','崇明区'],

            axisLabel: {
                rotate: 25,
                fontSize:18
            }
        },

        series: [
            {
                name: '合格',
                type: 'bar',
                itemStyle:{
                    normal:{
                        color:"#5ab2fa",
                    }

                },
                stack: '总量',

                label: {
                    normal: {
                        show: true,
                        position: 'insideRight',
                        fontSize:18
                    }
                },
                data: [30, 12, 11, 14, 19, 30, 50,20, 9, 14, 1, 21, 10, 15,28, 29]
            }
        ]
    };
    myChart.setOption(option)
    option.title.text="各区药品经营企业分布情况";
     mychart_line3.setOption(option)
    option.title.text ="各区医疗机构制剂室分布情况";
    mychart_line4.setOption(option)
    option.title.text ="各区药品包装材料生产企业分布情况"
    mychart_line5.setOption(option)




    //pie
    var myChart2_1= echarts.init(document.getElementById("pie2"));
     var myChart2 = echarts.init(document.getElementById("pie"));
    var myChart_pie_4= echarts.init(document.getElementById("pie4"));
    var myChart_pie_5=echarts.init(document.getElementById("pie5"));
     var option2 = {
        title : {
            text: '各区已注销药品生产企业的数量',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series : [
            {
                label:{
                    formatter:'{b} {c}家（{d}%）',
                    normal: {
                        show: true,
                        position: 'insideRight',
                        fontSize:18
                    }
                },
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:2, name:'黄浦区'},
                    {value:3, name:'徐汇区'},
                    {value:24, name:'长宁区'},
                    {value:5, name:'静安区'},

                    {value:5, name:'虹口区'},
                    {value:10, name:'杨浦区'},
                    {value:14, name:'闵行区'},
                    {value:13, name:'宝山区'},

                    {value:5, name:'嘉定区'},
                    {value:10, name:'浦东区'},
                    {value:9, name:'金山区'},
                    {value:7, name:'松江区'},

                    {value:4, name:'青浦区'},
                    {value:6, name:'奉贤区'},
                    {value:8, name:'崇明区'},

                    {value:8, name:'普陀区'}
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
    myChart2.setOption(option2)
    option2.title.text="各区已注销药品生产企业的数量"
    myChart2_1.setOption(option2)
    option2.title.text="各区已注销医疗机构制剂室的数量"
    myChart_pie_4.setOption(option2)
    option2.title.text ="各区已注销药品包装材料生产企业分布情况"
    myChart_pie_5.setOption(option2)
})
