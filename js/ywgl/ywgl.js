$(function() {
    // var a = $.getJSON('../../echartDate/ywgl.json', function(data) {
    //     console.log(data)
    // })
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