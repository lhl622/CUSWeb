define("DS/WAfrAppManager/App",["UWA/Core","UWA/Class","UWA/Class/Promise","DS/WAfrContainer/App"],function(e,a,b,d){var c=function(f){d.call(this,f);this._frmWindow=undefined;this._disposeCalled=false;this._executionContext=undefined};d.inherits(c);c.prototype.onWillEnter=function(f){return b.resolve()};c.prototype.setUp=function(f){return b.resolve()};c.prototype.dispose=function(f){};c.inherits=function(f){f.prototype=Object.create(c.prototype,{constructor:{value:f,enumerable:false}})};c.Extend=function(){var f=function(g){c.call(this,g)};c.inherits(f);return f};return c});