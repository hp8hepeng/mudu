/**
 * @file operateMap.js
 * @author xieyq on 2017/7/12.
 * @version 1.0.0
 * @description 热力图svg操作的js文件
 */


//定义地图图形的方法
var mapCharts = {
    version: '1.0.1' //mapCharts版本
};
mapCharts.init = function(dom) {
    var charts = new MapCharts(dom);
    return charts;
};

/*00000000000000000000000000000000000
 * 地图图形的构造方法
 * */
function MapCharts(dom) {
    this.dom = dom; //设置对应的dom元素
}

/*
 * 对象对应的属性方法
 * */
MapCharts.prototype = {
    /*
     * 设置参数选项
     * */
    setOption: function(options) {

        var areaValue = sessionStorage.getItem("areaData");
        var mapid;
        if (areaValue != null) {
            mapid = "mapid-" + sessionStorage.getItem("areaData")
        } else {
            mapid = "mapid-110011011104"
        }
        console.log(areaValue)
        var _this = this;
        _this.defaultOptions = {
            isShowErrorLog: false, // 是否显示错误日志
            snap: '',
            tooltip: {
                show: true,
                showHead: true,
                id: 'tips',
                formatter: function() {},
                style: {}
            },
            mapId: '190000', //对应的地图mapId
            isMaxMap: true,
            mapTimer: null, //地图区域轮循定时器
            index: 0, //轮循是对应id 索引
            flag: 1,
            mapCount: [],
            xsMaxValue: 0,
            xsMinValue: 0,
            randomId: mapid, //页面加载第一次区域随机id
            //isPerspective: true, // 是否倾斜
            //perspectiveId: '#perspective', // 倾斜id
            //perspectiveStyle: {
            //    scaleX: '1', // 缩放的比例
            //    scaleY: '0.5'
            //},
            //强调的id
            emphasizeId: ['110011300001', '110011310001'],
            // 地图参数
            mapStyle: {
                map: {
                    fill: 'rgba(20,167,209,0.3)',
                    stroke: '#3c66ac'
                },
                mapBj: {
                    fill: '#e27934',
                    shadow: {
                        x: 15,
                        y: 20,
                        radius: 15,
                        color: 'rgba(0,0,0,0.5)' //Snap.filter.shadow(30, 30, 15,'#2badfd')
                    },
                    stroke: '#3c66ac',
                    strokeWidth: 1
                },
                areaMap: {
                    fill: 'rgba(36,62,112,.2)',
                    stroke: '#3684a8',
                    strokeWidth: 15,
                    outlineStroke: '#3684a8',
                    outlineFill: '#3684a8',
                    textFill: '#fff',
                    hoverFill: 'rgba(240,202,56,.2)', //地图划过区域颜色
                    clickFill: 'rgba(240,202,56,.2)', //地图点击区域颜色
                    clickStroke: '#5bd6ff' //地图点击区域描边颜色
                },
                circle: {
                    stroke: '#ffc320',
                    r: 50,
                    fill: '#ffc320' //圆的填充颜色
                },
                textStyle: {
                    fontSize: 70,
                    fill: '#fff',
                    hoverFill: '#fff',
                    shadow: {
                        x: 30,
                        y: 40,
                        radius: 25,
                        color: '#000' //Snap.filter.shadow(30, 30, 15,'#2badfd')
                    }
                },
                emphasisTextStyle: {
                    fontSize: 60,
                    fontWeight: 'bold',
                    fill: '#fff'
                },
                relativeWidth: 6028
            },
            // areaMapColor: ['#fff'],
            data: {}, //对应的数据对象
            setGray: '#3c66ac', //灰色
            setGrayStroke: '#333',
            mapidPrefix: 'mapid-', // mapid 的前缀
            activeMapId: '', //区分hover 和click 事件 切换id
            Matrix: '', //地图矩阵变量
            //选中范围中的视觉元素
            inRange: {
                //颜色
                color: ['rgba(16,52,85,.5)']
            },
            ///设置分段数
            STEPS: 200,
            splitNumber: 2, //对于分段型数据，自动分成几段
            //动画坐标参数
            animateParams: {
                cx: 0,
                cy: 0,
                id: 0,
                fyName: ''
            },
            animateObj: {},
            clickCallback: function(_this, dataList, flag) {

            },
            blankclickCallback: function(dataList) {}

        };

        // 合并参数
        _this.opts = $.fn.extend(true, {}, _this.defaultOptions, options || {});
        _this.init(); //调用初始化方法
    },
    /*
     * 处理地图数据
     * */
    handleMapData: function() {
        var _this = this;
        var data = _this.areaMapDataSource; //获取对应的数据
        //如果是全国地图 需要处理新疆的数据
        if (_this.opts.mapId === '000000') {
            var xj = data['520000'],
                bt = data['480000'];
            data.xinjiangGroup = {
                "name": "贵州",
                "cjaj": parseInt(xj.cjaj) + parseInt(bt.cjaj),
                "hgaj": parseInt(xj.hgaj) + parseInt(bt.hgaj),
                "ajhgl": (parseFloat(xj.ajhgl) + parseFloat(bt.ajhgl)) / 2
            }
        }
    },
    /*
     * 地图图形的初始化方法
     * */
    init: function() {
        var _this = this;
        //请求svg地图
        _this.requestSvgMap('../../modu/svg/mapid-' + _this.opts.mapId + '.svg');
    },
    /*
     * 设置svg地图
     * */
    setSvgMap: function(response) {
        var _this = this;
        // 地图加载完毕
        _this.dom.innerHTML = response;

        var snap = Snap('#svgMap');
        snap.attr({
            width: '100%',
            height: '100%'
        });
        _this.snap = snap;
        _this.render(); //渲染地图
    },
    /*
     * 请求svg地图
     * */
    requestSvgMap: function(url) {
        var _this = this;
        _this.setSvgMap(response); //设置svg地图
        //  加载svg地图
        // $.ajax({
        //     type: "GET",
        //     url: url,
        //     dataType: 'text',
        //     success: function(response) {
        //         _this.setSvgMap(response); //设置svg地图
        //     },
        //     error: function(info) {
        //         throw new Error('加载地图失败' + info);
        //     }
        // });
    },
    /*
     * 渲染svg
     * */
    render: function() {
        var _this = this;
        //设置地图样式
        this.setMapStyle();
        //赋值渐变颜色
        _this.gradientColor = this.gradientColors(_this.opts.inRange.color, _this.opts.STEPS);

        //处理地图数据，主要是为了解决新疆、兵团的数据
        this.handleMapData();
        //创建提示框
        this.createTipBox();
        //初始化地图区域
        this.initAreaMap();

        this.setAreaMapFillColor(); //设置区域填充颜色
        //添加区域交互动效
        this.addAreaMapInteraction();
        //获取所有圆属性
        this.getCirclePosition();
        //创建地图区域连接线
        //this.createConnectLine();

        //执行地图动画圆
        _this.opts.animateObj = this.operateAnimateCircle(_this.opts.animateParams.cx, _this.opts.animateParams.cy, _this.opts.animateParams.id, _this.opts.animateParams.fyName);
        //页面加载首先执一次动画
        this.mapAreaClick(_this.opts.randomId, 2);
        //地图区域轮循展示
        //          this.loopMapArea(_this.opts.index);
        // 地图运动线
        this.showAnimateLine();

    },
    // 检测当前浏览器是否是ie 是ie则返回false
    checkIE: function() {
        if ((navigator.userAgent.indexOf('MSIE') >= 0) &&
            (navigator.userAgent.indexOf('Opera') < 0)) {
            // alert('你是使用IE')
            return false;
        } else if (navigator.userAgent.indexOf('Firefox') >= 0) {
            return true;
        } else if (navigator.userAgent.indexOf('Opera') >= 0) {
            return true;
        } else {
            return true;
        }
    },
    /*
     * 设置地图的样式外观
     * */
    setMapStyle: function() {
        var _this = this;
        var snap = _this.snap;

        // 是否显示错误日志
        _this.isShowErrorLog = _this.opts.isShowErrorLog;
        // 区域文本
        _this.areaText = [];

        // mapid 前缀
        _this.mapidPrefix = _this.opts.mapidPrefix;

        // 是否是大地图
        _this.isMaxMap = _this.opts.isMaxMap;

        // 视窗对象
        _this.viewBox = _this.snap.attr('viewBox');

        // map style
        _this.mapStyle = _this.opts.mapStyle;

        // 是否倾斜
        _this.isPerspective = _this.opts.isPerspective;

        //设置全局矩阵变量Matrix
        //_this.Matrix = _this.opts.Matrix;

        // 地图的比值
        _this.mapRatio = Math.max(_this.viewBox.width / _this.mapStyle.relativeWidth,
            _this.viewBox.height / _this.mapStyle.relativeWidth);

        function changeMapStyle() {

            // 设置地图描边的大小
            _this.mapStyle.map.strokeWidthRatio = _this.mapStyle.map.strokeWidth * _this.mapRatio;

            // 设置阴影大小
            _this.mapStyle.mapBj.shadowFilter = Snap.filter.shadow(
                _this.mapStyle.mapBj.shadow.x * _this.mapRatio,
                _this.mapStyle.mapBj.shadow.y * _this.mapRatio,
                _this.mapStyle.mapBj.shadow.radius * _this.mapRatio,
                _this.mapStyle.mapBj.shadow.color);

            // 设置地图字体大小
            var fontSize = _this.mapStyle.textStyle.fontSize * _this.mapRatio;
            //检测是否是IE
            if (!_this.checkIE()) {
                fontSize = _this.mapStyle.textStyle.fontSize * _this.mapRatio * 1.5;
            }
            _this.mapStyle.textStyle.fontSizeRatio = fontSize;

            // 设置强调字体大小
            var emphasisFontSize = _this.mapStyle.emphasisTextStyle.fontSize * _this.mapRatio;
            //检测是否是IE
            if (!_this.checkIE()) {
                emphasisFontSize = _this.mapStyle.emphasisTextStyle.fontSize * _this.mapRatio * 1.5;
            }
            _this.mapStyle.emphasisTextStyle.fontSizeRatio = emphasisFontSize;

            // 圆半径
            _this.mapStyle.circle.rRatio = _this.mapStyle.circle.r * _this.mapRatio;

            //areaMap边框
            _this.mapStyle.areaMap.strokeWidthRatio = _this.mapStyle.areaMap.strokeWidth * _this.mapRatio;

            //dataText shadow
            _this.mapStyle.textStyle.shadowFilter = Snap.filter.shadow(
                _this.mapStyle.textStyle.shadow.x * _this.mapRatio,
                _this.mapStyle.textStyle.shadow.y * _this.mapRatio,
                _this.mapStyle.textStyle.shadow.radius * _this.mapRatio,
                _this.mapStyle.textStyle.shadow.color);
        }

        // 根据不同的尺寸设置不同的样式
        changeMapStyle();

        // 设置区域颜色
        _this.areaMapColor = _this.opts.areaMapColor;

        // 数据源对象
        _this.areaMapDataSource = _this.opts.data;


        // 地图背景样式
        +

        function setMapBjStyle() {
            _this.mapPathBjG = snap.select('#svgMapBj');

            _this.snap.selectAll('path').attr({
                stroke: _this.mapStyle.mapBj.stroke,
                fill: _this.opts.setGray // 默认设置灰色
            });
            // 隐藏所有的 -outline
            $('[id$="-outline"]').css({
                display: 'none'
            });

            if ($('#xinjiang-group').length) {
                $('#xinjiang-outline').css({
                    display: 'block'
                });
            }

            _this.mapPathBjGPath = _this.mapPathBjG
                .selectAll('path');
            _this.mapPathBjGPath.attr({
                display: 'block',
                fill: _this.opts.setGray, //_this.mapStyle.mapBj.fill,
                filter: snap.paper.filter(_this.mapStyle.mapBj.shadowFilter),
                stroke: _this.mapStyle.mapBj.stroke,
                strokeWidth: _this.mapStyle.mapBj.strokeWidthRatio
            });


        }();

        if (_this.snap.select('	#mapid-nansha')) {
            _this.snap.select('#mapid-nansha').attr({
                fill: 'rgba(255,255,255,1)', // 'rgba(168,208,248,0.8)',
                stroke: '#6699cc', // _this.mapStyle.mapBj.stroke,
                strokeWidth: '6px'
            });
        }

        // 设置默认元素
        +

        function setOriginalElement() {
            //_this.snap.selectAll('text').remove(); // 移除默认文本
            _this.snap.selectAll('circle').attr({ // 隐藏所有的圆
                display: 'none'
            });
            _this.snap.selectAll('polily').attr({ // 隐藏所有的圆
                display: 'none'
            });
            // 移除默认文本
            _this.snap.selectAll('ellipse').attr({ // 隐藏所有的圆
                visibility: 'hidden',
                fill: '#fff'
            });
        }();


        //if (_this.isPerspective) {
        //    _this.perspectiveBox = _this.snap.select('#perspective').getBBox();
        //    //console.log(_this.perspectiveBox);
        //    _this.snap.select(_this.opts.perspectiveId).attr({
        //        transform: 'scale(' + _this.opts.perspectiveStyle.scaleX + ',' + _this.opts.perspectiveStyle.scaleY + ') translate(0,' + (_this.perspectiveBox.height - _this.perspectiveBox.height * _this.opts.perspectiveStyle.scaleY) * 1.2 + ')'
        //    });
        //}
        //    console.log(_this.perspectiveBox.height)
        //
        //    console.log((_this.perspectiveBox.height - _this.perspectiveBox.height * _this.opts.perspectiveStyle.scaleY) * 1.2)
        ////创建矩阵对象
        //_this.Matrix = new Snap.Matrix(1,0,0,1,0,0);
        ////处理矩阵缩放
        //_this.Matrix.scale(_this.opts.perspectiveStyle.scaleX,_this.opts.perspectiveStyle.scaleY);
        ////处理矩阵偏移
        //_this.Matrix.translate(0,(_this.perspectiveBox.height - _this.perspectiveBox.height * _this.opts.perspectiveStyle.scaleY) * 1.2 );

    },
    /*
     * 初始化区域地图
     * */
    initAreaMap: function() {
        var _this = this;
        // 创建一个包含所有区域的地图对象
        _this.areaMapSet = {}; //设置集合,用来处理鼠标交互事件
        _this.areaMap = {}; //区域地图
        _this.areaMapData = {}; //地图数据
        _this.areaMapCircle = {}; //地图圆
        _this.areaMapText = {}; //地图文本
        _this.mapIdArr = []; //存放地图区域的mapId数组
        _this.areaMapEmphasisText = {}; //强调的文本


        //设置地图文本样式
        _this.snap.selectAll('text').attr({
            fontSize: _this.mapStyle.textStyle.fontSizeRatio + 'px',
            fill: _this.mapStyle.textStyle.fill,
            // filter: _this.snap.filter(_this.mapStyle.textStyle.shadowFilter),
            fontFamily: 'Microsoft YaHei',
            textAnchor: 'middle',
            dominantBaseline: 'middle',
            cursor: 'pointer'
        });

        $.each(_this.areaMapDataSource, function(index, value) {
            _this.opts.mapCount.push(value.xs);
        });
        //假设第一个值为最大值
        _this.opts.xsMaxValue = _this.opts.mapCount[0];
        //假设第一个值为最小值
        _this.opts.xsMinValue = _this.opts.mapCount[0];
        for (var i = 0; i < _this.opts.mapCount.length; i++) {
            if (_this.opts.mapCount[i] > _this.opts.xsMaxValue) {
                _this.opts.xsMaxValue = _this.opts.mapCount[i];
            }
            if (_this.opts.mapCount[i] < _this.opts.xsMinValue) {
                _this.opts.xsMinValue = _this.opts.mapCount[i];
            }
        }
        //遍历数据对象
        for (var mapId in _this.areaMapDataSource) {

            _this.mapIdArr.push(mapId); //存放数组法院id

            // 区域数据对象
            _this.areaMapData[_this.mapidPrefix + mapId] = _this.areaMapDataSource[mapId];
            _this.areaMapData[_this.mapidPrefix + mapId].mapId = mapId;

            _this.areaMapSet[_this.mapidPrefix + mapId] = _this.snap.selectAll('#' + _this.mapidPrefix + mapId + '-outline');
            _this.areaMapSet[_this.mapidPrefix + mapId].clear();

            var cursor = 'default';
            if (/[0-9]+(0000)$/.test(mapId) || /^[A-Za-z]/.test(mapId)) {
                cursor = 'pointer';
            }

            // 判断区域对象是否存在
            if ($('#' + _this.mapidPrefix + mapId + '-outline').length > 0) {
                // 区域对象
                _this.areaMap[_this.mapidPrefix + mapId] = _this.snap.select('#' + _this.mapidPrefix + mapId + '-outline');
                //设置对应的样式
                _this.areaMap[_this.mapidPrefix + mapId].attr({
                    stroke: _this.mapStyle.areaMap.outlineStroke,
                    strokeWidth: _this.mapStyle.areaMap.strokeWidthRatio,
                    fill: _this.mapStyle.areaMap.outlineFill,
                    cursor: cursor,
                    display: 'block'
                }).data('data', _this.areaMapData[_this.mapidPrefix + mapId]).data('isActive', false).data('index', _this.mapIdArr.length); //添加对应的数据对象 data('isActive', false)为了区分hover和click事件冲突问题

                // 不置灰就用data里保留的颜色
                if (_this.areaMap[_this.mapidPrefix + mapId].selectAll('path').length > 0) {
                    _this.areaMap[_this.mapidPrefix + mapId].selectAll('path').attr({
                        fill: _this.mapStyle.areaMap.outlineFill,
                        stroke: _this.mapStyle.areaMap.outlineStroke
                    });
                }

                _this.areaMapSet[_this.mapidPrefix + mapId].push(_this.areaMap[_this.mapidPrefix + mapId]);
                // 设置颜色
                if (mapId == '520000' || mapId == '480000' || mapId == 'xinjiangGroup') {
                    if (_this.snap.select('#xinjiang-outline')) {
                        _this.snap.select('#xinjiang-outline').attr({
                            fill: _this.mapStyle.areaMap.outlineFill,
                            stroke: _this.mapStyle.areaMap.outlineStroke
                        });
                    }
                }

                // 判断是不是新疆这块区域
                if (mapId == '520000' || mapId == '480000' || mapId == 'xinjiangGroup') {
                    _this.areaMap[_this.mapidPrefix + mapId].attr({
                        fill: 'rgba(0,0,0,0.01)',
                        stroke: 'none'
                    });
                }

            }

            // 判断圆的对象是否存在
            if ($('#' + _this.mapidPrefix + mapId + '-circle').length > 0) {
                // 区域圆心对象
                _this.areaMapCircle[_this.mapidPrefix + mapId] = _this.snap.select('#' + _this.mapidPrefix + mapId + '-circle');
                //获取转换后 圆的cx cy坐标
                //var changeX=_this.Matrix.x(_this.areaMapCircle[_this.mapidPrefix + mapId].attr('cx'),parseInt(_this.areaMapCircle[_this.mapidPrefix + mapId].attr('cy')));
                //var changeY=_this.Matrix.y(_this.areaMapCircle[_this.mapidPrefix + mapId].attr('cx'),parseInt(_this.areaMapCircle[_this.mapidPrefix + mapId].attr('cy')));

                //设置对应的圆的样式
                _this.areaMapCircle[_this.mapidPrefix + mapId].attr({
                    fill: _this.mapStyle.circle.fill,
                    r: _this.mapStyle.circle.rRatio,
                    // cx:changeX,
                    //cy:changeY,
                    display: 'block',
                    cursor: cursor
                }).data('data', _this.areaMapData[_this.mapidPrefix + mapId]).data('index', _this.mapIdArr.length).appendTo(_this.snap);
                _this.areaMapSet[_this.mapidPrefix + mapId].push(_this.areaMapCircle[_this.mapidPrefix + mapId]);

                // 创建数据本对象
                //_this.areaMapText[_this.mapidPrefix + mapId] = _this.snap.el('text', {
                //    class: 'areaMapName-' + mapId,
                //    text: _this.areaMapDataSource[mapId].name,
                //    x: _this.areaMapCircle[_this.mapidPrefix + mapId].attr('cx'),
                //    y: parseInt(_this.areaMapCircle[_this.mapidPrefix + mapId].attr('cy') - _this.mapStyle.textStyle.fontSizeRatio * 1.3) * 1,
                //    fontSize: _this.mapStyle.textStyle.fontSizeRatio + 'px',
                //    fill: _this.mapStyle.textStyle.fill,
                //    filter: _this.snap.filter(_this.mapStyle.textStyle.shadowFilter),
                //    fontFamily: 'Microsoft YaHei',
                //    textAnchor: 'middle',
                //    dominantBaseline: 'middle',
                //    cursor: cursor
                //});


                _this.areaMapSet[_this.mapidPrefix + mapId].push(_this.areaMapText[_this.mapidPrefix + mapId]);

                if (_this.opts.emphasizeId.indexOf(mapId) > -1) {
                    _this.areaMapEmphasisText[_this.mapidPrefix + mapId] = _this.snap.el('text', {
                        id: 'areaMapName-' + mapId,
                        text: _this.areaMapDataSource[mapId].name,
                        x: _this.areaMapCircle[_this.mapidPrefix + mapId].attr('cx'),
                        y: parseFloat(_this.areaMapCircle[_this.mapidPrefix + mapId].attr('cy')) + _this.mapStyle.emphasisTextStyle.fontSizeRatio * 1.5,
                        fontSize: _this.mapStyle.emphasisTextStyle.fontSizeRatio + 'px',
                        fill: _this.mapStyle.emphasisTextStyle.fill,
                        fontWeight: _this.mapStyle.emphasisTextStyle.fontWeight,
                        fontFamily: 'Microsoft YaHei',
                        textAnchor: 'middle',
                        dominantBaseline: 'middle',
                        cursor: cursor
                    });
                }
            }
            // 南沙群岛
            if (_this.snap.selectAll('#nansha-outline').length > 0) {
                _this.snap.select('#nansha-outline').attr({
                    stroke: _this.mapStyle.areaMap.outlineStroke,
                    strokeWidth: _this.mapStyle.areaMap.strokeWidthRatio,
                    fill: '#68bdfb' //_this.mapStyle.areaMap.outlineFill
                });
            }
        }
    },
    /*
     * 创建提示框
     * */
    createTipBox: function() {
        var _this = this;
        // 合并参数
        var style = $.fn.extend(true, {
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: '999',
            color: '#fff',
            'font-size': '13px',
            fontFamily: 'Microsoft YaHei',
            lineHeight: '1.5em',
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderColor: '#408fc3',
            borderRadius: '5px',
            padding: '5px 8px',
            whiteSpace: 'nowrap',
            display: 'none'

        }, _this.opts.tooltip.style || {});
        //$('<div id=' +
        //    _this.opts.tooltip.id +
        //    '>' +
        //    '<h3 style="white-space:nowrap;font-size:14px;">西北</h3>' +
        //    '<p  style="white-space:nowrap;"><span class="fd-name-01">收案</span>：<span  class="fd-name-count-01">0</span></p>' +
        //    '<p  style="white-space:nowrap;"><span class="fd-name-02">结案</span>：<span  class="fd-name-count-02">0</span></p>' +
        //    '<p  style="white-space:nowrap;"><span class="fd-name-03">未结</span>：<span  class="fd-name-count-03">0%</span></p>' +
        //    '</div>').css(style).appendTo('body');
        $('<div id=' +
            _this.opts.tooltip.id +
            '>' +
            '<h3 style="white-space:nowrap;font-size:14px;">西北</h3>' +
            '</div>').css(style).appendTo('body');
    },
    /*
     * 渐变颜色
     * */
    gradientColors: function(colorArr, steps) {
        var gradientColorArr = [];
        if (colorArr.length < 2) {
            return colorArr;
        }
        //分割的段数 向上取整
        var segment = Math.ceil(steps / (colorArr.length - 1));
        for (var i = 0; i < (colorArr.length - 1); i++) {
            //定义开始颜色和结束颜色
            var startColor = Snap.color(colorArr[i]),
                endColor = Snap.color(colorArr[i + 1]);

            //获取颜色之间的差值
            var diffValue = {
                r: (endColor.r - startColor.r) / segment,
                g: (endColor.g - startColor.g) / segment,
                b: (endColor.b - startColor.b) / segment,
                opacity: (endColor.opacity - startColor.opacity) / segment
            };
            for (var j = (segment * i); j < (segment * (i + 1)); j++) {
                gradientColorArr.push(
                    'rgba(' +
                    (diffValue.r * (j - (segment * i)) + startColor.r) + ',' +
                    (diffValue.g * (j - (segment * i)) + startColor.g) + ',' +
                    (diffValue.b * (j - (segment * i)) + startColor.b) + ',' +
                    (diffValue.opacity * (j - (segment * i)) + startColor.opacity) + ')');
            }
        }
        return gradientColorArr;
    },
    /*
     * 根据数值获取对应的颜色值
     * @param {float} value 数值
     * @return {String}  颜色字符串
     * */
    getColorByValue: function(value) {
        var _this = this;
        var fill = '';
        value = parseFloat(value);

        //获取对应的索引
        var index = Math.floor(((value - _this.opts.xsMinValue) / (_this.opts.xsMaxValue - _this.opts.xsMinValue)) * _this.opts.STEPS);
        if (index < 0) {
            index = 0;
        } else if (index > (_this.gradientColor.length - 1)) {
            index = _this.gradientColor.length - 1;
        }
        fill = _this.gradientColor[index];
        return fill;
    },
    /*
     * 设置区域地图的填充颜色
     * */
    setAreaMapFillColor: function() {
        var _this = this;
        $.each(_this.areaMap, function(name, value) {
            var data = value.data('data');
            //如果当前元素时一个集合，则获取子集的path，否则子集则是一个path
            var _path = value.selectAll('path').length > 0 ? value.selectAll('path') : value;
            _path.attr({
                fill: _this.getColorByValue(data.xs), //根据案件合格率获取对应的颜色
                cursor: 'pointer'
            });
            // 设置颜色新疆区域
            if (data.mapId == '520000' || value.data('data').mapId == '480000' || value.data('data').mapId == 'xinjiangGroup') {
                if (_this.snap.select('#xinjiang-outline')) {
                    _this.snap.select('#xinjiang-outline').attr({
                        fill: _this.getColorByValue(data.ajhgl) //根据案件合格率获取对应的颜色
                    });
                }
            }

            // 判断是不是新疆这块区域
            if (data.mapId == '520000' || data.mapId == '480000' || data.mapId == 'xinjiangGroup') {
                value.attr({
                    fill: 'rgba(0,0,0,0.01)',
                    stroke: 'none'
                });
            }
        });
    },
    /*
     * 给地图添加交互效果
     * 需要给path路径、圆圈、文本统一添加上交互效果
     * */
    addAreaMapInteraction: function() {
        var _this = this;
        var tooltip = $('#' + _this.opts.tooltip.id),
            tooltipTitle = tooltip.find('h3'),
            tooltipContent1Count = tooltip.find('.fd-name-count-01'),
            tooltipContent2Count = tooltip.find('.fd-name-count-02'),
            tooltipContent3Count = tooltip.find('.fd-name-count-03');
        var delt = 5;
        var winW = $(window).width();
        var winH = $(window).height();


        $.each(_this.areaMapSet, function(name, value) {
            //页面加载就调用地图动画
            //_this.mapAreaClick(name, _this.opts.flag);
            value.forEach(function(element, index) {

                //热力图 鼠标滑过事件
                element.hover(function(event) {
                        var event = event || window.event;
                        var outline = _this.areaMap[name] ? _this.areaMap[name] : this;
                        var data = outline.data('data');
                        var _path = outline.selectAll('path').length > 0 ? outline.selectAll('path') :
                            (outline.selectAll('rect').length > 0 ? outline.selectAll('rect') : outline);

                        //tooltipTitle.text(data.name);
                        //tooltipContent1Count.text(data.xs + '件');
                        //tooltipContent2Count.text(data.yj + '件');
                        //tooltipContent3Count.text(data.wj + '件');
                        ////判断是否超出了屏幕的宽度和高度
                        //var left = event.pageX;
                        //var top = event.pageY;
                        //var tipW = tooltip.width();
                        //var tipH = tooltip.height();
                        //if ((left + tipW + delt) > winW) {
                        //    left = winW - tipW - delt;
                        //}
                        //if ((top + tipH + delt) > winH) {
                        //    top = winH - tipH - delt;
                        //}
                        //tooltip.css({
                        //    left: left,
                        //    top: top
                        //}).show();

                        //设置鼠标滑过样式
                        if (!outline.data('isActive')) {
                            _path.attr({
                                fill: _this.mapStyle.areaMap.hoverFill
                            });
                        }
                        //鼠标移入 圆的颜色
                        _this.areaMapCircle[name].attr({
                            fill: _this.mapStyle.circle.fill,
                            r: _this.mapStyle.circle.rRatio,
                            display: 'block'
                        })


                        //名称颜色变为hoverFill的颜色
                        /*_this.areaMapText[name].attr({
                         fill: _this.mapStyle.textStyle.hoverFill
                         });*/

                        // 判断是不是新疆这块区域
                        if ((data.mapId !== _this.opts.mapId) && (data.mapId == '520000' || data.mapId == '480000' || data.mapId == 'xinjiangGroup')) {
                            outline.attr({
                                opacity: 0.001
                            });
                        }
                    },
                    //鼠标移出事件
                    function() {

                        var outline = _this.areaMap[name] ? _this.areaMap[name] : this;
                        var data = outline.data('data');
                        var _path = outline.selectAll('path').length > 0 ? outline.selectAll('path') :
                            (outline.selectAll('rect').length > 0 ? outline.selectAll('rect') : outline);
                        if (!outline.data('isActive')) {
                            _path.attr({
                                fill: _this.getColorByValue(data.xs)
                            });
                        }
                        //鼠标移出 圆的颜色
                        _this.areaMapCircle[name].attr({
                            fill: _this.mapStyle.circle.fill,
                            r: _this.mapStyle.circle.rRatio,
                            display: 'block'
                        })

                        //if (tooltip.is(':visible')) {
                        //    // 隐藏提示框
                        //    tooltip.hide();
                        //}

                        // 判断是不是新疆这块区域
                        if ((data.mapId !== _this.opts.mapId) && (data.mapId == '520000' || data.mapId == '480000' || data.mapId == 'xinjiangGroup')) {
                            outline.attr({
                                fill: 'rgba(0,0,0,0.1)'
                            });
                        }
                        /*_this.areaMapText[name].attr({
                         fill: _this.mapStyle.textStyle.fill
                         });*/
                    }).mousemove(function(event) {
                    var event = event || window.event;
                    //if (tooltip.is(':visible')) {
                    //    //判断是否超出了屏幕的宽度和高度
                    //    var left = event.pageX;
                    //    var top = event.pageY;
                    //    var tipW = tooltip.width();
                    //    var tipH = tooltip.height();
                    //    left += 20;
                    //    if ((left + tipW + delt) > winW) {
                    //        left = winW - tipW - delt;
                    //    }
                    //    if ((top + tipH + delt) > winH) {
                    //        top = winH - tipH - delt;
                    //    }
                    //    tooltip.css({
                    //        left: left,
                    //        top: top
                    //    });
                    //}
                }).click(function() {
                    _this.opts.flag = 1;
                    //点击事件
                    _this.mapAreaClick(name, _this.opts.flag);
                    //获取当前点击区域索引
                    //_this.opts.index = _this.areaMap[name].data('index');

                    //console.log(_this.opts.index);
                    // 清除地图轮循任务
                    clearInterval(_this.opts.mapTimer);

                    // 开始轮循
                    //setTimeout(function () {
                    //    clearInterval(_this.opts.mapTimer);
                    //    _this.loopMapArea(_this.opts.index);
                    //}, 4000);

                });
            });
        });

        //圆 鼠标事件显示信息
        $.each(_this.areaMapCircle, function(name, value) {
            //value.forEach(function (element, index) {
            //圆划过事件
            value.hover(function(event) {
                var event = event || window.event;
                var cilcle = _this.areaMapCircle[name] ? _this.areaMapCircle[name] : this;
                var data = cilcle.data('data');
                tooltipTitle.text(data.name);
                //判断是否超出了屏幕的宽度和高度
                var left = event.pageX;
                var top = event.pageY;

                tooltip.css({
                    left: left,
                    top: top
                }).show();
            }, function() {
                if (tooltip.is(':visible')) {
                    // 隐藏提示框
                    tooltip.hide();
                }
            }).mousemove(function(event) {
                if (tooltip.is(':visible')) {
                    //判断是否超出了屏幕的宽度和高度
                    var left = event.pageX;
                    var top = event.pageY;
                    left += 20;
                    tooltip.css({
                        left: left,
                        top: top
                    });
                }
            });
            //});
        });
        // 判断是不是新疆这块区域
        if (_this.snap.select('#xinjiang-group')) {
            _this.snap.select('#xinjiang-group').hover(function() {
                _this.snap.select('#xinjiang-outline').attr({
                    fill: _this.mapStyle.areaMap.hoverFill
                });
            }, function() {
                var data = _this.snap.select('#mapid-xinjiangGroup-outline').data('data');
                _this.snap.select('#xinjiang-outline').attr({
                    fill: _this.getColorByValue(data.ajhgl)
                });
            });
        }

        //点击空白区域 清除定时任务并返回全省数据
        $(document).click(function(e) {
            var target = e.target;

            //排除svg地图内容区域
            if (target.nodeName == 'path' || target.nodeName == 'circle' || target.nodeName == 'rect' || target.nodeName == 'text' || target.nodeName == 'image' || target.nodeName == 'CANVAS') {} else {
                //清除动画定时任务并重置地图样式
                _this.clickChangeStyle();
                //清空mapData数据
                var mapData = {
                    "jc": 0,
                    "mapId": "",
                    "name": "",
                    "areaName": "上海",
                    "wj": 0,
                    "xs": 0,
                    "yj": 0
                };
                _this.opts.blankclickCallback(mapData);
            }

        });
    },
    /*
     * 地图区域点击
     */
    mapAreaClick: function(name, flag) {
        var _this = this;
        //每次点击地图 清空轮循动画及元素
        //$('.circleGroup').remove();
        //$('.CircleAnimateg').remove();
        //地图不存在区域圆
        var circle = _this.areaMapCircle[name];
        var outline = _this.areaMap[name] ? _this.areaMap[name] : circle;

        var _data = outline.data('data');
        var _path = outline.selectAll('path').length > 0 ? outline.selectAll('path') :
            (outline.selectAll('rect').length > 0 ? outline.selectAll('rect') : outline);

        //重置之前点击区域状态
        if (_this.opts.activeMapId !== '') {

            var activeOutline = _this.areaMap[_this.mapidPrefix + _this.opts.activeMapId] ? _this.areaMap[_this.mapidPrefix + _this.opts.activeMapId] : _this.areaMapCircle[_this.mapidPrefix + _this.opts.activeMapId];
            var activePath = activeOutline.selectAll('path').length > 0 ? activeOutline.selectAll('path') :
                (activeOutline.selectAll('rect').length > 0 ? activeOutline.selectAll('rect') : activeOutline);
            // 获取当前区域的数据
            var curData = activeOutline.data('data');
            // 重置之前选中区域的颜色
            activePath.attr({
                fill: _this.getColorByValue(curData.xs),
                stroke: _this.mapStyle.areaMap.stroke
            });

            //覆盖圆样式
            _this.snap.selectAll('circle').attr({
                fill: _this.mapStyle.circle.fill,
                stroke: _this.mapStyle.circle.fill
            });

            activeOutline.data('isActive', false);
            //隐藏之前选中区域id对应的icon及动画圆
            $('#jsCircleAnimateg-' + _this.opts.activeMapId).hide();
            //              $('.circleGroup').hide();
            //                $(".map_tip").hide(2000);
            //$('#jsIconRect-' + _this.opts.activeMapId).hide();
            //$('#jsIconText-' + _this.opts.activeMapId).hide();

            //如果上一个选中的是强调的法院，则将其强调文本进行展现
            if (_this.opts.emphasizeId.indexOf(_this.opts.activeMapId) > -1) {
                _this.areaMapEmphasisText[_this.mapidPrefix + _this.opts.activeMapId].attr({
                    display: 'block'
                });
            }
        }
        //获取当前点击区域的id
        _this.opts.activeMapId = _data.mapId;



        var cx = _this.areaMapCircle[_this.mapidPrefix + _this.opts.activeMapId].attr('cx');
        var cy = _this.areaMapCircle[_this.mapidPrefix + _this.opts.activeMapId].attr('cy');
        var fyId = _this.areaMapCircle[_this.mapidPrefix + _this.opts.activeMapId].data('data').mapId;
        var fyName = _this.areaMapCircle[_this.mapidPrefix + _this.opts.activeMapId].data('data').name;

        //操作当前动画圆
        //_this.operateAnimateCircle(cx, cy, fyId, fyName);
        //如果轮询到强调的法院，则隐藏对应的强调文字
        if (_this.opts.emphasizeId.indexOf(_this.opts.activeMapId) > -1) {
            _this.areaMapEmphasisText[_this.mapidPrefix + _this.opts.activeMapId].attr({
                display: 'none'
            });
        }

        _this.opts.animateObj.ellipse.circle1.attr({
            cx: cx,
            cy: cy
        });
        _this.opts.animateObj.ellipse.circle2.attr({
            cx: cx,
            cy: cy
        });
        _this.opts.animateObj.ellipse.circle3.attr({
            cx: cx,
            cy: cy
        });
        _this.opts.animateObj.ellipse.circleAnimateg.attr({
            id: 'jsCircleAnimateg-' + fyId
        });

        _this.opts.animateObj.circleIcon.img.attr({
            x: cx - 13,
            y: cy - 60,
            id: fyId
        });
        _this.opts.animateObj.circleIcon.rect.attr({
            x: cx - 100,
            y: cy - 110,
            id: fyId
        });
        _this.opts.animateObj.circleIcon.text.attr({
            text: fyName,
            x: cx + 45,
            y: cy - 85,
            id: fyId
        });

        // 改变当前选中区域的颜色
        _path.attr({
            fill: _this.mapStyle.areaMap.clickFill,
            stroke: _this.mapStyle.areaMap.clickStroke
        });

        outline.data('isActive', true);
        //显示当前区域id对应的icon及动画圆
        $('#jsCircleAnimateg-' + _this.opts.activeMapId).show();
        $('.circleGroup').show();
        //$('#jsIconImg-' + _this.opts.activeMapId).show();
        //$('#jsIconRect-' + _this.opts.activeMapId).show();
        //$('#jsIconText-' + _this.opts.activeMapId).show();
        $(".jc").text(Math.ceil(Math.random() * 10000));
        $(".xs").text(Math.ceil(Math.random() * 10000));
        $(".yj").text(Math.ceil(Math.random() * 10000));
        $(".wj").text(Math.ceil(Math.random() * 10000));
        if (flag == 1) {
            $(".unuse").val(_data.mapId);
            $(".unuse").change();
            //          	$(".map_tip").change();
            //          	$(".map_tip").show(2000);
        }
        // 点击之后的回调函数
        _this.opts.clickCallback(outline, _data, flag);
    },
    /*
     地图区域轮循选中
     */
    //      loopMapArea: function (index) {
    //          var _this = this;
    //          var prefix = 'mapid-';//mapid前缀
    //          //var index = 0;
    //          _this.opts.flag = 2;
    //          _this.opts.mapTimer = setInterval(function () {
    //              var currentMapId = prefix + _this.mapIdArr[index];
    //              // 调用地图点击事件
    //              _this.mapAreaClick(currentMapId, _this.opts.flag);
    //
    //              if (index == _this.mapIdArr.length - 1) {
    //                  index = 0;
    //              } else {
    //                  index++;
    //              }
    //              //console.log(index)
    //          }, 4000);
    //      },
    /*
     * 获取圆及设置圆属性 cx cy id...
     * */
    getCirclePosition: function() {
        var _this = this;

        var arr = []; //存放 所有固定圆相关属性 的 数组
        $.each(_this.areaMapCircle, function(name, value) {
            //获取当前区域法院id
            var currentId = name.substring(6);

            // 获取法院名称
            var fyName = value.data('data').name;

            var obj = {
                cx: value.attr('cx'),
                cy: value.attr('cy'),
                id: currentId,
                fyName: fyName
            }
            arr.push(obj);
        });
        return arr;
    },
    /*
     *   处理动画圆 (根据默认圆点坐标绘制 动画圆坐标)
     */
    operateAnimateCircle: function(cx, cy, id, fyName) {
        var _this = this;

        //创建每个区域动画椭圆 （参数必须为对象形式）
        var ellipse = _this.CreateAnimateEllipse({
            cx: cx,
            cy: cy,
            rx: 20,
            ry: 20,
            tweenTime: 1200,
            id: id
        });

        //创建图标
        var circleIcon = _this.createCircleIcon(cx, cy, id, fyName);
        return {
            ellipse: ellipse,
            circleIcon: circleIcon
        }
    },


    /*
     * 创建圆形 动画圆
     */
    CreateAnimateCircle: function(updateOptions) {
        var _this = this;
        var snap = _this.snap;

        var obj = $.fn.extend({}, {
            x: 0,
            y: 0,
            r: 10,
            radius: 20,
            tweenTime: 400

        }, updateOptions || {}); // {x,y,r,radius,tweenTime}
        _this.x = obj.x;
        _this.y = obj.y;
        _this.r = obj.r;
        _this.radius = obj.radius;
        _this.tweenTime = obj.tweenTime;

        var timer = null;
        var r1,
            r2,
            r3,
            r4;
        r1 = _this.r;
        r2 = r1 + _this.radius * 0.33;
        r3 = r1 + _this.radius * 0.66;
        r4 = r1 + _this.radius;

        try {
            var circle01 = snap.paper.circle(_this.x, _this.y, r1).attr({
                stroke: "#fff45c",
                fill: "#fff45c",
                strokeWidth: 4 * _this.mapRatio,
                id: "animateCircle1"
            });
            var circle02 = circle01.clone().attr({ fill: "none", r: r2 });
            var circle03 = circle02.clone().attr({ r: r3 });
            var circle04 = circle02.clone().attr({ r: r4 });

            var circleAnimateg = snap.g(circle01, circle02, circle03, circle04).attr({
                id: "circleAnimateg",
                "display": "block",
                "pointer-events": "none"
            });

            // 动画方法
            function animateCircle() {
                circle02.animate({
                    r: r2,
                    opacity: 0.66
                }, _this.tweenTime);
                circle03.animate({
                    r: r3,
                    opacity: 0.33
                }, _this.tweenTime);
                circle04.animate({
                    r: r4,
                    opacity: 0
                }, _this.tweenTime);
            };

            // 停止当前动画方法
            function stopAnimateCircle() {
                circle02.stop().attr({
                    r: r1,
                    opacity: 1
                });
                circle03.stop().attr({
                    r: r2,
                    opacity: 0.66
                });
                circle04.stop().attr({
                    r: r3,
                    opacity: 0.33
                });
                animateCircle();
            };

            // 循环函数
            function loop() {
                if (timer)
                    clearTimeout(timer);
                stopAnimateCircle();
                timer = setTimeout(function() {
                    loop()
                }, _this.tweenTime);
            };
            loop();

            // update
            _this.update = function() {
                r1 = _this.r;
                r2 = r1 + _this.radius * 0.33;
                r3 = r1 + _this.radius * 0.66;
                r4 = r1 + _this.radius;
                circle01.attr({
                    cx: _this.x,
                    cy: _this.y,
                    r: r1
                });
                circle02.attr({
                    cx: _this.x,
                    cy: _this.y,
                    r: r2
                });
                circle03.attr({
                    cx: _this.x,
                    cy: _this.y,
                    r: r3
                });
                circle04.attr({
                    cx: _this.x,
                    cy: _this.y,
                    r: r4
                });
            };
            _this.update();

        } catch (e) {
            throw new Error(e + "createAnimateCircle(obj):obj的参数为对象，形式为{_this.x:num,y:num,r:num,radius:num,tweenTime:time}")
        }
    },

    /**
     *创建椭圆形 动画圆
     * @param updateOptions 参数必须为对象形式
     * @constructor
     */
    CreateAnimateEllipse: function(updateOptions) {
        var _this = this;
        var snap = _this.snap;

        var obj = $.fn.extend({}, {
            cx: 316.676,
            cy: 214.33,
            rx: 20,
            ry: 10,
            tweenTime: 1200,
            id: ''

        }, updateOptions || {}); // {x,y,r,radius,tweenTime}
        _this.cx = obj.cx;
        _this.cy = obj.cy;
        _this.rx = obj.rx;
        _this.ry = obj.ry;
        _this.tweenTime = obj.tweenTime;
        _this.id = obj.id;

        var timer = null;

        try {

            var circle01 = snap.paper.el("ellipse", {
                cx: _this.cx,
                cy: _this.cy,
                rx: _this.rx,
                ry: _this.ry,
                stroke: "rgba(255,195,32)",
                fill: "rgba(255,195,32,.2)",
                strokeWidth: 4 * _this.mapRatio,
                id: "animateCircle1",
                opacity: 1
            })
            var circle02 = snap.paper.el("ellipse", {
                cx: _this.cx,
                cy: _this.cy,
                rx: 50,
                ry: 15,
                stroke: "rgba(255,195,32)",
                fill: "rgba(255,195,32,.2)",
                strokeWidth: 4 * _this.mapRatio,
                id: "animateCircle1",
                opacity: 0.5
            })
            var circle03 = snap.paper.el("ellipse", {
                cx: _this.cx,
                cy: _this.cy,
                rx: 70,
                ry: 20,
                stroke: "rgba(255,195,32)",
                fill: "rgba(255,195,32,.2)",
                strokeWidth: 4 * _this.mapRatio,
                id: "animateCircle1",
                opacity: 0.5
            })
            var circleAnimateg = snap.g(circle01, circle02, circle03).attr({
                id: "jsCircleAnimateg-" + _this.id,
                class: "CircleAnimateg",
                "display": "none",
                "pointer-events": "none"
            });

            // 动画方法
            function animateCircle() {
                circle02.animate({
                    rx: 50,
                    ry: 15,
                    opacity: 0.66
                }, _this.tweenTime);
                circle03.animate({
                    rx: 70,
                    ry: 20,
                    opacity: 0.33
                }, _this.tweenTime);
            };

            // 停止当前动画方法
            function stopAnimateCircle() {
                circle02.stop().attr({
                    rx: 20,
                    ry: 10,
                    opacity: 1
                });
                circle03.stop().attr({
                    rx: 50,
                    ry: 15,
                    opacity: 0.66
                });
                animateCircle();
            };

            // 循环函数
            function loop() {
                if (timer)
                    clearTimeout(timer);
                stopAnimateCircle();
                timer = setTimeout(function() {
                    loop()
                }, _this.tweenTime);
            };
            loop();

            // update
            _this.update = function() {
                circle01.attr({
                    cx: _this.cx,
                    cy: _this.cy,
                    rx: 20,
                    ry: 10
                });
                circle02.attr({
                    cx: _this.cx,
                    cy: _this.cy,
                    rx: 50,
                    ry: 15
                });
                circle03.attr({
                    cx: _this.cx,
                    cy: _this.cy,
                    rx: 70,
                    ry: 20
                });
            };
            _this.update();

        } catch (e) {
            throw new Error(e + "createAnimateCircle(obj):obj的参数为对象，形式为{_this.x:num,y:num,r:num,radius:num,tweenTime:time}")
        }
        return {
            circle1: circle01,
            circle2: circle02,
            circle3: circle03,
            circleAnimateg: circleAnimateg
        }
    },

    /**
     *  创建动画圆图标
     * @param x icon x偏移量
     * @param y icon y偏移量
     * @param id  icon id
     */
    createCircleIcon: function(x, y, id, fyName) {
        var _this = this;
        var snap = this.snap;
        //地图图片设置
        //var CircleIconImg = snap.paper.image("../images/icon-gh.png", x - 15, y - 25, 160 * _this.mapRatio, 170 * _this.mapRatio);
        //var CircleIconImg = snap.paper.image("../images/icon-pop-up.png", x - 145, y - 105, 291, 114);
        var CircleIconImg = snap.paper.image("/JD/image/icon-gh.png", x + 200, y, 27, 42);
        //将云彩追加到svg文档最后面
        CircleIconImg.appendTo(snap);
        //配置云彩区域属性
        CircleIconImg.attr({
            "id": "jsIconImg-" + id,
            'class': "Animate",
            "style": "cursor:pointer;",
            "display": 'block',
            "pointer-events": "none"
        });
        // 绘制存放法院名称的矩形区域
        var circleRect = snap.paper.rect(x - 100, y - 110, 230, 40);
        circleRect.appendTo(snap);
        circleRect.attr({
            "id": "jsIconRect-" + id,
            'class': "Animate",
            "style": "cursor:pointer;",
            "display": 'block',
            "fill": 'transparent',
            "pointer-events": "none"
        });
        //绘制弹框上的对应的法院名称
        var rectText = snap.text(x + 45, y - 85, fyName).attr({
            "id": "jsIconText-" + id,
            'class': "Animate",
            "style": "cursor:pointer;",
            "display": 'none',
            fill: '#fff',
            textAnchor: 'middle',
            fontFamily: 'Microsoft YaHei',
        });
        _this.snap.paper.g(CircleIconImg, circleRect, rectText).attr({
            "class": "circleGroup",
            "display": 'block'
        });
        return {
            img: CircleIconImg,
            rect: circleRect,
            text: rectText
        };
    },
    /**
     * 创建连接线
     */
    createConnectLine: function() {
        var _this = this;
        var snap = this.snap;
        //地图图片设置
        var lineIconImg = snap.paper.image("../img/connect-line.png", 450, 80, 365 * _this.mapRatio * 4, 164 * _this.mapRatio * 4);
        //将连接线追加到svg文档最后面
        lineIconImg.appendTo(snap);
        //配置连接线区域属性
        lineIconImg.attr({
            "id": "jsIconLineImg",
            "style": "cursor:pointer;",
            "display": 'block',
            "pointer-events": "none"
        })
    },
    /*
     地图动画线
     */
    showAnimateLine: function() {
        var _this = this;
        var snap = _this.snap;

        var IconStart = snap.paper.image("", 450, 80, 21 * _this.mapRatio * 4, 25 * _this.mapRatio * 4);
        var IconEnd = snap.paper.image("", 690, 190, 21 * _this.mapRatio * 4, 25 * _this.mapRatio * 4);
        //将连接圆追加到svg文档最后面
        IconStart.appendTo(snap);
        IconEnd.appendTo(snap);
        //配置连接线圆区域属性
        IconStart.attr({
            "style": "cursor:pointer;",
            "display": 'block',
            "pointer-events": "none"
        });
        IconEnd.attr({
            "style": "cursor:pointer;",
            "display": 'block',
            "pointer-events": "none"
        });
        //起始点
        var point1 = {
            cx: 695,
            cy: 195
        }

        //终点
        var point2 = {
            cx: 456,
            cy: 87
        }

        //二次贝塞尔曲线
        var path = 'M' + point1.cx + ' ' + point1.cy + ', Q' + (Math.min(point2.cx, point1.cx) + Math.abs(point2.cx - point1.cx) / 2 + Math.abs(point2.cy - point1.cy) / 2 - 50) + '  ' + (Math.min(point2.cy, point1.cy) -
            50) + ' ' + point2.cx + ' ' + point2.cy;

        //绘制线运动路径轨迹
        var _path = snap.el('path', {
            d: path,
            stroke: 'transparent',
            fill: 'none',
            strokeWidth: 2
        });
        var _pathAct = snap.el('path', {
            d: '',
            stroke: '#00e5ff',
            fill: 'none',
            strokeWidth: 2,
            strokeDasharray: 4
        });
        //返回路径长度
        var totalLength = _path.getTotalLength();
        setInterval(function() {
            Snap.animate(0, totalLength, function(value) {
                var _pathS = _path.getSubpath(0, value);

                _pathAct.attr({
                    d: _pathS
                });
            }, 2000, mina.linear, function() {
                _pathAct.attr({
                    d: 'M0 0Z'
                });
            });
        }, 3000);

    },
    /*
     点击年份切换地图轮循样式
     */
    clickChangeStyle: function() {
        var _this = this;
        // 清除地图轮循任务
        clearInterval(_this.opts.mapTimer);
        _this.opts.index = 0; // 重置轮循索引
        $('.circleGroup').hide(); //隐藏动画
        $('.CircleAnimateg').hide(); //隐藏动画
        // _this.loopMapArea(_this.opts.index);//执行动画
        //重置地图区域颜色
        $.each(_this.areaMapSet, function(name, value) {
            //地图不存在区域圆
            var circle = _this.areaMapCircle[name];
            var outline = _this.areaMap[name] ? _this.areaMap[name] : circle;

            var _data = outline.data('data');
            var _path = outline.selectAll('path').length > 0 ? outline.selectAll('path') :
                (outline.selectAll('rect').length > 0 ? outline.selectAll('rect') : outline);

            // 重置之前选中区域的颜色
            _path.attr({
                fill: _this.getColorByValue(_data.xs),
                stroke: _this.mapStyle.areaMap.stroke
            });

            //覆盖圆样式
            _this.snap.selectAll('circle').attr({
                fill: _this.mapStyle.circle.fill,
                stroke: _this.mapStyle.circle.fill
            });
        });
    },
    /*
     * 更新数据
     * */
    updateData: function(dataSource) {

        var _this = this;
        _this.areaMapDataSource = dataSource; //赋值对应的数据的对象
        _this.handleMapData(); //处理新疆和兵团的数据
        $.each(_this.areaMapDataSource, function(mapId, value) {
            // 更新所有数据对象
            _this.areaMapData[_this.mapidPrefix + mapId].mapId = mapId;
            _this.areaMapData[_this.mapidPrefix + mapId].name = $.trim(value.name);
            _this.areaMapData[_this.mapidPrefix + mapId].xs = Number(value.xs);
            _this.areaMapData[_this.mapidPrefix + mapId].yj = Number(value.yj);
            _this.areaMapData[_this.mapidPrefix + mapId].wj = Number(value.wj);
        });
        _this.setAreaMapFillColor(); //设置区域的填充颜色
        _this.clickChangeStyle(); // 点击年份 重置地图轮循样式

    }
};