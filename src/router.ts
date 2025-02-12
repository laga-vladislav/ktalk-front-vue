import { createRouter, createWebHistory } from 'vue-router'
import CreateMeeting from './components/CreateMeeting.vue'

const routes = [
    { path: '/create-meeting', component: CreateMeeting },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
