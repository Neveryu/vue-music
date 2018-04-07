import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getSongUrl(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    songmid: songmid,
    filename: `C400${songmid}.m4a`,
    guid: 7175649092
  })
  return jsonp(url, data, '')
}

export function getLyric(mid) {
  const url = '/api/lyric'
  // 真实接口
  // const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  const data = Object.assign({}, commonParams, {
    pcachetime: +new Date(),
    songmid: mid,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return axios.get(url, {
    // 如果是使用黄老师的接口是不需要 headers 的
    // headers: {
    //   Referer: 'http://ustbhuangyi.com/music/',
    //   Host: 'ustbhuangyi.com'
    // },
    // headers: {
    //   referer: 'https://c.y.qq.com/',
    //   host: 'y.qq.com'
    //   // authority: 'c.y.qq.com'
    // },
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
* 使用下面的jsonp的方法抓取链接，虽然原接口是jsonp的，但是有header限制
* jsonp这个工具包支持传header吗
* 所以还是使用上面这个吧，开发环境代理一下，线上静态环境暂无办法
*/

// 获取歌词接口 jsonp 尝试
export function _getLyric(mid) {
  // 获取歌词接口 jsonp 尝试（qq音乐的接口，未成功）
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  // 获取格式接口 jsonp 尝试（黄老师的接口）
  // const url = 'http://ustbhuangyi.com/music/api/lyric'
  const data = Object.assign({}, commonParams, {
    pcachetime: +new Date(),
    songmid: mid,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
