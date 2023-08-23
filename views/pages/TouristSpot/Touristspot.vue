<template>
    <TouristVisual ref="TouristVisual" :touristCountList="touristCountList"
        :touristStayTimeAndDayList="touristStayTimeAndDayList" />
    <main>
        <h3 class="main_title">
            <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />영천시
            전체 관광지 및 방문객 현황 분석
        </h3>
        <div class="content-wrap">
            <div class="content-box combine-left combine-row-all" style="height: auto;       ">
                <div>
                    <div class="sub_title">
                        <h4>
                            <img src="../../../resources/images/icon/band.png" alt="" />관광지별 입장 통계량
                        </h4>
                        <p class="sub_info">
                            연도 선택시, 해당 연도의 관광지별 입장 통계랑을 조회할 수
                            있습니다.
                        </p>
                    </div>

                    <div>
                        <div class="graph_box" style="height: 45rem">
                            <div class="select_wrap3" style="display:flex; justify-content:space-between">
                                <div>
                                    <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 영천시</p>
                                    <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 명</p>
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
                            <ChartMap ref="ChartMap" :chartDataName="
                                chartDataName.find((e) => e.name === 'touristSpotCountList')
                            " :chartData="touristSpotCountList"></ChartMap>
                        </div>
                        <div class="graph_box" style="height: 80.5rem">
                            <ChartRow01 ref="ChartRow01" :chartDataName="
                                chartDataName.find((e) => e.name === 'touristSpotCountList')
                            " :chartData="touristSpotCountList" class="ChartRow01" />
                        </div>
                    </div>
                    <Quarter :quarterData="touristQuarterCountList" :year="year" />
                </div>
            </div>
            <div class="content-box combine-right combine-row">
                <div class="sub_title">
                    <h4>
                        <img src="../../../resources/images/icon/band.png" alt="" />영천시
                        연도별 관광지 관광객
                    </h4>
                    <p class="sub_info">연도별 관광지 관광객에 대한 시각화입니다.</p>
                </div>
                <div style="display:flex; justify-content:space-between; margin-top: 1rem; margin-bottom: 1rem;">
                        <p class="sub_info" style="padding-left: 1rem;">출처: 영천시</p>
                        <p class="sub_info" style="padding-right: 1rem;">단위: 명</p>
                    </div>
                <div class="sub_detail">
                    <Chart01 ref="Chart01" :chartDataName="
                        chartDataName.find((e) => e.name === 'touristCountList')
                    " :chartData="touristCountList" />
                </div>
            </div>
            <div class="content-box combine-right combine-row2">
                <div class="sub_title">
                    <h4>
                        <img src="../../../resources/images/icon/band.png" alt="" />영천시
                        연도별 체류 시간 및 숙박 일수
                    </h4>
                    <p class="sub_info">
                        연도별 체류 시간 및 숙박 일수에 대한 시각화입니다.
                    </p>
                </div>
                <div style="display:flex; justify-content:space-between; margin-top: 1rem; margin-bottom: 1rem;">
                        <p class="sub_info" style="padding-left: 1rem;">출처: 한국관광 데이터랩</p>
                        <p class="sub_info" style="padding-right: 1rem;">체류시간 단위: 분, 숙박일수 단위: 일</p>
                    </div>
                <div class="sub_detail">
                    <Chart02 ref="Chart02" :chartDataName="
                        chartDataName.find((e) => e.name === 'touristStayTimeAndDayList')
                    " :chartData="touristStayTimeAndDayList" />
                </div>
            </div>
            <div class="content-box combine-right combine-row3">
                <div class="sub_title">
                    <h4>
                        <img src="../../../resources/images/icon/band.png" alt="" />방문객
                        유입·출발지 분포
                    </h4>
                    <p class="sub_info">
                        연도 선택시, 해당 연도의 영천시 방문객 유입 지역을 조회할 수
                        있습니다.
                    </p>
                </div>
                <div class="sub_detail">
                    <div class="select_wrap3" style="display:flex; justify-content:space-between">
                                <div>
                                    <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 한국관광 데이터랩</p>
                                    <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 명</p>
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
                    <Chart03 ref="Chart03" :chartDataName="
                        chartDataName.find((e) => e.name === 'touristInflowBySignguList')
                    " :chartData="touristInflowBySignguList" />
                </div>
            </div>
        </div>
        <h3>
            <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />영천시
            관심 관광 분야 현황 분석
        </h3>
        <div class="content-wrap2">
            <div class="content-box combine-left2 combine-row">
                <div>
                    <div class="sub_title">
                        <h4>
                            <img src="../../../resources/images/icon/band.png" alt="" />내비게이션 인기 관광지 검색량
                        </h4>
                    </div>
                    <div>
                        <div class="select_wrap3" style="display:flex; justify-content:space-between; padding-bottom: 2rem;">
                                <div>
                                    <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 한국관광 데이터랩</p>
                                    <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 건</p>
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
                        <Table :headers="headers" :items="touristNavSearchList" :scrollState="scrollState" />
                    </div>
                </div>
            </div>
            <div class="content-box combine-right combine-row">
                <div class="sub_title">
                    <h4>
                        <img src="../../../resources/images/icon/band.png" alt="" />영천시
                        관광소비 유형
                    </h4>
                </div>
                <div class="select_wrap3" style="display:flex; justify-content:space-between; padding-bottom: 2rem;">
                                <div>
                                    <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 한국관광 데이터랩</p>
                                    <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 원</p>
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
                <div class="sub_detail_padding">
                    <h2 class="paytext">업종별 지출액</h2>
                    <Charthierarchy ref="Charthierarchy" :chartDataName="
                        chartDataName.find(
                            (e) => e.name === 'touristConsumeTypeChartData'
                        )
                    " :chartData="touristConsumeTypeChartData" />
                </div>
            </div>
            <div class="content-box combine-center">
                <div class="sub_title">
                    <h4>
                        <img src="../../../resources/images/icon/band.png" alt="" />업종별
                        신용카드 소비액 추이
                    </h4>
                </div>
                <div class="sub_detail"></div>
                <div class="select_wrap3" style="display:flex; justify-content:space-between; padding-bottom: 2rem;">
                                <div>
                                    <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 한국관광 데이터랩</p>
                                    <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 천원</p>
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
                <Chart04 ref="Chart04" :chartDataName="
                    chartDataName.find((e) => e.name === 'touristConsumeAmountList')
                " :chartData="touristConsumeAmountList" />
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";

import TouristVisual from "./TouristVisual.vue";
import ChartMap from "../../component/ChartMap.vue";
import ChartRow01 from "../../component/ChartRow01.vue";
import Quarter from "../../component/Quarter.vue";
import Chart01 from "../../component/Chart01.vue";
import Chart02 from "../../component/Chart02.vue";
import Chart03 from "../../component/Chart03.vue";
import Table from "../../component/Table.vue";
import Charthierarchy from "../../component/Charthierarchy.vue";
import Chart04 from "../../component/Chart04.vue";

export default {
    data() {
        return {
            // 현재 선택 연도
            year: 2022,

            // 연도 목록
            yearList: [2022, 2021, 2020, 2019],

            // 차트 데이터 이름 목록
            chartDataName: [
                { name: "touristSpotCountList" },
                { name: "touristQuarterCountList" },
                { name: "touristCountList" },
                { name: "touristStayTimeAndDayList" },
                { name: "touristInflowBySignguList" },
                { name: "touristNavSearchList" },
                // { name: 'touristConsumeTypeList' },
                // { name: 'touristConsumeTypeAmountList' },
                { name: "touristConsumeTypeChartData" },
                { name: "touristConsumeAmountList" },
            ],

            // 연도별 관광지별 입장 수 목록 조회
            touristSpotCountList: [],

            // 연도별 분기별 관광지 관광객 수 목록
            touristQuarterCountList: [],

            // 연도별 관광지 관광객 수 목록
            touristCountList: [],

            // 연도별 방문객 체류시간, 숙박일수 목록
            touristStayTimeAndDayList: [],

            // 연도별 시군구 방문객 유입 수 목록
            touristInflowBySignguList: [],

            // 연도별 내비게이션 인기 관광지 검색량 목록
            touristNavSearchList: [],

            //연도별 소비 유형 목록
            // touristConsumeTypeList: [],

            // 연도별 소비 유형 금액 목록
            // touristConsumeTypeAmountList: [],

            // 연도별 소비 유형 차트 데이터
            touristConsumeTypeChartData: {},

            // 월별 업종별 소비 금액 목록
            touristConsumeAmountList: [],

            headers: [
                {
                    text: "순위",
                    value: "rank",
                },
                {
                    text: "목적지명",
                    value: "trrsrt_nm",
                },
                {
                    text: "목적지 검색량",
                    value: "search_present",
                },
                {
                    text: "전년도 검색량",
                    value: "search_before",
                },
                {
                    text: "증감률(%)",
                    value: "search_increase",
                },
            ],

            scrollState: true,
        };
    },
    methods: {
        // 연도 변경 시 해당 연도 차트 데이터 조회
        yearChange: function () {
            const vm = this;

            vm.touristSpotCountSelectList(); // 연도별 관광지별 입장 수 목록 조회
            // vm.touristCountSelectList(); // 연도별 관광지 관광객 수 목록 조회
            // vm.touristStayTimeAndDaySelectList(); // 연도별 방문객 체류시간, 숙박일수 목록 조회
            vm.touristInflowBySignguSelectList(); // 연도별 시군구 방문객 유입 수 목록 조회
            vm.touristNavSearchSelectList(); // 연도별 내비게이션 인기 관광지 검색량 목록 조회
            vm.touristConsumeTypeChartDataSelectList(); // 연도별 소비 유형 차트 데이터 목록 조회
            vm.touristConsumeAmountSelectList(); // 월별 업종별 소비 금액 목록 조회
        },

        // 연도별 관광지별 입장 수 목록 조회
        touristSpotCountSelectList: function () {
            const vm = this;
            axios({
                url: "/touristSpot/touristSpotCountSelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {
                    year: vm.year,
                },
            })
                .then(function (response) {
                    // console.log("touristSpotCountSelectList - response : ", response.data);
                    vm.touristSpotCountList = response.data;
                })
                .catch(function (error) {
                    console.log("touristSpotCountSelectList - error : ", error);
                    alert("연도별 관광지별 입장 수 목록 조회 오류");
                });
        },

        // 연도별 분기별 관광지 관광객 수 목록 조회
        touristQuarterCountSelectList: function () {
            const vm = this;
            axios({
                url: "/touristSpot/touristQuarterCountSelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {
                    year: vm.year,
                },
            })
                .then(function (response) {
                    // console.log("touristQuarterCountSelectList - response : ", response.data);
                    vm.touristQuarterCountList = response.data;
                })
                .catch(function (error) {
                    console.log("touristQuarterCountSelectList - error : ", error);
                    alert("연도별 분기별 관광지 관광객 수 목록 조회 오류");
                });
        },

        // 연도별 관광지 관광객 수 목록 조회
        touristCountSelectList: function () {
            const vm = this;
            axios({
                url: "/touristSpot/touristCountSelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {},
            })
                .then(function (response) {
                    // console.log("touristCountSelectList - response : ", response.data);
                    vm.touristCountList = response.data;
                })
                .catch(function (error) {
                    console.log("touristCountSelectList - error : ", error);
                    alert("연도별 관광지 관광객 수 목록 조회 오류");
                });
        },

        // 연도별 방문객 체류시간, 숙박일수 목록 조회
        touristStayTimeAndDaySelectList: function () {
            const vm = this;
            axios({
                url: "/touristSpot/touristStayTimeAndDaySelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {},
            })
                .then(function (response) {
                    // console.log("touristStayTimeAndDaySelectList - response : ", response.data);
                    vm.touristStayTimeAndDayList = response.data;
                })
                .catch(function (error) {
                    console.log("touristStayTimeAndDaySelectList - error : ", error);
                    alert("연도별 방문객 체류시간, 숙박일수 목록 조회 오류");
                });
        },

        // 연도별 시군구 방문객 유입 수 목록 조회
        touristInflowBySignguSelectList: function () {
            const vm = this;
            axios({
                url: "/touristSpot/touristInflowBySignguSelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {
                    year: vm.year,
                },
            })
                .then(function (response) {
                    // console.log("touristInflowBySignguSelectList - response : ", response.data);
                    vm.touristInflowBySignguList = response.data;
                })
                .catch(function (error) {
                    console.log("touristInflowBySignguSelectList - error : ", error);
                    alert("연도별 방문객 체류시간, 숙박일수 목록 조회 오류");
                });
        },

        // 연도별 내비게이션 인기 관광지 검색량 목록 조회
        touristNavSearchSelectList: function () {
            const vm = this;
            axios({
                url: "/touristSpot/touristNavSearchSelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {
                    year: vm.year,
                },
            })
                .then(function (response) {
                    // console.log("touristNavSearchSelectList - response : ", response.data);
                    vm.touristNavSearchList = response.data;
                })
                .catch(function (error) {
                    console.log("touristNavSearchSelectList - error : ", error);
                    alert("연도별 내비게이션 인기 관광지 검색량 목록 조회 오류");
                });
        },

        // 연도별 소비 유형 목록 조회
        /* touristConsumeTypeSelectList: function () {
                    const vm = this;
                    axios({
                        url: '/touristSpot/touristConsumeTypeSelectList.json',
                        method: 'post',
                        headers: {
                            'Content-Type': "application/json; charset=UTF-8",
                        },
                        data: {
                            year: 2022 // selectbox로 선택한 연도로 바꾸기
                        }
                    }).then(function (response) {
                        console.log("touristConsumeTypeSelectList - response : ", response.data);
                        vm.touristConsumeTypeList = response.data;
                    }).catch(function (error) {
                        console.log("touristConsumeTypeSelectList - error : ", error);
                        alert('연도별 소비 유형 목록 조회 오류');
                    });
                }, */

        // 연도별 소비 유형 금액 목록 조회
        /* touristConsumeTypeAmountSelectList: function () {
                    const vm = this;
                    axios({
                        url: '/touristSpot/touristConsumeTypeAmountSelectList.json',
                        method: 'post',
                        headers: {
                            'Content-Type': "application/json; charset=UTF-8",
                        },
                        data: {
                            year: 2022 // selectbox로 선택한 연도로 바꾸기
                        }
                    }).then(function (response) {
                        // console.log("touristConsumeTypeAmountSelectList - response : ", response.data);
                        vm.touristConsumeTypeAmountList = response.data;
                    }).catch(function (error) {
                        console.log("touristConsumeTypeAmountSelectList - error : ", error);
                        alert('연도별 소비 유형 금액 목록 조회 오류');
                    });
                }, */

        // 연도별 소비 유형 차트 데이터 목록 조회
        touristConsumeTypeChartDataSelectList: function () {
            const vm = this;
            axios({
                url: "/touristSpot/touristConsumeTypeChartDataSelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {
                    year: vm.year, // selectbox로 선택한 연도로 바꾸기
                },
            })
                .then(function (response) {
                    // console.log("touristConsumeTypeChartDataSelectList - response : ", response.data);
                    vm.touristConsumeTypeChartData = response.data;
                })
                .catch(function (error) {
                    console.log(
                        "touristConsumeTypeChartDataSelectList - error : ",
                        error
                    );
                    alert("연도별 소비 유형 차트 데이터 목록 조회 오류");
                });
        },

        // 월별 업종별 소비 금액 목록 조회
        touristConsumeAmountSelectList: function () {
            const vm = this;
            axios({
                url: "/touristSpot/touristConsumeAmountSelectList.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {
                    year: vm.year,
                },
            })
                .then(function (response) {
                    // console.log("touristConsumeAmountSelectList - response : ", response.data);
                    vm.touristConsumeAmountList = response.data;
                })
                .catch(function (error) {
                    console.log("touristConsumeAmountSelectList - error : ", error);
                    alert("연도별 업종별 소비 금액 목록 조회 오류");
                });
        },
    },
    watch: {
        year: function (newValue, oldValue) {
            // console.log("year watch: ", newValue, oldValue);
            this.yearChange();
        },
    },
    computed: {},
    components: {
        TouristVisual: TouristVisual,
        Chart01: Chart01,
        Chart02: Chart02,
        Chart03: Chart03,
        Chart04: Chart04,
        Table: Table,
        ChartMap: ChartMap,
        ChartRow01: ChartRow01,
        Charthierarchy: Charthierarchy,
        Quarter: Quarter,
    },
    mounted() {
        // console.log("main mounted");
        this.touristSpotCountSelectList();
        this.touristQuarterCountSelectList();
        this.touristCountSelectList();
        this.touristStayTimeAndDaySelectList();
        this.touristInflowBySignguSelectList();
        this.touristNavSearchSelectList();
        // this.touristConsumeTypeSelectList();
        // this.touristConsumeTypeAmountSelectList();
        this.touristConsumeTypeChartDataSelectList();
        this.touristConsumeAmountSelectList();
    },
};
</script>
<style scoped>

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

.content-wrap {
    display: grid;
    gap: 4rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.4fr 0.4fr 0.5fr;
    margin-bottom: 3rem;
}

.content-wrap2 {
    display: grid;
    gap: 4rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.5fr 1fr;
}

.sub_detail table {
    border-bottom: 1px solid #eee;
    display: block;
    border-top: 1px solid #eee;
}

.sub_detail table tr td {
    height: 45px;
    padding: 10px;
    font-size: 1.4rem;
}

.sub_detail table tr td:first-child {
    text-align: center;
    width: 140px;
    border-right: 1px solid #eee;
    padding: 0 40px;
    font-size: 1.4rem;
}

.sub_detail_padding {
    padding: 0px 2rem 2rem 2rem;
}

.sub_title {
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

.sub_title>div.select_wrap2 {
    font-weight: 500;
    font-size: 16px;
    display: inline-block;
}

.width {
    width: 194.39px;
}


.sub_title h4 {
    font-size: 2.4rem;
    padding-right: 2rem;
}

h5 {
    width: 100%;
    padding-bottom: 4px;
    font-size: 23px;
    font-weight: 600;
    position: relative;
}

h6 {
    font-size: 1.8rem;
}

.subtitle img {
    width: 1.2rem;
}

.subtitle {
    margin: 3rem 0 1rem 0;
}

.sub_title h4 {
    font-size: 2.4rem;
    display: flex;
    align-items: center;
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
    background: #337ab7;
    display: table;
    padding-left: 20px;
}

.top h2 {
    display: table-cell;
    vertical-align: middle;
    position: relative;
    font-size: 22px;
    color: #fff;
}

.left {
    position: absolute;
    z-index: 10;
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
    height: 100%;
    width: 85rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 12px 24px 0px rgba(0, 0, 0, 0.16);
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

.consumption_type {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 2rem;
}

.consumption_text1 {
    text-align: center;
    font-weight: 400;
    font-size: 1.8rem;
}

.consumption_text2 {
    text-align: center;
    font-weight: 400;
    font-size: 1.6rem;
}

.consumption_text3 {
    text-align: center;
    font-weight: 400;
    font-size: 1.5rem;
}

.consumption_text4 {
    text-align: center;
    font-weight: 400;
    font-size: 1.4rem;
}

.consumption_text5 {
    text-align: center;
    font-weight: 400;
    font-size: 1.3rem;
}

.consumption_text6 {
    text-align: center;
    font-weight: 400;
    font-size: 1.2rem;
}

.paytext {}

h4 {
    color: #42547f;
}

.sub_info {
    font-family: GmarketSansLight;
    text-align: left;
    font-size: 1.4rem;
    font-weight: bold;
}
</style>
