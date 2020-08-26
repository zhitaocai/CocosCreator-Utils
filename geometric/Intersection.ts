/**
 * @author zhitaocai
 * @classdesc 辅助碰撞检测类，基本 cc.Instersection 保持一致，只是传入参数不再为 cc.Vec2， 以减少可能需要创建的对象
 *
 * @see https://github.com/cocos-creator/engine/blob/19698da168/cocos2d/core/collider/CCIntersection.js
 */
export class Intersection {
    /**
     * !#en Test whether the point is in the polygon
     * !#zh 测试一个点是否在一个多边形中
     * @method pointInPolygon
     * @param pointX 待判断点X坐标
     * @param pointY 带判断点Y坐标
     * @param polygons 多边形点集，格式为 [point0x,point0y,point1x,point1y,...]
     * @return {boolean}
     *
     * @see https://github.com/cocos-creator/engine/blob/19698da168/cocos2d/core/collider/CCIntersection.js#L297
     */
    static pointInPolygon(pointX: number, pointY: number, polygon: number[]) {
        var inside = false;

        if (polygon.length % 2 != 0) {
            throw new Error("invalid polygon");
        }

        // use some raycasting to test hits
        // https://github.com/substack/point-in-polygon/blob/master/index.js
        var length = polygon.length / 2;

        for (var i = 0, j = length - 1; i < length; j = i, i = i + 1) {
            var xi = polygon[i * 2],
                yi = polygon[i * 2 + 1],
                xj = polygon[j * 2],
                yj = polygon[j * 2 + 1],
                intersect = yi > pointY !== yj > pointY && pointX < ((xj - xi) * (pointY - yi)) / (yj - yi) + xi;

            if (intersect) inside = !inside;
        }

        return inside;
    }
}
