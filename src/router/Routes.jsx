// 收集路由配置
const modules = import.meta.glob('@/views/**/{r,R}oute.js*', { eager: true })
const viewsRoute = Object.values(modules).map(i => i.default ?? i).flat()

const routes = [
  {
    path: '/',
    name:' root',
    component: <div>home</div>,
  },
  ...viewsRoute,
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: <div>404</div>,
  },
]

export {
  routes,
}
