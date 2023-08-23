<template>
  <div id="chartdiv" style="width: 100%" ref="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default {
  name: "chartdiv",
  mounted() {
    let root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270,
      })
    );

    series.states.create("hidden", {
      endAngle: -90,
    });
    series.data.setAll([
      {
        category: "47세 이상 1인 가구",
        value: 501.9,
      },
      {
        category: "47세 이하 1인 가구",
        value: 301.9,
      },
    ]);

    series.appear(1000, 100);

    amCharts;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chartdiv {
  width: 100%;
  height: 500px;
}
</style>
