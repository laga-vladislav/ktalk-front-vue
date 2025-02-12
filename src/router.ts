import { createRouter, createWebHistory } from 'vue-router'
import CreateMeeting from './components/CreateMeeting.vue'
import Menu from './components/Menu.vue'

const routes = [
    { path: '/create-meeting', component: CreateMeeting },
    { path: '/menu', component: Menu },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
