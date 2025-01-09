import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'

import App from '@/App.vue'
import router from '@router/index.js'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import '@styles/main.scss'

const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput,
  },
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})
const app = createApp(App)

app.use(vuetify).use(createPinia()).use(router)
app.mount('#app')
