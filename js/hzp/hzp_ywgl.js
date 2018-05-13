$(function() {
    // var a = $.getJSON('../../echartDate/ywgl.json', function(data) {
    //     console.log(data)
    // })
    var treemap = [

        {
            "name": "生产企业",
            "value": 202,
            "type": "down",
            "children": [{
                "name": "",
                "value": 2,
                "type": "",
            }, {
                "name": "生产企业",
                "value": 200,
                "type": "left",
            }]
        },
        {
            "name": "经营企业",
            "value": 760,
            "type": "up",
            "children": [{
                "name": "",
                "value": 10,
                "type": "",
            }, {
                "name": "批发企业",
                "value": 750,
                "type": "right",
            }]

        }
    ];

    var Pielinkage3 = [
        [
            { value: 30, name: '合格' },
            { value: 20, name: '不合格' },
            { value: 50, name: '限期整改' }
        ],
        [
            { value: 35, name: '合格' },
            { value: 25, name: '不合格' },
            { value: 40, name: '限期整改' }
        ],
        [
            { value: 40, name: '合格' },
            { value: 20, name: '不合格' },
            { value: 40, name: '限期整改' }
        ]
    ];

    var MultipleLine = {
        'ldata': ['立案书', '结案数', '处罚数', '案源数'],
        'xdata': ['药品', '药材包', '医疗机构制剂'],
        'data': [
            [2300, 2300, 2300],
            [650, 650, 650],
            [2300, 2300, 2300],
            [650, 650, 650]
        ],
        color: ['#9785f1', '#26c6da', '#1e88e5', '#edba62']
    }

    var MultipleLine2 = {
        'ldata': ['合格批次数', '不合格批次数'],
        'xdata': ['生产环节', '经营环节'],
        'data': [
            [2300, 2300],
            [650, 650]
        ],
        color: ['#9785f1', '#26c6da', '#1e88e5', '#edba62']
    }

    var arcLine = {
        'ldata': ['新办', '变更', '注销', '延续'],
        'xdata': ['第一季度', '第二季度', '第三季度', '第四季度'],
        'data': [
            [0, 132, 101, 134, 90, 230, 210],
            [0, 182, 191, 234, 290],
            [0, 232, 201, 154, 190],
            [0, 332, 301, 334, 390]
        ],
        color: ['#9785f1', '#26c6da', '#1e88e5', '#edba62']
    }

    var arcLine2 = {
        'ldata': ['2018年每月销售总量', '2017年每月销售总量', '2017年每月进货总量', '2018年每月进货总量'],
        'xdata': ['一月', '二月', '三月', '四月', '五月', '六月', '七月',
            '八月', '九月', '十月', '十一月', '十二月'
        ],
        'data': [
            [0, 132, 101, 134, 90, 230, 210, 234, 123, 768, 234, 213],
            [0, 182, 191, 234, 290, 330, 310, 143, 234, 56, 324, 213],
            [0, 232, 201, 154, 190, 330, 410, 321, 534, 221, 234, 123],
            [0, 332, 301, 334, 390, 330, 320, 213, 213, 432, 123, 42]
        ],
        color: ['#9785f1', '#26c6da', '#1e88e5', '#edba62']
    }
    config = {}
    setTimeout(() => {
        config.a1 = $('#jgxdr').EasyChart(treemap, 'Treemap', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    config.a2 = $('#jdjc').EasyChart(Pielinkage3, 'Pielinkage3', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    config.a3 = $('#jcba').EasyChart(MultipleLine, 'MultipleLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    config.a4 = $('#cjqk').EasyChart(MultipleLine2, 'MultipleLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    config.a5 = $('#xzsp').EasyChart(arcLine, 'arcLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    config.a6 = $('#ltqk').EasyChart(arcLine2, 'arcLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
}, 50);

    window.onresize = function() {
        console.log(config)
        config.a1.myChart.resize()
        config.a2.myChart.resize()
        config.a3.myChart.resize()
        config.a4.myChart.resize()
        config.a5.myChart.resize()
        config.a6.myChart.resize()
    }

})