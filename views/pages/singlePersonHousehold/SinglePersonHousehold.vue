<template>
    <SinglepersonHeader></SinglepersonHeader>
    <main>
        <h3 class="main_title">
            <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />영천시
            1인가구 현황 분석
        </h3>

        <div class="">
            <div class="content-wrap">
                <div class="content-left">
                    <div class="content-title_lefttop">
                        <h6 class="flex">
                            <img src="../../../resources/images/icon/band.png" alt="" />영천시
                            읍면동별 1인 가구
                        </h6>
                        <label style="margin-left: 1rem; color: blueviolet">*1인가구 현황을 조회하고 싶은 읍면동을 클릭해 주세요</label>
                    </div>
                    <div class="select_wrap3" style="display:flex; justify-content:space-between">
                        <div style="margin-top: 2rem; margin-bottom: 2rem;">
                            <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 영천시</p>
                            <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 가구</p>
                        </div>
                        <div>
                            <label for="year_01" class="yearselect">조회연도</label>
                            <select id="year_01" v-model="sphYearByYC" @change="sphYearByYCChange">
                                <option v-for="(item, idx) in sphYearByYCList" :value="item">
                                    {{ item }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div style="height: 30rem; width: 100%">
                        <P_ChartMap class="ChartMap" ref="ChartRow01" @selectEmd="emdChange" :chartDataName="
                            chartDataName.find((e) => e.name === 'sphCountByEmdList')
                        " :chartData="sphCountByEmdList" />
                    </div>
                    <div class="content-box_lefttop2">
                        <div class="content-title flex-between">
                        </div>
                        <div style="height: 56rem; width: 100%;">
                            <Chart07 ref="Chart07" :chartDataName="
                                chartDataName.find((e) => e.name === 'sphCountByEmdList')
                            " :chartData="sphCountByEmdList" />
                        </div>
                    </div>
                </div>
                <div class="content-box3">
                    <div class="content-title flex-between">
                        <h6 class="flex">
                            <img src="../../../resources/images/icon/band.png" alt="" />영천시
                            1인 가구 비율
                        </h6>
                    </div>
                    <div style="height: 30rem; width: 100%;">
                        <div class="select_wrap3" style="display:flex; justify-content:space-between">
                            <div>
                                <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 통계청</p>
                                <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 가구</p>
                            </div>
                            <div>
                                <label for="year_02" class="yearselect">조회연도</label>
                                <select id="year_02" v-model="year" @change="yearChange">
                                    <option v-for="(item, idx) in yearList" :value="item">
                                        {{ item }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <P_ChartRow01 ref="ChartRow01" :chartDataName="
                            chartDataName.find(
                                (e) => e.name === 'sphRateByAdministzoneList'
                            )
                        " :chartData="sphRateByAdministzoneList" />
                    </div>
                </div>
                <div class="content-box-right2">
                    <div class="content-right2">
                        <div class="content-title flex-between" style="padding: 1.5rem">
                            <h6 class="flex">
                                <img src="../../../resources/images/icon/band.png" alt="" />
                                <span style="
                                color: blueviolet;
                                padding-top: 5px;
                                padding-right: 5px;
                              ">{{ emd }}</span>
                                <span>1인 가구 성비 현황</span>
                            </h6>
                        </div>
                        <div class="select_wrap3" style="display:flex; justify-content:space-between">
                            <div style="margin-bottom: 1rem;">
                                <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 영천시</p>
                                <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 가구</p>
                            </div>
                            <div>
                                <label for="year_01" class="yearselect">조회연도</label>
                                <select id="year_01" v-model="sphYearByYC" @change="sphYearByYCChange">
                                    <option v-for="(item, idx) in sphYearByYCList" :value="item">
                                        {{ item }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div style="height: 61rem; width: 100%">
                            <div class="Chart09">
                                <P_Chart09 ref="P_Chart09" :chartDataName="
                                    chartDataName.find((e) => e.name === 'sphCountBy5AgeList')
                                " :chartData="sphCountBy5AgeList" />

                                <QuarterSPH02 ref="QuarterSPH02" :quarterData="sphCountByGroupList" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-box combine-center">
                    <div class="content-title22">
                        <h6 class="flex">
                            <img src="../../../resources/images/icon/band.png" alt="" />
                            <span style="color: blueviolet; padding-top: 5px; padding-right: 5px">{{ emd }}</span>
                            <span>1인 가구 분석</span>
                        </h6>
                    </div>
                    <div class="select_wrap3" style="display:flex; justify-content:space-between; padding: 2rem">
                        <div>
                            <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 영천시</p>
                            <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 가구</p>
                        </div>
                        <div>
                            <label for="year_01" class="yearselect">조회연도</label>
                            <select id="year_01" v-model="sphYearByYC" @change="sphYearByYCChange">
                                <option v-for="(item, idx) in sphYearByYCList" :value="item">
                                    {{ item }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div style="height: 55rem; margin-bottom: 6rem">
                        <ChartSPH5Age ref="ChartSPH5Age" :chartDataName="
                            chartDataName.find((e) => e.name === 'sphCountBy5AgeList')
                        " :chartData="sphCountBy5AgeList" />
                    </div>
                    <div class="Quarterbox">
                        <QuarterSPH01 ref="QuarterSPH01" :quarterData="sphCountByGroupList" />
                    </div>
                </div>

                <!-- <div class="content-box combine-bottom">
          <div class="content-title">
            <h6 class="flex">
              <img src="../../../resources/images/icon/band.png" alt="" />분석
              모델
            </h6>
          </div>
          <h3 class="bottom-subtitle">
            신체 건강 문제 발생 가능 최초 연령 :
            <span class="red" style="padding-left: 5px"> 47세</span>
          </h3>
          <h3 class="bottom-subtitle">
            ▶
            <span
              style="color: blueviolet; padding-left: 5px; padding-right: 5px"
              >{{ emd }}</span
            >
            전체 거주 인구 수 대비
            <span
              style="
                font-size: 32px;
                color: red;
                padding-left: 5px;
                padding-right: 5px;
              "
              >47세</span
            >
            이상 1인 가구 수
            <span style="font-size: 8px">
              - 임시 차트입니다. 추후 수정 예정.-</span
            >
          </h3>
          <P_Chart10></P_Chart10>
        </div> -->
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";

import SinglepersonHeader from "./SinglepersonHeader.vue";
import P_ChartMap from "../../component/P_ChartMap.vue";
import Chart07 from "../../component/Chart07.vue";
import P_ChartRow01 from "../../component/P_ChartRow01.vue";
import P_Chart09 from "../../component/P_Chart09.vue";
import QuarterSPH02 from "../../component/QuarterSPH02.vue";
import ChartSPH5Age from "../../component/ChartSPH5Age.vue";
import QuarterSPH01 from "../../component/QuarterSPH01.vue";
import P_Chart10 from "../../component/P_Chart10.vue";

export default {
    data() {
        return {
            // 현재 선택 연도
            year: 2021,

            // 연도 목록
            yearList: [2021, 2020, 2019, 2018, 2017],

            // 현재 선택된 영천시 1인가구 연도
            sphYearByYC: 2022,

            // 영천시 1인가구 연도 목록
            sphYearByYCList: [],

            // 현재 선택 읍면동
            emd: "영천시",

            // 차트 데이터 이름 목록
            chartDataName: [
                { name: "sphRateByAdministzoneList" },
                { name: "sphCountByEmdList" },
                { name: "sphCountBy5AgeList" },
                { name: "sphCountByGroupList" },
            ],

            // 행정구역 별 1인가구 비율 목록
            sphRateByAdministzoneList: [],

            // 2022년 읍면동 별 1인 가구 수 목록
            sphCountByEmdList: [],

            // 2022년 연령 5세 별 1인 가구 수 목록 조회
            sphCountBy5AgeList: [],

            // 연령 그룹 별 1인 가구 수 목록 조회
            sphCountByGroupList: [],

            showAddress: false,
        };
    },

    methods: {
        // 연도 변경 시 해당 연도 차트 데이터 조회
        yearChange: function () {
            const vm = this;

            vm.sphRateByAdministzoneSelectList(); // 행정구역 별 1인가구 비율 목록 조회
        },

        // 영천시 1인가구 연도 변경 시 해당 연도 차트 데이터 조회
        sphYearByYCChange: function () {
            const vm = this;

            vm.sphCountByEmdSelectList(); // 행정구역 별 1인가구 비율 목록 조회
            vm.sphCountBy5AgeSelectList(); // 연령 5세 별 1인 가구 수 목록 조회
        },

        // 읍면동 변경 시 해당 읍면동 차트 데이터 조회
        emdChange: function (emd) {
            const vm = this;
            // console.log("before emd: ", this.emd);
            this.emd = emd;
            // console.log("after emd: ", this.emd);

            vm.sphCountBy5AgeSelectList(); // 연령 5세 별 1인 가구 수 목록 조회
            vm.sphCountByGroupSelectList(); // 연령 그룹 별 1인 가구 수 목록 조회
        },

        // 행정구역 별 1인가구 비율 목록 조회
        sphRateByAdministzoneSelectList: function () {
            const vm = this;
            axios({
                url: "/singlePersonHousehold/sphRateByAdministzoneSelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {
                    year: vm.year,
                },
            })
                .then(function (response) {
                    // console.log("sphRateByAdministzoneSelectList - response : ", response.data);
                    vm.sphRateByAdministzoneList = response.data;
                })
                .catch(function (error) {
                    console.log("sphRateByAdministzoneSelectList - error : ", error);
                    alert("행정구역 별 1인가구 비율 목록 조회 오류");
                });
        },

        // 영천시 1인가구 연도 목록 조회
        sphYearByYCSelectList: function () {
            const vm = this;
            axios({
                url: "/singlePersonHousehold/sphYearByYCSelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {},
            })
                .then(function (response) {
                    // console.log("sphYearByYCSelectList - response : ", response.data);
                    for (let i = 0; i < response.data.length; i++) {
                        vm.sphYearByYCList[i] = response.data[i]["year"];
                    }
                    // console.log("sphYearByYCList - response : ", vm.sphYearByYCList);
                    // vm.sphYearByYCList = response.data;
                })
                .catch(function (error) {
                    console.log("sphYearByYCSelectList - error : ", error);
                    alert("영천시 1인가구 연도 목록 조회 오류");
                });
        },

        // 2022년 읍면동 별 1인 가구 수 목록 조회
        sphCountByEmdSelectList: function () {
            const vm = this;
            axios({
                url: "/singlePersonHousehold/sphCountByEmdSelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {},
            })
                .then(function (response) {
                    //   console.log("sphCountByEmdSelectList - response : ", response.data);
                    vm.sphCountByEmdList = response.data;
                })
                .catch(function (error) {
                    console.log("sphCountByEmdSelectList - error : ", error);
                    alert("읍면동 별 1인 가구 수 목록 조회 오류");
                });
        },

        // 2022년 연령 5세 별 1인 가구 수 목록 조회
        sphCountBy5AgeSelectList: function () {
            const vm = this;
            axios({
                url: "/singlePersonHousehold/sphCountBy5AgeSelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {
                    year: 2022,
                    emd: vm.emd,
                },
            })
                .then(function (response) {
                    // console.log("sphCountBy5AgeSelectList - response : ", response.data);
                    vm.sphCountBy5AgeList = response.data;
                })
                .catch(function (error) {
                    console.log("sphCountBy5AgeSelectList - error : ", error);
                    alert("연령 5세 별 1인 가구 수 목록 조회 오류");
                });
        },

        // 연령 그룹 별 1인 가구 수 목록 조회
        sphCountByGroupSelectList: function () {
            const vm = this;
            axios({
                url: "/singlePersonHousehold/sphCountByGroupSelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {
                    year: 2022,
                    emd: vm.emd,
                },
            })
                .then(function (response) {
                    // console.log("sphCountByGroupSelectList - response : ", response.data);
                    vm.sphCountByGroupList = response.data;
                })
                .catch(function (error) {
                    console.log("sphCountByGroupSelectList - error : ", error);
                    alert("연령 그룹 별 1인 가구 수 목록 조회 오류");
                });
        },
    },

    watch: {
        year: function (newValue, oldValue) {
            // console.log("year watch: ", newValue, oldValue);
            this.yearChange();
        },

        sphYearByYC: function (newValue, oldValue) {
            // console.log("year watch: ", newValue, oldValue);
            this.sphYearByYCChange();
        },
    },

    components: {
        P_ChartRow01: P_ChartRow01,
        Chart07: Chart07,
        ChartSPH5Age: ChartSPH5Age,
        QuarterSPH01: QuarterSPH01,
        QuarterSPH02: QuarterSPH02,
        P_Chart09: P_Chart09,
        P_ChartMap: P_ChartMap,
        SinglepersonHeader: SinglepersonHeader,
        P_Chart10: P_Chart10,
    },

    mounted() {
        this.sphYearByYCSelectList();
        this.sphRateByAdministzoneSelectList();
        this.sphCountByEmdSelectList();
        this.sphCountBy5AgeSelectList();
        this.sphCountByGroupSelectList();
    },
};
</script>
<style scoped>
main {
    height: 240rem;
}

h3 img {
    width: 4rem;
    margin-right: 1rem;
}

h4 img {
    width: 2.5rem;
    margin-right: 1rem;
    margin-left: 1rem;
}

h3 {
    /* font-size: 18px;
    font-weight: bold;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: normal;
    border-bottom: #aaaaaa 1px solid;
    padding-top: 1rem;
    padding-bottom: 1rem; */
    font-size: 2.4rem;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d4d4d4;
    padding-bottom: 1.4rem;
    margin-bottom: 2rem;
}

/* .main_title {
    font-family: GmarketSansBold;
    font-size: 2.8rem;
} */


.cotroll {
    position: absolute;
    z-index: 10;
}

ul h6 {
    font-size: 1.4rem;
}

ul label {
    font-size: 1.2rem;
}

.width {
    width: 194.39px;
}

.content-text {
    height: 3rem;
    border-radius: 5px;
    text-align: center;
    font-size: 1.4rem;
    line-height: 3rem;
}

.content-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: normal;
    border-bottom: #aaaaaa 1px solid;
}

h4 {
    font-size: 2.8rem;
    font-size: 2.8rem;
    padding-top: 1rem;
    padding-bottom: 2rem;
}

h5 {
    width: 100%;
    padding-bottom: 4px;
    font-size: 23px;
    font-weight: 600;
    position: relative;
}

h6 {
    color: #5378ad;
    font-size: 2.4rem;
    display: flex;
    text-align: center;
}

h6 img {
    padding-right: 2rem;
}

.subtitle img {
    width: 1.2rem;
}

.subtitle {
    margin: 3rem 0 1rem 0;
}

em {
    font-style: normal;
}

.fr {
    font-size: 1.8rem;
}

.red {
    color: red;
}

.blue {
    color: #5785ff;
}

.top {
    position: relative;
    width: 100%;
    height: 60px;
    background: #5785ff;
    display: table;
    border-radius: 0px 15px 15px 0px;
}

.top h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: normal;
    border-bottom: #aaaaaa 1px solid;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.left {
    position: absolute;
    z-index: 1000;
    width: 300px;
    /* height: 100%; */
    height: calc(100vh - 60px);
    float: left;
    background-color: transparent;
}

.right {
    position: relative;
    width: 100%;
    /* height: 100%; */
    height: calc(100vh - 60px);
    float: right;
    background: #aaaaaa;
}

.bottom {
    padding: 1.5rem;
}

.sidebar-toggle {
    position: absolute;
    top: 10px;
    right: 1rem;
    z-index: 1000;
    font-size: 21px;
    background: #42547f;
    padding: 12px 15px;
    opacity: 1;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
    width: 200px;
    display: block;
    border-radius: 5px;
    text-align: center;
}

.sidebar-layer {
    position: absolute;
    right: 0px;
    top: 0;
    z-index: 1000;
    height: 100%;
    width: 85rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.9);
    overflow: auto;
    overflow-x: hidden;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 1rem;
    font-size: 21px;
    background: #f7f7f7;
    opacity: 1;
    cursor: pointer;
    width: 200px;
    height: 6rem;
    display: block;
    border-radius: 5px;
    text-align: right;
}

.close-btn img {
    width: 4rem;
}

.yclogo {
    width: 4rem;
    height: 4rem;
    margin-right: 2rem;
}

.content-wrap {
    display: grid;
    gap: 4rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.5fr 1fr 0.5fr;
}

.content-wrap2 {
    display: grid;
    gap: 4rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.5fr 1fr;
}

.content-box {
    height: 118rem;
}

.content-box_lefttop2 {
    margin-top: 19rem;
}

.Quarterbox {
    display: flex;
    justify-content: space-around;
    margin-top: 2rem;
}

.bottom-subtitle {
    padding: 10px 10px 10px 10px;
    align-items: baseline;
    border-bottom: none;
}

.content-title_lefttop {
    /* margin-bottom: 5rem; */
    padding: 1rem;
    border-bottom: 1px solid #aaaaaa;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.content-box.combine-center {
    display: flex;
    flex-direction: column;
    height: 99rem;
    padding: 1.5rem;
}

.content-box.combine-bottom {
    height: 80rem;
    top: -16rem;
    position: relative;
}

.content-title22 {
    padding: 1.5rem;
    border-bottom: 1px solid #aaaaaa;
    display: flex;
    align-items: center;
    /* margin-bottom: 3rem; */
}

.ChartMap {
    height: 40rem;
    margin-top: 7rem;
    padding-top: 7rem;
    padding: 2.5rem;
}

.Chart09 {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.yearselect {
    padding-right: 1rem;
}

.select_wrap3 {
    font-weight: 500;
    font-size: 16px;
    display: inline-block;
    padding-right: 5px;
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
}

.content-box3 {
    height: 43rem;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 1px 1px 7px #00000021;
    border: none;
    padding: 1.5rem;
    display: grid;
    grid-column: 2/2;
    grid-row: 1/3;
}

.content-right2 {
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 1px 1px 7px #00000021;
    border: none;
    height: 75rem;
    margin-top: 6rem;
    padding: 1.5rem;
}

.content-box-right2 {
    position: relative;
    /* padding: 1.5rem; */
    display: grid;
    grid-column: 2/2;
    grid-row: 1/2;
    margin-top: 41rem;
}

.content-left {
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 1px 1px 7px #00000021;
    border: none;
    height: 122rem;
    padding: 1.5rem;
}

.content-box {
    padding: 0rem;
}

.content-wrap {
    height: 240rem;
}

.sub_info {
    font-family: GmarketSansLight;
    font-size: 1.4rem;
    font-weight: bold;
}
</style>
