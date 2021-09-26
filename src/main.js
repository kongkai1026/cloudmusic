import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast,Lazyload } from 'vant';

const app = createApp(App)
app.use(store).use(router).use(Toast).use(Lazyload).mount('#app')
