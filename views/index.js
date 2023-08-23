/**
 * @author : 최정우
 * @since : 2022.10.19
 * @dscription : Vue를 활용한 Client단 구현의 시작점(Index) Component 입니다.
 */
import { createApp } from 'vue';

//Router
import AppRouter from './pages/AppRouter.js';
import AppStore from './pages/AppStore.js';
import AppFilters from './pages/AppFilters.js';
//Application Root Vue Component
import App from './pages/App.vue';

// const vue = createApp(App).use(AppRouter).mount('#root');
import { library } from '@fortawesome/fontawesome-svg-core'

import { faHatWizard } from '@fortawesome/free-solid-svg-icons'

import 'leaflet/dist/leaflet.css';

library.add(faHatWizard)

const app = createApp(App);
app.use(AppStore)
app.use(AppRouter)
app.config.globalProperties.$filters = AppFilters
app.mount('#root');

//index.html에 정의된 window.AppUserHttpRequestURL을 활용하여, 사용자가 요청한 초기 페이지로 이동
if (!APP_USER_HTTP_REQUEST_URL && APP_USER_HTTP_REQUEST_URL != '/') {
    console.log('index.js APP_USER_HTTP_REQUEST_URL : ', APP_USER_HTTP_REQUEST_URL);
    AppRouter.push({ path: APP_USER_HTTP_REQUEST_URL, query: {}})
}

