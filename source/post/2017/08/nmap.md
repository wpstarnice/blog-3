---
title: Nmap网络嗅探工具
date: 2017-08-14T14:29:52+00:00
category: 网络技术与安全
---

Nmap即网络映射器对Linux系统/网络管理员来说是一个开源且非常通用的工具。Nmap用于在远程机器上探测网络，执行安全扫描，网络审计和搜寻开放端口。它会扫描远程在线主机，该主机的操作系统，包过滤器和开放的端口。

## 安装Nmap

一、对于Linux系统，绝大多数的发行版都在其软件包管理器中内置了nmap，安装方法：

对于RedHat系列

```sh
sudo yum install nmap   # or sudo dnf install nmap 
```

对于Debian系列

```sh
sudo apt-get install nmap
```

对于Arch Linux系列

```
sudo pacman -S nmap
```

二、Windows系统安装Nmap

登陆nmap官网[http://nmap.org](http://nmap.org)

选择左栏的Download

![](/pics/2017/08/fzy_screenshot20170813141738.png)

鼠标下滑到【Microsoft Windows binaries】一栏选择下载即可，速度较慢

![](/pics/2017/08/fzy_screenshot20170813141903.png)

我这里下载上传了nmap-7.6版本的安装包 

链接: [https://pan.baidu.com/s/1hsEbCKO](https://pan.baidu.com/s/1hsEbCKO) 密码: mvt5

## 使用方法

Linux和Windows用户都可以在命令行中（terminal/cmd）中通过命令使用nmap

**语法**

```
nmap [ <扫描类型> ...] [ <选项> ] { <扫描目标说明> }
```

一个典型的例子

```
# nmap -A -T4 scanme.nmap.org playground

Starting nmap ( http://www.insecure.org/nmap/ )
Interesting ports on scanme.nmap.org (205.217.153.62):
(The 1663 ports scanned but not shown below are in state: filtered)
port    STATE  SERVICE VERSION
22/tcp  open   ssh     OpenSSH 3.9p1 (protocol 1.99)
53/tcp  open   domain
70/tcp  closed gopher
80/tcp  open   http    Apache httpd 2.0.52 ((Fedora))
113/tcp closed auth
Device type: general purpose
Running: Linux 2.4.X|2.5.X|2.6.X
OS details: Linux 2.4.7 - 2.6.11，Linux 2.6.0 - 2.6.11
Uptime 33。908 days (since Thu Jul 21 03:38:03 2005)

Interesting ports on playground。nmap。或者g (192.168.0.40):
(The 1659 ports scanned but not shown below are in state: closed)
port     STATE SERVICE       VERSION
135/tcp  open  msrpc         Microsoft Windows RPC
139/tcp  open  netbios-ssn
389/tcp  open  ldap?
445/tcp  open  microsoft-ds  Microsoft Windows XP microsoft-ds
1002/tcp open  windows-icfw?
1025/tcp open  msrpc         Microsoft Windows RPC
1720/tcp open  H.323/Q.931   CompTek AquaGateKeeper
5800/tcp open  vnc-http      RealVNC 4.0 (Resolution 400x250; VNC TCP port: 5900)
5900/tcp open  vnc           VNC (protocol 3.8)
MAC Address: 00:A0:CC:63:85:4B (Lite-on Communications)
Device type: general purpose
Running: Microsoft Windows NT/2K/XP
OS details: Microsoft Windows XP Pro RC1+ through final release
Service Info: OSs: Windows，Windows XP

Nmap finished: 2 IP addresses (2 hosts up) scanned in 88.392 seconds
```

在这个例子中，唯一的选项是-A， 用来进行操作系统及其版本的探测，-T4 可以加快执行速度，接着是两个目标主机名。

## Zenmap

值得一提的是官方还提供了图形化界面（GUI）工具，即Zenmap。[Zenmap - Official cross-platform Nmap Security Scanner GUI](https://nmap.org/zenmap/)


![](/pics/2017/08/zenmap-no-648x700.png)

![](/pics/2017/08/zenmap-hd-648x700.png)

![](/pics/2017/08/fzy_screenshot20170814171944.png)


## 选项

一些参数说明
```
Usage: nmap [Scan Type(s)] [Options] {target specification}
TARGET SPECIFICATION:
  Can pass hostnames, IP addresses, networks, etc.
  Ex: scanme.nmap.org, microsoft.com/24, 192.168.0.1; 10.0-255.0-255.1-254
  -iL <inputfilename>: Input from list of hosts/networks
  -iR <num hosts>: Choose random targets
  --exclude <host1[,host2][,host3],...>: Exclude hosts/networks
  --excludefile <exclude_file>: Exclude list from file
HOST DISCOVERY:
  -sL: List Scan - simply list targets to scan
  -sP: Ping Scan - go no further than determining if host is online
  -P0: Treat all hosts as online -- skip host discovery
  -PS/PA/PU [portlist]: TCP SYN/ACK or UDP discovery probes to given ports
  -PE/PP/PM: ICMP echo, timestamp, and netmask request discovery probes
  -n/-R: Never do DNS resolution/Always resolve [default: sometimes resolve]
SCAN TECHNIQUES:
  -sS/sT/sA/sW/sM: TCP SYN/Connect()/ACK/Window/Maimon scans
  -sN/sF/sX: TCP Null, FIN, and Xmas scans
  --scanflags <flags>: Customize TCP scan flags
  -sI <zombie host[:probeport]>: Idlescan
  -sO: IP protocol scan
  -b <ftp relay host>: FTP bounce scan
PORT SPECIFICATION AND SCAN ORDER:
  -p <port ranges>: Only scan specified ports
    Ex: -p22; -p1-65535; -p U:53,111,137,T:21-25,80,139,8080
  -F: Fast - Scan only the ports listed in the nmap-services file)
  -r: Scan ports consecutively - don't randomize
SERVICE/VERSION DETECTION:
  -sV: Probe open ports to determine service/version info
  --version-light: Limit to most likely probes for faster identification
  --version-all: Try every single probe for version detection
  --version-trace: Show detailed version scan activity (for debugging)
OS DETECTION:
  -O: Enable OS detection
  --osscan-limit: Limit OS detection to promising targets
  --osscan-guess: Guess OS more aggressively
TIMING AND PERFORMANCE:
  -T[0-6]: Set timing template (higher is faster)
  --min-hostgroup/max-hostgroup <msec>: Parallel host scan group sizes
  --min-parallelism/max-parallelism <msec>: Probe parallelization
  --min-rtt-timeout/max-rtt-timeout/initial-rtt-timeout <msec>: Specifies
      probe round trip time.
  --host-timeout <msec>: Give up on target after this long
  --scan-delay/--max-scan-delay <msec>: Adjust delay between probes
FIREWALL/IDS EVASION AND SPOOFING:
  -f; --mtu <val>: fragment packets (optionally w/given MTU)
  -D <decoy1,decoy2[,ME],...>: Cloak a scan with decoys
  -S <IP_Address>: Spoof source address
  -e <iface>: Use specified interface
  -g/--source-port <portnum>: Use given port number
  --data-length <num>: Append random data to sent packets
  --ttl <val>: Set IP time-to-live field
  --spoof-mac <mac address, prefix, or vendor name>: Spoof your MAC address
OUTPUT:
  -oN/-oX/-oS/-oG <file>: Output scan results in normal, XML, s|<rIpt kIddi3,
     and Grepable format, respectively, to the given filename.
  -oA <basename>: Output in the three major formats at once
  -v: Increase verbosity level (use twice for more effect)
  -d[level]: Set or increase debugging level (Up to 9 is meaningful)
  --packet-trace: Show all packets sent and received
  --iflist: Print host interfaces and routes (for debugging)
  --append-output: Append to rather than clobber specified output files
  --resume <filename>: Resume an aborted scan
  --stylesheet <path/URL>: XSL stylesheet to transform XML output to HTML
  --no-stylesheet: Prevent Nmap from associating XSL stylesheet w/XML output
MISC:
  -6: Enable IPv6 scanning
  -A: Enables OS detection and Version detection
  --datadir <dirname>: Specify custom Nmap data file location
  --send-eth/--send-ip: Send packets using raw ethernet frames or IP packets
  --privileged: Assume that the user is fully privileged
  -V: Print version number
  -h: Print this help summary page.
EXAMPLES:
  nmap -v -A scanme.nmap.org
  nmap -v -sP 192.168.0.0/16 10.0.0.0/8
  nmap -v -iR 10000 -P0 -p 80
```

最新版本的参数说明，在[https://svn.nmap.org/nmap/docs/nmap.usage.txt](https://svn.nmap.org/nmap/docs/nmap.usage.txt)

## 扫描目标

除了选项，所有出现在Nmap命令行上的都被视为对目标主机的说明。 最简单的情况是指定一个**目标IP地址**或**主机名**。

虽然目标通常在命令行指定，下列选项也可用来控制目标的选择：

```
-iL <inputfilename> (从列表中输入)
```

从 `<inputfilename>`中读取目标说明。在命令行输入 一堆主机名显得很笨拙，然而经常需要这样。 例如，您的DHCP服务器可能导出10,000个当前租约的列表，而您希望对它们进行 扫描。如果您不是使用未授权的静态IP来定位主机，或许您想要扫描所有IP地址。 只要生成要扫描的主机的列表，用-iL 把文件名作为选项传给Nmap。列表中的项可以是Nmap在 命令行上接受的任何格式(IP地址，主机名，CIDR，IPv6，或者八位字节范围)。 每一项必须以一个或多个空格，制表符或换行符分开。 如果您希望Nmap从标准输入而不是实际文件读取列表， 您可以用一个连字符(-)作为文件名。

```
-iR <hostnum> (随机选择目标)
```

对于互联网范围内的调查和研究， 您也许想随机地选择目标。 `<hostnum>` 选项告诉 Nmap生成多少个IP。不合需要的IP如特定的私有，组播或者未分配的地址自动 略过。选项 0 意味着永无休止的扫描。记住，一些网管对于未授权的扫描可能会很感冒并加以抱怨。 使用该选项的后果自负! 如果在某个雨天的下午，您觉得实在无聊， 试试这个命令**nmap -sS -PS80 -iR 0 -p 80**随机地找一些网站浏览。

```
--exclude <host1[，host2][，host3]，...> (排除主机/网络)
```

如果在您指定的扫描范围有一些主机或网络不是您的目标， 那就用该选项加上以逗号分隔的列表排除它们。该列表用正常的Nmap语法， 因此它可以包括主机名，CIDR，八位字节范围等等。 当您希望扫描的网络包含执行关键任务的服务器，已知的对端口扫描反应强烈的 系统或者被其它人看管的子网时，这也许有用。

```
--excludefile <excludefile> (排除文件中的列表)
```

这和`--exclude` 选项的功能一样，只是所排除的目标是用以 换行符，空格，或者制表符分隔的 `<excludefile>`提供的，而不是在命令行上输入的。

## 实例


```
C:\Users\rhatyang>nmap -sS -P0 -sV -O baidu.com

Starting Nmap 7.60 ( https://nmap.org ) at 2017-08-14 14:09 ?D1ú±ê×?ê±??
Nmap scan report for baidu.com (123.125.114.144)
Host is up (0.044s latency).
Other addresses for baidu.com (not scanned): 220.181.57.217 111.13.101.208
Not shown: 998 filtered ports
PORT    STATE SERVICE  VERSION
80/tcp  open  http     Apache httpd
443/tcp open  ssl/http Baidu Front End httpd 1.0.8.18
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Linux 2.6.18 - 2.6.22 (92%), D-Link DWL-624+ or DWL-2000AP, or TRENDnet TEW-432BRP WAP (90%), OneAccess 1641 router (90%), 3Com SuperStack 3 Switch 3870 (88%), HP ProCurve 2524 switch or 9100c Digital Sender printer (86%), Blue Coat PacketShaper appliance (86%), Satel ETHM-2 intruder alarm (86%), Apple TV 5.2.1 or 5.3 (86%), AVtech Room Alert 26W environmental monitor (85%)
No exact OS matches for host (test conditions non-ideal).

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 49.38 seconds
```

这里使用到的选项有：

- -sS TCP SYN 扫描 (又称半开放,或隐身扫描)
- -P0 允许你关闭 ICMP pings.
- -sV 打开系统版本检测
- -O 尝试识别远程操作系统

我们把`baidu.com`作为扫描目标，得到如下信息

baidu.com的ip地址为 220.181.57.217，111.13.101.208

用的服务器软件是Apache

开放了80和443端口，或许还有

服务器使用的Linux系统，以及一些其它的服务和软件硬件

更多的扫描方法就不列举了，可以查看[https://svn.nmap.org/nmap/docs/nmap.usage.txt](https://svn.nmap.org/nmap/docs/nmap.usage.txt)
