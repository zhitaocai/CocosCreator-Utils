const { ccclass, property } = cc._decorator;

/**
 * @class Show All 模式适配工具类
 * @classdesc SHOWALL 模式适配工具类
 * @author caizhitao
 * @version 0.1.0
 * @since 2019-03-18
 */
export class MultiResolutionAdapterUtil {
	static designResolutionWidth = 720;
	static designResolutionHeight = 1280;

	/**
	 * 初始化设计分辨率
	 * @param width 设计分辨率宽度
	 * @param height 设计分辨率高度
	 */
	static init(width: number, height: number) {
		this.designResolutionWidth = width;
		this.designResolutionHeight = height;
	}

	/**
	 * 计算当前游戏设计分辨率在ShowAll模式适配后，设计分辨率做出的缩放值
	 */
	static getScale(): number {
		return Math.min(
			cc.view.getCanvasSize().width / this.designResolutionWidth,
			cc.view.getCanvasSize().height / this.designResolutionHeight
		);
	}

	/**
	 * 计算当前游戏设计分辨率在ShowAll模式适配后，设计分辨率下的界面高度在画布分辨率下的实际高度
	 */
	static getHeightInCanvas(): number {
		return this.designResolutionHeight * this.getScale();
	}

	/**
	 * 计算当前游戏设计分辨率在ShowAll模式适配后，设计分辨率下的界面宽度在画布分辨率下的实际宽度
	 */
	static getWidthInCanvas(): number {
		return this.designResolutionWidth * this.getScale();
	}

	/**
	 * 将设计分辨率下的坐标转换为画布分辨率下的坐标
	 *
	 * @param vec2InDesign 设计分辨率下的坐标
	 */
	static convertVec2ToCanvasResolution(vec2InDesign: cc.Vec2) {
		return vec2InDesign.mul(this.getScale());
	}

	/**
	 * 将画布分辨率下的坐标转换为设计分辨率下的坐标
	 *
	 * @param vec2InCanvas 画布分辨率下的坐标
	 */
	static convertVec2ToDesignResolution(vec2InCanvas: cc.Vec2) {
		return vec2InCanvas.div(cc.v2(this.getScale(), this.getScale()));
	}

	/**
	 * 将设计分辨率下的x轴方向长度转换为画布分辨率下的的x轴方向长度
	 *
	 * @param xInDesign 设计分辨率下的x轴方向长度
	 */
	static convertXToCanvasResolution(xInDesign: number) {
		return xInDesign * this.getScale();
	}

	/**
	 * 将画布分辨率下的x轴方向长度转换为设计分辨率下的的x轴方向长度
	 *
	 * @param xInCanvas 画布分辨率下的x轴方向长度
	 */
	static convertXToDesignResolution(xInCanvas: number) {
		return xInCanvas / this.getScale();
	}

	/**
	 * 将设计分辨率下的y轴方向长度转换为画布分辨率下的的y轴方向长度
	 *
	 * @param yInDesign 设计分辨率下的y轴方向长度
	 */
	static convertYToCanvasResolution(yInDesign: number) {
		return yInDesign * this.getScale();
	}

	/**
	 * 将画布分辨率下的y轴方向长度转换为设计分辨率下的的y轴方向长度
	 *
	 * @param yInCanvas 画布分辨率下的y轴方向长度
	 */
	static convertYToDesignResolution(yInCanvas: number) {
		return yInCanvas / this.getScale();
	}

	/**
	 * 计算当前游戏设计分辨率在ShowAll模式适配后，上下边界的黑边之和在画布分辨率下的长度
	 */
	static getVerticalBorderLength(): number {
		return cc.view.getCanvasSize().height - this.getHeightInCanvas();
	}

	/**
	 * 计算当前游戏设计分辨率在ShowAll模式适配后，左右边界的黑边之和在画布分辨率下的长度
	 */
	static getHorizontalBorderLength(): number {
		return cc.view.getCanvasSize().width - this.getWidthInCanvas();
	}

	// /**
	//  * 计算当前游戏设计分辨率在ShowAll模式适配后，传入来的原始坐标在ShowAll模式下的「贴近屏幕底部」实际坐标值
	//  */
	// static getNodePositionCloseToBottom(nodePosInDesign: cc.Vec2): cc.Vec2 {
	//     let srcScaleForShowAll = ShowAllModeMultiResolutionAdapterUtil.getScale();
	//     let bottomBorderHeightInCanvas = ShowAllModeMultiResolutionAdapterUtil.getVerticalBorderLength() / 2;
	//     let srcNodePosYInCanvas = nodePosInDesign.y * srcScaleForShowAll;
	//     let finalNodePosYInCanvas = srcNodePosYInCanvas - bottomBorderHeightInCanvas;
	//     let nodePosYInDesign = finalNodePosYInCanvas / srcScaleForShowAll;
	//     return cc.v2(nodePosInDesign.x, nodePosYInDesign);
	// }
}
