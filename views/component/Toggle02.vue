<template lang="">
  <ul class="flex-center">
    <li
      class="ui button toggle"
      @click="toggle"
      :class="[showCreditCard ? 'active' : '']"
    >
      색상
    </li>
    <li
      class="ui button toggle"
      @click="toggle"
      :class="[!showCreditCard ? 'active' : '']"
    >
      버블
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      showCreditCard: true,
    };
  },
  methods: {
    toggle() {
      this.showCreditCard = !this.showCreditCard;
    },
  },
};
</script>
<style scoped>
ul {
  border-radius: 0.5rem;
  width: fit-content;
  margin: 0 auto;
  background: #ffffff;
  color: #d2d2d3;
  border: 1px solid #d2d2d3;
  overflow: hidden;
}

li {
  padding: 0 1rem;
  font-weight: 600;
  width: 5.8rem;
}

.active {
  background: #5785ff;
  color: #ffffff;
}
</style>
