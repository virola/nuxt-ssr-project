// 竖形显示文章列表的组件。左3右2，5个一组
<template>
  <div>
    <section class="section-list list-article masonry clear">
      <ul class="masonry-left">
        <li class="list-item" v-for="(item,index) in list" v-if="index % 5 % 2 === 0" :key="index">
          <router-link class="link-cover" :to="{path: 'article', query:{id: item.id}}"></router-link>
          <router-link :to="{path: 'article', query:{id: item.id}}" class="article-pic"><img :src="item.pic" alt="item.title"/>
          <span class="video-btn" v-if="item.video"><i class="icons"><icon name="play"></icon></i></span>
          </router-link>
          <div class="article-text">
            <p class="article-column"><i class="icons"><icon name="regular/bookmark"></icon></i>{{item.col_title}}</p>
            <h3><router-link :to="{path: 'article', query:{id: item.id}}">{{item.title}}</router-link></h3>
            <div class="article-info">
              <p class="article-brief">{{item.brief}}</p>
              <p class="article-author">{{item.author}}</p>
              <p class="article-date">{{item.date}}</p>
            </div>
          </div>
        </li>
      </ul>
      <ul class="masonry-right">
        <li class="list-item" v-for="(item,index) in list" v-if="index % 5 % 2 !== 0"  :key="index">
          <router-link class="link-cover" :to="{path: 'article', query:{id: item.id}}"></router-link>
          <router-link :to="{path: 'article', query:{id: item.id}}" class="article-pic"><img :src="item.pic" alt="item.title"/></router-link>
          <div class="article-text">
            <p class="article-column"><i class="icons"><icon name="regular/bookmark"></icon></i>{{item.col_title}}</p>
            <h3><router-link :to="{path: 'article', query:{id: item.id}}">{{item.title}}</router-link></h3>
            <div class="article-info">
              <p class="article-brief">{{item.brief}}</p>
            </div>
            <p class="article-date">{{item.author}} | {{item.date}}</p>
          </div>
        </li>
      </ul>
    </section>
    <!-- loadmore components -->
    <loadmore v-if="showLoadmore" @loadmore="loadMoreData" :pageInit="pager.pagenum || 1" :pageTotal="pager.pagetotal || 0" :loadFinish="loadFinish"></loadmore>
  </div>
</template>
<script>
import {getArticleList} from '~/service/getData'
import Loadmore from '~/components/Loadmore'

export default {
  name: 'articles',
  props: {
    // query 参数
    'dataset': {
      type: Object,
      default: {
        page: 1,
        category: 0
      }
    },
    'showLoadmore': {
      type: Boolean,
      default: true
    }
  },
  components: { Loadmore },
  data () {
    return {
      list: [],
      pager: {},
      query: {},
      loadFinish: true
    }
  },
  created () {
    this.initData()
  },
  watch: {
    'dataset': 'initData'
  },
  methods: {
    async initData () {
      // this.query = this.dataset
      const data = await getArticleList({
        page: this.dataset.page,
        category: this.dataset.category
      })
      this.list = data.list
      this.pager = data.pager
    },
    async loadMoreData (page) {
      this.loadFinish = false
      const data = await getArticleList({
        page: page + 1,
        category: this.dataset.category
      })
      this.list = this.list.concat(data.list)
      // console.log(this.list)
      this.pager.pagenum = page + 1
      this.loadFinish = true
      // console.log(page)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/mixin';
$item-left-width: 250px;
$item-left-height: 340px;
$item-right-width: 442px;
$item-right-height: 520px;
// $item-gap-width: 20px;
$item-gap-height: 20px;

.masonry {
  position: relative;

  .list-item {
    position: relative;
    margin-bottom: $item-gap-height;
    overflow: hidden;
  }
}

.masonry-left {
  float: left;
  width: $item-left-width;

  .list-item {
    @include wh($item-left-width, $item-left-height);
  }
}
.masonry-right {
  float: right;
  width: $item-right-width;

  .list-item {
    @include wh($item-right-width, $item-right-height);
  }
}

.list-item {
  img {
    max-width: 100%;
  }
}
.list-article {
  .list-item {
    &:hover {
      opacity: .6;
    }
    &:active {
      opacity: .9;
    }
    .link-cover {
      position: absolute;
      z-index: 1;
      @include wh(100%, 100%);
    }
  }
}

.article-pic {
  position: relative;
  display: block;
  width: 100%;
  // overflow: hidden;
  .video-btn {
    position: absolute;
    z-index: 1;
    right: 20px;
    bottom: -20px;
  }
}
.article-text {
  font-size: 12px;
  border: 1px solid #ddd;
  border-top: 0;
  padding: 12px 15px 0;

  h3 {
    font-size: 14px;
    width: 100%;
    white-space: nowrap;
    @include ellipsis;
  }
  p {
    margin-bottom: 5px;
    color: #9b9b9b;
  }
  .article-author {
    margin: 0;
  }
  .article-brief {
    @include ellipsis-more(2);
    margin-bottom: 12px;
  }
  .article-date {
    margin-bottom: 15px;
  }
}
.article-column {
  margin-bottom: 15px;
  color: #656565;
  i {
    margin-right: 5px;
  }
}
// left
.masonry-left {
  .article-text {
    height: 170px;
  }
}
// right
.masonry-right {
  .article-text {
    height: 224px;

    .article-brief {
      @include ellipsis-more(3);
    }
    .article-date {
      position: absolute;
      right: 20px;
      bottom: 0;
    }
  }
}

</style>
