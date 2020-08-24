# Cocos Creator Utils

[![](https://img.shields.io/badge/Release-0.2.0-orange.svg)](https://github.com/zhitaocai/CocosCreator-Utils/blob/master/CHANGELOG.md)
[![](https://img.shields.io/badge/Support-Cocos%20Creator%20v2.x-orange.svg)](http://www.cocos.com/creator)
[![](https://img.shields.io/badge/LICENSE-MIT-green.svg)](https://github.com/zhitaocai/CocosCreator-Utils/blob/master/LICENSE)

存储经常使用的 Cocos Creator 工具类：

| 工具                | 生效版本 | 功能描述           |
| ------------------- | -------- | ------------------ |
| res                 | 0.2.0    | 资源加载工具类     |
| i18n                | 0.1.0    | 简易版 i18n        |
| multiresolution     | 0.1.0    | 多分辨率适配       |
| scrollview          | 0.1.0    | ScrollView优化组件 |
| EnhancedComponent   | 0.1.0    | 增强型组件         |
| ScreenShotComponent | 0.1.0    | 截屏组件           |


## 1. 本项目安装/更新说明

本项目将会使用 [Git Submodule](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97) 的形式进行导入，如果你已经很熟悉使用 Git Submodule ，那么可以跳过本章节。为了备忘，我同样也罗列了一下使用过程，希望能对大家的使用带来帮助。

### 1.1 添加子模块到你的 Cocos Creator 项目中

```
cd YourCocosCreatorProject
git submodule add git@github.com:zhitaocai/CocosCreator-Utils.git assets/scripts/ccutils
```

上述命令为将本项目通过 [Git Submodule](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97) 形式导入到你的 CocosCreator 项目中，并指定了存放路径为 ``YourCocosCreatorProject/assets/scripts/ccutils`` （当然，你也可以更换到其他路径）


正常情况下，此时你会导入本项目的 **master** 分支内容到你的 Cocos Creator 项目中。本项目严格按照 [GitFlow](https://github.com/nvie/gitflow) 去进行开发，因此，master 分支就是本项目的最新稳定代码。当然，如果你遇到了 master 分支的代码可能不好使之类的情况时，你也可以你的需要和本项目的 [CHANGELOG](CHANGELOG.md) 去选择一个合适的 tag 去使用。如：

```
cd YourCocosCreatorProject/assets/scripts/ccutils
git checkout 0.2.0
```

此时，回到你的 Cocos Creator 编辑器中，即可发现已经存在本项目的相关代码。你可以通过下面命令，查看你的 Submodule 的状态

```
git submodule status
```

确认状态后，请记得将本 Submodule 提交到你的 Cocos Creator 项目中

```
cd YourCocosCreatorProject
git status
git add .
git commit -m 'add Cocos Creator Utils Submodule'
```

至此，你已经完成了将本仓库导入到你的 Cocos Creator 项目中。

### 1.2 更新你的 Cocos Creator 项目中的子模块

本项目会持续更新，如果你想在你的 Cocos Creator 项目中使用采用本项目的最新版本，那么可以通过以下步骤去更新本项目：

1. 进入你的 Cocos Creator 中存放本项目的目录
2. 通过 git pull 命令去更新本项目
3. 回到你的 Cocos Creator 项目，发起一个 commit，以完成 Submodule 的更新

参考命令：

```
cd YourCocosCreatorProject/assets/scripts/ccutils
git fetch
git checkout master 
git pull
cd YourCocosCreatorProject
git commit -am 'update Cocos Creator Utils Submodule'
```

### 1.3 重新下载你的 Cocos Creator 项目

在你完成了步骤 1.1 后，你的 Cocos Creator 项目中已经依赖了本项目。**当你（或其他人）再重新下载本项目时，使用的命令将会发生变化。**

加入 Submodule 之前，首次下载你的 Cocos Creator 项目的命令可能会是这样子：

```
git clone git@YourCocosCreatorProject.git
```

加入 Submodule 之后，首次下载你的 Cocos Creator 项目命令将会是这样子：

```
git clone git@YourCocosCreatorProject.git

# 此命令为初始化并下载Submodule的内容到本地
git submodule update --init
```

或者在 clone 项目时，附带参数 ``--recurse-submodules`` ，也会自动初始化并更新仓库中的每一个子模块， 包括可能存在的嵌套子模块

```
git clone --recurse-submodules git@YourCocosCreatorProject.git
```

### 1.4 更新你的 Cocos Creator 项目

在你完成了步骤 1.1 后，你的 Cocos Creator 项目中已经依赖了本项目。**当你（或其他人）需要同步远程仓库时，使用命令同样发生变化。**

如：

加入 Submodule 之前，同步远程仓库中你的 Cocos Creator 项目 master 分支内容到本地仓库时，你的命令可能会是这样子：

```
git checkout master
git pull origin master 
```

在加入 Submodule 之后，你还需要在更新一下 Submodule

```
git checkout master
git pull origin master 
git submodule update --init
```


## 3. LICENSE

    MIT License

    Copyright (c) 2019 Zhitao Cai

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
