<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getTotalWaves, wave } from '@/utils/web3/contract'

const waveCounts = ref(0)

const isLoading = ref(false)

const handleGetTotalWaves = async () => {
  const _waveCounts = await getTotalWaves()
  waveCounts.value = parseInt(_waveCounts)
}

const handleWave = async () => {
  isLoading.value = true
  await wave()
  await handleGetTotalWaves()
  isLoading.value = false
}

onMounted(async () => {
  await handleGetTotalWaves()
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
      <a-textarea placeholder="可以在这里附加一些文本信息"></a-textarea>
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
      <a-list-item>
        <a-list-item-meta
          title="Beijing Bytedance Technology Co., Ltd."
          description="Beijing ByteDance Technology Co., Ltd. is an enterprise located in China."
        >
          <template #avatar>
            <a-avatar shape="square">
              <img
                alt="avatar"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
              />
            </a-avatar>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<style lang="less" scoped></style>
