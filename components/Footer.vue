<template>
  <footer class="footer">
    <div class="container clear">
      <h4 class="f-logo fl"><img src="../assets/img/s_logo.png" alt="有方"></h4>
      <div class="f-links fl">
        <p class="clear">
          <router-link to="/">关于有方</router-link>
          <router-link to="/">加入我们</router-link>
          <router-link to="/">版权说明</router-link>
          <router-link to="/">帮助中心</router-link>
          <router-link to="/">联系我们</router-link>
          <router-link to="/">意见反馈</router-link>
          <router-link to="/">合作伙伴</router-link>
        </p>
        <p>© 2018 www.archiposition.com | All rights reserved | Powered by Dianzhantech</p>
        <p>版权所有有方 粤ICP备13041838号 </p>
      </div>
    </div>
    <div class="back-top" @click="backTop" v-if="showBackStatus"><icon name="arrow-up"></icon></div>
  </footer>
</template>

<script>
/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
const showBack = callback => {
  const TOP = 300
  let requestFram
  let oldScrollTop

  document.addEventListener('scroll', () => {
    showBackFun()
  }, false)
  document.addEventListener('touchstart', () => {
    showBackFun()
  }, { passive: true })

  document.addEventListener('touchmove', () => {
    showBackFun()
  }, { passive: true })

  document.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop
    moveEnd()
  }, { passive: true })

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop !== oldScrollTop) {
        oldScrollTop = document.body.scrollTop
        moveEnd()
      } else {
        cancelAnimationFrame(requestFram)
      }
      showBackFun()
    })
  }

  // 判断是否达到目标点
  const showBackFun = () => {
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    let status = scrollTop > TOP
    callback(status)
  }
}

export default {
  data () {
    return {
      showBackStatus: false
    }
  },
  created () {
    if (process.browser) {
      // 开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
      showBack(status => {
        this.showBackStatus = status
      })
    }
  },
  methods: {
    backTop () {
      if (process.browser) {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  margin: 60px 0 0;
  padding: 20px 0;
  background: #0e1835;
  color: #d8d8d8;
  font-size: 12px;

  a {
    color: #d8d8d8;
    margin: 0 5px;
  }
  p {
    margin: 6px 0;
  }
}
.f-logo {
  margin: 10px 80px 0 0;
}
.back-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  text-align: center;
  color: #fff;
  background: #aaaaaa;
  font-size: 18px;
  line-height: 40px;
  cursor: pointer;
}
</style>
