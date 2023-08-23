<template>
    <div class="chart01" id="chartdiv01"></div>
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
        return {};
    },

    methods: {
        // 차트 생성 함수
        createChart: function () {
            // 임시 차트 데이터 (props 차트 데이터 없을 시)
            /* let chartData = [
                      {sm_increase: 0, year: "2019년", sm_sum: 1582253, sm_presum: 0},
                      {sm_increase: -44.13, year: "2020년", sm_sum: 884008, sm_presum: 1582253},
                      {sm_increase: -22.59, year: "2021년", sm_sum: 684274, sm_presum: 884008},
                      {sm_increase: -16.22, year: "2022년", sm_sum: 573262, sm_presum: 684274}
                  ]; */

            // props 차트 데이터 복사 및 변경 (삭제 X)
            let chartData = JSON.parse(JSON.stringify(this.chartData));
            if (this.chartDataName["name"] == "touristCountList") {
                // 연도별 관광지 관광객 차트 데이터일 경우
                for (let i = 0; i < chartData.length; i++) {
                    /* 차트 개별 속성값 넣기 */
                    if (i == 0) {
                        chartData[i]["컬럼명"] = "컬럼값01";
                    } else if (i == 1) {
                        chartData[i]["컬럼명"] = "컬럼값02";
                    }
                    /* 차트 개별 속성값 넣기(끝)*/

                    chartData[i]["year"] = chartData[i]["year"] + "년"; // 정수 year => 문자열 year + "년"
                }
                // console.log("컬럼을 추가한 차트 데이터: ", chartData);
            } else {
                console.log("fail");
            }

            // root 요소 및 id 생성
            let root = am5.Root.new("chartdiv01");

            const myTheme = am5.Theme.new(root);

            myTheme.rule("Label").setAll({
                // forceHidden: true,
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });

            root.setThemes([am5themes_Animated.new(root), myTheme]);


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

            // x축 렌더링 옵션
            let xRenderer = am5xy.AxisRendererX.new(root, {});
            xRenderer.grid.template.setAll({
                location: 1,
            });
            xRenderer.labels.template.setAll({
                paddingTop: 30,
                /* fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"), */
            });

            // 왼쪽 y축 렌더링 옵션
            let yRendererLeft = am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1,
            });
            yRendererLeft.labels.template.setAll({
                paddingRight: 30,
                /* fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"), */
            });

            // 오른쪽 y축 렌더링 옵션
            let yRendererRight = am5xy.AxisRendererY.new(root, { opposite: true });
            yRendererRight.grid.template.set("forceHidden", true);
            yRendererRight.labels.template.setAll({
                paddingLeft: 30,
                /* fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"), */
            });

            // x축 추가
            let xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField: "year",
                    renderer: xRenderer,
                    // fontFamily: "GmarketSansMedium",
                    // fill: am5.color("#7b7b7b"),
                })
            );

            // 왼쪽 y축 추가
            let yAxisLeft = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: yRendererLeft,
                    min: 0,
                    // extraMin: 0.1,
                    // extraMax: 0.1,
                    // strictMinMaxSelection: true,
                    // fontFamily: "GmarketSansMedium",
                    // fill: am5.color("#7b7b7b"),
                })
            );

            // 오른쪽 y축 추가
            let yAxisRight = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: yRendererRight,
                    extraMax: 0.1,
                    extraMin: 0.1,
                    strictMinMaxSelection: true,
                }),
            );
            yAxisRight.set("numberFormat", "#'%");

            /* xAxis.get("renderer").labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });

            yAxisRight.get("renderer").labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });

            yAxisLeft.get("renderer").labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            }); */

            // 왼쪽 관련 차트 내용 생성
            let series1 = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "관광객 수",
                    xAxis: xAxis,
                    yAxis: yAxisLeft,
                    valueYField: "sm_sum",
                    categoryXField: "year",
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText:
                            "[fontFamily: GmarketSansMedium]{categoryX} {name}: {valueY}명",
                        pointerOrientation: "vertical",
                    }),
                    fill: am5.color("#5378ad"),
                })
            );

            // 왼쪽 관련 차트 내용 옵션
            series1.columns.template.setAll({
                tooltipY: am5.percent(5),
                templateField: "columnSettings",
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
                strokeOpacity: 0,
                // fontFamily: "GmarketSansMedium",
            });

            series1.columns.template.adapters.add("fill", function (fill, target) {
                return chart.get("colors").getIndex(series1.columns.indexOf(target));
            });
            series1.columns.template.adapters.add(
                "stroke",
                function (stroke, target) {
                    return chart.get("colors").getIndex(series1.columns.indexOf(target));
                }
            );

            // 오른쪽 관련 차트 내용 생성
            let series2 = chart.series.push(
                am5xy.LineSeries.new(root, {
                    name: "증감률",
                    xAxis: xAxis,
                    yAxis: yAxisRight,
                    valueYField: "sm_increase",
                    categoryXField: "year",
                    stroke: root.interfaceColors.get("alternativeBackground"),
                    maskBullets: false,
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText:
                            "[fontFamily: GmarketSansMedium]작년 대비 {name} : {valueY}% (작년 관광객 수: {sm_presum}명)",
                    }),
                })
            );
            
            // 오른쪽 관련 차트 내용 옵션
            series2.strokes.template.setAll({
                strokeWidth: 3,
                templateField: "strokeSettings",
                // fontFamily: "GmarketSansMedium",
            });
            series2.strokes.template.adapters.add(
                "stroke",
                function (stroke, target) {
                    return "#3c3b3f";
                }
            );

            series2.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationY: 1,
                    sprite: am5.Circle.new(root, {
                        strokeWidth: 3,
                        stroke: series2.get("stroke"),
                        radius: 5,
                        fill: root.interfaceColors.get("background"),
                    }),
                });
            });

            // // 차트 스크롤 바
            // let scrollbar = chart.set("scrollbarX", am5.Scrollbar.new(root, {
            //     orientation: "horizontal",
            // }));

            // 마우스 커서 오버 시 효과
            let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {})); // 십자선 효과
            cursor.lineY.set("visible", false); // y축 커서 선 비활성화

            // 범례 생성
            let legend = chart.children.push(
                am5.Legend.new(root, {
                    centerX: am5.p50,
                    x: am5.p50,
                })
            );
            legend.data.setAll(chart.series.values);

            legend.labels.template.setAll({
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });

            // x축 범주 명 데이터 할당
            xAxis.data.setAll(chartData);
            // 차트 내용 데이터 할당
            series1.data.setAll(chartData);
            series2.data.setAll(chartData);

            //amChart 로고 삭제
            root._logo.dispose();

            // 차트 등장 시간
            series1.appear(1000);
            chart.appear(1000, 100);
            chart
                .get("colors")
                .set("colors", [
                    /* am5.color(0x5378ad),
                    am5.color(0x234a6f),
                    am5.color(0x80a1d3),
                    am5.color(0xc3d3ec),
                    am5.color(0xabc6df), */
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
            // console.log("chart01 watch: ", newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },
    },

    mounted() { },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart01 {
    height: 40rem;
    width: 100%;
}
</style>
