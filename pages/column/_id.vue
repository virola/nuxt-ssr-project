<template>
  <div class="main clear">
    <div class="title clear">
      <h2>{{column.name}}</h2>
      <div class="sub-title tab-title" v-if="column.children && column.children.length">
        <router-link :to="{path: '/column', query: {cid: column.id}}" :class="{active: !$route.query.sid}">全部</router-link>
        <router-link v-for="(item, index) in column.children" :to="{path: '/column', query: {cid: column.id, sid: item.id}}" :key="index" :class="{active: item.id == $route.query.sid}">{{item.name}}</router-link>
      </div>
    </div>
    <!-- main area -->
    <div class="main-panel fl">
      <div class="list-info">
      </div>
      <articles :dataset="listQuery"></articles>
    </div>
    <aside class="side-panel fr">
      <side-block data-key="recommend"></side-block>
      <side-block data-key="tags"></side-block>
      <side-block data-key="zhaopin"></side-block>
      <side-block data-key="travelApply"></side-block>
      <side-block data-key="feed"></side-block>
    </aside>
  </div>
</template>

<script>
import {getColumnInfo} from '~/service/getData'
import Articles from '~/components/Articles'
import SideBlock from '~/components/SideBlock'

export default {
  head () {
    return {
      title: this.column.name
    }
  },
  components: {
    Articles,
    SideBlock
  },
  data () {
    return {
      // 主栏目信息
      id: 0,
      column: {},
      // 子栏目信息
      // sid: 0,
      // 文章列表
      listQuery: {},
      page: 1
    }
  },
  created () {
    this.initData()
  },
  computed: {
  },
  watch: {
    '$route': 'initData',
    'id': 'getInfo'
  },
  methods: {
    async initData () {
      const query = this.$route.query
      // this.sid = query.sid || 0
      // 赋值触发watch
      if (!this.column.id || this.column.id !== query.cid) {
        this.id = query.cid
      }
      this.page = query.page || 1
      this.listQuery = {
        category: query.sid || query.cid,
        page: this.page
      }
    },
    async getInfo (val) {
      this.column = await getColumnInfo(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  border-bottom: 1px solid #d8d8d8;
  margin-bottom: 10px;
  h2 {
    float: left;
    width: 240px;
    margin: 0;
    padding: 0 5px;
    font-size: 20px;
    line-height: 40px;
  }
  .sub-title {
    margin-left: 240px;
    border: 0;
  }
}
.main {
  margin-top: 10px;
}
.list-info {
  height: 42px;
}
</style>
