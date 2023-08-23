<template>
  <VueDatePicker
    v-model="date"
    :enable-time-picker="false"
    placeholder="년-월-일"
  >
  </VueDatePicker>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },
  data() {
    return {
      date: null,
    };
  },
};
</script>

<style>
.dp__input_icon {
  color: #5785ff;
  padding-top: 10px;
  padding-left: 5px;
}

.dp__input {
  font-size: 10px;
  font-family: GmarketSansMedium;
}

.dp__input_icon_pad {
  padding-left: 25px;
}
.dp__input_wrap {
  position: relative;
  width: 100%;
  padding-top: 6px;
  box-sizing: unset;
}
</style>
