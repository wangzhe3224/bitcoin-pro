---
title: 比特币的定价模型
date: 2024-08-15
categories: Bitcoin
tags: [Bitcoin]
---

比特币的定价模型是个困难的话题，原因：

- 比特币只有 15 年历史数据
- 比特币是一个独特的资产类别，不同于股票、固定收益或者贵金属

如果是股票，历史数据短并不是什么问题，对于刚刚 IPO 的公司，甚至还没有 IPO 的公司，业界也都有比较可靠的定价模型，因为股票作为一个资产类别已经有几百年的历史，有丰富的参考标准，且基本面数据比较明确。而比特币缺乏历史参考，而且人们也不是很清楚他的基本面数据到底由哪些指标组成。

无论如何，如果我们想为比特币定价，那么首先我们需要确定比特币有内在价值。巴菲特等价值投资者认为比特币没有未来现金流，所以它的内在价值应该是 0。但是，泛泛觉得这也不妥。其一，现在很多成长股也没有任何分红；其二，比特币的区块奖励就是一个非常固定的未来现金流，只不过不是以美金支付，而是比特币本身；其三，很多没有现金流的资产具有价值，比如黄金。

## 比特币的基本面模型

我们可以试着分析一下比特币的基本面，那些因子可能会影响比特币或者比特币网络的价值？

- 哈希率
- 网络效用，比如用户数量、活跃度

泛泛发现有一些学者通过 causality 分析返现其实是比特币的价格引发了哈希率的变化[^1]。

关于网络效应，似乎活跃的钱包数量、交易数量至少有一个会影响比特币的价格[^2].

## Power Law Model

如果仅仅从历史数据的角度来拟合一个模型为比特币定价，最简单且合理的模型是：Power-law Model。这模型非常简单，就是一个天数和价格之间的关系，而且这个模型是收敛的。

![20240815094517](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20240815094517.png)

至于为什么这个模型有效，更多的讨论可以参考：[The Bitcoin Power Law Theory](https://giovannisantostasi.medium.com/the-bitcoin-power-law-theory-962dfaf99ee9)。简而言之，Power Law 在自然界和人类社会的很多领域都有适用，过去 15 年的数据表明，它刚好也可以拟合比特币的价格。

这个模型最吸引我的地方在于它的简单和普世。

## 如果比特币是商品 - Stock over Flow

这是一个基于供给和需求的定价模型，被广泛应用于商品的定价。

![20240815095949](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20240815095949.png)

## 如果历史重复

比特币价格还有个显著的特征：4年减半的周期性。目前我们正在经历第四个，我们可以用前三个来模拟第四个。

![20240815095444](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20240815095444.png)

## 如果比特币是。。。

还有一种定价方式就是类比。

![20240816100343](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20240816100343.png)

目前比特币是世界第十大资产类别，市值 1.1 万亿美金，如果比特币达到黄金的体量，市值会达到 16 万亿。

如果比特币的价值存储属性得到认可，我们可以假设比特币占据世界总财富的一部分。根据 UBS 2024 的世界财富报告[^3]，2022 年世界总财富为 489 万亿。

![20240816104004](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20240816104004.png)

假设比特币存储了 5% 的世界财富，它的市值约为 22 万亿，也就是1百万美金每个。


[^1]: https://www.mdpi.com/1911-8074/13/11/263
[^2]: https://www.sciencedirect.com/science/article/pii/S0160791X23001252
[^3]: https://www.ubs.com/content/dam/assets/wm/global/insights/doc/global-wealth-report.pdf
