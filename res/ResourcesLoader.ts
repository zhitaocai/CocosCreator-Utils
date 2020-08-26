// /**
//  * 资源加载器
//  */
// export class ResourcesLoader {
// 	/**
// 	 * 加载 Resources 中的图集
// 	 *
// 	 * @param spriteAtlasUrl Resources 中图集地址
// 	 */
// 	static loadSpriteAtlasFromResources(spriteAtlasUrl: string) {
// 		return new Promise<cc.SpriteAtlas>((resolve, reject) => {
// 			cc.loader.loadRes(spriteAtlasUrl, cc.SpriteAtlas, (error: Error, spriteAtlas: cc.SpriteAtlas) => {
// 				if (error != null) {
// 					if (CC_DEBUG) {
// 						cc.error(`load (${spriteAtlasUrl}) failed!`);
// 						cc.error(error);
// 					}
// 					reject(error);
// 					return;
// 				}
// 				resolve(spriteAtlas);
// 			});
// 		});
// 	}

// 	/**
// 	 * 加载 Resources 中图片地址
// 	 *
// 	 * @param spriteFrameUrl Resources 中图片地址
// 	 */
// 	static loadSpriteFrameFromResources(spriteFrameUrl: string) {
// 		return new Promise<cc.SpriteFrame>((resolve, reject) => {
// 			cc.loader.loadRes(spriteFrameUrl, cc.SpriteFrame, (error: Error, spriteFrame) => {
// 				if (error != null) {
// 					if (CC_DEBUG) {
// 						cc.error(`load (${spriteFrameUrl}) failed!`);
// 						cc.error(error);
// 					}
// 					reject(error);
// 					return;
// 				}
// 				resolve(spriteFrame);
// 			});
// 		});
// 	}

// 	/**
// 	 * 加载远程图片
// 	 *
// 	 * @param imageUrl 图片地址（必须包含图片格式后缀的地址，如: .jpeg, .png）
// 	 */
// 	static loadSpriteFrameFromRemote(imageUrl: string) {
// 		return new Promise<cc.SpriteFrame>((resolve, reject) => {
// 			cc.loader.load(imageUrl, (error: Error, texture: cc.Texture2D) => {
// 				if (error) {
// 					if (CC_DEBUG) {
// 						cc.error(`load (${imageUrl}) failed!`);
// 						cc.error(error);
// 					}
// 					reject(error);
// 					return;
// 				}
// 				resolve(new cc.SpriteFrame(texture));
// 			});
// 			// // 图片地址不含后缀的加载方法
// 			// cc.loader.load(
// 			//     {
// 			//         url: imageUrl,
// 			//         type: "png"
// 			//     },
// 			//     (error: Error, texture: cc.Texture2D) => {
// 			//         if (error) {
// 			//             if (CC_DEBUG) {
// 			//                 cc.error(`load (${imageUrl}) failed!`);
// 			//                 cc.error(error);
// 			//             }
// 			//             reject(error);
// 			//             return;
// 			//         }
// 			//         resolve(new cc.SpriteFrame(texture));
// 			//     }
// 			// );
// 		});
// 	}

// 	/**
// 	 * 加载原生本地图片
// 	 *
// 	 * @param imageUrl 图片的绝对地址
// 	 */
// 	static loadSpriteFrameFromDevice(imageUrl: string) {
// 		return new Promise<cc.SpriteFrame>((resolve, reject) => {
// 			// 用绝对路径加载设备存储内的资源，比如相册
// 			cc.loader.load(imageUrl, (error: Error, texture: cc.Texture2D) => {
// 				if (error) {
// 					if (CC_DEBUG) {
// 						cc.error(`load (${imageUrl}) failed!`);
// 						cc.error(error);
// 					}
// 					reject(error);
// 					return;
// 				}
// 				resolve(new cc.SpriteFrame(texture));
// 			});
// 		});
// 	}

// 	/**
// 	 * 加载文本
// 	 *
// 	 * @param url .txt 文本文件在 resources 目录中的路径
// 	 */
// 	static loadTextFromResources(url: string): Promise<string> {
// 		return new Promise<string>((resolve, reject) => {
// 			cc.loader.loadRes(url, cc.TextAsset, function(error: Error, resource: cc.TextAsset) {
// 				if (error) {
// 					if (CC_DEBUG) {
// 						cc.error(`load (${url}) failed!`);
// 						cc.error(error);
// 					}
// 					reject(error);
// 					return;
// 				}
// 				resolve(resource.text);
// 			});
// 		});
// 	}

// 	/**
// 	 * 加载指定目录的所有文本
// 	 *
// 	 * @param resDirPath 目录名字
// 	 */
// 	static loadTextFilesFromResources(resDirPath: string): Promise<TextFile[]> {
// 		return new Promise<TextFile[]>((resolve, reject) => {
// 			cc.loader.loadResDir(
// 				resDirPath,
// 				cc.TextAsset,
// 				// 每加载一个资源都会回调这里
// 				// 可能会连续多次次出现加载相同进度
// 				// ps:
// 				// 当前已经加载进度(9/34)
// 				// 当前已经加载进度(9/34)
// 				// completedCount 已经加载完毕的数量
// 				// totalCount 总数量
// 				// item 最后一个加载成功的 （官方原话：The latest item which flow out the pipeline.）
// 				(completedCount: number, totalCount: number, item: any) => {
// 					// if (cb.onProgress != null) {
// 					//     cb.onProgress(Math.round((completedCount * 100) / totalCount), completedCount, totalCount);
// 					// }
// 				},

// 				// 当所有的资源都加载完毕的时候，或者其中一个资源加载失败的时候会立即回调下面这个方法
// 				// error 当其中一个资源加载失败的时候，会立即回调这个方法，同时本参数携带错误描述，如果都加载成功，那么这个参数为空
// 				// resources 所有成功加载的资源
// 				// urls 所有加载成功的资源的URLs
// 				(error: Error, resources: cc.TextAsset[], urls: string[]) => {
// 					if (error != null) {
// 						if (CC_DEBUG) {
// 							cc.error(`有资源加载失败 ${error.message}`);
// 						}
// 						reject(error);
// 						return;
// 					}

// 					if (CC_DEBUG) {
// 						cc.log(`成功加载 ${resources.length} 个资源，对应 ${urls.length} 个资源相对路径地址`);
// 						if (resources.length != urls.length) {
// 							cc.error("资源数量和路径数量不一致，建议检查一下");
// 						}
// 					}

// 					let result: TextFile[] = [];
// 					for (let i = 0; i < resources.length; i++) {
// 						let resource = resources[i];
// 						result.push({
// 							fileName: resource.name,
// 							text: resource.text
// 						});
// 					}
// 					resolve(result);
// 				}
// 			);
// 		});
// 	}

// 	/**
// 	 * 加载文本
// 	 *
// 	 * @param url 文本在服务器中的地址，后缀名为 .txt
// 	 */
// 	static loadTextFromRemote(param: {
// 		/**
// 		 * 文本的网络地址
// 		 */
// 		url: string;

// 		/**
// 		 * 下载超时时间（毫秒），默认10000毫秒
// 		 */
// 		timeout: number;
// 	}): Promise<string> {
// 		return new Promise<string>((resolve, reject) => {
// 			// cc.loader.load 在原生平台上不支持加载 图片之外的资源，因此原生平台上用 XHR 来代替请求
// 			if (CC_JSB) {
// 				let xhr = new XMLHttpRequest();
// 				xhr.timeout = param.timeout ? param.timeout : 10000;
// 				xhr.ontimeout = function() {
// 					let error = new Error(`Error! ${param.url} Request Timeout`);
// 					if (CC_DEBUG) {
// 						cc.error(error);
// 					}
// 					reject(error);
// 				};
// 				xhr.onerror = function() {
// 					let error = new Error(`Error! ${param.url} Request Error`);
// 					if (CC_DEBUG) {
// 						cc.error(error);
// 					}
// 					reject(error);
// 				};
// 				xhr.onload = function() {
// 					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
// 						try {
// 							resolve(xhr.responseText);
// 						} catch (error) {
// 							reject(error);
// 						}
// 					} else {
// 						let error = new Error(`Error! Http Code: ${xhr.status}`);
// 						if (CC_DEBUG) {
// 							cc.error(error);
// 						}
// 						reject(error);
// 					}
// 				};
// 				xhr.responseType = "arraybuffer";
// 				xhr.open("GET", param.url, true);
// 				xhr.send();
// 			} else {
// 				// 视乎链接后缀是否存在 .txt ，需要采用不同的api调用方式
// 				if (param.url.endsWith(".txt")) {
// 					cc.loader.load(param.url, (error: Error, textAsset: any) => {
// 						if (error) {
// 							if (CC_DEBUG) {
// 								cc.error(`load (${param.url}) failed!`);
// 								cc.error(error);
// 							}
// 							reject(error);
// 							return;
// 						}
// 						resolve(textAsset);
// 					});
// 				} else {
// 					cc.loader.load(param.url, (error: Error, textAsset: cc.TextAsset) => {
// 						if (error) {
// 							if (CC_DEBUG) {
// 								cc.error(`load (${param.url}) failed!`);
// 								cc.error(error);
// 							}
// 							reject(error);
// 							return;
// 						}
// 						resolve(textAsset.text);
// 					});
// 				}
// 			}
// 		});
// 	}

// 	/**
// 	 * 加载Json
// 	 *
// 	 * @param url .json 文本文件在 resources 目录中的路径
// 	 */
// 	static loadJsonFromResources(url: string): Promise<any> {
// 		return new Promise<any>((resolve, reject) => {
// 			cc.loader.loadRes(url, cc.JsonAsset, (error: Error, resource: cc.JsonAsset) => {
// 				if (error) {
// 					if (CC_DEBUG) {
// 						cc.error(`load (${url}) failed!`);
// 						cc.error(error);
// 					}
// 					reject(error);
// 					return;
// 				}
// 				resolve(resource.json);
// 			});
// 		});
// 	}

// 	/**
// 	 * 加载 Prefab
// 	 *
// 	 * @param url Prefab 在 resources 目录中的路径
// 	 */
// 	static loadPrefabFromResources(url: string): Promise<cc.Prefab> {
// 		return new Promise<cc.Prefab>((resolve, reject) => {
// 			cc.loader.loadRes(url, cc.Prefab, (error: Error, resource: cc.Prefab) => {
// 				if (error) {
// 					if (CC_DEBUG) {
// 						cc.error(`load (${url}) failed!`);
// 						cc.error(error);
// 					}
// 					reject(error);
// 					return;
// 				}
// 				resolve(resource);
// 			});
// 		});
// 	}

// 	/**
// 	 * 加载 字体 资源
// 	 *
// 	 * @param url Font 在 resources 目录中的路径
// 	 */
// 	static loadFont(url: string): Promise<cc.Font> {
// 		return new Promise<cc.Font>((resolve, reject) => {
// 			cc.loader.loadRes(url, cc.Font, (error: Error, resource: cc.Font) => {
// 				if (error) {
// 					if (CC_DEBUG) {
// 						cc.error(`load (${url}) failed!`);
// 						cc.error(error);
// 					}
// 					reject(error);
// 					return;
// 				}
// 				resolve(resource);
// 			});
// 		});
// 	}

// 	/**
// 	 * 释放 resources 目录指定资源路径
// 	 *
// 	 * @param resPathInResources 在 resources 中的资源路径
// 	 * @param type 资源类型
// 	 */
// 	static releaseRes(resPathInResources: string, type?: Function): void {
// 		cc.loader.releaseRes(resPathInResources, type);
// 	}

// 	/**
// 	 * 下载图片到本地
// 	 */
// 	static savePicToDevice(param: {
// 		/**
// 		 * 图片的网络地址
// 		 */
// 		imageUrl: string;

// 		/**
// 		 * 图片存储在本地的绝对地址
// 		 */
// 		localImageAbsPath: string;

// 		/**
// 		 * 下载超时时间（毫秒），默认10000毫秒
// 		 */
// 		timeout: number;
// 	}) {
// 		return new Promise((resolve, reject) => {
// 			if (param.imageUrl == null || param.imageUrl == "") {
// 				let error = new Error(`image url null`);
// 				if (CC_DEBUG) {
// 					cc.error(error);
// 				}
// 				reject(error);
// 				return;
// 			}

// 			if (param.localImageAbsPath == null || param.localImageAbsPath == "") {
// 				let error = new Error(`localImageAbsPath null`);
// 				if (CC_DEBUG) {
// 					cc.error(error);
// 				}
// 				reject(error);
// 				return;
// 			}

// 			if (CC_JSB) {
// 				if (cc.sys.os == cc.sys.OS_ANDROID) {
// 					let xhr = new XMLHttpRequest();
// 					xhr.timeout = param.timeout ? param.timeout : 10000;
// 					xhr.ontimeout = function() {
// 						if (CC_DEBUG) {
// 							cc.error(`GET 下载 ${param.imageUrl}：超时`);
// 						}
// 						reject(new Error(`Error! ${param.imageUrl} Request Timeout`));
// 					};
// 					xhr.onerror = function() {
// 						if (CC_DEBUG) {
// 							cc.error(`GET 下载 ${param.imageUrl}：错误`);
// 						}
// 						reject(new Error(`Error! ${param.imageUrl} Request Error`));
// 					};
// 					xhr.onload = function() {
// 						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
// 							try {
// 								let picUnit8Array = new Uint8Array(xhr.response);
// 								let lastSplitIndex = param.localImageAbsPath.lastIndexOf("/");
// 								let dirAbsPath = param.localImageAbsPath.substring(0, lastSplitIndex);
// 								// 保存到文件之前，先创建文件夹（如果不存在的话）
// 								if (!jsb.fileUtils.isDirectoryExist(dirAbsPath)) {
// 									jsb.fileUtils.createDirectory(dirAbsPath);
// 								}
// 								jsb.fileUtils.writeDataToFile(picUnit8Array, param.localImageAbsPath);
// 								if (CC_DEBUG) {
// 									cc.log(`GET 下载 ${param.imageUrl}：成功，位置：${param.localImageAbsPath}`);
// 								}
// 								resolve();
// 							} catch (error) {
// 								reject(error);
// 							}
// 						} else {
// 							reject(new Error(`Error! Http Code: ${xhr.status}`));
// 						}
// 					};

// 					if (CC_DEBUG) {
// 						cc.log(`GET 下载 ${param.imageUrl}：开始`);
// 					}
// 					xhr.responseType = "arraybuffer";
// 					xhr.open("GET", param.imageUrl, true);
// 					xhr.send();
// 					return;
// 				}
// 			}
// 			reject(new Error("unspoort enviroment"));
// 			return;
// 		});
// 	}
// }

// export type TextFile = {
// 	fileName: string;
// 	text: string;
// };
