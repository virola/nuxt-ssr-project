<template>
  <div class="pager-wrap" v-if="pageTotal > 1">
    <div class="pager-pages">
      <a v-show="pageCurrent > 1 && showPrev" @click="go(pageCurrent - 1)">&lt;</a>
      <a :class="{active: pageCurrent == 1 ? true : false}" @click="go(1)">1</a>
      <strong v-show="pages[0] > 2">…</strong>
      <a v-for="page in pages" :key="page" :class="{active: pageCurrent == page ? true : false}" @click="go(page)">{{page}}</a>
      <strong v-show="pages[pages.length-1] < pageTotal - 1">…</strong>
      <a v-if="pageTotal > 1" :class="{active: pageCurrent == pageTotal ? true : false}" @click="go(pageTotal)">{{pageTotal}}</a>
      <a v-show="pageCurrent < pageTotal && showNext" @click="go(pageCurrent + 1)">&gt;</a>
    </div>
  </div>
</template>
<script>
// 翻页组件
// emmitter: goPage(page)
export default {
  name: 'pager',
  props: {
    pageTotal: { // 总页数
      type: Number,
      default: 1,
      required: true
    },
    showItems: { // 显示出来的页数，如: 1 ... 34[5]67 ... 10
      type: Number,
      default: 5
    },
    showPrev: { // 是否显示“上一页”
      type: Boolean,
      default: true
    },
    showNext: { // 是否显示“下一页”
      type: Boolean,
      default: true
    },
    pageInit: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      pageCurrent: 0
    }
  },
  created () {
    // 初始化时pageCurrent赋值
    this.pageCurrent = this.pageInit
  },
  methods: {
    go (page) {
      if (page < 1) {
        page = 1
      }
      if (page > this.pageTotal) {
        page = this.pageTotal
      }
      if (page === this.pageCurrent) {
        return
      }
      this.pageCurrent = parseInt(page, 10)
      // 触发事件 goPage
      this.$emit('goPage', {
        page: this.pageCurrent
      })
    }
  },
  watch: {
    'pageInit': function (newVal) {
      if (this.pageCurrent !== newVal) {
        this.pageCurrent = newVal
      }
    }
  },
  computed: {
    pages () {
      // 根据起始页码和结束页码得到页码数组
      let getPages = (start, end) => {
        if (start <= 1 || start > end || start >= this.pageTotal) {
          start = 2
        }
        if (end >= this.pageTotal || end < start || end <= 1) {
          end = this.pageTotal - 1
        }
        let arr = []
        for (let i = start; i <= end; i++) {
          arr.push(i)
        }
        return arr
      }

      let counts = this.showItems
      if (this.pageTotal < counts + 2) {
        return getPages(2, this.pageTotal)
      } else {
        if (this.pageCurrent <= Math.ceil(counts / 2)) {
          return getPages(2, counts)
        } else if (this.pageCurrent >= this.pageTotal - Math.floor(counts / 2)) {
          return getPages(this.pageTotal + 1 - counts, this.pageTotal - 1)
        } else {
          let half = Math.ceil(counts / 2) - 1
          let end = this.pageCurrent + half
          if (counts % 2 === 0) {
            end++
          }
          return getPages(this.pageCurrent - half, end)
        }
      }
    }
  }
}
</script>
