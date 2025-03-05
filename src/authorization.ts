export { getJwtFromCookie, getJwtPayloadFromApi }

import { type IUser } from './components/models/UserInterface'
import { setUserInfoToSessionStorage } from './utils';
import { sendApiRequest } from './requestSender';


function getJwtFromCookie(queryName: string = 'jwt'): string | undefined {
    let token = document.cookie
        .split('; ')
        .find(row => row.startsWith(queryName + '='))
        ?.split('=')[1];
    return token;
}

async function getJwtPayloadFromApi(token: string, apiUrl: string = import.meta.env.VITE_BACK_DOMAIN) {
    const response = await sendApiRequest<IUser>(
        `${apiUrl}/get-jwt-payload`,
        {},
        token
    );

    if (response.success) {
        const userInfo = response.data
        setUserInfoToSessionStorage(userInfo);
    } else {
        // Обработка ошибок на основе текста ошибки
        const errorMsg = response.error || "Неизвестная ошибка";

        if (errorMsg.includes("401") || errorMsg.includes("403")) {
            throw new Error("Невалидный токен");
        } else if (errorMsg.includes("Неизвестная ошибка") && !errorMsg.includes("status")) {
            throw new Error("API недоступен");
        } else {
            console.error("Неизвестная ошибка API:", errorMsg);
            throw new Error("Ошибка сервера");
        }
    }
}