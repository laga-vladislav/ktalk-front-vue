import { createRouter, createWebHistory } from 'vue-router'
import CreateMeeting from './components/CreateMeeting.vue'
import Menu from './components/Menu.vue'
import Settings from './components/Settings.vue'
import ErrorPage from './components/ErrorPage.vue';
import { getJwtPayloadFromApi } from './authorization';
import { getUserInfoFromSessionStorage } from './utils';


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
    // const token = getJwtFromCookie();
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token')
    console.log(token)

    if (!token) {
        if (to.meta.errorHandler)
            next()
        else
            next({ path: "/error", query: { message: "Был получен неверный токен" } });
        return
    }

    try {
        await getJwtPayloadFromApi(token);

        const userInfo = await getUserInfoFromSessionStorage()

        if (to.meta.adminOnly && !userInfo.is_admin) {
            next("/create-meeting");
        } else if (to.meta.rootPath) {
            next("/menu");
        } else if (to.meta.errorHandler) {
            next('/')
        } else {
            next()
        }
    }
    catch (error: any) {
        console.error("Ошибка в beforeResolve:", error.message);

        if (to.meta.errorHandler) {
            return next();
        }

        switch (error.message) {
            case "API недоступен":
                return next({
                    path: "/error",
                    query: { message: "Нет доступа к API сервиса" },
                });
            case "Невалидный токен":
                return next({
                    path: "/error",
                    query: { message: "Токен недействителен" },
                });
            default:
                return next({
                    path: "/error",
                    query: { message: "Произошла неизвестная ошибка" },
                });
        }
    }
});

export default router
