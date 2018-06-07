<template>
  <div class="container" :class="{'page-result': searchKeyword}">
    <div class="search-box">
      <form v-on:submit.prevent="submitSearch" class="search-form form-inline">
        <div class="search-group">
          <input v-model.trim="keyword" type="search" class="form-control form-control-inline" required placeholder="请输入关键词"><button class="icons search-btn" @click="submitSearch"><icon name="search"></icon></button>
        </div>
      </form>
      <!-- hot tags -->
      <div class="search-tag-list" v-if="!searchKeyword && tags.length">
        <div class="title">
          <i class="icons"><icon name="regular/bookmark"></icon></i>
          热门标签
        </div>
        <ul>
          <li v-for="(item, index) in tags" :key="index" class="item">
            <router-link :to="'search?keyword=' + item.text">{{item.text}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- search result -->
    <div class="search-result" v-if="searchKeyword">
      <div class="result-content" v-if="resultList.length">
        <div class="tab-title">
          <router-link :to="{query: {page: 0, type: 0, keyword: keyword}}" :class="{'active': type == 0}">全部</router-link>
          <router-link :to="{query: {page: 0, type: 1, keyword: keyword}}" :class="{'active': type == 1}">文章</router-link>
          <router-link :to="{query: {page: 0, type: 2, keyword: keyword}}" :class="{'active': type == 2}">视频</router-link>
          <router-link :to="{query: {page: 0, type: 3, keyword: keyword}}" :class="{'active': type == 3}">旅行报名</router-link>
          <router-link :to="{query: {page: 0, type: 4, keyword: keyword}}" :class="{'active': type == 4}">招聘信息</router-link>
          <router-link :to="{query: {page: 0, type: 5, keyword: keyword}}" :class="{'active': type == 5}">有方服务</router-link>
        </div>
        <div class="result-info">
          含 {{pager.total}} 条搜索结果
        </div>
        <list :dataset="resultList"></list>
        <pager v-if="pager" @goPage="goPage" :pageInit="page" :pageTotal="pager.pagetotal"></pager>
      </div>
      <!-- no result -->
      <div class="result-nocontent" v-else>
        没有搜索结果
      </div>
    </div>
  </div>
</template>
<script>
import {getTagListData, getSearchList} from '~/service/getData'
import Pager from '~/components/Pager'
import List from '~/components/List'

export default {
  head () {
    return {
      title: this.title
    }
  },
  components: {
    Pager,
    List
  },
  data () {
    return {
      searchKeyword: '',
      keyword: '',
      tags: [],
      title: '搜索',
      type: 0,
      page: 1,
      resultList: [],
      pager: {
        total: 0
      }
    }
  },
  async created () {
    let resp = await getTagListData()
    this.tags = [...resp.list]
    this.initData()
  },
  watch: {
    '$route': 'initData'
  },
  methods: {
    async initData () {
      this.searchKeyword = this.$route.query.keyword || ''
      this.keyword = this.searchKeyword
      this.type = this.$route.query.type || 0
      this.page = this.$route.query.page || 1

      // search list
      if (this.searchKeyword) {
        this.title = this.searchKeyword + ' 的搜索结果'
        let data = await getSearchList({
          keyword: this.keyword,
          page: this.page,
          category: this.type
        })
        this.resultList = data.list
        this.pager = data.pager
        // console.log(this.resultList)
      }
    },
    goPage (params) {
      let query = {
        keyword: this.keyword,
        type: this.type,
        page: params.page
      }
      this.$router.push({query: query})
    },
    submitSearch () {
      // todo
      if (!this.keyword) {
        return
      }
      this.$router.push({query: {keyword: this.keyword}})
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/mixin';

.search-box {
  width: 600px;
  margin: 40px auto;
  color: #656565;
}
.page-result {
  .search-box {
    margin: 40px 0;
  }
}
.search-group {
  width: 100%;
  border: 1px solid #d8d8d8;
  .form-control {
    border: 0;
    width: 565px;
  }
  .search-btn {
    width: 32px;
    height: 100%;
    padding: 0;
    background: none;
    border: 0;
    color: #d8d8d8;
  }
}
.search-tag-list {
  .title {
    padding: 10px 20px;
    .icons {
      margin-right: 5px;
    }
  }
  ul {
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
  }
  li {
    width: 90px;
    margin: 5px;
  }
  a {
    display: block;
    width: 100%;
    border: 1px solid #999;
    @include borderRadius(2px);
    text-align: center;
    color: #656565;
    &:hover {
      text-decoration: none;
      background: #999;
      color: #fff;
    }
  }
}
// 搜索结果
.search-result {
  width: 800px;
}
.result-info {
  margin: 20px 0 0;
}
</style>
