import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';
import i18n from './includes/i18n';
import GlobalComponents from './includes/_globals';

const app = createApp(App).use(i18n);
app.use(store);
app.use(GlobalComponents);

app.mount('#app');
