<template>
    <JobVisual ref="TouristVisual" :touristCountList="touristCountList"
        :touristStayTimeAndDayList="touristStayTimeAndDayList" />
    <main>
        <!-- <h3 class="main_title">
            <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />영천시
            연령별 일자리 및 사업체 현황 분석
        </h3> -->
        <div class="content-wrap">
            <div class="content-box combine-top">
                <div>
                    <div class="sub_title">
                        <h4>
                            <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />생산가능인구 전출입 현황
                        </h4>
                        <p class="sub_info">*생산가능 인구: 15세~64세</p>
                    </div>
                    <div class="select_wrap3" style="display:flex; justify-content:space-between">
                        <label style="margin-left: 1rem; color: blueviolet">*순이동 추이를 조회하고 싶은 연령대를 클릭해 주세요</label>
                        <div>
                            <label for="year_02" class="yearselect">조회연도</label>
                            <select id="year_02" v-model="year" @change="yearChange">
                                <option v-for="(item, idx) in yearList" :value="item">
                                    {{ item }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <!-- <div style="display:flex; justify-content:space-between; margin-top: 1rem; margin-bottom: 1rem;">
                        <p class="sub_info" style="padding-left: 1rem;">출처: 공공데이터포털</p>
                        <p class="sub_info" style="padding-right: 1rem;">단위: 명</p>
                    </div> -->
                    <div style="margin: 1rem 0 1rem 0">
                        <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 공공데이터포털</p>
                        <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 명</p>
                    </div>
                    <div class="sub_detail">
                        <div style="height: 48rem">
                            <J_Chart01 ref="J_Chart01" @selectAgeIndex="ageIndexChange" :chartDataName="
                                chartDataName.find(
                                    (e) => e.name === 'jobPopulationMoveAgeList'
                                )
                            " :chartData="jobPopulationMoveAgeList" :year="year" />
                        </div>
                        <table class="inouttable">
                            <thead>
                                <tr>
                                    <th rowspan="2">구분</th>
                                    <th class="th-age-section" v-for="(item, idx) in ageSectionList" :key="idx">{{ item }}</th>
                                </tr>
                                <tr>
                                    <th v-for="(item, idx) in ageSectionList" :key="idx">
                                        <div style="display: flex; justify-content: space-around;">
                                            <div>전입</div>
                                            <div>전출</div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>조회연도</td>
                                    <td class="age-section-division" v-for="(item, idx) in yearCompareList['now']" :key="idx">
                                        <!-- <td>
                                            {{ $filters.comma(item['tot_trnsfrn']) }}  
                                        </td>
                                        <td>
                                            {{ $filters.comma(item['tot_mvt']) }}
                                        </td> -->
                                        <div style="display: flex; justify-content: space-around;">
                                            <div>{{ $filters.comma(item['tot_trnsfrn']) }}</div>
                                            <div>{{ $filters.comma(item['tot_mvt']) }}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>이전연도</td>
                                    <td class="age-section-division" v-for="(item, idx) in yearCompareList['before']" :key="idx">
                                        <!-- <td>
                                            {{ $filters.comma(item['tot_trnsfrn']) }}  
                                        </td>
                                        <td>
                                            {{ $filters.comma(item['tot_mvt']) }}
                                        </td> -->
                                        <div style="display: flex; justify-content: space-around;">
                                            <div>{{ $filters.comma(item['tot_trnsfrn']) }}</div>
                                            <div>{{ $filters.comma(item['tot_mvt']) }}</div>
                                        </div>
                                    </td>
                                    <td colspan="12" v-show="yearCompareList['before'].length == 0">이전연도 데이터가 없습니다</td>
                                </tr>
                                <tr>
                                    <td>전년대비 증감률(%)</td>
                                    <td class="age-section-division" v-for="(item, idx) in yearCompareList['compare']" :key="idx">
                                        <!-- <td :style="{'color': compareColor(item['trnsfrn'])}">
                                            {{ item['trnsfrn'] }}  
                                        </td>
                                        <td :style="{'color': compareColor(item['mvt'])}">
                                            {{ item['mvt'] }}
                                        </td> -->
                                        <div style="display: flex; justify-content: space-around;">
                                            <div :style="{'color': compareColor(item['trnsfrn'])}">{{ item['trnsfrn'] }}</div>
                                            <div :style="{'color': compareColor(item['mvt'])}">{{ item['mvt'] }}</div>
                                        </div>
                                    </td>
                                    <td colspan="12" v-show="yearCompareList['before'].length == 0">이전연도 데이터가 없습니다</td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- <table class="inouttable">
                            <thead>
                                <tr>
                                    <th rowspan="2" colspan="2">구분</th>
                                    <th class="th-age-section" v-for="(item, idx) in ageSectionList" :key="idx">{{ item }}</th>
                                </tr>
                                <tr>
                                    <th v-for="(item, idx) in ageSectionList" :key="idx">
                                        <div style="display: flex; justify-content: space-around;">
                                            <div>전입</div>
                                            <div>전출</div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan="2">조회연도</td>
                                    <td>인구 수</td>
                                    <td class="age-section-division" v-for="(item, idx) in yearCompareList['now']" :key="idx">
                                        <div style="display: flex; justify-content: space-around;">
                                            <div>{{ $filters.comma(item['tot_trnsfrn']) }}</div>
                                            <div>{{ $filters.comma(item['tot_mvt']) }}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>순이동</td>
                                    <td class="age-section-division" v-for="(item, idx) in yearCompareList['now']" :key="idx">
                                        {{ $filters.comma(item['purity_mvmn']) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td rowspan="2">이전연도</td>
                                    <td>인구 수</td>
                                    <td class="age-section-division" v-for="(item, idx) in yearCompareList['before']" :key="idx">
                                        <div style="display: flex; justify-content: space-around;">
                                            <div>{{ $filters.comma(item['tot_trnsfrn']) }}</div>
                                            <div>{{ $filters.comma(item['tot_mvt']) }}</div>
                                        </div>
                                    </td>
                                    <td colspan="12" v-show="yearCompareList['before'].length == 0">이전연도 데이터가 없습니다</td>
                                </tr>
                                <tr>
                                    <td>순이동</td>
                                    <td class="age-section-division" v-for="(item, idx) in yearCompareList['before']" :key="idx">
                                        {{ $filters.comma(item['purity_mvmn']) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">전년대비 증감률(%)</td>
                                    <td class="age-section-division" v-for="(item, idx) in yearCompareList['compare']" :key="idx">
                                        <div style="display: flex; justify-content: space-around;">
                                            <div :style="{'color': compareColor(item['trnsfrn'])}">{{ item['trnsfrn'] }}</div>
                                            <div :style="{'color': compareColor(item['mvt'])}">{{ item['mvt'] }}</div>
                                        </div>
                                    </td>
                                    <td colspan="12" v-show="yearCompareList['before'].length == 0">이전연도 데이터가 없습니다</td>
                                </tr>
                            </tbody>
                        </table> -->
                    </div>
                </div>
            </div>
            <div class="content-box combine-middle">
                <div class="sub_title">
                    <h4>
                        <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />
                        <span style="color: blueviolet; padding-right: 5px">
                            {{ ageGroup }} - {{ ageSectionList[ageIndex] }} </span>순이동 추이
                    </h4>
                    <p class="sub_info">*순이동 = 전입-전출</p>
                </div>
                <!-- <div style="display:flex; justify-content:space-between; margin-bottom: 1rem;">
                    <p class="sub_info" style="padding-left: 1rem;">출처: 공공데이터포털</p>
                    <p class="sub_info" style="padding-right: 1rem;">단위: 명</p>
                </div> -->
                <div style="margin-bottom: 1rem;">
                    <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 공공데이터포털</p>
                    <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 명</p>
                </div>
                <div class="sub_detail"></div>
                <div style="height: 50rem">
                    <J_Chart02 ref="J_Chart02" :chartDataName="
                        chartDataName.find((e) => e.name === 'jobPopulationMoveAgeList')
                    " :chartData="jobPopulationMoveAgeList" :year="year" :ageIndex="ageIndex" />
                </div>
            </div>
            <div class="content-box combine-left combine-row3">
                <div class="sub_title">
                    <h4>
                        <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />
                        직종별 구인 현황
                    </h4>
                </div>
                <!-- <div style="display:flex; justify-content:space-between; margin-bottom: 1rem;">
                    <p class="sub_info" style="padding-left: 1rem;">출처: 워크넷</p>
                    <p class="sub_info" style="padding-right: 1rem;">단위: 명</p>
                </div> -->
                <div>
                    <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 워크넷</p>
                    <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 명</p>
                </div>
                <div class="sub_detail">
                    <div style="height: 50rem">
                        <J_Chart03 ref="J_Chart03" :chartDataName="
                            chartDataName.find((e) => e.name === 'jobOfferList')
                        " :chartData="jobOfferList" />
                    </div>
                </div>
            </div>
            <div class="content-box combine-right combine-row3">
                <div class="sub_title">
                    <h4>
                        <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />
                        <span style="color: blueviolet; padding-top: 5px; padding-right: 5px">
                            {{ ageSectionList[ageIndex] }}
                        </span>
                        구직 희망 주요 업종
                    </h4>
                </div>
                <!-- <div style="display:flex; justify-content:space-between; margin-bottom: 1rem;">
                    <p class="sub_info" style="padding-left: 1rem;">출처: 워크넷</p>
                    <p class="sub_info" style="padding-right: 1rem;">단위: 명</p>
                </div> -->
                <div>
                    <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 워크넷</p>
                    <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 명</p>
                </div>
                <div class="sub_detail">
                    <div style="height: 50rem">
                        <J_Chart04 ref="J_Chart04" :chartDataName="
                            chartDataName.find((e) => e.name === 'jobSearchList')
                        " :chartData="jobSearchList" :ageIndex="ageIndex" />
                    </div>
                </div>
            </div>
            <div class="content-box combine-row4 combine-all">
                <div class="sub_title">
                    <h4>
                        <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />영천시 주요 사업체
                    </h4>
                    <p class="sub_info" style="display: inline; padding-left: 1rem;">*상위 10개 산업</p>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom: 1rem;">
                    <div>
                        <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 통계청</p>
                        <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 백만원</p>
                    </div>
                    <div>
                        <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 경상북도청</p>
                        <p class="sub_info" style="display:inline; padding-left: 5rem;">단위: 명</p>
                    </div>
                </div>
                <div class="sub_detail">
                    <div class="left_title">
                        <!-- 경제활동별 지역내총생산(GRDP) -->
                        <h4 style="display: inline">경제활동별 지역내총생산(GRDP)</h4>
                        <p class="sub_info" style="display: inline"> ({{ this.yearGRDP }}년)</p>
                    </div>
                    <div class="right_title">
                        <span style="font-weight: bold; color: blueviolet; padding-top: 5px; padding-right: 5px">{{
                            this.typeLargeName
                        }}</span>
                        <!-- 세부 업종별 종사자 비율 -->
                        <h4 style="display: inline">세부 업종별 종사자 비율</h4>
                        <p class="sub_info" style="display: inline"> ({{ this.yearGRDP }}년)</p>
                    </div>

                    <div style="height: 55rem">
                        <J_Chart05 ref="J_Chart05" @selectTypeLargeCode="typeLargeCodeChange"
                            @selectTypeMediumCode="typeMediumCodeChange" :chartDataName="
                                chartDataName.find(
                                    (e) => e.name === 'jobGRDPAndMediumWorkerList'
                                )
                            " :chartData="jobGRDPAndMediumWorkerList" :year="year" />
                    </div>
                </div>
            </div>
            <div class="content-box combine-left combine-row5">
                <div class="sub_title">
                    <h4>
                        <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />
                        <span style="color: blueviolet; padding-top: 5px; padding-right: 5px">{{ this.typeLargeName
                        }}</span>
                        사업체 및 종사자 수
                    </h4>
                    <p class="sub_info"></p>
                </div>
                <!-- <div style="display:flex; justify-content:space-between; margin-bottom: 1rem;">
                    <p class="sub_info" style="padding-left: 1rem;">출처: 경상북도청</p>
                    <p class="sub_info" style="padding-right: 1rem;">사업체 단위: 개, 종사자 단위: 명</p>
                </div> -->
                <div style="margin-bottom: 1rem;">
                    <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 경상북도청</p>
                    <p class="sub_info" style="display:inline; padding-left: 5rem;">사업체 단위: 개, 종사자 단위: 명</p>
                </div>
                <div class="sub_detail">
                    <div style="height: 50rem">
                        <J_Chart06 ref="J_Chart06" :chartDataName="
                            chartDataName.find(
                                (e) => e.name === 'jobLargeCompanyAndWorkerCountList'
                            )
                        " :chartData="jobLargeCompanyAndWorkerCountList" :year="year" :typeCode="typeLargeCode" />
                    </div>
                </div>
            </div>
            <div class="content-box combine-right combine-row5">
                <div class="sub_title">
                    <h4>
                        <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />
                        <span style="color: blueviolet; padding-right: 5px">{{ this.typeMediumName
                        }}</span>
                        사업체 및 종사자 수
                    </h4>
                    <p class="sub_info"></p>
                </div>
                <!-- <div style="display:flex; justify-content:space-between; margin-bottom: 1rem;">
                    <p class="sub_info" style="padding-left: 1rem;">출처: 경상북도청</p>
                    <p class="sub_info" style="padding-right: 1rem;">사업체 단위: 개, 종사자 단위: 명</p>
                </div> -->
                <div style="margin-bottom: 1rem;">
                    <p class="sub_info" style="display:inline; padding-left: 1rem;">출처: 경상북도청</p>
                    <p class="sub_info" style="display:inline; padding-left: 5rem;">사업체 단위: 개, 종사자 단위: 명</p>
                </div>
                <div class="sub_detail">
                    <div style="height: 50rem">
                        <J_Chart07 ref="J_Chart07" :chartDataName="
                            chartDataName.find(
                                (e) => e.name === 'jobMediumCompanyAndWorkerCountList'
                            )
                        " :chartData="jobMediumCompanyAndWorkerCountList" :year="year" :typeCode="typeMediumCode" />
                    </div>
                </div>
            </div>
        </div>
        <!-- <h3>
            <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />분석 모델
        </h3>
        <div class="content-wrap2">
            <div class="content-box combine-left2 combine-row">
                <div>
                    <div class="sub_title">
                        <h4>
                            <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />영천시 읍면동 청년인구 유인 분석
                        </h4>
                    </div>
                    <div>
                        <div class="select_wrap3">
                            <label for="year_02" class="yearselect">조회연도</label>
                            <select id="year_02" v-model="year" @change="yearChange">
                                <option v-for="(item, idx) in yearList" :value="item">
                                    {{ item }}
                                </option>
                            </select>
                        </div>
                        <Table :headers="headers" :items="touristNavSearchList" :scrollState="scrollState" />
                    </div>
                </div>
            </div>
            <div class="content-box combine-right combine-row">
                <div class="sub_title">
                    <h4>
                        <img src="../../../resources/images/icon/yc_logo_icon.svg" alt="" />영천시 관광소비 유형
                    </h4>
                </div>
                <div class="select_wrap3">
                    <label for="year_02" class="yearselect">조회연도</label>
                    <select id="year_02" v-model="year" @change="yearChange">
                        <option v-for="(item, idx) in yearList" :value="item">
                            {{ item }}
                        </option>
                    </select>
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

        </div> -->
    </main>
</template>

<script>
import axios from "axios";

import COMMON_UTIL from "../../../resources/js/commonUtil.js";

import JobVisual from "../Youthjobs/JobVisual.vue";
import J_Chart01 from "./J_Chart01.vue";
import J_Chart02 from "./J_Chart02.vue";
import J_Chart03 from "./J_Chart03.vue";
import J_Chart04 from "./J_Chart04.vue";
import J_Chart05 from "./J_Chart05.vue";
import J_Chart06 from "./J_Chart06.vue";
import J_Chart07 from "./J_Chart07.vue";

export default {
    data() {
        return {
            // 현재 선택 연도
            year: 2022,

            // 연도 목록
            yearList: [2022, 2021, 2020, 2019, 2018, 2017],

            // 사업체 연도 선택
            yearGRDP: 2020,

            // 현재 선택 연령 index
            ageIndex: 1,

            // 현재 선택 연령 그룹
            ageGroup: null,

            // 연령 5세별 목록
            ageSectionList: [
                "19세이하",
                "20~24세",
                "25~29세",
                "30~34세",
                "35~39세",
                "40~44세",
                "45~49세",
                "50~54세",
                "55~59세",
                "60~64세",
                "65세이상",
            ],

            // 연령 그룹 목록
            ageGroupList: ["청소년", "청년", "장년", "노년"],

            // 현재 선택 대분류 코드
            typeLargeCode: "C",

            // 현재 선택 중분류 코드
            typeMediumCode: "30",

            // 현재 선택 대분류 이름
            typeLargeName: null,

            // 현재 선택 중분류 이름
            typeMediumName: null,

            // 한국표준산업분류코드 대분류 목록
            jobIndustryCodeLargeList: [],

            // 한국표준산업분류코드 중분류 목록
            jobIndustryCodeMediumList: [],

            // 인구 전출입 전년도 비교 목록
            yearCompareList: {
                now: [],
                before: [],
                compare: [],
            },

            // 차트 데이터 이름 목록
            chartDataName: [
                { name: "jobPopulationMoveAgeList" },
                { name: "jobOfferList" },
                { name: "jobSearchList" },
                { name: "jobGRDPAndMediumWorkerList" },
                { name: "jobLargeCompanyAndWorkerCountList" },
                { name: "jobMediumCompanyAndWorkerCountList" },
            ],

            // 연령 별 인구 이동 목록
            jobPopulationMoveAgeList: [],

            // 구인 목록
            jobOfferList: [],

            // 구직 목록
            jobSearchList: [],

            // GRDP 및 중분류 종사자 목록
            jobGRDPAndMediumWorkerList: [],

            // 산업 대분류 사업체, 종사자 수 목록
            jobLargeCompanyAndWorkerCountList: [],

            // 산업 중분류 사업체, 종사자 수 목록
            jobMediumCompanyAndWorkerCountList: [],
        };
    },
    methods: {
        // 선택 연도의 사업체 연도 매칭
        yearMatch: function () {
            if (this.year > 2020) {
                this.yearGRDP = 2020;
            } else if (this.year < 2019) {
                this.yearGRDP = 2019;
            } else {
                this.yearGRDP = this.year;
            }
        },

        // 선택 연령의 연령 그룹 매칭
        ageSectionGroup: function () {
            if (this.ageIndex == 0) {
                this.ageGroup = this.ageGroupList[0];
            } else if (this.ageIndex > 0 && this.ageIndex <= 3) {
                this.ageGroup = this.ageGroupList[1];
            } else if (this.ageIndex > 3 && this.ageIndex <= 9) {
                this.ageGroup = this.ageGroupList[2];
            } else if (this.ageIndex > 9) {
                this.ageGroup = this.ageGroupList[3];
            }
        },

        // 선택 대분류 코드의 분류 이름 매칭
        typeLargeCodeName: function () {
            for (let i = 0; i < this.jobIndustryCodeLargeList.length; i++) {
                if (
                    this.typeLargeCode == this.jobIndustryCodeLargeList[i]["lclas_code"]
                ) {
                    this.typeLargeName = this.jobIndustryCodeLargeList[i]["lclas_nm"];
                }
            }
        },

        // 선택 중분류 코드의 분류 이름 매칭
        typeMediumCodeName: function () {
            for (let i = 0; i < this.jobIndustryCodeMediumList.length; i++) {
                if (
                    this.typeMediumCode == this.jobIndustryCodeMediumList[i]["mlsfc_code"]
                ) {
                    this.typeMediumName = this.jobIndustryCodeMediumList[i]["mlsfc_nm"];
                }
            }
        },

        // 연령 선택 시 해당 연령 순이동 차트 데이터 조회(props 전달)
        ageIndexChange: function (index) {
            this.ageIndex = index;
            this.ageSectionGroup();
        },

        // 산업 대분류 선택 시 해당 산업 차트 데이터 조회(props 전달)
        typeLargeCodeChange: function (code) {
            this.typeLargeCode = code;
            this.typeLargeCodeName();
        },

        // 산업 중분류 선택 시 해당 산업 차트 데이터 조회(props 전달)
        typeMediumCodeChange: function (code) {
            this.typeMediumCode = code;
            this.typeMediumCodeName();
        },

        // 인구 전출입 전년도 비교
        yearCompare: function () {
            this.yearCompareList = {
                now: [],
                before: [],
                compare: [],
            };

            // 이번년도, 전년도 전출 배열
            for (let i = 0; i < this.jobPopulationMoveAgeList.length; i++) {
                if (this.year == this.jobPopulationMoveAgeList[i]['pnttm']) {
                    this.yearCompareList['now'].push(this.jobPopulationMoveAgeList[i]);
                } else if ((this.year - 1) == this.jobPopulationMoveAgeList[i]['pnttm']) {
                    this.yearCompareList['before'].push(this.jobPopulationMoveAgeList[i]);
                }
            }

            // 전년대비 전출 증감률 배열
            if (this.yearCompareList['before'].length > 0) {
                for (let i = 0; i < this.yearCompareList['now'].length; i++) {
                    // this.yearCompareList['in'][i] = [(this.yearCompareList['now'][i]['tot_trnsfrn'] - this.yearCompareList['before'][i]['tot_trnsfrn']) / this.yearCompareList['before'][i]['tot_trnsfrn']] * 100
                    // this.yearCompareList['compare'][i] = (((this.yearCompareList['now'][i]['tot_mvt'] - this.yearCompareList['before'][i]['tot_mvt']) / this.yearCompareList['before'][i]['tot_mvt']) * 100).toFixed(2);

                    let trnsfrn = (((this.yearCompareList['now'][i]['tot_trnsfrn'] - this.yearCompareList['before'][i]['tot_trnsfrn']) / this.yearCompareList['before'][i]['tot_trnsfrn']) * 100).toFixed(2);
                    let mvt = (((this.yearCompareList['now'][i]['tot_mvt'] - this.yearCompareList['before'][i]['tot_mvt']) / this.yearCompareList['before'][i]['tot_mvt']) * 100).toFixed(2);
                    this.yearCompareList['compare'].push({'trnsfrn': trnsfrn, 'mvt': mvt});
                }
            }

            // console.log('yearCompareList: ', this.yearCompareList);
        },

        // 증감률 색상
        compareColor: function (item) {
            // console.log('item: ', item);
            if (item > 0) {
                return 'blue';
            } else {
                return 'crimson';
            }
        },

        // 청년 일자리 시각화 관련 전체 데이터 목록 조회
        youthJobSelectAll: function () {
            const vm = this;
            axios({
                url: "/youthJob/youthJobSelectAll.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: {
                    year: vm.year,
                },
            })
                .then(function (response) {
                    // console.log("youthJobSelectAll - response : ", response.data);
                    vm.jobPopulationMoveAgeList = response.data.jobPopulationMoveAgeList;
                    vm.jobOfferList = response.data.jobOfferList;
                    vm.jobSearchList = response.data.jobSearchList;
                    vm.jobGRDPAndMediumWorkerList =
                        response.data.jobGRDPAndMediumWorkerList;
                    vm.jobIndustryCodeLargeList = response.data.jobIndustryCodeLargeList;
                    vm.jobIndustryCodeMediumList =
                        response.data.jobIndustryCodeMediumList;
                    vm.jobLargeCompanyAndWorkerCountList =
                        response.data.jobLargeCompanyAndWorkerCountList;
                    vm.jobMediumCompanyAndWorkerCountList =
                        response.data.jobMediumCompanyAndWorkerCountList;
                })
                .catch(function (error) {
                    console.log("youthJobSelectAll - error : ", error);
                    alert("청년 일자리 시각화 관련 전체 데이터 목록 조회 오류");
                });
        },
    },
    watch: {
        year: function (newValue, oldValue) {
            // console.log("year watch: ", newValue, oldValue);
            this.yearCompare();
            this.yearMatch();
        },

        jobPopulationMoveAgeList: function (newValue, oldValue) {
            // console.log("jobPopulationMoveAgeList: ", newValue);
            this.yearCompare();
        },

        jobIndustryCodeLargeList: function (newValue, oldValue) {
            this.typeLargeCodeName();
        },

        jobIndustryCodeMediumList: function (newValue, oldValue) {
            this.typeMediumCodeName();
        },
    },
    computed: {},
    components: {
        JobVisual: JobVisual,
        J_Chart01: J_Chart01,
        J_Chart02: J_Chart02,
        J_Chart03: J_Chart03,
        J_Chart04: J_Chart04,
        J_Chart05: J_Chart05,
        J_Chart06: J_Chart06,
        J_Chart07: J_Chart07,
    },
    mounted() {
        this.ageSectionGroup();
        this.youthJobSelectAll();
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

.main_title h3 {
    font-family: GmarketSansBold;
    font-size: 2.8rem;
}

.content-wrap {
    display: grid;
    gap: 4rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.5fr 0.5fr 0.5fr;
    margin-bottom: 3rem;
}

.content-wrap2 {
    display: grid;
    gap: 4rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.5fr;
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

/* 전출 테이블 */

.inouttable {
    width: 100%;
    height: 100%;
    font-size: 1.4rem;
    border: 0;
    border-spacing: 0px;
    border-collapse: collapse;
}

.inouttable thead {
    background: #3088d3;
    color: #ffffff;
}

.inouttable thead th {
    padding: 1rem;
}

.th-age-section {
    width: calc(90% / 11);
}

.age-section-division {
    border-left: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
}
/* .inouttable thead th td{width: 50%;} */

.inouttable tbody tr:nth-child(even) {
    background: #f8f8f8;
}

.inouttable td {
    text-align: center;
    padding: 0.5rem;
}

.inouttable td td{
    text-align: center;
    padding: 0 0.5rem;
}

/* .inouttable td::after {
    content: "명";
}

.inouttable td:first-child:after {
    content: "";
}

.inouttable tr:last-child td::after {
    content: "";
} */

.left_title {
    position: absolute;
    left: 20.5%;
    font-size: 1.8rem;
}

.right_title {
    position: absolute;
    right: 20.5%;
    font-size: 1.8rem;
}

</style>