import { createRouter as vueCreateRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import { routes } from './Routes'

function createRouter() {
  const router = vueCreateRouter({ routes, history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory() })
  return router
}

export {
  createRouter,
}
