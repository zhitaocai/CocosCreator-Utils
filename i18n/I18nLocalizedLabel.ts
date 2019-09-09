import { I18n } from "./I18n";

const { ccclass, property } = cc._decorator;

/**
 * 挂载在含有 Label 组件的节点下，会自动将 Label 的语言更新为当前指定的文本id下的语言
 */
@ccclass
export default class I18nLocalizedLabel extends cc.Component {
	public static EVENT_ON_I18N_LANGUAGE_LOADED = "on_i18n_language_loaded";

	@property({
		tooltip: "绑定的文本ID"
	})
	labelId: string = "";

	onEnable() {
		this._onI18nLanguageLoaded();
		cc.director.on(I18nLocalizedLabel.EVENT_ON_I18N_LANGUAGE_LOADED, this._onI18nLanguageLoaded, this);
	}

	onDisable() {
		cc.director.off(I18nLocalizedLabel.EVENT_ON_I18N_LANGUAGE_LOADED, this._onI18nLanguageLoaded, this);
	}

	private _onI18nLanguageLoaded() {
		let label: cc.Label = this.getComponent(cc.Label);
		if (label == null) {
			return;
		}
		label.string = I18n.get(this.labelId);
	}
}
