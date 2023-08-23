<template>
    <!-- <div id="mChart03" style="width: 100%" ref="mChart03"></div> -->
    <div style="width: 100%; height: 100%" ref="mChart03Wrap">
        <div ref="mChart03" id="mChart03" style="width: 100%; height: 100%; background: #ffffff"></div>
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

        chartData2: {
            type: Array,
            default: [],
        },

        type: {
            type: String,
            default: "amount",
        },
    },

    data() {
        return {
            charts: {},

            // 1: 다른 한 쪽의 데이터가 들어온 상태, 0: 다른 한 쪽의 데이터를 아직 받지 못한 상태
            dataCheck: 0,
        };
    },

    methods: {
        createChart: function () {
            // props 차트 데이터 복사 및 변경 (삭제 X)
            let chartData = JSON.parse(JSON.stringify(this.chartData));
            let chartData2 = JSON.parse(JSON.stringify(this.chartData2));
            // console.log('consume data: ', chartData2);

            if (COMMON_UTIL.isEmpty(this.charts["mChart03"]) == false) {
                this.charts["mChart03"].dispose();
            }

            let chartWarp = this.$refs["mChart03Wrap"];
            chartWarp.innerHTML = "";
            let div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            chartWarp.appendChild(div);

            let root = am5.Root.new(div);
            this.charts["mChart03"] = root;

            root.setThemes([am5themes_Animated.new(root)]);

            let chart = root.container.children.push(
                am5percent.PieChart.new(root, {
                    layout: root.verticalLayout,
                    innerRadius: am5.percent(40),
                })
            );

            let series0 = chart.series.push(
                am5percent.PieSeries.new(root, {
                    valueField: "count",
                    categoryField: "name",
                    alignLabels: false,
                })
            );

            let bgColor = root.interfaceColors.get("background");

            series0.ticks.template.setAll({
                forceHidden: true,
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });
            series0.labels.template.setAll({
                forceHidden: true,
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });
            series0.slices.template.setAll({
                stroke: bgColor,
                strokeWidth: 2,
                tooltipText: "[fontFamily: GmarketSansMedium]{category}: {value}",
            });
            series0.slices.template.states.create("hover", { scale: 0.95 });

            let series1 = chart.series.push(
                am5percent.PieSeries.new(root, {
                    valueField: "count",
                    categoryField: "name",
                    alignLabels: true,
                })
            );

            series1.slices.template.setAll({
                stroke: bgColor,
                strokeWidth: 2,
                tooltipText: "[fontFamily: GmarketSansMedium]{category}: {value}개",
            });

            if (this.type == "amount") {
                // 이용 금액 버튼 눌렀을 시
                series0.data.setAll(chartData2["amount"]); // 이용 금액 데이터 할당
            } else {
                // 이용자 수 버튼 눌렀을 시
                series0.data.setAll(chartData2["count"]); // 이용자 수 데이터 할당
            }
            series1.data.setAll(chartData["smallType"]);

            // 가운데 라벨 표시
            let label = root.tooltipContainer.children.push(
                am5.Label.new(root, {
                    x: am5.p50,
                    y: am5.p50,
                    centerX: am5.p50,
                    centerY: am5.p50,
                    fill: am5.color(0x333333),
                    fontWeight: "bold",
                    fontSize: 20,
                })
            );
            if (this.type == "amount") {
                // 이용 금액 버튼 눌렀을 시
                label.set("text", "[fontFamily: GmarketSansMedium]이용 금액\n\n\n");
            } else {
                // 이용자 수 버튼 눌렀을 시
                label.set("text", "[fontFamily: GmarketSansMedium]이용자 수\n\n\n");
            }

            // 바깥쪽 차트 라벨 효과
            series1.labels.template.setAll({
                text: "{category}",
                textType: "circular",
                inside: true,
                radius: 10,
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });

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
            legend.data.setAll(series0.dataItems);

            //amChart 로고 삭제
            root._logo.dispose();

            series0.appear(1000, 100);
            series1.appear(1000, 100);
            series0
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
            series1
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
        },
    },

    watch: {
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        chartData: function (newValue, oldValue) {
            // console.log('mChart03 chartData watch: ', newValue, oldValue);

            // 데이터가 모두 들어왔다면 차트 생성
            if(this.dataCheck != 0) {
                this.createChart();
                this.dataCheck = 0;
            }
            this.dataCheck = 1;
        },

        chartData2: function (newValue, oldValue) {
            // console.log('mChart03 chartData2 watch: ', newValue, oldValue);

            // 데이터가 모두 들어왔다면 차트 생성
            if(this.dataCheck != 0) {
                this.createChart();
                this.dataCheck = 0;
            }
            this.dataCheck = 1;
        },

        type: function (newValue, oldValue) {
            // console.log('mChart03 type watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },
    },

    mounted() { },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mChart03 {
    height: 50rem;
    padding-top: 2rem;
}
</style>
