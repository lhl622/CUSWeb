define("DS/XCTInfWebApplication/XCTInfWebApplication",[],function(){});define("DS/XCTInfWebApplication/XCTFactory",["UWA/Core","UWA/Class","UWA/Class/Promise"],function(d,c,b){var a=c.extend({init:function(e){this._applicationBase=e.applicationBase;this._dictionary={}},loadDictionary:function(h){var e=b.deferred();var f=Object.keys(h);var g=f.map(function(i){return h[i]});require(g,function(){for(var j=0;j<arguments.length;j++){h[f[j]]=arguments[j]}d.extend(this._dictionary,h);e.resolve()}.bind(this));return e.promise},build:function(f){if(this._dictionary.hasOwnProperty(f)){var e=new this._dictionary[f];e._applicationBase=this._applicationBase;return e}return undefined}});return a});define("DS/XCTInfWebApplication/XCTApplicationBase",["UWA/Core","UWA/Class","DS/CoreEvents/Events","DS/XCTInfWebApplication/XCTFactory"],function(f,e,c,b){var d={};var a=e.extend({init:function(g){this.app=g.app;this.config=g.config;this.factory=new b({applicationBase:this,dictionary:this.getConfig().dictionary});this.factory.loadDictionary(this.getConfig().dictionary).then(function(){this.registerManagers(this.getConfig().managers);this.initializeManagers();c.publish({event:"ApplicationBase:ready",data:this})}.bind(this))},registerManagers:function(g){Object.keys(g).forEach(function(h){this.registerManager(g[h],{shortName:h})}.bind(this))},initializeManagers:function(){var g=Object.keys(d);g.forEach(function(h){d[h].preInitialize()});g.forEach(function(h){d[h].initialize()});g.forEach(function(h){d[h].postInitialize()})},registerManager:function(h,g){if(!d.hasOwnProperty(h)){d[h]=this.factory.build(h);if(g.shortName){this["get"+g.shortName]=function(){return d[h]}}}return d[h]},getManager:function(g){return this.managers[g]},getConfig:function(){return this.config}});return a});