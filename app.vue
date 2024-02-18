
<script setup alt="组合式 API (Composition API)">
//在　<script setup>　中导入和顶层变量/函数都能够在模板中直接使用。


// import ButtonCounter from './ButtonCounter.vue' //使用组件

import { ref, computed,watch,onMounted,onUnmounted } from 'vue'



// 定义组件的props
//defineProps是一个仅 <script setup> 中可用的编译宏命令，并不需要显式地导入。声明的 props 会自动暴露给模板。
/*
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  disabled: [String, Boolean], // String在前则值将被解析为空字符串 (disabled="")
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数
  // 在 3.4+ 中完整的 props 作为第二个参数传入
  propF: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
})
*/

//在 3.4 版本之前 按照如下的方式来实现v-model组件 如你所见，这显得冗长得多。然而，这样写有助于理解其底层机制。
const props = defineProps(['modelValue','title'])
//声明触发的事件
defineEmits(['update:modelValue'])
console.log("props.title",props.title)

// vue3 中 defineProps(['modelValue','title']) 和 defineModel() 实现v-model 这两种方式有什么区别？
// v-model 可以在组件上使用以实现双向绑定。 
// defineModel() 返回的值是一个 ref。它可以像其他 ref 一样被访问以及修改，不过它能起到在父组件和当前变量之间的双向绑定的作用
const model = defineModel() // 这意味着你也可以用 v-model 把这个 ref 绑定到一个原生 input 元素上，在提供相同的 v-model 用法的同时轻松包装原生 input 元素
// defineModel 是一个便利宏。 编译器将其展开为以下内容：
// 一个名为 modelValue 的 prop，本地 ref 的值与其同步；
// 一个名为 update:modelValue 的事件，当本地 ref 的值发生变更时触发。

// 也可添加参数和多个 v-model 绑定　const title = defineModel('title')　使用时v-model:title="title" 
// 可是使用defineModel()后怎么手动emit('update:modelValue', 1)出去？不用，直接赋值变量model＝xxx 就行







// 声明一个 ref 来存放该元素的引用
const theTextEm = ref(null) // 必须和模板里的 ref 同名



// 响应式状态
const count = ref(0)
const list = ref([{name:'haha',msg:11},{name:'hehe',msg:22}])
let intervalId
// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}


const x = ref(0)
const y = ref(0)

// 方法名
const update = e => {
  x.value = e.pageX
  y.value = e.pageY
}



// 一个计算属性 ref
const theMsg = computed(() => {
  return count.value > 9 ? '过了' : '个位数'
})



// 监听可以直接侦听一个 ref
watch(count, async (newV,oldV) => {
   console.log(newV,oldV)
}
,{ deep: true } //深层侦听器 直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器 ,当然也可以 显式地加上 deep 选项，
//也可通过传入 immediate: true 选项来强制侦听器的回调立即执行
)


// 注册一个回调函数，在组件挂载完成后执行。
onMounted(() => {
  intervalId = setInterval(() => {
    console.log(Date.now())
  },1000)
  console.log(`The initial count is ${count.value}.`)
  
  //3 秒后聚焦到这个文本框上
  setTimeout(() => {
    theTextEm.value.focus()
  }, 3000);

  window.addEventListener('mousemove', update)
})

//注册一个回调函数，在组件实例被卸载之后调用。
onUnmounted(() => clearInterval(intervalId))
// onUnmounted(() => window.removeEventListener('mousemove', update))

</script>

<template alt="根组件没有设置 template 选项时，Vue 将自动使用容器的 innerHTML 作为模板。">
  <!-- 
    可有可无的 app.vue 文件,可以删除它没什么用，对于 Nuxt 3，该目录是可选的。如果不存在，Nuxt 将不会包含vue-router依赖项。
    为了减少应用程序的包大小，这意味着如果您仅使用app.vue页面系统则不会包含vue路由器 vue-router .
    若要强制页面系统，请在nuxt.config中设置pages:true或具有app/router.options.ts。
    请记住，它app.vue是 Nuxt 应用程序的主要组件。您添加到其中的任何内容（JS 和 CSS）都将是全局的并包含在每个页面中。
   -->
   <NuxtLayout>
    <!-- 如果您有目录要显示当前页面 NuxtPage 与页面一起使用 -->
    <NuxtPage />
  </NuxtLayout>

  <hr />
  <button @click.stop="increment">
   Count is: {{ count }}
  <slot>
    Submit <!-- 插槽指定默认内容（父组件没有提供任何插槽内容时在 <button> 内渲染“Submit”） -->
  </slot>
  </button>
  <slot name="header" alt="具名插槽"></slot>
  <!-- 
    要为具名插槽传入内容
    <div slot="header" alt="vue2中命名插槽的传统写法"></div>
    <div v-slot:header alt="vue3中的新语法，与传统写法相似但更加直观和易读"></div>
    <div #header alt="vue3中v-slot有对应的简写#号　Vue 3中的缩写语法，用#来定义命名插槽。它也是一种简洁的方式来定义命名插"></div>
    使用 JavaScript 函数来类比可能更有助于你来理解具名插槽：
    ${slots.header}
   -->
  {{theMsg}}

  <ul>
  <template v-for="(item,index) in list" :key="index">
    <li >{{ item.name }} | {{ item.msg }}</li>
  </template>
  <!-- <ButtonCounter alt="推荐为子组件使用 PascalCase 的标签名，以此来和原生的 HTML 元素作区分" /> -->
  <slot />
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    ref="theTextEm"
  />

   {{x}},{{y}}

   <hr />
   <NuxtWelcome />
  组件结束
</ul>

</template>

<style>
/* 在组件内导入样式表 */
/* @import url("~/assets/css/second.css"); */
</style>
