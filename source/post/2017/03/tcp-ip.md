---
title: TCP/IP体系结构
date: 2017-03-18T10:55:09+00:00
category: 网络技术与安全
---

# TCP/IP四层体系结构

![](/pics/2017/03/1102.png)

TCP/IP的四层体系结构也可以说是Internet四层体系结构

一是网络接入层（数据链路层）是物理传输通道，可使用多种传输介质传输，可建立在任何物理传输网上。比如光纤、双绞线等。

二是网络层：其主要功能是要完成网络中主机间“分组”(Packet)的传输。也就是IP层

三是传输层：其主要任务是向上一层提供可靠的端到端（End-to-End）服务，确保“报文”无差错、有序、不丢失、无重复地传输。它向高层屏蔽了下层数据通信的细节，是计算机通信体系结构中最关键的一层。包含2个重要协议：TCP/UDP

四是应用层：应用层确定进程间通信的性质，直接为用户的进程提供服务，以满足用户的需要。


![](/pics/2017/03/1103.jpg)

TCP/IP通信数据流图

# TCP/IP协议栈

![](/pics/2017/03/1101.png)

TCP/IP协议实际上就是在物理网上的一组完整的网络协议。其中TCP是提供传输层服务，而IP则是提供网络层服务。下面是各个层的协议说明：

**IP**： 网间协议(Internet Protocol) 负责主机间数据的路由和网络上数据的存储。同时为ICMP，TCP，UDP提供分组发送服务。用户进程通常不需要涉及这一层。

**ARP**： 地址解析协议(Address Resolution Protocol)

此协议将网络地址映射到硬件地址。

**RARP**： 反向地址解析协议(Reverse Address Resolution Protocol)

此协议将硬件地址映射到网络地址

**ICMP**： 网间报文控制协议(Internet Control Message Protocol)

此协议处理信关和主机的差错和传送控制。

**TCP**： 传送控制协议(Transmission Control Protocol)

这是一种提供给用户进程的可靠的全双工字节流面向连接的协议。它要为用户进程提供虚电路服务，并为数据可靠传输建立检查。（注：大多数网络用户程序使用TCP）

**UDP**： 用户数据报协议(User Datagram Protocol)

这是提供给用户进程的无连接协议，用于传送数据而不执行正确性检查。

**FTP**： 文件传输协议(File Transfer Protocol)

允许用户以文件操作的方式（文件的增、删、改、查、传送等）与另一主机相互通信。

**SMTP**： 简单邮件传送协议(Simple Mail Transfer Protocol)

SMTP协议为系统之间传送电子邮件。

**TELNET**：终端协议(Telnet Terminal Procotol)

允许用户以虚终端方式访问远程主机

**HTTP**： 超文本传输协议(Hypertext Transfer Procotol)

**TFTP**: 简单文件传输协议(Trivial File Transfer Protocol)

# 互联网沙漏模型

沙漏计时器形状的TCP/IP协议族即`everything over IP `、`IP over Everything `

翻开任何一本计算机网络的书，打开任何一个关于计算机网络的网页，都有关于互联网体系结构的内容。从模型的形状上看，就是那个上下宽，中间窄的“沙漏“模型。

![](/pics/2017/03/1104.png)

![](/pics/2017/03/1105.png)

> everything over ip的意思是不管哪种数据形式，图像，声音，文件等等都可以通过TCP/IP实现互联互通，比如视频会议，VoLTE，等等。传统电信网络的语音服务是基于电路交换的，而通过IP网传输的语音是基于分组交换的IP包。未来运营商应该逃脱不了管道化的命运。

> ip over everything的意思是TCP/IP可以用在不同的异构网络中，对上层应用屏蔽不同的通信子网。可以把点对点的网络，以太网，atm，dvb，卫星网，4g网，看成是特定的一种网络通信技术，从ip层看上去，就把他们的差异抹平了，不管规模多大，都是传输ip包的具体网络技术而已。（有一种说法，TCP/IP可以工作在由两个罐头和一段绳子组成的网络上或者由信鸽组成的网络上）
