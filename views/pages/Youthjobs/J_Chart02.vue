<template>
  <!-- <div id="jChart02" style="width: 100%" ref="jChart02"></div> -->
  <div style="width: 100%; height: 100%" ref="jChart02Wrap">
    <div
      ref="jChart02"
      id="jChart02"
      style="width: 100%; height: 100%; background: #ffffff"
    ></div>
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
        if (storage[i]["age_section_index"] == this.ageIndex) {
          storage[i]["pnttm"] = storage[i]["pnttm"] + "년";
          chartData.push(storage[i]);
        }
      }

      if (COMMON_UTIL.isEmpty(this.charts["jChart02"]) == false) {
        this.charts["jChart02"].dispose();
      }

      let chartWarp = this.$refs["jChart02Wrap"];
      chartWarp.innerHTML = "";
      let div = document.createElement("div");
      div.style.width = "100%";
      div.style.height = "100%";
      chartWarp.appendChild(div);

      let root = am5.Root.new(div);
      this.charts["jChart02"] = root;

      root.setThemes([am5themes_Animated.new(root)]);

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
        fontFamily: "GmarketSansMedium",
      });

      // 왼쪽 y축 렌더링 옵션
      let yRendererLeft = am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1,
      });

      // x축 추가
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "pnttm",
          renderer: xRenderer,
          fontFamily: "GmarketSansMedium",
          fill: am5.color("#7b7b7b"),
        })
      );

      // 왼쪽 y축 추가
      let yAxisLeft = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: yRendererLeft,
          // min: 0,
          fontFamily: "GmarketSansMedium",
          fill: am5.color("#7b7b7b"),
        })
      );

      // 왼쪽 관련 차트 내용 생성
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "순이동",
          xAxis: xAxis,
          yAxis: yAxisLeft,
          valueYField: "purity_mvmn",
          categoryXField: "pnttm",
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
        fontFamily: "GmarketSansMedium",
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

      //amChart 로고 삭제
      root._logo.dispose();

      // 차트 등장 시간
      chart.appear(1000, 100);
      series1.appear();
      chart
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
        ]);
      xAxis.get("renderer").labels.template.setAll({
        fontFamily: "GmarketSansMedium",
        fill: am5.color("#7b7b7b"),
      });

      yAxisLeft.get("renderer").labels.template.setAll({
        fontFamily: "GmarketSansMedium",
        fill: am5.color("#7b7b7b"),
      });
    },
  },

  watch: {
    // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
    chartData: function (newValue, oldValue) {
      // console.log('jChart02 watch: ', newValue, oldValue);
      // 차트 생성 함수
      this.createChart();
    },

    ageIndex: function (newValue, oldValue) {
      // console.log('jChart02 ageIndex: ', newValue, oldValue);
      // 차트 생성 함수
      this.createChart();
    },
  },

  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#jChart02 {
  height: 50rem;
  padding-top: 2rem;
}
</style>
