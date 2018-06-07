// 加载更多组件
<template>
  <div class="loadmore clear center">
    <span v-if="loading">正在加载...</span>
    <span v-else-if="!loadedOver">加载更多</span>
    <span v-else>没有更多内容</span>
  </div>
</template>
<script>
export default {
  name: 'loadmore',
  props: {
    // 初始页数
    pageInit: {
      type: Number,
      default: 1
    },
    // 总页数
    pageTotal: {
      type: Number,
      required: true
    },
    // 父组件数据加载完成，触发本组件的loadfinish
    loadFinish: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // 当前页数
      pageCurrent: 1,
      loading: false,
      timer: null
    }
  },
  watch: {
    'loadFinish': function (val) {
      // 父组件定义加载完成
      if (this.loading !== !val) {
        this.loading = !val
      }
    },
    'pageInit': function (newVal) {
      if (this.pageCurrent !== newVal) {
        this.pageCurrent = newVal
      }
    }
  },
  computed: {
    'loadedOver': function () {
      return (this.pageTotal <= this.pageCurrent)
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    this.bindScroll()
  },
  beforeDestory () {
    // 解绑事件
    this.unbindScroll()
  },
  methods: {
    initData () {
      this.pageCurrent = this.pageInit
      this.loading = !this.loadFinish
    },
    bindScroll () {
      // scroll into view
      document.addEventListener('scroll', this.judgeLoad, false)
    },
    unbindScroll () {
      document.removeEventListener('scroll', this.judgeLoad)
    },
    judgeLoad () {
      if (this.loading || this.loadedOver) {
        return
      }
      const vm = this
      // lazy 1 sec
      if (vm.timer) {
        clearTimeout(vm.timer)
      }
      vm.timer = setTimeout(function () {
        // client visible
        const winH = window.innerHeight
        const pos = vm.$el.getBoundingClientRect()
        if (pos.top < winH) {
          vm.loading = true
          vm.$emit('loadmore', vm.pageCurrent)
        }
      }, 1000)
    }
  }
}
</script>
