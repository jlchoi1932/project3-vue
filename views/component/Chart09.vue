<template>
  <!-- <div class="chart09" ref="chartdiv"></div> -->
  <div style="width: 75%; height: 75%; position: absolute" ref="chart09Wrap">
    <div
      ref="chart09"
      id="chart09"
      style="width: 75%; height: 75%; position: absolute; background: #ffffff"
    ></div>
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
      if (this.chartDataName["name"] == "sphCountBy5AgeList") {
        // 연령 5세 별 1인 가구 수 차트 데이터일 경우
        for (let i = 0; i < chartData.length; i++) {
          chartData[i]["male_count"] = -chartData[i]["male_count"];
        }
      } else {
        console.log("fail");
      }

      if (COMMON_UTIL.isEmpty(this.charts["chart09"]) == false) {
        this.charts["chart09"].dispose();
      }

      let chartWarp = this.$refs["chart09Wrap"];
      chartWarp.innerHTML = "";
      let div = document.createElement("div");
      div.style.width = "100%";
      div.style.height = "100%";
      chartWarp.appendChild(div);

      let root = am5.Root.new(div);
      this.charts["chart09"] = root;

      // let root = am5.Root.new(this.$refs.chartdiv);

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
          layout: root.verticalLayout,
          arrangeTooltips: false,
        })
      );
      chart
        .get("colors")
        .set("colors", [am5.color(0x80a1d3), am5.color(0xee8db8)]);

      chart.getNumberFormatter().set("numberFormat", "#.#s");

      let legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50,
        })
      );

      let yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "age_section",
          renderer: am5xy.AxisRendererY.new(root, {
            inversed: true,
            cellStartLocation: 0.1,
            cellEndLocation: 0.9,
          }),
        })
      );

      yAxis.data.setAll(chartData);

      let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {
            strokeOpacity: 0.1,
          }),
        })
      );

      function createSeries(
        field,
        labelCenterX,
        pointerOrientation,
        rangeValue
      ) {
        let series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: field,
            categoryYField: "age_section",
            sequencedInterpolation: true,
            clustered: false,
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: pointerOrientation,
              labelText:
                "[fontFamily: GmarketSansMedium]{categoryY}: {valueX} 명",
              fill: 0x000000,
              fontFamily: "GmarketSansMedium",
            }),
          })
        );

        series.columns.template.setAll({
          height: am5.p100,
          strokeOpacity: 0,
          fillOpacity: 0.8,
          cornerRadiusTR: 5,
          cornerRadiusBR: 5,
        });

        series.bullets.push(function () {
          return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
              centerY: am5.p50,
              text: "[fontFamily: GmarketSansMedium]{valueX}",
              fill: am5.color("#7b7b7b"),
              populateText: true,
              centerX: labelCenterX,
              fontFamily: "GmarketSansMedium",
            }),
          });
        });

        series.data.setAll(chartData);
        series.appear();

        let rangeDataItem = xAxis.makeDataItem({
          value: rangeValue,
        });
        xAxis.createAxisRange(rangeDataItem);
        rangeDataItem.get("grid").setAll({
          strokeOpacity: 1,
          stroke: series.get("stroke"),
        });

        let label = rangeDataItem.get("label");
        label.setAll({
          // text: field.toUpperCase(), 상단 성별 표시 주석 처리//

          fontSize: "1.1em",
          fontFamily: "GmartketSansMedium",
          fill: series.get("stroke"),
          paddingTop: 10,
          isMeasured: false,
          centerX: labelCenterX,
        });
        label.adapters.add("dy", function () {
          return -chart.plotContainer.height();
        });

        return series;
      }

      legend.labels.template.setAll({
        fill: am5.color("#7b7b7b"),
        fontFamily: "GmarketSansMedium",
      });

      createSeries("male_count", am5.p100, "right", -3);
      createSeries("female_count", 0, "left", 4);

      let cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          behavior: "zoomY",
        })
      );
      cursor.lineY.set("forceHidden", true);
      cursor.lineX.set("forceHidden", true);

      //amChart 로고 삭제
      root._logo.dispose();

      chart.appear(1000, 100);

      xAxis.get("renderer").labels.template.setAll({
        fontFamily: "GmarketSansMedium",
        fill: am5.color("#7b7b7b"),
      });

      yAxis.get("renderer").labels.template.setAll({
        fontFamily: "GmarketSansMedium",
        fill: am5.color("#7b7b7b"),
      });

      // 선언된 툴팁 없음
      /* tooltip.get("renderer").labelText.template.setAll({
        fontFamily: "GmarketSansMedium",
        fill: am5.color("#7b7b7b"),
      }); */
    },
  },

  watch: {
    // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
    chartData: function (newValue, oldValue) {
      // console.log("chart09 watch: ", newValue, oldValue);
      // 차트 생성 함수
      this.createChart();
    },
  },

  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart09 {
  height: 35rem;
}
</style>
