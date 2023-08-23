<!-- <template>
  <div class="visual">
    <div class="background">
      <img
        src="../../../resources/images/bg/main_bg_sky.png"
        class="background"
      />
      <div class="slide_text">
        <div class="big_text">영천시 데이터 행정 시스템</div>
        <div class="small_text">
          영천시의 각종 데이터와 최신 시스템을 활용하여 최적의 데이터를 제공
        </div>
      </div>
      <div class="search_box">
        <div class="search_board">
          <table class="search_typing">
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="무엇을 찾고 계신가요?"
                    class="search_click"
                  />
                  <div class="lens">
                    <img
                      src="../../../resources/images/search5.png"
                      width="43px;"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="search_text">
          <h3>추천 검색어</h3>

          <div class="search_subtext">
            <router-link to="/singlePersonHousehold.page">
              # 1인가구
            </router-link>
          </div>
          <div class="search_subtext">
            <router-link to="/Touristspot.page"> # 영천 관광지 </router-link>
          </div>
          <div class="search_subtext">
            <router-link to="/YouthJobs.page"> # 청년 취업률 </router-link>
          </div>
          <div class="search_subtext">
            <router-link to="/Marketanalysis.page"> # 상권 분석 </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section02">
    <div class="section02_title">데이터 현황 분석</div>
    <div class="section02_menu">
      <router-link to="/Touristspot.page">
        <div class="section02_box">
          <img src="../../../resources/images/icon/boxicon1.png" />
          <h3>관광지 분석</h3>
        </div>
      </router-link>
      <router-link to="/singlePersonHousehold.page">
        <div class="section02_box">
          <img src="../../../resources/images/icon/boxicon2.png" />
          <h3>1인가구 현황 분석</h3>
        </div>
      </router-link>
      <router-link to="/Marketanalysis.page">
        <div class="section02_box">
          <img src="../../../resources/images/icon/boxicon3.png" />
          <h3>상권 분석</h3>
        </div>
      </router-link>
      <router-link to="/YouthJobs.page">
        <div class="section02_box">
          <img src="../../../resources/images/icon/boxicon4.png" />
          <h3>청년맞춤 일자리 분석</h3>
        </div>
      </router-link>
    </div>
    <div class="boxtext"></div>
  </div> -->
<!-- <div class="sction03_rightbutton">
    <h4><span style="color: #5278ad">1</span> / 8</h4>
    <button class="leftbtn">&lt;</button>
    <button class="rightbtn">&gt;</button>
  </div> -->
<!-- <div class="section03">
    <div class="section03_direction">
      <h3></h3>
    </div>
    <div class="section03_leftbox">
      <div class="section03_left_title">
        데이터로 <span style="font-size: 1.8rem">보는</span> 영천시
        <h4 class="section03_left_undertxt">2022-06 기준</h4>
      </div>
      <Tabmenu></Tabmenu>
    </div>
    <div class="section03_rightbox">
      <div class="section03_right_img">
        <img src="../../../resources/images/Main_theme.png" />
        <div class="section03_right_title" id="app">
          <div class="section03_right_uppertxt">
            테마별로 <span style="font-size: 1.8rem">보는</span> 영천시
          </div>
          <h4 class="section03_right_undertxt">
            현재 올해 총 관광지 관람객은 573,262명이며, 영천시 관람지중
            <span style="font-weight: 400">임고강변공원</span>이 가장 관람객이
            많이 분포되어 있습니다.
          </h4>
          <div class="section03_chart">
            <div class="section03_chart_01 tooltip" data-tooltip="94,733명">
              <h4>임고강변공원 16.52%</h4>
            </div>
            <div class="section03_chart_02 tooltip" data-tooltip="90,893명">
              <h4>은해사 15.85%</h4>
            </div>
            <div class="section03_chart_03 tooltip" data-tooltip="67,589명">
              <h4>동의참누리원 영천 한의마을 11.79%</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabmenu from "../../component/Tabmenu.vue";
export default {
  data() {
    return {
      tooltips: ["임고강변공원은...", "은해사는...", "동의참누리원은..."],
      tooltipVisible: false,
      tooltipContent: "",
    };
  },
  components: {
    Tabmenu: Tabmenu,
  },
  methods: {
    showTooltip(index) {
      this.tooltipVisible = true;
      this.tooltipContent = this.tooltips[index];
    },
    hideTooltip() {
      this.tooltipVisible = false;
      this.tooltipContent = "";
    },
  },
  watch: {},
  computed: {},
  mounted() {
    console.log("TestCompoent mounted");
  },
};
</script>
<style scoped>
.visual {
  background-image: url("../../../resources/images/bg/main_bg_sky.png");
  width: 100%;
  height: 100%;
}

.background {
  background-image: url("../../../resources/images/bg/main_bg_sky.png");
  background-repeat: no-repeat;
  width: 100vw;
  height: 35vh;
  display: flex;
  align-items: center;
}
.slide_text {
  text-align: left;
  margin-left: 15%;
  margin-right: 0;
  word-break: keep-all;
  z-index: 2;
  position: absolute;
}
.big_text {
  color: #1e2b7a;
  font-weight: 1000;
  font-size: 60px;
}
.small_text {
  color: #696e72;
  font-weight: 300;
  font-size: 28px;
  width: 70rem;
  padding-left: 5px;
}
.search_box {
  position: absolute;
  background-color: #1e2b7a;
  opacity: 100;
  border-radius: 10px 10px 10px 10px;
  width: 550px;
  height: 64px;
  margin: 0;
  padding: 0;
  border: #1e2b7a solid 1px;
  animation-name: main_search;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  margin-left: 60%;
}
.search_board {
  height: 100%;
}
.search_click {
  top: 6px;
  left: 6.5px;
  position: absolute;
  border: none;
  height: 50px;
  width: calc(100% - 70px);
  padding: 16px;
  border-radius: 0px;
  font-size: 16px;
  color: #424242;
  font-weight: 400;
  outline: none;
  font-family: "GmarketSansLight";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.search_text {
  display: flex;
  align-items: baseline;
}
.search_text h3 {
  color: #1e2b7a;
  font-size: 2.2rem;
  font-weight: 600;
  padding-right: 2rem;
}
.search_subtext {
  color: #424242;
  font-size: 1.4rem;
  padding-left: 1.5rem;
}
.lens {
  position: absolute;
  cursor: pointer;
  left: 487px;
  top: 0;
  width: 64px;
  height: 64px;
  padding: 10px;
}

.section02 {
  width: 100vw;
  height: 33rem;
  background: #e3eefa;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  margin-bottom: 4rem;
}
.section02_box {
  position: relative;
  width: 13rem;
  height: 13rem;
  border-radius: 1.5rem;
  background: #ffffff;
  box-shadow: 2px 2px 10px 0px #4242425e;
  cursor: pointer;
  text-align: center;
  align-items: center;
}

.section02 h3 {
  text-align: center;
  position: relative;
  top: 70%;
  font-size: 1.5rem;
  width: max-content;
  align-items: center;
  display: flex;
  margin: auto;
  justify-content: center;
  color: #3f3a39;
}

.section02_box img {
  top: 30%;
  position: relative;
}
.section02 :hover {
  background: #e3eefa;
}
.boxtext {
  font-size: 1.4rem;
}
.section02_menu {
  display: flex;
  justify-content: space-around;
  width: 120rem;
}
.section02_title {
  color: #5072a4;
  font-size: 2.8rem;
  font-weight: 500;
  text-align: center;
  padding-top: 3rem;
  padding-bottom: 4rem;
}
.section03 {
  width: 100vw;
  height: 45rem;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}

.section03_leftbox {
  position: relative;
  background-color: #5072a4;
  border-radius: 1.5rem;
  width: 50rem;
  height: 40rem;
  margin-right: 3.5rem;
}

.section03_left_title {
  color: #ffffff;
  font-size: 2.8rem;
  font-weight: 500;
  text-align: center;
  padding-top: 3rem;
}

.section03_left_undertxt {
  font-size: 1.6rem;
  font-weight: 100;
  font-family: "GmarketSansLight";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
  margin-bottom: 4rem;
}

button {
  background: none;
  border: none;
  /* color: #ffffff6b; */
  cursor: pointer;
}
.section03_itemtxt {
  display: flex;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  color: #ffffff6b;
  font-family: "GmarketSansLight";
  width: 35rem;
}
.button_on {
  border-bottom: solid 2px #ffffff;
  color: #fff;
  font-size: 1.6rem;
  width: 9rem;
  font-family: "GmarketSansMedium";
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.button_off {
  width: 9rem;
  padding-bottom: 3px;
  /* border-bottom: solid 2px #ffffff6b; */
}

.maininfo_top {
  font-size: 1.8rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.sction03_rightbutton {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  align-items: center;
  margin-left: 132rem;
}
.sction03_rightbutton h4 {
  font-size: 1.8rem;
  padding-right: 2rem;
}
.sction03_rightbutton button {
  background: #5278ad;
  color: #ffffff;
  cursor: pointer;
  width: 3.5rem;
  height: 3rem;
}
.leftbtn {
  border-radius: 5px 0px 0px 5px;
  border-right: solid 1px #fff;
}
.rightbtn {
  border-radius: 0px 5px 5px 0px;
}
.section03_rightbox {
  position: relative;
}
.section03_right_img img {
  width: 92rem;
}
.section03_right_title {
  color: #ffffff;
  font-size: 2.8rem;
  font-weight: 500;
  text-align: left;
  padding-top: 3rem;
  padding-left: 3rem;
  position: absolute;
  z-index: 1;
  width: 83rem;
  top: 0%;
  word-break: keep-all;
}
.section03_left_title h4 {
  font-size: 1.2rem;
  font-weight: 300;
}

.maininfo_left {
  position: absolute;
  margin-top: 8rem;
  margin-left: 4rem;
  display: flex;
  justify-content: center;
  width: 10rem;
  height: 10rem;
}
.section03_maininfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  margin-left: 70%;
  margin-top: 1.5rem;
  margin-right: 9%;
  color: #ffffff;
  text-align: end;
}
.maininfosub {
  font-family: "GmarketSansLight";
  font-size: 1.2rem;
  font-weight: 100;
  padding-left: 1rem;
}
.section03_right_uppertxt {
  margin-bottom: 4rem;
}

.section03_right_undertxt {
  font-size: 1.6rem;
  font-weight: 100;
  font-family: "GmarketSansLight";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
  margin-bottom: 3rem;
}
.section03_chart_01 {
  width: 47.5rem;
  border-radius: 0px 10px 10px 0px;
  background: #5278ad;
  color: #ffffff;
  font-size: 2rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
}

.section03_chart_02 {
  width: 45rem;
  border-radius: 0px 10px 10px 0px;
  background: #ffffff6f;
  color: #ffffff;
  font-size: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
}

.section03_chart_03 {
  width: 34rem;
  border-radius: 0px 10px 10px 0px;
  background: #ffffff6f;
  color: #ffffff;
  font-size: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
}

.section03_chart_01 :hover {
  color: #1e2b7a;
  font-weight: bolder;
}
.section03_chart_02 :hover {
  color: #1e2b7a;
  font-weight: bolder;
}
.section03_chart_03 :hover {
  color: #1e2b7a;
  font-weight: bolder;
}
.section03_chart_01 h4 {
  text-align: right;
  padding-right: 2rem;
  font-weight: 200;
}
.section03_chart_02 h4 {
  text-align: right;
  padding-right: 2rem;
  font-weight: 200;
}
.section03_chart_03 h4 {
  text-align: right;
  padding-right: 2rem;
  font-weight: 200;
}
.tooltip {
  position: relative;
}

.tooltip:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  top: 0;
  left: 110%;
  width: 10rem;
  background-color: #00000070;
  color: #fff;
  border-radius: 5px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}
</style> -->
