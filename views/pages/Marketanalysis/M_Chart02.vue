<template>
    <!-- <div id="mChart02" style="width: 100%" ref="mChart02"></div> -->
    <div style="width: 100%; height: 100%" ref="mChart02Wrap">
        <div ref="mChart02" id="mChart02" style="width: 100%; height: 100%; background: #ffffff"></div>
    </div>
</template>

<script>
import COMMON_UTIL from "../../../resources/js/commonUtil.js";

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

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

        type: {
            type: String,
            default: "large",
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

            if (COMMON_UTIL.isEmpty(this.charts["mChart02"]) == false) {
                this.charts["mChart02"].dispose();
            }

            let chartWarp = this.$refs["mChart02Wrap"];
            chartWarp.innerHTML = "";
            let div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            chartWarp.appendChild(div);

            let root = am5.Root.new(div);
            this.charts["mChart02"] = root;

            root.setThemes([am5themes_Animated.new(root)]);

            let chart = root.container.children.push(
                am5percent.PieChart.new(root, {
                    layout: root.verticalLayout,
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[fontFamily: GmarketSansMedium]{category} : {value}개",
                    }),
                })
            );

            let series = chart.series.push(
                am5percent.PieSeries.new(root, {
                    valueField: "count",
                    categoryField: "name",
                    fontFamily: "GmarketSansMedium",
                })
            );
            let bgColor = root.interfaceColors.get("background");

            series.slices.template.setAll({
                stroke: bgColor,
                strokeWidth: 1,
            });

            if (this.type == "large") {
                // 대분류 버튼 눌렀을 시
                series.data.setAll(chartData["largeType"]); // 대분류 데이터 할당
            } else {
                // 중분류 버튼 눌렀을 시
                series.data.setAll(chartData["mediumType"]); // 중분류 데이터 할당
            }

            let legend = chart.children.push(
                am5.Legend.new(root, {
                    centerX: am5.percent(50),
                    x: am5.percent(50),
                    marginTop: 15,
                    marginBottom: 15,
                })
            );

            legend.data.setAll(series.dataItems);

            //amChart 로고 삭제
            root._logo.dispose();
            series.labels.template.setAll({
                text: "{category}",
                textType: "circular",
                inside: true,
                radius: 10,
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });
            series.appear(1000, 100);
            legend.labels.template.setAll({
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });

            legend.valueLabels.template.setAll({
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });
        },
    },

    watch: {
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        chartData: function (newValue, oldValue) {
            // console.log('mChart02 watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },

        type: function (newValue, oldValue) {
            // console.log('mChart02 type watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },
    },

    mounted() { },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mChart02 {
    height: 50rem;
    padding-top: 2rem;
}
</style>
