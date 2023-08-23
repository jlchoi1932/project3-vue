<template>
  <div class="visual ">
    <img src="../../../resources/images/bg/jobtopbg.png" alt="">
    <div class="title">
      <!-- <h3 class="tab_title">청년 맞춤형 일자리 분석</h3> -->
    </div>
  </div>
</template>

<script>

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
.visual{position: relative;}
.visual > img{width: 100%;}
.visual .tab_title{position: absolute; top: 39%;
    left: 16%;}
.itemimg {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 23rem;
}
.tab_title {
  color: #ffffff;
  text-shadow: 6px 6px 3px gray ;
  font-size: 4.8rem;
  border-bottom: none;
  font-family: GmarketSansBold;
}


</style>
