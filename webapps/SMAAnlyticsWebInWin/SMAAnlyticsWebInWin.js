define("DS/SMAAnlyticsWebInWin/SMAAnalyticsWebInWinWSUtils",["UWA/Core","UWA/Class/Promise","DS/WAFData/WAFData","UWA/Utils","UWA/Class"],function(f,e,a,d,b){var c=b.extend({serverUrl:"",ADVISE_SERVICE_LOC:"/resources/slmservices/advise/",_csrf_header_name:"ENO_CSRF_TOKEN",getCSRFToken:function(){console.log("Inside getCSRF Token");return new e(function(h,g){a.authenticatedRequest(this.serverUrl+"/resources/slmservices/token/CSRF",{type:"text",method:"GET",onComplete:function(i){this._csrf_token=i;h(i)}.bind(this),onFailure:function(i){g(i)}})}.bind(this))},isNotEmpty:function(h,g){if(typeof h!=="undefined"&&h!==null){if(g){return h.length>0}return true}else{return false}},uwaDataRequest_POST:function(k){var o=this;if(!k){return}var h=k.url||"",l=k.params||{},j=k.headers||{},m=k.data||{},r=k.type||"json",p=k.timeout,s=k.addSecContext,g="",n=k.securityContext;authenticatedRequest=!(typeof k.authenticatedRequest!=="undefined"&&k.authenticatedRequest===false);for(var q in l){if(l.hasOwnProperty(q)){g+=q+"="+l[q]+"&"}}if(g.length>1){h+=g.substring(0,g.length-1)}var i=(authenticatedRequest===true)?a.authenticatedRequest:a.request;return new e(function(w,v){var t=function(z,A,y){w(z)};var u=function(y){v(y)};var x={type:r,method:"POST",allowCrossOriginRequest:true,onComplete:t.bind(this),onFailure:u.bind(this)};x.headers=j;x.headers.SecurityContext=n;x.data=m;if(r==="json"){x.data=JSON.stringify(x.data)}if(p){x.timeout=p}o.getCSRFToken().then(function(){x.headers[this._csrf_header_name]=this._csrf_token;console.log(x);i(h,x)}.bind(o),v)}.bind(o))},uwaDataRequest_GET:function(k){var o=this;if(!k){return}var h=k.url||"",l=k.params||{},j=k.headers,m=k.data||{},r=k.type||"json",p=k.timeout,g=k.cache||-1,n=k.securityContext;authenticatedRequest=!(typeof k.authenticatedRequest!=="undefined"&&k.authenticatedRequest===false);for(var q in l){if(l.hasOwnProperty(q)){m[q]=l[q]}}if(h.indexOf("?")>-1){h+="&"}else{h+="?"}h+="SecurityContext="+encodeURIComponent(n);var i=(authenticatedRequest===true)?a.authenticatedRequest:a.request;return new e(function(t,s){var u={type:r,method:"GET",allowCrossOriginRequest:true,cache:g,onComplete:t,onFailure:s};if(j){u.headers=j}if(m){u.data=m}if(p){u.timeout=p}i(h,u)})},});return c.prototype});define("DS/SMAAnlyticsWebInWin/SMAAnalyticsCloseInteractiveSession",["UWA/Class/Promise","DS/WAFData/WAFData","UWA/Utils","UWA/Class","DS/SMAAnalyticsUI/SMAAnalyticsProxy"],function(e,b,d,c,f){var a=c.extend({handleMessage:function(g){f.endInteractiveSession()}});return a.prototype});define("DS/SMAAnlyticsWebInWin/SMAAnalyticsConnectDatasets",["DS/SMAAnlyticsWebInWin/SMAAnalyticsWebInWinWSUtils","UWA/Class/Promise","DS/WAFData/WAFData","UWA/Utils","UWA/Class"],function(f,e,a,d,b){var c=b.extend({handleMessage:function(g){console.log("Inside conenct DataSets"+g);this.connectDatasetsToCase(g).then(function(h){console.log("Connection successful"+h)},function(h){console.log("Error connecting Datasets"+h)})},connectDatasetsToCase:function(k){var g=k.AnalyticsCaseID;var l=k.DataSetID;console.log("Inside conenct Data Sets to Case");f.serverUrl=k.serverUrl;var m=this,h=f.serverUrl+f.ADVISE_SERVICE_LOC+"connectObjectsToAnalyticsCase",j={caseid:k.AnalyticsCaseID,objectids:k.DataSetID},i=k.isExport;connectDeferred=e.deferred();if(!f.isNotEmpty(g,true)){connectDeferred.reject("No analytics case was provided.")}if(!f.isNotEmpty(l,true)){connectDeferred.reject("No business objects to connect.")}if(i===true){j.relationship="relationship_AnalyticsRecommended"}f.uwaDataRequest_POST({url:h,type:"*/*",data:j,authenticatedRequest:true,securityContext:k.securityCtx}).then(function(n){connectDeferred.resolve(n)},function(n){connectDeferred.reject(n)});return connectDeferred.promise}});return c.prototype});define("DS/SMAAnlyticsWebInWin/SMAAnalyticsGetCaseInfo",["DS/SMAAnlyticsWebInWin/SMAAnalyticsWebInWinWSUtils","UWA/Class/Promise","DS/WAFData/WAFData","UWA/Utils","UWA/Class"],function(f,e,a,d,b){var c=b.extend({handleMessage:function(g){localStorage.setItem("RA_INTERACTIVE_DESIGN",true);console.log("Inside Get Case Info handleMessage Call"+g);this.getCaseInfo(g).then(function(m){console.log("Get Case info successful"+m);var j=new DOMParser();var t=j.parseFromString(m,"text/xml");var h={};var q=t.getElementsByTagName("dataSet");var k=[];for(var n=0;n<q.length;n++){var u={};var s=q.item(n);u.plmOID=s.getAttribute("plmOID");u.physicalID=s.getAttribute("physicalID");u.title=s.getAttribute("title");u.fileName=s.getAttribute("fileName");u.name=s.getAttribute("name");u.dataSetType=s.getAttribute("typeName");k.push(u)}var r=t.getElementsByTagName("Approximation");var p=[];for(var n=0;n<r.length;n++){var o=r.item(n);var l={};l.plmOID=o.getAttribute("plmOID");l.physicalID=o.getAttribute("physicalID");p.push(l)}h.Approximations=p;h.Datasets=k;window.dscef.sendString("downloadCaseData",JSON.stringify(h))},function(h){console.log("Error occured while getting case info"+h)})},getCaseInfo:function(j){var g=j.AnalyticsCaseID;f.serverUrl=j.serverUrl;var i=f.serverUrl+f.ADVISE_SERVICE_LOC+"caseInfo",h={oid:g};connectDeferred=e.deferred();if(!f.isNotEmpty(g,true)){connectDeferred.reject("No analytics case was provided.")}f.uwaDataRequest_GET({url:i,type:"*/*",params:h,authenticatedRequest:true,securityContext:j.securityCtx}).then(function(k){connectDeferred.resolve(k)},function(k){connectDeferred.reject(k)});return connectDeferred.promise}});return c.prototype});