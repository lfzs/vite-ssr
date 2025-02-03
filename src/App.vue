<template>
  <ConfigProvider :theme="{ hashed: false, token }">
    <StyleProvider :transformers="[legacyLogicalPropertiesTransformer]">
      <RouterView v-slot="{ Component }">
        <Suspense>
          <component :is="Component" />
        </Suspense>
      </RouterView>
    </StyleProvider>
  </ConfigProvider>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { legacyLogicalPropertiesTransformer, StyleProvider, ConfigProvider, theme } from 'ant-design-vue'
  import { token } from '@/static/style/antdv/token'

  onMounted(() => {
    if (import.meta.env.DEV) {
      const { token: computedToken } = theme.useToken()
      console.info('右键复制下一行到 computedToken.js 文件 ')
      console.info(computedToken.value)
    }
  })
</script>
