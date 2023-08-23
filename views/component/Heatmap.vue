<template>
  <div class="tab-round">
    <!-- <div class="colors">
      <ul class="flex">
        <li class="round red"></li>
        <li class="round red1"></li>
        <li class="round red2"></li>
        <li class="round red3"></li>
        <li class="round red4"></li>
        <li class="round red5"></li>
        <li class="round red6"></li>
      </ul>
    </div> -->
    <ul>
      <li class="red">{{ max }} 초과</li>
      <li class="red1">{{ 13 }} ~ {{ 15 }} 이하</li>
      <li class="red2">{{ 11 }} ~ {{ 13 }} 이하</li>
      <li class="red3">{{ 9 }} ~ {{ 11 }} 이하</li>
      <li class="red4">{{ 7 }} ~ {{ 9 }} 이하</li>
      <li class="red5">{{ 5 }} ~ {{ 7 }} 이하</li>
      <li class="red6">{{ min }} 미만</li>
    </ul>
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
      max: "15",
      min: "5",
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
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
}
.round {
  width: 3rem;
  height: 3rem;
  border-radius: 50px;
}
ul {
  text-align: right;
}
li {
  font-weight: 500;
  color: #ffffff;
  padding: 0 1rem;
}
.red {
  background: #cd1103;
  border-radius: 10px 10px 0px 0px;
}
.red1 {
  background: #dc3612;
}
.red2 {
  background: #dd5321;
}
.red3 {
  background: #e67430;
}
.red4 {
  background: #ee953f;
}
.red5 {
  background: #f6b64e;
}
.red6 {
  background: #ffd75d;
  border-radius: 0px 0px 10px 10px;
}
</style>
