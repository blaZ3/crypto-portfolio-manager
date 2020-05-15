import {User} from '../models'

const KEY_USER = "USER";

export function getUser() : Promise < User | undefined > {
    return new Promise < User | undefined > ((resolve, reject) => {
        try {
            let userData = localStorage.getItem(KEY_USER);
            if (userData != null) {
                resolve(JSON.parse(userData));
            } else {
                resolve(undefined);
            }
        } catch (e) {
            reject();
        }
    });
}

export function saveUser(user : User) : Promise < boolean > {
    return new Promise < boolean > ((resolve, reject) => {
        try {
            localStorage.setItem(KEY_USER, JSON.stringify(user));
            resolve(true);
            return;
        } catch (ex) {
            reject("Failed to add user details");
        }
    })
}