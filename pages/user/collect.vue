<template>
  <div>
    <h3 class="tab-title">
      <router-link to="/user/collect" :class="{'active': type == 0}">全部</router-link>
      <router-link to="/user/collect?type=1" :class="{'active': type == 1}">文章</router-link>
      <router-link to="/user/collect?type=2" :class="{'active': type == 2}">视频</router-link>
      <router-link to="/user/collect?type=3" :class="{'active': type == 3}">旅行报名</router-link>
      <router-link to="/user/collect?type=4" :class="{'active': type == 4}">行业资讯</router-link>
    </h3>
    <div class="main-content">
      <ul class="card-list">
        <li class="list-item" v-for="(item,index) in list" :key="index">
          <router-link class="link-cover" :to="{path: '/article', query:{id: item.id}}"></router-link>
          <router-link :to="{path: '/article', query:{id: item.id}}" class="article-pic"><img :src="item.pic" :alt="item.title"/>
          <span class="video-btn" v-if="item.video"><i class="icons"><icon name="play"></icon></i></span>
          </router-link>
          <div class="article-text">
            <p class="article-column"><i class="icons"><icon name="regular/bookmark"></icon></i>{{item.col_title}}</p>
            <h3><router-link :to="{path: '/article', query:{id: item.id}}" :title="item.title">{{item.title}}</router-link></h3>
            <div class="article-info">
              <p class="article-brief">{{item.brief}}</p>
              <p class="article-author">{{item.author}}</p>
              <p class="article-date">{{item.date}}</p>
            </div>
          </div>
        </li>
      </ul>
      <pager v-if="pager" @goPage="goPage" :pageInit="page" :pageTotal="pager.pagetotal"></pager>
    </div>
  </div>
</template>
<script>
import {getCollectList} from '~/service/getData'
import Pager from '~/components/Pager'

export default {
  data () {
    return {
      list: [],
      pager: null
    }
  },
  components: {
    Pager
  },
  created () {
    this.initData()
  },
  watch: {
    '$route': 'initData'
  },
  methods: {
    async initData () {
      this.type = +this.$route.query.type || 0
      this.page = +this.$route.query.page || 1
      let fetchData = await getCollectList('', this.type, this.page)
      this.list = fetchData.list
      this.pager = fetchData.pager
      // console.log(this.page, this.pager)
    },
    goPage (params) {
      // this.page = params.page
      let query = {
        type: this.type,
        page: params.page
      }
      // console.log(query)
      this.$router.push({query: query})
    }
  }
}
</script>
