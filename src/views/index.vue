<template>
  <div class="container">
    <div class="con">
      <div class="title">Hi，AI搜索已支持「DeepSeek-R1」最新版，快来试试吧！</div>
      <div class="chat-con">
        <div class="item" v-for="(item, index) in data.chatList" :key="index">
          <div class="user" v-if="item.type === 1">
            {{ item.message }}
          </div>
          <div class="system" v-if="item.type === 2">
            <span v-for="(char, i) in item.message" :key="i" class="char" :style="`animation-delay: ${i * 0.05}s`">
              {{ char === " " ? "&nbsp;" : char }}
            </span>
          </div>
        </div>
      </div>
      <div class="deepseek-loading" v-if="data.loading">
        <img :class="['loading-image', data.loading ? 'loading' : '']" title="发送" src="../assets/loading.png" alt="" /> <text>{{ data.model + " 思考中" }}</text>
      </div>
      <div class="input-con">
        <el-input @keydown.enter.prevent="send" @keydown.shift.enter="handleShiftEnter" class="input" v-model="data.chatInfo" autosize resize="none" type="textarea" placeholder="Shift + Enter 换行" />
        <view class="bottom">
          <el-select v-model="data.model" placeholder="Select" style="width: 240px">
            <el-option v-for="item in data.models" :key="item.id" :label="item.id" :value="item.id" />
          </el-select>
          <img @click="send" class="send-image" title="发送" v-if="data.chatInfo" src="../assets/send.png" alt="" />
          <img class="send-image" title="发送" v-else src="../assets/send-grey.png" alt="" />
        </view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue"
import { chatGet, chatPost, deepseekModel } from "@/api/modules"
const data = reactive({
  chatInfo: null,
  model: null,
  loading: false,
  result: null,
  models: null,
  abortController: null, // 新增AbortController
  chatList: [
    {
      type: 1,
      message: "hello",
    },
    {
      type: 2,
      message: "yes",
    },
  ],
})

const handleShiftEnter = (e) => {
  e.preventDefault()
  data.chatInfo += "\n"
}
const send = () => {
  if (!data.chatInfo?.trim()) return
  
  // 如果已有请求在进行，则取消它
  if (data.abortController) {
    data.abortController.abort()
  }
  
  sendChat()
}

const sendChat = async () => {





  // 创建新的AbortController
  data.abortController = new AbortController()
  
  try {
    data.chatList.push({ type: 1, message: data.chatInfo })
    let params = { message: data.chatInfo, model: data.model }
    data.chatInfo = null
    data.loading = true
    
    const res = await chatGet({ 
      ...params,
      signal: data.abortController.signal // 传入signal
    })




    data.result = res
    data.chatList.push({ type: 2, message: data.result })
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('请求出错:', error)
    }
  } finally {
    data.loading = false
    data.abortController = null
  }
}

const getModels = async () => {
  const res = await deepseekModel()
  data.models = res.data
  data.model = res.data[0].id
}

onMounted(() => {
  getModels()
})
</script>

<style lang="scss" scoped>
.container {
  padding-top: 50px;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  position: relative;
  .con {
    width: 720px;
    min-height: 300px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .title {
      background: linear-gradient(90deg, #335bff, #ca37ce);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      display: inline-block;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
    }
    .chat-con {
      .item {
        .user,
        .system {
          display: inline-block;
          .char {
            opacity: 0;
            animation: fadeIn 0.1s forwards;
            display: inline-block;
          }
        }
      }
      &:after {
        content: "";
        display: table;
        clear: both;
      }
      .item {
        margin-bottom: 15px;
        .user {
          float: right;
          background: #335bff;
          color: white;
          padding: 10px 15px;
          border-radius: 18px 18px 0 18px;
          max-width: 80%;
          clear: both;
          margin-bottom: 10px;
        }
        .system {
          float: left;
          //background: #f2f6fc;
          color: #333;
          padding: 10px 15px;
          border-radius: 18px 18px 18px 0;
          max-width: 80%;
          clear: both;
          margin-bottom: 10px;
          display: inline-flex;
          flex-wrap: wrap;

          .char {
            opacity: 0;
            animation: fadeIn 0.1s forwards, growHeight 0.1s forwards;
            display: inline-block;
            max-height: 0;
            overflow: hidden;
          }
        }
      }
    }

    .deepseek-loading {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      .loading-image {
        width: 20px;
        height: 20px;
      }
      .loading {
        animation: rotate 3s linear infinite;
      }
    }
    .input-con {
      margin-top: 20px;
      border: 0.5px solid #dcdfe6;
      border-radius: 5px;
      transition: border 0.3s;
      padding: 5px;
      &:hover {
        border: 0.5px solid #409eff;
      }
      :deep(.el-textarea) {
        border: none;
        box-shadow: none;
        min-height: 100px;
        .el-textarea__inner {
          border: none;
          box-shadow: none;
        }
        .is-focus {
          border: none;
          box-shadow: none;
        }
      }
      .bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .send-image {
          width: 40px;
          height: 40px;
          cursor: pointer;
        }
      }
    }
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
@keyframes growHeight {
  to {
    max-height: 24px;
  }
}
</style>
