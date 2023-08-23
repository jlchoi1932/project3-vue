<template>
  <div class="visual">
    <div class="title">
      <h3 class="tab_title">관광지 분석</h3>
    </div>
    <ul class="flex-center">
      <li>
        <img src="../../../resources/images/icon/tour1.png" class="itemimg" />
        <div class="uppertxt">
          <div class="small-title">연도별 현황(2022.12)</div>
          <h3 class="main-title">총 관광지 관광객</h3>
        </div>
        <div class="undertxt">
          <p :v-model="touristCountList">
            총
            <span class="count_num">{{
              $filters.comma(this.totalTourist)
            }}</span>
            명
          </p>
        </div>
      </li>
      <li>
        <img src="../../../resources/images/icon/tour2.png" class="itemimg" />
        <div class="uppertxt">
          <div class="small-title">체류 시간 현황(2022.12)</div>
          <h3 class="main-title">평균 방문객 체류 시간</h3>
        </div>
        <div class="undertxt">
          <p>
            평균 <span class="count_num">{{ this.avgStayTime }}</span> 분
          </p>
        </div>
      </li>
      <li>
        <img src="../../../resources/images/icon/tour3.png" class="itemimg" />
        <div class="uppertxt">
          <div class="small-title">숙박 일수 현황(2022.12)</div>
          <h3 class="main-title">평균 방문객 숙박 일수</h3>
        </div>
        <div class="undertxt">
          <p>
            평균 <span class="count_num">{{ this.avgStayDay }}</span> 일
          </p>
        </div>
      </li>
      <li>
        <img src="../../../resources/images/icon/tour4.png" class="itemimg" />
        <div class="uppertxt">
          <div class="small-title">관광지 관광객 증감률 현황(2022.12)</div>
          <h3 class="main-title">전년 대비</h3>
        </div>
        <div class="undertxt">
          <p v-show="this.rateTourist >= 0">
            증가
            <span class="count_num">{{
              $filters.comma(this.rateTourist)
            }}</span>
            명
          </p>
          <p v-show="this.rateTourist < 0">
            감소
            <span class="count_num" style="color: crimson">{{
              $filters.comma(-this.rateTourist)
            }}</span>
            명
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import COMMON_UTIL from "../../../resources/js/commonUtil.js";

export default {
  props: {
    touristCountList: {
      type: Array,
      default: [],
    },

    touristStayTimeAndDayList: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      // 연도
      year: 2022,

      // 총 관광지 관광객
      totalTourist: null,

      // 평균 방문객 체류 시간
      avgStayTime: null,

      // 평균 방문객 숙박 일수
      avgStayDay: null,

      // 전년 대비 관광지 관광객 증감률
      rateTourist: null,
    };
  },
  methods: {},
  watch: {
    // 부모 컴포넌트에서 데이터 업데이트 시 자식 컴포넌트도 props 데이터 업데이트
    touristCountList: function (newValue, oldValue) {
      // console.log('touristCountList watch: ', newValue, oldValue);
      for (let i = 0; i < this.touristCountList.length; i++) {
        if (this.touristCountList[i]["year"] == this.year) {
          this.totalTourist = this.touristCountList[i]["sm_sum"];
          this.rateTourist =
            this.touristCountList[i]["sm_sum"] -
            this.touristCountList[i]["sm_presum"];
        }
      }
      // console.log('touristCount: ', this.totalTourist, this.rateTourist);
    },
    touristStayTimeAndDayList: function (newValue, oldValue) {
      // console.log('touristStayTimeAndDayList watch: ', newValue, oldValue);
      for (let i = 0; i < this.touristStayTimeAndDayList.length; i++) {
        if (this.touristStayTimeAndDayList[i]["stdr_ym"] == this.year) {
          this.avgStayTime =
            this.touristStayTimeAndDayList[i]["avrg_stay_time01"];
          this.avgStayDay =
            this.touristStayTimeAndDayList[i]["avrg_stayng_daycnt01"];
        }
      }
      // console.log('touristCount: ', this.avgStayTime, this.avgStayDay);
    },
  },
  computed: {},
  mounted() {
    // console.log("TestCompoent mounted");
  },
};
</script>
<style scoped>
.visual {
  width: 100%;
  padding: 2.5rem;
  background: #eeefef;
}
.itemimg {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 23rem;
}
.tab_title {
  color: #1e426d;
  font-size: 3.8rem;
  border-bottom: none;
  font-family: GmarketSansBold;
}

.main-title {
  color: #337ab7;
  font-size: 2rem;
  width: 20rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #6d6d6d;
}
ul {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.flex-center {
}

.small-title {
  text-align: center;
  color: #6d6d6d;
}
.uppertxt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 30%;
}
.undertxt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 13%;
  padding-top: 1rem;
}

.count_num {
  font-size: 2.8rem;
  color: #1e426d;
  font-family: GmarketSansMedium;
  font-weight: 700;
}
li {
  width: 35rem;
  height: 16rem;
  background: #ffffff;
  border-radius: 35px;
  box-shadow: 0px 0px 10px #00000033;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 5rem;
}

/* ul :hover {
  background: #d5ecff;
} */
li .top {
  padding: 10px 20px;
  height: 70px;
}
li .top p {
  float: left;
  font-weight: bold;
  font-size: 18px;
}
li .bot {
  width: 100%;
  height: 105px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px 20px;
  position: relative;
}
li .bot .count_num {
  color: #337ab7;
  font-weight: bold;
  font-size: 30px;
}
</style>
