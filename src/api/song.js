import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'

/**
 * 之前是用这个方法来获取vkey，然后拼接歌曲url
 * 现在已失效！
 * 现在已失效！！
 * 现在已失效！！！
 * @param  {[type]} songmid [description]
 * @return {[type]}         [description]
 */
export function _getSongUrl(songmid) {
  // this is old function
  // has been broken
  // stop use
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

/**
 * 可以获取到vkey以及完整的歌曲url
 * --------------
 * @param  {[type]} songmid [description]
 * @return {[type]}         [description]
 */
export function getSongUrl(songmid) {
  const url = 'http://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    data: {
      'url_mid': {
        'module': 'vkey.GetVkeyServer',
        'method': 'CgiGetVkey',
        'param': {
          'guid': '15424864',
          'songmid': [songmid],
          'songtype': [0],
          'uin': '0',
          'loginflag': 0,
          'platform': '23'
        }
      }
    }
  })
  return jsonp(url, data, '')
}

export function getLyric(songid) {
  const url = `//api.darlin.me/music/lyric/${songid}`
  return jsonp(url, null, '')
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
