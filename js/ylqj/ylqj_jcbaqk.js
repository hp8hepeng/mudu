$(function() {
    var setLine1 = {
        'ldata': ['立案数', '结案数', '处罚数'],
        'xdata': ['2015', '2016', '2017', '2018'],
        'data': [
            [120, 132, 101, 134, 90, 230, 210],
            [220, 182, 191, 234, 290, 330, 310],
            [150, 232, 201, 154, 190, 330, 410]
        ],
        'title': '医疗器械生产企业稽查办案趋势'
    }

    var setLine2 = {
        'ldata': ['立案数', '结案数', '处罚数'],
        'xdata': ['2015', '2016', '2017', '2018'],
        'data': [
            [120, 132, 101, 134, 90, 230, 210],
            [220, 182, 191, 234, 290, 330, 310],
            [150, 232, 201, 154, 190, 330, 410]
        ],
        'title': '医疗器械经营企业稽查办案趋势'
    }
    config = {}

    setTimeout(() => {
        config.a1 = $('#fd-E01').EasyChart(setLine1, 'setLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    config.a2 = $('#fd-E02').EasyChart(setLine2, 'setLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
}, 50);

    window.onresize = function() {
        config.a1.myChart.resize()
        config.a2.myChart.resize()
    }

})
