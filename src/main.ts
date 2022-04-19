import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/base.css'
import './assets/styles/base.less'
import './assets/styles/variables.less'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
