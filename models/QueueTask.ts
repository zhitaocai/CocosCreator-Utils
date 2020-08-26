// import { Queue } from "./Queue";

// /**
//  * 队列任务
//  */
// export abstract class QueueTask<T> {
//     /**
//      * 任务队列
//      */
//     private _taskQueue: Queue<T> = new Queue();

//     /**
//      * 失败后重试间隔时间（毫秒）
//      */
//     private _retryInterval: number = 15000;

//     /**
//      * 是否正在执行中
//      */
//     private _isExecuting: boolean = false;

//     /**
//      * @param retryInterval 失败后重试间隔时间（毫秒）
//      */
//     constructor(retryInterval: number) {
//         this._retryInterval = retryInterval;
//     }

//     /**
//      * 添加任务
//      *
//      * @param task 任务
//      */
//     addTask(task: T) {
//         this._taskQueue.push(task);
//     }

//     /**
//      * 开始执行队列中的所有任务
//      */
//     async execute() {
//         if (this._isExecuting) {
//             return;
//         }
//         this._isExecuting = true;
//         if (this._taskQueue.isEmpty()) {
//             this._isExecuting = false;
//             return;
//         }
//         let task = this._taskQueue.first();
//         if (await this.handleTask(task)) {
//             this._isExecuting = false;
//             this._taskQueue.pop();
//             if (this._taskQueue.isEmpty()) {
//                 return;
//             } else {
//                 this.execute();
//             }
//         } else {
//             this._isExecuting = false;
//             setTimeout(() => {
//                 this.execute();
//             }, this._retryInterval);
//         }
//     }

//     /**
//      * 按照具体实现去处理单个任务
//      *
//      * @param task 任务
//      *
//      * @returns true 处理成功 false 处理失败
//      */
//     abstract handleTask(task: T): Promise<boolean>;
// }
