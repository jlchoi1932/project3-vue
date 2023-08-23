import { createWebHistory, createRouter } from "vue-router";

/* 메인화면 */
// import Main from '../pages/main/Main.vue';
import Touristspot from '../pages/TouristSpot/Touristspot.vue';
import SinglePersonHousehold from '../pages/singlePersonHousehold/SinglePersonHousehold.vue';
import Marketanalysis from '../pages/Marketanalysis/Marketanalysis.vue';
import YouthJobs from '../pages/Youthjobs/YouthJobs.vue';

const routes = [
    /* 메인화면 */
    // { path: '/', name: 'Main', component: Main},
    { path: '/', name: 'Main', component: Touristspot},
    /* 관광지 분석*/
    { path: '/Touristspot.page', name: 'Touristspot', component: Touristspot},
    /* 1인 가구 분석 */
    { path: '/singlePersonHousehold.page', name: 'SinglePersonHousehold', component: SinglePersonHousehold},
    /* 소상공인 분석 */
    { path: '/Marketanalysis.page', name: 'Marketanalysis', component: Marketanalysis},
    /* 청년 맞춤 일자리 분석 */
    { path: '/YouthJobs.page', name: 'YouthJobs', component: YouthJobs},

    /* 관광지 분석 no layout*/
    { path: '/TouristspotEx.page', name: 'TouristspotEx', component: Touristspot},
    /* 1인 가구 분석 no layout*/
    { path: '/singlePersonHouseholdEx.page', name: 'SinglePersonHouseholdEx', component: SinglePersonHousehold},
    /* 소상공인 분석 no layout*/
    { path: '/MarketanalysisEx.page', name: 'MarketanalysisEx', component: Marketanalysis},
    /* 청년 맞춤 일자리 분석 no layout*/
    { path: '/YouthJobsEx.page', name: 'YouthJobsEx', component: YouthJobs},
];

const AppRouter = createRouter({
    history: createWebHistory(/* Base Path */),
    routes,
});


export default AppRouter;