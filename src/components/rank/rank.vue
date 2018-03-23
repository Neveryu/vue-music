<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data="topList" ref="toplist">
      <ul>
        <li class="item" v-for="item of topList" @click="selectItem(item)">
          <div class="icon">
            <img src="" alt="" width="100" height="100" v-lazy="item.pic">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) of item.songlist">
              <span>{{index + 1}}、</span>
              <span>{{song.track_name}}-{{song.singer_name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getTopList} from '@/api/rank'
  import {ERR_OK} from '@/api/config'
  import Scroll from '@/base/scroll/scroll'
  import Loading from '@/base/loading/loading'
  import {playlistMixin} from '@/common/js/mixin'
  import {mapMutations} from 'vuex'
  export default {
    mixins: [playlistMixin],
    components: {
      Scroll,
      Loading
    },
    created() {
      this._getTopList()
    },
    data() {
      return {
        topList: []
      }
    },
    methods: {
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      }),
      handlePlaylist(playlist) {
        const bottom = playlist.length ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.toplist.refresh()
      },
      selectItem(item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setTopList(item)
      },
      _getTopList() {
        getTopList().then((res) => {
          if(res.code === ERR_OK) {
            res.toplist.data.group_list.forEach((item) => {
              this.topList.push(...(item.list))
            })
            // console.log(this.topList)
          }
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>