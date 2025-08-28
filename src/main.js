import { createApp } from "vue"
import "./style.css"
import router from "./router/index"
import { createPinia } from "pinia"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import en from "element-plus/es/locale/lang/en"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

import { createI18n } from "vue-i18n"
import lang from "./lang"
const i18n = createI18n({
  locale: "zhCn",
  messages: lang,
})

import App from "./App.vue"
const pinia = createPinia()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(i18n).use(router).use(pinia).use(ElementPlus, { locale: zhCn }).mount("#app")
