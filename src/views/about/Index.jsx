import { defineComponent, ref } from 'vue'

export default defineComponent({
  async setup() {
    const count = ref(0)
    await new Promise(resolve => setTimeout(resolve, 5e3))
    count.value = 10

    return () => <div>
      <button onClick={() => count++}>{ count.value }</button>
    </div>
  }
})