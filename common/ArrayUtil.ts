/**
 * @author zhitaocai
 * @class 数组工具类
 */
export class ArrayUtil {
    /**
     * 打乱数组顺序，利用 Fisher–Yates shuffle 洗牌算法
     *
     * @see https://www.zhihu.com/question/68330851
     */
    static shuffle<T>(array: T[]): T[] {
        if (array == null || array.length == 0) {
            throw new Error("invalid array");
        }
        let temp: T;
        for (let i = array.length - 1; i >= 0; i--) {
            let exchangeIndex = Math.floor(Math.random() * i);
            temp = array[i];
            array[i] = array[exchangeIndex];
            array[exchangeIndex] = temp;
        }
        return array;
    }
}
