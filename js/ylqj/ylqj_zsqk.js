$(function() {
    config = {}
    var setLine = {
        'ldata': ['库存', '销售', '购入'],
        'xdata': ['2015', '2016', '2017', '2018'],
        'data': [
            [120, 132, 101, 134, 90, 230, 210],
            [220, 182, 191, 234, 290, 330, 310],
            [150, 232, 201, 154, 190, 330, 410]
        ],
        'title': '医疗器械批发企业流通情况'
    }

    var setLine2 = {
        'ldata': ['库存', '销售', '购入'],
        'xdata': ['2015', '2016', '2017', '2018'],
        'data': [
            [120, 132, 101, 134, 90, 230, 210],
            [220, 182, 191, 234, 290, 330, 310],
            [150, 232, 201, 154, 190, 330, 410]
        ],
        'title': '医疗器械连锁企业流通情况'
    }

    var setLine3 = {
        'ldata': ['库存', '销售', '购入'],
        'xdata': ['2015', '2016', '2017', '2018'],
        'data': [
            [120, 132, 101, 134, 90, 230, 210],
            [220, 182, 191, 234, 290, 330, 310],
            [150, 232, 201, 154, 190, 330, 410]
        ],
        'title': '医疗器械零售企业流通情况'
    }
    setTimeout(() => {
        config.a1 = $('#fd-zsqk-chart01').EasyChart(setLine, 'setLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    config.a3 = $('#fd-zsqk-chart03').EasyChart(setLine2, 'setLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    config.a4 = $('#fd-zsqk-chart04').EasyChart(setLine3, 'setLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
}, 50);

    window.onresize = function() {
        config.a1.myChart.resize()
        config.a3.myChart.resize()
        config.a4.myChart.resize()
    }

})

// 药品批发企业购入药品种类数排名

// 药品批发企业销售药品种类数排名

// 库存


// 药品连锁   药品零售