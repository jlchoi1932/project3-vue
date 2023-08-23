<template>
    <!-- <div>
        <ul class="flex-around">
            <li class="sub-box">
                <div class="content-title flex-between">
                    <h6 class="flex">1분기</h6>
                    <div class="select_wrap">
                        <label for="year_02">단위:명</label>
                    </div>
                </div>
                <div class="content-text bg-gray">{{$filters.comma(this.currentQuarterData['quarter1'])}} / {{$filters.comma(this.currentQuarterData['quarter1_before'])}}</div>
                <div class="content-title flex-between">
                    <h6 class="flex">작년대비 증감률</h6>
                </div>
                <div class="content-text bg-bluegray" v-show="this.currentQuarterData['quarter1_increase'] >= 0" style="color:blue;">{{this.currentQuarterData['quarter1_increase']}} %</div>
                <div class="content-text bg-bluegray" v-show="this.currentQuarterData['quarter1_increase'] < 0" style="color:crimson;">{{this.currentQuarterData['quarter1_increase']}} %</div>
            </li>
            <li class="sub-box">
                <div class="content-title flex-between">
                    <h6 class="flex">2분기</h6>
                    <div class="select_wrap">
                        <label for="year_02">단위:명</label>
                    </div>
                </div>
                <div class="content-text bg-gray">{{$filters.comma(this.currentQuarterData['quarter2'])}} / {{$filters.comma(this.currentQuarterData['quarter2_before'])}}</div>
                <div class="content-title flex-between">
                    <h6 class="flex">작년대비 증감률</h6>
                </div>
                <div class="content-text bg-bluegray" v-show="this.currentQuarterData['quarter2_increase'] >= 0" style="color:blue;">{{this.currentQuarterData['quarter2_increase']}} %</div>
                <div class="content-text bg-bluegray" v-show="this.currentQuarterData['quarter2_increase'] < 0" style="color:crimson;">{{this.currentQuarterData['quarter2_increase']}} %</div>
            </li>
            <li class="sub-box">
                <div class="content-title flex-between">
                    <h6 class="flex">3분기</h6>
                    <div class="select_wrap">
                        <label for="year_02">단위:명</label>
                    </div>
                </div>
                <div class="content-text bg-gray">{{$filters.comma(this.currentQuarterData['quarter3'])}} / {{$filters.comma(this.currentQuarterData['quarter3_before'])}}</div>
                <div class="content-title flex-between">
                    <h6 class="flex">작년대비 증감률</h6>
                </div>
                <div class="content-text bg-bluegray" v-show="this.currentQuarterData['quarter3_increase'] >= 0" style="color:blue;">{{this.currentQuarterData['quarter3_increase']}} %</div>
                <div class="content-text bg-bluegray" v-show="this.currentQuarterData['quarter3_increase'] < 0" style="color:crimson;">{{this.currentQuarterData['quarter3_increase']}} %</div>
            </li>
            <li class="sub-box">
                <div class="content-title flex-between">
                    <h6 class="flex">4분기</h6>
                    <div class="select_wrap">
                        <label for="year_02">단위:명</label>
                    </div>
                </div>
                <div class="content-text bg-gray">{{$filters.comma(this.currentQuarterData['quarter4'])}} / {{$filters.comma(this.currentQuarterData['quarter4_before'])}}</div>
                <div class="content-title flex-between">
                    <h6 class="flex">작년대비 증감률</h6>
                </div>
                <div class="content-text bg-bluegray" v-show="this.currentQuarterData['quarter4_increase'] >= 0" style="color:blue;">{{this.currentQuarterData['quarter4_increase']}} %</div>
                <div class="content-text bg-bluegray" v-show="this.currentQuarterData['quarter4_increase'] < 0" style="color:crimson;">{{this.currentQuarterData['quarter4_increase']}} %</div>
            </li>
        </ul>
    </div> -->
    <div>
        <ul class="flex-between">
            <li class="content-box">
                <div class="content-title flex-between">
                    <h6 class="flex" style="color: #00D8FF;">청소년</h6>
                    <div class="select_wrap">
                        <label for="year_02">단위:가구</label>
                    </div>
                </div>
                <div class="content-text bg-gray">
                    {{ $filters.comma(this.thisYear["sm_minor"]) }} /
                    {{ $filters.comma(this.beforeYear["sm_minor"]) }}
                </div>
                <div class="content-title flex-between">
                    <h6 class="flex">작년대비 증감률</h6>
                </div>
                <div class="content-text bg-lightblue" v-show="this.thisYear['sm_minor_increase'] >= 0" style="color: blue">
                    {{ this.thisYear["sm_minor_increase"] }} %
                </div>
                <div class="content-text bg-lightblue" v-show="this.thisYear['sm_minor_increase'] < 0"
                    style="color: crimson">
                    {{ this.thisYear["sm_minor_increase"] }} %
                </div>
                <div class="content-text bg-lightblue" v-show="this.beforeYear['year'] == null" style="color: blue">
                    전년도 데이터가 없습니다
                </div>
            </li>
            <li class="content-box">
                <div class="content-title flex-between">
                    <h6 class="flex" style="color: #0054FF;">청년</h6>
                    <div class="select_wrap">
                        <label for="year_02">단위:가구</label>
                    </div>
                </div>
                <div class="content-text bg-gray">
                    {{ $filters.comma(this.thisYear["sm_youth"]) }} /
                    {{ $filters.comma(this.beforeYear["sm_youth"]) }}
                </div>
                <div class="content-title flex-between">
                    <h6 class="flex">작년대비 증감률</h6>
                </div>
                <div class="content-text bg-lightblue" v-show="this.thisYear['sm_youth_increase'] >= 0" style="color: blue">
                    {{ this.thisYear["sm_youth_increase"] }} %
                </div>
                <div class="content-text bg-lightblue" v-show="this.thisYear['sm_youth_increase'] < 0"
                    style="color: crimson">
                    {{ this.thisYear["sm_youth_increase"] }} %
                </div>
                <div class="content-text bg-lightblue" v-show="this.beforeYear['year'] == null" style="color: blue">
                    전년도 데이터가 없습니다
                </div>
            </li>
            <li class="content-box">
                <div class="content-title flex-between">
                    <h6 class="flex" style="color: #2F9D27;">장년</h6>
                    <div class="select_wrap">
                        <label for="year_02">단위:가구</label>
                    </div>
                </div>
                <div class="content-text bg-gray">
                    {{ $filters.comma(this.thisYear["sm_middle"]) }} /
                    {{ $filters.comma(this.beforeYear["sm_middle"]) }}
                </div>
                <div class="content-title flex-between">
                    <h6 class="flex">작년대비 증감률</h6>
                </div>
                <div class="content-text bg-lightblue" v-show="this.thisYear['sm_middle_increase'] >= 0"
                    style="color: blue">
                    {{ this.thisYear["sm_middle_increase"] }} %
                </div>
                <div class="content-text bg-lightblue" v-show="this.thisYear['sm_middle_increase'] < 0"
                    style="color: crimson">
                    {{ this.thisYear["sm_middle_increase"] }} %
                </div>
                <div class="content-text bg-lightblue" v-show="this.beforeYear['year'] == null" style="color: blue">
                    전년도 데이터가 없습니다
                </div>
            </li>
            <li class="content-box">
                <div class="content-title flex-between">
                    <h6 class="flex" style="color: #E0B94F;">노년</h6>
                    <div class="select_wrap">
                        <label for="year_02">단위:가구</label>
                    </div>
                </div>
                <div class="content-text bg-gray">
                    {{ $filters.comma(this.thisYear["sm_old"]) }} /
                    {{ $filters.comma(this.beforeYear["sm_old"]) }}
                </div>
                <div class="content-title flex-between">
                    <h6 class="flex">작년대비 증감률</h6>
                </div>
                <div class="content-text bg-lightblue" v-show="this.thisYear['sm_old_increase'] >= 0" style="color: blue">
                    {{ this.thisYear["sm_old_increase"] }} %
                </div>
                <div class="content-text bg-lightblue" v-show="this.thisYear['sm_old_increase'] < 0" style="color: crimson">
                    {{ this.thisYear["sm_old_increase"] }} %
                </div>
                <div class="content-text bg-lightblue" v-show="this.beforeYear['year'] == null" style="color: blue">
                    전년도 데이터가 없습니다
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import COMMON_UTIL from "../../resources/js/commonUtil.js";

export default {
    props: {
        quarterData: {
            type: Array,
            default: [],
        },

        year: {
            type: Number,
            default: 2022,
        },
    },

    data() {
        return {
            thisYear: {
                sm_minor: 0,
                sm_youth: 0,
                sm_middle: 0,
                sm_old: 0,
                year: null,
            },

            beforeYear: {
                sm_minor: 0,
                sm_youth: 0,
                sm_middle: 0,
                sm_old: 0,
                year: null,
            },
        };
    },

    methods: {
        currentQuarter: function () {
            for (let i = 0; i < this.quarterData.length; i++) {
                if (this.quarterData.length > 1) {
                    if (this.quarterData[i]["year"] == "this") {
                        this.thisYear = this.quarterData[i];
                    } else {
                        this.beforeYear = this.quarterData[i];
                    }
                } else {
                    this.thisYear = this.quarterData[i];
                }
            }
            // console.log("currentQuarterData: ", this.thisYear, this.beforeYear);
        },
    },
    watch: {
        quarterData: function (newValue, oldValue) {
            // console.log("quarterData1 watch: ", newValue, oldValue);
            this.currentQuarter();
        },

        year: function (newValue, oldValue) {
            // console.log('year watch: ', newValue, oldValue);
            this.currentQuarter();
        },
    },
    computed: {},
    components: {},
    mounted() { },
};
</script>

<style scoped>
.flex-between {
    padding: 8px 4px 8px 4px;
    top: -16%;
    position: relative;
}

.sub-box {
    width: 18rem;
    height: 18rem;
    padding: 2rem;
    margin-bottom: 1rem;
    border: #aaaaaa solid 1px;
    border-radius: 5px;
    display: grid;
}

ul {
    gap: 4rem;
}

ul h6 {
    font-size: 1.8rem;
}

ul label {
    font-size: 1.2rem;
}

ul li {
    width: 24%;
}

.content-text {
    height: 5rem;
    border-radius: 5px;
    text-align: center;
    font-size: 1.6rem;
    justify-content: center;
    display: flex;
    align-items: center;
}

.content-title {
    margin-bottom: 0;
}

.content-box {
    background: #f2f8fd;
    border: none;
    width: 38.5rem;
    height: 25rem;
    padding: 2rem;
    border-radius: 5px;
    display: grid;
}

h6 {
    font-size: 1.8rem;
}</style>
