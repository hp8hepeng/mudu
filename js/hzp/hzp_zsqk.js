$(function() {
    config = {}
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