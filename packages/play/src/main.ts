import { createApp } from 'vue'
import App from './App.vue'

// 从组件库中分别导入 ZButton 和 ZIcon
import Zquare from 'zquare'
import 'zquare/dist/index.css'
// 创建应用实例
const app = createApp(App)

// 注册组件
app.use(Zquare)


// 挂载
app.mount('#app')