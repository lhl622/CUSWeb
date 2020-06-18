(function(U){var Z=U.Polymer,ad=U.DS;var m=null,f=null,b=null,A=null,ab=null,s=null,w=null,R=null,O=null,x=null,e=null,o=null,D=null,E=null,T=null,S=null,B=null,d=null,I=null,r=null,j=null,af=null,K=null,Q=null,V=null,t=null,z=null,M=null,ae=null,v=null,Y=null,ac=null,a=null,aa=null,L=null,u=null,i=null,l=null,W=null,G=null,g=null,n=null,F=null,k={loading:"loading",error:"error",ready:"ready"},C={uploading:"uploading",in3dx:"in3dx",onDisk:"onDisk",creating:"CREATING",deleting:"deleting"},H={folder:"Simulation Folder",vDocument:"Simulation Document - Versioned",nvDocument:"Simulation Document - NonVersioned",file:"file",fileversion:"fileversion",rdocument:"Document",core_reference:"PLMCoreReference",rep_reference:"PLMCoreRepReference",vpm_reference:"VPMReference",physical_product:"Physical Product",designsight:"DesignSight",physics_simulation:"Physics Simulation"},y="commonFiles",N="BatchInputTable",c={showuploadfiles:"showuploadfiles",inputselect:"inputselect",add3dxcontent:"add3dxcontent",downloadcontent:"downloadcontent",previewcontent:"previewcontent",deletecontent:"deletecontent",switchinputversion:"switchinputversion"},q={showuploadfiles:"showuploadfilescommon",inputselect:"inputselectcommon",add3dxcontent:"add3dxcontent",downloadcontent:"downloadcontent",previewcontent:"previewcontent",deletecontent:"deletecontent",switchinputversion:"switchinputversioncommon"},P={designSight:"DesignSight"},h=[P.designSight,H.core_reference,H.rep_reference,H.vpm_reference,H.physical_product];b=function(ah){var ag=ah.currentTarget.parentNode.parentNode;ah.stopPropagation();ah.cancelBubble=true;this._currentSelection=ah.currentTarget.value;this._currentSelectedNode=ah.currentTarget;ah.currentTarget.getOffsets=function(){var ai=ah.currentTarget.getBoundingClientRect();return{x:ai.left+U.pageXOffset,y:ai.top+U.pageYOffset}};this._inputItemDropDownMenu.options.target=ah.currentTarget;this._inputItemDropDownMenu.enabled=(ag.itemData.status!==C.uploading&&h.indexOf(ag.itemData.type)===-1);if(ag.itemData.referenced||ag.itemData.latestVersionInvalid){this._inputItemDropDownMenu.disableItem(0)}else{this._inputItemDropDownMenu.enableItem(0)}if(ag.itemData.latestVersionInvalid&&!ag.itemData.selectedVersion){this._inputItemDropDownMenu.disableItem(1);this._inputItemDropDownMenu.disableItem(2);this._inputItemDropDownMenu.disableItem(3)}else{this._inputItemDropDownMenu.enableItem(1);this._inputItemDropDownMenu.enableItem(2);this._inputItemDropDownMenu.enableItem(3)}this._inputItemDropDownMenu.updatePosition();this._inputItemDropDownMenu.show()};f=function(ag){ag.stopPropagation();ag.cancelBubble=true;if(this._selectedInputs&&this._selectedInputs.length===0){this._additionalActionsDDMenu.disableItem(0)}else{this._additionalActionsDDMenu.enableItem(0)}};t=function(ag){ag.stopPropagation();ag.cancelBubble=true;this.fire(this.EVENTS.showuploadfiles,{multiple:true,itemId:null})};z=function(ag){ag.stopPropagation();ag.cancelBubble=true;this.fire(this.EVENTS.showuploadfiles,{multiple:false,itemId:this._currentSelectedNode.parentNode.parentNode.itemData.id})};m=function(am){var ai;am.stopPropagation();am.cancelBubble=true;if(am.currentTarget.checked){this.DOM(am.currentTarget.parentNode.parentNode.parentNode).addClass("tr-active");ai=this._selectedInputs.indexOf(am.currentTarget.parentNode.parentNode.parentNode.id);if(ai===-1){this._selectedInputs.push(am.currentTarget.parentNode.parentNode.parentNode.id)}}else{this.DOM(am.currentTarget.parentNode.parentNode.parentNode).removeClass("tr-active");ai=this._selectedInputs.indexOf(am.currentTarget.parentNode.parentNode.parentNode.id);if(ai>-1){this._selectedInputs.splice(ai,1)}document.getElementById("selectAll").checked=false}if(this._selectedInputs.length===0){document.getElementById("selectAll").checked=false}var al=this.$.inputTable.querySelectorAll("tr");var ag=[];for(var aj=1,ah=0;al.length>0&&aj<al.length;aj++){var ak=al[aj].querySelector("input").checked;if(ak){ag.push({id:al[aj].id,iteration:ah});ah++}}this.fire(this.EVENTS.inputselect,{inputs:[am.currentTarget.parentNode.parentNode.parentNode.id],remove:!am.currentTarget.checked,allInputs:ag})};w=function(am){am.stopPropagation();am.cancelBubble=true;this._loadingSpinner.show();var ag=[];var an=Polymer.dom(this.root).querySelectorAll(".inputs-checkbox");[].forEach.call(an,function(ao){if(am.currentTarget.checked&&!ao.children[0].checked&&!ao.children[0].disabled){ao.children[0].checked=true;this.DOM(ao.parentNode.parentNode).addClass("tr-active");ag.push(ao.parentNode.parentNode.id)}else{if(!am.currentTarget.checked&&ao.children[0].checked&&!ao.children[0].disabled){ao.children[0].checked=false;this.DOM(ao.parentNode.parentNode).removeClass("tr-active")}else{if(am.currentTarget.checked&&ao.children[0].checked){ag.push(ao.parentNode.parentNode.id)}else{if(!am.currentTarget.checked&&ao.children[0].checked&&ao.children[0].disabled){ag.push(ao.parentNode.parentNode.id)}}}}}.bind(this));var al=this.$.inputTable.querySelectorAll("tr");var ah=[];for(var aj=1,ai=0;al.length>0&&aj<al.length;aj++){var ak=al[aj].querySelector("input").checked;if(ak){ah.push({id:al[aj].id,iteration:ai});ai++}}this.fire(this.EVENTS.inputselect,{inputs:ag,allInputs:ah});this._selectedInputs=ag;this._loadingSpinner.hide()};x=function(){if(this.getAttribute("tableId")===N){this.$.spSearch.setAttribute("plm-types","Simulation Document - Versioned")}this.$.spSearch.search()};s=function(){if(this.getAttribute("tableId")===N){this.$.spSearch.setAttribute("plm-types","Simulation Document - Versioned")}this.$.spSearch.search()};A=function(ah){var ag=ah.detail.getSelectedObjects();if(ag&&ag.length>0){this.fire(this.EVENTS.add3dxcontent,{input:ag})}};B=function(ag,ah){this._dropDownMenu=new ag({target:this.$.addInputs,items:[{text:ah.FromDisk,fonticon:"upload",handler:t.bind(this)},{text:ah.From3DX,fonticon:"search",handler:x.bind(this)}]})};d=function(ag,ah){this._inputItemDropDownMenu=new ag({items:[{text:ah.Upload,fonticon:"upload",handler:z.bind(this)},{text:ah.Download,fonticon:"download",handler:M.bind(this,false)},{text:ah.DownloadZip,fonticon:"archive",handler:M.bind(this,true)},{text:ah.Preview,fonticon:"eye",handler:ae.bind(this)},{text:ah.Delete,fonticon:"trash",handler:v.bind(this)}]})};I=function(ag,ah){this._additionalActionsDDMenu=new ag({target:this.$.menu,items:[{text:ah.Delete,fonticon:"trash",handler:Y.bind(this)}]})};M=function(ah){var ag=[];ag.push(this._currentSelectedNode.parentNode.parentNode.id);this.fire(this.EVENTS.downloadcontent,{inputs:ag,zip:ah})};ae=function(){var ag=[];ag.push(this._currentSelectedNode.parentNode.parentNode.id);this.fire(this.EVENTS.previewcontent,{inputs:ag})};v=function(){this.fire(this.EVENTS.deletecontent,{items:[this._currentSelectedNode.parentNode.parentNode.id]})};Y=function(){this.fire(this.EVENTS.deletecontent,{items:this._selectedInputs})};r=function(ag){ag.stopPropagation();ag.cancelBubble=true;if(this._inputItemDropDownMenu){this._inputItemDropDownMenu.hide()}};K=function(ag){return ag.key==="title"||ag.key==="modified"||ag.key==="size"||ag.key==="filetype"};var J=function(ai,aj,ah){var ag=document.createElement("span");if(ai[ah]===C.uploading){if(ai.uploadPerc){ag.className="upload-perc";ag.textContent=ai.uploadPerc+"%";aj.appendChild(ag)}}else{if(ai[ah]===C.in3dx){ag.className=ah+" content-status content-status-3dx fonticon fonticon-check";new this._ToolTip({body:this._NLS.In3DX,target:ag,position:"bottom"});aj.appendChild(ag)}else{if(ai.key===C.onDisk){ag.className=ah+" content-status fonticon fonticon fonticon-drive";new this._ToolTip({body:this._NLS.OnDisk,target:ag,position:"bottom"});aj.appendChild(ag)}else{if(ai[ah]===C.deleting){ag.textContent=this._NLS.Deleting;ag.className="deleting";aj.appendChild(ag)}}}}};var X=function(ag,ah){if(Array.isArray(ag.versions)){[].forEach.call(ag.versions,function(ai){if(ag.selectedVersion===ai.id){ah.textContent=isNaN(ai.size)?ai.size:this._ADDataFormatUtils.formatFileSize(ai.size);ah.actualValue=ai.size}}.bind(this))}else{if(!isNaN(ag.size)){ah.textContent=this._ADDataFormatUtils.formatFileSize(ag.size);ah.actualValue=ag.size}else{ah.textContent=ag.size}}};var p=function(ah,ai){var ag=document.createElement("div");ag.className=this._ADDataFormatUtils.getFileIconBkg(ah);new this._ToolTip({body:this._ADDataFormatUtils.getTypeToolTip.call(this,ah),target:ag,position:"bottom"});ai.appendChild(ag)};j=function(){return[{name:"",key:"selected",callback:E},{name:this._NLS.Type,key:"type",callback:p},{name:this._NLS.Name,key:"title",dataType:"String"},{name:this._NLS.Modified,key:"modified",dataType:"String"},{name:this._NLS.Filetype,key:"filetype",dataType:"String"},{name:this._NLS.Size,key:"size",callback:X},{name:this._NLS.Version,key:"versions",callback:T},{name:this._NLS.Status,key:"status",callback:J},{name:"",key:"actions",callback:S}]};V=function(){var ag=true;if(this.getAttribute("tableId")===N){ag=false}return ag};O=function(){var aj=j.call(this);for(var ai=0;ai<aj.length;ai++){if(aj[ai].key==="selected"){var al=document.createElement("th");al.className=aj[ai].key;this.$.tableHeaderRow.appendChild(al);new this._Toggle({type:"checkbox",label:"",className:"primary inputs-toggle",id:"selectAll",events:{onChange:w.bind(this)}}).inject(al)}else{var ag=document.createElement("th");ag.className=aj[ai].key;ag.textContent=aj[ai].name;if(V.call(this)){var ak=document.createElement("span");ak.className="sort-indicator fonticon fonticon-open-down hidden";var ah=document.createElement("span");ah.className="sort-indicator fonticon fonticon-open-up hidden";ag.appendChild(ak);ag.appendChild(ah)}this.$.tableHeaderRow.appendChild(ag);if(K(aj[ai])&&V.call(this)){ag.addEventListener("click",ab.bind(this,true,aj[ai].key,this.$.tableBody))}}}};G=function(){var ag=this.getAttribute("tableId");if(ag===y){this.EVENTS=q}else{this.EVENTS=c}if(ag===N){this.$.topMessage.textContent=this._NLS.BatchJobSelectInputsNote}else{if(ag===y){this.$.topMessage.textContent=this._NLS.CommonFilesSelectInputsNote}else{this.$.topMessage.textContent=this._NLS.SelectInputsNote}}};g=function(){this._selectedInputs=[];this._dropCounter=0;var ag=this;ag.isReady=new Promise(function(ah){require(["DS/UIKIT/DropdownMenu","DS/UIKIT/Spinner","DS/UIKIT/Tooltip","DS/UIKIT/Input/Toggle","DS/UIKIT/Input/Select","UWA/Core","DS/SMAPoweredByViews/Utils/ADDataFormatUtils","WebappsUtils/WebappsUtils","i18n!DS/SMAPoweredByViews/assets/nls/ADCreateJobInputs"],function(aj,al,an,ao,ai,am,aq,ak,ap){B.call(ag,aj,ap);I.call(ag,aj,ap);d.call(ag,aj,ap);ag._loadingSpinner=new al({renderTo:ag.$.spinnerContainer,visible:true});ag._Spinner=al;ag._ToolTip=an;ag._Toggle=ao;ag._Select=ai;ag._UWA=am;ag._NLS=ap;ag._ADDataFormatUtils=aq;ag._WebappsUtils=ak;ag._NLS=ap;G.call(ag);document.addEventListener("click",r.bind(ag));O.call(ag);this._loadedContent=[];ah()}.bind(ag))})};Q=function(){var ag=document.querySelectorAll(".sort-indicator");[].forEach.call(ag,function(ah){this.DOM(ah).addClass("hidden")}.bind(this))};af=function(ag){switch(ag){case"title":case"modified":case"purpose":return"text";case"size":case"status":return"custom";default:return"text"}};ab=function(ah,ag,ak,ai){var aj;ai.stopPropagation();ai.cancelBubble=true;Q.call(this);aj=af(ai.currentTarget.className);this._ADDataFormatUtils.sortTable.call(this,ah,ag,ak,ai.currentTarget,aj)};R=function(){this.$.tableBody.textContent=""};o=function(ag,ah){this.fire(this.EVENTS.switchinputversion,{newId:ag,oldId:ah})};D=function(ag,ah){[].forEach.call(ah.itemData.versions,function(ai){if(ag===ai.id){ah.children[5].textContent=isNaN(ai.size)?ai.size:this._ADDataFormatUtils.formatFileSize(ai.size);ah.children[3].textContent=isNaN(ai.modified)?ai.modified:this._ADDataFormatUtils.formatTimestamp(ai.modified).replace(/,/g,"");ah.children[4].textContent=this._ADDataFormatUtils.getFileExtension(ai.name)}}.bind(this))};E=function(ai,ak,ah,aj){var ag;ak.className="id td-centered";aj.appendChild(ak);ag=new this._Toggle({type:"checkbox",label:"",className:"primary inputs-toggle inputs-checkbox"}).inject(ak);ag.elements.input.addEventListener("change",m.bind(this));if(ai.selected&&ai.status!==C.uploading){ag.check();ag.getContent().parentNode.parentNode.classList.add("tr-active");W.call(this,ai)}if(h.indexOf(ai.type)!==-1||ai.status===C.uploading||ai.status===C.deleting||(ai.latestVersionInvalid&&!ai.selectedVersion)){ag.disable()}};T=function(ap,ai,an,al){var ah,ag=false;var ak=[],am,ao=this,aj=false;ai.className=an;al.appendChild(ai);if(Array.isArray(ap.versions)){[].forEach.call(ap.versions,function(aq){am={value:aq.id,label:aq.version?aq.version:""};if(ap.selectedVersion===aq.id){am.selected=true;al.id=aq.id;aj=true}ak.push(am);if(aq.persistenceOperation===C.creating){ag=true;am.selected=true}});if(!aj){al.id=ak[ak.length-1].value}ah=new this._Select({placeholder:false,className:"input-sm",options:ak,events:{onChange:function(aq){aq.stopPropagation();aq.cancelBubble=true;o.call(ao,aq.currentTarget.value,aq.currentTarget.parentNode.parentNode.parentNode.id);D.call(ao,aq.currentTarget.value,aq.currentTarget.parentNode.parentNode.parentNode);aq.currentTarget.parentNode.parentNode.parentNode.id=aq.currentTarget.value}}}).inject(ai);ag?ah.disable():ah.enable()}else{ai.textContent=ap.versions;al.id=ap.id}};S=function(ai,ak,ah,aj){var ag;ak.className="td-centered";aj.appendChild(ak);ag=document.createElement("span");ag.setAttribute("id","actionId__"+ai.id);ag.className="action-item fonticon fonticon-open-down";ak.appendChild(ag);ag.setAttribute("value",ai.title);ag.addEventListener("click",b.bind(this))};ac=function(){[].forEach.call(document.querySelectorAll(".tooltip"),function(ag){ag.parentNode.removeChild(ag)})};a=function(ai){var ag=false;for(var ah=0;ah<this.$.tableBody.children.length;ah++){if(ai.id===this.$.tableBody.children[ah].itemData.id){ag=true;break}else{if(ai.title===this.$.tableBody.children[ah].itemData.title&&ai.status==="in3dx"&&this.$.tableBody.children[ah].itemData.status==="uploading"){ag=true;break}}}return ag};aa=function(ah,ag){if(ah.versions.length!==ag.versions.length){return false}var ai=function(ak){var aj;Object.keys(ak).forEach(function(al){aj+=ak[al]});return aj};return ai(ah)===ai(ag)};u=function(aj,ai){aj.textContent="";aj.itemData=ai;var ag=j.call(this);var ah=this;ag.forEach(function(al){if(al.callback){var ak=document.createElement("td");ak.className=al.key+" td-centered";aj.appendChild(ak);al.callback.call(ah,ai,ak,al.key,aj)}if(al.dataType==="String"){var am=document.createElement("td");am.className=al.key+" td-centered";am.textContent=ai[al.key];aj.appendChild(am)}})};L=function(ag){var ah=document.createElement("tr");ah.className="input-row";this.$.tableBody.appendChild(ah);ah.itemData=ag;u.call(this,ah,ag)};i=function(ai){var ag=[];ag=ai.map(function(aj){return aj.id});for(var ah=0;ah<this.$.tableBody.children.length;ah++){if(ag.indexOf(this.$.tableBody.children[ah].itemData.id)===-1){this.$.tableBody.deleteRow(ah)}}};W=function(ag){if(ag.versions&&Array.isArray(ag.versions)&&ag.versions.length>0){this._selectedInputs.push(ag.versions[ag.versions.length-1].id)}else{this._selectedInputs.push(ag.id)}};l=function(ag){[].forEach.call(this.$.tableBody.children,function(ah){if(ah.itemData.title===ag.title&&ah.itemData.id===ag.id){if(!aa.call(this,ah.itemData,ag)){u.call(this,ah,ag)}if(ag.selected){W.call(this,ag)}}}.bind(this))};e=function(){if(this.content&&this.content.items&&this.content.items.length>0){ac.call(this);for(var ag=0;ag<this.content.items.length;ag++){i.call(this,this.content.items);if(a.call(this,this.content.items[ag])){l.call(this,this.content.items[ag])}else{L.call(this,this.content.items[ag])}}}};n=function(){this.isReady.then(function(){this._selectedInputs=[];if(this.content!==undefined){switch(this.content.status){case k.loading:this._loadingSpinner.show();this.DOM(this.$.tableContainer).addClass("loading-mask");e.call(this);break;case k.ready:this._loadingSpinner.hide();this.DOM(this.$.tableContainer).removeClass("loading-mask");if(this.content.items&&this.content.items.length===0){this.DOM(this.$.uploadContainer).removeClass("hidden");this.DOM(this.$.inputsContainer).addClass("hidden");this.$.tableBody.textContent=""}else{this.DOM(this.$.uploadContainer).addClass("hidden");this.DOM(this.$.inputsContainer).removeClass("hidden");e.call(this)}break;case k.error:this._loadingSpinner.hide();this.DOM(this.$.tableContainer).removeClass("loading-mask");break;default:break}}}.bind(this))};F=function(){if(this.isReady){this.isReady.then(function(){if(this.isTransientWidget){this._dropDownMenu.disableItem(1);this.DOM(this.$.addRef).addClass("hidden")}else{this._dropDownMenu.enableItem(1);this.DOM(this.$.addRef).removeClass("hidden")}}.bind(this))}};Z({is:"ad-create-job-inputs",properties:{store:{type:Object},tableId:{type:String},nlspath:{type:String,value:"DS/SMAPoweredByViews/assets/nls/ADCreateJobInputs"},content:{type:Object,observer:"contentChanged"},isReady:{type:Promise},isTransientWidget:{type:Boolean,value:false,observer:"isTransientWidgetChanged"}},contentChanged:function(){return n.apply(this)},isTransientWidgetChanged:function(){return F.apply(this)},uploadFiles:function(){return t.apply(this,arguments)},ready:function(){return g.apply(this,arguments)},onInputSelect:function(){return m.apply(this,arguments)},onActionsMenuClick:function(){return b.apply(this,arguments)},onAllInputSelect:function(){return w.apply(this,arguments)},onAddReferenceContent:function(){return s.apply(this,arguments)},onChange:function(){return A.apply(this,arguments)},sort:function(){return ab.apply(this,arguments)},reset:function(){return R.apply(this,arguments)},onMenuClick:function(){return f.apply(this,arguments)},behaviors:[ad.SMAProcSP.SPBase]})}(this));