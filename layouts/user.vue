<template>
  <div>
    <app-header />
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
              <b>{{userInfo.username}}</b>
              <i class="icons" @click="editting = true"><icon name="regular/edit"></icon></i>
            </span>
            <span v-else>
              <input v-if="editting" type="text" v-model="userInfo.username">
              <i class="icons" @click="submitEdit"><icon name="check"></icon></i>
            </span>
          </div>
          <!-- username end -->
          <ul class="side-nav">
            <li>
              <router-link to="/user"><i><icon name="regular/user"></icon></i> 我的设置</router-link>
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
          <nuxt/>
        </main>
      </section>
    </div>
    <app-footer />
  </div>
</template>
<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  head: {
    title: '用户中心'
  },
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  middleware: 'appData',
  data () {
    console.log(this.$store.state)
    return {
      username: this.$store.state.userInfo.username,
      editting: false
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
