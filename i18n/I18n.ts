import I18nLocalizedLabelComponent from "./I18nLocalizedLabelComponent";

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
        if (!key || key.length == 0) {
            throw new Error(`invalid key`);
        }
        let keyTree = key.split(".");
        let json = this.sCurLanguagePackageeJson;
        for (let i = 0; i < keyTree.length; i++) {
            if (!json.hasOwnProperty(keyTree[i])) {
                throw new Error(`can not find ${keyTree[i]} in ${key}`);
            }
            if (i != keyTree.length - 1) {
                json = json[keyTree[i]];
            } else {
                return json[keyTree[i]];
            }
        }
    }

    /**
     * 设置语言包（JSON格式）
     *
     * @package json 语言包（JSON格式）
     */
    static setLanguagePackageJson(json: any) {
        this.sCurLanguagePackageeJson = json;
    }

    /**
     * 立即更新语言包
     */
    static updateLanguage() {
        cc.director.emit(I18nLocalizedLabelComponent.EVENT_ON_I18N_LANGUAGE_LOADED);
    }
}
