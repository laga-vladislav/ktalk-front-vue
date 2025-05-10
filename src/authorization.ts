export { getJwtPayloadFromApi }

import { type IUser } from './components/models/UserInterface'
import { setUserInfoToSessionStorage, setTokenToSessionStorage } from './utils';
import { sendApiRequest } from './requestSender';


// function getJwtFromCookie(queryName: string = 'jwt'): string {
//     let token = document.cookie
//         .split('; ')
//         .find(row => row.startsWith(queryName + '='))
//         ?.split('=')[1];
//     return token ? token : "";
// }

async function getJwtPayloadFromApi(token: string, apiUrl: string = import.meta.env.VITE_BACK_DOMAIN) {
// async function getJwtPayloadFromApi(token: string, apiUrl: string = "https://back.gusevo-news.my") {
    const response = await sendApiRequest<IUser>(
        `${apiUrl}/get-jwt-payload`,
        {},
        token,
        "GET",
    );

    if (response.success) {
        const userInfo = response.data;
        setUserInfoToSessionStorage(userInfo);
        setTokenToSessionStorage(token);
    } else {
        const errorMsg = response.error || "Неизвестная ошибка";
        console.log("Error message:", errorMsg); // Для отладки
        if (errorMsg.toLowerCase().includes("401") || errorMsg.toLowerCase().includes("403")) {
            throw new Error("Невалидный токен");
        } else if (errorMsg.includes("Неизвестная ошибка") && !errorMsg.includes("status")) {
            throw new Error("API недоступен");
        } else {
            console.error("Неизвестная ошибка API:", errorMsg);
            throw new Error("Ошибка сервера");
        }
    }
}