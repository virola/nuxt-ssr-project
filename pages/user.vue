<template>
  <div class="container user-center">
    <section class="clear" v-if="userInfo">
      <aside class="user-sider fl">
        <div class="user-avatar">
          <router-link to="/user">
            <img :src="userInfo.avatar" :alt="userInfo.username">
            <span>修改头像</span>
          </router-link>
        </div>
        <div class="user-name">
          <span v-if="!editting">
            <b>{{username}}</b>
            <i class="icons" @click="editting = true"><icon name="regular/edit"></icon></i>
          </span>
          <span v-else>
            <input v-if="editting" type="text" v-model="username">
            <i class="icons" @click="submitEdit"><icon name="check"></icon></i>
          </span>
        </div>
        <!-- username end -->
        <ul class="side-nav">
          <li>
            <router-link to="/user/info"><i><icon name="regular/user"></icon></i> 我的设置</router-link>
          </li>
          <li>
            <router-link to="/user/collect"><i><icon name="regular/star"></icon></i> 我的收藏</router-link>
          </li>
          <li>
            <router-link to="/user/msg"><i><icon name="regular/comments"></icon></i> 我的消息</router-link>
          </li>
        </ul>
      </aside>
      <main class="user-main fr">
        <nuxt-child />
      </main>
    </section>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  head: {
    title: '用户中心'
  },
  data () {
    return {
      username: '',
      editting: false
    }
  },
  computed: {
    ...mapState([
      'userInfo', 'login'
    ])
  },
  watch: {
    'userInfo': function () {
      if (this.userInfo) {
        this.username = this.userInfo.username
      } else {
        this.$router.push({path: '/'})
      }
    }
  },
  methods: {
    submitEdit () {
      this.editting = false
    }
  }

}
</script>
<style lang="scss">
@import 'assets/mixin';
@import 'assets/user_center';
@import 'assets/user/common';
</style>
