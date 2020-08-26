/**
 * @author zhitaocai
 * @classdesc 二次贝塞尔曲线工具类
 */
export class QuadraticBezier {
    private _x1: number;
    private _y1: number;
    private _c1x: number;
    private _c1y: number;
    private _x2: number;
    private _y2: number;
    private _totalLength: number = null;

    /**
     * @param x1 开始点x坐标
     * @param y1 开始点y坐标
     * @param c1x 控制点x坐标
     * @param c1y 控制点y坐标
     * @param x2 结束点x坐标
     * @param y2 结束点y坐标
     */
    constructor(x1: number, y1: number, c1x: number, c1y: number, x2: number, y2: number) {
        this._x1 = x1;
        this._y1 = y1;
        this._c1x = c1x;
        this._c1y = c1y;
        this._x2 = x2;
        this._y2 = y2;
    }

    /**
     * 计算二阶贝塞尔曲线长度
     */
    getTotalLength(): number {
        if (this._totalLength == null) {
            this._totalLength = QuadraticBezier.getLength(this._x1, this._y1, this._c1x, this._c1y, this._x2, this._y2);
            // this._totalLength = QuadraticBezier.getApproximateLength(this._x1, this._y1, this._c1x, this._c1y, this._x2, this._y2);
        }
        return this._totalLength;
    }

    /**
     * 计算二阶贝塞尔曲线上，从起始点到指定长度，该长度终点坐标
     *
     * @param length 如果小于0，那么返回起始点坐标，如果超过曲线长度，那么返回终点坐标
     */
    getPointAtLength(length: number): number[] {
        if (length < 0) {
            let result = [];
            result.push(this._x1);
            result.push(this._y1);
            return result;
        }
        if (length > this.getTotalLength()) {
            let result = [];
            result.push(this._x2);
            result.push(this._y2);
            return result;
        }
        if (this.getTotalLength() == 0) {
            let result = [];
            result.push(this._x1);
            result.push(this._y1);
            return result;
        }
        return this.getPointAtCurve(length / this.getTotalLength());
    }

    /**
     * 计算二阶贝塞尔曲线某个T值下的坐标
     *
     * @param t t范围：[0, 1] ，0为起始点，1为终点
     *
     * @return {number[]} number[0]:x, number[1]: y
     *
     * @throws {Error} invalid t param, out of range [0, 1].
     */
    getPointAtCurve(t: number): number[] {
        return QuadraticBezier.getPointAtCurve(this._x1, this._y1, this._c1x, this._c1y, this._x2, this._y2, t);
    }

    /**
     * 计算二阶贝塞尔曲线某个T值下的坐标
     *
     * @param x1 开始点x坐标
     * @param y1 开始点y坐标
     * @param c1x 控制点x坐标
     * @param c1y 控制点y坐标
     * @param x2 结束点x坐标
     * @param y2 结束点y坐标
     * @param t t范围：[0, 1] ，0为起始点，1为终点
     *
     * @see https://github.com/MadLittleMods/svg-curve-lib/blob/master/src/js/svg-curve-lib.js#L53
     *
     * @return {number[]} number[0]:x, number[1]: y
     *
     * @throws {Error} invalid t param, out of range [0, 1].
     */
    static getPointAtCurve(x1: number, y1: number, c1x: number, c1y: number, x2: number, y2: number, t: number): number[] {
        if (t < 0 || t > 1) {
            throw new Error("invalid t param, out of range [0, 1].");
        }
        let result: number[] = [];
        result.push(Math.pow(1 - t, 2) * x1 + 2 * t * (1 - t) * c1x + Math.pow(t, 2) * x2);
        result.push(Math.pow(1 - t, 2) * y1 + 2 * t * (1 - t) * c1y + Math.pow(t, 2) * y2);
        return result;
    }

    /**
     * 计算二阶贝塞尔曲线长度
     *
     * @param x1 开始点x坐标
     * @param y1 开始点y坐标
     * @param c1x 控制点x坐标
     * @param c1y 控制点y坐标
     * @param x2 结束点x坐标
     * @param y2 结束点y坐标
     *
     * @see https://blog.csdn.net/langzi7758521/article/details/52101672
     * @see https://gist.github.com/tunght13488/6744e77c242cc7a94859
     *
     * @returns {number}
     *
     */
    static getLength(x1: number, y1: number, c1x: number, c1y: number, x2: number, y2: number): number {
        let ax = x1 - 2 * c1x + x2;
        let ay = y1 - 2 * c1y + y2;
        let bx = 2 * c1x - 2 * x1;
        let by = 2 * c1y - 2 * y1;
        let A = 4 * (ax * ax + ay * ay);
        let B = 4 * (ax * bx + ay * by);
        let C = bx * bx + by * by;

        let Sabc = 2 * Math.sqrt(A + B + C);
        let A_2 = Math.sqrt(A);
        let A_32 = 2 * A * A_2;
        let C_2 = 2 * Math.sqrt(C);
        let BA = B / A_2;

        return (A_32 * Sabc + A_2 * B * (Sabc - C_2) + (4 * C * A - B * B) * Math.log((2 * A_2 + BA + Sabc) / (BA + C_2))) / (4 * A_32);
    }
    /**
     * 计算二阶贝塞尔曲线近似长度
     *
     * 原理为将曲线划分为一定数量片段，这些片段用直线相连，累加其长度即为曲线的近似长度
     *
     * @param x1 开始点x坐标
     * @param y1 开始点y坐标
     * @param c1x 控制点x坐标
     * @param c1y 控制点y坐标
     * @param x2 结束点x坐标
     * @param y2 结束点y坐标
     * @param segs 片段数量
     *
     * @returns {number}
     *
     * @throws {Error} invaild segs, should be positive number
     */
    static getApproximateLength(x1: number, y1: number, c1x: number, c1y: number, x2: number, y2: number, segs: number = 40): number {
        if (segs <= 0) {
            throw new Error("invalid segs, should be positive number");
        }
        let segsFixed = Math.floor(segs);
        let lastPoint = QuadraticBezier.getPointAtCurve(x1, y1, c1x, c1y, x2, y2, 0);
        let length = 0;
        for (let i = 0; i < segsFixed; i++) {
            let endPoint = QuadraticBezier.getPointAtCurve(x1, y1, c1x, c1y, x2, y2, (i + 1) / segsFixed);
            length += Math.sqrt(Math.pow(endPoint[0] - lastPoint[0], 2) + Math.pow(endPoint[1] - lastPoint[1], 2));
            lastPoint = endPoint;
        }
        return length;
    }
}
