<template>
  <div>
    <div style="height: 500px" v-for="(item, index) in data" :key="index" data-aos="zoom-in-left">
      <div>
        <span>{{ item.id }}</span
        ><span>{{ item.name }}</span
        ><span>{{ item.age }}</span
        ><span>{{ item.address }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import "../mock/index.js"
const data = ref("Hello World!")
onMounted(() => {
  axios.get("/api/list").then((res) => {
    data.value = res.data.data
  })
})
</script>

<style lang="scss" scoped></style>
