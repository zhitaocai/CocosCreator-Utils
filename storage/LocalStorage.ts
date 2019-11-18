export class LocalStorage {
    /**
     * 读取指定key值的记录
     *
     * @param key 读取记录key
     * @param defaultValue 当该key值不存在的时候，默认的默认值
     */
    static get(key: string, defaultValue?: string): string {
        let str = cc.sys.localStorage.getItem(key);
        if (str == null || str == undefined) {
            if (defaultValue) {
                return defaultValue;
            } else {
                return null;
            }
        } else {
            return str;
        }
    }

    /**
     * 设置指定key值的记录
     *
     * @param key 待保存key（会覆盖现有的）
     * @param value 待保存value
     */
    static set(key: string, value: string): boolean {
        if (value) {
            cc.sys.localStorage.setItem(key, value);
            return true;
        } else {
            return false;
        }
    }

    /**
     * 移除指定key值
     * @param key 待移除key
     */
    static remove(key: string): boolean {
        cc.sys.localStorage.removeItem(key);
        return true;
    }
}
