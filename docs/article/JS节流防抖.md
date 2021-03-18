# JS节流防抖

[[TOC]]

>  在前端开发的过程中，我们经常会需要绑定一些持续触发的事件，如 resize、scroll、mousemove 等等，但有些时候我们并不希望在事件持续触发的过程中那么频繁地去执行函数。
>
> 通常这种情况下我们怎么去解决的呢？一般来讲，防抖和节流是比较好的解决方案。

让我们先来看看在事件持续触发的过程中频繁执行函数是怎样的一种情况。

html 文件中代码如下

```js
<div id="content" style="height:150px;line-height:150px;text-align:center; color: #fff;background-color:#ccc;font-size:80px;"></div>
<script>
    let num = 1;
    let content = document.getElementById('content');

    function count() {
        content.innerHTML = num++;
    };
    content.onmousemove = count;
</script>
```

在上述代码中，div 元素绑定了 mousemove 事件，当鼠标在 div（灰色）区域中移动的时候会持续地去触发该事件导致频繁执行函数。效果如下

![img](/blog/img/other/debounce1.webp)
  可以看到，在没有通过其它操作的情况下，函数被频繁地执行导致页面上数据变化特别快。所以，接下来让我们来看看防抖和节流是如何去解决这个问题的。

## 防抖（debounce）

**所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。**

防抖函数分为非立即执行版和立即执行版。

非立即执行版：

```js
function debounce(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait);
    }
}
```

非立即执行版的意思是触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。

我们依旧使用上述绑定 mousemove 事件的例子，通过上面的防抖函数，我们可以这么使用

```js
content.onmousemove = debounce(count,1000);
```

![img](/blog/img/other/debounce2.webp)

可以看到，在触发事件后函数 1 秒后才执行，而如果我在触发事件后的 1 秒内又触发了事件，则会重新计算函数执行时间。

上述防抖函数的代码还需要注意的是 this 和 参数的传递

```js
let context = this;
let args = arguments;
```

防抖函数的代码使用这两行代码来获取 this 和 参数，是为了让 debounce 函数最终返回的函数 this 指向不变以及依旧能接受到 e 参数。

立即执行版：

```js
function debounce(func,wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);

        let callNow = !timeout;
        timeout = setTimeout(() => {
            timeout = null;
        }, wait)

        if (callNow) func.apply(context, args)
    }
}
```

立即执行版的意思是触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。

使用方法同上，效果如下

![img](/blog/img/other/debounce3.webp)

在开发过程中，我们需要根据不同的场景来决定我们需要使用哪一个版本的防抖函数，一般来讲上述的防抖函数都能满足大部分的场景需求。但我们也可以将非立即执行版和立即执行版的防抖函数结合起来，实现最终的双剑合璧版的防抖函数。

```js
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func,wait,immediate) {
    let timeout;

    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}
```

## 节流（throttle）

**所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。**节流会稀释函数的执行频率。

对于节流，一般有两种方式可以实现，分别是时间戳版和定时器版。

时间戳版：

```jsx
function throttle(func, wait) {
    let previous = 0;
    return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
```

使用方式如下

```swift
content.onmousemove = throttle(count,1000);
```

效果如下



![img](/blog/img/other/debounce4.webp)



可以看到，在持续触发事件的过程中，函数会立即执行，并且每 1s 执行一次。

定时器版:

```jsx
function throttle(func, wait) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args)
            }, wait)
        }

    }
}
```

使用方式同上，效果如下

![img](/blog/img/other/debounce5.webp)

可以看到，在持续触发事件的过程中，函数不会立即执行，并且每 1s 执行一次，在停止触发事件后，函数还会再执行一次。

我们应该可以很容易的发现，其实时间戳版和定时器版的节流函数的区别就是，时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候。

同样地，我们也可以将时间戳版和定时器版的节流函数结合起来，实现双剑合璧版的节流函数。

双剑合璧版:

```tsx
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
function throttle(func, wait ,type) {
    if(type===1){
        let previous = 0;
    }else if(type===2){
        let timeout;
    }
    return function() {
        let context = this;
        let args = arguments;
        if(type===1){
            let now = Date.now();

            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }else if(type===2){
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }
    }
}
```

## 函数代码

### 防抖

```js
  /**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 * @description 函数的防抖
 */
function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
 
  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
```

### 节流

```js
// 节流
```

### 合并

```js
  /**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @param {number} type 1 防抖 2 节流 默认为1
 * @return {*}
 * @description 函数的防抖和节流
 */
function debounceOrThrottle(func, wait, type, immediate = false) {
  let timeout, args, context, timestamp, result

  if (!type) type = 1

  if (type !== 1 && type !== 2) type = 1

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (type === 1 && last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}
```

