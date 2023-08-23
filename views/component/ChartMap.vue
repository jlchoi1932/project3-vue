<template>
  <!-- <div id="map" ref="map" style=""></div> -->
  <div style="width: 100%; height: 400px" ref="mapWrap">
    <div
      ref="map"
      id="map"
      style="width: 100%; height: 100%; background: #ffffff"
    ></div>
  </div>
</template>

<script>
import COMMON_UTIL from "../../resources/js/commonUtil.js";

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_yeongcheon from "./map";
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
      // props 차트 데이터 복사 및 변경 (삭제 X)
      let chartData = JSON.parse(JSON.stringify(this.chartData));
      if (this.chartDataName["name"] == "touristSpotCountList") {
        // 연도별 관광지별 입장 수 차트 데이터일 경우
        for (let i = 0; i < chartData.length; i++) {
          // 입장객 비례 원 크기 설정 (실패)
          if (chartData[i]["sm"] > 100000) {
            chartData[i]["radius_size"] = 20;
          } else if (chartData[i]["sm"] > 80000) {
            chartData[i]["radius_size"] = 17;
          } else if (chartData[i]["sm"] > 60000) {
            chartData[i]["radius_size"] = 14;
          } else if (chartData[i]["sm"] > 40000) {
            chartData[i]["radius_size"] = 11;
          } else if (chartData[i]["sm"] > 20000) {
            chartData[i]["radius_size"] = 8;
          } else {
            chartData[i]["radius_size"] = 5;
          }
        }
        // console.log('success: ', chartData);
      } else {
        console.log("fail");
      }
      // let root = am5.Root.new(this.$refs.map);

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

      root._logo.dispose();
      let chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "rotateX",
          // projection: am5map.geoAlbersUsa(),
        })
      );

      // Create polygon series
      let polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_yeongcheon,
          fill: am5.color(0xc3d3ec),
        })
      );

      polygonSeries.mapPolygons.template.setAll({
        categoryField: "[fontFamily: GmarketSansMedium]{name}",
        tooltipText: "[fontFamily: GmarketSansMedium]{name}",
      });

      polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(0x80a1d3),
      });

      let zoomOut = root.tooltipContainer.children.push(
        am5.Button.new(root, {
          x: am5.p100,
          y: 0,
          centerX: am5.p100,
          centerY: 0,
          paddingTop: 18,
          paddingBottom: 18,
          paddingLeft: 12,
          paddingRight: 12,
          dx: -20,
          dy: 20,
          themeTags: ["zoom"],
          icon: am5.Graphics.new(root, {
            themeTags: ["button", "icon"],
            strokeOpacity: 0.7,
            draw: function (display) {
              display.moveTo(0, 0);
              display.lineTo(12, 0);
            },
          }),
        })
      );

      zoomOut.get("background").setAll({
        cornerRadiusBL: 40,
        cornerRadiusBR: 40,
        cornerRadiusTL: 40,
        cornerRadiusTR: 40,
      });
      zoomOut.events.on("click", function () {
        if (currentSeries) {
          currentSeries.hide();
        }
        chart.goHome();
        zoomOut.hide();
        currentSeries = regionalSeries.KR.series;
        currentSeries.show();
      });
      zoomOut.hide();

      // =================================
      // Set up point series
      // =================================

      // Load senior data
      am5.net
        .load(
          "https://gist.githubusercontent.com/jlchoi1932/c3673a65fd00efa9192b3aac5bc02a1a/raw/e7bf0bc2320d0baa2f8274f94084a3dd2b098c91/_GunwiRegion.json"
        )
        .then(function (result) {
          let seniors = am5.JSONParser.parse(result.response);
          setupseniors(seniors);
        });

      let regionalSeries = {};
      let currentSeries;

      // Parses data and creats map point series for domestic and state-level
      function setupseniors(data) {
        // console.log(data);

        // Init country-level series
        regionalSeries.KR = {
          markerData: [],
          // series: createSeries("seniors"),
        };

        // Set current series
        currentSeries = regionalSeries.KR.series;

        // Process data
        am5.array.each(data.query_results, function (senior) {
          // Get senior data
          senior = {
            state: senior.MAIL_ST_PROV_C,
            long: am5.type.toNumber(senior.LNGTD_I),
            lat: am5.type.toNumber(senior.LATTD_I),
            location: senior.co_loc_n,
            city: senior.mail_city_n,
            count: am5.type.toNumber(senior.count),
          };

          // Process state-level data
          if (regionalSeries[senior.state] == undefined) {
            let statePolygon = getPolygon("KR-" + senior.state);
            if (statePolygon) {
              let centroid = statePolygon.visualCentroid();

              // Add state data
              regionalSeries[senior.state] = {
                target: senior.state,
                type: "state",
                name: statePolygon.dataItem.dataContext.name,
                count: senior.count,
                seniors: senior.count,
                state: senior.state,
                markerData: [],
                geometry: {
                  type: "Point",
                  coordinates: [centroid.longitude, centroid.latitude],
                },
              };
              regionalSeries.KR.markerData.push(regionalSeries[senior.state]);
            } else {
              // State not found
              return;
            }
          } else {
            regionalSeries[senior.state].seniors++;
            regionalSeries[senior.state].count += senior.count;
          }

          // Process city-level data
          // if (regionalSeries[senior.city] == undefined) {
          //   regionalSeries[senior.city] = {
          //     target: senior.city,
          //     type: "city",
          //     name: senior.city,
          //     count: senior.count,
          //     seniors: 1,
          //     state: senior.state,
          //     markerData: [],
          //     geometry: {
          //       type: "Point",
          //       coordinates: [senior.long, senior.lat],
          //     },
          //   };
          //   regionalSeries[senior.state].markerData.push(
          //     regionalSeries[senior.city]
          //   );
          // } else {
          //   regionalSeries[senior.city].seniors++;
          //   regionalSeries[senior.city].count += senior.count;
          // }

          // // Process individual senior
          // regionalSeries[senior.city].markerData.push({
          //   name: senior.location,
          //   count: senior.count,
          //   seniors: 1,
          //   state: senior.state,
          //   geometry: {
          //     type: "Point",
          //     coordinates: [senior.long, senior.lat],
          //   },
          // });
        });
        // console.log(regionalSeries.KR.markerData);
        // regionalSeries.KR.series.data.setAll(regionalSeries.KR.markerData);
      }

      // Finds polygon in series by its id
      function getPolygon(id) {
        let found;
        polygonSeries.mapPolygons.each(function (polygon) {
          if (polygon.dataItem.get("id") == id) {
            found = polygon;
          }
        });
        return found;
      }
      // Create point series
      let pointSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {
          latitudeField: "la",
          longitudeField: "lo",
        })
      );

      pointSeries.bullets.push(function () {
        let circle = am5.Circle.new(root, {
          radius: 10,
          fill: am5.color(0xff3a64),
          stroke: am5.color(0xffffff),
          strokeWidth: 5,
          tooltipText: "[fontFamily: GmarketSansMedium]{trrsrt_nm}",
          fontFamily: "GmarketSansMedium",
        });

        // circle.events.on("click", function (ev) {
        //   alert("Clicked on " + ev.target.dataItem.dataContext.name);
        // });

        return am5.Bullet.new(root, {
          sprite: circle,
        });
      });

      pointSeries.data.setAll(chartData);

      // Creates series with heat rules
      //   function createSeries(heatfield) {
      //     // Create point series
      //     let pointSeries = chart.series.push(
      //       am5map.MapPointSeries.new(root, {
      //         valueField: heatfield,
      //         calculateAggregates: true,
      //       })
      //     );

      //     // Add senior bullet
      //     let circleTemplate = am5.Template.new(root);
      //     pointSeries.bullets.push(() => {
      //       let container = am5.Container.new(root, {});

      //       let circle = container.children.push(
      //         am5.Circle.new(
      //           root,
      //           {
      //             radius: 12,
      //             fill: am5.color("#f1de04"),
      //             fillOpacity: 0.7,
      //             cursorOverStyle: "pointer",
      //             tooltipText: "{name}:\n[bold]{seniors} seniors[/]",
      //           },
      //           circleTemplate
      //         )
      //       );
      //       circle.states.create("hover", {
      //   fill: am5.color(0x00ff00)
      // });

      //       let label = container.children.push(
      //         am5.Label.new(root, {
      //           text: "{seniors}",
      //           fill: am5.color(0xffffff),
      //           populateText: true,
      //           centerX: am5.p50,
      //           centerY: am5.p50,
      //           textAlign: "center",
      //         })
      //       );

      //       // Set up drill-down
      //       circle.events.on("click", (ev) => {
      //         // Determine what we've clicked on
      //         let data = ev.target.dataItem.dataContext;
      //         console.log({ data });

      //         // No id? Individual senior - nothing to drill down to further
      //         if (!data.target) {
      //           return;
      //         }

      //         if (data.type === "state") {
      //           props.setCityName(data.name);
      //         }

      //         // Create actual series if it hasn't been yet created
      //         if (!regionalSeries[data.target].series) {
      //           regionalSeries[data.target].series = createSeries("count");
      //           regionalSeries[data.target].series.data.setAll(data.markerData);
      //         }

      //         // Hide current series
      //         // if (currentSeries) {
      //         //   currentSeries.hide();
      //         // }

      //         // Control zoom
      //         // if (data.type == "state") {
      //         //   let statePolygon = getPolygon("KR-" + data.state);
      //         //   polygonSeries.zoomToDataItem(statePolygon.dataItem);
      //         // } else if (data.type == "city") {
      //         //   chart.zoomToGeoPoint(
      //         //     {
      //         //       latitude: data.geometry.coordinates[1],
      //         //       longitude: data.geometry.coordinates[0],
      //         //     },
      //         //     64,
      //         //     true
      //         //   );
      //         // }
      //         // zoomOut.show();

      //         // Show new targert series
      //         currentSeries = regionalSeries[data.target].series;
      //         currentSeries.show();
      //       });

      //       return am5.Bullet.new(root, {
      //         sprite: container,
      //       });
      //     });

      //     // Add heat rule for circles
      //     pointSeries.set("heatRules", [
      //       {
      //         target: circleTemplate,
      //         dataField: "value",
      //         min: 10,
      //         max: 30,
      //         key: "radius",
      //       },
      //     ]);

      //     // Set up drill-down
      //     // TODO

      //     return pointSeries;

      //   }

      pointSeries.appear(2000, 100);

      this.root = root;
    },
  },

  watch: {
    // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
    chartData: function (newValue, oldValue) {
      // console.log('map watch: ', newValue, oldValue);
      // 차트 생성 함수
      this.createChart();
    },
  },

  mounted() {},
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
