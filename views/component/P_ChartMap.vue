<template>
    <!-- <div id="map" ref="map" style=""></div> -->
    <div style="width: 100%; height: 400px" ref="mapWrap">
        <div ref="map" id="map" style="width: 100%; height: 100%; background: #ffffff"></div>
    </div>
</template>

<script>
import COMMON_UTIL from "../../resources/js/commonUtil.js";

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_yeongcheon from "./map.js";

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
        // 차트 생성 함수
        createChart: function () {
            const vm = this;
            // props 차트 데이터 복사 및 변경 (삭제 X)
            let chartData = JSON.parse(JSON.stringify(this.chartData));

            // 1. geoJSON의 features에 id라는 key가 존재해야 한다.
            // 2. 시각화 데이터에도 id라는 key가 존재해야 한다.
            // 3. geoJSON의 id와 시각화 데이터의 id value 값이 동일해야 valueField가 시각화 데이터의 key와 매핑된다.
            for (let i = 0; i < am5geodata_yeongcheon.features.length; i++) {
                for (let j = 0; j < chartData.length; j++) {
                    if (
                        am5geodata_yeongcheon.features[i].properties["name"] ==
                        chartData[j]["emd"]
                    ) {
                        am5geodata_yeongcheon.features[i]["id"] = chartData[j]["emd"];
                        chartData[j]["id"] = chartData[j]["emd"];
                        break;
                    }
                }
            }

            if (COMMON_UTIL.isEmpty(this.charts["map"]) == false) {
                this.charts["map"].dispose();
            }

            let chartWarp = this.$refs["mapWrap"];
            chartWarp.innerHTML = "";
            let div = document.createElement("div");

            div.style.width = "100%";
            div.style.height = "100%";
            chartWarp.appendChild(div);

            let root = am5.Root.new(div);
            this.charts["map"] = root;

            root.setThemes([am5themes_Animated.new(root)]);

            let chart = root.container.children.push(
                am5map.MapChart.new(root, {
                    panX: "rotateX",
                    projection: am5map.geoMercator(), // 평면 지도 (MapChart의 기본값)
                    layout: root.horizontalLayout,
                })
            );

            // 맵 폴리곤 생성
            let polygonSeries = chart.series.push(
                am5map.MapPolygonSeries.new(root, {
                    geoJSON: am5geodata_yeongcheon,
                    // categoryField: "emd",
                    valueField: "sm",
                    calculateAggregates: true,
                })
            );

            // 폴리곤 옵션
            polygonSeries.mapPolygons.template.setAll({
                tooltipText: "[fontFamily: GmarketSansMedium]{name}",
            });

            // 마우스 오버 시 옵션
            polygonSeries.mapPolygons.template.states.create("hover", {
                fill: am5.color(0xff7369),
            });

            // 읍면동별 1인가구 수에 따른 색상 표시
            polygonSeries.set("heatRules", [
                {
                    target: polygonSeries.mapPolygons.template,
                    min: am5.color(0xc3d3ec),
                    max: am5.color(0x234a6f),
                    dataField: "value",
                    key: "fill",
                },
            ]);

            polygonSeries.mapPolygons.template.setAll({
                cursorOverStyle: "pointer",
            });

            // 읍면동 마우스 오버 시 히트범례에 해당 읍면동 1인가구 수 표시
            polygonSeries.mapPolygons.template.events.on(
                "pointerover",
                function (ev) {
                    heatLegend.showValue(ev.target.dataItem.get("value"));
                }
            );

            // 읍면동 마우스 클릭 시 해당 읍면동 명을 저장
            polygonSeries.mapPolygons.template.events.on("click", function (ev) {
                vm.$emit("selectEmd", ev.target.dataItem.get("id"));
            });

            // 맵 폴리곤 데이터 할당 (맵 폴리곤 생성 시 geoJSON 데이터는 지도를 그리기 위한 좌표 데이터만 사용하는 것 같음)
            polygonSeries.data.setAll(chartData);

            /*************************** 히트범례(시작) ************************************/
            let heatLegend = chart.children.push(
                am5.HeatLegend.new(root, {
                    orientation: "vertical",
                    startColor: am5.color(0xc3d3ec),
                    endColor: am5.color(0x234a6f),
                    startText: "Lowest",
                    endText: "Highest",
                    stepCount: 5,
                })
            );

            heatLegend.startLabel.setAll({
                fontSize: 12,
                fill: heatLegend.get("startColor"),
            });

            heatLegend.endLabel.setAll({
                fontSize: 12,
                fill: heatLegend.get("endColor"),
            });

            polygonSeries.events.on("datavalidated", function () {
                heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
                heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
            });
            /*************************** 히트범례(끝) ************************************/

            // amChart 로고 삭제
            root._logo.dispose();
        },
    },

    watch: {
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        chartData: function (newValue, oldValue) {
            // console.log('ChartMap watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },
    },

    mounted() { },
};
</script>

<style>
/* @import url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff"); */

body {
    font-family: "GmarketSansMedium";
    font-size: 1.4rem;
}

#map {
    width: 100%;
    height: 100%;
}
</style>
