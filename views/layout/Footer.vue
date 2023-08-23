<template>
  <footer>
    <img class="footerlogo" src="../../resources/images/y_logo_black.svg" />
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  watch: {},
  computed: {},
  mounted() {
    // console.log("Footer mounted");
  },
};
</script>
<style scoped>
div {
  border: 1px solid green;
}

.footerlogo {
  width: 25rem;
  height: 25rem;
  opacity: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
