<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import MusicList from '@/components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicList} from '@/api/rank'
  import {ERR_OK} from '@/api/config'
  import {createSong} from '@/common/js/song'
  import { getSongUrl } from '@/api/song'
  export default {
    components: {
      MusicList
    },
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    created() {
      this._getMusicList()
    },
    methods: {
      _getMusicList() {
        if(!this.topList.id) {
          this.$router.push({
            path: '/rank'
          })
          return
        }
        getMusicList(this.topList.id, this.topList.update_key, this.topList.type).then((res) => {
          if(res.code === ERR_OK) {
            this.songs = this._normalizeSong(res.songlist)
          }
        })
      },
      _normalizeSong(list) {
        let ret = []
        list.forEach((musicData) => {
          musicData = musicData.data
          if(musicData.songid && musicData.albumid) {
            // ret.push(createSong(musicData))
            getSongUrl(musicData.songmid).then(resp => {
              let vkey = resp.data.items[0].vkey
              let url = `http://dl.stream.qqmusic.qq.com/${resp.data.items[0].filename}?vkey=${vkey}&guid=7175649092&uin=0&fromtag=66`
              Object.assign(musicData, { url })
              ret.push(createSong(musicData))
            }).catch(err => {
              console.log(err + 'FROM - toplist组件中_normalizeSong')
            })
          }
        })
        return ret
      }
    },
    computed: {
      ...mapGetters([
        'topList'
      ]),
      title() {
        return this.topList.name
      },
      bgImage() {
        if(this.songs.length) {
          return this.songs[0].image
        } else {
          return this.topList.pic
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>