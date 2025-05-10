import type { IUser } from "./components/models/UserInterface"

const userItemName = "userInfo"
const tokenItemName = "token"

function setUserInfoToSessionStorage(itemValue?: IUser) {
    sessionStorage.setItem(userItemName, JSON.stringify(itemValue))
}

function getUserInfoFromSessionStorage(): Promise<IUser> {
    const userInfo = sessionStorage.getItem(userItemName);
    if (!userInfo) {
        return Promise.reject(new Error(`Данные пользователя не найдены в sessionStorage по ключу ${userItemName}`));
    }
    return Promise.resolve(JSON.parse(userInfo) as IUser);
}

function setTokenToSessionStorage(token: string) {
    sessionStorage.setItem(tokenItemName, token)
}

function getTokenFromSessionStorage(): string {
    const token = sessionStorage.getItem(tokenItemName)
    if (!token) {
        return ""
    }
    return token
}

export {
    setUserInfoToSessionStorage,
    getUserInfoFromSessionStorage,
    setTokenToSessionStorage,
    getTokenFromSessionStorage
}