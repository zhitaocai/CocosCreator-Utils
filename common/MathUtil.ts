/**
 * @author zhitaocai
 * @class 数学工具类
 */
export class MathUtil {
    /**
     * 角度转弧度
     *
     * @param angle 角度
     */
    static toRadian(angle: number) {
        return angle * (Math.PI / 180);
    }

    /**
     * 弧度转角度
     *
     * @param radian 弧度
     */
    static toAngle(radian: number) {
        return radian * (180 / Math.PI);
    }

    /**
     * 生成指定范围内的随机正数 [min, max]
     *
     * @param min 最小值（包括）
     * @param max 最大值（包括）
     */
    public static randomInt(min: number, max: number): number {
        let newMin = Math.ceil(min);
        let newMax = Math.floor(max);
        return newMin + Math.round((newMax - newMin) * Math.random());
    }
}
