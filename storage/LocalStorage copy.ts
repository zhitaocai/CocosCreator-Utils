// import CryptoJS = require("crypto-js");

// export class LocalStorage {
//     static isEnableLog = false;

//     /**
//      * 读取指定key值的记录
//      *
//      * @param key 读取记录key
//      * @param defaultValue 当该key值不存在的时候，默认的默认值
//      */
//     static get(key: string, defaultValue?: string): string {
//         let encryptStr = cc.sys.localStorage.getItem(key);
//         if (CC_DEBUG && this.isEnableLog) {
//             cc.log(`本地缓存，获取 key: ${key}`);
//             cc.log(`密文：${encryptStr}`);
//         }
//         if (encryptStr == null || encryptStr == undefined) {
//             if (defaultValue) {
//                 if (CC_DEBUG && this.isEnableLog) {
//                     cc.log(`无明文：将返回 ${defaultValue}`);
//                 }
//                 return defaultValue;
//             } else {
//                 if (CC_DEBUG && this.isEnableLog) {
//                     cc.log(`无明文：将返回 ${null}`);
//                 }
//                 return null;
//             }
//         } else {
//             let srcStr = CryptoJS.AES.decrypt(encryptStr, "LuckyStar").toString(CryptoJS.enc.Utf8);
//             if (CC_DEBUG && this.isEnableLog) {
//                 cc.log(`明文：${srcStr}`);
//             }
//             return srcStr;
//         }
//     }

//     /**
//      * 设置指定key值的记录
//      * @param key 待保存key（会覆盖现有的）
//      * @param value 待保存value
//      */
//     static set(key: string, value: string): boolean {
//         if (value) {
//             // toString 好像不能加 Utf-8，暂时不清楚
//             // let encryptStr = CryptoJS.AES.encrypt(value, "LuckyStar").toString(CryptoJS.enc.Utf8);
//             let encryptStr = CryptoJS.AES.encrypt(value, "LuckyStar").toString();
//             if (CC_DEBUG && this.isEnableLog) {
//                 cc.log(`本地缓存：保存 key: ${key}`);
//                 cc.log(`明文： ${value}`);
//                 cc.log(`密文： ${encryptStr}`);
//             }
//             cc.sys.localStorage.setItem(key, encryptStr);
//             return true;
//         } else {
//             return false;
//         }
//     }

//     /**
//      * 移除指定key值
//      * @param key 待移除key
//      */

//     static remove(key: string): boolean {
//         cc.sys.localStorage.removeItem(key);
//         return true;
//     }
// }
