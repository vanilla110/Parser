"use strict";function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}/*!
 * mp-html v2.0.5
 * https://github.com/jin-yufeng/mp-html
 * 
 * Released under the MIT license
 * Author: Jin Yufeng
 */
var t=require("./parser"),n=[];Component({data:{nodes:[]},properties:{content:{type:String,value:"",observer:function(e){this.setContent(e)}},copyLink:{type:Boolean,value:!0},domain:String,errorImg:String,lazyLoad:Boolean,loadingImg:String,pauseVideo:{type:Boolean,value:!0},previewImg:{type:Boolean,value:!0},scrollTable:Boolean,selectable:null,setTitle:{type:Boolean,value:!0},showImgMenu:{type:Boolean,value:!0},tagStyle:Object,useAnchor:null},created:function(){this.plugins=[];for(var e=n.length;e--;)this.plugins.push(new n[e](this))},detached:function(){clearInterval(this._timer),this._hook("onDetached")},methods:{in:function(e,t,n){e&&t&&n&&(this._in={page:e,selector:t,scrollTop:n})},navigateTo:function(t,n){var o=this;return new Promise(function(i,r){if(!o.data.useAnchor)return r("Anchor is disabled");var a=qq.createSelectorQuery().in(o._in?o._in.page:o).select((o._in?o._in.selector:"._root")+(t?"".concat(">>>","#").concat(t):"")).boundingClientRect();o._in?a.select(o._in.selector).scrollOffset().select(o._in.selector).boundingClientRect():a.selectViewport().scrollOffset(),a.exec(function(t){if(!t[0])return r("Label not found");var a=t[1].scrollTop+t[0].top-(t[2]?t[2].top:0)+(n||parseInt(o.data.useAnchor)||0);o._in?o._in.page.setData(e({},o._in.scrollTop,a)):qq.pageScrollTo({scrollTop:a,duration:300}),i()})})},getText:function(e){var t="";return function e(n){for(var o=0;o<n.length;o++){var i=n[o];if("text"==i.type)t+=i.text.replace(/&amp;/g,"&");else if("br"==i.name)t+="\n";else{var r="p"==i.name||"div"==i.name||"tr"==i.name||"li"==i.name||"h"==i.name[0]&&i.name[1]>"0"&&i.name[1]<"7";r&&t&&"\n"!=t[t.length-1]&&(t+="\n"),i.children&&e(i.children),r&&"\n"!=t[t.length-1]?t+="\n":"td"!=i.name&&"th"!=i.name||(t+="\t")}}}(e||this.data.nodes),t},getRect:function(){var e=this;return new Promise(function(t,n){qq.createSelectorQuery().in(e).select("._root").boundingClientRect().exec(function(e){return e[0]?t(e[0]):n("Root label not found")})})},setContent:function(e,n){var o=this;this.imgList&&n||(this.imgList=[]),this._videos=[];var i={},r=new t(this).parse(e);if(n)for(var a=this.data.nodes.length,l=r.length;l--;)i["nodes[".concat(a+l,"]")]=r[l];else i.nodes=r;this.setData(i,function(){o._hook("onLoad"),o.triggerEvent("load")});var s;clearInterval(this._timer),this._timer=setInterval(function(){o.getRect().then(function(e){e.height==s&&(o.triggerEvent("ready",e),clearInterval(o._timer)),s=e.height}).catch(function(){})},350)},_hook:function(e){for(var t=n.length;t--;)this.plugins[t][e]&&this.plugins[t][e]()},_add:function(e){e.detail.root=this}}});