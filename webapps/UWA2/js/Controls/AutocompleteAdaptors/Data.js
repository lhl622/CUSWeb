define("UWA/Controls/AutocompleteAdaptors/Data",["UWA/Core","UWA/Controls/AutocompleteAdaptors/Abstract","UWA/Json","UWA/Data","UWA/String","UWA/Promise"],function(g,c,a,b,e,d){var f;f=c.extend({options:{url:null,dataParser:null,format:"{name}",minLength:1},dataCache:null,init:function(h){this._parent(h);this.dataCache={}},getSuggestions:function(k){var h,j=this,i=j.dataCache;return new d(function(m,l){if(k.length>=j.options.minLength){if(i[k]){m(i[k])}else{if(j.options.url){h=j.options.url.replace("{text}",k);b.request(h,{method:"GET",type:"text",onComplete:function(n){n=j.dataParse(n);if(n.length>0){i[k]=n}m(n)},onFailure:l,onTimeout:l})}}}else{m([])}})},renderSuggestion:function(i){var h=i.fullValue;return this.options.format.replace(/\{(\w+)\}/g,function(j,k){return e.escapeHTML(i[k]||h)})},dataParse:function(j){var l,h,i,k=this.options.dataParser;if(g.is(k,"function")){j=k(j)}else{if(a.isJson(j)){j=a.decode(j);i=true}else{j=a.xmlToJson(j);for(l in j){if(j.hasOwnProperty(l)){j=j[l];break}}}for(l in j){if(j.hasOwnProperty(l)){if(!h){h=l}if(Array.isArray(j[l])){j=j[l];i=true;break}}}if(!i&&h){j=[j[h]]}}return Array.isArray(j)?j:[]}});return g.namespace("Controls/AutocompleteAdaptors/Data",f,g)});