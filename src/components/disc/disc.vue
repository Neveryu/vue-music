<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
  import MusicList from '@/components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from '@/api/recommend'
  import {ERR_OK} from '@/api/config'
  import {createSong} from '@/common/js/song'
  import { getSongUrl } from '@/api/song'
  export default {
    components: {
      MusicList
    },
    created() {
      this._getSongList()
    },
    data() {
      return {
        songs: []
      }
    },
    methods: {
      _getSongList() {
        if(!this.disc.content_id) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.content_id).then((res) => {
          if(res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if(musicData.songid && musicData.albumid) {
            // ret.push(createSong(musicData))
            getSongUrl(musicData.songmid).then(resp => {
              let vkey = resp.data.items[0].vkey
              let url = `http://dl.stream.qqmusic.qq.com/${resp.data.items[0].filename}?vkey=${vkey}&guid=7175649092&uin=0&fromtag=66`
              Object.assign(musicData, { url })
              ret.push(createSong(musicData))
            }).catch(err => {
              console.log(err)
            })
          }
        })
        return ret
      }
    },
    computed: {
      ...mapGetters([
        'disc'
      ]),
      title() {
        return this.disc.title
      },
      bgImage() {
        return this.disc.cover
      }
    }
  }
</script>
<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>