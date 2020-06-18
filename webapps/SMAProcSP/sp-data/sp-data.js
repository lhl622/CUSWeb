(function(b){var f,a,e,c,d;a={DATA_CHANGE:"datachange",UPDATE:"update",CREATE:"create",DESTROY:"destroy",MODEL_READY:"modelready",UPDATE_COMPLETE:"updatecomplete"};e={UPDATE:0,CREATE:1,DELETE:2};c={DELETING:"is-deleting",UPDATING:"is-updating",CREATING:"is-creating",GETTING:"is-getting",FAILING:"is-failing",ABORTING:"is-aborting",NULL:""};d=[c.DELETING,c.UPDATING,c.CREATING,c.GETTING,c.FAILING,c.ABORTING,c.NULL];f=(function(){var k,l,j,h,i;function g(n){return n&&typeof(n)==="object"&&!n.forEach}function m(n){return n&&typeof(n)==="object"&&!!n.forEach}l=function(n){this.listener=n};l.MUTATION_TYPE={add:"add",update:"update","delete":"delete"};l.prototype.create=function(n){if(!n._$observable&&m(n)){n=new i(n,this)}else{if(!n._$observable&&g(n)){n=new h(n,this)}}return n};j=function(o,n){this.setProp("factory",n);this.setProp("_$observable",this,o);this.setProp("setValue",this.setValue,o)};j.prototype.createObservable=function(n){return(n!==null&&n!==undefined)?this.factory.create(n):n};j.prototype.watchProp=function(q,p,n){n=n||this;var o=new k(n,p,this.factory.listener);Object.defineProperty(n,q,o)};j.prototype.setProp=function(p,o,n){n=n||this;Object.defineProperty(n,p,{value:o,enumerable:false,writable:true})};j.prototype.invokeListener=function(){return this.factory.listener&&this.factory.listener.apply(this,arguments)};j.prototype.setValue=function(n,o){o=this._$observable.createObservable(o);this._$observable.watchProp(n,o,this);this._$observable.invokeListener(l.MUTATION_TYPE.add,o);return o};i=function(n){j.apply(this,arguments);n.forEach(function(p,o){p=this.createObservable(p);this.watchProp(o,p,n)},this);Object.defineProperty(n,"push",{value:function(o){n._$observable.invokeListener(l.MUTATION_TYPE.add,o);o=n._$observable.createObservable(o);[].push.call(n,o);n._$observable.watchProp(n.length-1,o,n)},enumerable:false});Object.defineProperty(n,"pop",{value:function(){[].pop.call(n);n._$observable.invokeListener(l.MUTATION_TYPE["delete"])},enumerable:false});return n};i.prototype.push=function(n){n=this.createObservable(n);this.invokeListener(l.MUTATION_TYPE.add,n);return this.item.apply(this.item,arguments)};i.prototype=Object.create(j.prototype);i.prototype.constructor=i;h=function(n){j.apply(this,arguments);Object.keys(n).forEach(function(o){this.watchProp(o,this.createObservable(n[o]),n)},this);return n};h.prototype=Object.create(j.prototype);h.prototype.constructor=h;k=function(n,p,o){this._listener=o;this._value=p;this.enumerable=true;this.set=function(r){var q=this._value;if(r!==this._value){this._value=n._$observable.factory.create(r);this._listener.call(n,l.MUTATION_TYPE.update,r,q)}return this._value}.bind(this);this.get=function(){return this._value}.bind(this)};return l}());b.Polymer({is:"sp-data",properties:{model:{type:Object,value:null,notify:true,observer:"_modelChanged"},observechanges:{type:Boolean,value:false,notify:true},uid:{type:String,value:"id"}},refresh:function(){this._modelChanged()},_modelChanged:function(){var g,h;if(!this.model||!Object.keys(this.model).length||this.model.$state===c.GETTING){return}g=this;if(this.observechanges){h=new f(function(m,l,j){var i,k=g.model;i={observedOn:this,type:m,newVal:l,oldVal:j,payload:k};g._setProp(g.model,"$state",c.UPDATING);g.model.onUpdate=function(n){g._setProp(g.model,"$state","");g.fire(a.UPDATE_COMPLETE,this)}.bind(this);return g.fire(a.UPDATE,i)});this.model=h.create(this.model)}this.model.create=this._create;this.model.destroy=this._destroy;this.model["delete"]=function(){if(b.console&&b.console.warn){console.warn("sp-data: model.delete is deprecated, please use model.destroy instead")}this.destroy.apply(this,arguments)};if(this.model.forEach){this.model.forEach(function(i){i.destroy=this._destroy},this)}this._provideUpdateProxy(this.model);this.fire(a.MODEL_READY,this.model)},behaviors:[DS.SMAProcSP.SPBase],_provideUpdateProxy:function(g){if(g&&typeof(g)==="object"){g.update=this._update;this._setProp(g,"_$instance",this);Object.keys(g).forEach(function(h){if(typeof(g[h])===typeof({})){this._setProp(g[h],"_$parent",g)}if(h!=="_$parent"){this._provideUpdateProxy(g[h])}},this)}},_setProp:function(h,i,g){if(h){if(h.hasOwnProperty(i)){h[i]=g}else{Object.defineProperty(h,i,{value:g,enumerable:false,writable:true})}if(i==="$state"){this.notifyPath("model.$state",g)}}},_update:function(h,m,k){var j,i,g,l;g=this._$instance;l=this;if(l.hasOwnProperty("_$parent")){while(l._$parent.hasOwnProperty("_$parent")){l=l._$parent}}i=g.model;j={asap:h,payload:i,uid:l[g.uid],child:l};g._setProp(g.model,"$state",c.UPDATING);i.onUpdate=function(n){if(m){m.call(k,n)}g._setProp(g.model,"$state","");g.fire(a.UPDATE_COMPLETE,this)}.bind(this);g.fire(a.UPDATE,j)},_create:function(j,k,i){var h,g;g=this._$instance;j=j||{};g._setProp(g.model,"$state",c.CREATING);h={asap:true,payload:j,uid:this[g.uid]};j.onCreate=function(l){if(k){k.call(i,j,l)}g._setProp(this,"$state","")}.bind(this);g.fire(a.CREATE,h)},_destroy:function(k,i){var h,g,j;g=this._$instance;g._setProp(g.model,"$state",c.DELETING);j=this;if(j.hasOwnProperty("_$parent")){while(j._$parent.hasOwnProperty("_$parent")){j=j._$parent}}h={asap:true,payload:this,uid:j[g.uid]};this.onDestroy=function(l){if(k){k.call(i,l)}g._setProp(g.model,"$state","")};g.fire(a.DESTROY,h)}})}(this));