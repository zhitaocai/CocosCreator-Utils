/**
 * @author zhitaocai
 * @classdesc 颜色相关工具类
 */
export class ColorUtil {
    /**
     * 判断当前颜色是否为深色系
     *
     * 原理：通过把 RGB 模式转换成 YUV 模式，而 Y 是明亮度（灰阶），因此计算 Y 的值是否足够亮就可以了
     *
     * @param color 颜色
     *
     * @returns true: 深色 false: 浅色
     */
    static isColorDark(color: cc.Color) {
        if (color == null) {
            throw new Error("color can not be null");
        }
        return color.getR() * 0.299 + color.getG() * 0.578 + color.getB() * 0.114 < 192;
    }
}
