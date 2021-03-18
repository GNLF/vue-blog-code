## 响应式数据基础API

#### reactive

> reactive是vue3中提供的实现响应式数据的方法,在vue2中响应式数据是通过defineProperty来实现的,而在vue3中响应式数据是通过ES6的Proxy来实现的,接收一个普通对象,然后返回该普通对象的响应式代理对象

```html
<template>
	<div>
        <p>{{ state }}</p>
        <button @click="handleClick"></button>
    </div>
</template>
<script>
import { reactive } from 'vue'
export default {
    setup() { 
        let obj = { name: '张叁', age: 10 }
        let state = reactive(obj)
        // state和obj的关系:
        // 引用关系,state的本质是一个Proxy对象,在这个Proxy对象中引用了obj
        function handleClick() {
            // 两种方式都可改变数值
            obj.name = '李思';   // 不会触发视图更新
            state.name = '李思'; // 触发视图更新
        }
        return { state, handleClick }
    }
}
</script>
```

注意点:

reactive的参数必须是对象(json/arr),如果给reactive传递了其他对象

- 默认情况下修改对象,界面不会自定更新
- 如果想更新,可以通过重新赋值的方式

#### ref

> ref和reactive一样,也是用来实现响应式数据的方法,由于reactive必须传递一个对象,所以导致在企业开发中如果只想让某个变量实现响应式的时候回非常麻烦,所以Vue3提供了ref方法,实现对简单值的监听

- 本质
  - ref底层的本质其实还是reactive,系统会自动根据ref传入的值进行转换`ref(XX)->reactive({value:XX})`
- 注意点
  - 在Vue中使用ref的值不用通过value获取
  - 在JS中使用ref的值必须通过value获取
  - 在template中使用ref方法定义的数据,vue在解析数据之前会自动添加`.vue`,而reactive方法定义的数据则不会,(vue是根据数据的属性`__v_ref`来判断定义类型)

#### isRef

> 判断是否为ref定义的数据

```js
isRef(XX); // 返回Boolean
```

#### isReactive

> 判断是否为reactive定义的数据

```js
isReactive(XX); // 返回Boolean
```

#### shallowReactive

> 默认情况下,ref和reactive定义的数据都是递归监听,如果数据量比较大时,非常消耗性能 
>
> 而shallowReactive只会监听第一层数据,只有第一层数据发生改变,就会更新视图

```html
<template>
	<div>
        <p>{{ state.a }}</p>
        <p>{{ state.gf.b }}</p>
        <p>{{ state.gf.f.c }}</p>
        <p>{{ state.gf.f.s.d }}</p>
        <button @click="handleClick"></button>
    </div>
</template>
<script>
import { shallowReactive } from 'vue'
export default {
	setup() {
        let state = shallowReactive({
            a: 'a',
            gf: {
                b: 'b',
                f: {
                    c: 'c',
                    s: {
                        d: 'd'
                    }
                }
            }
        })
        function handleClick() {
            state.a = '1';       //如果将这行注释掉,视图不会更新.
            state.gf.b = '2';
            state.gf.f.c = '3';
            state.gf.f.s.d = '4';
            console.log(state);   // state为Proxy对象, 以下为非响应式数据
            console.log(state.gf);
            console.log(state.gf.f);
            console.log(state.gf.f.s);
        }
        return { state, handleClick }
    }
}
</script>
```

#### shallowRef

> 通过shallowRef创建的数据,监听的是`.value`的变化并不是第一层的变化.底层原理类似于ref与reactive,对应的`.value`才是第一层.

```html
<template>
	<div>
        <p>{{ state.a }}</p>
        <p>{{ state.gf.b }}</p>
        <p>{{ state.gf.f.c }}</p>
        <p>{{ state.gf.f.s.d }}</p>
        <button @click="handleClick"></button>
    </div>
</template>
<script>
import { shallowRef, triggerRef } from 'vue'
export default {
	setup() {
        let state = shallowRef({
            a: 'a',
            gf: {
                b: 'b',
                f: {
                    c: 'c',
                    s: {
                        d: 'd'
                    }
                }
            }
        })
        function handleClick() {
            state.value.a = '1';       // 以这种方式修改数据,视图不会更新.
            state.value.gf.b = '2';
            state.value.gf.f.c = '3';
            state.value.gf.f.s.d = '4';
            
            // 希望视图更新
            state.value = {            // 以此种方式修改数据,视图才会更新
                a: '1',
                gf: {
                    b: '2',
                    f: {
                        c: '3',
                        s: {
                            d: '4'
                        }
                    }
                }
            }
            
            // 若只更新第四层的数据,并希望视图更新,可以调用triggerRef()方法刷新state
            state.value.gf.f.s.d = '4';
            triggerRef(state)
            
            console.log(state);        // state为Proxy对象, 以下为非响应式数据
            console.log(state.value);   
            console.log(state.value.gf);
            console.log(state.value.gf.f);
            console.log(state.value.gf.f.s);
        }
        return { state, handleClick }
    }
}
</script>
```

- 注意:vue3只有triggerRef方法来强制刷新视图,没有提供triggerReactive
- 应用场景:一般情况下使用ref和reactive即可,只有在需要监听的数据量比较大的时候,才通过shallowRef和shallowReactive来监听数据

#### toRaw

> 获取ref和reactive绑定的原始数据.
>
> ref/reactive绑定的数据,每次修改都会被追踪,进而更新UI界面.在只需要操作数据,但不需要更新UI界面时,可以用toRaw来获取绑定的原始数据.

```js
import { reactive, toRaw } from 'vue'
export default {
    setup() {
        let obj1 = { name: 'zs' }
        let state1 = reactive(obj1)
        let obj2 = toRaw(state1)
        console.log(obj1 === obj2)  // true
        
        let obj3 = { name: 'ls' }
        let state2 = ref(obj3)
        let obj4 = toRaw(state2.value)
        console.log(obj3 === obj4) // true
    }
}
```

#### markRaw

> 禁止数据被追踪,绑定为响应式

```js
import { reactive, markRaw } from 'vue'
export default {
    setup() {
        let obj = { name: 'zs' }
        obj = markRaw(obj)
        let state = reactive(obj) // 此处state为非响应式数据,改变不会触发视图更新
    }
}
```

#### toRef

> 绑定对象的某一个属性为响应式数据.
>
> 应用场景: 如果想让响应式数据跟原数据关联,改变数值,但不想更新视图.

```js
import { ref, toRef } from 'vue'
export default {
	setup() {
        let obj = { name: 'zs', age: 12 }
        
        let state1 = ref(obj.name) // 复制obj.name的值
        let state2 = toRef(obj, 'name') // 引用obj.name的值
        
        function handleClick() {
            state1.value = 'ls'  // 不会改变原数据的值,会自动触发视图更新
            state2.value = 'ls' // 会改变原数据的值,不会自动触发视图更新
        }
        return { state1, state2, handleClick }
    }
}
```

#### toRefs

> 绑定对象的多个属相为响应式数据

```js
import { toRefs } from 'vue'
export default {
	setup() {
        let obj = { name: 'zs', age: 12 }
        
        let state = toRefs(obj)
        
        function handleClick() {
            state.name.value = 'ls'
            state.age.value = 20
        }
        return { state, handleClick }
    }
}
```

### Vue2与Vue3响应式的区别:

#### vue2的响应式

- 核心:
  - 对象: 通过defineProperty对对象的已有属性值的读取和修改进行劫持(监视/拦截)
  - 数组: 通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持

```js
Object.defineProperty(data, 'count', {
    get () {}, 
    set () {}
})
```

- 问题
  - 对象直接新添加的属性或删除已有属性, 界面不会自动更新
  - 直接通过下标替换元素或更新length, 界面不会自动更新 arr[1] = {}

#### Vue3的响应式

- 核心:
  - 通过Proxy(代理): 拦截对data任意属性的任意(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...
  - 通过 Reflect(反射): 动态对被代理对象的相应属性进行特定的操作
  - 文档:
    - [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
    - [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

```js
new Proxy(data, {
	// 拦截读取属性值
    get (target, prop) {
    	return Reflect.get(target, prop)
    },
    // 拦截设置属性值或添加新属性
    set (target, prop, value) {
    	return Reflect.set(target, prop, value)
    },
    // 拦截删除属性
    deleteProperty (target, prop) {
    	return Reflect.deleteProperty(target, prop)
    }
})

proxy.name = 'tom'
```