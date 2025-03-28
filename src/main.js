import { createApp } from 'vue'
import './style.css'
import Aos from 'aos';
import 'aos/dist/aos.css';
Aos.init();
import App from './App.vue'
import "./mock/index.js"
createApp(App).mount('#app')
