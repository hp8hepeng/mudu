$(function() {
    // var a = $.getJSON('../../echartDate/ywgl.json', function(data) {
    //     console.log(data)
    // })
    config = {}
    setTimeout(() => {
        config.a1 = $('#fd-E01').EasyChart({ 'title': '药品抽验情况' }, 'qthxt', function(parme) {
            // 回调 点击事件
            console.log(parme)
        })
        config.a2 = $('#fd-E02').EasyChart({}, 'ybp', function(parme) {
            // 回调 点击事件
            console.log(parme)
        })
        config.a3 = $('#fd-E03').EasyChart({}, 'twoBar', function(parme) {
            // 回调 点击事件
            console.log(parme)
        })
        config.a4 = $('#fd-E04').EasyChart({ "name": "抽样总批次（生产环节）" }, 'pie1', function(parme) {
            // 回调 点击事件
            console.log(parme)
        })

        config.a5 = $('#fd-E05').EasyChart({ "name": "流通环节" }, 'pie1', function(parme) {
            // 回调 点击事件
            console.log(parme)
        })
        config.a6 = $('#fd-E06').EasyChart({ "name": "使用环节" }, 'pie1', function(parme) {
            // 回调 点击事件
            console.log(parme)
        })
        config.a7 = $('#fd-E07').EasyChart({ "title": '各药品品种抽样情况' }, 'twobar2', function(parme) {
            // 回调 点击事件
            console.log(parme)
        })
    }, 50)
    window.onresize = function() {
        console.log(config)
        config.a1.myChart.resize()
        config.a2.myChart.resize()
        config.a3.myChart.resize()
        config.a4.myChart.resize()
        config.a5.myChart.resize()
        config.a6.myChart.resize()
        config.a7.myChart.resize()
    }
})