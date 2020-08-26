/**
 * @author zhitaocai
 * @classdesc 数学工具类
 */
export class MathUtil {
    /**
     * 角度转弧度
     *
     * @param angle 角度
     */
    static toRadians(angle: number) {
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

    /**
     * 计算两个向量之间的夹角
     *
     * @param v0x 向量0 x坐标
     * @param v0y 向量0 y坐标
     * @param v1x 向量1 x坐标
     * @param v1y 向量1 y坐标
     */
    static angleBetween(v0x: number, v0y: number, v1x: number, v1y: number) {
        let p = v0x * v1x + v0y * v1y;
        let n = Math.sqrt((Math.pow(v0x, 2) + Math.pow(v0y, 2)) * (Math.pow(v1x, 2) + Math.pow(v1y, 2)));
        let sign = v0x * v1y - v0y * v1x < 0 ? -1 : 1;
        let angle = sign * Math.acos(p / n);
        //let angle = Math.atan2(v0y, v0x) - Math.atan2(v1y,  v1x);
        return angle;
    }
}
