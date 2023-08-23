<template>
  <div class="tab-round">
    <h3>주제도 설정</h3>
    <!-- <div>
      <h4>통계설정</h4>
      <ToggleVue1></ToggleVue1>
    </div> -->
    <h4>기간설정</h4>
    <search-box class="datebox">
      <section class="flex_DatePicker">
        <DatePicker></DatePicker>
      </section>
      <p class="dateduring">~</p>
      <div class="flex_DatePicker">
        <DatePicker></DatePicker>
      </div>
    </search-box>
    <div>
      <h4>지도유형</h4>
      <ToggleVue2></ToggleVue2>
    </div>
    <!-- <div>
      <h4>성별설정</h4>
      <ToggleVue3></ToggleVue3>
    </div> -->
    <!-- <div>
      <h4>연령설정</h4>
      <input type="number" placeholder="1세" /> <span class="dateduring">~</span
      ><input type="number" placeholder="100세" />
    </div> -->
    <!-- <div>
      <h4>통계표출</h4>
      <ToggleVue4></ToggleVue4>
    </div> -->
  </div>
</template>

<script>
import DatePicker from "./DatePicker.vue";
import ToggleVue1 from "./Toggle01.vue";
import ToggleVue2 from "./Toggle02.vue";
import ToggleVue3 from "./Toggle03.vue";
import ToggleVue4 from "./Toggle04.vue";

export default {
  data() {
    return {
      showCreditCard: true,
    };
  },
  components: {
    DatePicker: DatePicker,
    ToggleVue1: ToggleVue1,
    ToggleVue2: ToggleVue2,
    ToggleVue3: ToggleVue3,
    ToggleVue4: ToggleVue4,
  },
  methods: {
    toggle() {
      this.showCreditCard = !this.showCreditCard;
    },
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
  cursor: pointer;
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
input {
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
h3 {
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  font-weight: bolder;
  font-size: 2.2rem;
}
h4 {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #36629b;
}
div {
  margin-bottom: 2.5rem;
}
p {
  width: 8rem;
}
.datebox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
}
.flex_DatePicker {
  width: 60rem;
  margin-bottom: -2.5rem;
  padding: 0;
}
.dateduring {
  color: #d2d2d3;
  margin: 0;
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 8px;
}

input::placeholder {
  color: #d2d2d3;
  font-size: 1.3rem;
}
</style>
