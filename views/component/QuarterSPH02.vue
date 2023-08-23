<template>
    <div>
        <ul class="box-canvas">
            <li class="content-box">
                <div class="content-title flex-between">
                    <h6 class="flex"><span style="color: #80a1d3">남성</span></h6>
                    <div class="select_wrap">
                        <label for="year_02">단위:가구</label>
                    </div>
                </div>
                <div class="content-text bg-white">
                    {{ $filters.comma(this.thisYear["male_count"]) }} /
                    {{ $filters.comma(this.beforeYear["male_count"]) }}
                </div>
                <div class="content-title flex-between">
                    <h6 class="flex">작년대비 증감률</h6>
                </div>
                <div class="content-text bg-lightblue" v-show="this.thisYear['male_count_increase'] >= 0"
                    style="color: blue">
                    {{ this.thisYear["male_count_increase"] }} %
                </div>
                <div class="content-text bg-lightblue" v-show="this.thisYear['male_cmale_count_increaseount'] < 0"
                    style="color: crimson">
                    {{ this.thisYear["male_count_increase"] }} %
                </div>
                <div class="content-text bg-lightblue" v-show="this.beforeYear['year'] == null" style="color: blue">
                    전년도 데이터가 없습니다
                </div>
            </li>
            <li class="content-box-female">
                <div class="content-title flex-between">
                    <h6 class="flex"><span style="color: #ee8db8">여성</span></h6>
                    <div class="select_wrap">
                        <label for="year_02">단위:가구</label>
                    </div>
                </div>
                <div class="content-text bg-white">
                    {{ $filters.comma(this.thisYear["female_count"]) }} /
                    {{ $filters.comma(this.beforeYear["female_count"]) }}
                </div>
                <div class="content-title flex-between">
                    <h6 class="flex">작년대비 증감률</h6>
                </div>
                <div class="content-text bg-lightblue" v-show="this.thisYear['female_count_increase'] >= 0"
                    style="color: #ffdbeb">
                    {{ this.thisYear["female_count_increase"] }} %
                </div>
                <div class="content-text bg-lightblue" v-show="this.thisYear['female_count_increase'] < 0"
                    style="color: #d42f78; background-color: #ffdbeb">
                    {{ this.thisYear["female_count_increase"] }} %
                </div>
                <div class="content-text bg-lightblue" v-show="this.beforeYear['year'] == null"
                    style="color: #d42f78; background-color: #ffdbeb">
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
                male_count: 0,
                male_minor: 0,
                male_youth: 0,
                male_middle: 0,
                male_old: 0,
                female_count: 0,
                female_minor: 0,
                female_youth: 0,
                female_middle: 0,
                female_old: 0,
                year: null,
            },

            beforeYear: {
                male_count: 0,
                male_minor: 0,
                male_youth: 0,
                male_middle: 0,
                male_old: 0,
                female_count: 0,
                female_minor: 0,
                female_youth: 0,
                female_middle: 0,
                female_old: 0,
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
            // console.log("quarterData2 watch: ", newValue, oldValue);
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
.box-canvas {
    display: flex;
    gap: 4.5rem;
    justify-content: center;
}

.content-box-female {
    background: #fff1f7;
    border: none;
    width: 35rem;
    height: 22rem;
    padding: 2rem;
    border-radius: 10px;
    display: grid;
    box-shadow: 1px 1px 7px #00000021;
}

.content-box {
    background: #f2f8fd;
    border: none;
    width: 35rem;
    height: 22rem;
    padding: 2rem;
    border-radius: 10px;
    display: grid;
}

.sub-box {
    width: 20rem;
    height: 20rem;
    padding: 2rem;
    border: #aaaaaa solid 1px;
    border-radius: 5px;
    display: grid;
}

ul h6 {
    font-size: 1.8rem;
}

ul label {
    font-size: 1.2rem;
}

.width {
    width: 194.39px;
}

ul li {
    width: 24%;
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
}

.content-box {
    margin-bottom: 1rem;
}

h6 {
    font-size: 1.8rem;
}
</style>
