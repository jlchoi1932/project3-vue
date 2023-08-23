<template>
    <!-- <div class="chart07" ref="chartdiv"></div> -->
    <div style="width: 100%; height: 100%" ref="chart07Wrap">
        <div ref="chart07" id="chart07" style="width: 100%; height: 100%; background: #ffffff"></div>
    </div>
</template>

<script>
import COMMON_UTIL from "../../resources/js/commonUtil.js";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
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
            /* if(this.chartDataName['name'] == "sphCountByEmdList") { // 읍면동 별 1인 가구 수 차트 데이터일 경우
                      for(let i=0; i < chartData.length; i++) {
                          if(chartData[i]['emd'] = "합계") {
                              delete chartData[i];
                              break;
                          }
                      };
                      console.log('success: ', chartData);
                  } else {
                      console.log('fail');
                  } */

            if (COMMON_UTIL.isEmpty(this.charts["chart07"]) == false) {
                this.charts["chart07"].dispose();
            }

            let chartWarp = this.$refs["chart07Wrap"];
            chartWarp.innerHTML = "";
            let div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            chartWarp.appendChild(div);

            let root = am5.Root.new(div);
            this.charts["chart07"] = root;

            // let root = am5.Root.new(this.$refs.chartdiv);

            root.setThemes([am5themes_Animated.new(root)]);

            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX: true,
                })
            );

            let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);

            let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
            xRenderer.labels.template.setAll({
                centerY: am5.p50,
                centerX: am5.p50,
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });

            xRenderer.grid.template.setAll({
                location: 1,
            });

            let yRenderer = am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1, });
            yRenderer.labels.template.setAll({
                centerY: am5.p50,
                centerX: am5.p50,
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });

            let xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    renderer: xRenderer,
                    categoryField: "emd",
                    maxDeviation: 0.3,
                })
            );

            let yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: yRenderer,
                    extraMax: 0.1,
                    maxDeviation: 0.3,
                })
            );

            let series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "읍면동 별 1인가구",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "sm",
                    sequencedInterpolation: true,
                    categoryXField: "emd",
                    tooltip: am5.Tooltip.new(root, {
                        labelText: "[fontFamily: GmarketSansMedium]{valueY} 가구",
                        fontFamily: "GmarketSansMedium",
                    }),
                })
            );

            series.columns.template.setAll({
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
                strokeOpacity: 0,
            });
            series.columns.template.adapters.add("fill", function (fill, target) {
                return chart.get("colors").getIndex(series.columns.indexOf(target));
            });

            series.columns.template.adapters.add("stroke", function (stroke, target) {
                return chart.get("colors").getIndex(series.columns.indexOf(target));
            });

            xAxis.data.setAll(chartData);
            series.data.setAll(chartData);

            root._logo.dispose();

            series.appear(1000);
            chart.appear(1000, 100);

            chart
                .get("colors")
                .set("colors", [
                    am5.color(0x5378ad),
                    am5.color(0x234a6f),
                    am5.color(0x80a1d3),
                    am5.color(0xc3d3ec),
                    am5.color(0xabc6df),
                    am5.color(0x5378ad),
                    am5.color(0x234a6f),
                    am5.color(0x80a1d3),
                    am5.color(0xc3d3ec),
                    am5.color(0xabc6df),
                    am5.color(0x5378ad),
                    am5.color(0x234a6f),
                    am5.color(0x80a1d3),
                    am5.color(0xc3d3ec),
                    am5.color(0xabc6df),
                    am5.color(0x5378ad),
                ]);

            /* xAxis.get("renderer").labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });

            yAxis.get("renderer").labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            }); */
        },
    },

    watch: {
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        chartData: function (newValue, oldValue) {
            // console.log('chart07 watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },
    },

    mounted() { },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart07 {
    height: 23rem;
}
</style>
