<template>
  <el-config-provider :locale="locale === 'zhCn' ? zhCn : en">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </el-config-provider>
</template>
<script setup>
import { watch, ref } from "vue"

import { useI18n } from "vue-i18n"
import { ElConfigProvider } from "element-plus"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import en from "element-plus/es/locale/lang/en"

const i18n = useI18n()
const locale = ref(i18n.locale.value)
watch(
  () => i18n.locale.value,
  (newLocale) => {
    locale.value = newLocale
  }
)
</script>
<style scoped></style>
