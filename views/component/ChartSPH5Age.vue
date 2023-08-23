<template>
  <!-- <div id="chartdiv" style="width: 100%" ref="chartdiv"></div> -->
  <div style="width: 100%; height: 100%" ref="chartSPH5AgeWrap">
    <div
      ref="chartSPH5Age"
      id="chartSPH5Age"
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
    createChart: function () {
      let icon1 = "/client/resources/file/svg/kid.svg";

      let icon2 = "/client/resources/file/svg/teenage.svg";

      let icon3 = "/client/resources/file/svg/adult.svg";

      let icon4 = "/client/resources/file/svg/oldAdult.svg";

      let icon5 = "/client/resources/file/svg/oldman.svg";

      // props 차트 데이터 복사 및 변경 (삭제 X)
      let chartData = JSON.parse(JSON.stringify(this.chartData));
      // console.log("chartData: ", chartData);
      let chartGroupData = [
        /* {
                  age_group: "영유아/어린이",
                  age_group_index: 0,
                  sm_group_count: 0,
                  male_group_count: 0,
                  female_group_count: 0,
                  pictureSettings: {
                    src: icon1
                  }
                },
                {
                  age_group: "청소년",
                  age_group_index: 1,
                  sm_group_count: 0,
                  male_group_count: 0,
                  female_group_count: 0,
                  pictureSettings: {
                    src: icon2
                  }
                },
                {
                  age_group: "청년",
                  age_group_index: 2,
                  sm_group_count: 0,
                  male_group_count: 0,
                  female_group_count: 0,
                  pictureSettings: {
                    src: icon3
                  }
                },
                {
                  age_group: "장년",
                  age_group_index: 3,
                  sm_group_count: 0,
                  male_group_count: 0,
                  female_group_count: 0,
                  pictureSettings: {
                    src: icon4
                  }
                },
                {
                  age_group: "노년",
                  age_group_index: 4,
                  sm_group_count: 0,
                  male_group_count: 0,
                  female_group_count: 0,
                  pictureSettings: {
                    src: icon5
                  }
                }, */
        {
          age_group: "청소년",
          age_group_index: 0,
          sm_group_count: 0,
          male_group_count: 0,
          female_group_count: 0,
          pictureSettings: {
            src: icon2,
          },
        },
        {
          age_group: "청년",
          age_group_index: 1,
          sm_group_count: 0,
          male_group_count: 0,
          female_group_count: 0,
          pictureSettings: {
            src: icon3,
          },
        },
        {
          age_group: "장년",
          age_group_index: 2,
          sm_group_count: 0,
          male_group_count: 0,
          female_group_count: 0,
          pictureSettings: {
            src: icon4,
          },
        },
        {
          age_group: "노년",
          age_group_index: 3,
          sm_group_count: 0,
          male_group_count: 0,
          female_group_count: 0,
          pictureSettings: {
            src: icon5,
          },
        },
      ];

      if (this.chartDataName["name"] == "sphCountBy5AgeList") {
        // 연령 5세 별 1인 가구 수 차트 데이터일 경우
        for (let i = 0; i < chartData.length; i++) {
          if (chartData[i]["age_group_index"] == 0) {
            chartGroupData[0]["sm_group_count"] += chartData[i]["sm_count"];
          } else if (chartData[i]["age_group_index"] == 1) {
            chartGroupData[0]["sm_group_count"] += chartData[i]["sm_count"];
          } else if (chartData[i]["age_group_index"] == 2) {
            chartGroupData[1]["sm_group_count"] += chartData[i]["sm_count"];
          } else if (chartData[i]["age_group_index"] == 3) {
            chartGroupData[2]["sm_group_count"] += chartData[i]["sm_count"];
          } else {
            chartGroupData[3]["sm_group_count"] += chartData[i]["sm_count"];
          }
        }
        // console.log("GroupData: ", chartGroupData);
        // console.log("Data: ", chartData);
      } else {
        console.log("fail");
      }

      // root 요소 및 id 생성
      if (COMMON_UTIL.isEmpty(this.charts["chartSPH5Age"]) == false) {
        this.charts["chartSPH5Age"].dispose();
      }

      let chartWarp = this.$refs["chartSPH5AgeWrap"];
      chartWarp.innerHTML = "";
      let div = document.createElement("div");
      div.style.width = "100%";
      div.style.height = "100%";
      chartWarp.appendChild(div);

      let root = am5.Root.new(div);
      this.charts["chartSPH5Age"] = root;

      // root 요소 및 id 생성
      // let root = am5.Root.new("chartdiv01");

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
      let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 50 });
      xRenderer.labels.template.setAll({
        // fontSize: "1.5em",
        centerY: am5.p50,
        centerX: am5.p50,
        paddingLeft: 15,
      });
      xRenderer.grid.template.setAll({
        location: 1,
      });

      // 그룹 x축 렌더링 옵션
      let xRendererGroup = am5xy.AxisRendererX.new(root, { inside: true });
      xRendererGroup.labels.template.setAll({
        fill: am5.color(0xffffff),
        fillOpacity: 0.1,
        oversizedBehavior: "wrap",
        text: "[bold]{age_group}",
      });
      xRendererGroup.grid.template.setAll({
        location: 1,
      });
      xRendererGroup.grid.template.set("forceHidden", true);

      // y축 렌더링 옵션
      let yRenderer = am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1,
      });

      // x축 추가
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "age_section",
          renderer: xRenderer,
        })
      );

      // 그룹 x축 추가
      let xAxisGroup = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "age_group",
          renderer: xRendererGroup,
        })
      );

      // y축 추가
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: yRenderer,
          min: 0,
          extraMax: 0.1,
        })
      );
      yAxis.set("numberFormat", "#,###");

      // 막대 차트 내용 생성
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "1인 가구",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "sm_count",
          categoryXField: "age_section",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText:
              "[fontFamily: GmarketSansMedium]{categoryX}: {valueY}가구",
            pointerOrientation: "vertical",
            fontFamily: "GmarketSansMedium",
          }),
        })
      );

      // 막대 차트 내용 옵션
      series1.columns.template.setAll({
        tooltipY: am5.percent(5),
        templateField: "columnSettings",
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0,
        opacity: 0.7,
      });
      series1.columns.template.adapters.add("fill", function (fill, target) {
        let result = "#FFE400";
        let index = target.dataItem.dataContext["age_group_index"];
        if (index == 0) {
          result = "#00D8FF";
        } else if (index == 1) {
          result = "#00D8FF";
        } else if (index == 2) {
          result = "#0054FF";
        } else if (index == 3) {
          result = "#2F9D27";
        } else if (index == 4) {
          result = "#E0B94F";
        }
        return result;
        // return chart.get("colors").getIndex(series1.columns.indexOf(target));
      });
      series1.columns.template.adapters.add(
        "stroke",
        function (stroke, target) {
          return chart.get("colors").getIndex(series1.columns.indexOf(target));
        }
      );

      // 그룹 차트 내용 생성
      let seriesGroup = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "1인 가구 그룹",
          xAxis: xAxisGroup,
          yAxis: yAxis,
          valueYField: "sm_group_count",
          categoryXField: "age_group",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText:
              "[fontFamily: GmarketSansMedium]{categoryX}: {valueY}가구",
            pointerOrientation: "vertical",
            fontFamily: "GmarketSansMedium",
          }),
        })
      );

      seriesGroup.columns.template.setAll({
        width: am5.percent(50),
        strokeOpacity: 0,
        fillOpacity: 0,
      });
      seriesGroup.bullets.push(function (root, series, dataItem) {
        let tower = am5.Picture.new(root, {
          height: 100,
          centerX: am5.p50,
          centerY: am5.p100,
          opacity: 0.5,
          templateField: "pictureSettings",
        });

        tower.adapters.add("height", function (height, target) {
          if (dataItem) {
            height = dataItem.get("bottom") - dataItem.get("top");
          }
          return height;
        });

        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: tower,
          dynamic: true,
        });
      });

      seriesGroup.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Label.new(root, {
            centerX: am5.p50,
            centerY: am5.p100,
            text: "[fontFamily: GmarketSansMedium][fontSize:24px]{sm_group_count} 가구",
            populateText: true,
            fontFamily: "GmarketSansMedium",
            fill: am5.color("#7b7b7b"),
          }),
        });
      });

      //   // 차트 스크롤 바
      //   let scrollbar = chart.set(
      //     "scrollbarX",
      //     am5.Scrollbar.new(root, {
      //       orientation: "horizontal",
      //     })
      //   );

      // 마우스 커서 오버 시 효과
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {})); // 십자선 효과
      cursor.lineY.set("visible", false); // y축 커서 선 비활성화

      // 범례 생성
      /* let legend = chart.children.push(
                      am5.Legend.new(root, {
                          centerX: am5.p50,
                          x: am5.p50,
                      })
                  );
                  legend.data.setAll(chart.series.values); */

      // x축 범주 명 데이터 할당
      xAxis.data.setAll(chartData);
      // 그룹 x축 범주 명 데이터 할당
      xAxisGroup.data.setAll(chartGroupData);
      // 막대 차트 내용 데이터 할당
      series1.data.setAll(chartData);
      // 그룹 차트 내용 데이터 할당
      seriesGroup.data.setAll(chartGroupData);

      //amChart 로고 삭제
      root._logo.dispose();

      // 차트 등장 시간
      chart.appear(1000, 100);
      series1.appear();

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
      //   console.log("chartSPH5Age watch: ", newValue, oldValue);
      // 차트 생성 함수
      this.createChart();
    },
  },

  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
