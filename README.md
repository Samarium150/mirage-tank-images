# mirage-tank-images
[![GitHub top language](https://img.shields.io/github/languages/top/Samarium150/mirage-tank-images?style=flat)](https://v3.vuejs.org/)
[![deploy](https://github.com/Samarium150/mirage-tank-images/actions/workflows/deploy.yml/badge.svg)](https://github.com/Samarium150/mirage-tank-images/actions/workflows/deploy.yml)
[![LICENSE](https://img.shields.io/github/license/Samarium150/mirage-tank-images?style=flat)](https://github.com/Samarium150/mirage-tank-images/blob/master/LICENSE)

## 简介

这是一个纯前端的“幻影坦克”图片生成器，部署在[GitHub pages](https://samarium150.github.io/mirage-tank-images/)

本项目最初的目的仅仅是学习Vue，所以生成图片的效率非常感人，如果真的要实际使用，这里更推荐[Python](src/lib/python/mirage_tank.py)的源码

~~珍爱生命，远离前端~~

## 背景知识

聊天软件或网站总是以白色背景和黑色背景（夜间模式）显示图片，在默认的白色背景下看到一张图（图A），但是点击放大却变成另一张图（图B）。
这是因为两种模式使用的背景颜色不同，“查看详情”模式或者夜间模式下背景颜色为黑色。

如下图所示，默认看到的图片分别为天音かなた，夜间模式看到的为妖精騎士トリスタン

<img src="src/assets/sample.png" alt="sample_white" width="30%">

但实际上原图均为[sample.png](src/assets/sample.png)，区别仅仅是背景分别为白色和黑色。

这样的图片又被网友戏称为“幻影坦克”。利用这样的特性可以将表情包作为上层，其他图片作为下层，在不同的颜色背景下显示来达到伪装和隐藏下层图片的目的。
