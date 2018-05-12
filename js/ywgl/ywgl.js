$(function() {
    // var a = $.getJSON('../../echartDate/ywgl.json', function(data) {
    //     console.log(data)
    // })
    $('#jgxdr').EasyChart(treemap, 'Treemap', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    $('#jdjc').EasyChart(Pielinkage3, 'Pielinkage3', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    $('#jcba').EasyChart(MultipleLine, 'MultipleLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    $('#cjqk').EasyChart(MultipleLine2, 'MultipleLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    $('#xzsp').EasyChart(arcLine, 'arcLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
    $('#ltqk').EasyChart(arcLine2, 'arcLine', function(parme) {
        // 回调 点击事件
        console.log(parme)
    })
})