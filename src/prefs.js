import { AsyncStorage } from 'react-native';

export function getToken() {
    return AsyncStorage.getItem("@UserToken");
}

export function setToken(token) {
    return AsyncStorage.setItem("@UserToken", JSON.stringify(token));
}
