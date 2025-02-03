// 收集路由配置
const modules = import.meta.glob('@/views/**/{r,R}oute.js*', { eager: true })
const viewsRoute = Object.values(modules)
  .map(i => i.default ?? i)
  .flat()

const routes = [
  ...viewsRoute,
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: <h2>404</h2>,
  },
]

export { routes }
