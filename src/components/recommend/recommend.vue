<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="(item, index) of recommends" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) of discList" class="item" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.cover" alt="">
              </div>
              <div class="text">
                <h2 class="name">{{item.username}}</h2>
                <p class="desc">{{item.title}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import { getRecommend1, getDiscList1 } from '@/api/recommend'
  import { ERR_OK } from '@/api/config'
  // 组件
  import Slider from '@/base/slider/slider'
  import Scroll from '@/base/scroll/scroll'
  import Loading from '@/base/loading/loading'
  export default {
    components: {
      Slider,
      Scroll,
      Loading
    },
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend: function() {
        // 使用 proxyTable 代理
        // getRecommend().then((res) => {
        //   console.log(res.data.data)
        // }).catch((err) => {
        //   console.log(err)
        // })
        getRecommend1().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList() {
        // 这是个调的代理接口，这里我们不用，我们用真实的qq接口
        // getDiscList().then((res) => {
        //   this.discList = res.data.list
        // })
        getDiscList1().then((res) => {
          this.discList = res.recomPlaylist.data.v_hot
        })
      },
      loadImage() {
        if(!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>