import { Intersection } from "./Intersection";

/**
 * @author zhitaocai
 * @classdesc 多边形辅助类
 */
export class Polygon {
    /**
     * 计算多边形的最小外接矩形
     *
     * @param points 多边形
     */
    static calculateMinEnclosingRectangle(points: cc.Vec2[]): cc.Rect {
        if (points == null || points.length == 0) {
            return null;
        }

        // 计算 <path> 所描述的图形最小外切矩形
        let leftBottomX = Infinity;
        let leftBottomY = -Infinity;
        let rightTopX = -Infinity;
        let rightTopY = Infinity;
        points.forEach((point: cc.Vec2) => {
            if (point.x < leftBottomX) {
                leftBottomX = point.x;
            }
            if (point.y > leftBottomY) {
                leftBottomY = point.y;
            }
            if (point.x > rightTopX) {
                rightTopX = point.x;
            }
            if (point.y < rightTopY) {
                rightTopY = point.y;
            }
        });
        return cc.rect(leftBottomX, leftBottomY, Math.abs(rightTopX - leftBottomX), Math.abs(leftBottomY - rightTopY));
    }

    /**
     * 计算多边形的最小外接矩形
     *
     * @param points 多边形点集 [point0x, point0y, point1x, point1y, ...]
     *
     * @return rect [leftBottomX, leftBottomY, width, height]
     */
    static calculateMinEnclosingRectangle2(points: number[]): number[] {
        if (points == null || points.length == 0) {
            return null;
        }
        if (points.length % 2 != 0) {
            throw new Error("invalid points");
        }

        // 计算 <path> 所描述的图形最小外切矩形
        let leftBottomX = Infinity;
        let leftBottomY = -Infinity;
        let rightTopX = -Infinity;
        let rightTopY = Infinity;

        for (let i = 0; i < points.length; i = i + 2) {
            if (points[i] < leftBottomX) {
                leftBottomX = points[i];
            }
            if (points[i] > rightTopX) {
                rightTopX = points[i];
            }
            if (points[i + 1] > leftBottomY) {
                leftBottomY = points[i + 1];
            }
            if (points[i + 1] < rightTopY) {
                rightTopY = points[i + 1];
            }
        }
        let rect = [];
        rect.push(leftBottomX);
        rect.push(leftBottomY);
        rect.push(Math.abs(rightTopX - leftBottomX));
        rect.push(Math.abs(leftBottomY - rightTopY));
        return rect;
    }

    /**
     * 根据格林公式判断多边形是否为顺时针
     *
     * @returns true:顺时针 false:逆时针
     */
    static isClockwise(points: cc.Vec2[]) {
        if (points == null || points.length == 0) {
            return true;
        }

        //沿着多边形的边求曲线积分,若积分为正,则是沿着边界曲线正方向(逆时针),反之为顺时针
        let d: number = 0;
        for (let i = 0; i < points.length - 1; ++i) {
            d += -0.5 * (points[i + 1].y + points[i].y) * (points[i + 1].x - points[i].x);
        }

        //这条边不能忘记
        d += -0.5 * (points[0].y + points[points.length - 1].y) * (points[0].x - points[points.length - 1].x);

        //小于零为顺时针，大于零为逆时针
        return d < 0;
    }

    /**
     * 根据格林公式判断多边形是否为顺时针
     *
     * @param points 多边形点集 [point0x, point0y, point1x, point1y, ...]
     *
     * @returns true:顺时针 false:逆时针
     */
    static isClockwise2(points: number[]) {
        if (points.length % 2 != 0) {
            throw new Error("invalid points");
        }
        let ccPoints = [];
        for (let i = 0; i < points.length; i = i + 2) {
            ccPoints.push(cc.v2(points[i], points[i + 1]));
        }
        return this.isClockwise(ccPoints);
    }

    /**
     * 求出多边形数组中，一个能包含其他所有多多边形的最大多边形
     *
     * @param polygons 二维数组，1维为多边形，2维为多边型点集。e.g. 0数组格式为 [[p0x, p0y, p1x, p1y, ...], [p0x, p0y, p1x, p1y, ...]]
     *
     * @returns 最大多边形的下标在数组中的下标，如果多边形不是相互包含关系，那么最后会返回0，即第一个为最大多边形，哪怕他不是最大的能包含其他多边形，所以调用此函数时要确保多边形数组中的多边形是相互包含关系，只是还不知道哪个是最大的
     */
    static caculateMaxPolygon(polygons: number[][]): number {
        // 先假设下标为0的多边形为最大多边形
        let maxPolygonIndex: number = 0;
        for (let polygonIndex = 1; polygonIndex < polygons.length; ++polygonIndex) {
            let curPolygon: number[] = polygons[polygonIndex];
            for (let pointIndex = 0; pointIndex < curPolygon.length; pointIndex += 2) {
                // 如果当前待判断多边形有一个点不在当前已知的最大多边形内，那么标记当前多边形为最大多边形
                if (!Intersection.pointInPolygon(curPolygon[pointIndex], curPolygon[pointIndex + 1], polygons[maxPolygonIndex])) {
                    // maxPolygonIndex = polygonIndex;
                    // 补充，点不在已知最大多边形内时，可能当前多边形和最大多边形是相交关系
                    // 这是通过计算面积来计算谁是最大的来处理
                    let curArea = this.caculatePolygonArea(curPolygon);
                    let maxArea = this.caculatePolygonArea(polygons[maxPolygonIndex]);
                    if (curArea > maxArea) {
                        maxPolygonIndex = polygonIndex;
                    }
                    if (CC_DEBUG) {
                        cc.log(
                            `第 ${polygonIndex} 个多边形的点(${curPolygon[pointIndex]}, ${
                                curPolygon[pointIndex + 1]
                            })不在当前最大多边形(下标: ${maxPolygonIndex})内，因此第 ${polygonIndex} 个多边形有可能为更大的多边形
                            将继续检查第 ${polygonIndex} 个多边形的面积是否比当前最大多边形面积大关系，以确保是否为最大多边形
                            检查发现第 ${polygonIndex} 个多边形的面积(${curArea}) ${
                                curArea > maxArea ? "大于" : "小于等于"
                            }当前最大多边形面积(${maxArea})
                            因此当前最大多边形下标为 ${curArea > maxArea ? polygonIndex : maxPolygonIndex}
                            `
                        );
                    }
                    break;
                }
            }
        }
        return maxPolygonIndex;
    }

    /**
     * 计算多边形面积
     *
     * @param polygons 多边形点集 [p0x, p0y, p1x, p1y, ...]
     *
     * @see https://codepen.io/anon/pen/axrZPZ
     */
    static caculatePolygonArea(polygons: number[]): number {
        let j = 0;
        let area = 0;
        for (let i = 0; i < polygons.length; i = i + 2) {
            j = (i + 2) % polygons.length;
            area += polygons[i] * polygons[j + 1];
            area -= polygons[i + 1] * polygons[j];
        }
        area /= 2;
        return area < 0 ? -area : area;
        // let j = 0;
        // let area = 0;
        // for (let i = 0; i < polygons.length; i = i + 2) {
        //     j = (i + 2) % polygons.length;
        //     let ix = polygons[i];
        //     let iy = polygons[i + 1];
        //     let jx = polygons[j];
        //     let jy = polygons[j + 1];
        //     area += ix * jy;
        //     area -= iy * jx;
        // }
        // area /= 2;
        // return area < 0 ? -area : area;
    }
}
