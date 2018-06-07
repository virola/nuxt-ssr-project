<template>
  <header class="header" :class="styles">
    <div class="container">
      <div class="head-panel clear">
        <h2 class="logo fl"><router-link to="/"><img src="../assets/img/logo.png" title="首页"></router-link></h2>
        <div class="panel fr">
          <router-link to="/search" class="panel-item"><i class="icons"><icon name="search"></icon></i></router-link>
          <div class="panel-item user-icon">
            <router-link :to="userInfo ? '/user/info' : '/login'">
              <img v-if="userInfo" :src="userInfo.avatar">
              <i v-else class="icons"><icon name="user"></icon></i>
            </router-link>
            <!-- user sub  -->
            <div class="nav-sub" v-if="userInfo">
              <ul>
                <li>
                  <router-link to="/user/info">{{userInfo.username}}</router-link>
                </li>
                <li>
                  <router-link to="/user/collect">我的收藏</router-link>
                </li>
                <li>
                  <router-link to="/user/msg">我的消息</router-link>
                </li>
                <li>
                  <a href="/" v-on:click.prevent="userLogout">退出</a>
                </li>
              </ul>
            </div>
            <!-- user sub over -->
          </div>
          <router-link to="/" class="panel-item btn btn-primary post-btn">投稿</router-link>
        </div>
      </div>
      <nav class="nav">
        <ul>
          <li v-for="nav in navlist" :key="nav.id">
            <router-link :class="{active: nav.id == $route.query.cid}" :to="{ path: '/column', query: { cid: nav.id }}">
              {{nav.name}}
              <b class="caret caret-small caret-dark caret-down" v-if="nav.children && nav.children.length"></b>
            </router-link>
            <div class="nav-sub" v-if="nav.children && nav.children.length">
              <ul>
                <li v-for="item in nav.children" :key="item.id">
                  <router-link :class="{active: item.id == $route.query.sid}" :to="{path: '/column', query: {cid: nav.id, sid: item.id}}">{{item.name}}</router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
import {mapMutations} from 'vuex'
import { getUser, userSignout } from '~/service/getData'

export default {
  data () {
    let styles = ''
    let routePath = this.$route.path
    // 首页和用户中心的页面头部不加 style-common
    if (routePath !== '/' &&
        routePath.indexOf('/user') === -1 &&
        routePath.indexOf('/column') === -1
    ) {
      styles = 'style-common'
    }
    return {
      navlist: [
        {
          'name': '建筑报道',
          'id': 1,
          'children': [
            {
              'id': 11,
              'name': '资讯'
            },
            {
              'id': 12,
              'name': '项目'
            },
            {
              'id': 13,
              'name': '人物'
            },
            {
              'id': 14,
              'name': '深度'
            },
            {
              'id': 15,
              'name': '旅行'
            }
          ]
        },
        {
          'name': '视频',
          'id': 2,
          'children': [
            {
              'id': 21,
              'name': '讲座'
            },
            {
              'id': 22,
              'name': '项目'
            },
            {
              'id': 23,
              'name': '人物'
            },
            {
              'id': 24,
              'name': '建筑5分钟'
            },
            {
              'id': 25,
              'name': '建筑新力量'
            }
          ]
        },
        {
          'name': '专辑',
          'id': 3,
          'children': [
            {
              'id': 31,
              'name': '建筑师在做什么'
            },
            {
              'id': 32,
              'name': '有方讲座'
            },
            {
              'id': 33,
              'name': '旅行基金'
            },
            {
              'id': 34,
              'name': '建筑5分钟'
            },
            {
              'id': 35,
              'name': '建筑新力量'
            }
          ]
        },
        {
          'name': '旅行报名',
          'id': 4
        },
        {
          'name': '行业招聘',
          'id': 5
        },
        {
          'name': '有方服务',
          'id': 6,
          'children': [
            {
              'id': 61,
              'name': '空间研究'
            },
            {
              'id': 62,
              'name': '旅行定制'
            },
            {
              'id': 63,
              'name': '策展策划'
            },
            {
              'id': 64,
              'name': '广告投放'
            },
            {
              'id': 65,
              'name': '图书出版'
            }
          ]
        }
      ],
      styles: styles,
      userInfo: this.$store.state.userInfo
    }
  },
  methods: {
    ...mapMutations([
      'logout'
    ]),
    // 退出登录
    async userLogout () {
      // vuex clear
      this.logout()
      await userSignout()
    }
  },
  async fetch({ store, params }) {
    console.log(1111)
    let res = await getUser()
    store.commit('getUser', res.user_info)
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 50px;
}
.style-common {
  border-bottom: 1px solid #ddd;

  .container {
    position: relative;
  }
  .head-panel {
    padding-top: 10px;
  }
  .logo {
    margin-left: 0;
    a {
      display: block;
      width: 50px;
    }
  }
  .nav {
    position: absolute;
    left: 0;
    top: 10px;
  }
}
.head-panel {
  padding-top: 20px;
  .panel-item {
    display: block;
    float: left;
    margin-left: 25px;
    i {
      display: block;
      width: 25px;
      text-align: center;
      font-size: 18px;
    }
  }
  .panel-item:not(.btn) {
    margin-top: 5px;
  }
}
// .logo {
//   margin-left: 500px;
// }
.nav {
  margin: 10px 0;
  li {
    position: relative;
    float: left;
    width: 100px;
    margin: 0 10px;
    a {
      display: block;
      padding: 5px 15px;
      font-size: 14px;

      &:hover {
        text-decoration: none;
      }

      .caret {
        display: inline-block;
        transform: translateY(3px);
        transition: transform ease .3s;
      }
    }
  }
  ul > li:hover {
    .nav-sub {
      display: block;
    }
    .caret {
      transform: rotate(180deg) translateY(3px);
    }
  }
  &-sub {
    position: absolute;
    z-index: 10;
    left: 0;
    // top: 20px;
    display: none;
    border: 1px solid #ddd;
    border-top: 0;
    box-shadow: 0 2px 2px #ccc;
    background: #fff;

    li {
      float: none;
      min-width: 150px;
      margin: 0;
      padding: 0;

      a {
        text-align: left;
        // padding: 5px 15px;
        width: auto;
        &:hover {
          color: #fff;
          background-color: #0d213c;
        }
      }
    }
  }
  .active {
    font-weight: bold;
  }
}
.user-icon {
  position: relative;
  .nav-sub {
    left: auto;
    right: -15px;

    a {
      display: block;
      padding: 5px 15px;
      font-size: 13px;
      &:hover {
        text-decoration: none;
      }
    }
  }
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  &:hover {
    .nav-sub {
      display: block;
    }
  }
}
.post-btn {
  width: 100px;
}
// 限定宽度
@media (min-width: 992px) {
  .nav {
    margin-left: 50px;
  }
  .logo {
    margin-left: 45%;
  }
}
@media (min-width: 1200px) {
  .nav {
    margin-left: 160px;
  }
}
</style>
