import { createRouter, createWebHistory } from 'vue-router'
import CreateMeeting from './components/CreateMeeting.vue'
import Menu from './components/Menu.vue'
import Settings from './components/Settings.vue'

const routes = [
    { path: '/menu', component: Menu },
    { path: '/create-meeting', component: CreateMeeting },
    { path: '/settings', component: Settings },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
