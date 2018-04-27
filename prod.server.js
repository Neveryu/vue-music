var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')
var config = require('./config/index')

var app = express()

var proxyTable = {
  // 获取歌单信息
  '/get_cdinfo': {
    target: 'http://ustbhuangyi.com/music/api/getCdInfo',
    changeOrigin: true,
    pathRewrite: {
      '^/get_cdinfo': ''
    }
  },
  '/get_qqmusic_recommend': {
    target: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    changeOrigin: true,
    pathRewrite: {
      '^/get_qqmusic_recommend': ''
    }
  },
  '/get_desclist': {
    target: 'http://ustbhuangyi.com/music/api/getDiscList',
    changeOrigin: true,
    pathRewrite: {
      '^/get_desclist': ''
    }
  },
  // 获取歌词，做一个代理(开发环境用这个没问题)
  '/api/lyric': {
    target: 'http://ustbhuangyi.com/music/api/lyric',
    // target: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
    changeOrigin: true,
    pathRewrite: {
        '^/api/lyric': ''
    }
  }
}

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
      options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

app.use(express.static('./dist'))

var post = process.env.PORT || config.build.port

var server = app.listen(post, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Music app listening at http://%s:%s', host, port);
});
