<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getSingerDetail } from '@/api/singer'
  import { ERR_OK } from '@/api/config'
  import { createSong } from '@/common/js/song'
  import MusicList from '@/components/music-list/music-list'

  import { getSongUrl } from '@/api/song'
  export default {
    components: {
      MusicList
    },
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if(!this.singer.id) {
          this.$router.push('/singer')
        }
        getSingerDetail(this.singer.id).then((res) => {
          if(res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let { musicData } = item
          if(musicData.songid && musicData.albummid) {
            // ret.push(createSong(musicData))
            getSongUrl(musicData.songmid).then(resp => {
              /*
                old
               */
              /*
              let vkey = resp.data.items[0].vkey
              let url = `http://dl.stream.qqmusic.qq.com/${resp.data.items[0].filename}?vkey=${vkey}&guid=7175649092&uin=0&fromtag=66`
              */
              let vkey = resp.url_mid.data.midurlinfo[0].vkey
              let url = resp.url_mid.data.midurlinfo[0].purl
              
              Object.assign(musicData, { url })
              ret.push(createSong(musicData))
            }).catch(err => {
              console.log(err)
            })
          }
        })
        return ret
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%,0,0)
</style>