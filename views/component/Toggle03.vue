<template lang="">
  <div>
    <ul class="flex-center">
      <label class="test_obj">
        <input type="radio" name="gender" value="all" checked="checked" />
        <span>전체</span>
      </label>
      <label class="test_obj">
        <input type="radio" name="gender" value="male" />
        <span>남성</span>
      </label>
      <label class="test_obj">
        <input type="radio" name="gender" value="female" />
        <span>여성</span>
      </label>
    </ul>
  </div>
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
.test_obj input[type="radio"] {
  display: none;
}

.test_obj input[type="radio"] + span {
  display: inline-block;
  padding: 0 1rem;
  width: 5.8rem;
  background-color: #ffffff;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
  border-radius: 0.5rem;
  padding-right: 1rem;
}

.test_obj input[type="radio"]:checked + span {
  background-color: #5785ff;
  color: #ffffff;
}
</style>
