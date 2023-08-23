<template>
    <div class="chart02" id="chartdiv02"></div>
</template>

<script>
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
        createChart: function () {
            // 임시 차트 데이터 (props 차트 데이터 없을 시)
            /* let chartData = [
                      {
                          area01: "영천시",
                          area02: "경상북도",
                          avrg_stay_time01: 252,
                          avrg_stay_time02: 406,
                          avrg_stayng_daycnt01: 1.2,
                          avrg_stayng_daycnt02: 1.2,
                          stdr_ym: "2019년"
                      },
                      {
                          area01: "영천시",
                          area02: "경상북도",
                          avrg_stay_time01: 254,
                          avrg_stay_time02: 417,
                          avrg_stayng_daycnt01: 1.2,
                          avrg_stayng_daycnt02: 1.2,
                          stdr_ym: "2020년"
                      },
                      {
                          area01: "영천시",
                          area02: "경상북도",
                          avrg_stay_time01: 252,
                          avrg_stay_time02: 417,
                          avrg_stayng_daycnt01: 1.4,
                          avrg_stayng_daycnt02: 1.3,
                          stdr_ym: "2021년"
                      },
                      {
                          area01: "영천시",
                          area02: "경상북도",
                          avrg_stay_time01: 256,
                          avrg_stay_time02: 420,
                          avrg_stayng_daycnt01: 1.5,
                          avrg_stayng_daycnt02: 1.5,
                          stdr_ym: "2022년"
                      }
                  ] */

            // props 차트 데이터 복사 및 변경 (삭제 X)
            let chartData = JSON.parse(JSON.stringify(this.chartData));
            if (this.chartDataName["name"] == "touristStayTimeAndDayList") {
                //  연도별 방문객 체류시간, 숙박일수 차트 데이터일 경우
                for (let i = 0; i < chartData.length; i++) {
                    chartData[i]["stdr_ym"] = chartData[i]["stdr_ym"] + "년"; // 정수 year => 문자열 year + "년"
                }
            } else {
                console.log("fail");
            }

            // root 요소 및 id 생성
            let root = am5.Root.new("chartdiv02");

            root.setThemes([am5themes_Animated.new(root)]);

            /* root.dateFormatter.setAll({
                      dateFormat: "yyyy-MM-dd",
                      dateFields: ["valueX"]
                  }); */

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
            xRenderer.labels.template.setAll({
                paddingTop: 30,
            });

            // 왼쪽 y축 렌더링 옵션
            let yRendererLeft = am5xy.AxisRendererY.new(root, {});
            yRendererLeft.labels.template.setAll({
                paddingRight: 30,
            });

            // 오른쪽 y축 렌더링 옵션
            let yRendererRight = am5xy.AxisRendererY.new(root, {
                opposite: true,
            });
            yRendererRight.grid.template.set("forceHidden", true);
            yRendererRight.labels.template.setAll({
                paddingLeft: 30,
            });

            // x축 추가
            let xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    renderer: xRenderer,
                    categoryField: "stdr_ym",
                })
            );

            // 왼쪽 y축 추가
            let yAxisLeft = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: yRendererLeft,
                    // min: 0,
                })
            );
            /* yAxisLeft.children.moveValue(
                am5.Label.new(root, {
                    text: "체류 시간",
                    rotation: -90,
                    y: am5.p50,
                    centerX: am5.p50,
                    fontFamily: "GmarketSansMedium",
                    fill: am5.color("#7b7b7b"),
                }),
                0
            ); */

            // 오른쪽 y축 추가
            let yAxisRight = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: yRendererRight,
                    syncWithAxis: yAxisLeft,
                })
            );
            /* yAxisRight.children.moveValue(
                am5.Label.new(root, {
                    text: "숙박 일수",
                    rotation: -90,
                    y: am5.p50,
                    centerX: am5.p50,
                    x: am5.p100,
                    centerY: am5.p50,
                    fontFamily: "GmarketSansMedium",
                    fill: am5.color("#7b7b7b"),
                }),
                0
            );
            yAxisRight.ghostLabel.set("minWidth", 110); */

            // 경상북도 기둥 차트 생성 (영천시 차트 뒤에 배치하기 위해 먼저 선언: 경상북도 차트 사이즈를 크게 & 배경으로 쓰기 위해)
            let columnSeries1 = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "체류 시간(경상북도)",
                    xAxis: xAxis,
                    yAxis: yAxisLeft,
                    valueYField: "avrg_stay_time02",
                    categoryXField: "stdr_ym",
                    clustered: false,
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[fontFamily: GmarketSansMedium]{name}: {valueY}분",
                        fontFamily: "GmarketSansMedium",
                    }),
                })
            );

            // 경상북도 기둥 차트 옵션
            columnSeries1.columns.template.setAll({
                width: am5.percent(60),
                fill: am5.color(0xabc6df),
                fillOpacity: 0.5,
                strokeOpacity: 0,
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
            });

            // 영천시 기둥 차트 생성
            let columnSeries0 = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "체류 시간(영천시)",
                    xAxis: xAxis,
                    yAxis: yAxisLeft,
                    valueYField: "avrg_stay_time01",
                    categoryXField: "stdr_ym",
                    clustered: false,
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[fontFamily: GmarketSansMedium]{name}: {valueY}분",
                        fontFamily: "GmarketSansMedium",
                    }),
                })
            );

            // 영천시 기둥 차트 옵션
            columnSeries0.columns.template.setAll({
                width: am5.percent(40),
                fill: am5.color(0x5277ad),
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
            });

            // 영천시 라인 차트 생성 (경상북도 차트 앞에 배치하기 위해 먼저 선언: 영천시 차트가 경상북도 차트에 덮히지 않기 위해)
            let series0 = chart.series.push(
                am5xy.SmoothedXLineSeries.new(root, {
                    name: "숙박 일수(영천시)",
                    xAxis: xAxis,
                    yAxis: yAxisRight,
                    valueYField: "avrg_stayng_daycnt01",
                    categoryXField: "stdr_ym",
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[fontFamily: GmarketSansMedium]{name}: {valueY}일",
                        fontFamily: "GmarketSansMedium",
                    }),
                })
            );

            // 영천시 라인 차트 옵션
            series0.strokes.template.setAll({
                strokeWidth: 2,
            });
            series0.bullets.push(function () {
                return am5.Bullet.new(root, {
                    sprite: am5.Circle.new(root, {
                        stroke: series0.get("fill"),
                        strokeWidth: 2,
                        fill: root.interfaceColors.get("background"),
                        radius: 5,
                    }),
                });
            });

            // 경상북도 라인 차트 생성
            let series1 = chart.series.push(
                am5xy.SmoothedXLineSeries.new(root, {
                    name: "숙박 일수(경상북도)",
                    xAxis: xAxis,
                    yAxis: yAxisRight,
                    valueYField: "avrg_stayng_daycnt02",
                    categoryXField: "stdr_ym",
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[fontFamily: GmarketSansMedium] {name}: {valueY}일",
                        fontFamily: "GmarketSansMedium",
                    }),
                })
            );

            // 경상북도시 라인 차트 옵션
            series1.strokes.template.setAll({
                strokeWidth: 2,
                strokeDasharray: [2, 2],
            });
            series1.bullets.push(function () {
                return am5.Bullet.new(root, {
                    sprite: am5.Circle.new(root, {
                        stroke: series1.get("fill"),
                        strokeWidth: 2,
                        fill: root.interfaceColors.get("background"),
                        radius: 5,
                    }),
                });
            });

            // // 차트 스크롤 바
            // let scrollbar = chart.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
            // 	orientation: "horizontal"
            // }));

            // 마우스 커서 오버 시 효과
            let cursor = chart.set(
                "cursor",
                am5xy.XYCursor.new(root, {
                    behavior: "zoomX",
                })
            );
            cursor.lineY.set("visible", false);

            // 범례 생성
            let legend = chart.children.push(
                am5.Legend.new(root, {
                    x: am5.p50,
                    centerX: am5.p50,
                })
            );

            // 범례 순서 변경
            let tmp = chart.series.values[1];
            chart.series.values.splice(1, 1);
            chart.series.values.unshift(tmp);

            // 범례 데이터 할당
            legend.data.setAll(chart.series.values);

            // x축 범주 명 데이터 할당
            xAxis.data.setAll(chartData);

            // 기둥 차트 데이터 할당
            columnSeries1.data.setAll(chartData);
            columnSeries0.data.setAll(chartData);

            // 라인 차트 데이터 할당
            series0.data.setAll(chartData);
            series1.data.setAll(chartData);

            //amChart 로고 삭제
            root._logo.dispose();

            // 차트 등장 시간
            series0.appear(1000);
            series1.appear(1000);
            chart.appear(1000, 100);

            legend.labels.template.setAll({
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });

            legend.valueLabels.template.setAll({
                fill: am5.color("#7b7b7b"),
                fontFamily: "GmarketSansMedium",
            });

            xAxis.get("renderer").labels.template.setAll({
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
            });
            // 작동 X
            // columnSeries0.get("colors").set("colors", [am5.color(0xabc6df)]);
        },
    },

    watch: {
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        chartData: function (newValue, oldValue) {
            // console.log('child watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        },
    },

    mounted() { },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart02 {
    width: 100%;
    height: 40rem;
}
</style>
