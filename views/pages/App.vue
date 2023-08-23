<template>
   <div v-cloak>
      <div class="app-header" v-if="isChecked">
         <Header ></Header>
      </div>
      <div class="main-warp">
         <router-view/>
      </div>
      <Footer v-if="isChecked"></Footer>
   </div>
</template>

<script>
import Header from '../layout/Header.vue';
import Menu from '../layout/Menu.vue';
import Footer from '../layout/Footer.vue';

export default {
   data: () => {
      return {
         // 레이아웃 표시 상태
         isChecked: true,

         // 레이아웃 제외 페이지 목록
         excludePage: ['/TouristspotEx.page', '/singlePersonHouseholdEx.page', '/MarketanalysisEx.page', '/YouthJobsEx.page']
      }
   },
   methods: {
      
   },
   watch: {

   },
   computed: {

   },
   components: {
      Header: Header,
      Menu: Menu,
      Footer: Footer,
   },
   created(){
      // 레이아웃 제외 페이지 확인
      for(let i = 0; i < this.excludePage.length; i ++) {
         // 입력된 url 페이지가 레이아웃 제외 목록에 있는 페이지라면 레이아웃 미표시
         if(document.location.pathname === this.excludePage[i]){
            // console.log('iframe test: ', document.location.pathname);
            this.isChecked = false;
            break;
         }
         // console.log('iframe test: ', this.excludePage[i]);
      }
   },
   mounted: () => {
      // console.log('Vue mounted');
   }
};
</script>

<style scoped>
   [v-cloak] {
      display: none;
   }

   .app-header {
      display: flex; 
      margin-bottom: 5rem;
   }

   .main-warp {
      width: 100%;
    /* padding-top:5rem; */
    min-height: 8rem;
   }

</style>
