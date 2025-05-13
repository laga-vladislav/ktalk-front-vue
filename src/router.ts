import { createRouter, createWebHistory } from 'vue-router'
import CreateMeeting from './components/CreateMeeting.vue'
import Menu from './components/Menu.vue'
import Settings from './components/Settings.vue'
import ErrorPage from './components/ErrorPage.vue';
import { getJwtPayloadFromApi } from './authorization';
import { getUserInfoFromSessionStorage, getTokenFromSessionStorage } from './utils';


const routes = [
    { path: '/', component: Menu, meta: { rootPath: true, requiresAuth: true } },
    { path: '/menu', component: Menu, meta: { requiresAuth: true, adminOnly: true } },
    { path: '/create-meeting', component: CreateMeeting, meta: { requiresAuth: true } },
    { path: '/settings', component: Settings, meta: { requiresAuth: true, adminOnly: true } },
    { path: '/error', component: ErrorPage, meta: { errorHandler: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeResolve(async (to, from, next) => {
    console.log("beforeResolve called", to.fullPath)
    try {
        const urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get('token')
        if (!token)
            token = getTokenFromSessionStorage()

        console.log("Token:", token)

        if (!token) {
            if (to.meta.errorHandler) {
                console.log("No token, staying on error")
                return next()
            } else {
                console.log("No token, redirecting to /error")
                return next({ path: "/error", query: { message: "Был получен неверный токен" } })
            }
        }

        await getJwtPayloadFromApi(token)
        const userInfo = await getUserInfoFromSessionStorage()

        console.log("User info:", userInfo)

        if (to.meta.adminOnly && !userInfo.is_admin) {
            console.log("Not admin, redirect to /create-meeting")
            return next("/create-meeting")
        } else if (to.meta.rootPath) {
            console.log("Root path, redirecting to /menu")
            return next("/menu")
        } else if (to.meta.errorHandler) {
            console.log("Already on error, continue")
            return next()
        } else {
            console.log("All good, proceed")
            return next()
        }
    } catch (error: any) {
        console.error("Ошибка в beforeResolve:", error.message)

        if (to.meta.errorHandler) {
            return next()
        }

        return next({
            path: "/error",
            query: { message: "Произошла ошибка: " + error.message },
        })
    }
})

export default router
