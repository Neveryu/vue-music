<template>
  <scroll class="suggest" :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll"
          ref="suggest"
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item of result"
          @click="selectItem(item)"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
  import { search } from '@/api/search'
  import { ERR_OK } from '@/api/config'
  import { createSongWithSearch } from '@/common/js/song'
  import Scroll from '@/base/scroll/scroll'
  import Loading from '@/base/loading/loading'
  import Singer from '@/common/js/singer'
  import { mapMutations, mapActions } from 'vuex'
  import { getSongUrl } from '@/api/song'
  import NoResult from '@/base/no-result/no-result'

  const TYPE_SINGER = 1 // 0是歌曲，1是歌手
  const perpage = 30

  export default {
    components: {
      Scroll,
      Loading,
      NoResult
    },
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        pullup: true,
        beforeScroll: true,
        hasMore: true
      }
    },
    methods: {
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ]),
      refresh() {
        this.$refs.suggest.refresh()
      },
      listScroll() {
        this.$emit('listScroll')
      },
      selectItem(item) {
        if(item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.zhida_singer.singerMID,
            name: item.zhida_singer.singerName
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
        this.$emit('select')
      },
      searchMore() {
        if(!this.hasMore) {
          return
        }
        this.page ++
        search(this.query, this.page, this.showSinger, perpage).then(res => {
          if(res.code === ERR_OK) {
            // this.result = this.result.concat(this._genResult(res.data))
            if(res.data.song) {
              let list = res.data.song.list
              list.forEach((musicData) => {
                if(musicData.id && musicData.album.mid) {
                  getSongUrl(musicData.mid).then(resp => {
                    /*
                      old
                     */
                    /*
                    let vkey = resp.data.items[0].vkey
                    let url = `http://dl.stream.qqmusic.qq.com/${resp.data.items[0].filename}?vkey=${vkey}&guid=7175649092&uin=0&fromtag=66`
                    */
                    let vkey = resp.url_mid.data.midurlinfo[0].vkey
                    let url = resp.url_mid.data.midurlinfo[0].purl
                    Object.assign(musicData, {url})
                    this.result.push(createSongWithSearch(musicData))
                  }).catch(err => {
                    console.log(err)
                  })
                }
              })
            }
          }
          this._checkMore(res.data)
        })
      },
      getDisplayName(item) {
        if(item.type === TYPE_SINGER) {
          return item.zhida_singer.singerName
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      // 没有用到
      filterSinger(singer) {
        let ret = []
        if(!singer) {
          return ''
        }
        singer.forEach((s) => {
          ret.push(s.name)
        })
        return ret.join('/')
      },
      getIconCls(item) {
        if(item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      search() {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, perpage).then(res => {
          // console.log(res)
          if(res.code === ERR_OK) {
            this.result = this._genResult(res.data)
            // 检测有没有更多的数据
            this._checkMore(res.data)
          }
        })
      },
      _checkMore(data) {
        const song = data.song
        if(!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
          this.hasMore = false
        }
      },
      _genResult(data) {
        let ret = []
        if(data.zhida && data.zhida.zhida_singer) {
          ret.push({...data.zhida})
        }
        if(data.song) {
          // 这个地方有异步操作时间很长，怎么办
          // ret = ret.concat(this._normalizeSongs(data.song.list))
          // ret = ret.concat(data.song.list)
          // console.log(ret)
          data.song.list.forEach((musicData) => {
            if(musicData.id && musicData.album.mid) {
              getSongUrl(musicData.mid).then(resp => {
                /*
                  old
                 */
                /*
                let vkey = resp.data.items[0].vkey
                let url = `http://dl.stream.qqmusic.qq.com/${resp.data.items[0].filename}?vkey=${vkey}&guid=7175649092&uin=0&fromtag=66`
                */
                let vkey = resp.url_mid.data.midurlinfo[0].vkey
                let url = resp.url_mid.data.midurlinfo[0].purl
                Object.assign(musicData, {url})
                ret.push(createSongWithSearch(musicData))
              }).catch(err => {
                console.log(err)
              })
            }
          })
        }
        return ret
      },
      // 没有用到
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          // 等你下课
          // 212877900(songid)
          // 003bSL0v4bpKAx(albummid)
          // 001J5QJL1pRQYB(songmid)
          // 270(interval)
          if(musicData.id && musicData.album.mid) {
            getSongUrl(musicData.mid).then(resp => {
              /*
                old
               */
              /*
              let vkey = resp.data.items[0].vkey
              let url = `http://dl.stream.qqmusic.qq.com/${resp.data.items[0].filename}?vkey=${vkey}&guid=7175649092&uin=0&fromtag=66`
              */
              let vkey = resp.url_mid.data.midurlinfo[0].vkey
              let url = resp.url_mid.data.midurlinfo[0].purl
              Object.assign(musicData, {url})
              ret.push(createSongWithSearch(musicData))
            }).catch(err => {
              console.log(err)
            })
          }
        })
        return ret
      }
    },
    watch: {
      query() {
        this.search()
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>