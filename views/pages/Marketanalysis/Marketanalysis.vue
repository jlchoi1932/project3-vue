<template>
    <div class="left">
        <div class="top">
            <h3>영천시 상권 분석</h3>
        </div>
        <div class="bottom">
            <div class="tab-round">
                <h3>주제도 설정</h3>
                <!-- <div>
                <h4>통계설정</h4>
                <ToggleVue1></ToggleVue1>
                </div> -->
                <h4>조회연도</h4>
                <search-box class="datebox">
                    <!-- <section class="flex_DatePicker">
                        <VueDatePicker v-model="startDate" type="month" :enable-time-picker="false" placeholder="년-월-일">
                        </VueDatePicker>
                    </section>
                    <p class="dateduring">&nbsp;~&nbsp;</p>
                    <div class="flex_DatePicker">
                        <VueDatePicker v-model="endDate" type="month" :enable-time-picker="false" placeholder="년-월-일">
                        </VueDatePicker>
                    </div> -->
                    <select id="year_02" style="width: 25rem; height: 4rem; font-size: 1.5rem; text-align: center;"
                    v-model="year" @change="yearChange">
                        <option v-for="(item, idx) in yearList" :value="item">
                            {{ item }}
                        </option>
                    </select>
                </search-box>
                <h4>통계표출</h4>
                <button id="searchBtn" @click="dateChange">조회</button>
                <!-- <div>
                <h4>통계표출</h4>
                <ToggleVue4></ToggleVue4>
                </div> -->
            </div>
        </div>
        <!-- <div>
            <SearchTab></SearchTab>
            <Heatmap></Heatmap>
        </div> -->
    </div>
    <div class="right">
        <Map @selectEmd="emdChange" :chartDataName="chartDataName.find((e) => e.name === 'marketSmallBusinessList')"
            :chartData="marketSmallBusinessList"></Map>
        <div class="sidebar-toggle" v-on:click="showAddress = !showAddress">
            분석데이터 확인
        </div>
        <div class="sidebar-layer" v-show="showAddress">
            <div class="close-btn" v-on:click="showAddress = !showAddress">
                <img src="../../../resources/images/close.png" alt="" />
            </div>
            <div class="">
                <h4 class="flex">
                    <img src="../../../resources/images/icon/yc_logo_icon.svg" class="yclogo" alt="" />
                    영천시 상세 현황 ({{ this.year }}년)
                </h4>
                <div class="content-wrap">
                    <div class="content-box">
                        <div class="content-title flex-between">
                            <h6 class="flex">
                                <img src="../../../resources/images/icon/band.png" alt="" />영천시 읍면동별 소상공인
                            </h6>
                        </div>
                        <!-- <div style="display:flex; justify-content:space-between">
                            <p class="sub_info" style="padding-left: 1rem;">출처: 공공데이터포털</p>
                            <p class="sub_info" style="padding-right: 1rem;">단위: 개</p>
                        </div> -->
                        <div style="margin: 1rem 0 1rem 0">
                            <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 공공데이터포털</p>
                            <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 개</p>
                        </div>
                        <div style="height: 30rem">
                            <M_Chart01 ref="M_Chart01" :chartDataName="
                                chartDataName.find(
                                    (e) => e.name === 'marketSmallBusinessEmdList'
                                )
                            " :chartData="marketSmallBusinessEmdList" />
                        </div>
                    </div>
                    <div class="content-box">
                        <div class="content-title flex-between">
                            <h6 class="flex">
                                <img src="../../../resources/images/icon/band.png" alt="" />
                                <span style="
                            color: blueviolet;
                            padding-top: 5px;
                            padding-right: 5px;
                          ">{{ emd }}</span>
                                <span>업종별 소상공인 비율</span>
                            </h6>
                            <div class="select_wrap">
                                <button class="chart02_btn" @click="largeBtn">대분류</button>
                                <button class="chart02_btn" @click="mediumBtn">중분류</button>
                            </div>
                        </div>
                        <!-- <div style="display:flex; justify-content:space-between">
                            <p class="sub_info" style="padding-left: 1rem;">출처: 공공데이터포털</p>
                            <p class="sub_info" style="padding-right: 1rem;">단위: 개</p>
                        </div> -->
                        <div style="margin: 1rem 0 1rem 0">
                            <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 공공데이터포털</p>
                            <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 개</p>
                        </div>
                        <div style="height: 40rem">
                            <M_Chart02 ref="M_Chart02" :chartDataName="
                                chartDataName.find(
                                    (e) => e.name === 'marketSmallBusinessTypeList'
                                )
                            " :chartData="marketSmallBusinessTypeList" :type="industryType" />
                        </div>
                    </div>
                    <div class="content-box">
                        <div class="content-title flex-between">
                            <h6 class="flex">
                                <img src="../../../resources/images/icon/band.png" alt="" />
                                <span style="
                            color: blueviolet;
                            padding-top: 5px;
                            padding-right: 5px;
                          ">{{ emd }}</span>
                                <span>소상공인 및 소비 순위</span>
                            </h6>
                            <p class="sub_info" style="padding-right: 5rem; padding-top: 1rem;">*상위 10개 소분류 업종</p>
                            <div class="select_wrap">
                                <button class="chart03_btn" @click="amountBtn">이용 금액</button>
                                <button class="chart03_btn" @click="countBtn">이용자 수</button>
                            </div>
                        </div>
                        <!-- <div style="display:flex; justify-content:space-between">
                            <p class="sub_info" style="padding-left: 1rem;">출처: 공공데이터포털, BC카드</p>
                            <p v-show="this.consumeType == 'amount'" class="sub_info" style="padding-right: 1rem;">단위: 원</p>
                            <p v-show="this.consumeType == 'count'" class="sub_info" style="padding-right: 1rem;">단위: 명</p>
                        </div> -->
                        <div style="margin: 1rem 0 1rem 0">
                            <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 공공데이터포털, BC카드</p>
                            <p v-show="this.consumeType == 'amount'" class="sub_info" style="display:inline; padding-left: 5rem;">단위: 원</p>
                            <p v-show="this.consumeType == 'count'" class="sub_info" style="display:inline; padding-left: 5rem;">단위: 명</p>
                        </div>
                        <div style="height: 43rem">
                            <M_Chart03 ref="M_Chart03" :chartDataName="
                                chartDataName.find(
                                    (e) => e.name === 'marketSmallBusinessTypeList'
                                )
                            " :chartData="marketSmallBusinessTypeList" :chartData2="marketSmallBusinessCardConsumeList"
                                :type="consumeType" />
                        </div>
                    </div>
                    <!-- <div class="flex-between">
                        <div class="content-box" style="width: 100%">
                            <div class="content-title flex-between">
                                <h6 class="flex">
                                    <img src="../../../resources/images/icon/band.png" alt="" />읍면동별 상권 변화 분석 클러스터링
                                </h6>
                            </div>
                            <div style="height: 40rem">
                                <M_Chart04 ref="M_Chart04" :chartDataName="
                                    chartDataName.find(
                                        (e) => e.name === 'marketSmallBusinessEmdList'
                                    )
                                " :chartData="marketSmallBusinessEmdList" />
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

import COMMON_UTIL from "../../../resources/js/commonUtil.js";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
// import DatePicker from "../../component/DatePicker.vue";
// import SearchTab from "../../component/SearchTab.vue";
// import Heatmap from "../../component/Heatmap.vue";
import Map from "../../component/Map.vue";
import M_Chart01 from "./M_Chart01.vue";
import M_Chart02 from "./M_Chart02.vue";
import M_Chart03 from "./M_Chart03.vue";
// import M_Chart04 from "./M_Chart04.vue";

export default {
    data() {
        return {
            // 조회 시작 일자
            startDate: null,

            // 조회 종료 일자
            endDate: null,

            // 현재 선택 연도
            year: 2022,

            // 연도 목록
            yearList: [2022, 2021, 2020],

            // 영천시 1인가구 연도 목록
            sphYearByYCList: [],

            // 현재 선택 읍면동
            emd: "영천시",

            code: null,

            // 업종 타입
            industryType: "large",

            // 소비 타입
            consumeType: "amount",

            // 차트 데이터 이름 목록
            chartDataName: [
                { name: "marketSmallBusinessList" },
                { name: "marketSmallBusinessEmdList" },
                { name: "marketSmallBusinessTypeList" },
                { name: "marketSmallBusinessCardConsumeList" },
            ],

            // 읍면동 소상공인 목록 조회
            marketSmallBusinessList: [],

            // 읍면동별 소상공인 수 목록
            marketSmallBusinessEmdList: [],

            // 업종 분류별 소상공인 수 목록
            marketSmallBusinessTypeList: [],

            // 업종 분류별 BC카드 소비 목록
            marketSmallBusinessCardConsumeList: [],

            // 분석데이터 표시 상태
            showAddress: true,
        };
    },

    methods: {
        // 연도 변경 시 해당 연도 차트 데이터 조회
        dateChange: function () {
            const vm = this;
            // 시작, 종료 모두 선택되지 않았을 경우 return
            /* if(this.startDate != null || this.endDate != null) {
                console.log('date: ', this.startDate, this.endDate);
                let startYear = null;
                let endYear = null;
                let startYMonth = null;
                let endYMonth = null;

                // 시작일자가 있을 경우
                if(this.startDate != null) {
                    let start = new Date(this.startDate);
                    // console.log('format startDate: ', start.getFullYear() + COMMON_UTIL.prefixZero(start.getMonth()+1, 2));
                    startYear = start.getFullYear();
                    startYMonth = start.getFullYear() + COMMON_UTIL.prefixZero(start.getMonth()+1, 2);
                }

                // 종료일자가 있을 경우
                if(this.endDate != null) {
                    let end = new Date(this.endDate);
                    // console.log('format endDate: ', end.getFullYear() + COMMON_UTIL.prefixZero(end.getMonth()+1, 2));
                    endYear = end.getFullYear();
                    endYMonth = end.getFullYear() + COMMON_UTIL.prefixZero(end.getMonth()+1, 2);
                }

                console.log('dateChange: ', startYear, startYMonth, endYear, endYMonth)
                vm.marketAnalysisSelectAll(startYear, endYear);
                vm.ycDataMartSelectAll(startYMonth, endYMonth);
            } else {
                return alert('조회연도를 선택해 주세요');
            } */
            vm.marketAnalysisSelectAll();
            vm.ycDataMartSelectAll();
            vm.marketSmallBusinessSelectList(vm.code);
        },

        // 대분류 버튼
        largeBtn: function () {
            if (this.industryType != "large") {
                this.industryType = "large";
            }
        },
        // 중분류 버튼
        mediumBtn: function () {
            if (this.industryType != "medium") {
                this.industryType = "medium";
            }
        },

        // 이용 금액 버튼
        amountBtn: function () {
            if (this.consumeType != "amount") {
                this.consumeType = "amount";
            }
        },
        // 이용자 수 버튼
        countBtn: function () {
            if (this.consumeType != "count") {
                this.consumeType = "count";
            }
        },

        // 영천시 1인가구 연도 변경 시 해당 연도 차트 데이터 조회
        sphYearByYCChange: function () {
            const vm = this;
        },

        // 읍면동 변경 시 해당 읍면동 차트 데이터 조회
        emdChange: function (emd, code) {
            const vm = this;
            // console.log("before emd: ", this.emd);
            this.emd = emd;
            this.code = code;
            // console.log("after emd: ", this.emd, code);
            vm.marketAnalysisSelectAll();
            vm.marketSmallBusinessSelectList(code);
        },

        // 읍면동 소상공인 목록 조회
        marketSmallBusinessSelectList: function (code) {
            const vm = this;
            axios({
                url: "/marketAnalysis/marketSmallBusinessSelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {
                    year: vm.year,
                    emdCode: code,
                },
            })
                .then(function (response) {
                    vm.marketSmallBusinessList = response.data;
                    // console.log("marketSmallBusinessSelectList - response : ", vm.marketSmallBusinessList);
                })
                .catch(function (error) {
                    console.log("marketSmallBusinessSelectList - error : ", error);
                    alert("소상공인 목록 조회 오류");
                });
        },

        // 소상공인 시각화 관련 전체 데이터 목록 조회
        marketAnalysisSelectAll: function () {
            const vm = this;
            /* console.log('db: ', startDate, endDate);
            if(typeof startDate == "undefined" || startDate === undefined) {
                startDate = this.year;
            };
            if(typeof endDate == "undefined" || endDate === undefined) {
                endDate = this.year;
            };
            // 시작 일자가 종료 일자보다 크다면 종료 일자와 동일하게 설정
            if(startDate > endDate) {
                startDate = endDate;
            }

            console.log('after db: ', startDate, endDate); */

            axios({
                url: "/marketAnalysis/marketAnalysisSelectAll.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {
                    year: vm.year,
                    emd: vm.emd,
                },
            })
                .then(function (response) {
                    // console.log("marketAnalysisSelectAll - response : ", response.data);
                    vm.marketSmallBusinessEmdList =
                        response.data.marketSmallBusinessEmdList;
                    vm.marketSmallBusinessTypeList =
                        response.data.marketSmallBusinessTypeList;
                    /* vm.marketSmallBusinessCardConsumeList =
                        response.data.marketSmallBusinessCardConsumeList; */
                })
                .catch(function (error) {
                    console.log("marketAnalysisSelectAll - error : ", error);
                    alert("소상공인 시각화 관련 전체 데이터 목록 조회 오류");
                });
        },

        // 영천시 DB 관련 전체 데이터 목록 조회
        ycDataMartSelectAll: function () {
            const vm = this;
            /* console.log('db: ', startDate, endDate);
            if(typeof startDate == "undefined" || startDate === undefined) {
                startDate = null;
            };
            if(typeof endDate == "undefined" || endDate === undefined) {
                endDate = null;
            };
            // 시작 일자가 종료 일자보다 크다면 종료 일자와 동일하게 설정
            if(startDate > endDate) {
                startDate = endDate;
            }
            console.log('after db: ', startDate, endDate); */

            axios({
                url: "/ycDataMart/ycDataMartSelectAll.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {
                    year: vm.year,
                    emd: vm.emd,
                },
            })
                .then(function (response) {
                    // console.log("ycDataMartSelectAll - response : ", response.data);
                    vm.marketSmallBusinessCardConsumeList = response.data.ycBCMarketSmallBusinessCardConsumeList;
                })
                .catch(function (error) {
                    console.log("ycDataMartSelectAll - error : ", error);
                    alert("영천시 DB 관련 전체 데이터 목록 조회 오류");
                });
        },
    },

    watch: {
        /* year: function (newValue, oldValue) {
            console.log("year watch: ", newValue, oldValue);
            this.yearChange(); // 굳이 두 단계에 거쳐서 차트 데이터 조회를 해야할까? 여기서 바로 데이터 조회 함수를 실행하면 안되는가?
        }, */
    },

    components: {
        VueDatePicker: VueDatePicker,
        // DatePicker: DatePicker,
        // SearchTab: SearchTab,
        // Heatmap: Heatmap,
        Map: Map,
        M_Chart01: M_Chart01,
        M_Chart02: M_Chart02,
        M_Chart03: M_Chart03,
        // M_Chart04: M_Chart04,
    },

    mounted() {
        this.marketAnalysisSelectAll();
        this.ycDataMartSelectAll();
    },
};
</script>
<style scoped>
.tab-round {
    display: block;
    margin: 1rem 0px;
    padding: 12px 12px;
    border-radius: 10px;
    line-height: 29px;
    text-align: center;
    font-size: 16px;
    width: 100%;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    vertical-align: middle;
    background: #ffffff;
    box-shadow: 0px 0px 7px #0000007a;
}

.tab-round>input {
    width: 30%;
    padding: 6px 12px;
    border-radius: 0.5rem;
    margin: 0 auto;
    background: #ffffff;
    color: #000000;
    border: 1px solid #d2d2d3;
    overflow: hidden;
    text-align: center;
}

.tab-round>h3 {
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
    font-weight: bolder;
    font-size: 2.2rem;
}

.tab-round>h4 {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: #36629b;
}

.tab-round>div {
    margin-bottom: 2.5rem;
}

.tab-round>p {
    width: 8rem;
}

.tab-round>.datebox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.5rem;
}

.tab-round>.flex_DatePicker {
    width: 59rem;
    margin-bottom: -2.5rem;
    padding: 0;
    cursor: pointer;
}

.tab-round>.dateduring {
    color: #d2d2d3;
    margin: 0;
    text-align: center;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 8px;
}

.tab-round>input::placeholder {
    color: #d2d2d3;
    font-size: 1.3rem;
}
#searchBtn {
    border-radius: 0.5rem;
    /* width: fit-content; */
    margin: 0 auto;
    background: #5785ff;
    color: #ffffff;
    border: 1px solid #d2d2d3;
    overflow: hidden;
    padding: 0 1rem;
    font-weight: 600;
    width: 24.5rem;
    height: 3rem;
    cursor: pointer;
}

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
    margin-bottom: 1rem;
    padding: 1rem;
    border-bottom: 1px solid #aaaaaa;
    display: flex;
    align-items: center;
}

.content-box {
    margin-bottom: 1rem;
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
    background: #5378ad;
    display: table;
    border-radius: 0px 15px 15px 0px;
}

.top h3 {
    display: table-cell;
    vertical-align: middle;
    position: relative;
    font-size: 18px;
    color: #fff;
    text-align: center;
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
    box-shadow: 0px 12px 24px 0px rgba(0, 0, 0, 0.16);
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

button {
    margin-left: 0.5rem;
    padding: 0.2rem 0.5rem;
}

.chart02_btn:focus {
    border-radius: 5px;
    background: #5378ad;
    color: #fff;
}
.chart03_btn:focus {
    border-radius: 5px;
    background: #5378ad;
    color: #fff;
}

.sub_info {
    font-family: GmarketSansLight;
    font-size: 1.4rem;
    font-weight: bold;
}
</style>
