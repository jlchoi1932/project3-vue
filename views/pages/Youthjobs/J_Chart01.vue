<template>
	<!-- <div id="jChart01" style="width: 100%" ref="jChart01"></div> -->
	<div style="width: 100%; height: 100%;" ref="jChart01Wrap">
        <div ref="jChart01" id="jChart01" style="width: 100%; height: 100%; background: #ffffff;"></div>
    </div>
</template>

<script>
import COMMON_UTIL from "../../../resources/js/commonUtil.js";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default {
	props: {
		chartDataName: {
			type: Array,
			default: []
		},

		chartData: {
			type: Array,
			default: []
		},

		year: {
			type: Number,
			default: 2022
		},
	},

	data() {
		return {
            charts: {},
		};
	},

	methods: {
		createChart: function() {
			const vm = this;

			// props 차트 데이터 복사 및 변경 (삭제 X)
            let storage = JSON.parse(JSON.stringify(this.chartData));
			let chartData = [];
			// 전체 데이터에서 선택한 연도의 데이터만 추출
			for(let i = 0; i < storage.length; i ++ ) {
				if(storage[i]['pnttm'] == this.year) {
					chartData.push(storage[i]);
				}
			}

			if (COMMON_UTIL.isEmpty(this.charts["jChart01"]) == false) {
                this.charts["jChart01"].dispose();
            }

            let chartWarp = this.$refs["jChart01Wrap"];
            chartWarp.innerHTML = "";
            let div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            chartWarp.appendChild(div);

            let root = am5.Root.new(div);
            this.charts["jChart01"] = root;
			
            root.setThemes([am5themes_Animated.new(root)]);

			// 차트 테마 선택
            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    layout: root.verticalLayout,
                })
            );

            // x축 추가
            let xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    renderer: am5xy.AxisRendererX.new(root, {}),
                    categoryField: "age_section",
                })
            );

            // 왼쪽 y축 추가
            let yAxisLeft = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {}),
                    // min: 0,
                })
            );

            // 전입 기둥 차트 생성 (전출 차트 뒤에 배치하기 위해 먼저 선언: 전입 차트 사이즈를 크게 & 배경으로 쓰기 위해)
            let columnSeries1 = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "전입",
                    xAxis: xAxis,
                    yAxis: yAxisLeft,
                    valueYField: "tot_trnsfrn",
                    categoryXField: "age_section",
                    clustered: false,
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[fontFamily: GmarketSansMedium]{name}: {valueY}명",
                        fontFamily: "GmarketSansMedium",
                    }),
                })
            );

            // 전입 기둥 차트 옵션
            columnSeries1.columns.template.setAll({
                width: am5.percent(60),
                fill: am5.color(0xabc6df),
                fillOpacity: 0.5,
                strokeOpacity: 0,
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
                cursorOverStyle: "pointer",
            });

            // 전출 기둥 차트 생성
            let columnSeries0 = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "전출",
                    xAxis: xAxis,
                    yAxis: yAxisLeft,
                    valueYField: "tot_mvt",
                    categoryXField: "age_section",
                    clustered: false,
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[fontFamily: GmarketSansMedium]{name}: {valueY}명",
                        fontFamily: "GmarketSansMedium",
                    }),
                })
            );

            // 전출 기둥 차트 옵션
            columnSeries0.columns.template.setAll({
                width: am5.percent(40),
                fill: am5.color(0x5277ad),
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
                cursorOverStyle: "pointer",
            });

            // 마우스 커서 오버 시 효과
            let cursor = chart.set(
                "cursor",
                am5xy.XYCursor.new(root, {
                    behavior: "zoomX",
                })
            );
            cursor.lineY.set("visible", false);
			
			// 마우스 클릭 효과
			columnSeries0.columns.template.events.on("click", function(ev) {
				vm.$emit("selectAgeIndex", ev.target.dataItem.dataContext['age_section_index']);
			});
			columnSeries1.columns.template.events.on("click", function(ev) {
				vm.$emit("selectAgeIndex", ev.target.dataItem.dataContext['age_section_index']);
			});

            // 범례 생성
            let legend = chart.children.push(
                am5.Legend.new(root, {
                    x: am5.p50,
                    centerX: am5.p50,
                })
            );

            // 범례 순서 변경
            let tmp = chart.series.values[1];
            chart.series.values.splice(1, 1);
            chart.series.values.unshift(tmp);

            // 범례 데이터 할당
            legend.data.setAll(chart.series.values);

            // x축 범주 명 데이터 할당
            xAxis.data.setAll(chartData);

            // 기둥 차트 데이터 할당
            columnSeries1.data.setAll(chartData);
            columnSeries0.data.setAll(chartData);

            //amChart 로고 삭제
            root._logo.dispose();

            // 차트 등장 시간
            columnSeries0.appear(1000);
            columnSeries1.appear(1000);
            chart.appear(1000, 100);

            legend.labels.template.setAll({
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });

            legend.valueLabels.template.setAll({
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });

            xAxis.get("renderer").labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });

            yAxisLeft.get("renderer").labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });
		}
	},

	watch: {
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        "chartData": function(newValue, oldValue){
            // console.log('jChart01 watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },

		"year": function(newValue, oldValue){
            // console.log('jChart01 year: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },
    },

	mounted() {

	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#jChart01 {
	height: 50rem;
	padding-top: 2rem;
}
</style>
