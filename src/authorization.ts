import axios from 'axios';
import { type IUser } from './components/models/UserInterface'


export function getJwt(queryName: string = 'jwt'): string | undefined {
    let token = document.cookie
        .split('; ')
        .find(row => row.startsWith(queryName + '='))
        ?.split('=')[1];
    return token;
}

export async function getJwtPayloadFromApi(
    token: string,
    api_url: string = import.meta.env.VITE_BACK_DOMAIN
): Promise<IUser> {
    try {
        const { data } = await axios.post(
            api_url + "/verify-jwt",
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