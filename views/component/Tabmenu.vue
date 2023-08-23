<template>
  <div class="section03_itemtxt w3-bar w3-black">
    <button
      class="tablink"
      :class="{ active: activeTab === 'Population' }"
      @click="openCity('Population')"
    >
      인구
    </button>
    <button
      class="tablink"
      :class="{ active: activeTab === 'Births' }"
      @click="openCity('Births')"
    >
      출생
    </button>
    <button
      class="tablink"
      :class="{ active: activeTab === 'Deaths' }"
      @click="openCity('Deaths')"
    >
      사망
    </button>
    <button
      class="tablink"
      :class="{ active: activeTab === 'Migration' }"
      @click="openCity('Migration')"
    >
      전출
    </button>
  </div>
  <div
    id="Population"
    class="city"
    :style="{ display: activeTab === 'Population' ? 'block' : 'none' }"
  >
    <!-- 인구 내용 -->
    <div class="flex-between">
      <div class="maininfo_left">
        <img
          src="../../resources/images/icon/people.png.png"
          width="100px"
          height="auto"
        />
      </div>
      <div>
        <div class="maininfo_top">
          <h3>인구수</h3>
          <h3>101,088<span class="maininfosub">명</span></h3>
        </div>
        <div class="maininfo_bottom">
          <div class="maininfo_top">
            <h3>전월대비</h3>
            <h3>+ 37<span class="maininfosub">명</span></h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    id="Births"
    class="city"
    :style="{ display: activeTab === 'Births' ? 'block' : 'none' }"
  >
    <!-- 출생 내용 -->
    <div class="flex-between">
      <div class="maininfo_left">
        <img
          src="../../resources/images/icon/birth.png"
          width="100px"
          height="auto"
        />
      </div>
      <div>
        <div class="maininfo_top">
          <h3>출생</h3>
          <h3>49<span class="maininfosub">명</span></h3>
        </div>
        <div class="maininfo_bottom">
          <div class="maininfo_top">
            <h3>전월대비</h3>
            <h3>+ 7<span class="maininfosub">명</span></h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    id="Deaths"
    class="city"
    :style="{ display: activeTab === 'Deaths' ? 'block' : 'none' }"
  >
    <!-- 사망 내용 -->
    <div class="flex-between">
      <div class="maininfo_left">
        <img
          src="../../resources/images/icon/death.png"
          width="100px"
          height="auto"
        />
      </div>
      <div>
        <div class="maininfo_top">
          <h3>사망</h3>
          <h3>160<span class="maininfosub">명</span></h3>
        </div>
        <div class="maininfo_bottom">
          <div class="maininfo_top">
            <h3>전월대비</h3>
            <h3>+ 50<span class="maininfosub">명</span></h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    id="Migration"
    class="city"
    :style="{ display: activeTab === 'Migration' ? 'block' : 'none' }"
  >
    <!-- 전출 내용 -->
    <div class="flex-between">
      <div class="maininfo_left">
        <img
          src="../../resources/images/icon/move.svg"
          width="100px"
          height="auto"
          style="margin-top: 40px"
        />
      </div>
      <div>
        <div class="maininfo_top">
          <h3>전출</h3>
          <h3>915<span class="maininfosub">명</span></h3>
        </div>
        <div class="maininfo_bottom">
          <div class="maininfo_top">
            <h3>전월대비</h3>
            <h3>+29<span class="maininfosub">명</span></h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- 

<template>
  <div class="section03_itemtxt w3-bar w3-black">
    <button
      class="tablink"
      @bind:class="isActive ? 'active' : ''"
      @click="openCity('Population')"
    >
      인구
    </button>
    <button class="tablink" @click="openCity('Births')">출생</button>
    <button class="tablink" @click="openCity('Deaths')">사망</button>
    <button class="tablink" @click="openCity('Migration')">전출</button>
  </div>
  <div id="Population" class="city">
    <div class="flex-between">
      <div class="maininfo_left">
        <img src="../../resources/images/icon/People.svg" />
      </div>
      <div>
        <div class="maininfo_top">
          <h3>인구수</h3>
          <h3>101,285<span class="maininfosub">명</span></h3>
        </div>
        <div class="maininfo_bottom">
          <div class="maininfo_top">
            <h3>전월대비</h3>
            <h3>- 106<span class="maininfosub">명</span></h3>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="Births" class="city" style="display: none">
    <div class="flex-between">
      <div class="maininfo_left">
        <img src="../../resources/images/icon/People.svg" />
      </div>
      <div>
        <div class="maininfo_top">
          <h3>출생</h3>
          <h3>101,285<span class="maininfosub">명</span></h3>
        </div>
        <div class="maininfo_bottom">
          <div class="maininfo_top">
            <h3>전월대비</h3>
            <h3>- 106<span class="maininfosub">명</span></h3>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="Deaths" class="city" style="display: none">
    <div class="flex-between">
      <div class="maininfo_left">
        <img src="../../resources/images/icon/People.svg" />
      </div>
      <div>
        <div class="maininfo_top">
          <h3>사망</h3>
          <h3>101,285<span class="maininfosub">명</span></h3>
        </div>
        <div class="maininfo_bottom">
          <div class="maininfo_top">
            <h3>전월대비</h3>
            <h3>- 106<span class="maininfosub">명</span></h3>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="Migration" class="city" style="display: none">
    <div class="flex-between">
      <div class="maininfo_left">
        <img src="../../resources/images/icon/People.svg" />
      </div>
      <div>
        <div class="maininfo_top">
          <h3>전출</h3>
          <h3>101,285<span class="maininfosub">명</span></h3>
        </div>
        <div class="maininfo_bottom">
          <div class="maininfo_top">
            <h3>전월대비</h3>
            <h3>- 106<span class="maininfosub">명</span></h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

<script>
export default {
  data() {
    return {
      activeTab: "Population",
    };
  },
  methods: {
    openCity(cityName) {
      this.activeTab = cityName;
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #5378ad;
  color: white;
  border-bottom: solid 2px #ffffff !important;
}

button.clicked {
  color: #ffffff;
  border-bottom: solid 2px #ffffff !important;
}
.city {
  width: 35rem;
  margin: 0 auto;
  color: #ffffff;
}
.city > div {
  margin-top: 1rem;
}
.city > div > div:nth-child(2) {
  text-align: right;
}
button {
  background: none;
  border: none;
  color: #ffffff6b;
  cursor: pointer;
  width: 9rem;
  padding-bottom: 3px;
  border-bottom: solid 2px #ffffff6b;
}
.maininfo_top {
  font-size: 1.8rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.maininfo_left {
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
.maininfo_top h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5em;
  font-family: GmarketSansLight;
}
.maininfosub {
  font-family: "GmarketSansLight";
  font-size: 1.2rem;
  font-weight: 100;
  padding-left: 1rem;
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
</style>
