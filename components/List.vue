<template>
  <section class="section-list list-article clear">
    <ul>
      <li class="list-item clear" v-for="(item,index) in list" :key="index">
        <!-- <router-link class="link-cover" :to="{path: 'article', query:{id: item.id}}"></router-link> -->
        <router-link :to="{path: 'article', query:{id: item.id}}" class="article-pic"><img :src="item.pic" alt="item.title"/>
        <span class="video-btn" v-if="item.video"><i class="icons"><icon name="play"></icon></i></span>
        </router-link>
        <div class="article-text">
          <h3><router-link :to="{path: 'article', query:{id: item.id}}">{{item.title}}</router-link></h3>
          <p class="article-column"><i class="icons"><icon name="regular/bookmark"></icon></i>{{item.col_title}}</p>
          <p class="article-brief">{{item.brief}}</p>
          <div class="article-info clear">
            <span class="article-author fl">{{item.author}} | {{item.date}}</span>
            <span class="article-op fr">
              <i class="icons"><icon name="star"></icon></i>{{item.collect_num}}&nbsp;&nbsp;
              <i class="icons"><icon name="star"></icon></i>{{item.view_num}}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  name: 'list',
  props: {
    // 列表数据
    'dataset': {
      type: Array,
      default: [],
      required: true
    }
  },
  data () {
    return {
      // 翻页类型
      'pagetype': 0,
      'list': [],
      'pager': {}
    }
  },
  created () {
    this.initData()
  },
  watch: {
    'dataset': 'initData'
  },
  methods: {
    initData () {
      this.list = [...this.dataset]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/mixin';

.list-item {
  margin: 30px 0;
  img {
    max-width: 100%;
  }
}
.article-pic {
  position: relative;
  display: block;
  width: 250px;
  float: left;

  .video-btn {
    position: absolute;
    z-index: 1;
    right: 5px;
    bottom: 5px;
  }
}
.article-text {
  width: 800px - 250px;
  float: left;
  font-size: 12px;
  color: #9b9b9b;
  padding: 12px 15px 0;

  h3 {
    font-size: 14px;
    width: 100%;
    white-space: nowrap;
    @include ellipsis;
  }
  p {
    margin-bottom: 5px;
  }
  .article-author {
    margin: 0;
  }
  .article-brief {
    height: 64px;
    @include ellipsis-more(3);
    margin-bottom: 12px;
  }
  .article-op {
    line-height: 1.5;
    .icons {
      margin-right: 5px;
      vertical-align: text-bottom;
    }
  }
}
.article-column {
  margin-bottom: 15px;
  color: #656565;
  i {
    margin-right: 5px;
  }
}
</style>
