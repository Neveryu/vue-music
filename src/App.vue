<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
import Tab from '@/components/tab/tab.vue'
import Player from '@/components/player/player'
export default {
  name: 'app',
  components: {
    MHeader,
    Tab,
    Player
  },
  mounted() {
    document.getElementById('app').addEventListener('touchmove', function(e) {
      e.preventDefault()
      // e.stopPropagation()
      // e.stopImmediatePropagation()
    }, false)
  }
}
</script>

<style scoped lang="stylus">
  #app
    position: fixed
    top: 0
    width: 100%
</style>