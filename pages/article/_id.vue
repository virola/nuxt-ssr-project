<template>
  <div class="article">
    <section class="container main clear">
      <div class="main-panel fl">
        <div class="breadcrum"><router-link to="/">首页</router-link><span v-if="article.parent_column_id"> > <router-link :to="{path: '/column', query: {cid: article.parent_column_id}}">{{article.parent_column_name}}</router-link></span><span v-if="article.column_id"> > <router-link :to="{path: '/column', query: {cid: article.parent_column_id, sid: article.column_id}}">{{article.column_name}}</router-link></span></div>
        <h2 class="title">{{article.title}}</h2>
        <div class="info">
          <span v-if="article.author">作者: {{article.author}}</span>
          <span v-if="article.editor">编辑: {{article.editor}}</span>
          <span>{{article.datetime}}</span>
        </div>
        <!-- content -->
        <div class="content" v-html="article.content"></div>
        <!-- like and collect -->
        <div class="operate">
          <b class="btn btn-primary" v-on:click="article.like_num += 1"><i class="icons"><icon name="thumbs-up"></icon></i> {{article.like_num}}</b>
          <b class="btn btn-primary" v-on:click="article.collect_num += 1"><i class="icons"><icon name="star"></icon></i> {{article.collect_num}}</b>
        </div>
        <!-- share -->
        <div class="share">
          <!-- baidu share -->

        </div>
        <!-- comments -->
        <div class="comment">
          <h4 class="comment-title">参与评论</h4>
          <div class="comment-textbox">
            <form action="#" class="has-feedback" v-on:submit.prevent="submitComment">
              <div class="textbox-group">
                <textarea class="form-control" v-model="commentContent" required name="content" id="user-content" rows="10" :disabled="!login"></textarea>
                <div class="textbox-btn">
                  <input class="btn btn-primary btn-sm" type="submit" :value="getCommentBtn">
                </div>
              </div>
            </form>
          </div>
          <!-- textbox end -->
          <h4 class="comment-title">最新评论</h4>
          <ul class="comment-list" v-if="comments && comments.length">
            <li class="comment-item" v-for="(item, index) in comments" :key="index">
              <div class="comment-avatar">
                <!-- img -->
                <img src="~/assets/img/avatar.jpeg" alt="avatar">
              </div>
              <div class="comment-info">
                <span class="username">{{item.username}}</span>&nbsp;<span class="date">{{item.datetime}}</span>
              </div>
              <div class="comment-content">{{item.content}}</div>
            </li>
          </ul>
          <!-- comments list end -->
        </div>
      </div>
      <div class="side-panel fr">
        <side-block data-key="tags"></side-block>
        <side-block data-key="feed"></side-block>
      </div>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import SideBlock from '~/components/SideBlock'
import {getArticleData, getArticleComment} from '~/service/getData'

export default {
  components: {
    SideBlock
  },
  head () {
    return {
      title: this.article.title
    }
  },
  data () {
    return {
      article: {
        title: '',
        content: ''
      },
      commentContent: '',
      comments: []
    }
  },
  created () {
    this.initData()
  },
  computed: {
    ...mapState([
      'userInfo', 'login'
    ]),
    getCommentBtn () {
      return this.login && this.login ? '提交评论' : '登录评论'
    }
  },
  methods: {
    async initData () {
      const id = this.$route.query.id
      let data = await getArticleData(id)
      this.article = data.article

      let commentData = await getArticleComment(id)
      this.comments = commentData.list
    },
    submitComment () {
      if (this.login) {
        console.log(this.$store.state)
        const content = this.commentContent
        const username = this.$store.state.userInfo.username
        const datetime = new Date().toLocaleString()
        // post api todo...
        this.comments.unshift({
          username,
          content,
          datetime
        })
        // 提交后清空
        this.commentContent = ''
      } else {
        // 未登录，去登录
        this.$router.push({ path: '/login' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'assets/mixin';
.breadcrum {
  margin-bottom: 20px;

  a, span {
    color: #adadad;
  }
  span {
    padding-left: 5px;
    // margin-right: 5px;
  }
}
.title {
  border-bottom: 20px;
  font-size: 24px;
  line-height: 40px;
}
.info {
  margin-bottom: 42px;
  color: #9b9b9b;
  font-size: 12px;
  span {
    padding-right: 10px;
    margin-right: 10px;
    border-right: 1px solid #ddd;
    &:last-child {
      border: 0;
    }
  }
}
.content {
  color: #656565;
  font-size: 16px;
}
.operate {
  margin: 20px 0;

  b {
    display: inline-block;
    width: 115px;
    height: 45px;
    margin-right: 30px;
    line-height: 34px;
    font-size: 12px;
  }
  .icons {
    margin-right: 5px;
    font-size: 14px;
    vertical-align: top;
  }
}
.share {
  padding: 20px 0;
}
// 评论区域
// comment
.comment {
  margin: 20px 0;
  &-title {
    padding: 0 20px;
    margin-bottom: 20px;
    font-size: 14px;
    border-left: 2px solid $main-color;
  }
  &-textbox {
    border: 1px solid #d8d8d8;
    margin-bottom: 40px;
    background: #f7f7f7;

    textarea {
      border: 0;
    }
    .textbox-btn {
      height: 40px;
      .btn {
        float: right;
        margin: 5px 5px 0;
        font-size: 12px;
      }
    }
  }
  &-list {
    padding: 20px 0;
    color: #9b9b9b;
    font-size: 13px;

    .username {
      font-size: 15px;
      color: #656565;
      margin-right: 20px;
    }
  }
  &-item {
    margin: 0 0 20px 15px;
  }
  &-avatar {
    float: left;
    width: 50px;
    height: 50px;
    margin-right: 20px;
    img {
      width: 100%;
      @include borderRadius(50%);
    }
  }
}
</style>
