import { createApp } from 'vue'
import App from './App.vue'
import '@zquare/theme-chalk/src/var.scss'
import Zquare from 'zquare'
// 从组件库中分别导入 ZButton 和 ZIcon
// import Zquare from 'zquare'
// 创建应用实例
const app = createApp(App)

// 注册组件
// app.use(Zquare)
app.use(Zquare)
console.log(app)

// 挂载
app.mount('#app')
