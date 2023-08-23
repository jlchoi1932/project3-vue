<template>
	<!-- <div id="chartdiv" style="width: 100%" ref="chartdiv"></div> -->
	<div style="width: 100%; height: 100%;" ref="chartdivWrap">
        <div ref="chartdiv" id="chartdiv" style="width: 100%; height: 100%; background: #ffffff;"></div>
    </div>
</template>

<script>
import COMMON_UTIL from "../../resources/js/commonUtil.js";

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default {
	props: {
		chartDataName: {
			type: Array,
			default: []
		},

		chartData: {
			type: Array,
			default: []
		},
	},

	data() {
		return {
            charts: {},
		};
	},

	methods: {
		createChart: function() {

			if (COMMON_UTIL.isEmpty(this.charts["chartdiv"]) == false) {
                this.charts["chartdiv"].dispose();
            }

            let chartWarp = this.$refs["chartdivWrap"];
            chartWarp.innerHTML = "";
            let div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            chartWarp.appendChild(div);

            let root = am5.Root.new(div);
            this.charts["chartdiv"] = root;
			
		}
	},

	watch: {
        // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
        "chartData": function(newValue, oldValue){
            console.log('chartdiv watch: ', newValue, oldValue);
            // 차트 생성 함수
            this.createChart();
        }
    },

	mounted() {

	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chartdiv {
	height: 50rem;
	padding-top: 2rem;
}
</style>
