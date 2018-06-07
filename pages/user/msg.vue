<template>
  <div>
    <h3 class="tab-title">
      <router-link to="/user/msg" :class="{active: type == 0}">未读消息</router-link>
      <router-link to="/user/msg?type=1" :class="{active: type == 1}">已读消息</router-link>
    </h3>
    <div class="main-content">
      <div class="ctrl-panel" v-if="type == 0">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="checkAll" v-model="checkedAll" @click="checkAll">
          <label class="form-check-label" for="checkAll">全选</label>
        </div>
        <div class="form-check-inline">
          <button class="btn btn-primary" @click="markAsRead">标记已读</button>
        </div>
      </div>
      <ul class="msg-list">
        <li v-for="(item, index) in list" :key="index" class="clear">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" v-model="checkValues" :id="'checkbox_' + item.id" :value="item.id" v-if="type == 0">
            <label class="form-check-label" :for="'checkbox_' + item.id">您收到来自<b>{{item.fromuser}}</b>的一条评论信息</label>
          </div>
          <a class="btn btn-primary" :href="item.link">查看</a>
        </li>
      </ul>
      <pager v-if="pager" @goPage="goPage" :pageInit="page" :pageTotal="pager.pagetotal"></pager>
    </div>
  </div>
</template>
<script>
import {getMsgList} from '~/service/getData'
import Pager from '~/components/Pager'

export default {
  data () {
    return {
      list: [],
      pager: null,
      checkedAll: false,
      checkValues: []
    }
  },
  components: {
    Pager
  },
  created () {
    this.initData()
  },
  watch: {
    '$route': 'initData',
    'checkValues': {
      handler (val, oldVal) {
        if (val.length === this.list.length) {
          this.checkedAll = true
        } else {
          this.checkedAll = false
        }
      },
      deep: true
    }
  },
  methods: {
    async initData () {
      this.type = +this.$route.query.type || 0
      this.page = +this.$route.query.page || 1
      let fetchData = await getMsgList(this.type, this.page)
      this.list = fetchData.list
      this.pager = fetchData.pager
    },
    goPage (params) {
      let query = {
        type: this.type,
        page: params.page
      }
      this.$router.push({query: query})
    },
    checkAll (event) {
      // console.log(this.checkedAll)
      if (this.checkedAll) {
        this.checkValues = []
      } else {
        this.checkValues = []
        this.list.forEach(item => {
          this.checkValues.push(item.id)
        })
      }
    },
    markAsRead () {
      // 标记为已读
      console.log(this.checkValues)
    }
  }
}
</script>

