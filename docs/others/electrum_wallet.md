---
title: Electrum 钱包 Multi-Sig 教程
tags:
    - Wallet
    - Electrum
comments: true
categories: 
    - 教程
date: 2022-12-28
---

## Electrum 简介

[Electrum](https://electrum.org/#home) 是很早（2011）便启动的开源比特币钱包项目，目前认可度、安全性和实用性都很好。 

今天我们的主题是：如何使用 electrum 的多签功能。

## 验证软件

!!! warning
    一定要在官方网站下载软件！  
    [官方链接：Electrum](https://electrum.org/#home) 

下载钱包软件最忌讳不在官网下载，因为可能会跑到钓鱼网站，然后下载到装有后门的软件，这样会造成财产损失。如何确保官方软件呢？有两个方案：

**1. 访问 Github 的项目链接**，比如 [Electrum Github](https://github.com/spesmilo/electrum)。为什么呢？一来 Github 属于认识度更高的网站。二来， Github 会有一些代码更新，我们可以检查是不是最近的更新。

![Electrum Github](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/Screenshot%202022-12-30%20at%2015.01.41.png)

我们可以通过上图 Github 的官网链接进入官网。

![20221230150625](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230150625.png)

另外，我们也要注意浏览器的地址栏是不是出现小锁头标志，也可以证明该网站更加值得信任。

**2. 使用 GPG 验证软件的签名**。这个办法应该是最保险的方案。但是验证软件签名需要一点点 GPG 相关的知识。访问软件下载地址：<https://electrum.org/#download>，然后下载对应系统的软件和软件签名（Signature）。

![20221230151749](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230151749.png)

然后参考 `How to verify GPG signatures` 这一节的内容。具体我在其他文章展开。

通常，只要确保访问的网站是官方网站，软件应该没有问题，除非官网被黑。验证开发者签名是最为保险的做法，但是如果开发者的私钥泄露，也会出现问题。

如果你还是不放心，可以直接下载源代码，在本地编译软件。

## 多签钱包创建

多签钱包的最基本原理可以参考[这一篇](./bitcoin_wallet.md)。

这里我们应一个 2-2 多签举例。

打开 Electrum 软件，选择创建新钱包：

![20221230153811](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230153811.png)

Next，选择 `Multi-signature wallet`

![20221230153847](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230153847.png)

其默认选择就是 2-2 多签：

![20221230153910](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230153910.png)

下一步，选择 `Create a new seed`:

![20221230154040](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230154040.png)

这时我们会看到生成的 Seed，**请务必保存这个seed到安全的地方，这就是一个私钥**。

![20221230154318](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230154318.png)

```
future rather foot fresh edit wise wonder clerk priority action vote venue
```

然后软件会要求你输入之前的 seed ：

![20221230154349](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230154349.png)

下一步后，会得到该私钥的 `Master Public Key` 这个也很重要，保存到记事本代用。

![20221230154444](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230154444.png)

```
Zpub6yfuT9mg2hRYax55DMjUFUBis135hFmuvLtn6fFjA9V9KpU8DRnyf9qw2Ng3KoagvswdnapvnbeacgY4Su9sgzf6QcQxSf7yvqzTGEEXDra
```

**注意，到这里我们就可以退出软件，然后重新启动软件，来创造 2-2 多签的第二个钱包。**

然后我们重复上述步骤，创建第二个多签钱包，并且保存记录：`seed` 和 `Master Public Key`。

```
seed: wealth desk army perfect bag invest ring feel theory gun dash broom
master public key: Zpub6xeF7LxgDFb9fzc9FchF4zNB4j5gW7AhR2siYtD6v8N8HozQrL5kToLUmZSQsiuNycEwU3JFJzYGn42grGyT3rAJ5qJV7KYaSHseifSfCP5
```

这时我们再一次重启软，选择创建新钱包:

![20221230154912](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230154912.png)

然后仍然选择 `Multi-signature wallet`，在 `Add consigner` 这步的时候，选择 `I already have a seed`，输入第二个钱包的 seed:

![20221230155036](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230155036.png)

然后加入第二个钱包的时候选择：`Enter cosigner key`，输入之前保存的第一个钱包的 Master Public Key 即可。这样两个钱包就通过这个 master pub key 联系起来了。

这时软件会要求会私钥设置密码：

![20221230155347](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230155347.png)

这个密码使我们用来加密硬盘上的私钥明文的。

如果是自己同时控制两个私钥，那么同样操作一次钱包1，就是把 1 钱包的 seed 链接 2 钱包的 pub key 即可。这样两个钱包就都可以看到公共的账户了。

## 多签钱包使用

同时打开两个多签钱包：

![20221230161846](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230161846.png)

注意到我这里用的是我的一个 3-2 多签做例子。

点击 `Tools - Plugins` 选择添加 `Cosigner  Pool`。这个插件可以提升多签钱包的使用体验。

![20221230162043](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230162043.png)

选择发送，填入地址和数量：

![20221230162136](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230162136.png)

点击 `Pay...`，这时系统会弹出交易签名窗口：

![20221230162229](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230162229.png)

确认无误，点击 `Finalize`，然后点击 `Sign`

![20221230162313](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230162313.png)

![20221230162332](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230162332.png)

然后我们输入密码，既可以完成一个钱包的签名，这时候我们需要点击 `Export - to clipboard` 发送这笔交易给我们的钱包 2：

这时候我们点击钱包 2 的界面，然后 `Tool - Load Transaction - From text` 把刚才拷贝的文本粘贴进去：

![20221230162757](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230162757.png)

然后点击 Load transaction，这时候我们就看到钱包 2 的签名窗口：

![20221230162840](https://raw.githubusercontent.com/wangzhe3224/pic_repo/master/images/20221230162840.png)

点击 `Sign`，输入密码完成签名。最后点击 `Broadcast` 将交易发送到公链，完成交易。
