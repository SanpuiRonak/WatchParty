import { Accessor, createSignal } from "solid-js";
import { v4 as uuidv4 } from 'uuid';


const USER_NAME_KEY = 'user-name';
const USER_ID_KEY = 'user-id';

const getItemFromLocalStorageWithFallbackValue = (key: string, fallback: string) => {
    const localStorageItem = localStorage.getItem(key);
    if (!localStorageItem) return fallback
    return localStorageItem;
}

const [username, setUsername] = createSignal(getItemFromLocalStorageWithFallbackValue(USER_NAME_KEY, ''))
const [userId, setUserId] = createSignal(getItemFromLocalStorageWithFallbackValue(USER_ID_KEY, ''))
const isUserInitialized: Accessor<boolean> = () => username() !== '' && userId() !== ''
const setUser = (username: string) => {
    setUsername(username)
    const userUUID = uuidv4()
    setUserId(userUUID)
    localStorage.setItem(USER_NAME_KEY, username)
    localStorage.setItem(USER_ID_KEY, userUUID)
}

type User = {
    getUserName: Accessor<string>
    getUserId: Accessor<string>
    setUser: (username: string) => void
    isInitialized: Accessor<boolean>
}


const getUser = (): User => ({
    getUserName: username,
    getUserId: userId,
    setUser,
    isInitialized: isUserInitialized

})

export default getUser;

