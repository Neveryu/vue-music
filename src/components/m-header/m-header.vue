<template>
  <div class="m-header">
    <div class="icon" @click="showDetail"></div>
    <h1 class="text" @click="showDetail">Yu-Music</h1>
    <router-link to="/user" class="mine" tag="div">
      <i class="icon-mine"></i>
    </router-link>
    <transition name="fade">
      <div v-show="detailShow" class="detail" ref="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <!-- <h1 class="desc">基于 Vue 全家桶 (2.x) 制作的移动端音乐 WebApp ，一个媲美原生的移动端音乐App，项目完整、功能完备、UI美观、交互一流。</h1> -->
            <h1 class="bold">技术栈</h1>
            <ul class="desc-item">
              <li>Vue：用于构建用户界面的 MVVM 框架。它的核心是响应的数据绑定和组系统件</li>
              <li>vue-router：为单页面应用提供的路由系统，项目上线前使用了 Lazy Loading Routes 技术来实现异步加载优化性能</li>
              <li>vuex：Vue 集中状态管理，在多个组件共享某些状态时非常便捷</li>
              <!-- <li>vue-lazyload：第三方图片懒加载库，优化页面加载速度</li> -->
              <!-- <li>better-scroll：iscroll 的优化版，使移动端滑动体验更加流畅</li> -->
              <!-- <li>stylus：css 预编译处理器</li> -->
              <li>ES6：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用</li>
            </ul>
            <img class="vue-music" src="./vue-music.jpg" alt="">
            <p class="buy-desc">(长按识别二维码或扫码获取视频教程和我的源码)</p>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 32px
      height: 32px
      border-radius: 50%
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
    .detail
      position: fixed
      z-index: 1000
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      backdrop-filter: blur(10px)
      opacity: 1
      background: rgba(7, 17, 27, 0.8)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          padding-top: 32px
          padding-bottom: 100px
          .desc
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .bold
            font-size: 24px
            color: #fff
            text-align: left
            padding: 10px 3%
          .desc-item
            font-size: 14px
            color: #f69
            text-align: left
            li
              padding: 5px 3%
          .vue-music
            width: 50%
            margin: 5px auto  
          .buy-desc
            font-size: 12px
            color: #fff
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
</style>