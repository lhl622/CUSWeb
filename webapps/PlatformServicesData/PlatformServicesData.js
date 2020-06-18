define("DS/PlatformServicesData/Geovia",["UWA/Core","UWA/Class",],function(a,b){var c=b.singleton({get3DPlayProvider:function(d){return"GEOVIA"}});return c});define("DS/PlatformServicesData/OnePart",["UWA/Core","UWA/Class"],function(b,c){var a=c.singleton({getActions:function(f){if(UWA.is(f)&&UWA.is(f.models,"array")){var d="DS/SNResultUX_karma_tst/onePartActions/CompareManager";require([d],function(j){var n=[];var h={actions:[],status:"success"};var i=j.getNbObjectsToCompare({widget_id:f.widget_id});if(f.models.length===1){var l=j.isAlreadyAdded({widget_id:f.widget_id,id:f.models[0].get("id")});h.actions.push({id:f.models[0].get("id"),actions:[{title:"View default configuration",icon:"attributes",id:"view-default-config",multisel:false,sourcejs:"DS/SNResultUX_karma_tst/onePartActions/ConfigViewer"}]});h.actions[0].actions.push({title:"View all configurations",icon:"view-small-tile",id:"view-all-configs",multisel:false,sourcejs:"DS/SNResultUX_karma_tst/onePartActions/ConfigViewer"});if(l){h.actions[0].actions.push({title:"Remove from Compare",icon:"compare-delete",id:"remove-from-compare",multisel:true,sourcejs:"DS/SNResultUX_karma_tst/onePartActions/AddRemoveCompare"})}else{h.actions[0].actions.push({title:"Add to Compare",icon:"compare-add",id:"add-to-compare",multisel:true,sourcejs:"DS/SNResultUX_karma_tst/onePartActions/AddRemoveCompare"})}if(i>0){var k=true;if(i===1&&l){k=false}if(k){h.actions[0].actions.push({title:"Launch Compare",icon:"compare-on",id:"start-compare",multisel:true,sourcejs:"DS/SNResultUX_karma_tst/onePartActions/Compare"})}}f.onComplete.call(undefined,h)}else{for(var g=0;g<f.models.length;g++){h.actions.push({id:f.models[g].get("id"),actions:[{title:"Add to Compare",icon:"compare-add",id:"add-to-compare",multisel:true,sourcejs:"DS/SNResultUX_karma_tst/onePartActions/AddRemoveCompare"}]});h.actions[g].actions.push({title:"Remove from Compare",icon:"compare-delete",id:"remove-from-compare",multisel:true,sourcejs:"DS/SNResultUX_karma_tst/onePartActions/AddRemoveCompare"});h.actions[g].actions.push({title:"Launch Compare",icon:"compare-on",id:"start-compare",multisel:true,sourcejs:"DS/SNResultUX_karma_tst/onePartActions/Compare"})}f.onComplete.call(undefined,h)}})}},is3DPlayAvailable:function(d){if(UWA.is(d)&&UWA.is(d.onComplete,"function")){d.onComplete.call(undefined,{availability:true})}},get3DPlayOptions:function(g){if(UWA.is(g)&&UWA.is(g.onComplete,"function")&&UWA.is(g.onFailure,"function")){var f=g.model;var i=g.defaultPlayOptions;if(UWA.is(f)&&UWA.is(i)){if(UWA.is(i.input)&&UWA.is(i.input.asset)){i.input.asset.provider="FILE";i.input.asset.serverurl=g.serviceURL;i.input.asset.physicalid=f.id;i.input.asset.dtype=f.get("ds6w:type_value");i.input.asset.requiredAuth="passport";i.input.asset.requestsOptions={authentication:"passport"};i.input.asset.filename="/fetch/RAW/application/part/?&source=consolidation-cs_onepart&uri="+encodeURIComponent(f.get("ds6w:source_value"));console.log("play3DOptions.input.asset.filename = "+i.input.asset.filename);var h=f.get("ds6w:label");console.log("modelLabel = "+h);if(UWA.is(h,"string")){var d=h.indexOf(".");if(d>=0){var j=h.substring(d+1,h.length);if(UWA.is(j)){i.input.asset.format=j;console.log("play3DOptions.input.asset.format = "+j)}}}}g.onComplete.call(undefined,i)}}},getFacets:function(d){if(UWA.is(d)&&UWA.is(d.constants)){if(UWA.is(d.setFacets,"function")){var f=[d.constants.FACET_PROPERTIES];d.setFacets.call(undefined,f)}}}});return a});define("DS/PlatformServicesData/3DSpacePreviewLoader",["UWA/Core","UWA/Class","UWA/Promise","UWA/Class/Debug","DS/WAFData/WAFData","DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices","text!DS/PlatformServicesData/assets/Response.json"],function(g,i,f,c,a,h,b){var d=i.singleton(c,{getPreviewPath:function(j){if(g.is(j)){return"/resources/SNAPI/search_preview_delegation/preview?tenant="+j}console.error("platformID not found!")},get3DSpaceServiceURL:function(j){return new f(function(l,k){h.getServiceUrl({serviceName:"3DSpace",platformId:j,onComplete:function(m){l(m)},onFailure:function(m){k(m)}})})},getRequestBody:function(j){var l=[];var m={};l[0]={id:j.searchmodel.id,type:j.searchmodel.getType(),source:j.searchmodel.getSourceID()};var k={appName:"",objects:l,platformId:j.searchmodel.getPlatformID(),applicativeInfo:{}};return k},getPreviewModules:function(j){var l=j.searchmodel.getPlatformID();var k=this;return k.get3DSpaceServiceURL(l).then(function(m){return m+k.getPreviewPath(l)}).then(function(m){console.log("In last url::"+m);return new Promise(function(o,n){a.authenticatedRequest(m,{method:"POST",headers:{"Content-Type":"application/json"},data:JSON.stringify(k.getRequestBody(j)),onComplete:function(p){console.log("Handler Info (From server):"+p);p=JSON.parse(p);if(g.is(p,"array")&&g.is(p.length)&&g.is(p[0]["status"])&&g.equals(p[0]["status"]["result"],"failure")){var q=p[0]["status"]["message"];console.log(q);n(new Error(q))}else{o(p)}},onFailure:function(p){console.log("Failed to fetch the preview handler!");console.log("Error: "+p);n(new Error(e))},onTimeout:function(){console.log("Timeout occurred while fatching the preview handler!");n(new Error("Timeout occurred!"))}})})})},});return d});define("DS/PlatformServicesData/PreviewProxy",["UWA/Core","UWA/Class/Debug","DS/SNInfraUX/SearchPreviewContainer","DS/PlatformServicesData/3DSpacePreviewLoader"],function(f,c,a,d){var b=a.extend({_response:{},init:function(g){this._parent(g)},getPrimaryContent:function(g){if(!f.is(g)||!f.is(g.searchmodel)){return}var i=this;var h=[];if(f.is(i._response,"array")&&f.is(i._response.length)&&f.is(i._response[0]["primary-handler"])){h.push(i._response[0]["primary-handler"]);require(h,function(k){console.log("Primary preview handler loaded successfully!");var j=new k();if(f.is(j.getPrimaryContent,"function")){j.getPrimaryContent(g)}},function(j){console.log("Error occurred while loading primary preview handler, going for default treatment");require(["DS/SNResultUX/views/3DSpacePreview"],function(l){var k=new l();if(f.is(k.getPrimaryContent,"function")){k.getPrimaryContent(g)}})})}else{console.log("Response is not valid or doesn't contain primary preview handler. Considering default treatment.");require(["DS/SNResultUX/views/3DSpacePreview"],function(k){var j=new k();if(f.is(j.getPrimaryContent,"function")){j.getPrimaryContent(g)}})}},getSecondaryContent:function(g){if(!f.is(g)||!f.is(g.searchmodel)){return}var j=this;var i=this._parent;var h=[];if(f.is(j._response,"array")&&f.is(j._response.length)&&f.is(j._response[0]["secondary-handler"])){h.push(j._response[0]["secondary-handler"]);require(h,function(l){console.log("Secondary preview handler loaded successfully!");var k=new l();k.getSecondaryContent(g)},function(k){console.log("Failed to load secondary preview handler!");i(g)})}else{console.log("Response is not valid / doesn't contains secondary preview handler. Considering default treatment.");i(g)}},setPreviewModule:function(g){var h=this;return d.getPreviewModules(g).then(function(i){h._response=i},function(i){console.log(i);throw i})}});return b});define("DS/PlatformServicesData/3DSpace",["UWA/Core","UWA/Class","UWA/Promise","UWA/Class/Debug","DS/SNInfraUX/SearchSettings","DS/SNInfraUX/SearchUtils","DS/SNInfraUX/ServiceDelegationLoader","DS/WAFData/WAFData","DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices","text!DS/PlatformServicesData/assets/3DSpace.json","i18n!DS/SNResultUX/assets/nls/SNResultUX.json","DS/PlatformServicesData/3DSpacePreviewLoader","DS/PlatformServicesData/PreviewProxy"],function(m,n,k,j,g,i,h,l,a,b,o,c,f){var d=n.singleton(j,{_3DSpaceDefaultPreview:null,_previewServices:null,_previewObject:{},init:function(){this._3DSpaceDefaultPreview=null;this._previewServices=JSON.parse(b)},getActionsPath:function(p){if(UWA.is(p)&&UWA.is(p.platformID)){return"/resources/SNAPI/search_delegation/actions?tenant="+p.platformID}else{throw ("INVALID inputs for getActionsPath, platformID is missing")}},getActions:function(y){if(UWA.is(y)&&UWA.is(y.models,"array")&&UWA.is(y.data,"object")){var p=function(z){for(var A=0;A<y.models.length;A++){if(y.models[A].get("id")===z){return y.models[A]}}};var x=function(B,A,z){if(UWA.is(B.cmdInfo,"object")){if(UWA.is(B.cmdInfo.type,"string")){B.cmdInfo.type=[B.cmdInfo.type]}if(UWA.is(z,"array")){B.cmdInfo.type=B.cmdInfo.type.concat(z)}else{if(UWA.is(z,"string")){B.cmdInfo.type.push(z)}}}};var v=false;var q=y.models;for(var r=0;r<q.length;r++){var u=q[r];if(UWA.is(u.isAShowOnlyObject,"function")){if(true==u.isAShowOnlyObject()){v=true;break}}}if(false==v){var s={};s.method="POST";s.headers=y.headers||{};s.headers["Content-Type"]="application/json";s.url=y.serviceURL+this.getActionsPath({platformID:y.data.platformId});y.data.applicativeInfo.addOpenWith=false;if(y.models.length===1){if(g.getOption("add_open_with")){y.data.applicativeInfo.addOpenWith=true}else{var w=y.data.applicativeInfo;if(UWA.is(w,"object")&&UWA.is(w.clientAppInfo,"object")){if(UWA.is(w.clientAppInfo.addinmode,"string")&&w.clientAppInfo.addinmode.length>0){y.data.applicativeInfo.addOpenWith=true}}}}if(y.data.objects.length===y.models.length){for(var r=0;r<y.data.objects.length;r++){y.data.objects[r]["isRecentObject"]=y.models[r].isARecentSearchResult()}}s.data=JSON.stringify(y.data);s.onComplete=function(B){var E=m.is(B,"string")?(B.length>0?JSON.parse(B):{}):B;if(true===y.data.applicativeInfo.addOpenWith){if(UWA.is(E.actions,"array")){for(var D=0;D<E.actions.length;D++){var C=E.actions[D];if(UWA.is(C,"object")){var z=C.id;var F=p(z);if(UWA.is(F)&&!F.isARecentSearchResult()){var G=F.get("ds6w:kind_value");if(UWA.is(G)){if(UWA.is(C.actions,"array")){for(var H=0;H<C.actions.length;H++){var A=C.actions[H];if(A.id==="3DCompass_#OpenWith"){x(A,F,G);break}}}}}}}}}if(UWA.is(y.onComplete,"function")){y.onComplete.call(undefined,E)}};s.onFailure=function(z){if(UWA.is(y.onFailure,"function")){y.onFailure.call(undefined,{type:"web_service_failure",error:z})}};l.authenticatedRequest(s.url,s)}else{var t={};if(UWA.is(y.onComplete,"function")){y.onComplete.call(undefined,t)}}}},is3DPlayAvailable:function(s){var q=function(v){s.onComplete.call(undefined,{availability:v})};if(UWA.is(s)&&UWA.is(s.onComplete,"function")){var r=s.model;if(UWA.is(r)){var p=false;if(UWA.is(r.isAShowOnlyObject,"function")){p=r.isAShowOnlyObject()}if(false==p){var t=r.get("ds6w:type_value");var u="DS/3DPlaySupport/AssetSupport";require([u],function(w){var v={provider:"EV6",tenant:r.getPlatformID(),type:r.get("ds6w:type_value"),requiredAuth:"passport",requestsOptions:{authentication:"passport"}};var x={usage:"preview"};w.checkSupport(v,x,function(y){if(y===true){q(true)}else{q(false)}})})}else{q(false)}}else{q(false)}}},get3DPlayOptions:function(q){if(UWA.is(q)&&UWA.is(q.onComplete,"function")&&UWA.is(q.onFailure,"function")){var p=q.model;var t=q.defaultPlayOptions;if(UWA.is(p)&&UWA.is(t)&&UWA.is(q.serviceURL,"string")){if(UWA.is(t.input)&&UWA.is(t.input.asset)){var r=p.get("ds6w:type_value");t.input.asset.provider="EV6";t.input.asset.serverurl=q.serviceURL;t.input.asset.tenant=p.getPlatformID();t.input.asset.physicalid=p.id;t.input.asset.dtype=r;t.input.asset.requiredAuth="passport";t.input.asset.requestsOptions={authentication:"passport"};if(m.is(t.options)&&m.is(t.options.loading)){if(r==="VPMReference"||r==="PLMProductDS"){t.options.loading="onclick";var s=document.createElement("div",{styles:{"background-image":"url("+p._attributes.preview_url+")","background-size":"contain","background-position":"center","background-repeat":"no-repeat",height:"100%","background-color":"white"}});t.options.splashscreen={custom:s}}}q.onComplete.call(undefined,t)}}}},getSubjectURLPrefix:function(p){return"pid://"},getFacets:function(s){var r=this;if(UWA.is(s)&&UWA.is(s.model)&&UWA.is(s.constants)){if(UWA.is(s.setFacets,"function")&&UWA.is(s.addFacets,"function")){if(g.getOption("search_web_in_win")){if(UWA.is(s.setContext,"function")){s.setContext.call(undefined,{getSecurityContext:function(){return{SecurityContext:i.getSecurityContext()}}})}}this._getAvailableRoles({platformID:s.model.getPlatformID(),onComplete:function(u){if(u.indexOf("PAR")>=0){if(UWA.is(s.setReadOnly,"function")){s.setReadOnly.call(undefined,false)}}var v=[s.constants.FACET_PROPERTIES];var t=[{text:o.get("section.properties.title"),name:s.constants.FACET_PROPERTIES,icon:"attributes",expandedFlag:true}];s.setFacets.call(undefined,v,t)}});var p=false;if(UWA.is(s.model.isAShowOnlyObject,"function")){p=s.model.isAShowOnlyObject()}if(p===false){var q="DS/ENORIPE_Relations/RelationsTabSettings";require([q],function(u){var t={appID:"X3DSEAR_AP",isDraggable:true,addinmode:g.getOption("addinmode"),lockedApp:g.getOption("lockedapp")};u.isAvailable(s.model,t).then(function(v){if(UWA.is(v,"object")&&UWA.is(v.facetInfo)){var w=[{text:v.facetInfo.text,name:v.facetInfo.name,icon:v.facetInfo.icon,expandedFlag:false,height:"450px"}];s.addFacets([v.facetInfo],w)}else{r.log("facets info is NOT in good format")}},function(){r.log("this facet is not available for this context = "+u)})},function(t){console.warn("Cannot load "+t.requireModules)})}}}},getRelations:function(r){if(UWA.is(r,"object")){var q=r.model;if(UWA.is(q,"object")&&UWA.is(r.onComplete,"function")){var p={parents:[],children:[],drawings:[],simulations:[],configurations:[]};var s=q.getPlatformID();a.getServiceUrl({serviceName:q.getServiceID(),platformId:s,onComplete:function(t){var u="preview-8cae85";l.authenticatedRequest(t+"/resources/enorelnav/navigate/setpreferences?tenant="+s,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",data:JSON.stringify({widgetId:u,relations:["v6_structure_to","v6_structure_from","v6_drawing_from","simulation_from"],countmanagement:false}),onComplete:function(){l.authenticatedRequest(t+"/resources/enorelnav/navigate/getecosystem?tenant="+s,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",data:JSON.stringify({widgetId:u,ids:[q.get("id")]}),onComplete:function(){var v={widgetId:u,id:q.get("id"),debug:false};l.authenticatedRequest(t+"/resources/enorelnav/navigate/detail?tenant="+s,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",data:JSON.stringify(v),onComplete:function(x){var y=JSON.parse(x);if(UWA.is(y.newstructure)){var z=function(C,A){var B=function(D){var E=" ";for(var F=0;F<D.length;F++){E+=D[F]["ds6w:label"]+", "}return E};console.log(C+":"+A.length+B(A))};var w=function(A){var B=[];for(var C=0;C<A.length;C++){B.push(A[C].id)}return B};if(UWA.is(y.newstructure.v6_structure_from,"array")){z("Parents",y.newstructure.v6_structure_from);p.parents=w(y.newstructure.v6_structure_from)}if(UWA.is(y.newstructure.v6_structure_to,"array")){z("Children",y.newstructure.v6_structure_to);p.children=w(y.newstructure.v6_structure_to)}if(UWA.is(y.newstructure.v6_drawing_from,"array")){z("Drawings",y.newstructure.v6_drawing_from);p.drawings=w(y.newstructure.v6_drawing_from)}if(UWA.is(y.newstructure.simulation_from,"array")){z("Simulations",y.newstructure.simulation_from);p.simulations=w(y.newstructure.simulation_from)}p.model=q;r.onComplete.call(undefined,p)}},onFailure:function(w){console.log(w);if(UWA.is(r.onFailure,"function")){r.onFailure.call(undefined,p)}},onTimeout:function(w){console.log(w);if(UWA.is(r.onFailure,"function")){r.onFailure.call(undefined,p)}}})},onFailure:function(v){console.log(v);if(UWA.is(r.onFailure,"function")){r.onFailure.call(undefined,p)}},onTimeout:function(v){console.log(v);if(UWA.is(r.onFailure,"function")){r.onFailure.call(undefined,p)}}})},onFailure:function(v){console.log(v);if(UWA.is(r.onFailure,"function")){r.onFailure.call(undefined,p)}},onTimeout:function(v){console.log(v);if(UWA.is(r.onFailure,"function")){r.onFailure.call(undefined,p)}}})},onFailure:function(t){console.log(t);if(UWA.is(r.onFailure,"function")){r.onFailure.call(undefined,p)}}})}}},getDoubleClickAction:function(q){if(UWA.is(q,"object")&&UWA.is(q.model)&&UWA.is(q.appID)){if("X3DSEAR_AP"===q.appID){var p=q.model.get("ds6w:type_value");if("SavedSearch"===p){q.onComplete.call(undefined,{id:"run_saved_search",sourceJS:"DS/SNResultUX/savedSearch/SavedSearch_ActionHandler"})}else{q.onFailure.call(undefined,"no action available for double click on object of type "+p)}}}},_getAvailableRoles:function(p){if(UWA.is(p)&&UWA.is(p.platformID)&&UWA.is(p.onComplete,"function")){i.getGrantedRoles(function(r){var s=[];for(var q=0;q<r.length;q++){var t=r[q];if(UWA.is(t)&&UWA.is(t.platforms,"array")){if(t.platforms.length===0||t.platforms.indexOf(p.platformID)>=0){s.push(t.id)}}}p.onComplete.call(undefined,s)})}},getRenderPreview:function(x){if(!UWA.is(x)||!UWA.is(x.searchmodel)||!UWA.is(x.onComplete,"function")){return}var r=this;var v=function(y){var z=["DS/SNResultUX/views/3DSpacePreview"];require(z,function(A){r._3DSpaceDefaultPreview=new A();y.onComplete.call(undefined,r._3DSpaceDefaultPreview)})};if(g.getOption("activate3DSpacePreviewDelegation")){var w=new f();w.setPreviewModule(x).then(function(){x.onComplete.call(undefined,w)},function(y){v(x)});return}if(UWA.is(r._previewServices)){var q=r._previewServices.previewTypeSources;if(UWA.is(q)){var t=x.searchmodel.get("ds6w:type_value");var p="3DSpace_"+t;var u=q[p];if(UWA.is(u)){var s=r._previewObject[p];if(UWA.is(s)){x.onComplete.call(undefined,s)}else{h.load({servicesData:q,serviceID:p,platformID:x.searchmodel.getPlatformID()}).then(function(z){var y=new z();x.onComplete.call(undefined,y);r._previewObject[p]=y},function(y){console.log("OLD::Error in loading service delegation");if(r._3DSpaceDefaultPreview===null){v(x)}else{x.onComplete.call(undefined,r._3DSpaceDefaultPreview)}})}}else{console.log("OLD:: Not present in JSON file");if(r._3DSpaceDefaultPreview===null){v(x)}else{x.onComplete.call(undefined,r._3DSpaceDefaultPreview)}}}}}});return d});