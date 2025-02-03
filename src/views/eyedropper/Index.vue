<template>
  <main class="flex-middle flex-column">
    <button @click="onEyedropper" :style="{ background: hex }" v-html="Dropper" class="flex-none eye-dropper" />
    <div class="flex-column code">
      <Input
        v-model:value="hex"
        @change="e => handleHex(e.target.value)"
        addonBefore="HEX"
        :maxlength="7"
        class="hex"
      />
    </div>
  </main>
</template>

<script setup>
  import { ref, nextTick } from 'vue'
  import { useHead } from '@unhead/vue'
  import { Input } from 'ant-design-vue'
  import Dropper from '@/static/img/dropper.svg?raw'
  useHead({
    title: 'EyeDropper',
  })

  const hex = ref('#FFFFFF')
  const onEyedropper = async () => {
    const eyeDropper = new window.EyeDropper()
    const { sRGBHex } = await eyeDropper.open()
    hex.value = sRGBHex.toUpperCase()
  }

  const handleHex = val => {
    val = val.toUpperCase()
    val = val.startsWith('#') ? val : `#${val}`
    if (/^#[a-fA-F0-9]{0,6}$/.test(val)) {
      hex.value = val
    } else {
      nextTick(() => (hex.value = val.slice(0, -1)))
    }
  }
</script>

<style lang="less" scoped>
  main {
    width: 100dvw;
    height: 100dvh;

    .eye-dropper {
      cursor: pointer;
      border: none;
      outline: none;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-top: 30vh;
      border: @bd;
      color: @colorPrimary;
    }

    .code {
      padding-top: 12px;
      gap: 12px 0;
      width: 150px;
    }
  }
</style>
