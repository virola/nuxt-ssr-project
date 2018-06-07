<template>
  <div>
    <banner />
    <section class="main clear">
      <div id="main-panel" class="main-panel fl">
        <div class="tab-title">
          <router-link to="/">热门</router-link>
          <router-link to="/?type=1">专题</router-link>
          <router-link to="/?type=2">人物</router-link>
          <router-link to="/?type=3">项目</router-link>
          <router-link to="/?type=4">咨询</router-link>
          <router-link to="/?type=5">深度</router-link>
          <router-link to="/?type=6">视频</router-link>
        </div>
        <articles :dataset="listQuery" :showLoadmore="false"></articles>
      </div>
      <aside class="side-panel fr">
        <side-block data-key="zhaopin"></side-block>
        <side-block data-key="travelApply"></side-block>
        <side-block data-key="hot"></side-block>
        <side-block data-key="feed"></side-block>
      </aside>
    </section>
  </div>
</template>
<script>
import Banner from '~/components/Banner'
import Articles from '~/components/Articles'
import SideBlock from '~/components/SideBlock'

import {getBannerData, getArticleList} from '~/service/getData'

export default {
  asyncData (context) {
    // called every time before loading the component
    const query = context.query
    console.log(query)
    let type = +query.type || 0
    let page = +query.pageNum || 0
    let listQuery = {
      category: type,
      page: page
    }
    // console.log('index')
    return {
      type, page, listQuery
    }
  },
  head: {
    // Set Meta Tags for this Page
    title: '首页'
  },
  components: {
    Banner, Articles, SideBlock
  },
}
</script>
<style lang="scss" scoped>
@import 'assets/mixin';

.tab-title {
  margin-bottom: 20px;
}
.nuxt-link-exact-active {
  border-bottom: 2px solid $main-color;
  color: $main-color;
}
</style>

