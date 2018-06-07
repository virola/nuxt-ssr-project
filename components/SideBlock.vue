<template>
  <!-- A side block -->
  <section class="side-box" v-if="tplData.data">
    <h4 class="side-title">{{tplData.title}}</h4>
    <div class="side-content">
      <!-- tags -->
      <div v-if="tplData.style == 10" class="tag-list">
        <a v-for="(item, key) in tplData.data.list" :key="key" :href="item.link" class="tag-item">{{item.text}}</a>
      </div>

      <!-- feedEmail -->
      <form v-else-if="tplData.style == 20" action="" class="has-feedback" v-on:submit.prevent="submitFeedEmail">
        <div class="input-group">
          <input type="email" v-model="feedEmail" class="form-control input-dark" placeholder="请填写您的邮箱" required>
          <div class="input-group-append">
            <button class="btn btn-primary">立即订阅</button>
          </div>
        </div>
      </form>

      <!-- list -->
      <ul :class="tplData.className" v-else>
        <li v-for="(item, key) in tplData.data.list" :key="key">
          <router-link :to="{path:'article', query: {id: item.id}}" class="clear">
            <img :src="item.pic" alt="item.title">
            <b class="title">{{item.title}}</b>
            <b class="corp-name">{{item.corp_name}}</b>
            <i class="job-name">{{item.job_name}}</i>
            <i class="brief">{{item.brief}}</i>
            <i class="date">{{item.date}}</i>
            <i class="date-format">{{item.date_format}}</i>
            <i class="place"><span class="icons"><icon name="map-marker"></icon></span> {{item.place}}</i>
            <span class="bg"></span>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { getSideData } from '~/service/getData'
/**
 * 侧边栏组件数据设定
 * key 为组件属性
 * style 决定模板样式, 0 是默认模板
 * api 数据请求接口的key
 */
const SIDE_DATA = {
  'zhaopin': {
    title: '行业招聘',
    style: 1,
    api: 'zhaopin'
  },
  'travelApply': {
    title: '旅行报名',
    style: 2,
    api: 'travel'
  },
  'hot': {
    title: '最新热点',
    style: 0,
    api: 'hot'
  },
  'recommend': {
    title: '推荐阅读',
    style: 0,
    api: 'recommend'
  },
  'tags': {
    title: '热门标签',
    style: 10,
    api: 'tags'
  },
  'feed': {
    title: '订阅最新资讯',
    style: 20,
    api: '',
    // data 必须有数据block才会显示...
    data: {}
  }
}

export default {
  name: 'side-block',
  props: ['data-key'],
  data () {
    return {
      feedEmail: '',
      tplData: {
        title: '',
        style: '',
        className: '',
        api: '',
        data: null
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const sidedata = SIDE_DATA[this.dataKey]
      for (const k in sidedata) {
        if (sidedata.hasOwnProperty(k)) {
          this.tplData[k] = sidedata[k]
        }
      }
      // console.log(this.tplData)
      this.tplData.className = 'style-' + sidedata.style
      // 请求模板数据
      if (this.tplData.api) {
        this.tplData.data = await getSideData(this.tplData.api)
      }
    },
    // feed email submit
    submitFeedEmail () {
      // todo
      console.log(this.feedEmail)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'assets/mixin';
.side-content {
  li {
    padding: 10px;
  }
  a {
    display: block;
  }
  i {
    color: #8d8d8d;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
  }
  b {
    font-weight: 600;
    font-size: 13px;
    line-height: 1.2;
  }
  .bg, .date-format, .job-name, .corp-name, .place {
    display: none;
  }
  .brief {
    visibility: hidden;
  }
  // default
  .style-0 {
    li {
      border-bottom: 1px solid #efefef;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0
      }
    }
    b, i {
      float: left;
      width: 110px;
    }
    img {
      float: right;
      width: 105px;
      height: 70px;
    }
    .title {
      font-size: 12px;
      line-height: 18px;
      height: 36px;
      overflow: hidden;
    }
  }
  // zhaopin
  .style-1 {
    li {
      border-bottom: 1px solid #eee;
      a {
        padding-top: 10px;
      }
      img {
        float: right;
        width: 70px;
        height: 70px;
      }
      b, i {
        float: left;
        width: 140px;
      }
      .job-name, .corp-name, .place {
        display: block;
      }
      .title, .corp-name {
        white-space: nowrap;
        overflow: hidden;
      }
      .date, .title {
        display: none;
      }
    }
    .icons {
      font-size: 14px;
      color: #d8d8d8;
    }
  }
  // travel
  .style-2 {
    a {
      position: relative;
    }
    .img {
      width: 100%;
    }
    .bg {
      display: block;
      width: 100%;
      height: 40px;
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      background: rgba($color: #000000, $alpha: .6)
    }
    b, i {
      position: absolute;
      z-index: 2;
      color: #fff;
      font-size: 12px;
    }
    .brief, .date {
      display: none;
    }
    .title {
      bottom: 20px;
      left: 10px;
    }
    .date-format {
      display: block;
      bottom: -2px;
      left: 10px;
    }
  }
  // tags
  .tag-list {
    padding: 10px 0;
    .tag-item {
      display: inline-block;
      border: 1px solid #888;
      padding: 0 12px;
      margin: 0 10px 10px 0;
      &:hover {
        text-decoration: none;
        background: $main-color;
        border-color: $main-color;
        color: #fff;
      }
    }
  }
}
</style>
