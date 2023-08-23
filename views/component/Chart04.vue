<template>
  <!-- <button @click="createChart()">재 생성</button>
    <button @click="maybeDisposeRoot('chartdiv')">차트 삭제</button>
    <div class="chart04" ref="monthCompareChart"></div> -->
  <div style="width: 100%; height: 400px" ref="chartdiv04Wrap">
    <div
      ref="chartdiv04"
      id="chartdiv04"
      style="width: 100%; height: 100%; background: #ffffff"
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
    // 차트 생성 함수
    createChart: function (divId) {
      // props 차트 데이터 복사 및 변경 (삭제 X)
      let chartData = JSON.parse(JSON.stringify(this.chartData));
      if (this.chartDataName["name"] == "touristConsumeAmountList") {
        // 연도별 업종별 소비 금액 차트 데이터일 경우
        for (let i = 0; i < chartData.length; i++) {
          chartData[i]["month"] = chartData[i]["month"] + "월"; // 정수 month => 문자열 month + "월"
        }
      } else {
        console.log("fail");
      }

      // 이미 차트가 생성돼 있는지 확인
      /* if (COMMON_UTIL.isEmpty(this.charts) == false) {
                const vm = this;
                console.log('@@@not empty: ', vm.charts);
                am5.array.each(am5.registry.rootElements, function(root) {
                    if (root.dom.id == divId) {
                        console.log('chart04 root: ', root);
                        
                        vm.charts = null;
                        console.log('@@@04 inner not empty: ', vm.charts);
                        root.dispose();
                        console.log('@@@04 dispose');
                    }
                })
            } */

      if (COMMON_UTIL.isEmpty(this.charts["chartdiv04"]) == false) {
        this.charts["chartdiv04"].dispose();
      }

      let chartWarp = this.$refs["chartdiv04Wrap"];
      chartWarp.innerHTML = "";
      let div = document.createElement("div");
      div.style.width = "100%";
      div.style.height = "100%";
      chartWarp.appendChild(div);

      let root = am5.Root.new(div);
      this.charts["chartdiv04"] = root;

      /* let root = am5.Root.new("chartdiv04");
			this.charts = 1; */

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          layout: root.verticalLayout,
          pinchZoomX: true,
        })
      );

      let cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          behavior: "none",
        })
      );
      cursor.lineY.set("visible", false);

      let xRenderer = am5xy.AxisRendererX.new(root, {});
      xRenderer.grid.template.set("location", 0.5);
      xRenderer.labels.template.setAll({
        location: 0.5,
        multiLocation: 0.5,
      });

      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "month",
          renderer: xRenderer,
        })
      );

      xAxis.data.setAll(chartData);

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxPrecision: 0,
          renderer: am5xy.AxisRendererY.new(root, {
            // inversed: true
          }),
        })
      );
      /* yAxis.children.moveValue(
        am5.Label.new(root, {
          text: "금액(천원)",
          rotation: -90,
          y: am5.p50,
          centerX: am5.p50,
          fontFamily: "GmarketSansMedium",
          fill: am5.color("#7b7b7b"),
        }),
        0
      ); */

      function createSeries(name, field) {
        let series = chart.series.push(
          am5xy.LineSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: field,
            categoryXField: "month",
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "horizontal",
              labelText:
                "[fontFamily: GmarketSansMedium]{name}[/]\n[fontFamily: GmarketSansMedium]{valueY}(천원)",
              fontFamily: "GmarketSansMedium",
            }),
          })
        );

        series.bullets.push(function () {
          return am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
              radius: 5,
              fill: series.get("fill"),
            }),
          });
        });

        series.set("setStateOnChildren", true);
        series.states.create("hover", {});

        series.mainContainer.set("setStateOnChildren", true);
        series.mainContainer.states.create("hover", {});

        series.strokes.template.states.create("hover", {
          strokeWidth: 4,
        });

        series.data.setAll(chartData);
        series.appear(1000);
      }

      createSeries("숙박업", "am_stay");
      createSeries("쇼핑업", "am_shop");
      createSeries("여가서비스업", "am_service");
      createSeries("식음료업", "am_food");

      // 차트 스크롤 바
      // chart.set(
      //   "scrollbarX",
      //   am5.Scrollbar.new(root, {
      //     orientation: "horizontal",
      //     marginBottom: 20,
      //   })
      // );

      let legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50,
        })
      );

      legend.labels.template.setAll({
        fill: am5.color("#7b7b7b"),
        fontFamily: "GmarketSansMedium",
      });
      legend.itemContainers.template.states.create("hover", {});

      legend.itemContainers.template.events.on("pointerover", function (e) {
        e.target.dataItem.dataContext.hover();
      });
      legend.itemContainers.template.events.on("pointerout", function (e) {
        e.target.dataItem.dataContext.unhover();
      });

      legend.data.setAll(chart.series.values);

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
    },
  },

  watch: {
    // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
    chartData: function (newValue, oldValue) {
      // console.log('chart04 watch: ', newValue, oldValue);
      // 차트 생성 함수
      this.createChart("chartdiv04");
    },
  },

  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart04 {
  width: 100%;
  height: 50rem;
}
</style>
