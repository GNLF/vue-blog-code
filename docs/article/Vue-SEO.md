# Vue针对搜索引擎做SEO优化

## 什么是SEO

>搜索引擎优化（Search engine optimization，简称SEO），指为了提升网页在搜索引擎自然搜索结果中（非商业性推广结果）的收录数量以及排序位置而做的优化行为，是为了从搜索引擎中获得更多的免费流量，以及更好的展现形象。

SEM（Search engine marketing，搜索引擎营销），则既包括了SEO，也包括了付费的商业推广优化。

## 搜索引擎工作原理

要了解SEO，首先得了解搜索引擎的工作原理，其原理是比较复杂，流程简化如下：

### 爬虫抓取网页内容

一般爬虫抓取页面内容是先从一个页面出发，从中提取出其他页面的链接，然后当作下一个请求的对象，一直重复这个过程。所以要有良好的SEO，需要你在各大网站上拥有外链，这样会提高你的网站被搜索引擎爬虫的几率。

### 分析网页内容

爬虫拿到HTML之后，就会对其内容进行分析。一般需要进行去杂、分词、简历索引数据库。什么是索引数据库呢？简单地说就是记录一个词在哪些文档中出现、出现次数、出现的位置等等。为什么要简历索引数据库呢？是为了快速查找。

### 搜索和排序

搜索会根据你输入的关键词，分别查询其对应的索引数据库，并对结果进行处理和排序。

## 前端编码的SEO

### 网站结构

网站结构要清晰。一般网站的结构是树形的，一般分为三个层次：首页 → 频道页（列表页） → 文章页（详情页）。

网站的结构要扁平。结构层数越少越好，一般不要超过三层，搜索引擎一般到了第三层就不想继续深入地爬取了。多数的网站，例如掘金、雪球等，他们的网站结构是两层，他们的首页和频道页是同一个页面。

### 导航

页面应该要有简明的导航。导航可以让搜索引擎知道网站的结构，也可以让搜索引擎知道当前页面在网站结构所在的层次。 建议：

每一个页面都包含导航。

对于内容较多的网站可以采用面包屑导航。

链接使用文字链接，如果是图片，则通过alt属性告知搜索引擎链接的指向。

### 规范的URL

规范、简单、易理解的URL能让搜索引擎更好地抓取内容。建议：

同一个页面，只对应一个url 。多个url可以采用301进行重定向。

url可以反应网页内容以及网站结构信息。例如www.a.com/blog、www.a.com/blog/123、www.a.com/article。

url尽量简短。

尽量减少动态url中包含的变量参数。

### 提交Sitemap

Sitemap 可通知搜索引擎他们网站上有哪些可供抓取的网页，以便搜索引擎可以更加智能地抓取网站。

robot.txt

搜索引擎爬行网站第一个访问的文件就是robots.txt。在这个文件中声明该网站中不想被蜘蛛访问的部分，这样，该网站的部分或全部内容就可以不被搜索引擎访问和收录了，或者可以通过robots.txt指定使搜索引擎只收录指定的内容。

### 合理的HTTP返回码

不同的返回码，搜索引擎的处理逻辑是不一样的。

如果站点临时关闭，当网页不能打开时，建议使用503状态。503可以告知百度spider该页面临时不可访问，请过段时间再重试。

如果百度spider对您的站点抓取压力过大，请尽量不要使用404，同样建议返回503。这样百度spider会过段时间再来尝试抓取这个链接，如果那个时间站点空闲，那它就会被成功抓取了。

有一些网站希望百度只收录部分内容，例如审核后的内容，累积一段时间的新用户页等等。在这种情况，建议新发内容暂时返回403，等审核或做好处理之后，再返回正常状态的返回码。

站点迁移，或域名更换时，请使用301返回。

### 合适的title

title是告诉搜索引擎网页的主要内容。

每个网页应该有一个独一无二的标题，切忌所有的页面都使用默认标题

标题要主题明确和精练，包含这个网页中最重要的内容，且不罗列与网页内容不相关的信息

用户浏览通常是从左到右的，重要的内容应该放到title的靠前的位置

### 百度建议描述：

首页：网站名称 或者 网站名称_服务介绍/产品介绍

频道页：频道名称_网站名称

文章页：文章标题_频道名称_网站名称

### 合适的description

description是对网页内容的精练概括。这个标签存在与否不影响网页权值，只会用做搜索结果摘要的一个选择目标。 百度推荐做法：

为每个网页创建不同的description，避免所有网页都使用同样的描述

网站首页、频道页、产品参数页等没有摘要的网页最适合使用description

准确的描述网页，不要堆砌关键词，长度合理

### HTML语义化

HTML语义化是用标签和属性来描述内容。所以HTML语义化是SEO的基石。一般建议：

HTML结构要清晰和简洁

跳转使用`<a>`标签，不要使用js跳转

图片加alt说明

文章用`<article>`标签承载

## Vue单页项目的SEO

目前，对于SEO支持比较好的项目方案是采用服务端渲染。所以如果项目有SEO需求，那么比较好的方案是服务端渲染。

如果你已经采用了前后分离的单页项目，而你的网站内容不需要AJAX去获取内容和展示内容，那么可以试试 prerender-spa-plugin 这个插件，这个插件是一个webpack插件，可以帮助你在打包过程中通过无头浏览器去渲染你的页面，并生成对应的HTML。当然这个方案适合你的路由是静态的，并且路由数量非海量。

如果你的内容是AJAX动态获取的，那么vue单页项目可以试试 prerender ,这个是一个预渲染服务，可以帮你通过无头浏览器渲染页面，并返回HTML。这个方案和prerender-spa-plugin很相似，都是通过无头浏览器去渲染页面，不同的是渲染的时机，prerender-spa-plugin是在打包过程中渲染，注定了其只能渲染静态路由，而prerender 是在请求时渲染，所以可以渲染动态的路由。下面我重点介绍一下prerender方案。

### prerender 的使用

1、安装

```js
$ npm install prerender
```

2、启动服务 server.js

```js
const prerender = require('prerender');

const server = prerender();

server.start();
```

3、测试

```js
http://localhost:3000/render?url=https://www.example.com/
```

经过上面三个步骤，你就已经启动一个预渲染服务，并且会返回"www.example.com/"的内容，整个过程还是比较简单的。其github官网上面还介绍了它的许多中间件（Middleware），例如prerender-node (Express)、nginx.conf等，那么这个和 prerender 是什么关系呢？是否直接使用中间件就可以呢？下面介绍prerender是如何工作的吧。

### prerender方案的原理

首先服务端接收到一个页面的请求，然后判断这个请求是否来自搜索引擎的爬虫，如果不是，则直接返回单页项目的HTML，按照普通单页项目的工作模式（客户端渲染），如果是，则把请求转发给prerender服务，prerender服务会通过无头浏览器进行预渲染，渲染完成把内容返回，这样爬虫就可以拿到有内容的HTML了。prerender中间件就是用来判断请求是否来自搜索引擎爬虫和转发请求的。

值得注意的是，prerender服务是不包含无头浏览器的，所以需要自行安装chrome浏览器。因此，整个方案运行需要三部分：

chrome浏览器

prerender服务

prerender中间件

那么prerender服务是怎么知道页面渲染已经完成的呢？ Prerender服务通过计算未完成的请求数量，来确定页面何时完成加载。一旦未完成的请求数达到零，服务会等待一段时间（默认500ms），然后保存HTML。

### prerender的最佳实践

经过实践，请求一个经过prerender渲染的页面是时间，快的时候约2s，慢的时候会长达8s。一般来说，请求时间在3s以内是最好的。所以我从以下几个方面入手，探索prerender的优化方法。

#### 减少资源请求的时间

影响prerender渲染时间的资源主要有js请求资源和api请求资源，api请求时间一般由后端决定，所以我考虑的是如何减少js资源请求时间。一般prerender服务渲染的资源请求地址是由页面请求URL决定的，所以一般是线上的地址，如果我们把prerender服务部署在网站的服务器上，让prerender服务请求资源走本地，那么就可以缩短资源的请求时间了。

如果你的线上服务是开启了CDN的话，那么资源走本地还有一个好处，就是可以节省CDN流量。

#### 优化prerender选项

prerender提供了一些自定义的选项

pageDoneCheckInterval：这个参数是prerender检查页面请求是否完成的定时器时间，默认是500ms，即每500ms检查未完成的请求数量是否为零，我将其修改为100ms，提高其检查的频率。

waitAfterLastRequest：这个参数是最后一个请求完成之后等待的时间，默认是500ms，主要是请求完成之后，页面更新渲染需要时间，立即返回的话，可能请求的数据来不及渲染，我将时间修改为200ms。

#### prerender插件

httpHeaders —— 返回合理的HTTP状态码

添加httpHeaders这个插件，可以更改返回的HTML的HTTP状态码，添加方式如下

```js

var prerender = require('prerender');

var server = prerender()

server.use(prerender.httpHeaders());

server.start();
```

prerender通过识别在`<head>`中的`<meta>`标签来设置页面返回的HTTP状态码。

### blockResources —— 无需等待图片资源

prerender是根据未完成的请求数来判断是否渲染结束的。但是我们给搜索引擎返回的HTML只需要渲染通过js动态增加的DOM，其实不需要渲染css或者渲染接口返回的图片的，我们来看下prerender在渲染中是否会请求这些资源。 prerender可以开启是否打印请求，开启方式如下：

```js
var server = prerender({

logRequests: true

});
```

开启之后就可以在控制台看到请求了，请求里面是包含css和图片资源的。

```js

2019-07-17T04:34:03.180Z - 47 http://xxx.com/css/chunk-f4a02584.da8dca38.css

2019-07-17T04:34:03.180Z {

source: 'network',

level: 'error',

text: 'Failed to load resource: net::ERR_INVALID_ARGUMENT',

timestamp: 1563338043130.37,

url: 'http://xxx.com/wefid/css/chunk-f4a02584.da8dca38.css',

networkRequestId: '1000039068.65'

}

2019-07-17T04:34:03.924Z + 3 http://xxx.com/img/erweima_wx.a84d82ef.jpg

2019-07-17T04:34:03.924Z + 4 http://xxx.com/img/erweima_wb.06971584.png

```

为什么prerender要等待这些资源呢？因为prerender服务还有一个强大的功能，那就是Prerender.com，其可以通过一个接口给你返回如下的东西：

```shell

网页的HTML文件

网页的屏幕截图（视口或全屏）

网页的PDF文件

网页的HAR文件

执行您自己的javascript并返回json和HTML
```

很明显，这些功能是需要加载你所需的CSS或图片资源的，不然网页显示有问题。这个时候，如果你只需要满足SEO需求而不需要Prerender.com的功能的话，那么blockResources插件就可以派上用场了。插件添加方式如下：

```js

var prerender = require('prerender');

var server = prerender()

server.use(prerender.blockResources());

server.start();

```

使用blockResources插件之后，图片资源和字体资源会被abort（舍弃）。

自定义渲染结束时间

如果你想更细粒化地控制prerender的返回时机，提前结束或者延后结束，那么可以使用这个标志window.prerenderReady。

首先需要设置window.prerenderReady为false，prerender在检测到window.prerenderReady为false之后，会等待你设置为true再返回结果。

当你渲染完成之后，一般在接口请求完成并渲染完成之后

```js
window.prerenderReady = true;
```

这样你就可以更加自由地控制渲染结束的时机。

开启缓存

缓存这里有两个方面，一方面是HTTP缓存（浏览器缓存），另一方面是渲染结果缓存。

首先HTTP缓存可以让prerender服务不用频繁地发起资源请求，节省传输时间。这个我就不展开将，我想讲的是渲染结果缓存。prerender中间件提供了两种缓存方式， redis 或者 memcached ，以redis为例：

```js
$ npm install redis
```

```js

var redis = require("redis"),

client = redis.createClient();

prerender.set('beforeRender', function(req, done) {

client.get(req.url, done);

}).set('afterRender', function(err, req, prerender_res) {

client.set(req.url, prerender_res.body)

});

```

你可以通过 beforeRender 和 afterRender 这两个钩子进行细粒化地控制，对于内容变化频繁的不缓存或缓存时间短，对于内容变化不频繁的设置长时间缓存。开启缓存不仅可以加速返回时间，还可以减轻服务器的压力。

统计和监控

统计和监控可以放在中间件的 afterRender 中进行。

```js

prerender.set('afterRender', function(err, req, prerender_res) {

if(err){

// 这里是错误监控代码

// ...

// return

}

let {headers: req_headers, originalUrl} = req

let {headers: res_headers, body} = prerender_res

// 这里是统计代码，可以保存请求和返回的相关信息

})
```

小结

通过以上的优化方法(除了自定义渲染结束时间和开启缓存)，我已经将HTML的请求时间稳定在2.5s左右。

## 总结

以上就是我想讲的关于前端编码SEO的全部内容，总而言之，就是

合适的HTML标签和属性

合理的HTTP状态码

Sitemap & robot.txt

合适的渲染方案

参考文章：

[https://juejin.im/post/5d2d64f36fb9a07eba2c6f65](https://juejin.im/post/5d2d64f36fb9a07eba2c6f65)

[https://z.itpub.net/topic/110000101783](https://z.itpub.net/topic/110000101783)