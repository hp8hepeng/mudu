$(function(){
    var myChartBar1 = echarts.init(document.getElementById("bar1"));
    var bar1option= {
        title: {
            text: '投诉举报数量',
            textStyle:{
                fontSize:30,
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['总数', '办结数', '查实数'],
            x:'left' ,
            y:'bottom',
            width:'5%'
        },
        grid: {
            left: '10%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel:{
                fontSize:18
            }
        },
        xAxis: {
            type: 'category',
            data: ['投诉','举报','咨询','意见建议','信访','纪检监察'],
            axisLabel:{
                fontSize:18
            }
        },
        series: [
            {
                name: '总数',
                type: 'bar',
                data: [10624, 108, 252, 132, 89, 1]
            },
            {
                name: '办结数',
                type: 'bar',
                data: [10301, 97, 248, 120, 87, 1]
            },
            {
                name: '查实数',
                type: 'bar',
                data: [8720, 62, 0, 0, 86, 1]
            }
        ]
    };
    myChartBar1.setOption(bar1option)

    //bar2
    var myChartBar2 = echarts.init(document.getElementById("bar2"));
    var bar2option = {
        title: {
            text: '来源类型',
            textStyle:{
                fontSize:30,
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel:{
                fontSize:18
            }
        },
        yAxis: {
            type: 'category',
            data: ['	中心邮箱	'	,'	非本市	'	,'	公众留言（外）	'	,'	市质监局	'	,'	局长信箱	'	,'	市长信箱	'	,'	其他	'	,'	市工商局	'	,'	12345热线	'	,'	市委市府信访办	'	,'	市公安局	'	,'	市卫生局	'	,'	国家局	'	,'	中心自接	'	,'	分局自接	'	,'	国家信访局	'	,'	公众留言（邮）	'	,'	市市场局党委	'	,'	外网	'	,'	国家局投诉举报中心	'	,'	其他上级单位	'	,'	本市	'	,'	信息中心	'	,'	其他平级单位	'	,'	市人大常委会信访办	'	,'	直属单位自接	'	,'	上海市人民政府办公室	'	],
            axisLabel:{
                fontSize:18
            }
        },
        series: [
            {
                type: 'bar',
                data: [11	,7	,69	,3	,76	,33	,22	,55	,23	,20	,31	,27	,95	,75	,37	,10	,39	,84	,63	,24	,66	,27	,40	,18	,38	,75	,73	,62	,]
            }
        ]
    };
    myChartBar2.setOption(bar2option)
    //pie
    var myChartpie1 = echarts.init(document.getElementById("pie1"));
    var myChartpie2 = echarts.init(document.getElementById("pie2"));
    var myChartpie3 = echarts.init(document.getElementById("pie3"));
    var pieOption={
        title : {
            text: '投诉方式',
            x:'center',
            y:'5%',
            textStyle:{
                fontSize:30,
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            data: ['信函','网络','留言','电话','来访','其他'],
            top:'center',
            left:'0',
            orient:'vertical'
        },
        series : [
            {
                name: '来源类型',
                type: 'pie',
                radius : '55%',
                center : ['50%','50%'],
                data:[
                    {value:335, name:'信函'},
                    {value:310, name:'网络'},
                    {value:234, name:'留言'},
                    {value:13500, name:'电话'},
                    {value:1548, name:'来访'},
                    {value:1548, name:'其他'}
                ],
                label:{
                    normal:{
                        fontSize:18,
                    }

                },
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

    var pie2Option={
        title : {
            text: '投诉产品分类',
            x:'center',
            y:'5%',
            textStyle:{
                fontSize:30,
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            data: ['原料药','化学药品','其他','中成药','中药材','医院制剂','中药饮片','生物制品','包材','辅料'],
            top:'center',
            left:'0',
            orient:'vertical'
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center : ['60%','50%'],
                data:[
                    {value:335, name:'原料药'},
                    {value:310, name:'化学药品'},
                    {value:2341, name:'其他'},
                    {value:135, name:'中成药'},
                    {value:148, name:'中药材'},
                    {value:18, name:'医院制剂'},
                    {value:234, name:'中药饮片'},
                    {value:135, name:'生物制品'},
                    {value:158, name:'包材'},
                    {value:48, name:'辅料'}
                ],
                label:{
                    normal:{
                        fontSize:18,
                    }

                },
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
    var pie3Option={
        title : {
            text: '办理结果',
            x:'center',
            y:'5%',
            textStyle:{
                fontSize:30,
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            data: ['解释说明','参考备案','未解决','实际解决','诉求过高'],
            top:'center',
            left:'10%',
            orient:'vertical'
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center : ['50%','50%'],
                data:[
                    {value:335, name:'解释说明'},
                    {value:110, name:'参考备案'},
                    {value:234, name:'未解决'},
                    {value:135, name:'实际解决'},
                    {value:48, name:'诉求过高'},
                ],
                label:{
                    normal:{
                        fontSize:18,
                    }

                },
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


    myChartpie1.setOption(pieOption)
    myChartpie2.setOption(pie2Option)
    myChartpie3.setOption(pie3Option)

    //bar3
    var myChartbar3 = echarts.init(document.getElementById("bar3"));
    var bar3option = {
        title: {
            text: '承办单位',
            textStyle:{
                fontSize:30,
            }

        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel:{
                fontSize:18
            }
        },
        xAxis: {
            type: 'category',
            data: ['黄浦区','徐汇区','长宁区','静安区','普陀区','虹口区','杨浦区','闵行区','宝山区','嘉定区','浦东区','金山区','松江区','青浦区','奉贤区','崇明区'],
            axisLabel:{
                fontSize:18
            }

        },
        series: [
            {
                type: 'bar',
                data: [11	,7	,69	,3	,76	,33	,22	,55	,23	,20	,31	,27	,95	,75	,37	,10]
            }
        ]
    };
    myChartbar3.setOption(bar3option);

})