<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getTotalWaves, wave, getAllWaves } from '@/utils/web3/contract'
import type { Ref } from 'vue'
import type { IWave } from '@/utils/web3/types'
import { Message } from '@arco-design/web-vue'

const waveCounts = ref(0)

const allWaves: Ref<IWave[]> = ref([])

const isLoading = ref(false)

const content = ref('')

const avatarImgUrls = [
  'https://tva1.sinaimg.cn/large/e6c9d24ely1h1wg7myx4sj208a08adfz.jpg',
  'https://tva1.sinaimg.cn/large/e6c9d24ely1h1wg8bcupyj208a08ajrg.jpg',
  'https://tva1.sinaimg.cn/large/e6c9d24ely1h1wg8m1zloj208a08adfy.jpg',
]

const handleGetTotalWaves = async () => {
  const _waveCounts = await getTotalWaves()
  waveCounts.value = parseInt(_waveCounts)
}

const handleGetAllWaves = async () => {
  const tempAllWaves: IWave[] = []
  const _allWaves = await getAllWaves()
  _allWaves.forEach((item: IWave) => {
    tempAllWaves.push({
      waver: item.waver,
      message: item.message,
      timestamp: new Date(item.timestamp * 1000).getTime(),
    })
  })
  allWaves.value = tempAllWaves
}

const handleWave = async () => {
  isLoading.value = true
  await wave(content.value)
  await handleGetTotalWaves()
  await handleGetAllWaves()
  isLoading.value = false
}

const getRandomAvatar = () => {
  return avatarImgUrls[Math.floor(Math.random() * avatarImgUrls.length)]
}

onMounted(async () => {
  const msgRet = Message.loading({
    content: 'Loading...',
    duration: 9999,
  })
  await handleGetTotalWaves()
  await handleGetAllWaves()
  msgRet.close()
})
</script>

<template>
  <div class="text-$color-text-1" text-center p-4>
    <div mb-4>
      <h1 mb-4>👋🏻 你好啊，我是 Chuck !</h1>
      <p mb-4>这是我的第一个区块链合约 Wave。</p>
      <p mb-4>它部署在 Rinkeby 测试网上。</p>
      <p mb-4>你可以点击下方的按钮去向他发送一个挥手的消息。</p>
      <p mb-4>在挥手的同时你甚至可以添加一些文本信息，但这是可选的。</p>
    </div>
    <div mb-4>
      <a-statistic
        title="截止到目前一共收到的挥手次数"
        :value="waveCounts"
        show-group-separator
      />
    </div>
    <div mb-4>
      <a-textarea
        v-model="content"
        placeholder="可以在这里附加一些文本信息"
      ></a-textarea>
    </div>
    <div mb-8>
      <a-button type="primary" @click="handleWave" :loading="isLoading"
        >打个招呼</a-button
      >
    </div>
  </div>

  <div class="text-$color-text-1" p-4>
    <h2 mb-4>历史消息</h2>

    <a-list>
      <a-list-item v-for="wave in allWaves" :key="wave.timestamp">
        <a-list-item-meta :title="wave.waver" :description="wave.message">
          <template #avatar>
            <a-avatar shape="square">
              <img alt="avatar" :src="getRandomAvatar()" />
            </a-avatar>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<style lang="less" scoped></style>
