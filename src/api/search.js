import jsonp from '@/common/js/jsonp'
import { commonParams, options } from '@/api/config'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    needNewCode: 0
  })

  return jsonp(url, data, options)
}

export function search(query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    n: perpage,
    ct: 24,
    qqmusic_ver: 1298,
    new_json: 1,
    remoteplace: 'txt.yqq.song',
    format: 'jsonp',
    // searchid: 69566414263395765,
    t: 0,
    aggr: 1,
    cr: 1,
    lossless: 0,
    flag_qc: 0
  })

  return jsonp(url, data, options)
}
