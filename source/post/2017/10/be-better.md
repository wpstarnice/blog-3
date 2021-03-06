---
date: 2017-10-27 10:30:36
title: "重新设计了一下博客并部署到Github Pages"
category: 晃眼一生
---


之前想着给博客换个主题、换个风格，但是自己又没什么布局思路，看了很多主题和网站都感觉不怎么中意，后来，看到这个网站[Mitesh Shah](https://miteshshah.github.io/)，感觉挺不错的，花了两天时间仿了下来，就是现在这个网站的样子了，也完成了响应式，图标用的fontawesome，但是有些图标还是找不到便又加了阿里的iconfont，以后再把fontawesome的全部换成iconfont算了。以后如果看到中意的网站也会去改布局。

关于文章分类页：Jekyll官方提供有插件，[jekyll/jekyll-archives: Archive pages for your Jekyll tags and categories.](https://github.com/jekyll/jekyll-archives)，但是由于Github的安全机制，只允许使用白名单内的插件，[Dependency versions](https://pages.github.com/versions/)，所以这个插件可以在本地运行但不能再Gtihub Pages使用，所以我是手动创建的分类页，反正我分类也少。

至于HTTPS，参考[Github Pages绑定域名添加HTTPS（Cloudflare） - 樊志阳](https://fanzhiyang.com/blog/github-pages-cloudflare-ssl/)，感觉现在cloudflare的速度比以前快了不少，我第一次用的时候连官网都要打开半天。

把博客部署到Github的好处我认为，相比于使用wordpress，这样做可以看到自己整个博客的迭代过程，最重要的是我感觉这样会让自己把重点放在文章的质量上而不是数量上，把文章push到github之后，后期会有一种让自己再去完善这个文章的想法，包括修改，添加，想把它变得更加完美，以至于完善一篇文章的时间比写这篇文章的时间还要久，更加促使自己去思考。

最后，希望自己能坚持下去。