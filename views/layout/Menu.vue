<template>
  <div class="flex-between">
    <!-- <router-link to="/" v-bind:class="{ active: isActive('/') }"
      ><span class="home">홈</span></router-link
    > -->
    <router-link
      to="/Touristspot.page"
      v-bind:class="{ active: isActive('/Touristspot.page') }"
    >
      <span class="tour">관광지 분석</span>
    </router-link>
    <router-link
      to="/singlePersonHousehold.page"
      v-bind:class="{ active: isActive('/singlePersonHousehold.page') }"
    >
      <span class="single">1인가구 현황 분석</span>
    </router-link>
    <router-link
      to="/Marketanalysis.page"
      v-bind:class="{ active: isActive('/Marketanalysis.page') }"
    >
      <span class="market">소상공인 분석</span>
    </router-link>
    <router-link
      to="/YouthJobs.page"
      v-bind:class="{ active: isActive('/YouthJobs.page') }"
    >
      <span class="jobs">청년 일자리 분석</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
  },
  watch: {},
  computed: {},
  mounted() {
    // console.log("Menu mounted");
  },
};
</script>
<style scoped>
div {
  width: 60%;
  margin: 0 auto;
  left: 12%;
  position: relative;
}
span {
  font-size: 1.6rem;
  font-weight: 600;
}

.active {
  color: #5785ff;
  font-weight: bolder;
}
.flex-between {
  display: flex;
  align-items: baseline;
  gap: 15rem;
  color: #7d7c7c;
}
</style>
