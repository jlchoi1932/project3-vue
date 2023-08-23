<template>
    <!-- <div id="jChart05" style="width: 100%" ref="jChart05"></div> -->
    <div style="width: 100%; height: 100%;" ref="jChart05Wrap">
        <div ref="jChart05" id="jChart05" style="width: 100%; height: 100%; background: #ffffff;">
        </div>
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
            default: []
        },

        chartData: {
            type: Array,
            default: []
        },

        year: {
            type: Number,
            default: 2020
        },
    },

    data() {
        return {
            charts: {},

            chartYear: 2020,
        };
    },

    methods: {
        createChart: function () {
            const vm = this;

            // props 차트 데이터 복사 및 변경 (삭제 X)
            let storage = JSON.parse(JSON.stringify(this.chartData));
            let chartData = [];
            let count = 0;
            // 전체 데이터에서 선택한 연도의 데이터만 추출
            for (let i = 0; i < storage.length; i++) {
                if (storage[i]['pnttm'] == this.chartYear) {
                    // 상위 10개 산업만 추출
                    if(count < 10) {
                        chartData.push(storage[i]);
                        count ++;
                    }
                }
            }
            // console.log('chartData select year: ', chartData);

            if (COMMON_UTIL.isEmpty(this.charts["jChart05"]) == false) {
                this.charts["jChart05"].dispose();
            }

            let chartWarp = this.$refs["jChart05Wrap"];
            chartWarp.innerHTML = "";
            let div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            chartWarp.appendChild(div);

            let root = am5.Root.new(div);
            this.charts["jChart05"] = root;

            root.setThemes([am5themes_Animated.new(root)]);

            let container = root.container.children.push(
                am5.Container.new(root, {
                    width: am5.p100,
                    height: am5.p100,
                    layout: root.horizontalLayout,
                })
            );

            let chart = container.children.push(
                am5percent.PieChart.new(root, {
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[fontFamily: GmarketSansMedium]{category} : {value}%",
                    }),
                    labels: {
                        textType: "circular",
                        radius: 4,
                        fill: am5.color("#7b7b7b"),
                        fontFamily: "GmarketSansMedium",
                    },
                })
            );

            let series = chart.series.push(
                am5percent.PieSeries.new(root, {
                    valueField: "prtint_yy_pc",
                    categoryField: "lclas_nm",
                    // alignLabels: false,
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[fontFamily: GmarketSansMedium]{category} : {value}백만원",
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
            series.labels.template.setAll({
                textType: "circular",
                radius: 4,
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });
            series.ticks.template.set("visible", false);
            // series.slices.template.set("toggleKey", "none");
            series.slices.template.setAll({
                toggleKey: "none",
                cursorOverStyle: "pointer",
            });

            // add events
            series.slices.template.events.on("click", function (e) {
                selectSlice(e.target);
                console.log('click: ', e.target.dataItem.dataContext);
                vm.$emit("selectTypeLargeCode", e.target.dataItem.dataContext['indust_code']);
                vm.$emit("selectTypeMediumCode", e.target.dataItem.dataContext['subData'][0]['mlsfc_code']);
            });

            let subChart = container.children.push(
                am5percent.PieChart.new(root, {
                    radius: am5.percent(50),
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[fontFamily: GmarketSansMedium][bold]{category} : {value}%",
                    }),
                    labels: {
                        textType: "circular",
                        radius: 4,
                        fill: am5.color("#7b7b7b"),
                        fontFamily: "GmarketSansMedium",
                    },
                })
            );

            let subSeries = subChart.series.push(
                am5percent.PieSeries.new(root, {
                    valueField: "enfsn_co",
                    categoryField: "mlsfc_nm",
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[fontFamily: GmarketSansMedium]{category} : {value}명",
                    }),
                    labels: {
                        textType: "circular",
                        radius: 4,
                        fill: am5.color("#7b7b7b"),
                        fontFamily: "GmarketSansMedium",
                    },
                })
            );

            subSeries.slices.template.events.on("click", function (e) {
                vm.$emit("selectTypeMediumCode", e.target.dataItem.dataContext['mlsfc_code']);
            });

            subSeries
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
            // subChart;
            subSeries.data.setAll([
                { mlsfc_nm: "A", enfsn_co: 0 },
                { mlsfc_nm: "B", enfsn_co: 0 },
                { mlsfc_nm: "C", enfsn_co: 0 },
                { mlsfc_nm: "D", enfsn_co: 0 },
                { mlsfc_nm: "E", enfsn_co: 0 },
                { mlsfc_nm: "F", enfsn_co: 0 },
                { mlsfc_nm: "G", enfsn_co: 0 },
            ]);
            subSeries.labels.template.setAll({
                textType: "circular",
                radius: 4,
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });
            // subSeries.slices.template.set("toggleKey", "none");
            subSeries.slices.template.setAll({
                toggleKey: "none",
                cursorOverStyle: "pointer",
            });

            let selectedSlice;

            series.on("startAngle", function () {
                updateLines();
            });

            container.events.on("boundschanged", function () {
                root.events.on("frameended", function () {
                    updateLines();
                });
            });

            function updateLines() {
                if (selectedSlice) {
                    let startAngle = selectedSlice.get("startAngle");
                    let arc = selectedSlice.get("arc");
                    let radius = selectedSlice.get("radius");

                    let x00 = radius * am5.math.cos(startAngle);
                    let y00 = radius * am5.math.sin(startAngle);

                    let x10 = radius * am5.math.cos(startAngle + arc);
                    let y10 = radius * am5.math.sin(startAngle + arc);

                    let subRadius = subSeries.slices.getIndex(0).get("radius");
                    let x01 = 0;
                    let y01 = -subRadius;

                    let x11 = 0;
                    let y11 = subRadius;

                    let point00 = series.toGlobal({ x: x00, y: y00 });
                    let point10 = series.toGlobal({ x: x10, y: y10 });

                    let point01 = subSeries.toGlobal({ x: x01, y: y01 });
                    let point11 = subSeries.toGlobal({ x: x11, y: y11 });

                    line0.set("points", [point00, point01]);
                    line1.set("points", [point10, point11]);
                }
            }

            // lines
            let line0 = container.children.push(
                am5.Line.new(root, {
                    position: "absolute",
                    stroke: root.interfaceColors.get("text"),
                    strokeDasharray: [2, 2],
                })
            );
            let line1 = container.children.push(
                am5.Line.new(root, {
                    position: "absolute",
                    stroke: root.interfaceColors.get("text"),
                    strokeDasharray: [2, 2],
                })
            );

            series.data.setAll(chartData);

            function selectSlice(slice) {
                selectedSlice = slice;
                let dataItem = slice.dataItem;
                let dataContext = dataItem.dataContext;

                if (dataContext) {
                    let i = 0;
                    subSeries.data.each(function (dataObject) {
                        let dataObj = dataContext.subData[i];
                        if (dataObj) {
                            subSeries.data.setIndex(i, dataObj);
                            if (!subSeries.dataItems[i].get("visible")) {
                                subSeries.dataItems[i].show();
                            }
                        } else {
                            subSeries.dataItems[i].hide();
                        }

                        i++;
                    });
                }

                let middleAngle = slice.get("startAngle") + slice.get("arc") / 2;
                let firstAngle = series.dataItems[0].get("slice").get("startAngle");

                series.animate({
                    key: "startAngle",
                    to: firstAngle - middleAngle,
                    duration: 1000,
                    easing: am5.ease.out(am5.ease.cubic),
                });
                series.animate({
                    key: "endAngle",
                    to: firstAngle - middleAngle + 360,
                    duration: 1000,
                    easing: am5.ease.out(am5.ease.cubic),
                });
            }

            root._logo.dispose();

            container.appear(1000, 10);

            series.events.on("datavalidated", function() {
                selectSlice(series.slices.getIndex(0));
            });
        }
    },

    watch: {
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        "chartData": function (newValue, oldValue) {
            // console.log('jChart05 watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },

        "year": function (newValue, oldValue) {
            // console.log('jChart05 year: ', newValue, oldValue);
            // 2020년 이상이 선택됐을 경우 2020년으로 고정 (2020년 이후 데이터가 X)
            if (newValue > 2020) {
                this.chartYear = 2020;
            } else if (newValue < 2019){
                this.chartYear = 2019;
            } else {
                this.chartYear = newValue;
            }
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
#jChart05 {
    position: relative;
}


</style>
