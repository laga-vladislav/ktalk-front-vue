import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router'
import CreateMeeting from './components/CreateMeeting.vue'
import Menu from './components/Menu.vue'
import Settings from './components/Settings.vue'
import ErrorPage from './components/ErrorPage.vue';
import type { IUser } from './components/models/UserInterface';

console.log(import.meta.env.VITE_BACK_DOMAIN + "/verify-jwt")

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

function getJwt(queryName: string = 'jwt'): string | undefined {
    let token = document.cookie
        .split('; ')
        .find(row => row.startsWith(queryName + '='))
        ?.split('=')[1];
    return token;
}

async function getJwtPayloadFromApi(token: string): Promise<IUser> {
    try {
        const { data } = await axios.post(
            import.meta.env.VITE_BACK_DOMAIN + "/verify-jwt",
            { jwt: token }
        );
        const userInfo: IUser = data
        return userInfo

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                throw new Error("API недоступен");
            } else if (error.response.status === 401 || error.response.status === 403) {
                throw new Error("Невалидный токен");
            } else {
                console.error("Неизвестная ошибка API:", error.response.status, error.response.data);
                throw new Error("Ошибка сервера");
            }
        } else {
            console.error("Неожиданная ошибка при проверке JWT:", error);
            throw new Error("Неизвестная ошибка");
        }
    }
}

router.beforeResolve(async (to, from, next) => {
    const token = getJwt();
    console.log(token);

    if (!token) {
        if (to.meta.errorHandler)
            next()
        else
            next({ path: "/error", query: { message: "Куки потерялись" } });
        return
    }

    try {
        const payload = await getJwtPayloadFromApi(token);
        console.log(payload);

        sessionStorage.setItem("userInfo", JSON.stringify(payload))

        if (to.meta.adminOnly && !payload.is_admin) {
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
