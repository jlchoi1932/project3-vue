<template>
    <!-- <div class="chartrow01" id="chartrow01"></div> -->
    <div style="width: 100%; height: 100%" ref="chartrow01Wrap">
        <div ref="chartrow01" id="chartrow01" style="width: 100%; height: 100%; background: #ffffff"></div>
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
            if (this.chartDataName["name"] == "touristSpotCountList") {
                // 연도별 관광지별 입장 수 차트 데이터일 경우
                for (let i = 0; i < chartData.length; i++) {
                    chartData[i]["unit"] = "명";
                }
            } else if (this.chartDataName["name"] == "sphRateByAdministzoneList") {
                // 행정구역 별 1인가구 비율 차트 데이터일 경우
                for (let i = 0; i < chartData.length; i++) {
                    chartData[i]["trrsrt_nm"] = chartData[i]["administzone_accto"];
                    delete chartData[i]["administzone_accto"];

                    chartData[i]["sm"] = chartData[i]["single_hshld_rate"];
                    delete chartData[i]["single_hshld_rate"];

                    chartData[i]["unit"] = "%";
                }
                // console.log('success: ', chartData);
            } else {
                console.log("fail");
            }

            // let root = am5.Root.new('chartrow01');

            if (COMMON_UTIL.isEmpty(this.charts["chartrow01"]) == false) {
                this.charts["chartrow01"].dispose();
            }

            let chartWarp = this.$refs["chartrow01Wrap"];
            chartWarp.innerHTML = "";
            let div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            chartWarp.appendChild(div);

            let root = am5.Root.new(div);
            this.charts["chartrow01"] = root;

            root.setThemes([am5themes_Animated.new(root)]);

            let myTheme = am5.Theme.new(root);
            myTheme.rule("Grid", ["base"]).setAll({
                strokeOpacity: 0.1,
            });

            root.setThemes([am5themes_Animated.new(root), myTheme]);

            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    wheelX: "none",
                    wheelY: "none",
                })
            );

            let yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30 });
            yRenderer.grid.template.set("location", 1);

            let yAxis = chart.yAxes.push(
                am5xy.CategoryAxis.new(root, {
                    maxDeviation: 0,
                    categoryField: "trrsrt_nm",
                    renderer: yRenderer,
                })
            );

            let xAxis = chart.xAxes.push(
                am5xy.ValueAxis.new(root, {
                    maxDeviation: 0,
                    // min: 0,
                    renderer: am5xy.AxisRendererX.new(root, {
                        visible: true,
                        strokeOpacity: 0.1,
                    }),
                })
            );
            if (this.chartDataName["name"] == "touristSpotCountList") {
                xAxis.set("numberFormat", "#'");
            } else if (this.chartDataName["name"] == "sphRateByAdministzoneList") {
                xAxis.set("numberFormat", "#'%");
            }

            let series = null;
            if (this.chartDataName["name"] == "touristSpotCountList") {
                series = chart.series.push(
                    am5xy.ColumnSeries.new(root, {
                        name: "관광지 입장 수",
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueXField: "sm",
                        sequencedInterpolation: true,
                        categoryYField: "trrsrt_nm",
                        tooltip: am5.Tooltip.new(root, {
                            pointerOrientation: "horizontal",
                            labelText:
                                "[fontFamily: GmarketSansMedium]{categoryY}: {valueX}{unit}",
                            fontFamily: "GmarketSansMedium",
                        }),
                    })
                );
            } else if (this.chartDataName["name"] == "sphRateByAdministzoneList") {
                series = chart.series.push(
                    am5xy.ColumnSeries.new(root, {
                        name: "1인가구",
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueXField: "sm",
                        sequencedInterpolation: true,
                        categoryYField: "trrsrt_nm",
                        tooltip: am5.Tooltip.new(root, {
                            pointerOrientation: "horizontal",
                            labelText:
                                "[fontFamily: GmarketSansMedium]{name} 비율: {valueX}{unit}[/]\n[fontFamily: GmarketSansMedium]{name} 수: {single_hshld}가구",
                            fontFamily: "GmarketSansMedium",
                        }),
                    })
                );
            }

            let columnTemplate = series.columns.template;

            columnTemplate.setAll({
                draggable: true,
                // cursorOverStyle: "pointer",
                tooltipText: "차트를 드래그 하세요",
                cornerRadiusBR: 10,
                cornerRadiusTR: 10,
                strokeOpacity: 0,
            });
            columnTemplate.adapters.add("fill", (fill, target) => {
                return chart.get("colors").getIndex(series.columns.indexOf(target));
            });

            columnTemplate.adapters.add("stroke", (stroke, target) => {
                return chart.get("colors").getIndex(series.columns.indexOf(target));
            });

            chart
                .get("colors")
                .set("colors", [
                    am5.color(0x234a6f),
                    am5.color(0x80a1d3),
                    am5.color(0xc3d3ec),
                    am5.color(0xabc6df),
                    am5.color(0xff7369),
                ]);

            columnTemplate.events.on("dragstop", () => {
                sortCategoryAxis();
            });

            // Get series item by category
            function getSeriesItem(category) {
                for (var i = 0; i < series.dataItems.length; i++) {
                    let dataItem = series.dataItems[i];
                    if (dataItem.get("categoryY") == category) {
                        return dataItem;
                    }
                }
            }

            // Axis sorting
            function sortCategoryAxis() {
                // Sort by value
                series.dataItems.sort(function (x, y) {
                    return y.get("graphics").y() - x.get("graphics").y();
                });

                let easing = am5.ease.out(am5.ease.cubic);

                // Go through each axis item
                am5.array.each(yAxis.dataItems, function (dataItem) {
                    // get corresponding series item
                    let seriesDataItem = getSeriesItem(dataItem.get("category"));

                    if (seriesDataItem) {
                        // get index of series data item
                        let index = series.dataItems.indexOf(seriesDataItem);

                        let column = seriesDataItem.get("graphics");

                        // position after sorting
                        let fy =
                            yRenderer.positionToCoordinate(yAxis.indexToPosition(index)) -
                            column.height() / 2;

                        // set index to be the same as series data item index
                        if (index != dataItem.get("index")) {
                            dataItem.set("index", index);

                            // current position
                            let x = column.x();
                            let y = column.y();

                            column.set("dy", -(fy - y));
                            column.set("dx", x);

                            column.animate({
                                key: "dy",
                                to: 0,
                                duration: 600,
                                easing: easing,
                            });
                            column.animate({
                                key: "dx",
                                to: 0,
                                duration: 600,
                                easing: easing,
                            });
                        } else {
                            column.animate({
                                key: "y",
                                to: fy,
                                duration: 600,
                                easing: easing,
                            });
                            column.animate({
                                key: "x",
                                to: 0,
                                duration: 600,
                                easing: easing,
                            });
                        }
                    }
                });

                yAxis.dataItems.sort(function (x, y) {
                    return x.get("index") - y.get("index");
                });
            }
            // 차트 스크롤바
            // chart.set(
            //     "scrollbarX",
            //     am5.Scrollbar.new(root, {
            //         orientation: "horizontal",
            //     })
            // );

            yAxis.data.setAll(chartData);
            series.data.setAll(chartData);

            root._logo.dispose();

            series.appear(1000);
            chart.appear(1000, 100);

            xAxis.get("renderer").labels.template.setAll({
                fontSize: 10,
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
            });

            yAxis.get("renderer").labels.template.setAll({
                fontFamily: "GmarketSansMedium",
                fill: am5.color("#7b7b7b"),
                maxWidth: 100,
                breakWords: false,
                textAlign: "center",
                oversizedBehavior: "truncate",
                ellipsis: "...",
            });
        },
    },

    watch: {
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        chartData: function (newValue, oldValue) {
            // console.log('ChartRow01 watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },
    },

    mounted() { },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chartrow01 {
    height: 23rem;
}
</style>
