$(function() {
    config = {}
    setTimeout(() => {
        config.a1 = $('#Echarts-jdcl-o1').EasyChart(MultipleLine, 'MultipleLine', function(parme) {
            // 回调 点击事件
            console.log(parme)
        })
        config.a2 = $('#Echarts-jdcl-o3').EasyChart(MultipleLine2, 'MultipleLine', function(parme) {
            // 回调 点击事件
            console.log(parme)
        })

        config.a3 = $('#Echarts-jdcl-o2').EasyChart(MultipleLine3, 'MultipleLine', function(parme) {
            // 回调 点击事件
            console.log(parme)
        })
    }, 50);

    window.onresize = function() {
        config.a1.myChart.resize()
        config.a2.myChart.resize()
        config.a3.myChart.resize()
    }

})