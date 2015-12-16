/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2013 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/
(function(a){var b=a("#page"),c=a(window),d=function(a,b,c){this.service=a;this.elem=b;this.data=c;this.cssProxy=this.service.cssProxy;this.enabled=c&&0<c.length;this.visible=!0;this.isMarkedAsOOV=!1;this.hasPreInitClass=this.elem.hasClass(d.HIDDEN_CLASS)};d.HIDDEN_CLASS="mse_pre_init";d.prototype.clone=function(a){a.hasClass(d.HIDDEN_CLASS)||a.addClass(d.HIDDEN_CLASS);a.registerGenericScrollEffect(d,this.data)};d.prototype.initialize=function(){this.referenceOffset=this.data[0]["in"][1];this.elemWidth=
this.elem.innerWidth();this.elemHeight=this.elem.innerHeight();this.skipVisibleCheck=this.elemWidth<1;for(var a,b=0,c;c=this.data[b];b++)c.length=c["in"][1]-c["in"][0],c.startPosition=a?{left:a.startPosition.left+a.length*a.speed[0],top:a.startPosition.top+a.length*a.speed[1]}:{left:-c.length*c.speed[0],top:-c.length*c.speed[1]},a=c};d.prototype.update=function(a,b,c){var g=this.elementLeft-c.scrollLeft,f=this.elementTop-this.referenceOffset,h=a.startPosition.left+a.speed[0]*b,b=a.startPosition.top+
a.speed[1]*b,j={};if("number"==typeof a.speed[0])j.left=g+h+"px";if("number"==typeof a.speed[1])j.top=f-b+"px";if(this.visible=this.skipVisibleCheck||this.getVisible(g+h,f-b,c)){if(this.isMarkedAsOOV)j.display="",this.isMarkedAsOOV=!1;this.cssProxy.setCSSProperties(this.elem,j)}else if(!this.isMarkedAsOOV)this.cssProxy.setCSSProperties(this.elem,{display:"none"}),this.isMarkedAsOOV=!0;if(this.hasPreInitClass)this.elem.removeClass(d.HIDDEN_CLASS),this.hasPreInitClass=!1};d.prototype.getVisible=function(a,
b,c){var d=Math.max(this.elemWidth,this.elemHeight)+100;return(void 0===a||a+d>0&&a-d<c.windowWidth)&&(void 0===b||b+d>0&&b-d<c.windowHeight)};var f=function(a,b,c){this.service=a;this.elem=b;this.data=c;this.cssProxy=this.service.cssProxy;this.r7Mode=!0;if(!this.r7Mode&&(this.cssBackgroundPosition=this.elem.css("background-position"),this.cssBackgroundPosition.match(/^\d+\%$/gi)))this.cssBackgroundPosition=(a=this.elem[0].currentStyle)&&a.backgroundPositionX&&a.backgroundPositionY?a.backgroundPositionX+
" "+a.backgroundPositionY:Muse.Utils.getRuleProperty(this.getCSSRule(),"background-position");if(this.useBackgroundFixedOptimization()){this.elem.css("background-attachment","fixed");if(this.r7Mode)this.enabled=!1;this.backgroundFixedMode=!0}this.elem.data("hasBackgroundPositionScrollEffect",!0)};f.BG_NORMAL=0;f.BG_COVER=1;f.BG_CONTAIN=2;f.prototype.getCSSRule=function(){if(!this.pageSheet)this.pageStyleSheet=Muse.Utils.getPageStyleSheet();if(!this.cssRule)this.cssRule=Muse.Utils.getStyleSheetRuleById(this.pageStyleSheet,
this.elem.attr("id"));return this.cssRule};f.prototype.useBackgroundFixedOptimization=function(){if(!c.data("scrollWrapper").isStandard())return!1;return 0==this.data[0].speed[0]&&0==this.data[0].speed[1]&&0==this.data[1].speed[0]&&0==this.data[1].speed[1]};f.prototype.initialize=function(){this.referenceOffset=this.data[0]["in"][1];var b=this.elem.parent();this.is100PercentWidth=b.hasClass("browser_width");this.hasPositionEffect=(this.positionEffect=this.service.getElementEffect(this.is100PercentWidth?
b:this.elem,d))&&this.positionEffect.enabled;for(var b=0,g,f;g=this.data[b];b++)g.speed[0]-=0,g.speed[1]-=1,g.length=g["in"][1]-g["in"][0],g.startPosition=null==f?{left:-g.length*g.speed[0],top:-g.length*g.speed[1]}:{left:f.startPosition.left+f.length*f.speed[0],top:f.startPosition.top+f.length*f.speed[1]},f=g;if(!Muse.Browser.Features.checkCSSFeature("background-size")&&this.elem.hasClass("museBGSize")&&0<a("> .museBgSizePolyfill",this.elem).length)this.polyfillElement=a(a(".museBgSizePolyfill img",
this.elem)[0]);this.bgMode=this.getBgMode();this.backgroundOffsetAvailable=!1;this.elem.resize(this,this.onElementResize);this.is100PercentWidth&&c.resize(this,this.onWindowResize);this.backgroundPosition=this.getBackgroundPosition();this.getBackgroundOffset();if(this.elem.hasClass("browser_width"))this.originalWidth=Muse.Utils.tryParse(Muse.Utils.getRuleProperty(this.getCSSRule(),"width"),parseInt)};f.prototype.onWindowResize=function(a){a.data.recalculateBackgroundOffset=!0};f.prototype.onElementResize=
function(a){var a=a.data,b=a.service.getEffectProgress(),c=a.service.getEffectInterval(a,b);a.update(c,b-c["in"][0])};f.prototype.hasOriginalWidth=function(){return Muse.Utils.isDefined(this.originalWidth)&&-1!=this.originalWidth};f.prototype.getDeltaWidth=function(){if(!this.hasOriginalWidth())return 0;return(this.elem.innerWidth()-this.originalWidth)*this.backgroundPosition.multiplier.x};f.prototype.getBackgroundModeDisplayRatio=function(){switch(this.bgMode){case f.BG_CONTAIN:return Math.min(this.elem.innerWidth()/
this.backgroundSize.width,this.elem.innerHeight()/this.backgroundSize.height);case f.BG_COVER:return Math.max(this.elem.innerWidth()/this.backgroundSize.width,this.elem.innerHeight()/this.backgroundSize.height);default:return 1}};f.prototype.updateFixedBackground=function(a,b){var c=this.getBackgroundModeDisplayRatio(),d=this.elem.offset(),g=d.left,h=d.top-this.referenceOffset;if(this.hasPositionEffect&&0==this.positionEffect.data[this.data.indexOf(a)].speed[1]||!this.hasPositionEffect&&"fixed"==
this.elem.css("position"))h=d.top-(a["in"][0]+b);d=(f.BG_COVER!==this.bgMode||!this.is100PercentWidth?g:0)+this.backgroundPosition.multiplier.x*(this.elem.width()-c*this.backgroundSize.width)+Muse.Utils.getCSSIntValue(this.elem,"border-left-width");h=h+this.backgroundPosition.multiplier.y*(this.elem.height()-c*this.backgroundSize.height)+Muse.Utils.getCSSIntValue(this.elem,"border-top-width");h={"background-position":d+"px "+h+"px"};1!=c&&(h["background-size"]=c*this.backgroundSize.width+"px "+c*
this.backgroundSize.height+"px");this.cssProxy.setCSSProperties(this.elem,h)};f.prototype.update=function(a,b){if(this.backgroundOffsetAvailable){if(this.recalculateBackgroundOffset)this.recalculateBackgroundOffset=!1,this.getBackgroundOffset();if(this.backgroundFixedMode)this.updateFixedBackground(a,b);else{var c=this.getBackgroundModeDisplayRatio()-1,d=Math.floor(this.bgOffset.x-c*this.backgroundPosition.multiplier.x*this.backgroundSize.width+this.getDeltaWidth())+a.startPosition.left+a.speed[0]*
b,c=Math.floor(this.bgOffset.y-c*this.backgroundPosition.multiplier.y*this.backgroundSize.height)-(a.startPosition.top+a.speed[1]*b);this.polyfillElement?(d={"margin-left":d+"px","margin-top":c+"px",left:0,top:0},this.cssProxy.setCSSProperties(this.polyfillElement,d)):(d={"background-attachment":"scroll","background-position":d+"px "+c+"px"},this.cssProxy.setCSSProperties(this.elem,d))}}else this.updateRequested=!0};f.prototype.getBackgroundOffset=function(){var a=Muse.Utils.tryParse(this.backgroundPosition.x,
parseFloat,0),b=Muse.Utils.tryParse(this.backgroundPosition.y,parseFloat,0);if(!Muse.Utils.endsWith(this.backgroundPosition.x,"%")&&!Muse.Utils.endsWith(this.backgroundPosition.y,"%"))this.onBackgroundOffsetAvailable(a,b);else if(this.backgroundSize)this.updateBackgroundOffset(a,b);else{var c=this;this.getBackgroundSize(function(d){c.backgroundSize=d;c.updateBackgroundOffset(a,b);if(c.updateRequested){c.updateRequested=!1;var d=c.service.getEffectProgress(),g=c.service.getEffectInterval(c,d);c.update(g,
d-g["in"][0])}})}};f.prototype.updateBackgroundOffset=function(a,b){var c=this.is100PercentWidth&&this.hasPositionEffect&&this.positionEffect.isMarkedAsOOV?this.elem.parent():this.elem;if(Muse.Utils.endsWith(this.backgroundPosition.x,"%"))var d=Muse.Utils.firstDefined(this.originalWidth,c.innerWidth()),a=a/100*(d-Muse.Utils.firstDefined(this.backgroundSize.width,d));Muse.Utils.endsWith(this.backgroundPosition.y,"%")&&(c=c.innerHeight(),b=b/100*(c-Muse.Utils.firstDefined(this.backgroundSize.height,
c)));this.onBackgroundOffsetAvailable(a,b)};f.prototype.onBackgroundOffsetAvailable=function(a,b){this.bgOffset={x:a,y:b};this.backgroundOffsetAvailable=!0};f.prototype.getBgMode=function(){var a=(this.elem.get(0).currentStyle||window.getComputedStyle(this.elem.get(0),null))["background-size"]||this.elem.css("background-size");if(!a||!a.match)return f.BG_NORMAL;if(a.match(/cover/gi))return f.BG_COVER;if(a.match(/contain/))return f.BG_CONTAIN;return f.BG_NORMAL};f.prototype.isValidBackgroundPosition=
function(a){return Muse.Utils.endsWith(a,"%")||Muse.Utils.endsWith(a,"px")};f.prototype.getBackgroundPosition=function(){var a=this.cssBackgroundPosition?this.cssBackgroundPosition:this.elem.css("background-position");switch(a){case "top":case "bottom":a="center "+a;break;case "0%":case "50%":case "100%":a+=" center"}if(!a){var b=this.elem.css("background-position-x"),c=this.elem.css("background-position-y");b&&(a=b+" "+(c||""))}if(!a||!a.split)return{x:"0%",y:"0%"};a=a.replace(/(?:left|top)/gi,"0%").replace(/center/gi,
"50%").replace(/(?:right|bottom)/gi,"100%");a=a.replace(/^\s+|\s+$/gi,"");a=a.split(" ");1==a.length&&a.push("50%");if(!this.isValidBackgroundPosition(a[0])||!this.isValidBackgroundPosition(a[1]))Muse.Assert.fail("Invalid measurement unit for background position. Expecting px or %.");else return{x:a[0],y:a[1],multiplier:{x:Muse.Utils.endsWith(a[0],"%")?Muse.Utils.tryParse(a[0],parseInt,0)/100:0,y:Muse.Utils.endsWith(a[1],"%")?Muse.Utils.tryParse(a[1],parseInt,0)/100:0}}};f.prototype.getBackgroundSize=
function(b){var c=this.polyfillElement?this.polyfillElement.attr("src"):this.elem.css("background-image");if(!c&&!c.replace)b();else{var c=c.replace(/^url\("?|"?\)$/gi,""),d=new Image;a(d).one("load",function(){b({width:d.width,height:d.height})});d.src=c}};var g=function(a,b,c){this.service=a;this.elem=b;this.data=c};g.prototype.update=function(){};var j=function(a,b,c){this.service=a;this.elem=b;this.data=c;this.cssProxy=this.service.cssProxy;this.elemToBeMarkedAsInvisible=this.elem.parent().hasClass("browser_width")?
this.elem.parent():this.elem;this.hasPreInitClass=this.elem.hasClass(j.PRE_INITIT_CLASS_NAME)};j.PRE_INITIT_CLASS_NAME="ose_pre_init";j.INVISIBLE_CLASS_NAME="ose_ei";j.prototype.initialize=function(){Muse.Assert.assert(3==this.data.length,"Opacity Scroll Effect should have 3 intervals");var a=this.data[0],b=this.data[1],c=this.data[2];0<a.fade&&(a["in"][1]-=a.fade,this.data.splice(1,0,{"in":[a["in"][1],a["in"][1]+a.fade],opacity:[a.opacity,b.opacity],rate:(b.opacity-a.opacity)/a.fade}));0<c.fade&&
(c["in"][0]+=c.fade,this.data.splice(this.data.length-1,0,{"in":[c["in"][0]-c.fade,c["in"][0]],opacity:[b.opacity,c.opacity],rate:(c.opacity-b.opacity)/c.fade}));this.hasPositionEffect=(this.positionEffect=this.service.getElementEffect(this.elem,d))&&this.positionEffect.enabled};j.prototype.setElementOpacity=function(a){this.cssProxy.setCSSProperties(this.elem,{opacity:a/100,filter:"alpha(opacity="+a+")"});var b=0===a;if(void 0===this.previousOpacity||b&&0!==this.previousOpacity||!b&&0===this.previousOpacity)b?
this.elemToBeMarkedAsInvisible.addClass(j.INVISIBLE_CLASS_NAME):this.elemToBeMarkedAsInvisible.removeClass(j.INVISIBLE_CLASS_NAME);this.previousOpacity=a};j.prototype.update=function(a,b){var c=0;if(!this.hasPositionEffect||this.positionEffect.visible)c="number"!=typeof a.opacity?a.opacity[0]+a.rate*b:a.opacity,c=Math.max(Math.min(c,100),0);this.setElementOpacity(c);if(this.hasPreInitClass)this.elem.removeClass(j.PRE_INITIT_CLASS_NAME),this.hasPreInitClass=!1};var h=function(a,b,c){this.service=a;
this.elem=b;this.data=c;this.widget=this.elem.data("widget");this.lastDisplayedSlide=0;this.lastInterval=null};h.prototype.initialize=function(){this.noOfSlides=this.widget.slides.$element.length;if(this.isLinkToScrollEffect=this.isLinkToScrollInterval(this.data[1]))this.data[1].intervalLength=this.data[1]["in"][1]-this.data[1]["in"][0],Muse.Assert.assert(2==this.data.length||Infinity!=this.data[1].intervalLength,"In a 3 interval configuration, why do we have middle interval with length = Infinity?")};
h.prototype.update=function(a,b){if(this.play!==a.play)!0===a.play?(this.play=!0,this.start()):!1===a.play?(this.play=!1,this.stop()):this.isLinkToScrollInterval(a)?(this.play=void 0,this.jump(b)):Muse.Assert.assert(!1,"Unknown widget configuration: play="+a.play);if(!1===a.play&&this.isLinkToScrollEffect&&a!==this.lastInterval)switch(this.data.indexOf(a)){case 0:this.jump(0);break;case 2:this.jump(this.data[1].intervalLength);break;default:Muse.Assert.assert(!1,"Why is the second interval using a play:false setting?")}this.lastInterval=
a};h.prototype.isLinkToScrollInterval=function(a){return"number"==typeof a.play};h.prototype.jump=function(a){var a=Math.floor(a/this.data[1].play),b=(a-this.lastDisplayedSlide)%this.noOfSlides;if(0!=b){for(var c=0<b?b:-b,d=0;d<c;d++)0<b?this.widget.next():this.widget.previous();this.lastDisplayedSlide=a}};h.prototype.start=function(){var b;a(this.widget).one("wp-slideshow-before-play",function(){b=this.options.displayInterval;this.options.displayInterval=0});a(this.widget).one("wp-slideshow-play",
function(){Muse.Assert.assert(void 0!==b,"Why do we got a play event fired before beforePlay event?");this.options.displayInterval=b});this.widget.play()};h.prototype.stop=function(){this.widget.stop()};var l=function(a,b,c){this.service=a;this.elem=b;this.data=c;this.enabled=!0;this.stage=null;this.play=!1;this.lastInterval=null};l.prototype.initialize=function(){this.data[1].intervalLength=this.data[1]["in"][1]-this.data[1]["in"][0];Muse.Assert.assert(2==this.data.length||Infinity!=this.data[1].intervalLength,
"In a 3 interval configuration, why do we have middle interval with length = Infinity?");this.iframe=this.elem.children()[0];this.iframeWindow=this.iframe.contentWindow;if(this.iframeWindow.AdobeEdge)this.updateStage(this);else{var b=this;a(this.iframe).bind("load",function(){b.updateStage(b)})}};l.prototype.updateStage=function(a){"undefined"==typeof a.iframeWindow.AdobeEdge?a.enabled=!1:a.iframeWindow.AdobeEdge.bootstrapCallback(function(b){a.onCompositionReady(b,a)})};l.prototype.onCompositionReady=
function(a,b){var c=b.iframeWindow.AdobeEdge,d=null;Muse.Assert.assert(null!=c,"AdobeEdge object must not be null.");"undefined"!=typeof c.compositions?d=c.compositions[a]:"function"==typeof c.getComposition?d=c.getComposition(a):Muse.Assert.assert(!1,"Could not find any reliable way of obtaining the composition object.");Muse.Assert.assert(null!=d,"Composition object must not be null.");b.stage=d.getStage();if(b.stage&&"function"==typeof b.stage.setAutoPlay)b.stage.setAutoPlay(!1);else for(var g in b.stage.timelines)b.stage.autoPlay[g]=
!1;b.lastUpdateInterval&&b.lastUpdateIntervalProgress&&setTimeout(function(){b.update(b.lastUpdateInterval,b.lastUpdateIntervalProgress)},10)};l.prototype.update=function(a,b){if(this.enabled)if(this.stage){if(this.play!==a.play)!0===a.play?(this.play=!0,this.start()):!1===a.play?(this.play=!1,this.stop()):"number"==typeof a.play?(this.play=!0,this.seek(b*1E3/a.play)):Muse.Assert.assert(!1,"Unknown widget configuration: play="+a.play);if(!1===a.play&&a!==this.lastInterval)switch(this.data.indexOf(a)){case 0:this.seek(0);
break;case 2:this.seek(this.data[1].intervalLength*1E3/this.data[1].play);break;default:Muse.Assert.assert(!1,"Why is the second interval using a play:false setting?")}this.lastInterval=a}else this.lastUpdateInterval=a,this.lastUpdateIntervalProgress=b};l.prototype.start=function(){this.stage.play()};l.prototype.stop=function(){this.stage.stop(this.stage.getTimelinePosition())};l.prototype.seek=function(a){this.stage.seek(a%this.stage.getDuration())};var k=function(a){this.idGetterFn=a;this.mode=
k.MODE_IMMEDIATE;this.cssPropsCache={};this.requestCSSUpdatePending=!1};k.MODE_IMMEDIATE=0;k.MODE_DELAYED=1;k.prototype.setModeDelayed=function(){if(window.webkitRequestAnimationFrame)this.mode=k.MODE_DELAYED};k.prototype.getCacheForElement=function(a){var b=this.idGetterFn(a),c=this.cssPropsCache[b];void 0===c&&(this.cssPropsCache[b]=c={style:a[0].style,appliedProps:{},queuedProps:{},hasQueuedProps:!1});return c};k.prototype.setCSSProperties=function(a,b){var c=this.getCacheForElement(a),d=!1,g=
this,f;for(f in b)if(c.appliedProps[f]!==b[f])c.queuedProps[f]=b[f],c.hasQueuedProps=d=!0;if(!this.requestCSSUpdatePending&&d)this.requestCSSUpdatePending=!0,k.MODE_DELAYED==this.mode?Muse.Utils.requestAnimationFrame(function(){g.doCSSUpdate()}):this.doCSSUpdate()};k.prototype.doCSSUpdate=function(){for(var a in this.cssPropsCache){var b=this.cssPropsCache[a];if(b.hasQueuedProps){for(var c in b.queuedProps)b.style[Muse.Utils.toCamelCase(c)]=b.appliedProps[c]=b.queuedProps[c];b.queuedProps={};b.hasQueuedProps=
!1}}this.requestCSSUpdatePending=!1};var i=function(){this.effects=[];this.initialCSSProperties={};this.pagePaddingTop=Muse.Utils.tryParse(a("body").css("padding-top"),parseInt,0)+Muse.Utils.tryParse(a("#page").css("border-top-width"),parseInt,0);this.scrollY=this.scrollX=0;this.cssProxy=new k(this.getElemID)};i.TEMP_UID_ATTR="data-muse-tempuid";i.prototype.getEffectProgress=function(){return Math.max(0,this.scrollY)};i.prototype.getHorizontalScroll=function(){return this.scrollX-b.offset().left};
i.prototype.getEnvironmentSettings=function(){return{windowWidth:window.innerWidth||c.width(),windowHeight:window.innerHeight||c.height(),scrollLeft:this.getHorizontalScroll()}};i.prototype.onUpdate=function(a,b){var c=0,d,g,f=this.getEnvironmentSettings();this.scrollX=a;this.scrollY=b;for(c=0;c<this.effects.length;c++)d=this.getEffectProgress(),g=this.getEffectInterval(this.effects[c],d),this.effects[c].update(g,d-g["in"][0],f)};i.prototype.getEffectInterval=function(a,b){for(var c=0,d;d=a.data[c]["in"];c++)if(d[0]<
b&&b<=d[1])return a.data[c];Muse.Assert.fail("Why do we have a progress value that does not fit in any interval?");return null};i.prototype.registerEffect=function(a,c,d){var g=this.getElemID(a),f=this,h=new c(this,a,d);if(!1!==h.enabled)"undefined"==typeof this.initialCSSProperties[g]&&(this.initialCSSProperties[g]={left:Muse.Utils.tryParse(a.css("left"),parseInt,0)+Muse.Utils.tryParse(b.css("border-left-width"),parseInt,0),top:Muse.Utils.tryParse(a.css("top"),parseInt,0)+this.pagePaddingTop}),h.elementLeft=
this.initialCSSProperties[g].left,h.elementTop=this.initialCSSProperties[g].top,h.type=c,h.data[0]["in"][0]=-100,h.initialize&&h.initialize(),setTimeout(function(){var a=f.getEffectProgress(),b=f.getEffectInterval(h,a);h.update(b,a-b["in"][0],f.getEnvironmentSettings())},0),this.effects.push(h)};i.prototype.getElementEffect=function(a,b){for(var c=n.effects.length,d=0;d<c;d++){var g=n.effects[d];if(g.elem.is(a)&&g.type==b)return g}};i.prototype.getElemID=function(a){return a.attr("id")||a.attr(i.TEMP_UID_ATTR)||
a.attr(i.TEMP_UID_ATTR,Math.round(Math.random()*1E6)).attr(i.TEMP_UID_ATTR)};var n=new i;c.data("scrollEffectsService",n);a.fn.registerPositionScrollEffect=function(b){return a(this).registerGenericScrollEffect(d,b)};a.fn.registerBackgroundPositionScrollEffect=function(b){return a(this).registerGenericScrollEffect(f,b)};a.fn.registerRotateScrollEffect=function(b){return a(this).registerGenericScrollEffect(g,b)};a.fn.registerOpacityScrollEffect=function(b){return a(this).registerGenericScrollEffect(j,
b)};a.fn.registerSlideshowScrollEffect=function(b){return a(this).registerGenericScrollEffect(h,b)};a.fn.registerEdgeAnimateScrollEffect=function(b){return a(this).registerGenericScrollEffect(l,b)};a.fn.registerGenericScrollEffect=function(b,c){n.registerEffect(a(this),b,c);a(this).data("hasScrollEffect",!0);return this};a.fn.clearScrollEffects=function(){a(this).data("hasScrollEffect",!1);for(var b=0;b<n.effects.length;)n.effects[b].elem.is(this)?n.effects.splice(b,1):b++};a.fn.cloneScrollEffectsFrom=
function(a){for(var b=n.effects.length,c=0;c<b;c++){var d=n.effects[c];d.elem.is(a)&&d.clone&&d.clone(this)}}})(jQuery);
(function(a){var b=a(window),c=a(document),d=a("html"),f=a("body"),g=a("#page"),j=function(a,b){this.wrapper=a;this.onScrollFn=b;this.type="StandardScrollProvider"};j.prototype.activate=function(){b.scroll(this,this.onUpdate);b.on("mousewheel",this,this.onMouseWheel);b.resize(this,this.onUpdate);this.onUpdate()};j.prototype.deactivate=function(){b.off("scroll",this.onUpdate);b.off("mousewheel",this.onMouseWheel);b.off("resize",this.onUpdate)};j.prototype.scrollTop=function(){return b.scrollTop()};
j.prototype.scrollLeft=function(){return b.scrollLeft()};j.prototype.onUpdate=function(a){a=a&&a.data||this;a.onScrollFn(a.scrollLeft(),a.scrollTop())};j.prototype.onMouseWheel=function(){};j.prototype.scrollTo=function(a,b){window.scrollTo(a,b)};j.prototype.scrollHeight=function(){return(document.documentElement||document.body).scrollHeight};j.prototype.scrollWidth=function(){return(document.documentElement||document.body).scrollWidth};var h=function(b,c){this.wrapper=b;this.onScrollFn=c;this.moveStarted=
!1;this.animation=null;this.scrollOffset={x:0,y:0};this.speed={x:0,y:0};this.lastTouch={x:0,y:0};this.metaViewPort=a("meta[name=viewport]");this.enabled=!0;this.type="WebkitScrollProvider";this.touchListeners=[]};h.DECELERATION_RATE=1.5;h.SCALE=1;h.LOCK_X=!1;h.LOCK_Y=!1;h.HTML_WRAPPER_ID="webit_scroll_provider_wrapper";h.IFRAME_BODY_CLASS="WebkitScrollProviderIframeBodyHelperClass";h.IFRAME_DATA="WebkitScrollProviderIframeData";h.prototype.available=function(){return this.enabled&&"ontouchstart"in
window&&jQuery.browser.SafariMobile};h.prototype.activate=function(){a("script").remove();g.wrap('<div id="'+h.HTML_WRAPPER_ID+'" />');this.htmlWrapper=a("#"+h.HTML_WRAPPER_ID+"");this.docProps={paddingTop:Muse.Utils.getCSSIntValue(f,"padding-top")+Muse.Utils.getCSSIntValue(f,"margin-top"),paddingBottom:Muse.Utils.getCSSIntValue(f,"padding-bottom")+Muse.Utils.getCSSIntValue(f,"margin-bottom"),paddingLeft:Muse.Utils.getCSSIntValue(g,"margin-left"),paddingRight:Muse.Utils.getCSSIntValue(g,"margin-right")};
this.htmlWrapper.css("padding-top",this.docProps.paddingTop);this.htmlWrapper.css("padding-bottom",this.docProps.paddingBottom);this.htmlWrapper.css("width","100%");this.htmlWrapper.css("min-width",g.outerWidth());this.htmlWrapper.addClass("html");d.removeClass("html");f.addClass("scroll_wrapper");b.scroll(this,this.onWindowScroll);b.on("orientationchange",this,this.orientationChange);this.addTouchListeners(c);a("input,textarea").on("touchstart",this,this.onElementTouchStart);a("input,textarea").on("focus",
this,this.onElementFocus);a("input,textarea").on("blur",this,this.onElementBlur);var j=this;a(".animationContainer").each(function(){var b=a(this);b.load(function(){var c=b.contents();j.addTouchListeners(c);a("body",c).addClass(h.IFRAME_BODY_CLASS);a("body",c).data(h.IFRAME_DATA,b)})})};h.prototype.onElementTouchStart=function(a){a.data.inFormFieldEditMode=!0};h.prototype.onElementFocus=function(a){a=a.data;if(a.stopTimeout)clearTimeout(a.stopTimeout),a.stopTimeout=0};h.prototype.onElementBlur=function(a){var b=
a.data;b.stopTimeout=setTimeout(function(){b.stopTimeout=0;b.inFormFieldEditMode=!1},200)};h.prototype.addTouchListeners=function(a){a.on("touchstart",this,this.touchStartHandler);a.on("touchmove",this,this.touchMoveHandler);a.on("touchend",this,this.touchEndHandler);this.touchListeners.push(a)};h.prototype.removeTouchListeners=function(){for(var a=0,b,c=this.touchListeners.length;a<c;a++)b=this.touchListeners[a],b.off("touchstart",this.touchStartHandler),b.off("touchmove",this.touchMoveHandler),
b.off("touchend",this.touchEndHandler);this.touchListeners.splice(0,this.touchListeners.length)};h.prototype.deactivate=function(){b.off("scroll",this.onWindowScroll);b.off("orientationchange",this.orientationChange);this.removeTouchListeners();f.removeClass("scroll_wrapper");d.addClass("html");g.unwrap();a("input,textarea").off("touchstart",this.onElementTouchStart);a("input,textarea").off("focus",this.onElementFocus);a("input,textarea").off("blur",this.onElementBlur)};h.prototype.onWindowScroll=
function(a){var a=a.data,c=b.scrollLeft(),d=b.scrollTop();if(!a.inFormFieldEditMode&&(0!=c||0!=d))window.scrollTo(0,0),a.scrollTo(c,d)};h.prototype.orientationChange=function(a){a=a.data;a.animation&&a.animation.stop(!1,!1);a.scrollTo(a.scrollOffset.x,a.scrollOffset.y)};h.prototype.canStartScroll=function(a){return!a.tagName.match(/input|textarea|select/i)};h.prototype.getIFrameScrollOffset=function(b){b=a("body",a(b).parents());if(b.hasClass(h.IFRAME_BODY_CLASS))return b.data(h.IFRAME_DATA).offset()};
h.prototype.touchStartHandler=function(a){var b=a.data,c=a.originalEvent;Muse.Assert.assert(!b.moveStarted,"Starting touch tracking while already tracking movement?");if(b.canStartScroll(a.target))b.animation&&b.animation.stop(!1,!1),b.speed.y=b.speed.x=0,a=b.getIFrameScrollOffset(a.target),b.lastTouch.y=c.targetTouches[0].pageY+(a?a.top:0),b.lastTouch.x=c.targetTouches[0].pageX+(a?a.left:0),b.moveStarted=!0};h.prototype.touchMoveHandler=function(a){var b=a.data,c=a.originalEvent;a.preventDefault();
if(b.moveStarted)a=b.getIFrameScrollOffset(a.target),b.scrollByDelta(b.lastTouch.x-c.targetTouches[0].pageX-(a?a.left:0),b.lastTouch.y-c.targetTouches[0].pageY-(a?a.top:0)),b.lastTouch.y=c.targetTouches[0].pageY+(a?a.top:0),b.lastTouch.x=c.targetTouches[0].pageX+(a?a.left:0)};h.prototype.touchEndHandler=function(b){var c=b.data;if(c.moveStarted){c.moveStarted=!1;var d=20/h.DECELERATION_RATE,g=c.speed.x,f=c.speed.y,b=(1.71+0.0020*Math.sqrt(Math.pow(d*g,2)+Math.pow(d*f,2)))/h.DECELERATION_RATE*1E3/
1.71,j=0,l=0;c.animation=a({progress:0}).animate({progress:1},{duration:b,easing:"linear",step:function(a){j=c.decelerate(a);c.scrollByDelta(Math.round((j-l)*d*g),Math.round((j-l)*d*f));l=j}})}};h.prototype.decelerate=function(a){return(1-a)*(1-a)*(1-a)*0+3*(1-a)*(1-a)*a*1+3*(1-a)*a*a*1+a*a*a*1};h.prototype.scrollByDelta=function(a,b){this.scrollTo(h.SCALE*(this.scrollOffset.x+a),h.SCALE*(this.scrollOffset.y+b));h.LOCK_X||(this.speed.x=0.75*a*h.SCALE);h.LOCK_Y||(this.speed.y=0.75*b*h.SCALE)};h.prototype.scrollTop=
function(){return this.scrollOffset.y};h.prototype.scrollLeft=function(){return this.scrollOffset.x};h.prototype.scrollHeight=function(){return this.htmlWrapper.outerHeight()};h.prototype.scrollWidth=function(){return this.htmlWrapper.outerWidth()};h.prototype.scrollTo=function(a,b){h.LOCK_X||(this.scrollOffset.x=Math.min(Math.max(0,a),Math.max(0,this.scrollWidth()-window.innerWidth)));h.LOCK_Y||(this.scrollOffset.y=Math.min(Math.max(0,b),Math.max(0,this.scrollHeight()-window.innerHeight)));this.speed.x=
this.speed.y=0;f.css({top:(h.LOCK_Y?0:-this.scrollOffset.y)+"px",left:(h.LOCK_X?0:-this.scrollOffset.x)+"px"});this.onScrollFn(0,this.scrollOffset.y)};var l=function(){var a=this;this.updateCallbacks=[];this.STANDARD_PROVIDER=new j(this,function(b,c){a.onScroll(b,c)});this.WEBKIT_PROVIDER=new h(this,function(b,c){a.onScroll(b,c)});this.provider=this.getProvider();this.provider.activate()};l.prototype.onScroll=function(a,b){for(var c=0,d=this.updateCallbacks.length;c<d;c++)this.updateCallbacks[c](a,
b)};l.prototype.getProvider=function(){if(this.WEBKIT_PROVIDER.available())return this.WEBKIT_PROVIDER;return this.STANDARD_PROVIDER};l.prototype.registerUpdateCallback=function(a){this.updateCallbacks.push(a)};l.prototype.isStandard=function(){return this.STANDARD_PROVIDER===this.getProvider()};l.prototype.scrollTop=function(){return this.provider.scrollTop()};l.prototype.scrollLeft=function(){return this.provider.scrollLeft()};l.prototype.scrollTo=function(a,b){this.provider.scrollTo(a,b)};l.prototype.scrollHeight=
function(){return this.provider.scrollHeight()};l.prototype.scrollWidth=function(){return this.provider.scrollWidth()};c.ready(function(){var a=b.data("scrollEffectsService"),c=new l;c.registerUpdateCallback(function(b,c){a.onUpdate(b,c)});b.data("scrollWrapper",c);c.onScroll(c.scrollLeft(),c.scrollTop())})})(jQuery);
;(function(){if(!("undefined"==typeof Muse||"undefined"==typeof Muse.assets)){var a=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1}(Muse.assets.required,"jquery.scrolleffects.js");if(-1!=a){Muse.assets.required.splice(a,1);for(var a=document.getElementsByTagName("meta"),b=0,c=a.length;b<c;b++){var d=a[b];if("generator"==d.getAttribute("name")){"2015.0.2.310"!=d.getAttribute("content")&&Muse.assets.outOfDate.push("jquery.scrolleffects.js");break}}}}})();
