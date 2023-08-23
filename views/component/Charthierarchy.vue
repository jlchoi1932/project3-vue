<template>
    <!-- <div class="chartdiv_Charthierarchy" id="chartdivCharthierarchy"></div> -->
    <div style="width: 100%; height: 348px" ref="chartdivCharthierarchyWrap">
        <div ref="chartdivCharthierarchy" id="chartdivCharthierarchy"
            style="width: 100%; height: 100%; background: #ffffff"></div>
    </div>
</template>

<script>
import COMMON_UTIL from "../../resources/js/commonUtil.js";

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

export default {
    props: {
        chartDataName: {
            type: Array,
            default: [],
        },

        chartData: {
            type: Object,
            default: {},
        },
    },

    data() {
        return {
            charts: {},
        };
    },

    methods: {
        createChart: function (divId) {
            let iconShop = "/client/resources/images/icon/Shopping.png";

            let iconStay = "/client/resources/images/icon/Accommodation.png";

            let iconFood = "/client/resources/images/icon/food.png";

            let iconSports = "/client/resources/images/icon/Leisure_Sports.png";

            let iconDelivery = "/client/resources/images/icon/band.png";

            let iconTravel = "/client/resources/images/icon/Cultural_Heritage.png";

            // props 차트 데이터 복사 및 변경 (삭제 X)
            let data = JSON.parse(JSON.stringify(this.chartData));

            /* if (this.chartDataName["name"] == "touristConsumeTypeChartData") {
                // 연도별 소비 유형 차트 데이터일 경우
                for (let i = 0; i < Object.keys(data).length; i++) {
                    if (Object.keys(data)[i] == "쇼핑업") {
                        // console.log('objectName: ', Object.keys(data)[i]);
                    }
                    if(chartData[i]['induty_lclas_nm'] == chartData2[j]['induty_lclas_nm']) {
                              }
                }
            } else {
                console.log("fail");
            } */

            // 이미 차트가 생성돼 있는지 확인
            /* if (COMMON_UTIL.isEmpty(this.charts) == false) {
                            const vm = this;
                            console.log('@@@not empty: ', vm.charts);
                            am5.array.each(am5.registry.rootElements, function(root) {
                                if (root.dom.id == divId) {
                                    console.log('chartdivCharthierarchy root: ', root);
                                    
                                    vm.charts = null;
                                    console.log('@@@Charthierarchy inner not empty: ', vm.charts);
                                    root.dispose();
                                    console.log('@@@Charthierarchy dispose');
                                }
                            })
                        }
            
                        console.log('Charthierarchy start');
            
                        let root = am5.Root.new("chartdivCharthierarchy");
                        this.charts = 1; */

            if (COMMON_UTIL.isEmpty(this.charts["chartdivCharthierarchy"]) == false) {
                this.charts["chartdivCharthierarchy"].dispose();
            }

            let chartWarp = this.$refs["chartdivCharthierarchyWrap"];
            chartWarp.innerHTML = "";
            let div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            chartWarp.appendChild(div);

            let root = am5.Root.new(div);
            this.charts["chartdivCharthierarchy"] = root;

            const myTheme = am5.Theme.new(root);

            myTheme
                .rule("RoundedRectangle", ["hierarchy", "node", "shape", "depth1"])
                .setAll({
                    strokeWidth: 2,
                });

            myTheme
                .rule("RoundedRectangle", ["hierarchy", "node", "shape", "depth2"])
                .setAll({
                    fillOpacity: 0,
                    strokeWidth: 1,
                    strokeOpacity: 0.2,
                    fontFamily: "GmarketSansMedium",
                });

            myTheme.rule("Label", ["node", "depth1"]).setAll({
                forceHidden: true,
                fontFamily: "GmarketSansMedium",
            });

            myTheme.rule("Label", ["node", "depth2"]).setAll({
                fontFamily: "GmarketSansMedium",
                fontSize: 10,
            });

            myTheme
                .rule("ColorSet")
                .set("colors", [
                    /* am5.color(0x5378ad),
                    am5.color(0x234a6f),
                    am5.color(0x80a1d3),
                    am5.color(0xc3d3ec),
                    am5.color(0xabc6df), */
                    // am5.color(0xdde8ef),
                    am5.color(0xeaeef5),
                    am5.color(0xa1c4fd),
                    am5.color(0xacd0fc),
                    am5.color(0xb7dcfb),
                    am5.color(0xbfe6fb),
                    am5.color(0xdff2fd),
                    am5.color(0xebf9ff),
                    am5.color(0xeaeef5),
                    // am5.color(0xeaeef5),ebf9ff
                ]);
            root.setThemes([am5themes_Animated.new(root), myTheme]);

            let container = root.container.children.push(
                am5.Container.new(root, {
                    width: am5.percent(100),
                    height: am5.percent(100),
                    layout: root.verticalLayout,
                })
            );

            let series = container.children.push(
                am5hierarchy.Treemap.new(root, {
                    sort: "descending",
                    singleBranchOnly: false,
                    downDepth: 1,
                    upDepth: 0,
                    initialDepth: 1,
                    valueField: "value",
                    categoryField: "name",
                    childDataField: "children",
                    nodePaddingOuter: 0,
                    nodePaddingInner: 0,
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[fontFamily: GmarketSansMedium] {category}: {sum}원",
                    }),
                })
            );

            series.get("colors").set("step", 1);

            container.children.moveValue(
                am5hierarchy.BreadcrumbBar.new(root, {
                    series: series,
                }),
                0
            );

            function processData(data) {
                let treeData = [];

                let smallBrands = {
                    name: "Other",
                    children: "[]",
                };

                am5.object.eachOrdered(
                    data,
                    (brand) => {
                        let brandData = { name: brand, children: [] };
                        let brandTotal = 0;
                        for (let model in data[brand]) {
                            brandTotal += data[brand][model];
                        }

                        for (let model in data[brand]) {
                            // do not add very small
                            if (data[brand][model] > 100) {
                                brandData.children.push({
                                    name: model,
                                    value: data[brand][model],
                                });
                            }
                        }
                        // console.log('value: ', brand, brandTotal);
                        // only bigger brands
                        if (brandTotal > 10000) {
                            treeData.push(brandData);
                        }
                        // console.log('treeData: ', treeData, brandData);
                    },
                    (a, b) => {
                        let aval = 0;
                        let bval = 0;
                        am5.object.each(data[a], (key, val) => (aval += val));
                        am5.object.each(data[b], (key, val) => (bval += val));
                        if (aval > bval) return -1;
                        if (aval < bval) return 1;
                        return 0;
                    }
                );

                return [
                    {
                        name: "Home",
                        children: treeData,
                    },
                ];
            }

            series.labels.template.setAll({
                fontSize: 20,
                fill: am5.color(0xffffff),
                text: "[fontFamily: GmarketSansMedium]{name}",
            });

            series.data.setAll(processData(data));
            series.set("selectedDataItem", series.dataItems[0]);

            // series.nodes.template.set("tooltipText", "[fontFamily: GmarketSansMedium] {category}: [bold]{sum}[/]원");

            series.bullets.push(function (root, series, dataItem) {
                let depth = dataItem.get("depth");
                // console.log('series: ', dataItem.dataContext['name']);
                let iconE = null;
                if (depth == 1) {
                    if(dataItem.dataContext['name'] == '식음료업') {
                        iconE = iconFood;
                    } else if(dataItem.dataContext['name'] == '여가서비스업') {
                        iconE = iconSports;
                    } else if(dataItem.dataContext['name'] == '쇼핑업') {
                        iconE = iconShop;
                    } else if(dataItem.dataContext['name'] == '숙박업') {
                        iconE = iconStay;
                    } else if(dataItem.dataContext['name'] == '운송업') {
                        iconE = iconDelivery;
                    } else {
                        iconE = iconTravel;
                    }
                    let picture = am5.Picture.new(root, {
                        // src: "https://www.amcharts.com/wp-content/uploads/assets/logos/" + dataItem.dataContext.name.toLowerCase() + ".png",
                        src: iconE,
                        centerX: am5.p50,
                        centerY: am5.p50,
                        width: am5.percent(20),
                        isMeasured: true
                    });

                    picture.states.lookup("default").setAll({ opacity: 0.15 });

                    return am5.Bullet.new(root, { 
                        sprite: picture,
                    });
                }
            });

            //amChart 로고 삭제
            root._logo.dispose();

            series.appear(1000, 100);
        },
    },

    watch: {
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        chartData: function (newValue, oldValue) {
            // console.log('charthierarchy watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart("chartdivCharthierarchy");
        },
    },

    mounted() { },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chartdiv_Charthierarchy {
    height: 33rem;
}
</style>
