import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import { saveSearch, deleteSearch, clearSearch, savePlay } from '@/common/js/cache'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if(state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function({commit}, {list, index}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function({commit, state}, song) {
  // 使用 slice 方法返回一个副本，这样就可以解决state.playList被修改的问题
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  // 这个地方不用slice是因为currentIndex是一个值类型，不是一个引用类型
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playList[currentIndex]
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  // find playList Index
  let fpIndex = findIndex(playList, song)
  // 因为是插入歌曲，所以索引要+1
  currentIndex++
  // 插入这首歌到当前索引位置
  // 【这个地方的playList来自于state.playList，而splice这个函数是会改变原对象的，所以会造成state.playList的修改，这个是不符合规范的】
  playList.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if(fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if(currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      playList.splice(fpIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  // find sequenceList Index
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentIndex, 0, song)
  if(fsIndex > -1) {
    if(currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong = function({commit, state}, song) {
  // 使用 slice 方法返回一个副本，这样就可以解决state.playList被修改的问题
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  // 这个地方不用slice是因为currentIndex是一个值类型，不是一个引用类型
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playList, song)
  playList.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)

  if(currentIndex > pIndex || currentIndex === playList.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  const playingState = playList.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
  // if(!playList.length) {
  //   commit(types.SET_PLAYING_STATE, false)
  // } else {
  //   commit(types.SET_PLAYING_STATE, true)
  // }
}

export const deleteSongList = function({commit}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory = function({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}
