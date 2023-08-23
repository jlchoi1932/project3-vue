<template>
  <div>
    <ul class="flex-around">
      <li class="sub-box">
        <div class="content-title flex-between">
          <h6 class="flex">1분기</h6>
          <div class="select_wrap">
            <label for="year_02">단위:명</label>
          </div>
        </div>
        <div class="content-text bg-gray">
          {{ $filters.comma(this.currentQuarterData["quarter1"]) }} /
          {{ $filters.comma(this.currentQuarterData["quarter1_before"]) }}
        </div>
        <div class="content-title flex-between">
          <h6 class="flex">작년대비 증감률</h6>
        </div>
        <div
          class="content-text bg-bluegray"
          v-show="this.currentQuarterData['quarter1_increase'] >= 0"
          style="color: blue"
        >
          {{ this.currentQuarterData["quarter1_increase"] }} %
        </div>
        <div
          class="content-text bg-bluegray"
          v-show="this.currentQuarterData['quarter1_increase'] < 0"
          style="color: crimson"
        >
          {{ this.currentQuarterData["quarter1_increase"] }} %
        </div>
      </li>
      <li class="sub-box">
        <div class="content-title flex-between">
          <h6 class="flex">2분기</h6>
          <div class="select_wrap">
            <label for="year_02">단위:명</label>
          </div>
        </div>
        <div class="content-text bg-gray">
          {{ $filters.comma(this.currentQuarterData["quarter2"]) }} /
          {{ $filters.comma(this.currentQuarterData["quarter2_before"]) }}
        </div>
        <div class="content-title flex-between">
          <h6 class="flex">작년대비 증감률</h6>
        </div>
        <div
          class="content-text bg-bluegray"
          v-show="this.currentQuarterData['quarter2_increase'] >= 0"
          style="color: blue"
        >
          {{ this.currentQuarterData["quarter2_increase"] }} %
        </div>
        <div
          class="content-text bg-bluegray"
          v-show="this.currentQuarterData['quarter2_increase'] < 0"
          style="color: crimson"
        >
          {{ this.currentQuarterData["quarter2_increase"] }} %
        </div>
      </li>
      <li class="sub-box">
        <div class="content-title flex-between">
          <h6 class="flex">3분기</h6>
          <div class="select_wrap">
            <label for="year_02">단위:명</label>
          </div>
        </div>
        <div class="content-text bg-gray">
          {{ $filters.comma(this.currentQuarterData["quarter3"]) }} /
          {{ $filters.comma(this.currentQuarterData["quarter3_before"]) }}
        </div>
        <div class="content-title flex-between">
          <h6 class="flex">작년대비 증감률</h6>
        </div>
        <div
          class="content-text bg-bluegray"
          v-show="this.currentQuarterData['quarter3_increase'] >= 0"
          style="color: blue"
        >
          {{ this.currentQuarterData["quarter3_increase"] }} %
        </div>
        <div
          class="content-text bg-bluegray"
          v-show="this.currentQuarterData['quarter3_increase'] < 0"
          style="color: crimson"
        >
          {{ this.currentQuarterData["quarter3_increase"] }} %
        </div>
      </li>
      <li class="sub-box">
        <div class="content-title flex-between">
          <h6 class="flex">4분기</h6>
          <div class="select_wrap">
            <label for="year_02">단위:명</label>
          </div>
        </div>
        <div class="content-text bg-gray">
          {{ $filters.comma(this.currentQuarterData["quarter4"]) }} /
          {{ $filters.comma(this.currentQuarterData["quarter4_before"]) }}
        </div>
        <div class="content-title flex-between">
          <h6 class="flex">작년대비 증감률</h6>
        </div>
        <div
          class="content-text bg-bluegray"
          v-show="this.currentQuarterData['quarter4_increase'] >= 0"
          style="color: blue"
        >
          {{ this.currentQuarterData["quarter4_increase"] }} %
        </div>
        <div
          class="content-text bg-bluegray"
          v-show="this.currentQuarterData['quarter4_increase'] < 0"
          style="color: crimson"
        >
          {{ this.currentQuarterData["quarter4_increase"] }} %
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
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
      currentQuarterData: {},
    };
  },

  methods: {
    currentQuarter: function () {
      for (let i = 0; i < this.quarterData.length; i++) {
        if (this.quarterData[i]["year"] == this.year) {
          this.currentQuarterData = this.quarterData[i];
        }
      }
      // console.log('currentQuarterData: ', this.currentQuarterData);
    },
  },
  watch: {
    quarterData: function (newValue, oldValue) {
      // console.log('quarterData watch: ', newValue, oldValue);
      this.currentQuarter();
    },

    year: function (newValue, oldValue) {
      // console.log('year watch: ', newValue, oldValue);
      this.currentQuarter();
    },
  },
  computed: {},
  components: {},
  mounted() {},
};
</script>

<style scoped>
.sub-box {
  width: 20rem;
  height: 20rem;
  padding: 2rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
  border: none;
  background: #f2f8fd;
  border-radius: 5px;
  display: grid;
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
  height: 3rem;
  border-radius: 5px;
  text-align: center;
  font-size: 1.4rem;
  line-height: 3rem;
}
</style>
