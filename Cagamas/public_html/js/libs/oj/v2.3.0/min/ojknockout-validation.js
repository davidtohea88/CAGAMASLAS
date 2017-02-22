/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","jquery","knockout","ojs/ojknockout","ojs/ojmessaging"],function(a,g,b){a.vc=function(){};a.vc.OB="invalidComponentTracker";a.vc.e2="ojoptionchange";a.vc.iq="messagesShown";a.vc.hs="messagesHidden";a.vc.gs="disabled";a.vc.YB="readOnly";a.vc.ot=function(c,d,e,f,h){e={};h=h.call()[a.vc.OB];var k;if(c===a.vc.gs||c===a.vc.YB)return k=h&&h.peek()||null,null!==k&&b.isWriteableObservable(h)&&k.ot.call(k,f,c,d)&&h.valueHasMutated(),e[c]=d,e};a.vc._init=function(a,b){var e={};e[a]=b;return e};
a.vc.Qpa=function(b,d,e,f){f=f.call();var h;b===a.vc.OB&&(h=f[b]?!0:!1)&&a.vc.dCa(b,f,d,e);return{}};a.vc.qqa=function(c,d,e,f){d=g(d);f=f.call()[c];c===a.vc.OB&&d&&(d.off(a.vc.e2,a.vc.yea),f&&b.isWriteableObservable(f)&&(c=f.peek(),c.Kd.call(c,e)&&f.valueHasMutated()))};a.vc.yea=function(c,d){var e=c.data.O_,f,h=c.data.R,k=d.option,g=d.value;(k===a.vc.iq||k===a.vc.hs)&&e&&b.isWriteableObservable(e)&&(f=e.peek())&&f.ot.call(f,h,k,g)&&e.valueHasMutated()};a.vc.dCa=function(c,d,e,f){c=d[c];var h,k;
e=g(e);if(b.isObservable(c))k=c.peek(),null==k&&(k=new a.Jc,c(k));else throw Error("Binding attribute "+a.vc.OB+" should be bound to a ko observable.");null!==k&&(b.isWriteableObservable(c)&&(d=f.call(f,"option",a.vc.iq),h=f.call(f,"option",a.vc.hs),k.ot.call(k,f,a.vc.iq,d),k.ot.call(k,f,a.vc.hs,h),c.valueHasMutated()),f={O_:c,R:f},e.on(a.vc.e2,f,a.vc.yea))};a.ya.Tg().$g({"for":"editableValue",attributes:[a.vc.OB,a.vc.gs,a.vc.YB],init:a.vc._init,update:a.vc.ot,afterCreate:a.vc.Qpa,beforeDestroy:a.vc.qqa});
a.Jc=function(){this.Init()};o_("InvalidComponentTracker",a.Jc,a);a.b.sa(a.Jc,a.b,"oj.InvalidComponentTracker");a.Jc.iq="messagesShown";a.Jc.hs="messagesHidden";a.Jc.gs="disabled";a.Jc.YB="readOnly";a.Jc.prototype.Init=function(){a.Jc.u.Init.call(this);this.Rz=[];this.Us=[];this.iz=[];this.invalidHidden=this.invalidShown=!1};a.Jc.prototype.Vfa=function(){var a=null,b=this,e=this.SL;this.invalidShown&&(a=this.tT());setTimeout(function(){(a=e===b.SL?a||b.tT():b.tT())&&a.call(a,"Focus")},1);return a?
!0:!1};a.b.g("InvalidComponentTracker.prototype.focusOnFirstInvalid",{Vfa:a.Jc.prototype.Vfa});a.Jc.prototype.showMessages=function(){var a,b,e;if(this.invalidHidden)for(b=this.iz.length,e=0;e<b;e++)this.iz[e]&&(a=this.Rz[e].call(a,"showMessages"))};a.b.g("InvalidComponentTracker.prototype.showMessages",{showMessages:a.Jc.prototype.showMessages});a.Jc.prototype.tT=function(){for(var a,b=0,e=this.Us.length,b=0;b<e;b++)if(a=this.Us[b])return this.Rz[b];return null};a.Jc.prototype.Kd=function(a){var b=
-1,e=!1;g.each(this.Rz,function(e,h){0>b&&h===a&&(b=e)});0<=b&&(this.Rz.splice(b,1),this.Us.splice(b,1),this.iz.splice(b,1),this.KX(),e=!0);return e};a.Jc.prototype.ot=function(b,d,e){var f=b.call(b,"isValid"),h=-1,k=!0,l;g.each(this.Rz,function(a,d){0>h&&d===b&&(h=a)});switch(d){case a.Jc.iq:case a.Jc.hs:l=!1;e&&(0>h&&(h=this.Rz.push(b)-1,this.aza(h,l)),!f&&a.Jc.MU(e)&&(l=!0,d===a.Jc.iq&&(e=b.call(b,"option",a.Jc.gs),f=b.call(b,"option",a.Jc.YB),l=e||f?!1:!0)),k=this.$E(d,h||0,l),this.KX(),k&&(void 0===
this.SL&&(this.SL=0),this.SL++));break;case a.Jc.gs:case a.Jc.YB:k=!1,e&&(k=this.$E(a.Jc.iq,h||0,!1),k=this.$E(a.Jc.hs,h||0,!1)||k,this.KX())}return k};a.Jc.prototype.aza=function(b,d){void 0===this.Us[b]&&this.$E(a.Jc.iq,b,d);void 0===this.iz[b]&&this.$E(a.Jc.hs,b,d)};a.Jc.prototype.KX=function(){this.invalidShown=0<=this.Us.indexOf(!0);this.invalidHidden=0<=this.iz.indexOf(!0)};a.Jc.prototype.$E=function(b,d,e){var f=!1;b=b===a.Jc.iq?this.Us:b===a.Jc.hs?this.iz:[];0<=d&&void 0!==b[d]?(f=b[d]!==
e?!0:!1)&&b.splice(d,1,e):(b.push(e),f=!0);return f};a.Jc.MU=function(b){return!a.ia.isValid(b)}});