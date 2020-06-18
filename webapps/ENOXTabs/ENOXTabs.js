define("DS/ENOXTabs/js/ENOXTabs",["DS/CoreEvents/ModelEvents","UWA/Class/View","UWA/Class/Model","UWA/Drivers/Alone","DS/W3DXComponents/IdCard","DS/Handlebars/Handlebars","text!DS/ENOXTabs/html/ENOXTabComponent.html","css!DS/ENOXTabs/css/ENOXTabComponent.css","css!DS/UIKIT/UIKIT.css"],function(c,a,d,f,h,b,i,e,j){var g=b.compile(i);var k=a.extend({name:"page-sidebar-view",className:function(){return this.getClassNames("-container")},tagName:"div",init:function(m){var p=this;m.title=m.title?m.title:null;m.description=m.description?m.description:null;m.date=m.date?m.date:null;m.ownerName=m.ownerName?m.ownerName:null;m.tabs=m.tabs?m.tabs:[];m.lazyRendering=m.lazyRendering?m.lazyRendering:false;m.initialSelectedIndex=m.initialSelectedIndex?m.initialSelectedIndex:0;m.initialSelectedIndex=m.initialSelectedIndex>=m.tabs.length?0:m.initialSelectedIndex;p._options=m;p._doms={};this._listSubscription=[];for(var n in m){this[n]=m[n]}this._parent(m);this.container.setHTML(g(m));this._initializeEvents(m);this._idCard=null;this._initializeIdCard(m);p._currentIndex=m.initialSelectedIndex;var o;if(m.lazyRendering){o=this.container.querySelector(".sidebar-tab-content.tab-"+m.initialSelectedIndex);m.tabs[m.initialSelectedIndex].content(o);m.tabs[m.initialSelectedIndex].rendered=true;o.classList.add("active")}else{var l=0;for(l=0;l<m.tabs.length;l+=1){o=this.container.querySelector(".sidebar-tab-content.tab-"+l);m.tabs[l].content(o);m.tabs[l].rendered=true}this.container.querySelector(".sidebar-tab-content.tab-"+m.initialSelectedIndex).classList.add("active")}this._idCard.selectFacet(m.initialSelectedIndex);this._startSubscribingEvents(m)},setup:function(l){},render:function(o){var l=this;var n=0;if(this._options.title){n+=38}if(this._options.ownerName||this._options.date){n+=20}if(this._options.description){n+=21}var m=this.container.querySelector(".id-card").classList.contains("without-facets")?true:false;if(!m){n+=42}this.container.querySelector(".sidebar-body").style.height="calc(100% - "+n+"px)";this.container.querySelector(".sidebar-nav").style.height=n+"px";return this},_hideHeader:function(){this.container.querySelector(".sidebar-body").style.height="100%";this.container.querySelector(".sidebar-nav").classList.add("height0");this.container.querySelector(".sidebar-nav").style.height="0px"},_showHeader:function(){this.container.querySelector(".sidebar-nav").classList.remove("height0");this.render()},_changeTab:function(m,l){if(m===l){return}var o=this;var n=this.container.querySelectorAll(".sidebar-tab-content");Array.prototype.map.call(n,function(r){r.classList.remove("active")});var p=this.container.querySelector(".sidebar-tab-content.tab-"+m);if(o._options.lazyRendering){o._doms[l]=(this.container.querySelector(".sidebar-tab-content.tab-"+l)).cloneNode(true);var q=this.container.querySelector(".sidebar-tab-content.tab-"+l);while(q.firstChild){q.removeChild(q.firstChild)}if(!o._options.tabs[m].rendered){o._options.tabs[m].content(p);o._options.tabs[m].rendered=true}else{p.appendChild(o._doms[m].firstChild)}}p.classList.add("active");o._modelEvent.publish({event:"right-side-bar-tab-changed",data:{idx:m}})},getCurrentIndex:function(){return this._currentIndex},_initializeIdCard:function(m){var p=this;var o=d.extend({});var r=m.title;var n=new o({title:r,description:m.description,date:m.date,ownerName:m.ownerName});var q=[];var l=0;for(l=0;l<m.tabs.length;l+=1){var s={};s.text=m.tabs[l].text;s.icon=m.tabs[l].fonticon;s.id=m.tabs[l].id;s.handler=function(){p._modelEvent.publish({event:"right-side-bar-tab-change",data:{idx:this.getSelectedFacet(),add:"internal"}})};q.push(s)}this._idCard=new h({model:n,actions:[],facets:q});this._idCard.inject(this.container.getElement(".sidebar-nav"));if(!m.title&&this.container.querySelector(".header-section")){this.container.querySelector(".header-section").classList.add("displaynone")}if(!m.ownerName&&!m.date&&this.container.querySelector(".owner-name-section")){this.container.querySelector(".owner-name-section").classList.add("displaynone")}if(!m.description&&this.container.querySelector(".description-section")){this.container.querySelector(".description-section").classList.add("displaynone")}},_initializeEvents:function(l){var m=this;if(!l.modelEvents){this._modelEvent=new c()}else{this._modelEvent=l.modelEvents}},_startSubscribingEvents:function(l){var m=this;this._listSubscription.push(this._modelEvent.subscribe({event:"right-side-show-header"},function(){m._showHeader()}));this._listSubscription.push(this._modelEvent.subscribe({event:"right-side-hide-header"},function(){m._hideHeader()}));this._listSubscription.push(this._modelEvent.subscribe({event:"right-side-bar-toggle"},function(){m._toggleDisplay()}));this._listSubscription.push(this._modelEvent.subscribe({event:"right-side-bar-show"},function(){m._show()}));this._listSubscription.push(this._modelEvent.subscribe({event:"right-side-bar-tab-change"},function(n){if(n.add&&n.add==="internal"){}else{m._idCard.selectFacet(n.idx)}m._changeTab(n.idx,m._currentIndex);m._currentIndex=n.idx}));this._listSubscription.push(this._modelEvent.subscribe({event:"right-side-bar-tab-content-change"},function(o){var n=m.container.querySelector(".sidebar-tab-content.tab-"+o.idx);if(n){n.innerHTML="";n.appendChild(o.content)}}));this._listSubscription.push(this._modelEvent.subscribe({event:"right-side-bar-title-change"},function(n){m._options.title=n;m.container.querySelector(".header-section").classList.remove("displaynone");m.container.querySelector(".header-section").querySelector(".title-section").querySelector("h1").querySelector("span").innerHTML=n;m.render()}));this._listSubscription.push(this._modelEvent.subscribe({event:"right-side-bar-top-change"},function(n){m._options.title=n.title?n.title:m._options.title;m._options.date=n.date?n.date:m._options.date;m._options.ownerName=n.ownerName?n.ownerName:m._options.date;m.container.querySelector(".header-section").classList.remove("displaynone");m.container.querySelector(".header-section").querySelector(".title-section").querySelector("h1").querySelector("span").innerHTML=m._options.title;m.container.querySelector(".id-card").querySelector(".info-section").querySelector(".detailed-info-section").querySelector(".text-primary").innerHTML=m._options.ownerName;m.container.querySelector(".id-card").querySelector(".info-section").querySelector(".detailed-info-section").querySelector(".text-muted").innerHTML=m._options.date}));this._listSubscription.push(this._modelEvent.subscribe({event:"right-side-bar-clear-top"},function(){m._options.title="";m._options.date="";m._options.ownerName="";m.container.querySelector(".header-section").classList.remove("displaynone");m.container.querySelector(".header-section").querySelector(".title-section").querySelector("h1").querySelector("span").innerHTML=" ";m.container.querySelector(".id-card").querySelector(".info-section").querySelector(".detailed-info-section").querySelector(".text-primary").innerHTML=" ";m.container.querySelector(".id-card").querySelector(".info-section").querySelector(".detailed-info-section").querySelector(".text-muted").innerHTML=" "}));this._listSubscription.push(this._modelEvent.subscribe({event:"tab-title-change"},function(n){if(n){var o=n.tabTitle;var q=m._idCard.getOption("facets");if(UWA.is(q,"array")){q.forEach(function(r){if(r.id==n.tabId){r.text=o}});var p=m._idCard.options;p.facets=q;m._idCard.options=p;m._idCard.render()}}}))},_hide:function(){this.container.classList.add("displaynone");this.container.querySelector(".sidebar-element").classList.add("displaynone");this._modelEvent.publish({event:"right-side-bar-hidden"})},_show:function(){this.container.classList.remove("displaynone");this.container.querySelector(".sidebar-element").classList.remove("displaynone");this._modelEvent.publish({event:"right-side-bar-visible"})},_toggleDisplay:function(){this.container.classList.contains("displaynone")?this._show():this._hide()},destroy:function(){var m=0;var l=this._listSubscription.length;for(m=0;m<l;m++){this._modelEvent.unsubscribe(this._listSubscription[m])}this._parent()}});return k});