---
title: 比特币随想 - 重拾 Proof of Work
tags: Bitcoin
categories: Bitcoin
date: 2022-06-04
---

Proof of Work （PoW）工作量证明，并不是比特币首创，但是比特币巧妙的使用了他，把它变成了一种实现共识的方法[^origin]。除了比特币，PoW 协议其实还有很多其他的用途：防止 DoS 攻击、处理垃圾邮件。

本文组织如下：

1. 工作量证明的一般原理
2. 比特币工作量证明的社会原理
3. Proof of Stake 

## 工作量证明，PoW

为了理解 PoW，我们首先脱离比特币的场景，来单独看看 PoW 协议。PoW 最早被提出来是为了主动防御 DoS 攻击，就是拒绝服务攻击，而垃圾邮件可以被认为是某种 DoS 攻击。

一个攻击者可以同时发送 1 百万封垃圾邮件，而不用付出任何代价。但是这对邮件服务器和邮件阅读者都是一种困扰。PoW 的方案是：为每一封邮件都附上一个代价（就好像邮票）。在计算机的世界，这种代价的一个选择是 CPU 资源。当服务器**验证**发信人为这封邮件附上了代价，服务器才会处理该邮件。这种代价往往对于每天只发送几百封邮件的人来说算不上什么，但是对于垃圾邮件攻击者，几百万封邮件意味着极大的成本，因此从经济学角度，他可能选择不再攻击。

现在我们需要一种机制，既可以让发信人花费一定的 CPU 资源，有让服务器可以快速的验证发信人确实花费了一定的 CPU 资源。以下就是一种方案：

假设邮件内容，S；发信人需要寻找一个整数，P，使得 $H = hash(S, P)$。这里 H 是一串长度固定为 N 比特的数字，且 H 的前 M 位均为 0。

![](https://i.imgur.com/6JhQWty.png)

这里 Hash 是一个密码学的函数，他可以把任意宽度的比特转化成一个固定长度的比特传，该函数有以下特性：

1. 通过 S 和 P 计算 H 的速度非常快
2. 给出 H 几乎不可能找到 S 和 P
3. 输出 H 和输入的关系是随机的，即输入微小的变化，输出就会产生随机巨大变化

下面我举个例子，我们选用 SHA-256 作为我们的 Hash 函数，256 的意思就是函数输出结果一共 256 位。

``` python
import hashlib
def hash(s):
    m = hashlib.sha256()
    m.update(s)
    res = m.hexdigest()
    return res

print(hash(b"11111"))
# d17f25ecfbcc7857f7bebea469308be0b2580943e96d13a3ad98a13675c4bfc2

print(hash(b"11112"))
# 744b8397028efb93fc77ef9d12ed82d522a8d168616550a79dec63185c2d3fc2
```

可以看到仅仅从 1 变成 2，hash 的结果已经是面目全非！

下面就是 PoW 协议工作的基本方式：（看注释）

``` python
import hashlib

def pow(s: str, difficulty: int=2) -> int:
    p = 0
    while True:
        m = hashlib.sha256()
        m.update((s + str(p)).encode())
        h = m.hexdigest()

        if h[:difficulty] == "0" * difficulty:
            return p 
        else:
            p += 1

# 工作量证明，寻找 p
s = "This is a message!"
diff = 4  # 这里是难度系数，即 hash 结果开头的 0 的数量，比如 0000xxxxx
p = pow(s, diff)  # p 就是我们找到的整数
print(p)  # 83205

# 发邮件的时候，我们除了发送信息 s，也发送我们找到的整数 p
# （其实这个 Protocol 已经有问题了，发现了吗？我们应该要求把收件人也加入has，不过这个不重要）
# 然后，服务器就可以通过 s 和 p 证明我们做了工作：

m = hashlib.sha256()
s = "This is a message!"
p = 83205
m.update((s + str(p)).encode())
h = m.hexdigest()
print(h)
# 这是hash的结果：
# 00002516593e4194cfb8667fa3559f37fb964d0a375c9567c6ca297bfbb48cfe
# 可以看到开头有 4 个 0，也就是验证了发信人做了工作
```

这个协议其实非常巧妙，首先验证结果非常快，只需要一次 hash 操作；但是找到整数 p 却很慢，而且难度是可以控制的，且难度随着 0 的个数程指数上升。我们举例：

```python 
import time
import matplotlib.pyplot as plt

message = "This is a message!"
x = []
y = []
ps = []
for diff in range(1, 7):
    _s = time.time()   
    p = pow(message, diff)
    ps.append(p)
    _e = time.time()
    dur = _e - _s
    print(f"难度：{diff} - {dur} ")
    x.append(diff)
    y.append(dur)

"""
难度：1 - 1.71661376953125e-05 
难度：2 - 7.200241088867188e-05 
难度：3 - 0.009111881256103516 
难度：4 - 0.14280223846435547 
难度：5 - 0.19749689102172852 
难度：6 - 21.125200271606445 
"""

plt.plot(x, y)
```

可以看出，当难度为 6 时，这个简单的 PoW 协议需要 21 秒才能找到合适整数。当然，你总是可以用更好的算法，使用更好的硬件进行并行计算，但是这个算法复杂度不会因此改变，搜索时间随难度程指数级别增长。


## 比特币和 PoW

讲完了 PoW 的基本概念，我们从其他角度看看这个协议。因为 PoW 可能是比特
币协议看起来最难解的概念，比特币协议通过 PoW 来定义新块（一组新的交易记录）被加入分布式交易记录链（区块链）。
实际上 PoW 来自赛博朋克运动[^1]（不是那个科幻小说赛博朋克，而是一种推崇计算机密码学的运动）的一部分，他跟货币政策或者计算机科学都有点格格不入。

所有比特币的区块都包括一个叫做 nonce 的无意义的整数，而“挖矿”做的工作跟我们上一节讲解的内容一样，寻找 nouce（其实就是我们之前提到的 p ）。整个挖矿过程是一个非常随机的过程，谁先找到这个整数，谁就有权利提出下一个区块。

尽管矿机（节点）的目的是为了记账，但是他们做的绝大多数工作却是“挖矿”，即寻找整数，而不是记账。挖矿花费的能源（电力、维护等等）再也不会回来了，用掉了。整个比特币网络具有巨大的计算能力（hash能力），除了一小部分之外，其他一切都是没有目的的。

当一个人升级他们的挖矿计算机时，他们就能挖的更快，然后赚更多的比特币。但是，当每个人都升级时，挖矿整体并没有变得更有效率。不管网络的算力有多大，每十分钟只有一个块加入区块链。为了维持这个出块频率，网络会更新难度（0的个数）。比特币网络更像是一片森林，每棵树都试图长的更高来获得阳光，但是结果是大部分太阳能都被用来长高高的树干。

对于比特币网络来说，我们应该这样理解 PoW：比特币网络由一群自私的人组成，他们相互独立没有从属关系，为了让这群自私的人形成共识，我们需要 PoW，否则如果比特币网络中都是诚实和无私的节点，它就不需要 PoW 形成共识。

### 成块的 10 分钟发生了什么

在一个区块生成以前，网络中可能存在大量的交易，也没人决定哪一些交易应该进入下一个区块（mempool）。这些交易中，有一些是无效的，因此需要节点检查；有一些没有交易费，节点需要决定是不是无偿处理这些交易；还有一些交易不能同时为真，比如双花的交易，节点需要选择哪一个作为合法交易等等。

因此，根据当前的交易，其实可以形成无数多个合法的区块，但是没有人应该决定哪一个才是对的，因为就没有对错可言（当然，不合法的交易是不行的）。不同的区块可能对不同人的收益是不一样的。

矿工（节点）可以有意识的拒绝认证他的“敌人”的交易，或者他也可以无私的接受没有交易费的交易，因为他认识交易人。当然他也可以作弊，比如双花。他先向某人购买商品，然后之后把同一笔钱转给另一个人，然后只验证后一笔交易。

有无数多的理由可以让矿工按照自己的目的操纵比特币区块链，但是网络需要共识才能运行，但是网络不需要对某一个特定的目的达成共识。比特币的方案就是通过 PoW 为区块提议增加成本，这样增加了作弊的成本。一旦新的区块提案出现，矿工可以选择接受提议，或者坚持自己的提议。接受是一个合理的选择，是一种自然共识，因为如果下一个幸运儿是他自己，那么他提出的区块可以被以相同的想法接受；不接受相对比较冒险，因为他要说服其他人接受他的观点。

原则就是：第一个被挖出的区块不包含个人喜好，因为 PoW 可以确保第一个发现的人是随机产生的。**换句话说，在 PoW 协议中，第一个发现区块的人只能是因为运气。** 而不是别的什么。因此，任何不接受该区块的行为都是很值得怀疑的。

## “不利条件原理”

你可能也发现了 PoW 之所以可以帮助达成共识似乎并不是基于计算机原理，而是人或者社会学原理。

不利条件原理，Handicap Principle，可以用来解释 PoW 达成共识的原理。不利原理其实是一个生物学的概念，这个原理说，当两只动物有合作的动机时，他们必须很有说服力地向对方表达善意。为了打消对方的疑虑，他们向对方表达友好时必须附上自己的代价，使得自己背叛对方时不得不付出昂贵的代价。
即，表达方式本身必须是对自己不利的。

不利原理其实为囚徒困境提供了一个解答。囚徒困境的基本结论是：个体做出理性判断会导致集体非理性。造成这种困境的主要原因是，个体之间无法确认对方可以选择合作。不利原理就可以解决这个问题，我们只需要做一些事情证明我们愿意合作，或者证明背叛的代价比合作更大！

假设两个囚犯有机会与检察官在一起一段时间，其中一名对博弈论特别了解的囚犯对检察官说，“如果另一个囚犯有罪，那么我也同样有罪。”这个声明对他自己来说是一个明显的代价，因为它消除了他在其他囚犯合作时叛逃的能力。然后另一名囚犯可以选择重复陈述。如果他不这样做，那么他知道第一个囚犯唯一可行的选择是叛逃，但如果他这样做了，那么两个囚犯都可以合作。

**这就是障碍原则。**

其实，有人认为正是这种障碍原则，解释了道德和利他主义。

因为，比特币的 PoW 协议不应该被作为一种资源的浪费或是某种达成共识的黑魔法。他是一种非常自然且有用的通讯协议。当一个分布式系统由一个组织控制，那么系统中的所有节点都是诚实的，PoW 是无意义的。但是比特币网络不是这样的，因此为了达成共识，需要 PoW 协议。

障碍原则在互联网其实非常有意义，因为互联网的绝大部分节点都是自私的（人）。如果电子邮件需要工作量证明，那么我们可能不需要花钱去研究如何过滤垃圾邮件；通讯协议如果需要工作量证明，DDOS （分布式拒绝服务攻击）攻击可能不会存在。

比特币的工作量证明就可以类比成利他主义，或者囚徒的声明。生成区块的计算能力代表了一种实力，但是即使有如此能力，也同意认可社区已经产生的第一个区块就是一种利他和无私的表现。

说一千道一万，共识本身就是需要代价的。要么是信任第三方的协调，要么是障碍原则。信任第三方协调的优势是效率，劣势是第三方可能不道德；障碍原则的优势是不需要第三方，因此也不需要承担信任的风险，劣势是需要能量证明。

## 阳光下没有新鲜事：PoS 


> 所罗门皇帝的名言：阳光下面没有新鲜事。

没有 PoS 的 PoW 讨论是不完整的！但是今天我们不说 ETH 2.0，我们来说说一个已经无人问津的币：[PPCoin](https://www.peercoin.net/)。

PPCoin 于 2012 年启动，是第一个提出并实现 PoS 的点对点加密货币实现[^pp]。这可以算是 PoS 的鼻祖了，有意思的是，作者们提出 PoS 的时候并没有放弃 PoW，他们在白皮书中这样写道：

> 我们使用 PoS 作为网络的安全模型，但是使用 PoW 作为初始代币分发模型，并且逐步降低 PoW 的重要性。

作者的愿景非常好，而且他们也充分意识到了 PoS 协议的问题：初始代币分发。在 PPCoin 的 PoS 协议中，节点不是跟随算力最多的节点，而是投资该代币最多的节点。每一个 PPCoin 的矿工生成新块后都会失去一些老币，得到一些新币，这也意味着这次出块的节点，下一次很可能不会出块。

工作量证明和权益证明在不同情况下具有不同的成本和收益。根据障碍原则，产生信号的成本必须与信息的含义相关。股权证明系统展示了对硬币本身的投资，而工作证明系统展示的是底层网络中的工作量。

所以，如果两个网络的市值相同，PoW 网络容量更大、流动性更好，但是价格波动也更大；而 PoS 网络的价格稳定性更好。PoW 网络依靠的是：矿工难以说服其他人跟随他，来对抗不诚实的节点；而 PoS 基本上只接受对网络友善的节点的贡献来对抗不诚实的节点。

## 结束

这篇随想就到这里把，关于 PoS 的讨论可能有点过于简单了，不过以后我可以给大家讲讲 PPcoin 的白皮书，扒一扒 PoS 的源头[^pp]。


> 本文部分内容翻译：https://nakamotoinstitute.org/mempool/the-proof-of-work-concept/. 并非全部原创。

[^origin]: https://nakamotoinstitute.org/mempool/the-proof-of-work-concept/
[^1]: https://en.wikipedia.org/wiki/Cypherpunk
[^video]: https://www.youtube.com/watch?v=emDJTGTrEm0
[^pp]: https://decred.org/research/king2012.pdf