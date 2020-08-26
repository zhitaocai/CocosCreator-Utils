import { I18n } from "./I18n";

const { ccclass, property } = cc._decorator;

/**
 * @author zhitaocai
 * @classdesc 简易版 I18N Label
 *
 * 用法：
 *
 * 1. 挂载在含有 Label 组件的节点下，会自动将 Label 的语言更新为当前指定的文本id下的语言
 */
@ccclass
export default class I18nLocalizedLabelComponent extends cc.Component {
    public static EVENT_ON_I18N_LANGUAGE_LOADED = "on_i18n_language_loaded";

    @property({
        tooltip: "绑定的文本ID",
    })
    labelId: string = "";

    private _label: cc.Label = null;

    onLoad() {
        this._label = this.getComponent(cc.Label);
        if (!this._label) {
            throw new Error(`The node of the ${this.name} must be bound to the cc.Label component`);
        }
    }

    onEnable() {
        this._onI18nLanguageLoaded();
        cc.director.on(I18nLocalizedLabelComponent.EVENT_ON_I18N_LANGUAGE_LOADED, this._onI18nLanguageLoaded, this);
    }

    onDisable() {
        cc.director.off(I18nLocalizedLabelComponent.EVENT_ON_I18N_LANGUAGE_LOADED, this._onI18nLanguageLoaded, this);
    }

    private _onI18nLanguageLoaded() {
        if (this._label.enabled) {
            this._label.string = I18n.get(this.labelId);
        }
    }
}
