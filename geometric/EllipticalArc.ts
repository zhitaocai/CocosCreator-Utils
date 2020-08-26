// import { MathUtil } from "./MathUtil";

// /**
//  * @author zhitaocai
//  * @classdesc SVG<path> A指令 椭圆曲线工具类
//  */
// export class EllipticalArc {
//     private _x0: number;
//     private _y0: number;
//     private _rx: number;
//     private _ry: number;
//     private _xAxisRotation: number;
//     private _largeArcFlab: boolean;
//     private _sweepFlag: boolean;
//     private _x1: number;
//     private _y1: number;
//     private _totalLength: number = null;

//     /**
//      * @param x0 弧线起点x坐标
//      * @param y0 弧线起点y坐标
//      * @param rx 弧线在x轴方向的半径
//      * @param ry 弧线在y轴方向的半径
//      * @param xAxisRotation 与x轴夹角的度数
//      * @param largeArcFlab 0(false)：表示使用较小的弧线 1(true)：表示使用较大的弧线。
//      * @param sweepFlag 0(false)：使用弧线 1(true)：使用弧线的轴对称弧线
//      * @param x1 弧线终点x坐标
//      * @param y1 弧线终点y坐标
//      */
//     constructor(
//         x0: number,
//         y0: number,
//         rx: number,
//         ry: number,
//         xAxisRotation: number,
//         largeArcFlab: boolean,
//         sweepFlag: boolean,
//         x1: number,
//         y1: number
//     ) {
//         this._x0 = x0;
//         this._y0 = y0;
//         this._rx = rx;
//         this._ry = ry;
//         this._xAxisRotation = xAxisRotation;
//         this._largeArcFlab = largeArcFlab;
//         this._sweepFlag = sweepFlag;
//         this._x1 = x1;
//         this._y1 = y1;
//     }

//     /**
//      * 计算椭圆弧线曲线长度
//      */
//     getTotalLength(): number {
//         if (this._totalLength == null) {
//             this._totalLength = EllipticalArc.getApproximateLength(
//                 this._x0,
//                 this._y0,
//                 this._rx,
//                 this._ry,
//                 this._xAxisRotation,
//                 this._largeArcFlab,
//                 this._sweepFlag,
//                 this._x1,
//                 this._y1
//             );
//         }
//         return this._totalLength;
//     }

//     /**
//      * 计算椭圆弧线曲线上，从起始点到指定长度，该长度终点坐标
//      *
//      * @param length 如果小于0，那么返回起始点坐标，如果超过曲线长度，那么返回终点坐标
//      */
//     getPointAtLength(length: number): number[] {
//         if (length < 0) {
//             let result = [];
//             result.push(this._x0);
//             result.push(this._y0);
//             return result;
//         }
//         if (length > this.getTotalLength()) {
//             let result = [];
//             result.push(this._x1);
//             result.push(this._y1);
//             return result;
//         }
//         if (this.getTotalLength() == 0) {
//             let result = [];
//             result.push(this._x0);
//             result.push(this._y0);
//             return result;
//         }
//         return this.getPointAtCurve(length / this.getTotalLength());
//     }

//     /**
//      * 计算椭圆弧线曲线某个T值下的坐标
//      *
//      * @param t t范围：[0, 1] ，0为起始点，1为终点
//      *
//      * @return {number[]} number[0]:x, number[1]: y
//      *
//      * @throws {Error} invalid t param, out of range [0, 1].
//      */
//     getPointAtCurve(t: number): number[] {
//         return EllipticalArc.getPointAtCurve(
//             this._x0,
//             this._y0,
//             this._rx,
//             this._ry,
//             this._xAxisRotation,
//             this._largeArcFlab,
//             this._sweepFlag,
//             this._x1,
//             this._y1,
//             t
//         );
//     }

//     /**
//      * 计算椭圆曲线在某个T值下的坐标
//      *
//      * @param x0 弧线起点x坐标
//      * @param y0 弧线起点y坐标
//      * @param rx 弧线在x轴方向的半径
//      * @param ry 弧线在y轴方向的半径
//      * @param xAxisRotation 与x轴夹角的度数
//      * @param largeArcFlab 0(false)：表示使用较小的弧线 1(true)：表示使用较大的弧线。
//      * @param sweepFlag 0(false)：使用弧线 1(true)：使用弧线的轴对称弧线
//      * @param x1 弧线终点x坐标
//      * @param y1 弧线终点y坐标
//      * @param t t范围：[0, 1] ，0为起始点，1为终点
//      *
//      * @see https://github.com/MadLittleMods/svg-curve-lib/blob/master/src/js/svg-curve-lib.js#L84
//      *
//      * @return {number[]} number[0]:x, number[1]: y
//      *
//      * @throws {Error} invalid t param, out of range [0, 1].
//      */
//     static getPointAtCurve(
//         x0: number,
//         y0: number,
//         rx: number,
//         ry: number,
//         xAxisRotation: number,
//         largeArcFlag: boolean,
//         sweepFlag: boolean,
//         x1: number,
//         y1: number,
//         t: number
//     ): number[] {
//         if (t < 0 || t > 1) {
//             throw new Error("invalid t param, out of range [0, 1].");
//         }
//         // In accordance to: http://www.w3.org/TR/SVG/implnote.html#ArcOutOfRangeParameters
//         rx = Math.abs(rx);
//         ry = Math.abs(ry);
//         let xAxisRotationRadians = MathUtil.toRadians(xAxisRotation);
//         // If the endpoints are identical, then this is equivalent to omitting the elliptical arc segment entirely.
//         if (x0 === x1 && y0 === y1) {
//             let result = [];
//             result.push(x0);
//             result.push(y0);
//             return result;
//         }

//         // If rx = 0 or ry = 0 then this arc is treated as a straight line segment joining the endpoints.
//         if (rx === 0 || ry === 0) {
//             let result: number[] = [];
//             result.push(x0 + (x1 - x0) * t);
//             result.push(y0 + (y1 - y0) * t);
//             return result;
//         }

//         // Following "Conversion from endpoint to center parameterization"
//         // http://www.w3.org/TR/SVG/implnote.html#ArcConversionEndpointToCenter

//         // Step #1: Compute transformedPoint
//         let dx = (x0 - x1) / 2;
//         let dy = (y0 - y1) / 2;
//         let transformedPointX = Math.cos(xAxisRotationRadians) * dx + Math.sin(xAxisRotationRadians) * dy;
//         let transformedPointY = -Math.sin(xAxisRotationRadians) * dx + Math.cos(xAxisRotationRadians) * dy;

//         // Ensure radii are large enough
//         let radiiCheck = Math.pow(transformedPointX, 2) / Math.pow(rx, 2) + Math.pow(transformedPointY, 2) / Math.pow(ry, 2);
//         if (radiiCheck > 1) {
//             rx = Math.sqrt(radiiCheck) * rx;
//             ry = Math.sqrt(radiiCheck) * ry;
//         }

//         // Step #2: Compute transformedCenter
//         let cSquareNumerator =
//             Math.pow(rx, 2) * Math.pow(ry, 2) - Math.pow(rx, 2) * Math.pow(transformedPointY, 2) - Math.pow(ry, 2) * Math.pow(transformedPointX, 2);
//         let cSquareRootDenom = Math.pow(rx, 2) * Math.pow(transformedPointY, 2) + Math.pow(ry, 2) * Math.pow(transformedPointX, 2);
//         let cRadicand = cSquareNumerator / cSquareRootDenom;
//         // Make sure this never drops below zero because of precision
//         cRadicand = cRadicand < 0 ? 0 : cRadicand;
//         let cCoef = (largeArcFlag !== sweepFlag ? 1 : -1) * Math.sqrt(cRadicand);
//         let transformedCenter = {
//             x: cCoef * ((rx * transformedPointY) / ry),
//             y: cCoef * (-(ry * transformedPointX) / rx),
//         };

//         // Step #3: Compute center
//         let centerX = Math.cos(xAxisRotationRadians) * transformedCenter.x - Math.sin(xAxisRotationRadians) * transformedCenter.y + (x0 + x1) / 2;
//         let centerY = Math.sin(xAxisRotationRadians) * transformedCenter.x + Math.cos(xAxisRotationRadians) * transformedCenter.y + (y0 + y1) / 2;

//         // Step #4: Compute start/sweep angles
//         // Start angle of the elliptical arc prior to the stretch and rotate operations.
//         // Difference between the start and end angles
//         let horizontalNormalizeVectorX = 1;
//         let horizontalNormalizeVectorY = 0;
//         let startVectorX = (transformedPointX - transformedCenter.x) / rx;
//         let startVectorY = (transformedPointY - transformedCenter.y) / ry;
//         let startAngle = MathUtil.angleBetween(horizontalNormalizeVectorX, horizontalNormalizeVectorY, startVectorX, startVectorY);

//         let endVectorX = (-transformedPointX - transformedCenter.x) / rx;
//         let endVectorY = (-transformedPointY - transformedCenter.y) / ry;
//         let sweepAngle = MathUtil.angleBetween(startVectorX, startVectorY, endVectorX, endVectorY);

//         if (!sweepFlag && sweepAngle > 0) {
//             sweepAngle -= 2 * Math.PI;
//         } else if (sweepFlag && sweepAngle < 0) {
//             sweepAngle += 2 * Math.PI;
//         }
//         // We use % instead of `mod(..)` because we want it to be -360deg to 360deg(but actually in radians)
//         sweepAngle %= 2 * Math.PI;

//         // From http://www.w3.org/TR/SVG/implnote.html#ArcParameterizationAlternatives
//         let angle = startAngle + sweepAngle * t;
//         let ellipseComponentX = rx * Math.cos(angle);
//         let ellipseComponentY = ry * Math.sin(angle);

//         let result = [];
//         result.push(Math.cos(xAxisRotationRadians) * ellipseComponentX - Math.sin(xAxisRotationRadians) * ellipseComponentY + centerX);
//         result.push(Math.sin(xAxisRotationRadians) * ellipseComponentX + Math.cos(xAxisRotationRadians) * ellipseComponentY + centerY);
//         return result;
//     }

//     /**
//      * 计算椭圆弧线曲线的近似长度
//      *
//      * 原理为将曲线划分为一定数量片段，这些片段用直线相连，累加其长度即为曲线的近似长度
//      *
//      * @param x0 弧线起点x坐标
//      * @param y0 弧线起点y坐标
//      * @param rx 弧线在x轴方向的半径
//      * @param ry 弧线在y轴方向的半径
//      * @param xAxisRotation 与x轴夹角的度数
//      * @param largeArcFlab 0(false)：表示使用较小的弧线 1(true)：表示使用较大的弧线。
//      * @param sweepFlag 0(false)：使用弧线 1(true)：使用弧线的轴对称弧线
//      * @param x1 弧线终点x坐标
//      * @param y1 弧线终点y坐标
//      * @param segs 片段数量，数量越多越精准，但是所耗时间越多
//      *
//      * @returns {number}
//      *
//      * @throws {Error} invaild segs, should be positive number
//      */
//     static getApproximateLength(
//         x0: number,
//         y0: number,
//         rx: number,
//         ry: number,
//         xAxisRotation: number,
//         largeArcFlag: boolean,
//         sweepFlag: boolean,
//         x1: number,
//         y1: number,
//         segs: number = 80
//     ): number {
//         if (segs <= 0) {
//             throw new Error("invalid segs, should be positive number");
//         }
//         let segsFixed = Math.floor(segs);
//         let lastPoint = EllipticalArc.getPointAtCurve(x0, y0, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x1, y1, 0);
//         let length = 0;
//         for (let i = 0; i < segsFixed; i++) {
//             let endPoint = EllipticalArc.getPointAtCurve(x0, y0, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x1, y1, (i + 1) / segsFixed);
//             length += Math.sqrt(Math.pow(endPoint[0] - lastPoint[0], 2) + Math.pow(endPoint[1] - lastPoint[1], 2));
//             lastPoint = endPoint;
//         }
//         return length;
//     }

//     /**
//      * 将 A 指令转换为 C 指令数组
//      * SVG arc representation uses "endpoint parameterisation" where we specify the start and endpoint of the arc.
//      * This is to be consistent with the other path commands.  However we need to convert this to "centre point
//      * parameterisation" in order to calculate the arc. Handily, the SVG spec provides all the required maths
//      * in section "F.6 Elliptical arc implementation notes".
//      *
//      * Some of this code has been borrowed from the Batik library (Apache-2 license).
//      *
//      * Previously, to work around issue #62, we converted this function to use floats. However in issue #155,
//      * we discovered that there are some arcs that fail due of a lack of precision. So we have switched back to doubles.
//      */
//     static convertArcToBezierCurveDataArray(
//         lastX: number,
//         lastY: number,
//         rx: number,
//         ry: number,
//         angle: number,
//         largeArcFlag: boolean,
//         sweepFlag: boolean,
//         x: number,
//         y: number
//     ): BezierCurveToData[] {
//         if (lastX == x && lastY == y) {
//             // If the endpoints (x, y) and (x0, y0) are identical, then this
//             // is equivalent to omitting the elliptical arc segment entirely.
//             // (behaviour specified by the spec)
//             return null;
//         }

//         // Handle degenerate case (behaviour specified by the spec)
//         if (rx == 0 || ry == 0) {
//             // this.graphics.moveTo(lastX, lastY);
//             // this.graphics.lineTo(x, y);
//             let bezierCureArray: BezierCurveToData[] = [];
//             bezierCureArray.push({
//                 cx1: lastX,
//                 cy1: lastY,
//                 cx2: lastX,
//                 cy2: lastY,
//                 x: x,
//                 y: y,
//             });
//             return bezierCureArray;
//         }

//         // Sign of the radii is ignored (behaviour specified by the spec)
//         rx = Math.abs(rx);
//         ry = Math.abs(ry);

//         // Convert angle from degrees to radians
//         // let angleRad: number = Math.toRadians(angle % 360.0);

//         // 将上方 Android 的角度转弧度的 API 改为用 TypeScript 实现
//         let angleRad: number = (angle * Math.PI) / 180;

//         let cosAngle: number = Math.cos(angleRad);
//         let sinAngle: number = Math.sin(angleRad);

//         // We simplify the calculations by transforming the arc so that the origin is at the
//         // midpoint calculated above followed by a rotation to line up the coordinate axes
//         // with the axes of the ellipse.

//         // Compute the midpoint of the line between the current and the end point
//         let dx2: number = (lastX - x) / 2.0;
//         let dy2: number = (lastY - y) / 2.0;

//         // Step 1 : Compute (x1', y1')
//         // x1,y1 is the midpoint vector rotated to take the arc's angle out of consideration
//         let x1: number = cosAngle * dx2 + sinAngle * dy2;
//         let y1: number = -sinAngle * dx2 + cosAngle * dy2;

//         let rx_sq: number = rx * rx;
//         let ry_sq: number = ry * ry;
//         let x1_sq: number = x1 * x1;
//         let y1_sq: number = y1 * y1;

//         // Check that radii are large enough.
//         // If they are not, the spec says to scale them up so they are.
//         // This is to compensate for potential rounding errors/differences between SVG implementations.
//         let radiiCheck: number = x1_sq / rx_sq + y1_sq / ry_sq;
//         if (radiiCheck > 0.99999) {
//             let radiiScale: number = Math.sqrt(radiiCheck) * 1.00001;
//             rx = radiiScale * rx;
//             ry = radiiScale * ry;
//             rx_sq = rx * rx;
//             ry_sq = ry * ry;
//         }

//         // Step 2 : Compute (cx1, cy1) - the transformed centre point
//         let sign: number = largeArcFlag == sweepFlag ? -1 : 1;
//         let sq: number = (rx_sq * ry_sq - rx_sq * y1_sq - ry_sq * x1_sq) / (rx_sq * y1_sq + ry_sq * x1_sq);
//         sq = sq < 0 ? 0 : sq;
//         let coef: number = sign * Math.sqrt(sq);
//         let cx1: number = coef * ((rx * y1) / ry);
//         let cy1: number = coef * -((ry * x1) / rx);

//         // Step 3 : Compute (cx, cy) from (cx1, cy1)
//         let sx2: number = (lastX + x) / 2.0;
//         let sy2: number = (lastY + y) / 2.0;
//         let cx: number = sx2 + (cosAngle * cx1 - sinAngle * cy1);
//         let cy: number = sy2 + (sinAngle * cx1 + cosAngle * cy1);

//         // Step 4 : Compute the angleStart (angle1) and the angleExtent (dangle)
//         let ux: number = (x1 - cx1) / rx;
//         let uy: number = (y1 - cy1) / ry;
//         let vx: number = (-x1 - cx1) / rx;
//         let vy: number = (-y1 - cy1) / ry;
//         let p: number, n: number;

//         // Angle betwen two vectors is +/- acos( u.v / len(u) * len(v))
//         // Where '.' is the dot product. And +/- is calculated from the sign of the cross product (u x v)

//         const TWO_PI: number = Math.PI * 2.0;

//         // Compute the start angle
//         // The angle between (ux,uy) and the 0deg angle (1,0)
//         n = Math.sqrt(ux * ux + uy * uy); // len(u) * len(1,0) == len(u)
//         p = ux; // u.v == (ux,uy).(1,0) == (1 * ux) + (0 * uy) == ux
//         sign = uy < 0 ? -1.0 : 1.0; // u x v == (1 * uy - ux * 0) == uy
//         let angleStart: number = sign * Math.acos(p / n); // No need for checkedArcCos() here

//         // Compute the angle extent
//         n = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
//         p = ux * vx + uy * vy;
//         sign = ux * vy - uy * vx < 0 ? -1.0 : 1.0;
//         let angleExtent: number = sign * this.checkedArcCos(p / n);
//         if (!sweepFlag && angleExtent > 0) {
//             angleExtent -= TWO_PI;
//         } else if (sweepFlag && angleExtent < 0) {
//             angleExtent += TWO_PI;
//         }
//         angleExtent %= TWO_PI;
//         angleStart %= TWO_PI;

//         // Many elliptical arc implementations including the Java2D and Android ones, only
//         // support arcs that are axis aligned.  Therefore we need to substitute the arc
//         // with bezier curves.  The following method call will generate the beziers for
//         // a unit circle that covers the arc angles we want.
//         let bezierPoints: number[] = this.arcToBeziers(angleStart, angleExtent);

//         // Calculate a transformation matrix that will move and scale these bezier points to the correct location.
//         //   Matrix m = new Matrix();
//         //   m.postScale(rx, ry);
//         //   m.postRotate(angle);
//         //   m.postTranslate(cx, cy);
//         //   m.mapPoints(bezierPoints);

//         // 将上方 Android 矩阵变换改为下方 Cocos Creator 实现方式
//         // 将最小单位的坐标进行变换（缩放，旋转，位移）得到最终坐标
//         let tempVector: cc.Vec2 = cc.v2();
//         let scaleVector: cc.Vec2 = cc.v2(rx, ry);
//         let translateVector: cc.Vec2 = cc.v2(cx, cy);
//         for (let i = 0; i < bezierPoints.length; i += 2) {
//             tempVector.x = bezierPoints[i];
//             tempVector.y = bezierPoints[i + 1];
//             tempVector.scaleSelf(scaleVector).rotateSelf(angleRad).addSelf(translateVector);
//             bezierPoints[i] = tempVector.x;
//             bezierPoints[i + 1] = tempVector.y;
//         }

//         // The last point in the bezier set should match exactly the last coord pair in the arc (ie: x,y). But
//         // considering all the mathematical manipulation we have been doing, it is bound to be off by a tiny
//         // fraction. Experiments show that it can be up to around 0.00002.  So why don't we just set it to
//         // exactly what it ought to be.
//         bezierPoints[bezierPoints.length - 2] = x;
//         bezierPoints[bezierPoints.length - 1] = y;

//         // this.graphics.moveTo(lastX, lastY);
//         // // Final step is to add the bezier curves to the path
//         // for (let i = 0; i < bezierPoints.length; i += 6) {
//         //     this.graphics.bezierCurveTo(
//         //         bezierPoints[i],
//         //         bezierPoints[i + 1],
//         //         bezierPoints[i + 2],
//         //         bezierPoints[i + 3],
//         //         bezierPoints[i + 4],
//         //         bezierPoints[i + 5]
//         //     );
//         // }
//         // this.graphics.stroke();

//         // Final step is to add the bezier curves to the path

//         let bezierCureArray: BezierCurveToData[] = [];
//         for (let i = 0; i < bezierPoints.length; i += 6) {
//             bezierCureArray.push({
//                 cx1: bezierPoints[i],
//                 cy1: bezierPoints[i + 1],
//                 cx2: bezierPoints[i + 2],
//                 cy2: bezierPoints[i + 3],
//                 x: bezierPoints[i + 4],
//                 y: bezierPoints[i + 5],
//             });
//         }
//         return bezierCureArray;
//     }

//     // Check input to Math.acos() in case rounding or other errors result in a val < -1 or > +1.
//     // For example, see the possible KitKat JIT error described in issue #62.
//     private static checkedArcCos(val: number): number {
//         return val < -1.0 ? Math.PI : val > 1.0 ? 0 : Math.acos(val);
//     }

//     /*
//      * Generate the control points and endpoints for a set of bezier curves that match
//      * a circular arc starting from angle 'angleStart' and sweep the angle 'angleExtent'.
//      * The circle the arc follows will be centred on (0,0) and have a radius of 1.0.
//      *
//      * Each bezier can cover no more than 90 degrees, so the arc will be divided evenly
//      * into a maximum of four curves.
//      *
//      * The resulting control points will later be scaled and rotated to match the final
//      * arc required.
//      *
//      * The returned array has the format [x0,y0, x1,y1,...] and excludes the start point
//      * of the arc.
//      */
//     private static arcToBeziers(angleStart: number, angleExtent: number): number[] {
//         let numSegments: number = Math.ceil((Math.abs(angleExtent) * 2.0) / Math.PI); // (angleExtent / 90deg)

//         let angleIncrement: number = angleExtent / numSegments;

//         // The length of each control point vector is given by the following formula.
//         let controlLength: number = ((4.0 / 3.0) * Math.sin(angleIncrement / 2.0)) / (1.0 + Math.cos(angleIncrement / 2.0));

//         let coords: number[] = [];
//         let pos = 0;

//         for (let i = 0; i < numSegments; i++) {
//             let angle: number = angleStart + i * angleIncrement;
//             // Calculate the control vector at this angle
//             let dx: number = Math.cos(angle);
//             let dy: number = Math.sin(angle);
//             // First control point
//             coords[pos++] = dx - controlLength * dy;
//             coords[pos++] = dy + controlLength * dx;
//             // Second control point
//             angle += angleIncrement;
//             dx = Math.cos(angle);
//             dy = Math.sin(angle);
//             coords[pos++] = dx + controlLength * dy;
//             coords[pos++] = dy - controlLength * dx;
//             // Endpoint of bezier
//             coords[pos++] = dx;
//             coords[pos++] = dy;
//         }
//         return coords;
//     }
// }

// type BezierCurveToData = {
//     cx1: number;
//     cy1: number;
//     cx2: number;
//     cy2: number;
//     x: number;
//     y: number;
// };
