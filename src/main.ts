import './assets/main.css'
import { createApp } from 'vue'
import { router } from './routes/app.routes.ts'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')