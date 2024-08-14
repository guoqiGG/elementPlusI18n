<template>
  <div style="width: 100vw;height:100vh;">
    <Editor :value="data.value" :locale="zhHans" :plugins="data.plugins" @change="handleChange"
      :upload-images="handleUploadImages" />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Editor } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import gemoji from "@bytemd/plugin-gemoji"
import mediumZoom from "@bytemd/plugin-medium-zoom"
import zhHans from 'bytemd/locales/zh_Hans.json'
import "bytemd/dist/index.css";
import "highlight.js/styles/default.css";
import "github-markdown-css/github-markdown-light.css";
import { uploadImageByBase64 } from '../api/modules/upload.js'
const plugins = [
  gfm(),
  highlight(),
  gemoji(),
  mediumZoom()
]

const data = reactive({
  value: '',
  plugins
})

const handleChange = (v) => {
  data.value = v
  console.log(data.value)
}

const handleUploadImages = (v) => { // 上传图片 v是一个数组
  let imgs = aa(v)
  return imgs
}

const aa = (v) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const res = await uploadImageByBase64({ base64: event.target.result })
      let imgs = []
      imgs.push({
        title: 111,
        url: res.data.url
      })
      resolve(imgs)
    };
    reader.readAsDataURL(v[0]);
  })

}

</script>
<style>
.bytemd {
  width: 100%;
  height: calc(100vh - 0px);
  /* 这里的100vh表示视口高度的100%，‌减去50px是为了留出一些空间给页面的其他元素 */
}
</style>