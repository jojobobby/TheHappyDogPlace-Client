import CryptoJS from 'crypto-js';

namespace Encryption {
    const key = CryptoJS.enc.Hex.parse(process.env.ENCRYPTION_KEY);
    const iv = CryptoJS.enc.Hex.parse(process.env.ENCRYPTION_IV);    

    export const encryptFetch = (url:string, method:string, object:Object) => {
        Array.from(Object.keys(object)).forEach((key) => {
            object[key] = encrypt(object[key]);
        });

        return fetch(url, {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        }).then((response) => {
            return JSON.parse(decrypt(response));
        }).catch((error) => {
            return error;
        });
    }   

    export function encrypt(text:any) {
        const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });
        return encrypted.toString();
    }
    
    export function decrypt(encryptedText:any) {
        const decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv: iv });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}

export {
    Encryption
}