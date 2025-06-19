import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import swal from 'sweetalert';

loadFonts()

window.axios = require('axios')

createApp(App).use(router)
  .use(vuetify)
  .use(swal)
  .mount('#app')
