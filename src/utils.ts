import type { IUser } from "./components/models/UserInterface"

const itemName = "userInfo"

function setUserInfoToSessionStorage(itemValue?: IUser) {
    sessionStorage.setItem(itemName, JSON.stringify(itemValue))
}

function getUserInfoFromSessionStorage(): Promise<IUser> {
    const userInfo = sessionStorage.getItem(itemName);
    if (!userInfo) {
        return Promise.reject(new Error(`Данные пользователя не найдены в sessionStorage по ключу ${itemName}`));
    }
    return Promise.resolve(JSON.parse(userInfo) as IUser);
}

export { setUserInfoToSessionStorage, getUserInfoFromSessionStorage }