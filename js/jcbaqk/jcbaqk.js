$(function() {
    config = {}
    setTimeout(() => {
        config.a1 = $('#fd-E01').EasyChart(setLine1, 'setLine', function(parme) {
            // 回调 点击事件
            console.log(parme)
        })
        config.a2 = $('#fd-E02').EasyChart(setLine1, 'setLine', function(parme) {
            // 回调 点击事件
            console.log(parme)
        })
    }, 50);

    window.onresize = function() {
        config.a1.myChart.resize()
        config.a2.myChart.resize()
    }

})