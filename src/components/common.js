import { ref, onMounted } from 'vue'

// https://github.com/frandiox/vite-ssr/blob/master/src/vue/components.ts
// https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/components/client-only.ts
export const ClientOnly = defineComponent({
  name: 'ClientOnly',
  inheritAttrs: false,
  setup(props, { slots }) {
    const mounted = ref(false)
    onMounted(() => { mounted.value = true })
    return () => mounted.value && slots.default ? slots.default() : null
  },
})