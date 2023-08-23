<template>
  <div style="height: 400px; overflow: auto">
    <table class="">
      <thead>
        <tr>
          <!-- 컬럼명 바인딩 -->
          <th v-for="header in headers" :key="header.text">
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 데이터 바인딩 -->
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="key in headerKey" :key="key + index">
            {{ $filters.comma(item[key]) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    headers: {
      type: Array,
      required: true, // 필수
    },
    items: {
      type: Array,
      default: () => [],
    },
    scrollState: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
  watch: {},
  computed: {
    headerKey() {
      return this.headers.map((header) => header.value);
    },
  },
  components: {},
  mounted() {
    // console.log("main mounted");
  },
};
</script>

<style scoped>
table {
  width: 100%;
  height: 100%;
  font-size: 1.4rem;  
}

thead {
  background: #f8f8f8;
}

td {
  text-align: center;
}

tr td:nth-child(2) {
  background: #f8f8f8;
}

/* tr td:nth-child(3)::after {
  content: "건";
}

tr td:nth-child(4)::after {
  content: "건";
} */

tr td:nth-child(5)::after {
  /* content: "%"; */
}

</style>
