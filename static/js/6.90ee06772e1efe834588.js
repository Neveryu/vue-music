webpackJsonp([6],{"+47A":function(t,n,e){var a=e("Z7Ce");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("rjj0")("86935a56",a,!0)},"Sgn/":function(t,n,e){"use strict";n.b=function(){var t=i()({},r.b,{channel:"singer",page:"list",key:"all_all_all",pagesize:100,pagenum:1,hostUin:0,needNewCode:0,platform:"yqq"});return Object(s.a)("https://c.y.qq.com/v8/fcg-bin/v8.fcg",t,r.c)},n.a=function(t){var n=i()({},r.b,{hostUin:0,needNewCode:0,platform:"yqq",order:"listen",begin:0,num:100,songstatus:1,g_tk:5381,singermid:t});return Object(s.a)("https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",n,r.c)};var a=e("woOf"),i=e.n(a),s=e("Gak4"),r=e("T452")},Z7Ce:function(t,n,e){(t.exports=e("FZ+f")(!0)).push([t.i,"\n.slide-enter-active[data-v-a6583fd8],\n.slide-leave-active[data-v-a6583fd8] {\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.slide-enter[data-v-a6583fd8],\n.slide-leave-to[data-v-a6583fd8] {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n}","",{version:3,sources:["/Users/yudong/Documents/myproject/vue-music/src/components/singer-detail/singer-detail.vue"],names:[],mappings:";AACA;;EAEE,6BAA6B;EAC7B,qBAAqB;CACtB;AACD;;EAEE,2CAA2C;UACnC,mCAAmC;CAC5C",file:"singer-detail.vue",sourcesContent:["\n.slide-enter-active[data-v-a6583fd8],\n.slide-leave-active[data-v-a6583fd8] {\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.slide-enter[data-v-a6583fd8],\n.slide-leave-to[data-v-a6583fd8] {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n}"],sourceRoot:""}])},lEJ1:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("woOf"),i=e.n(a),s=e("Dd8w"),r=e.n(s),o=e("NYxO"),c=e("Sgn/"),l=e("T452"),d=e("PvFA"),u=e("kvay"),f=e("9cIF"),g={components:{MusicList:u.a},data:function(){return{songs:[]}},computed:r()({title:function(){return this.singer.name},bgImage:function(){return this.singer.avatar}},Object(o.c)(["singer"])),created:function(){this._getDetail()},methods:{_getDetail:function(){var t=this;this.singer.id||this.$router.push("/singer"),Object(c.a)(this.singer.id).then(function(n){n.code===l.a&&(t.songs=t._normalizeSongs(n.data.list))})},_normalizeSongs:function(t){var n=[];return t.forEach(function(t){var e=t.musicData;e.songid&&e.albummid&&Object(f.b)(e.songmid).then(function(t){t.url_mid.data.midurlinfo[0].vkey;var a=t.url_mid.data.midurlinfo[0].purl;i()(e,{url:a}),n.push(Object(d.a)(e))}).catch(function(t){console.log(t)})}),n}}},v={render:function(){var t=this.$createElement,n=this._self._c||t;return n("transition",{attrs:{name:"slide"}},[n("music-list",{attrs:{songs:this.songs,title:this.title,"bg-image":this.bgImage}})],1)},staticRenderFns:[]},m=e("VU/8")(g,v,!1,function(t){e("+47A")},"data-v-a6583fd8",null);n.default=m.exports}});
//# sourceMappingURL=6.90ee06772e1efe834588.js.map