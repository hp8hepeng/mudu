var treemap = [{
        "name": "零售企业",
        "value": 410,
        "type": "up",
        "children": [{
            "name": "零售企业",
            "value": 400,
            "type": ""
        }, {
            "name": "零售企业",
            "value": 10,
            "type": ""
        }]
    },
    {
        "name": "连锁企业",
        "value": 52,
        "type": "up",
        "children": [{
            "name": "",
            "value": 2,
            "type": "",
        }, {
            "name": "连锁企业",
            "value": 50,
            "type": "up",
        }]
    },
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
            "type": "down",
        }]
    },
    {
        "name": "医疗机构",
        "value": 200,
        "type": "center"
    },
    {
        "name": "批发企业",
        "value": 760,
        "type": "up",
        "children": [{
            "name": "",
            "value": 10,
            "type": "",
        }, {
            "name": "批发企业",
            "value": 750,
            "type": "up",
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
    'xdata': ['生产环节', '经营环节', '使用环节'],
    'data': [
        [2300, 2300, 2300],
        [650, 650, 650]
    ],
    color: ['#9785f1', '#26c6da', '#1e88e5', '#edba62']
}
var arcLine = {
    'ldata': ['新办', '变更', '注销', '延续'],
    'xdata': ['第一季度', '第二季度', '第三季度', '第四季度'],
    'data': [
        [0, 132, 101, 134, 90, 230, 210],
        [0, 182, 191, 234, 290, 330, 310],
        [0, 232, 201, 154, 190, 330, 410],
        [0, 332, 301, 334, 390, 330, 320]
    ],
    color: ['#9785f1', '#26c6da', '#1e88e5', '#edba62']
}