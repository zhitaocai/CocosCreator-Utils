const { ccclass, property } = cc._decorator;

/**
 * @author zhitaocai
 * @class 自定义状态 PageView Indicator
 * @classdesc 支持选中状态、不选中状态下采用不同的精灵
 *
 * 用法：
 *
 * 1. 将此脚本挂在到 Node 并指定本组件的 property 修饰的属性就可以
 *
 * 原理：
 *
 * * 此类为重写 cc.PageViewIndicator 源码中的 _changedState 方法，以支持不同状态下用不同精灵的目的
 * * 如果不生效，可能是你在使用的 cc 引擎版本的 cc.PageViewIndicator 的源码 _changedState 方法已经发生改动
 */
@ccclass
export default class StatePageViewIndicatorComponent extends cc.PageViewIndicator {
    @property({
        type: cc.SpriteFrame,
        tooltip: "默认状态（没有选中）下的精灵",
    })
    defaultSpriteFrame: cc.SpriteFrame = null;

    @property({
        type: cc.SpriteFrame,
        tooltip: "选中状态的精灵",
    })
    selectedSpriteFrame: cc.SpriteFrame = null;

    // 仅仅是为了不不报错，并没有重写修改
    private _indicators: cc.Node[];
    private _pageView: cc.PageView;

    // 重写 _changedState 函数
    _changedState() {
        let indicators = this._indicators;
        if (indicators.length === 0) {
            return;
        }
        let curPageIndex = this._pageView.getCurrentPageIndex();
        if (curPageIndex >= indicators.length) {
            return;
        }
        for (let i = 0; i < indicators.length; ++i) {
            let sprite: cc.Sprite = indicators[i].getComponent(cc.Sprite);
            if (i == curPageIndex) {
                sprite.spriteFrame = this.selectedSpriteFrame;
            } else {
                sprite.spriteFrame = this.defaultSpriteFrame;
            }
        }
    }
}
