<template>
  <!-- <div id="mChart04" style="width: 100%" ref="mChart04"></div> -->
  <div style="width: 100%; height: 100%" ref="mChart04Wrap">
    <div
      ref="mChart04"
      id="mChart04"
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
  },

  data() {
    return {
      charts: {},
    };
  },

  methods: {
    createChart: function () {
      if (COMMON_UTIL.isEmpty(this.charts["mChart04"]) == false) {
        this.charts["mChart04"].dispose();
      }

      let chartWarp = this.$refs["mChart04Wrap"];
      chartWarp.innerHTML = "";
      let div = document.createElement("div");
      div.style.width = "100%";
      div.style.height = "100%";
      chartWarp.appendChild(div);

      let root = am5.Root.new(div);
      this.charts["mChart04"] = root;

      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "none",
          wheelY: "none",
        })
      );

      // We don't want zoom-out button to appear while animating, so we hide it
      chart.zoomOutButton.set("forceHidden", true);

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let yRenderer = am5xy.AxisRendererY.new(root, {
        minGridDistance: 30,
      });

      yRenderer.grid.template.set("location", 1);

      let yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0,
          categoryField: "network",
          renderer: yRenderer,
          tooltip: am5.Tooltip.new(root, { themeTags: ["axis"] }),
        })
      );

      let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0,
          min: 0,
          extraMax: 0.1,
          renderer: am5xy.AxisRendererX.new(root, {
            strokeOpacity: 0.1,
          }),
        })
      );

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: "value",
          categoryYField: "network",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "left",
            labelText: "[fontFamily: GmarketSansMedium]{valueX}",
          }),
        })
      );

      // Rounded corners for columns
      series.columns.template.setAll({
        cornerRadiusTR: 5,
        cornerRadiusBR: 5,
        strokeOpacity: 0,
      });

      // Make each column to be of a different color
      series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      // Set data
      let data = [
        {
          network: "Facebook",
          value: 2255,
        },
        {
          network: "Google+",
          value: 430,
        },
        {
          network: "Instagram",
          value: 1000,
        },
        {
          network: "Pinterest",
          value: 246,
        },
        {
          network: "Reddit",
          value: 355,
        },
        {
          network: "TikTok",
          value: 500,
        },
        {
          network: "Tumblr",
          value: 624,
        },
        {
          network: "Twitter",
          value: 329,
        },
        {
          network: "WeChat",
          value: 1000,
        },
        {
          network: "Weibo",
          value: 431,
        },
        {
          network: "Whatsapp",
          value: 1433,
        },
        {
          network: "YouTube",
          value: 1900,
        },
      ];

      yAxis.data.setAll(data);
      series.data.setAll(data);
      sortCategoryAxis();

      // Get series item by category
      function getSeriesItem(category) {
        for (var i = 0; i < series.dataItems.length; i++) {
          let dataItem = series.dataItems[i];
          if (dataItem.get("categoryY") == category) {
            return dataItem;
          }
        }
      }

      chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          behavior: "none",
          xAxis: xAxis,
          yAxis: yAxis,
        })
      );

      // Axis sorting
      function sortCategoryAxis() {
        // Sort by value
        series.dataItems.sort(function (x, y) {
          return x.get("valueX") - y.get("valueX"); // descending
          //return y.get("valueY") - x.get("valueX"); // ascending
        });

        // Go through each axis item
        am5.array.each(yAxis.dataItems, function (dataItem) {
          // get corresponding series item
          let seriesDataItem = getSeriesItem(dataItem.get("category"));

          if (seriesDataItem) {
            // get index of series data item
            let index = series.dataItems.indexOf(seriesDataItem);
            // calculate delta position
            let deltaPosition =
              (index - dataItem.get("index", 0)) / series.dataItems.length;
            // set index to be the same as series data item index
            dataItem.set("index", index);
            // set deltaPosition instanlty
            dataItem.set("deltaPosition", -deltaPosition);
            // animate delta position to 0
            dataItem.animate({
              key: "deltaPosition",
              to: 0,
              duration: 1000,
              easing: am5.ease.out(am5.ease.cubic),
            });
          }
        });

        // Sort axis items by index.
        // This changes the order instantly, but as deltaPosition is set,
        // they keep in the same places and then animate to true positions.
        yAxis.dataItems.sort(function (x, y) {
          return x.get("index") - y.get("index");
        });
      }

      // update data with random values each 1.5 sec
      setInterval(function () {
        updateData();
      }, 5500);

      function updateData() {
        am5.array.each(series.dataItems, function (dataItem) {
          let value =
            dataItem.get("valueX") + Math.round(Math.random() * 1000 - 500);
          if (value < 0) {
            value = 500;
          }
          // both valueY and workingValueY should be changed, we only animate workingValueY
          dataItem.set("valueX", value);
          dataItem.animate({
            key: "valueXWorking",
            to: value,
            duration: 600,
            easing: am5.ease.out(am5.ease.cubic),
          });
        });

        sortCategoryAxis();
      }

      //amChart 로고 삭제
      root._logo.dispose();

      series.appear(1000);
      chart.appear(1000, 100);
      xAxis.get("renderer").labels.template.setAll({
        fontFamily: "GmarketSansMedium",
        fill: am5.color("#7b7b7b"),
      });

      yAxis.get("renderer").labels.template.setAll({
        fontFamily: "GmarketSansMedium",
        fill: am5.color("#7b7b7b"),
        fontSize: 10,
      });
      //amChart 로고 삭제
      root._logo.dispose();

      series.appear(1000);
      chart.appear(1000, 100);
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
          am5.color(0x888888),
          am5.color(0xafafae),
          am5.color(0xd8d8d8),
          am5.color(0x5378ad),
          am5.color(0x698ec9),
        ]);
    },
  },

  watch: {
    // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
    chartData: function (newValue, oldValue) {
      // console.log('mChart04 watch: ', newValue, oldValue);
      // 차트 생성 함수
      this.createChart();
    },
  },

  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mChart04 {
  height: 50rem;
  padding-top: 2rem;
}
</style>
