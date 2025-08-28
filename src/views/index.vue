<template>
  <div class="loader-container">
    <el-button @click="changeLang">切换语言</el-button>
    <el-button>{{ $t("home.label1") }}</el-button>
    <el-button>{{ $t("home.label2") }}</el-button>
    <el-date-picker v-model="value1" type="date" placeholder="Pick a day" :size="size" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue"
import { useI18n } from "vue-i18n"
const i18n = useI18n()
const changeLang = () => {
  i18n.locale.value = i18n.locale.value === "zhCn" ? "en" : "zhCn"
}
const value1 = ref(new Date())
const size = ref("medium")
</script>

<style lang="scss" scoped></style>
