$(function() {
	$('.fd-popup-box .fd-popup-head .fd-close').click(function() {
		$('.fd-popup-box').hide();
	})
	// js-click-01
	$('.js-click-01').click(function() {
		window.open("ryda.html");
	});
	// js-click-02
	$('.js-click-02').click(function() {
		// 弹窗
		addWindow('fd-tsjb', '投诉举报');
	});
	// js-click-03
	var myChart2 = echarts.init($('.js-click-03')[0]);
	var graphData;
	myChart2.on('click', function(parms) {
		if (parms.name == 'B制药有限公司') {
			window.open("qyda.html");
		}
		if (parms.data.category == 1) {
			window.open("ryda.html");
		}
	})
	myChart2.setOption(getGraphOption());
	// js-click-04
	$('.js-click-04').click(function() {
		// 弹窗
		addWindow('fd-qyqd', '企业清单');
	});
	// js-click-05
	$('.js-click-05').click(function() {
		// 弹窗
		addWindow('fd-qyqd', '企业清单');
	});
	// js-click-06
	$('.js-click-06').click(function() {
		window.open("qyda.html");
	});
	// js-click-07
	$('.js-click-07').click(function() {
		window.open("qyda.html");
	});
	// js-click-08
	$('.js-click-08').click(function() {
		// 弹窗
		addWindow('fd-qyqd', '企业清单');
	});
	// js-click-09
	$('.js-click-09').click(function() {
		window.open("qyda.html");
	});
	// js-click-10
	$('.js-click-10').click(function() {
		// 弹窗
		addWindow('fd-wtxq', '委托详情');
	});
	// js-click-11
	$('.js-click-11').click(function() {
		// 弹窗    position: absolute;
		var innerHtml = "<div class='fd-click-11-02' style='position: absolute;width: 30px;height: 343px;top:48px;left:162px;'></div>"
		$('.fd-popup-box .fd-popup-body').append(innerHtml);
		$('.fd-click-11-02').click(function() {
			window.open("cpda.html");
		});
		addWindow('fd-cplb', '产品列表');
	});
	// 添加弹窗
	function addWindow(className, title) {
		$('.fd-popup-box .fd-popup-body').html();
		$('.fd-popup-box .fd-popup-body').addClass(className);
		$('.fd-popup-box .fd-popup-title').html(title);
		$('.fd-popup-box').show();
	}
	// 折线图
	function getLineOption(data) {
		option = {
		    backgroundColor: '#ffffff',
		    name: 'a',
		    tooltip: {
		        trigger: 'axis', //按x轴显示
		        show: true,
		        axisPointer: {
		            lineStyle: {
		                color: 'none', //不显示线条
		            },
		        },
		        backgroundColor: 'rgba(255, 255, 255, 0.5)',
		        textStyle: {
		            align: 'left',
		            fontSize: 12,
		            color: '#333333',
		        },
		        extraCssText: 'box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2)' //添加阴影
		    },
		    color: ['#0580f2', '#faa732', '#e1575d'],
		    grid: {
		        left: '5%',
		        right: '6%',
		        top: '14%',
		        bottom: '6%',
		        containLabel: true
		    },
		    legend: {
		        show: true,
		        icon: 'circle',
		        right: 20,
		        textStyle: {
		            fontSize: 12,
		            color: '#333333'
		        },
		        data: ['发明专利', '外观专利', '实用新型']
		    },
		    xAxis: {
		        show: true,
		        type: 'category',
		        axisTick: {
		            show: true
		        },
		        axisLine: {
		            show: true,
		            lineStyle: {
		                color: '#eee',
		            }
		        },
		        axisLabel: {
		            textStyle: {
		                fontSize: 14,
		                color: '#999'
		            }
		        },
		        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		    },
		    yAxis: {
		        show: true,
		        type: 'value',
		        axisTick: {
		            show: true
		        },
		        axisLine: {
		            show: true,
		        },
		        splitLine: {
		            show: true,
		            lineStyle: {
		                color: '#eee'
		            }
		        },
		        axisLabel: {
		            textStyle: {
		                fontSize: 12,
		                color: '#999'
		            }
		        }
		    },
		    series: data
		};
		return option;
	}
	// 关系图
	function getGraphOption() {
		option = {
		    tooltip: {},
		    animationDurationUpdate: 1500,
		    animationEasingUpdate: 'quinticInOut',
		    label: {
		        normal: {
		            show: true,
		            textStyle: {
		                fontSize: 14
		            },
		        }
		    },
		    legend: {
		        x: "right",
		        data: ["企业", "人"]
		    },
		    series: [
		        {
		            type: 'graph',
		            layout: 'force',
		            symbolSize: 60,
		            focusNodeAdjacency: true,
		            roam: true,
		            color: ['#907df3', '#26c6da'],
		            categories: [{
		                name: '企业'
		            }, {
		                name: '人'
		            }],
		            label: {
		                normal: {
		                    show: true,
		                    textStyle: {
		                        fontSize: 14
		                    },
		                }
		            },
		            force: {
		                repulsion: 2000
		            },
		            //edgeSymbol: ['pin'],
		            //edgeSymbolSize: [1, 10],
		            edgeLabel: {
		                normal: {
		                    show: true,
		                    textStyle: {
		                        fontSize: 12,
		                        color: '#395369'
		                    },
		                    formatter: "{c}"
		                }
		            },
		            data: [ 
			            {
			                name: '张某某',
			                category: 1
			            },
			            {
			                name: 'A制药有限公司',
			                category: 0
			            },
			            {
			                name: 'B制药有限公司',
			                category: 0
			            },
			            {
			                name: '李某某',
			                category: 1
			            },
			            {
			                name: '赵某某',
			                category: 1
			            },
			            {
			                name: '何某某',
			                category: 1
			            },
			            {
			                name: '陆某某',
			                category: 1
			            }
		            ],
		            links: [{
		                source: 'A制药有限公司',
		                target: '李某某',
		                value: '质量负责人'
		            },
		            {
		                source: 'A制药有限公司',
		                target: '何某某',
		                value: '法定代表人'
		            },
		            {
		                source: 'A制药有限公司',
		                target: '陆某某',
		                value: '质量授权人'
		            },
		            {
		                source: 'A制药有限公司',
		                target: '赵某某',
		                value: '企业负责人'
		            }, 
		            {
		                source: 'B制药有限公司',
		                target: '赵某某',
		                value: '企业负责人'
		            },
		            {
		                source: 'A制药有限公司',
		                target: '张某某',
		                value: '生产负责人'
		            }, 
		            {
		                source: 'B制药有限公司',
		                target: '张某某',
		                value: '法定代表人'
		            }
		            ],
		            lineStyle: {
		                normal: {
		                    opacity: 0.7,
		                    width: 1,
		                    curveness: 0.1
		                }
		            }
		        }
		    ]
		};
		return option;
	}
});
