$(function() {
    $('#Echarts-jdcl-o1').EasyChart(MultipleLine, 'MultipleLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    $('#Echarts-jdcl-o3').EasyChart(MultipleLine2, 'MultipleLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })

    $('#Echarts-jdcl-o2').EasyChart(MultipleLine3, 'MultipleLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
})