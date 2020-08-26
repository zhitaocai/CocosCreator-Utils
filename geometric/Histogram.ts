import { Stack } from "../models/Stack";

/**
 * @author zhitaocai
 * @classdesc 直方图几何计算相关
 */
export class Histogram {
    /**
     * 计算直方图中的最大矩形面积，以及该最大矩形的起始下标、中、始位置和高度
     *
     * @param histogramHeight 直方图的高度数组
     *
     * @see https://blog.csdn.net/leonliu1995/article/details/78648157
     *
     * @returns
     *
     * 如果最大矩形存在多个方案，比如：
     *
     * * [1,2,3,4]这种升序情况，最大矩形可是从2到4，或者从3到4，面积都是6，此时此代码返回的最后面的一种结果，因为计算量会少一点（如果不理解，请看代码）
     * * [4,3,2,1]这种降序情况，最大矩形可是从0到2，或者从0到3，面积都是6，此时此代码返回的最前面的一种结果，因为计算量会少一点（如果不理解，请看代码）
     */
    static calculateMaxRect(histogramHeight: number[]): HistogramMaxRect {
        if (histogramHeight == null || histogramHeight.length == 0) {
            return null;
        }

        let maxSize = histogramHeight[0];
        let startIndex = 0;
        let endIndex = 1;

        // 保存下标的栈
        let stack = new Stack<number>();
        stack.push(0);
        let i = 1;

        while (i < histogramHeight.length || (i == histogramHeight.length && !stack.isEmpty())) {
            if (i != histogramHeight.length && (stack.isEmpty() || histogramHeight[i] >= histogramHeight[stack.last()])) {
                // 没有超出边界的前提下
                // 栈为空 或者 新的柱高度大于栈尾柱高度就入栈
                stack.push(i);
                i++;
            } else {
                // 到这里就表示超出边界了
                // 或者栈不为空并且新的柱高度小于栈尾柱高度

                // 栈中最高的柱的下标
                let topIndex = stack.pop();

                // 栈中最高的柱的高度
                let top = histogramHeight[topIndex];

                // 计算当前最大面积
                let curMaxSize = stack.isEmpty() ? top * i : top * (i - stack.last() - 1);
                if (curMaxSize > maxSize) {
                    maxSize = curMaxSize;

                    if (stack.isEmpty()) {
                        if (i == histogramHeight.length) {
                            // 对应 8338 这种在下标4往前过程中，在下标1中找到最大矩形
                            startIndex = topIndex - 1;
                            // 对应 1111 这种在下标4往前过程中，在下标0中找到最大矩形
                            if (startIndex < 0) {
                                startIndex = 0;
                            }
                        } else {
                            // 对应 33445500 这种情况
                            // 在i=6的时候，最后遍历到stack为空时，topIndex = 0
                            // 但是此时 i != length，所以经过上面计算后，
                            // startIndex = 5，但是期望是0
                            if (topIndex == 0) {
                                startIndex = topIndex;
                            } else {
                                // 对应 8321 这种在下标1往前过程中，在下标0中找到最大矩形
                                startIndex = i - topIndex - 1;
                            }
                        }
                    } else {
                        // 对应 1234 这种在下标4往前过程中，在下标2中找到最大矩形
                        // 此时 stack.last() 是下标1，因此要+1
                        startIndex = stack.last() + 1;
                    }
                    endIndex = i;
                }
            }
        }

        return {
            size: maxSize,
            startIndex: startIndex,
            endIndex: endIndex,
        };
    }

    static test() {
        //
        this._test(null, null);
        this._test([], null);
        //
        this._test([1], <HistogramMaxRect>{
            size: 1,
            startIndex: 0,
            endIndex: 1,
        });
        this._test([0], <HistogramMaxRect>{
            size: 0,
            startIndex: 0,
            endIndex: 1,
        });
        //
        this._test([1, 1, 1, 1], <HistogramMaxRect>{
            size: 4,
            startIndex: 0,
            endIndex: 4,
        });
        //
        this._test([1, 2, 3, 4], <HistogramMaxRect>{
            size: 6,
            startIndex: 2,
            endIndex: 4,
        });
        this._test([4, 3, 2, 1], <HistogramMaxRect>{
            size: 6,
            startIndex: 0,
            endIndex: 2,
        });
        //
        this._test([1, 2, 1], <HistogramMaxRect>{
            size: 3,
            startIndex: 0,
            endIndex: 3,
        });
        this._test([2, 1, 2], <HistogramMaxRect>{
            size: 3,
            startIndex: 0,
            endIndex: 3,
        });
        //
        this._test([1, 5, 1], <HistogramMaxRect>{
            size: 5,
            startIndex: 1,
            endIndex: 2,
        });
        this._test([5, 1, 5], <HistogramMaxRect>{
            size: 5,
            startIndex: 0,
            endIndex: 1,
        });
        //
        this._test([1, 3, 8, 1], <HistogramMaxRect>{
            size: 8,
            startIndex: 2,
            endIndex: 3,
        });
        this._test([8, 3, 1, 3], <HistogramMaxRect>{
            size: 8,
            startIndex: 0,
            endIndex: 1,
        });
        //
        this._test([8, 3, 3, 8], <HistogramMaxRect>{
            size: 12,
            startIndex: 0,
            endIndex: 4,
        });
        this._test([3, 8, 8, 3], <HistogramMaxRect>{
            size: 16,
            startIndex: 1,
            endIndex: 3,
        });
        //
        this._test([0, 8, 0, 3, 3, 8], <HistogramMaxRect>{
            size: 9,
            startIndex: 3,
            endIndex: 6,
        });
        this._test([0, 3, 0, 8, 4, 3], <HistogramMaxRect>{
            size: 9,
            startIndex: 3,
            endIndex: 6,
        });
        this._test([0, 3, 0, 8, 8, 3], <HistogramMaxRect>{
            size: 16,
            startIndex: 3,
            endIndex: 5,
        });
        this._test([2, 1, 5, 6, 2, 3], <HistogramMaxRect>{
            size: 10,
            startIndex: 2,
            endIndex: 4,
        });
        //
        this._test([3, 3, 4, 4, 5, 5, 0, 0], <HistogramMaxRect>{
            size: 18,
            startIndex: 0,
            endIndex: 6,
        });
        this._test([0, 0, 3, 3, 4, 4, 5, 5], <HistogramMaxRect>{
            size: 18,
            startIndex: 2,
            endIndex: 8,
        });
        this._test([0, 0, 3, 3, 4, 4, 5, 5, 0, 0], <HistogramMaxRect>{
            size: 18,
            startIndex: 2,
            endIndex: 8,
        });
    }

    private static _test(input: number[], expectResult: HistogramMaxRect) {
        if (CC_DEBUG) {
            let actResult = Histogram.calculateMaxRect(input);
            cc.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
            cc.log(`输入参数:`);
            cc.log(input);
            cc.log(`实际结果: `);
            cc.log(actResult);
            cc.log(`期望结果:`);
            cc.log(expectResult);
            if (
                (actResult == null && expectResult == null) ||
                (actResult.size == expectResult.size &&
                    actResult.startIndex == expectResult.startIndex &&
                    actResult.endIndex == expectResult.endIndex)
            ) {
                cc.log(`结果相等`);
            } else {
                cc.error(`结果不等`);
            }
        }
    }
}

/**
 * 最大矩形面积，以及该最大矩形的起始下标、中、始位置和高度
 */
export type HistogramMaxRect = {
    /**
     * 最大面积
     */
    size: number;

    /**
     * 起始下标(包含) ，实际区间为：[startIndex, endIndex)
     */
    startIndex: number;

    /**
     * 结束下标(不包含) ，实际区间为：[startIndex, endIndex)
     */
    endIndex: number;
};
