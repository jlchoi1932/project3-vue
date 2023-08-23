<template>
  <header class="flex">
    <div class="logo">
      <router-link to="/"
        ><img src="../../resources/images/yc_logo_3.svg" alt=""
      /></router-link>
    </div>
    <Menu></Menu>
  </header>
</template>

<script>
import Menu from "./Menu.vue";
export default {
  data() {
    return {};
  },
  methods: {},
  watch: {},
  computed: {},
  components: {
    Menu: Menu,
  },
  mounted() {
    // console.log("Header mounted");
  },
};
</script>

<style scoped>
.logo img {
  width: 9.5rem;
}
</style>
