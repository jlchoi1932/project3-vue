<template>
    <!-- <div id="jChart07" style="width: 100%" ref="jChart07"></div> -->
    <div style="width: 100%; height: 100%" ref="jChart07Wrap">
        <div ref="jChart07" id="jChart07" style="width: 100%; height: 100%; background: #ffffff"></div>
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
            default: [],
        },

        chartData: {
            type: Array,
            default: [],
        },

        typeCode: {
            type: String,
            default: '30',
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
            let storage = JSON.parse(JSON.stringify(this.chartData));
            let chartData = [];
            // 전체 데이터에서 선택한 연도와 연령의 데이터만 추출
            for (let i = 0; i < storage.length; i++) {
                if (storage[i]["mlsfc_code"] == this.typeCode) {
                    storage[i]["year"] = storage[i]["year"] + "년";
                    chartData.push(storage[i]);
                }
            }
            // console.log('chartData: ', chartData);

            if (COMMON_UTIL.isEmpty(this.charts["jChart07"]) == false) {
                this.charts["jChart07"].dispose();
            }

            let chartWarp = this.$refs["jChart07Wrap"];
            chartWarp.innerHTML = "";
            let div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            chartWarp.appendChild(div);

            let root = am5.Root.new(div);
            this.charts["jChart07"] = root;

            root.setThemes([am5themes_Animated.new(root)]);

            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    layout: root.verticalLayout,
                })
            );
            // chart.set(
            //   "scrollbarX",
            //   am5.Scrollbar.new(root, {
            //     orientation: "horizontal",
            //   })
            // );

            let xRenderer = am5xy.AxisRendererX.new(root, {});
            let xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField: "year",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(root, {}),
                })
            );
            xRenderer.grid.template.setAll({
                location: 1,
            });

            xAxis.data.setAll(chartData);

            let yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    // min: 90000,
                    extraMax: 0.1,
                    renderer: am5xy.AxisRendererY.new(root, {
                        strokeOpacity: 0.1,
                    }),
                })
            );

            // 오른쪽 y축 렌더링 옵션
            let yRendererRight = am5xy.AxisRendererY.new(root, { opposite: true });
            yRendererRight.grid.template.set("forceHidden", true);

            // 오른쪽 y축 추가
            let yAxisRight = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                renderer: yRendererRight,
                extraMax: 0.1,
                extraMin: 0.1,
                strictMinMaxSelection: true,

                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
                })
            );
            yAxisRight.set("numberFormat", "#,###");

            let series1 = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "사업체 수",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "bsnes_co",
                    categoryXField: "year",
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText:
                            "[fontFamily: GmarketSansMedium]{categoryX} {name}: {valueY}개",
                    }),
                })
            );

            series1.columns.template.setAll({
                tooltipY: am5.percent(5),
                templateField: "columnSettings",
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
                strokeOpacity: 0,
                fontFamily: "GmarketSansMedium",
                fill: am5.color(0xabc6df),
            });

            series1.data.setAll(chartData);

            let series2 = chart.series.push(
                am5xy.LineSeries.new(root, {
                    name: "종사자 수",
                    xAxis: xAxis,
                    yAxis: yAxisRight,
                    valueYField: "enfsn_co",
                    categoryXField: "year",
                    maskBullets: false,
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText:
                            "[fontFamily: GmarketSansMedium]{categoryX} {name}: {valueY}명",
                    }),
                })
            );

            series2.strokes.template.setAll({
                strokeWidth: 3,
                templateField: "strokeSettings",
                fontFamily: "GmarketSansMedium",
            });

            series2.data.setAll(chartData);

            series2.bullets.push(function () {
                return am5.Bullet.new(root, {
                    sprite: am5.Circle.new(root, {
                        strokeWidth: 3,
                        stroke: series2.get("stroke"),
                        radius: 5,
                        fill: root.interfaceColors.get("background"),
                        fontFamily: "GmarketSansMedium",
                    }),
                });
            });

            chart.set("cursor", am5xy.XYCursor.new(root, {}));

            let legend = chart.children.push(
                am5.Legend.new(root, {
                    centerX: am5.p50,
                    x: am5.p50,
                })
            );
            legend.data.setAll(chart.series.values);

            chart.appear(1000, 100);
            series1.appear();
            legend.labels.template.setAll({
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });
            xAxis.get("renderer").labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });

            yAxis.get("renderer").labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });
            
            yAxisRight.get("renderer").labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });
            /* series1.get("colors").set("colors", [am5.color(0x5378ad)]);

            series2.get("colors").set("colors", [am5.color(0x698ec9)]); */

            root._logo.dispose();
        },
    },

    watch: {
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        chartData: function (newValue, oldValue) {
            // console.log('jChart07 watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },

        "typeCode": function (newValue, oldValue) {
            // console.log('jChart07 ageIndex: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },
    },

    mounted() { },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#jChart07 {
    height: 50rem;
    padding-top: 2rem;
    position: relative;
}
</style>
