import { createApp } from 'vue'
import './style.scss'
import 'core-js/features/array/at';
import {vuetify} from "./Plugins/Vuetify.js";
import pinia from "./Store";
import router from "./Router";
import VueApexCharts from "vue3-apexcharts";
import App from './App.vue'
import VueMobileDetection from "vue-mobile-detection";


createApp(App)
    .use(vuetify)
    .use(pinia)
    .use(router)
    .use(VueApexCharts)
    .use(VueMobileDetection)
    .mount('#app')
