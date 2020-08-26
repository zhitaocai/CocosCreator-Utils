const { ccclass, property } = cc._decorator;

/**
 * @author zhitaocai
 * @classdesc 长按监听组件
 *
 * 1. 将本组件挂载在节点上
 * 2. 在属性检查器上设置对应的回调事件
 * 3. 长按挂载的节点，那么就会一直回调第2步中设置的事件
 *
 * @example
 *
 * ```
 *      假设第二步回调接受函数为 onTouch() 那么在这个函数的参数如下：
 *
 *      onTouch(touchCounter: number, customEventData?: any) {}
 *
 *      参数说明：
 *          * touchCounter 本次触摸次数
 *          * customEventData 在属性检查器中传入进来的 CustomEventData
 *  ```
 */
@ccclass
export default class LongTouchComponent extends cc.Component {
    @property({
        tooltip: "触摸回调间隔（秒）。假如为0.1，那么1秒内会回调10次 ${longTouchEvents} 事件数组",
    })
    touchInterval: number = 0.1;

    @property({
        readonly: true,
        tooltip: "是否支持多点触控（当前还不支持）",
    })
    enableMultiTouching: boolean = false;

    @property({
        type: [cc.Component.EventHandler],
        tooltip: "回调事件数组，每间隔 ${toucheInterval}s 回调一次",
    })
    longTouchEvents: cc.Component.EventHandler[] = [];

    /**
     * 触摸计数器，用于统计本次长按的回调次数
     */
    private _touchCounter: number = 0;

    /**
     * 标记当前是否在触摸这个节点
     */
    private _isTouching: boolean = false;

    onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }

    onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }

    private _onTouchStart(event: cc.Event.EventTouch) {
        // 这是为了不支持多点触控
        if (!this.enableMultiTouching) {
            if (this._isTouching) {
                return;
            }

            if (this.node.getBoundingBoxToWorld().contains(event.getLocation())) {
                this._isTouching = true;
            } else {
                this._isTouching = false;
            }

            if (this._isTouching) {
                // 第一次触摸立即回调一次
                this.publishOneTouch();

                // 然后开启计时器，计算后续的长按相当于触摸了多少次
                this.schedule(this._touchCounterCallback, this.touchInterval);
            }
        }
    }

    private _onTouchEnd(event: cc.Event.EventTouch) {
        this._isTouching = false;
        this._touchCounter = 0;
        this.unschedule(this._touchCounterCallback);
    }

    private _onTouchCancel(event: cc.Event.EventTouch) {
        this._isTouching = false;
        this._touchCounter = 0;
        this.unschedule(this._touchCounterCallback);
    }

    private _touchCounterCallback() {
        if (this._isTouching) {
            this.publishOneTouch();
        } else {
            this.unschedule(this._touchCounterCallback);
        }
    }

    /**
     * 通知出去：被点击/触摸了一次，长按时，会连续多次回调这个方法
     */
    private publishOneTouch() {
        if (!this._isTouching) {
            return;
        }
        this._touchCounter++;
        this.longTouchEvents.forEach((eventHandler: cc.Component.EventHandler) => {
            eventHandler.emit([this._touchCounter]);
        });
    }
}
