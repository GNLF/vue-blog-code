# TypeScript 支持

在 uni-app 中使用 ts 开发，请参考 [Vue.js TypeScript 支持](https://cn.vuejs.org/v2/guide/typescript.html) 说明。

## 注意事项

在 uni-app 中使用 ts 需要注意以下事项。

### 在 vue 文件的 script 节点声明 lang="ts"

声明 `lang="ts"` 后，该 vue 文件 import 进来的所有 vue 组件，均需要使用 ts 编写。

**示例代码**

改造 uni-badge.vue

```javascript
<script lang="ts">
    // 仅展示需要修改的核心代码，完整代码请参考原来的组件。
    import Vue from 'vue';
    export default Vue.extend({
        props: {
            type: {
                type: String,
                default: 'default'
            },
            inverted: {
                type: Boolean,
                default: false
            },
            text: {
                type: [String, Number],
                default: ''
            },
            size: {
                type: String,
                default: 'normal'
            }
        },
        computed: {
            setClass(): string {
                const classList: string[] = ['uni-badge-' + this.type, 'uni-badge-size-' + this.size];
                if (this.inverted === true) {
                    classList.push('uni-badge-inverted')
                }
                return classList.join(" ")
            }
        },
        methods: {
            onClick() {
                this.$emit('click')
            }
        }
    })
</script>
```

在 index.vue 中引用 uni-badge 组件

```javascript
<script lang="ts">
    import Vue from 'vue';
    import uniBadge from '../../components/uni-badge.vue';
    export default Vue.extend({
        data() {
            return {
                title: 'Hello'
            }
        },
        components:{
            uniBadge
        }
    });
</script>
```