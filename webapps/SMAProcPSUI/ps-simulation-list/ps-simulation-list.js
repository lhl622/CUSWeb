(function(J){var x=J.console,V,W,g,l,H,k,o,Q,D,U,f,G,r,t,A,b,j,K,v,N,F,e,E,y,u,M,B,z,m,n,R,C,S,L,d,s,O={},i=20,I,w=0,q=0,P=0,p,c=false,a,T;var h={listReady:"listready"};R={currDate:"",timeSpan:{index:0,value:7,choices:[7,30,60,90,180,365,730,1460,2920,5840,11680]},totalSimIds:0,totalSims:0,equalSimCounter:0,reset:function(){this.equalSimCounter=0;this.timeSpan.index=0;this.timeSpan.value=R.timeSpan.choices[R.timeSpan.index];this.currDate=L(R.timeSpan.value)}};L=function(Z){var Y=new Date();var X=Y.getTime()-(Z*24*60*60*1000);Y.setTime(X);return(Y.getMonth()+1)+"/"+Y.getDate()+"/"+Y.getFullYear()};Q=function(X){return new Promise(function(aa,Z){if(appData.environments===undefined){appData.environments=X}if(X.length>1){for(var Y=0;Y<X.length;Y++){if(J.getTopWindow().location.href.contains(X[Y].cstorage.slice(0,X[Y].cstorage.indexOf(":443")))){appData.platformId=X[Y].id;break}}aa(true)}else{if(X.length===1){appData.platformId=X[0].id;aa(true)}else{Z("Failed to get WA platform information")}}})};o=function(){J.DS.SMAProcSP.SPVariableHelper.ready.call(this);this.refreshedData={};if(this.$.dashboard.isInDashboard()){var aa=J.widget||{getValue:function Z(){if(J.console&&J.console.warn){J.console.warn("ps-simulation-list: stubbing missing widget.getValue()")}}};this.$.simAbstractList.setSettingValue(this.LOCALSTORAGE_KEY.simOwner,aa.getValue("filter"));this.$.simAbstractList.setSettingValue(this.LOCALSTORAGE_KEY.maxSimsListed,parseInt(aa.getValue("limit")))}var Y=this;var ab=function(af){if(!J.widget){if(af){var ak=af.split(/\n/)[0].split(/=/)[1].split(/,/);var aj=ak.filter(function(am,an){return ak.indexOf(am)===an});if(aj.length>1){var ag=[];var ai=document.createElement("option");var ae=document.getElementById("platformSelector");if(document.getElementById("platformSelectorDiv").classList.contains("hidde")){document.getElementById("platformSelectorDiv").classList.remove("hidde");document.getElementById("platformSelectorDiv").classList.add("settingSection")}for(var ah=0;ah<aj.length;ah++){ai.text=ai.value=aj[ah];if(ai.value.contains(appData.platformId)){appData.WUPlatformId=ai.value;ai.setAttribute("selected","selected")}ag.push(ai.outerHTML)}ae.insertAdjacentHTML("beforeEnd",ag.join("\n"))}else{if(aj.length===1){appData.WUPlatformId=aj[0];document.getElementById("platformSelectorDiv").classList.add("hidde")}}if(appData.platformId!=="OnPremise"){if(document.getElementById("platformDiv").classList.contains("hidde")){document.getElementById("platformDiv").classList.remove("hidde");document.getElementById("platformDiv").classList.add("settingSection")}var ai=document.createElement("option");ai.text=ai.value=appData.platformId;ai.setAttribute("selected","selected");var al=document.getElementById("platform");al.add(ai);al.disabled=true}}}};var X=function(ae){x.log(ae)};require(["DS/WAFData/WAFData"],function(ae){Y.$.dashboard.getPlatforms().then(Q).then(Y.$.dashboard.fetchMyappsUri.bind(Y.$.dashboard)).then(function(af){ae.authenticatedRequest(af+"/resources/AppsMngt/licenses/whereused",{type:"text/plain",onComplete:ab,onError:X});ae.authenticatedRequest(af+"/resources/AppsMngt/api/pull/self",{type:"json",onComplete:function(ag){Y.self=ag;appData.self=ag},onError:function(ag){x.log(ag)}})})["catch"](function(af){x.log(af)})}).bind(Y);var ac=this.$.simAbstractList.getSettingValue(this.LOCALSTORAGE_KEY.maxSimsListed);if(ac){this.set("settings.maxSims",ac)}var ad=this.$.simAbstractList.getSettingValue(this.LOCALSTORAGE_KEY.simOwner);if(ad){this.set("settings.simOwner",ad)}this.simlist=[];R.reset();this.$.simidlistWS.getData();c=true;J.top.addEventListener("message",y.bind(this),false);this.addEventListener("jobStarted",function(ae){this.$.simAbstractList.runNext()}.bind(this))};y=function(Y){var X;if(this.sidebarmode==="simList"){try{X=JSON.parse(Y.data)}catch(Z){X={}}if(X.operation==="copy"||X.operation==="revise"){Y.stopPropagation();this.activeitemid=X.physicalId;this.onRefresh()}if(X.operation==="Instantiate"||(Y.data.id&&Y.data.check)){Y.stopPropagation();this.onRefresh()}}};W=function(Y,aa){var Z,ab,X;Z=this.simidlist.map(function(ac){return ac.id});aa.sort(function(ad,ac){if(Y){ab=ad.id;X=ac.id}else{ab=ad;X=ac}if(Z.indexOf(ab)<Z.indexOf(X)){return -1}else{if(Z.indexOf(ab)>Z.indexOf(X)){return 1}else{return 0}}});return aa};D=function(){this.$.maxSimInput.value=this.settings.maxSims;this.$.ownerSetting.selectedindex=this.settings.simOwner===this.SIM_OWNER.all?1:0;this.$.listSettings.show()};l=function(){var X;X=this.simlist.length;c=false;this.activeitemindex=this._getActiveItemIndex();this.activeitemid=this.activeitemindex>this.settings.maxSims-1?null:this.activeitemid;X>this.settings.maxSims&&this.splice("simlist",this.settings.maxSims);if(!a.isActive()&&X<this.settings.maxSims){g.call(this,5)}this.$.simidlistWS.getData()};p={hasError:false,maxSimWarning:false,maxSimChanged:false,simOwnerChanged:false,reset:function(){this.hasError=false;this.maxSimWarning=false;this.maxSimChanged=false;this.simOwnerChanged=false}};U=function(X){if(p.hasError){X.preventDefault();X.stopPropagation();X.stopImmediatePropagation();X.isDefaultPrevented=true;return false}else{this.listSettingsEditState="is-completed";if(p.simOwnerChanged){this.simlist=[];this.activeitem=null;this.activeitemid=null;g.call(this,0);this.$.simidlistWS.getData();this.asyncFire("showEmptyPlaceholder",true)}else{if(p.maxSimChanged){l.call(this)}}p.reset();this.$.listSettings.hide()}};M=function(Y){var X=Y.toString();if(Y&&!isNaN(Y)&&Y>0&&X.match(/^\d+$/)){this.$.maxSimInput.haserror=false;this.$.validInputWarning.visible=false;this.$.listsettingbutton.disabled=false;this.DOM(this.$.maxSimLabel).removeClass(this.STATE.error);p.hasError=false;if(Y>500&&!p.maxSimWarning){this.$.maxSimInputWarning.visible=true;p.maxSimWarning=true}else{this.$.maxSimInputWarning.visible=false}if(this.settings.maxSims!==Y){this.$.simAbstractList.setSettingValue(this.LOCALSTORAGE_KEY.maxSimsListed,Y);this.set("settings.maxSims",Y);p.maxSimChanged=true;this.listSettingsEditState="is-updating";setTimeout(function(){this.listSettingsEditState="is-completed"}.bind(this),2000)}}else{this.$.maxSimInputWarning.visible=false;this.DOM(this.$.maxSimLabel).addClass(this.STATE.error);this.$.maxSimInputWarning.visible=false;this.$.validInputWarning.visible=true;this.$.maxSimInput.haserror=true;p.hasError=true;this.$.listsettingbutton.disabled=true}};G=function(){var X;X=Number(this.$.maxSimInput.value);M.call(this,X)};u=function(Y){var X=false;if(this.settings.simOwner!==Y){X=true;this.$.simAbstractList.setSettingValue(this.LOCALSTORAGE_KEY.simOwner,Y);this.set("settings.simOwner",Y);p.simOwnerChanged=true}return X};r=function(){var Y,X=false;this.resetMultiSelect();Y=Number(this.$.ownerSetting.selectedindex)===1?this.SIM_OWNER.all:this.SIM_OWNER.owned;X=u.call(this,Y);if(X){this.listSettingsEditState="is-updating";setTimeout(function(){this.listSettingsEditState="is-completed"}.bind(this),2000)}};f=function(){this.$.listSettings.hide();this.$.maxSimInput.value=null;this.$.maxSimInput.haserror=false;this.DOM(this.$.maxSimLabel).removeClass(this.STATE.error);this.$.maxSimInputWarning.visible=false};b=function(Y){var X,Z=[];this.set("refreshedData.$state","is-getting");X=Y.detail;if(!a.isActive()){Z=this.simidlist.slice(this.simlist.length,this.simlist.length+20);X.verb="POST";X.payload=JSON.stringify(Z.map(function(aa){return aa.id}));X.payload.length<1&&X.abort()}else{if(a.isActive()){X.verb="POST";JSON.parse(a.simIdsForNextRequest()).length===0&&a.updateDataRequestRange.call(this);X.payload=a.simIdsForNextRequest();X.payload.length<1&&X.abort()}}};s=function(){var Y=Polymer.dom(this.$.list).querySelector(".listWrapper"),Z=true;if(Y){var X=this.$.list.clientHeight,aa=Y.offsetHeight;if((X)>(aa*this.simlist.length)){Z=false}}return Z};j=function(X){var ae,af,ab,Y,ac,aa,Z;this.set("refreshedData.$state","is-completed");ae=JSON.parse(X.response);af=this.simlist;Y=af.length;if(!af.length){this.simlist=ae}else{for(Z=ae.length-1;Z>-1;Z-=1){if(ae[Z].error===undefined){Z=Z+1;break}}ae=ae.slice(0,Z);ae.forEach(function(ag){for(ab=Y-1;ab>=0;ab-=1){if(af[ab]&&ag.id===af[ab].id){af.splice(ab,1);break}}});this.simlist=this.JS.merge(af,ae,true);W.call(this,true,this.simlist)}Array.prototype.forEach.call(this.simlist,function(ag){if(this.activeitemid===ag.id){this.activeitem=ag}}.bind(this));if(this.simlist.length===this.settings.maxSims){this.DOM(this.$.listupdatepanel).removeClass(this.STATE.active);this.$.endoflistInfo.visible=true}else{this.$.endoflistInfo.visible=false}if(a.isActive()){a.updateDataRequestRange.call(this)}if(this.$.dashboard.isInDashboard()){ac=Polymer.dom(this.$.list).querySelectorAll("ps-simulation-item");for(ab=0;ab<ac.length;ab+=1){k.call(this,ac[ab])}setTimeout(function(){ac=Polymer.dom(this.$.list).querySelectorAll("ps-simulation-item");for(aa=0;aa<ac.length;aa+=1){H.call(this,ac[aa])}}.bind(this),1000)}var ad=s.call(this);if((!ad&&(this.simlist.length<this.simidlist.length))&&!a.isActive()){this.$.simlistWS.sendRequest({uri:this.$.simlistWS.$.dashboard.getMcsUri()+"/resources/slmservices/simulations/filter",verb:"POST",onComplete:this.onIncrementalDataready.bind(this)})}};H=function(Y){var X={},Z={};require(["DS/DataDragAndDrop/DataDragAndDrop"],function(aa){X.data={protocol:"3DXContent",version:"0.1",source:"SIMDISB_AP",data:{items:[]}};Z.objectId=Y.simitem.id;Z.objectType="Simulation";Z.displayType="Simulation Process";Z.contextId=this.$.dashboard.getSecurityContext();Z.displayName=Y.simitem.attributes.title;Z.objectData=Y.simitem;if(J.widget){Z.envId=J.widget.getValue("x3dPlatformId")}X.data.data.items[0]=Z;X.data=JSON.stringify(X.data);X.stop=function(ab){if(!Polymer.dom(ab).classList.contains("is-selected")){ab.click()}};aa.draggable(Y,X)}.bind(this))};k=function(X){require(["DS/DataDragAndDrop/DataDragAndDrop"],function(Y){Y.clean(X)})};O={fromIndex:0,toIndex:0,completedFromIndex:null,completedToIndex:null,completedIndex:[],completedAllItems:true,forActiveItem:false};v=function(X){var ac,ad,ae,ab=false,Z,Y,af;this.set("refreshedData.$state","is-completed");if(!(this.simlist&&this.simlist.splice)){x.log("ps-simulation-list: onRefreshDataready: simlist is not an array");this.simlist=[]}var aa=JSON.parse(X.response);ac=aa&&aa.forEach?aa:[];ac.forEach(function(ah,ag){this.splice("simlist",ag+O.fromIndex,1,ah);O.completedIndex[ag+O.fromIndex]=true;af=ag}.bind(this));Z=this.simlist.length;if(Z&&c){this.asyncFire("showEmptyPlaceholder",false)}Y=this.simidlist.length;if(Z>Y){this.splice("simlist",Y,Z)}this.activeitemindex=this._getActiveItemIndex();if(this.activeitemindex>-1){if(this.activeitemindex>=O.fromIndex&&this.activeitemindex<=O.toIndex){C=true}else{C=false}}else{C=false}Array.prototype.forEach.call(this.simlist,function(ag){if(C){if(this.activeitemid===ag.id){ab=true;C=false;this.activeitem=ag}}}.bind(this));O.completedAllItems=true;for(ad=0;ad<Z;ad+=1){if(!O.completedIndex[ad]){O.completedAllItems=false;break}}O.completedFromIndex=O.completedFromIndex===null||O.completedFromIndex>O.fromIndex?O.fromIndex:O.completedFromIndex;O.completedToIndex=O.completedToIndex===null||O.completedToIndex<O.toIndex?O.toIndex:O.completedToIndex;if(O.forActiveItem){O.forActiveItem=false;this.$.list.scrollTop=0}if(C&&!ab&&O.fromIndex>0){O.toIndex=O.fromIndex<i?O.fromIndex-1:i;O.fromIndex=0;this.$.simlistRefreshWS.getData();C=false;O.forActiveItem=true}else{this.isrefreshing=false;setTimeout(function(){var ag=s.call(this);if(!a.isActive()){if(!ag&&this.simlist.length<this.simidlist.length&&this.refreshedData.$state!=="is-getting"){this.onVerticalScroll()}}}.bind(this),2000)}if(this.$.dashboard.isInDashboard()){ae=Polymer.dom(this.$.list).querySelectorAll("ps-simulation-item");for(ad=0;ad<ae.length;ad+=1){k.call(this,ae[ad])}setTimeout(function(){ae=Polymer.dom(this.$.list).querySelectorAll("ps-simulation-item");for(ad=0;ad<ae.length;ad+=1){H.call(this,ae[ad])}}.bind(this),1000)}};K=function(){this.isrefreshing=true;O.completedAllItems=false;O.completedIndex=[];O.completedFromIndex=O.completedToIndex=null;c=false;this.resetMultiSelect();if(!a.isActive()){V.call(this);this.activeitemindex=this._getActiveItemIndex();if(this.activeitemindex>-1){if(this.activeitemindex>=O.fromIndex&&this.activeitemindex<=O.toIndex){C=true}else{C=false}}else{C=false}}this.$.simidlistWS.getData();a.isActive()&&a.updateToRefreshMode();this.asyncFire("event-manager",{name:"list-refreshed"})};V=function(){if(!Polymer.dom(this.$.list).querySelector("ps-simulation-item")){O.fromIndex=0;O.toIndex=19;return}S=Polymer.dom(this.$.list).querySelector("ps-simulation-item").offsetHeight;P=Math.round(q/S);if(P<=i/2){O.fromIndex=0;O.toIndex=i-1}else{if(P>=this.settings.maxSims-i/2){O.fromIndex=this.settings.maxSims-i/2;O.toIndex=this.settings.maxSims-1}else{O.fromIndex=P-i/2;O.toIndex=P+i/2-1;O.toIndex=O.toIndex>this.settings.maxSims-1?this.settings.maxSims-1:O.toIndex}}O.fromIndex=O.fromIndex<5?0:O.fromIndex;O.toIndex=O.toIndex>this.settings.maxSims-5?this.settings.maxSims-1:O.toIndex};N=function(aa){var Y=aa.detail,X=[],Z=[];this.set("refreshedData.$state","is-getting");if(a.isActive()){Y.verb="POST";Z=a.filteredIds().slice(O.fromIndex,O.toIndex+1);Y.payload=JSON.stringify(Z)}if(!a.isActive()){V.call(this);Y.verb="POST";X=this.simidlist&&this.simidlist.map?this.simidlist.map(function(ab){return ab.id}):[];Z=X.slice(O.fromIndex,O.toIndex+1);Y.payload=JSON.stringify(Z)}R.totalSims=X.length;this.isrefreshing=true;if(this.JS.isConsoleAvailable()&&this.JS.isInDebug()){(function(ab){x.group("-----------DEBUG--STATEMENT-----------"+ab.JS.generateDebugId());x.debug("Context");x.log(ab);x.debug("Info");x.log("Refresh fromindex "+O.fromIndex+" toindex "+O.toIndex);x.groupEnd()}(this,J))}};g=function(X){if(this.simlist.length>0){S=Polymer.dom(this.$.list).querySelector("ps-simulation-item").offsetHeight;I=X*S}else{I=0}};E=function(){var Z,ac,Y,aa,X,ab;if(!I){Z=5;g.call(this,Z)}q=this.$.list.scrollTop;Z=i;var ad=s.call(this);if((!ad||(q>I))&&this.simlist.length<this.settings.maxSims){if(this.simlist.length<this.simidlist.length){w+=1;I+=Z*S;this.DOM(this.$.listupdatepanel).addClass(this.STATE.active);this.$.simlistWS.sendRequest({uri:this.$.simlistWS.$.dashboard.getMcsUri()+"/resources/slmservices/simulations/filter",verb:"POST",onComplete:this.onIncrementalDataready.bind(this)})}}if(!this.isrefreshing&&!O.completedAllItems){ac=Polymer.dom(this.$.list).querySelectorAll("ps-simulation-item")[O.completedFromIndex];if(ac){aa=ac.getBoundingClientRect().top}Y=Polymer.dom(this.$.list).querySelectorAll("ps-simulation-item")[O.completedToIndex];if(Y){X=Y.getBoundingClientRect().bottom}ab=this.$.list.getBoundingClientRect();if(aa>=ab.top||X<=ab.bottom){if(aa>=ab.top){O.toIndex=O.fromIndex-1;O.fromIndex=O.toIndex-i<0?0:O.toIndex-i}if(X<=ab.bottom){O.fromIndex=O.toIndex+1;O.toIndex=O.fromIndex+i>this.settings.maxSims-1?this.settings.maxSims-1:O.fromIndex+i}O.fromIndex=O.fromIndex<5?0:O.fromIndex;O.toIndex=O.toIndex>this.settings.maxSims-5?this.settings.maxSims-1:O.toIndex;if(O.fromIndex>=O.completedFromIndex&&O.toIndex<=O.completedToIndex){return}O.toIndex=O.fromIndex<O.completedFromIndex&&O.toIndex<=O.completedToIndex?O.completedFromIndex:O.toIndex;O.fromIndex=O.toIndex>O.completedToIndex&&O.fromIndex>O.completedFromIndex?O.completedToIndex:O.fromIndex;this.isrefreshing=true;this.$.simlistRefreshWS.sendRequest({uri:this.$.simlistRefreshWS.$.dashboard.getMcsUri()+"/resources/slmservices/simulations/filter",verb:"POST",onComplete:v.bind(this)})}}};n=function(){var X="";X="One of the job is either Running, Waiting or Paused.";document.getElementById("errorMessageID").innerHTML=X;this.$.errorModal.show()};m=function(Y){var X="";X=Y.model.item.message;document.getElementById("errorMessageID").innerHTML=X;this.$.errorModal.show()};F=function(aa){var Z,ac,Y;Z=aa.detail;Y=0;ac=this.settings.maxSims-1;var X=this.settings.simOwner===this.SIM_OWNER.owned?this.SIM_OWNER.owned:this.SIM_OWNER.all;Z.uri=this.$.mcsBaseURL.getValue()+"/resources/slmservices/simulations?fields=id&sort=lastModified&simulationKind=*";if(X===this.SIM_OWNER.owned){Z.uri=Z.uri+"&ownedSimulations=true"}else{var ab=new Date();ab.setDate(ab.getDate()+1);Z.uri=Z.uri+"&before="+(ab.getMonth()+1)+"/"+ab.getDate()+"/"+ab.getFullYear();Z.uri=Z.uri+"&after="+R.currDate}Z.uri=Z.uri+"&range="+Y+"-"+ac};e=function(){var X=this.settings.simOwner===this.SIM_OWNER.owned?this.SIM_OWNER.owned:this.SIM_OWNER.all;if((X!==this.SIM_OWNER.owned)&&this.simidlist&&(this.simidlist.length<=this.settings.maxSims)){if(this.simidlist.length!==0&&R.totalSimIds===this.simidlist.length){R.equalSimCounter=R.equalSimCounter+1}R.totalSimIds=this.simidlist.length;if(R.equalSimCounter<2){R.timeSpan.index=R.timeSpan.index+1;if(R.timeSpan.index<R.timeSpan.choices.length){R.timeSpan.value=R.timeSpan.choices[R.timeSpan.index];R.currDate=L(R.timeSpan.value);this.$.simidlistWS.getData()}}}if(this.settings.simOwner===this.SIM_OWNER.owned){var aa=document.getElementById("simcontent");aa&&aa.classList.remove("is-active")}var Z=J.emxUIConstants?J.emxUIConstants.STR_QUERY_TYPE:null;a.refresh.call(this,this.simidlist);var Y=this.simidlist&&this.simidlist.map?this.simidlist.map(function(ab){return ab.id}):[];if(Y.length>0){this.$.emptyMessage.classList.remove("show");this.$.emptyMessage.textContent="";if(this.refreshedData.$state!=="is-getting"||(R.totalSims<20&&(this.simidlist.length>R.totalSims))){this.$.simlistRefreshWS.sendRequest({uri:this.$.simlistRefreshWS.$.dashboard.getMcsUri()+"/resources/slmservices/simulations/filter",verb:"POST",data:JSON.stringify(Y),onComplete:v.bind(this),onError:function(ab){if(ab.status===403){require(["DS/WAFData/WAFData"],function(ac){ac.authenticatedRequest(appData.environments[0].search+"/login?tenant="+appData.platformId,{headers:{"Content-Type":"application/json"},method:"GET",onComplete:function(){this.$.simlistRefreshWS.sendRequest({uri:this.$.simlistRefreshWS.$.dashboard.getMcsUri()+"/resources/slmservices/simulations/filter",verb:"POST",data:JSON.stringify(Y),onComplete:v.bind(this),onError:function(ad){reject(new Error(ad))}})}.bind(this),onError:function(ad){reject(new Error(ad))}})}.bind(this))}}.bind(this)})}}else{this.$.emptyMessage.classList.add("show");this.$.emptyMessage.textContent="No Simulation to Display"}d.call(this,h.listReady,{})};d=function(X,Y){if(this[X]!==true){this.fire(X,Y);this[X]=true}};a=function(){var Z,Y=[],aj,aa,ak,af="load",ag,X,ac,ad,ah,al,ai,ae,ab;aa=[];ak=false;aj=[];ag=[];al=function(am){Z=true;this.$.pstagger.filtercallback=X.bind(this);this.$.pstagger.init(am)};T=function(am){Y.length=0;if(!Z){al.call(this,am)}else{this.$.pstagger.refresh(am)}};X=function(aq){var ax=[],aw=false,au,an=[],ar,am,at=[];if(aq){for(au=0;au<aq.filteredSubjectList.length;au+=1){var ap=aq.filteredSubjectList[au];at[au]=ap.replace("pid://","")}if(af==="load"&&at.join()===aa.join()){return}this.activeitemid=null;aa=at;aa=W.call(this,false,aa);if(af==="refresh"){aa=at;V.call(this);var ao=function(){this.set("refreshedData.$state","is-completed")}.bind(this);this.$.simlistRefreshWS.getData(ao);af="load";return}if(Y.length===0){aw=false;Y=this.simlist.slice(0)}else{aw=true;Y.forEach(function(ay){an.push(ay.id)});this.simlist.forEach(function(ay){au=an.indexOf(ay.id);if(au<0){Y.push(ay)}else{Y[au]=ay}});Y=W.call(this,true,Y)}if(Object.getOwnPropertyNames(aq.allfilters).length>0){ak=true;this.simlist=Y.filter(function(ay){if(aa.indexOf(ay.id)>=0){ax.push(ay.id);return true}})}else{if(ak){if(aw){this.simlist=Y.slice(0)}else{this.simlist=[]}ax=an.slice(0);ak=false}}aj=aa.filter(function(ay){if(ax.indexOf(ay)>=0){return false}return true});am=aj.length;if(am>0){ar=am>i?i:am;ag=JSON.stringify(aj.slice(0,ar));this.$.simlistWS.sendRequest({uri:this.$.simlistWS.$.dashboard.getMcsUri()+"/resources/slmservices/simulations/filter",verb:"POST",onComplete:j.bind(this)})}if(this.$.dashboard.isInDashboard()){var av=Polymer.dom(this.$.list).querySelectorAll("ps-simulation-item");for(au=0;au<av.length;au+=1){k.call(this,av[au])}setTimeout(function(){var az=Polymer.dom(this.$.list).querySelectorAll("ps-simulation-item");for(var ay=0;ay<az.length;ay+=1){H.call(this,az[ay])}}.bind(this),1000)}}};ah=function(){return ag};ad=function(){return aa};ac=function(){return ak};ai=function(an){var ap,ao,am;ao=this.simidlist.length;for(am=0;am<ao;am+=1){if(this.simidlist[am].id===an){ap=am;break}}this.simidlist.splice(ap,1);ao=Y.length;am=ao-1;while(am>=0){if(Y[am].id===an){Y.splice(am,1);am=-1}am-=1}if(a.isActive()){this.$.pstagger.idlist=this.simidlist;a.refresh.call(this,this.simidlist)}};ae=function(){var am,an;am=this.simlist.map(function(ao){return ao.id});aj=aa.filter(function(ao){return am.indexOf(ao)<0});an=aj.length>i?i:aj.length;ag=JSON.stringify(aj.slice(0,an))};ab=function(){af="refresh"};return{isActive:ac,filteredIds:ad,simIdsForNextRequest:ah,handleDelete:ai,refresh:T,updateDataRequestRange:ae,updateToRefreshMode:ab}}.call(this);T=function(){K.call(this)};t=function(){if(this.selecteditems&&this.selecteditems.length>0){var X=[];this.selecteditems.forEach(function(Y){X.push("pid://"+Y.id)});if(this.$.pstagger.proxy){this.$.pstagger.proxy.focusOnSubjects(X)}}else{if(this.selecteditems&&this.selecteditems.length===0){if(this.$.pstagger.proxy){this.$.pstagger.proxy.unfocus()}}}};A=function(){if(this.sidebarmode==="simList"){if(this.activeitemid){if(this.simlist&&this.simlist.length>0){this.simlist.forEach(function(X){if(this.activeitemid===X.id){this.activeitem=X}}.bind(this))}}else{this.activeitem=null}}};B=function(Z,X){var Y=X!==undefined?X:this.activeitemindex;this.set("simlist."+Y+".latestExecution.eedJobId",Z.eedJobId);this.set("simlist."+Y+".latestExecution.id",Z.objectId);this.set("simlist."+Y+".latestExecution.state",Z.status)};z=function(X){this.set("simlist."+this.activeitemindex+".attributes.description",X.description);this.set("simlist."+this.activeitemindex+".attributes.title",X.title);this.set("simlist."+this.activeitemindex+".attributes.Simulation Study",X["Simulation Study"])};Polymer({is:"ps-simulation-list",behaviors:[J.DS.SMAProcSP.SPBase,J.DS.SMAProcSP.SPVariableHelper,J.DS.SMAProcPSUI.simAbstractListBehavior],Tagger:a,properties:{activeitem:{type:Object,notify:true},activeitemid:{value:null},activeitemindex:{type:Number,notify:true},isrefreshing:{type:Boolean,value:false,notify:true},listSettingsEditState:{type:String,value:"is-completed"},selecteditems:{type:Array,value:function(){return[]},observer:"selecteditemsChanged",notify:true},sidebarmode:{notify:true,observer:"sidebarmodeChanged"},simidlist:{type:Array,value:function(){return[]},notify:true},simlist:{type:Array,value:function(){return[]},notify:true},simulationFactory:{notify:true}},observers:["selecteditemsChanged(selecteditems.splices)"],selecteditemsChanged:t,sidebarmodeChanged:A,onDisplaySettings:D,onSettingsChange:U,onSettingsMaxsimChange:G,onSettingsOwnerChange:r,onSettingsCancel:f,onIncrementalDatareq:b,onIncrementalDataready:j,onRefresh:K,onRefreshDataready:v,onRefreshReq:N,onSimidListReq:F,onSimidListReady:e,onVerticalScroll:E,detailedErrorMsg:m,raFailedMsg:n,getWATenantsInfo:Q,onSimulationDeleted:function(X){var Y=X.detail.deletedItemId;if(Y===this.activeitemid){this.activeitemid=null;this.activeitem=null}this.Tagger.handleDelete.call(this,X.detail)},addDragEvent:H,removeDragEvent:k,setOwner:u,updateJobDetails:B,updateAttributes:z,setMaxSimulations:M,sortSim:W,updateSimlistLimit:l,refresh:T,attached:function(){this.async(function(){o.apply(this,arguments)})},_computeMessage:function(X){return"Displaying a maximum of "+X+" simulations.Change list setting preferences or search to view more simulations."},_computeDataActiveindex:function(Y,X){return X.id===Y},_computeClass:function(Y,X){return"simItem "+this.tokenList({"is-selected":X.id===Y})},setWUTenant:function(){appData.WUPlatformId=this.$.platformSelector.options[this.$.platformSelector.options.selectedIndex].value}})}(this));