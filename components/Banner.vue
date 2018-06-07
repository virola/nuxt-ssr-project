<template>
  <section class="banner container clear">
    <div class="row">
      <div class="col-12 col-lg-6 col-xl-5">
        <div class="block-new">
          <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
              <!-- slides -->
              <div class="swiper-slide" v-for="(item, index) in large" :key="index">
                <div class="article-info">
                  <div class="article-tag"><i class="icons"><icon name="regular/bookmark"></icon></i>{{item.col_title}}</div>
                  <h3><router-link :to="{path: 'article'}">{{item.title}}</router-link></h3>
                  <p>{{item.brief}}</p>
                </div>
                <div class="article-pic">
                  <router-link :to="{path: 'article', query: {id: item.id}}">
                    <img :src="item.pic" :alt="item.title">
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- Optional controls -->
          <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
          <div class="swiper-button-prev swiper-button" slot="button-prev"><i class="icons"><icon name="angle-left"></icon></i></div>
          <div class="swiper-button-next swiper-button" slot="button-next"><i class="icons"><icon name="angle-right"></icon></i></div>
          <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
        </div>
      </div>
      <div class="col-12 col-lg-8 col-xl-7">
        <div class="block-info">
          <ul class="clear">
            <li class="fl" v-for="(item, index) in righttop" :key="index">
              <div class="article-pic">
                <router-link :to="{path: 'article', query: {id: item.id}}">
                  <img :src="item.pic" :alt="item.title">
                </router-link>
              </div>
              <div class="article-tag"><i class="icons"><icon name="regular/bookmark"></icon></i>{{item.col_title}}</div>
              <h4><router-link :to="{path: 'article', query:{id: item.id}}">{{item.title}}</router-link></h4>
            </li>
          </ul>
        </div>
        <div class="block-travel">
          <div class="clear">
            <ul class="article-text fl">
              <li v-bind:class="{active: tabshow == index}" v-for="(item, index) in rightbottom" :key="index" @mouseover="tabshow = index">
                <div class="article-tag"><i class="icons"><icon name="regular/bookmark"></icon></i>{{item.col_title}}</div>
                <h4><router-link :to="{path: 'article', query:{id: item.id}}">{{item.title}}</router-link></h4>
                <p class="article-date">{{item.date_format}}</p>
                <i class="caret caret-right"></i>
              </li>
            </ul>
            <ul class="article-pic fr">
              <li v-for="(item, index) in rightbottom" :key="index" v-show="tabshow == index">
                <router-link :to="{path: 'article', query:{id: item.id}}"><img :src="item.pic" :alt="item.title"></router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {getBannerData} from '~/service/getData'

export default {
  data () {
    return {
      large: [],
      righttop: [],
      rightbottom: [],
      // 初始显示的tab
      tabshow: 0,
      swiperOption: {
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: true,
        // loop: true,
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        }
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const data = await getBannerData()
      // console.log(data)
      this.large = data.newlist
      this.righttop = data.infolist
      this.rightbottom = data.travellist
    }
  }
}
</script>

<style lang="scss">
@import 'assets/mixin';
.banner {
  position: relative;
  font-size: 14px;

  a {
    color: #000;
  }

  .article-info {
    padding: 0 20px 0 65px;

    p {
      height: 45px;
      margin-bottom: 40px;
      @include ellipsis-more(2);
      font-size: inherit;
      color: #9b9b9b;
    }
  }
  h3 {
    margin: 15px 0;
    font-size: 16px;
    @include ellipsis;
  }
  h4 {
    margin: 10px 0;
    font-size: 12px;
    line-height: 1.8;
  }
  .article-tag {
    font-size: 12px;
    color: #656565;
    i {
      margin-right: 5px;
      color: #9b9b9b;
    }
  }
}
.block-new {
  // width: 475px;
  max-width: 100%;
  position: relative;
  .swiper-button {
    top: 60%;
    background: #fff;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    box-shadow: 0 0 4px #aaa;
    outline: 0;
    i {
      display: block;
      width: 100%;
      color: #ccc;
    }
  }
  .swiper-button-prev {
    left: -13px;
  }
  .swiper-button-next {
    right: -13px;
  }
}

.block-right {
  margin-left: 15px;
}
.block-info {
  li {
    width: 195px;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
  .article-pic {
    margin-bottom: 10px;
  }
  .article-tag, h4 {
    padding: 0 10px;
  }
}
.block-travel {
  margin: 20px 0;
  .article-text {
    width: 195px;
    li {
      position: relative;
      padding: 10px;
      border-bottom: 1px solid #d8d8d8;
      &:first-child {
        border-top: 1px solid #656565;
        margin-bottom: 20px;
      }
      .caret {
        visibility: hidden;
        position: absolute;
        z-index: 1;
        right: -30px;
        top: 50%;
        margin-top: -14px;
      }
      &.active .caret {
        visibility: visible;
      }
    }
  }
  .article-pic {
    width: 405px;
    height: 230px;
    overflow: hidden;
  }
  .article-date {
    font-size: 12px;
    color: #9b9b9b;
  }
}
</style>
