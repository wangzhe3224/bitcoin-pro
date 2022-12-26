---
comments: true
---

# NOSTR 协议

Nostr 不是一个应用程序，它是一个轻量、简单同时拓展性很好的开放协议，可以用来构建真正的审查的去中心化社交媒体平台。

Nostr 协议是基于 Relay 的。Relays 可以有任何人运行，客户端通过连接到 Relay 进行实时通讯。

## 账户

Nostr 协议不需要注册账户，当然也不需要任何个人信息。跟比特币一样，你需要仅仅是私钥，以及私钥衍生的公钥：

- 公钥，就是你的用户名，可以分享给其他人。
- 私钥，就是你的密码，不可以分享给任何人。

生成秘钥对非常简单！你可以选择一个符合 Nostr 协议的工具：[Anigma](https://anigma.io/), [Coracle](https://coracle.social/), [Astral](https://astral.ninja/)。

## 事件

技术上，Nostr 协议中只有一种东西，就是事件（Event）。事件其实就是一串类 Json 文本，这就是客户端发送给 Relay 的信息。

比如：

``` json
{
"id": "c011...4c43",
"pubkey": "dec1...4fb3",
"created_at": 1671551112,
"kind": 1,
"tags": [],
"content": "good morning!",
"sig": "e1dc...5f1"
}
```

👆🏻 这段信息很容理解：

`id` 就是这个事件的识别码。这个识别码是唯一的。`content` 就是信息的内容。其中的 `pubkey` 就是用户的公钥，也就是这段信息的发送者，而 `sig` 就是这段信息的数字签名，用来证明这段信息是由持有该公钥对应私钥的人发布的。

`kind` 字段是最有意思的，因为这个代表了信息的类型。比如 1 代表纯文本信息，而 4 代表端对端加密信息！我们可以设计无数多的信息类型。

`tag` 字段主要是为了开发人员准备的，这里我们可以放入任何想要的东西。

## Relay

Relay 是 Nostr 协议最重要的组成部分。Relay 存储从客户单发来的事件。

**Relay 彼此之间不会通讯，你只能收到你连接到的 Relay 上面的信息。** 这是 Nostr 最重要的特性，Relay 之间没有任何通讯（当然只是协议没有定义 relay 的通讯方式），因此你可以控制你的客户单尽可能多的连接到你想要发送数据的不同的 Relay。

Nostr 的客户端应该允许用户连接到尽可能多的 Relay，用户可以选择从哪里读取、往哪里发送自己的信息。也就是说，我可以选择从某些 relay 接受信息，而只向另一些 relay 发送信息，反之亦然。

如果我连接到 Relay A，而你连接了 Relay B，我们是不能看到彼此的信息的！为了看到彼此的信息，我们需要至少共享一个 Relay。

这种通讯方式乍一看非常奇怪，但是这种方式有一个非常强大的地方。你可以几乎 0 成本秘密的自己运行一个 Relay 节点，然后发送你的信息到这个私人节点和其他的公共节点。这样你就有了一个你的发言备份。（我适用知乎的时候就出现过万字文章被删除的惨剧）

也许有一个关于足球的 Relay，我不感兴趣，我就可以选择不接受那里的信息，但是我仍然可以跟那个 Relay 上的用户通过其他 relay 沟通。

Nostr 可以抵制审查。其一，你可以有自己的私人 relay。其二，因为 relay 之间没有通讯，如果一个 relay 被审查了，你大可以不去链接他。

目前，已经有超过 [100 个 Relay](https://nostr.watch/) 运行在世界各地了。

[Guide: Setting up a relay](https://usenostr.org/relay.html)

## Nostr 能做什么？

Nostr 可以做很多事情，虽然它还很年轻，但是我们已经有一些应用程序了：

!!! 推特的替代品
    Nostr 最初诞生的目的就是代替推特。现在我们已经有了很多客户端，比如 damus, nostr.ch 等等。  
    主要使用了 `kind=1` 事件类型实现这类 App。

!!! Telegram 带替代品
    `kind=4`, [Anigma.io](https://anigma.io/)

!!! Reddit
    [nvote](https://nvote.co/) 投票社区。

!!! 在线游戏
    [Jester](https://jesterui.github.io/) 在线象棋。

!!! 文本共享
    [Sendstr](https://github.com/vilm3r/sendstr-web) 发送端对端加密文本。

## 相关资源

- <https://usenostr.org/>
- [Nostr 协议文档](https://github.com/nostr-protocol/nips/blob/master/01.md)
- [Nostr 资源集合](https://www.nostr.net/)
