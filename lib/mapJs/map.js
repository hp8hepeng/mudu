// 读取json文件数据
var map = mapCharts.init(document.getElementsByClassName('js-map')[0]);
console.log(mapData);
var selectedMap;
map.setOption({
    data: mapData.mapData, //地图数据
    /*
     * 点击事件的回调函数
     * @param flag 为1表示地图点击
     * @param flag 为2表示轮循
     * */
    clickCallback: function(_that, areaData, flag, e) {
        //点击更新数据
        if (flag == 1) {
            if (selectedMap == areaData.mapId) {

            } else {}
            loopMap = areaData;
        }
        // 轮循更新数据
        loopMap = areaData;
    },
    /*
     * 点击空白区域事件的回调函数
     * @param areaData为地图数据
     * */
    blankclickCallback: function(areaData) {}
});