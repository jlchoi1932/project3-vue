<template>
    <!-- <div id="jChart04" style="width: 100%" ref="jChart04"></div> -->
    <div style="width: 100%; height: 100%" ref="jChart04Wrap">
        <div ref="jChart04" id="jChart04" style="width: 100%; height: 100%; background: #ffffff"></div>
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

        ageIndex: {
            type: Number,
            default: 1,
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
                if (storage[i]["age_index"] == this.ageIndex) {
                    chartData.push(storage[i]);
                }
            }

            if (COMMON_UTIL.isEmpty(this.charts["jChart04"]) == false) {
                this.charts["jChart04"].dispose();
            }

            let chartWarp = this.$refs["jChart04Wrap"];
            chartWarp.innerHTML = "";
            let div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            chartWarp.appendChild(div);

            let root = am5.Root.new(div);
            this.charts["jChart04"] = root;

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

            // Add legend
            // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
            // let legend = chart.children.push(am5.Legend.new(root, {
            //   centerX: am5.p50,
            //   x: am5.p50
            // }))

            let yAxis = chart.yAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField: "jssfc_mlsfc",
                    renderer: am5xy.AxisRendererY.new(root, {
                        inversed: true,
                        cellStartLocation: 0.1,
                        cellEndLocation: 0.9,
                    }),
                })
            );
            yAxis.get("renderer").labels.template.setAll({
                oversizedBehavior: "truncate",
                maxWidth: 200,
            });

            yAxis.data.setAll(chartData);

            let xAxis = chart.xAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererX.new(root, {
                        strokeOpacity: 0.1,
                    }),
                    // min: 0,
                })
            );
            xAxis.set("numberFormat", "#,###'");

            function createSeries(field, name) {
                let series = chart.series.push(
                    am5xy.ColumnSeries.new(root, {
                        name: name,
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueXField: field,
                        categoryYField: "jssfc_mlsfc",
                        sequencedInterpolation: true,
                        tooltip: am5.Tooltip.new(root, {
                            pointerOrientation: "horizontal",
                            labelText:
                                "[fontFamily: GmarketSansMedium]{name} [/]\[fontFamily: GmarketSansMedium]구직:{valueX}명",
                        }),
                    })
                );

                series.columns.template.setAll({
                    height: am5.p100,
                    strokeOpacity: 0,
                    fontFamily: "GmarketSansMedium",
                    cornerRadiusBR: 5,
                    cornerRadiusTR: 5,
                });

                /* series.bullets.push(function () {
                    return am5.Bullet.new(root, {
                        locationX: 1,
                        locationY: 0.5,
                        sprite: am5.Label.new(root, {
                            centerY: am5.p50,
                            text: "{valueX}",
                            populateText: true,
                            fontFamily: "GmarketSansMedium",
                        }),
                    });
                }); */

                series.bullets.push(function () {
                    return am5.Bullet.new(root, {
                        locationX: 1,
                        locationY: 0.5,
                        sprite: am5.Label.new(root, {
                            centerX: am5.p100,
                            centerY: am5.p50,
                            text: "{valueX}명",
                            fill: am5.color(0xffffff),
                            populateText: true,
                            fontFamily: "GmarketSansMedium",
                        }),
                    });
                });

                series.data.setAll(chartData);
                series.appear();

                return series;
            }

            createSeries("2019년", "2019년");
            createSeries("2020년", "2020년");
            createSeries("2021년", "2021년");
            createSeries("2022년", "2022년");

            let legend = chart.children.push(
                am5.Legend.new(root, {
                    centerX: am5.p50,
                    x: am5.p50,
                })
            );

            legend.data.setAll(chart.series.values);
            
            legend.labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });

            let cursor = chart.set(
                "cursor",
                am5xy.XYCursor.new(root, {
                    behavior: "zoomY",
                })
            );
            cursor.lineY.set("forceHidden", true);
            cursor.lineX.set("forceHidden", true);

            chart.appear(1000, 100);
            xAxis.get("renderer").labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });

            yAxis.get("renderer").labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });

            root._logo.dispose();
        },
    },

    watch: {
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        chartData: function (newValue, oldValue) {
            // console.log('jChart04 watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },

        ageIndex: function (newValue, oldValue) {
            // console.log('jChart04 ageIndex: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },
    },

    mounted() { },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#jChart04 {
    height: 50rem;
    padding-top: 2rem;
}
</style>
