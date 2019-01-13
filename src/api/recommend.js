import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend() {
  return axios.get('/get_qqmusic_recommend')
}

// 因为上面这个方法是使用的开发环境的node的服务端代理proxyTable来代理的
// 发布到我的网站上，是没有服务端代理来帮我们的
// 所以使用下面这个 jsonp
export function getRecommend1() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    plarform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = '/get_desclist'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random()
  })
  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return res.data
  })
}

// 因为上面这个方法是使用的开发环境的node的服务端代理proxyTable来代理的
// 发布到我的网站上，是没有服务端代理来帮我们的
// 所以使用下面这个 jsonp
export function getDiscList1() {
  // 下面这一行是抓取的请求链接（未删减版）
  // conso url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?callback=recom41583483471570526&g_tk=5381&jsonpCallback=recom41583483471570526&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A8%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A8%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A0%7D%7D%2C%22new_album%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewAlbum%22%2C%22param%22%3A%7B%22type%22%3A0%2C%22category%22%3A%22-1%22%2C%22genre%22%3A0%2C%22year%22%3A1%2C%22company%22%3A-1%2C%22sort%22%3A1%2C%22start%22%3A0%2C%22end%22%3A39%7D%7D%2C%22toplist%22%3A%7B%22module%22%3A%22music.web_toplist_svr%22%2C%22method%22%3A%22get_toplist_index%22%2C%22param%22%3A%7B%7D%7D%2C%22focus%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetFocus%22%2C%22param%22%3A%7B%7D%7D%7D'
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = {
    g_tk: 5381,
    // jsonpCallback: 'recom2586478241234471',
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    // 由于我们这里只抓取recomPlaylist的数据，所以其他的请求项，我们不传
    data: {
      // 'comm': {'ct': 24},
      // 'category': {
      //   'method': 'get_hot_category',
      //   'param': {'qq': ''},
      //   'module': 'music.web_category_svr'
      // },
      'recomPlaylist': {
        'method': 'get_hot_recommend',
        'param': {
          'async': 1,
          'cmd': 2
        },
        'module': 'playlist.HotRecommendServer'
      }
      // 'playlist': {
      //   'method': 'get_playlist_by_category',
      //   'param': {
      //     'id': 8,
      //     'curPage': 1,
      //     'size': 40,
      //     'order': 5,
      //     'titleid': 8
      //   },
      //   'module': 'playlist.PlayListPlazaServer'
      // },
      // 'new_song': {
      //   'module': 'QQMusic.MusichallServer',
      //   'method': 'GetNewSong',
      //   'param': {
      //     'type': 0
      //   }
      // },
      // 'new_album': {
      //   'module': 'QQMusic.MusichallServer',
      //   'method': 'GetNewAlbum',
      //   'param': {
      //     'type': 0,
      //     'category': '-1',
      //     'genre': 0,
      //     'year': 1,
      //     'company': -1,
      //     'sort': 1,
      //     'start': 0,
      //     'end': 39
      //   }
      // },
      // 'toplist': {
      //   'module': 'music.web_toplist_svr',
      //   'method': 'get_toplist_index',
      //   'param': {}
      // },
      // 'focus': {
      //   'module': 'QQMusic.MusichallServer',
      //   'method': 'GetFocus',
      //   'param': {}
      // }
    }
  }
  // 因为我们的 options 里面配的回调函数的 jsonpCallback
  // 而这个接口的回调是 callback ，所以我们不传，默认就是 callback
  return jsonp(url, data, '')
  // return jsonp(url, data, options)
}

export function getSongList(disstid) {
  const url = '/get_cdinfo'
  const data = Object.assign({}, commonParams, {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return res.data
  })
}

// 因为上面这个方法是使用的开发环境的node的服务端代理proxyTable来代理的
// 发布到我的网站上，是没有服务端代理来帮我们的
// 所以使用下面这个 jsonp
export function getSongList1(disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}


