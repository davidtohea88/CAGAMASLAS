/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
/*
 Copyright 2013 jQuery Foundation and other contributors
 Released under the MIT license.
 http://jquery.org/license
*/
define(["ojs/ojcore","jquery","ojs/ojdatasource-common"],function(a,g){a.Ma=function(b,c){this.data=b||{};if(!(b instanceof Array)&&"function"!=typeof b&&"function"!=typeof b.subscribe)throw Error(a.W.od._ERR_DATA_INVALID_TYPE_SUMMARY+"\n"+a.W.od._ERR_DATA_INVALID_TYPE_DETAIL);null!=c&&null!=c.idAttribute||a.t.info(a.Ma.od._INFO_ARRAY_TABLE_DATASOURCE_IDATTR);a.Ma.u.constructor.call(this,b,c);this.$e=[];this.Ca={};if(null!=b&&void 0!==b&&(this.SU=null,null!=c&&null!=c.idAttribute&&(this.SU=c.idAttribute),
this.i=b instanceof Array?b:b(),this.Pf=this.i.length,!(b instanceof Array))){var d=this;b.subscribe(function(a){if(d.I$()){var b,c=[],g=[];for(b=0;b<a.length;b++)"deleted"===a[b].status&&c.push(a[b].value);d.remove(c,null);c=[];g=[];for(b=0;b<a.length;b++)"added"===a[b].status&&(c.push(a[b].value),g.push(a[b].index));d.add(c,{at:g})}},null,"arrayChange")}if(null!=c&&("enabled"==c.startFetch||null==c.startFetch)||null==c)this.QE=!0};o_("ArrayTableDataSource",a.Ma,a);a.b.sa(a.Ma,a.W,"oj.ArrayTableDataSource");
a.Ma.prototype.bm=null;a.b.g("ArrayTableDataSource.prototype.comparator",{bm:a.Ma.prototype.bm});a.Ma.prototype.sortCriteria=null;a.b.g("ArrayTableDataSource.prototype.sortCriteria",{sortCriteria:a.Ma.prototype.sortCriteria});a.Ma.prototype.Init=function(){a.Ma.u.Init.call(this)};a.b.g("ArrayTableDataSource.prototype.Init",{Init:a.Ma.prototype.Init});a.Ma.prototype.add=function(a,c){c=c||{};this.fv();return this.Hpa(a,c.at,c)};a.b.g("ArrayTableDataSource.prototype.add",{add:a.Ma.prototype.add});a.Ma.prototype.at=
function(a){this.fv();var c;c=0>a||a>=this.Ca.data.length?null:{data:this.Ca.data[a],index:a,key:this.Ry(this.Ca.data[a])};return new Promise(function(a){a(c)})};a.b.g("ArrayTableDataSource.prototype.at",{at:a.Ma.prototype.at});a.Ma.prototype.change=function(b,c){c=c||{};this.fv();var d=c.silent,e,f,g,k,l={data:[],keys:[],indexes:[]};b instanceof Array||(b=[b]);for(e=0;e<b.length;e++)f=b[e],null!=f&&(g=this.Ry(f),k=this.Rk(g,null),l.data.push(this.$l(f)),l.keys.push(g),l.indexes.push(k.index),this.Ca.data[k.index]=
f);!d&&0<l.data.length&&a.W.u.handleEvent.call(this,a.W.O.CHANGE,l);return Promise.resolve(l)};a.b.g("ArrayTableDataSource.prototype.change",{change:a.Ma.prototype.change});a.Ma.prototype.fetch=function(a){a=a||{};return"init"!=a.fetchType||this.QE?this.Gg(a):Promise.resolve()};a.b.g("ArrayTableDataSource.prototype.fetch",{fetch:a.Ma.prototype.fetch});a.Ma.prototype.get=function(a,c){c=c||{};this.fv();return Promise.resolve(this.Rk(a,c))};a.b.g("ArrayTableDataSource.prototype.get",{get:a.Ma.prototype.get});
a.Ma.prototype.getCapability=function(){return"full"};a.b.g("ArrayTableDataSource.prototype.getCapability",{getCapability:a.Ma.prototype.getCapability});a.Ma.prototype.remove=function(a,c){c=c||{};this.fv();return this.iw(a,c)};a.b.g("ArrayTableDataSource.prototype.remove",{remove:a.Ma.prototype.remove});a.Ma.prototype.reset=function(b,c){c=c||{};c.previousRows=this.Ca;var d=c.silent;null!=b&&(this.i=b);this.Ca={};this.Pf=0;d||a.W.u.handleEvent.call(this,a.W.O.RESET,null);return Promise.resolve()};
a.b.g("ArrayTableDataSource.prototype.reset",{reset:a.Ma.prototype.reset});a.Ma.prototype.sort=function(b){null==b?b=this.sortCriteria:this.sortCriteria=b;this.fv();var c=this;return new Promise(function(d){b=b||{};var e=c.gD();c.Ca.data.sort(function(b,d){return a.Ma.Nda(b,d,e,c)});c.KEa=!0;var f={header:b.key,direction:b.direction};a.W.u.handleEvent.call(c,a.W.O.SORT,f);d(f)})};a.b.g("ArrayTableDataSource.prototype.sort",{sort:a.Ma.prototype.sort});a.Ma.prototype.totalSize=function(){return this.Pf};
a.b.g("ArrayTableDataSource.prototype.totalSize",{totalSize:a.Ma.prototype.totalSize});a.Ma.prototype.Hpa=function(b,c,d){var e,f;d=d||{};var g=d.silent,k={data:[],keys:[],indexes:[]};b instanceof Array||(b=[b]);null==c||c instanceof Array||(c=[c]);for(d=0;d<b.length;d++)if(f=b[d],null!=f){e=this.Ry(f);k.data.push(this.$l(f));k.keys.push(e);if(!0==this.KEa&&0<this.Ca.data.length)for(e=0;e<this.Ca.data.length;e++)if(0>a.Ma.Nda(f,this.Ca.data[e],this.gD(),this)){this.Ca.data.splice(e,0,f);k.indexes.push(e);
break}else{if(e==this.Ca.data.length-1){this.Ca.data.push(f);k.indexes.push(e+1);break}}else null==c?(this.Ca.data.push(f),k.indexes.push(this.Ca.data.length-1)):(this.Ca.data.splice(c[d],0,f),k.indexes.push(c[d]));this.Pf++;this.tE()}!g&&0<k.data.length&&a.W.u.handleEvent.call(this,a.W.O.ADD,k);return Promise.resolve(k)};a.Ma.prototype.fv=function(){this.I$()||(this.data instanceof Array||"function"!=typeof this.data||"function"!=typeof this.data.subscribe||(this.i=this.data()),this.Ca=this.Xy(this.i),
this.Pf=this.i.length)};a.Ma.prototype.I$=function(){return null==this.Ca||null==this.Ca.data?!1:!0};a.Ma.prototype.Gg=function(b){b=b||{};this.PE(b);this.fv();var c;try{c=0<b.pageSize?b.pageSize:-1;this.oa||(this.oa=0);this.oa=null==b.startIndex?this.oa:b.startIndex;var d=a.Ma.wJ(this.Ca,this.oa,c),e=[],f=[],g,k,l;for(g=this.oa;g<=d;g++)k=this.Ry(this.Ca.data[g]),l=this.$l(this.Ca.data[g]),e[g-this.oa]=l,f[g-this.oa]=k}catch(m){return this.cn(b,null,m),Promise.reject(m)}d<this.oa&&(this.oa=d+1);
b.pageSize=c;b.startIndex=this.oa;b.refresh=!0;c={data:e,keys:f,startIndex:this.oa};this.cn(b,c,null);return Promise.resolve(c)};a.Ma.prototype.Rk=function(a){var c,d,e,f,h=null;for(c=0;c<this.Ca.data.length;c++)if(e=this.Ca.data[c],void 0!==e)if(f=this.Ry(e),g.isArray(f)&&g.isArray(a)){if(f.length==a.length){var k=!0;for(d=0;d<a.length;d++)if(f[d]!=a[d]){k=!1;break}k&&(d=this.$l(e),h={data:d,key:f,index:this.Ca.indexes[c]})}}else f==a&&(d=this.$l(e),h={data:d,key:f,index:this.Ca.indexes[c]});return h};
a.Ma.prototype.gD=function(){var a=this.comparator;if(null==a){var c=this.sortCriteria.key,d=this.sortCriteria.direction;"ascending"==d?a=function(a){return g.isFunction(a[c])?a[c]():a[c]}:"descending"==d&&(a=function(a,b){var d,k;g.isFunction(a[c])?(d=a[c](),k=b[c]()):(d=a[c],k=b[c]);return d===k?0:d>k?-1:1})}return a};a.Ma.prototype.tE=function(){for(var a=0;a<this.Ca.data.length;a++)this.Ca.indexes[a]=a};a.Ma.prototype.iw=function(b,c){var d,e;c=c||{};var f=c.silent,g={data:[],keys:[],indexes:[]};
b instanceof Array||(b=[b]);var k=[];for(d=0;d<b.length;d++)e=b[d],null!=e&&(e=this.Ry(e),e=this.Rk(e,null),null!=e&&k.push({data:e.data,key:e.key,index:e.index}));k.sort(function(a,b){return a.index-b.index});for(d=0;d<k.length;d++)g.data.push(k[d].data),g.keys.push(k[d].key),g.indexes.push(k[d].index);for(d=g.indexes.length-1;0<=d;d--)this.Ca.data.splice(g.indexes[d],1),this.Ca.indexes.splice(g.indexes[d],1),this.Pf--,this.tE();!f&&0<g.data.length&&a.W.u.handleEvent.call(this,a.W.O.REMOVE,g);return Promise.resolve(g)};
a.Ma.prototype.PE=function(b){b.silent||a.W.u.handleEvent.call(this,a.W.O.REQUEST,{startIndex:b.startIndex})};a.Ma.prototype.cn=function(b,c,d){null!=d?a.W.u.handleEvent.call(this,a.W.O.ERROR,d):b.silent||a.W.u.handleEvent.call(this,a.W.O.SYNC,c)};a.Ma.rq=function(a,c,d){if("descending"==d){if(a<c)return 1;if(c<a)return-1}else{if(a>c)return 1;if(c>a)return-1}return 0};a.Ma.wJ=function(a,c,d){var e=a.data.length-1;0<d&&(e=c+d-1,e=e>a.data.length-1?a.data.length-1:e);return e};a.Ma.ic=function(a,c){return g.isFunction(a[c])?
a[c]():a[c]};a.Ma.prototype.Xy=function(a){var c=a.length-1,d={},e,f;d.data=[];d.indexes=[];this.rs=null;for(e=0;e<=c;e++){var g={},k=a[e];for(f in k)k.hasOwnProperty(f)&&(g[f]=k[f],0==e&&(null==this.rs&&(this.rs=[]),this.rs.push(f)));d.data[e]=g;d.indexes[e]=e}return d};a.Ma.prototype.Ry=function(b){var c,d=this.wT(b);if(g.isArray(d)){var e;c=[];for(e=0;e<d.length;e++)if(d[e]in b)c[e]=a.Ma.ic(b,d[e]);else throw b=a.va.Lc(a.Ma.od._ERR_ARRAY_TABLE_DATASOURCE_IDATTR_NOT_IN_ROW,[d[e]]),Error(b);}else if(d in
b)c=a.Ma.ic(b,d);else throw b=a.va.Lc(a.Ma.od._ERR_ARRAY_TABLE_DATASOURCE_IDATTR_NOT_IN_ROW,[d]),Error(b);return c};a.Ma.prototype.wT=function(a){if(null!=this.SU)return this.SU;if(null==this.rs){this.rs=[];for(var c in a)a.hasOwnProperty(c)&&this.rs.push(c)}return this.rs.hasOwnProperty("id")?"id":this.rs};a.Ma.Nda=function(b,c,d,e){var f,h=e.sortCriteria.direction;if(g.isFunction(d)){if(1===d.length){f=d.call(e,b);e=d.call(e,c);b=a.cb.Re(f)?f.split(","):[f];c=a.cb.Re(e)?e.split(","):[e];for(d=0;d<
b.length;d++)if(f=a.Ma.rq(b[d],c[d],h),0!==f)return f;return 0}return d.call(e,b,c)}if(a.cb.Re(d)){var k=d.split(",");for(d=0;d<k.length;d++)if(f=a.Ma.ic(b,k[d]),e=a.Ma.ic(c,k[d]),f=a.Ma.rq(f,e,h),0!==f)return f}return 0};a.Ma.prototype.$l=function(b){var c={},d,e=Object.keys(b);for(d=0;d<e.length;d++)a.Ma.vS(c,b,e[d]);return c};a.Ma.vS=function(a,c,d){Object.defineProperty(a,d,{get:function(){return c[d]},set:function(a){c[d]=a},enumerable:!0})};a.Ma.od={_INFO_ARRAY_TABLE_DATASOURCE_IDATTR:"idAttribute option has not been specified. Will default to using 'id' if the field exists. If not, will use all the fields.",
_ERR_ARRAY_TABLE_DATASOURCE_IDATTR_NOT_IN_ROW:"Specified idAttribute {0} not in row data. Please ensure all specified idAttribute fields are in the row data or do not specify idAttribute and all fields will be used as id."}});