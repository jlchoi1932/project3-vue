<template>
    <div style="width: 100%; height: 400px" ref="chartdiv03Wrap">
        <div ref="chartdiv03" id="chartdiv03" style="width: 100%; height: 100%; background: #ffffff"></div>
    </div>
</template>

<script>
import COMMON_UTIL from "../../resources/js/commonUtil.js";

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";

export default {
    props: {
        chartDataName: {
            type: Array,
            default: [],
        },

        chartData: {
            type: Array,
            default: [],
        },
    },

    data() {
        return {
            charts: {},
        };
    },

    methods: {
        createChart: function () {
            // props 차트 데이터 복사 및 변경 (삭제 X)
            let chartData = JSON.parse(JSON.stringify(this.chartData));
            if (this.chartDataName["name"] == "touristInflowBySignguList") {
                // 연도별 시군구 방문객 유입 수 차트 데이터일 경우
                for (let i = 0; i < chartData.length; i++) {
                    chartData[i]["bsis_locgov_nm"] =
                        chartData[i]["wdr_locgov_nm"] +
                        " " +
                        chartData[i]["bsis_locgov_nm"]; // 행정구역 + 시군구 명 합치기
                }
                // console.log("success: ", chartData);
            } else {
                console.log("fail");
            }

            // root 요소 및 id 생성
            // let root = am5.Root.new("chartdiv03");

            if (COMMON_UTIL.isEmpty(this.charts["chartdiv03"]) == false) {
                this.charts["chartdiv03"].dispose();
            }

            let chartWarp = this.$refs["chartdiv03Wrap"];
            chartWarp.innerHTML = "";
            let div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            chartWarp.appendChild(div);

            let root = am5.Root.new(div);
            this.charts["chartdiv03"] = root;

            root.setThemes([am5themes_Animated.new(root)]);

            // 차트 테마 선택 (파이 차트)
            let chart = root.container.children.push(
                am5percent.PieChart.new(root, {
                    layout: root.verticalLayout,
                    innerRadius: am5.percent(40),
                })
            );

            // 차트 내용 생성
            let series = chart.series.push(
                am5percent.PieSeries.new(root, {
                    categoryField: "bsis_locgov_nm",
                    valueField: "bsis_locgov_visitr_co",
                    alignLabels: true,
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[fontFamily: GmarketSansMedium]{category} : {value}명",
                    }),
                })
            );

            series
                .get("colors")
                .set("colors", [
                    am5.color(0x5378ad),
                    am5.color(0x698ec9),
                    am5.color(0x80a1d3),
                    am5.color(0x799aca),
                    am5.color(0x8daed5),
                    am5.color(0xabc6df),
                    am5.color(0x719fc9),
                    am5.color(0xe5eef9),
                    am5.color(0x888888),
                    am5.color(0xafafae),
                    am5.color(0xd8d8d8),
                ]);
            // 차트 내용 옵션
            series.labels.template.setAll({
                textType: "circular",
                centerX: 0,
                centerY: 0,
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });

            // 차트 데이터 할당
            series.data.setAll(chartData);

            // 범례 생성
            let legend = chart.children.push(
                am5.Legend.new(root, {
                    centerX: am5.percent(50),
                    x: am5.percent(50),
                    marginTop: 15,
                    marginBottom: 15,
                })
            );

            legend.labels.template.setAll({
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });

            legend.valueLabels.template.setAll({
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });

            // 차트 데이터 할당
            series.data.setAll(chartData);

            // 범례 데이터 할당
            legend.data.setAll(series.dataItems);

            //amChart 로고 삭제
            root._logo.dispose();

            series.appear(1000, 100);
        },
    },

    watch: {
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        chartData: function (newValue, oldValue) {
            // console.log('chart03 watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },
    },

    mounted() { },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart03 {
    height: 50rem;
    padding-top: 2rem;
}
</style>
