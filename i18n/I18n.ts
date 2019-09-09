import I18nLocalizedLabel from "./I18nLocalizedLabel";

/**
 * 简易版 I18N 语言管理器
 */
export class I18n {
	private static sCurLanguagePackageeJson: any = {};

	/**
	 * 获取指定 key 的在当前语言包下的文本
	 *
	 * @param key 指定key，支持嵌套
	 */
	static get(key: string): string {
		if (key == null || key.trim().length == 0) {
			throw new Error(`key 无效，无法加载到对应的语言`);
		}
		let keyArray = key.split(".");
		let json = this.sCurLanguagePackageeJson;
		for (let i = 0; i < keyArray.length; i++) {
			if (!json.hasOwnProperty(keyArray[i])) {
				throw new Error(`找不到 ${key} 中 ${keyArray[i]} 对应的值`);
			}
			if (i != keyArray.length - 1) {
				json = json[keyArray[i]];
			} else {
				return json[keyArray[i]];
			}
		}
	}

	/**
	 * 设置语言包（JSON格式）
	 *
	 * @package json
	 */
	static setLanguagePackageJson(json: any) {
		this.sCurLanguagePackageeJson = json;
	}

	/**
	 * 立即更新语言包
	 */
	static updateLanguage() {
		cc.director.emit(I18nLocalizedLabel.EVENT_ON_I18N_LANGUAGE_LOADED);
	}
}
