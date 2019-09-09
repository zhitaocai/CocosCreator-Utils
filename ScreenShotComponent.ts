const { ccclass, property } = cc._decorator;

export type ScreenShotModel = {
	/**
	 * 图片 base64 编码字符串
	 */
	base64String: string;
};

/**
 * @classdesc 截图组件
 * @author caizhitao
 * @version 0.1.0
 * @since 2019-04-15
 * @description
 *
 * 1. 将本组件挂载在节点上
 * 2. 写上对应的属性内容
 * 3. 调用本组件的 asyncLoadSceneShot 方法即可实现截图，并得到截图的Base64String
 *
 * ps: 部分 api 在 creator.d.ts 中没有说明或没有对上，因此编辑器可能会提示小红点
 */
@ccclass
export default class ScreenShotComponent extends cc.Component {
	@property({
		type: cc.Camera,
		tooltip: "截图摄像机，该摄像机镜头下的内容会被全屏接下来"
	})
	camera: cc.Camera = null;

	@property({
		tooltip: "截图内容中是否包含Mask组件"
	})
	hasMask: boolean = false;

	onLoad() {
		// 禁止摄像机自动绘制
		this.camera.enabled = false;
	}

	/**
	 * 异步获取截图Base64字符串
	 *
	 * @returns 截图的Base64String
	 */
	async asyncLoadScreenShotBase64String(param: {
		/**
		 * 截图宽度像素
		 */
		width: number;

		/**
		 * 截图高度像素
		 */
		height: number;
	}): Promise<string> {
		try {
			// 设置截图大小
			// 特别要注意这里，因为部分手机是浮点数，那么可能会到值读取数据的时候越界之类，因此需要取整
			param.width = Math.floor(param.width);
			param.height = Math.floor(param.height);

			let startTime = null;
			if (CC_DEBUG) {
				startTime = new Date().getTime();
			}
			let textureData = await this._asyncLoadPixels(param.width, param.height);
			let canvas = await this._asyncWriteDataToCanvas(textureData, param.width, param.height);
			let base64String = await this._asyncConvertCanvaseImageToBase64String(canvas);
			if (CC_DEBUG) {
				cc.log(`本次截图总耗时: ${new Date().getTime() - startTime} ms`);
			}
			return base64String;
		} catch (error) {
			if (CC_DEBUG) {
				cc.error("截图出现错误");
				cc.error(error);
			}
			throw error;
		}
	}
	/**
	 * 获取截图Unit8Array数据
	 *
	 * @returns 截图的Unit8Array，内容是上下翻转的，可以重新解析的时候，可以通过  renderTexture.setFlipY(true) 调整回来
	 */
	loadScreenShotUnit8Array(param: {
		/**
		 * 截图宽度像素
		 */
		width: number;

		/**
		 * 截图高度像素
		 */
		height: number;
	}) {
		try {
			// 设置截图大小
			// 特别要注意这里，因为部分手机是浮点数，那么可能会到值读取数据的时候越界之类，因此需要取整

			if (!Number.isInteger(param.width)) {
				throw new Error(`width should be integer. current width is ${param.width}`);
			}
			if (!Number.isInteger(param.height)) {
				throw new Error(`height should be integer. current height is ${param.height}`);
			}

			let startTime = null;
			if (CC_DEBUG) {
				startTime = new Date().getTime();
			}
			// 新建一个 RenderTexture，并且设置 camera 的 targetTexture 为新建的 RenderTexture，这样 camera 的内容将会渲染到新建的 RenderTexture 中。
			let renderTexture = new cc.RenderTexture();

			// 初始化纹理大小，如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
			if (this.hasMask) {
				renderTexture.initWithSize(param.width, param.height, cc.game._renderContext.STENCIL_INDEX8);
			} else {
				renderTexture.initWithSize(param.width, param.height);
			}
			this.camera.targetTexture = renderTexture;

			// 渲染一次摄像机，即更新一次内容到 RenderTexture 中
			this.camera.render();

			// 这样我们就能从 RenderTexture 中获取到数据了
			// 图片用32bit位表示一个像素，所以一行有width个像素，一共是width*32/8bit = width*4字节
			// 乘以高度之后就是图片总大小，也就是 (height * width * 4)
			let textureData: Uint8Array = new Uint8Array(param.width * param.height * 4);
			renderTexture.readPixels(textureData);

			// 因为 RenderTexture 得到的纹理是上下翻转的，一般是需要手动旋转回来，但是因为我们又用renderTexture去渲染，所以相当于不用我们操作
			// renderTexture.setFlipY(true);

			// 手动调整Y轴翻转
			textureData = this._filpYImage(textureData, param.width, param.height);

			if (CC_DEBUG) {
				cc.log(`本次截图总耗时: ${new Date().getTime() - startTime} ms`);
			}
			return textureData;
		} catch (error) {
			if (CC_DEBUG) {
				cc.error("截图出现错误");
				cc.error(error);
			}
			throw error;
		}
	}

	/**
	 * 因为 RenderTexture 得到的纹理数据是上下翻转的，所以需要旋转回来
	 *
	 * @see https://github.com/cocos-creator/example-cases/blob/v2.0/assets/cases/07_capture_texture/capture_to_native.js#L81
	 */
	private _filpYImage(data: Uint8Array, width: number, height: number): Uint8Array {
		// create the data array
		let picData = new Uint8Array(width * height * 4);
		let rowBytes = width * 4;
		for (let row = 0; row < height; row++) {
			let srow = height - 1 - row;
			let start = srow * width * 4;
			let reStart = row * width * 4;
			// save the piexls data
			for (let i = 0; i < rowBytes; i++) {
				picData[reStart + i] = data[start + i];
			}
		}
		return picData;
	}

	/**
	 * 获取摄像机渲染到指定纹理后的图像数据
	 *
	 * 总共有两个耗时地方
	 *
	 * 1. 摄像机渲染。耗时视机型性能，渲染内容多少不定，但是首次渲染是比较耗时的
	 * 2. 读取纹理数据。每次读取的耗时基本稳定，视不同机型性能，耗时不定
	 */
	private _asyncLoadPixels(width: number, height: number) {
		return new Promise<Uint8Array>((resolve, reject) => {
			// 新建一个 RenderTexture，并且设置 camera 的 targetTexture 为新建的 RenderTexture，这样 camera 的内容将会渲染到新建的 RenderTexture 中。
			let renderTexture = new cc.RenderTexture();
			// 初始化纹理大小，如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
			renderTexture.initWithSize(width, height, cc.game._renderContext.STENCIL_INDEX8);
			this.camera.targetTexture = renderTexture;

			// 渲染一次摄像机，即更新一次内容到 RenderTexture 中
			this.camera.render();

			// 这样我们就能从 RenderTexture 中获取到数据了
			// 图片用32bit位表示一个像素，所以一行有width个像素，一共是width*32/8bit = width*4字节
			// 乘以高度之后就是图片总大小，也就是 (height * width * 4)
			let textureData: Uint8Array = new Uint8Array(width * height * 4);
			renderTexture.readPixels(textureData);

			// 下面的这个写法有兼容性问题，iPhone 5上不行
			// let data = renderTexture.readPixels();

			resolve(textureData);
		});
	}

	/**
	 * 将图像数据写入到 Canvas
	 */
	private _asyncWriteDataToCanvas(textureData: Uint8Array, width: number, height: number) {
		return new Promise<HTMLCanvasElement>((resolve, reject) => {
			// 接下来就可以对这些数据进行操作了
			// 创建一个新的画布
			let canvas = document.createElement("canvas");
			let ctx = canvas.getContext("2d");
			canvas.width = width;
			canvas.height = height;

			// 将刚刚的渲染数据渲染到新的画布上
			// 图片用32bit位表示一个像素大小，而一行有 width 个像素，所以一行的字节大小为 width * 32 / 8 = width * 4 bytes
			let rowBytes = width * 4;

			// 依次读取图片里的每行数据，放入到ctx中。
			for (let row = 0; row < height; row++) {
				let srow = height - 1 - row;
				let start = Math.floor(srow * width * 4);
				let oneLineImageData = new Uint8ClampedArray(textureData.buffer, start, rowBytes);
				let imageData = ctx.createImageData(width, 1);
				for (let i = 0; i < oneLineImageData.length; i++) {
					imageData.data[i] = oneLineImageData[i];
				}
				ctx.putImageData(imageData, 0, row);
			}
			resolve(canvas);
		});
	}

	/**
	 * 将 Canvas 画布内容转换为 Base64String
	 *
	 * 一般这步可能会比较耗时，在低端机型上
	 */
	private _asyncConvertCanvaseImageToBase64String(canvas: HTMLCanvasElement) {
		return new Promise<string>((resolve, reject) => {
			// 获取地图Url，其实是一个base64的字符串
			let s5 = null;
			if (CC_DEBUG) {
				s5 = new Date().getTime();
			}
			let dataUrl = canvas.toDataURL("image/png");
			if (CC_DEBUG) {
				cc.log(`生成 dataUrl 耗时: ${new Date().getTime() - s5} ms`);
			}
			resolve(dataUrl);
		});
	}
}
