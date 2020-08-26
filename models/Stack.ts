/**
 * @author zhitaocai
 * @class 泛型栈
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 */
export class Stack<T> {
    private _array: Array<T>;

    public constructor() {
        this._array = new Array<T>();
    }
    /**
     * 往栈加入新的元素
     *
     * @param element 待加入元素
     */
    public push(element: T): boolean {
        if (element == null) {
            return false;
        }
        // adds one or more elements to the end of an array and returns the new length of the array.
        this._array.push(element);
        return true;
    }

    /**
     * 返回栈尾部元素，并从栈中移除
     *
     * @returns 取出的元素 或者 undefined(队列中没有元素时)
     */
    public pop(): T {
        //  removes the last element from an array and returns that element. This method changes the length of the array.
        return this._array.pop();
    }

    /**
     * 返回栈头部元素，不会从栈中移除
     */
    public first(): T {
        return this.isEmpty() ? null : this._array[0];
    }

    /**
     * 返回栈尾部元素，不会从栈中移除
     */
    public last(): T {
        return this.isEmpty() ? null : this._array[this.size() - 1];
    }

    /**
     * 放回当前栈大小
     */
    public size(): number {
        return this._array.length;
    }

    /**
     * 当前栈是否为空
     */
    public isEmpty(): boolean {
        return this.size() == 0;
    }

    /**
     * 清空栈，栈清空之后不能再继续使用
     */
    public clear() {
        delete this._array;
    }
}
