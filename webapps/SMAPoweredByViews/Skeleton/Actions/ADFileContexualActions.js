define("DS/SMAPoweredByViews/Skeleton/Actions/ADFileContexualActions",["DS/TransientWidget/TransientWidget","DS/SMAPoweredByState/ad-state-store","DS/SMAPoweredByState/ad-state-domain-managed-data/selectors","DS/SMAPoweredByState/ad-state-domain-study/selectors","DS/SMAPoweredByViews/Utils/ADFileUtils","DS/SMAPoweredByViews/Utils/ADDataFormatUtils","WebappsUtils/WebappsUtils","DS/SMAPoweredByState/ad-state-loading-utils","i18n!DS/SMAPoweredByViews/assets/nls/ADFileRenderer"],function(s,q,j,n,h,g,d,i,e){var t=null;var c=["ODB","SIM","STT","MDL","SMAFOCUS","SMABULK","023","CID","FIL","ABQ","SEL","RES","PAC","CAE","WAV","3DXML","TIFF","TIF","GIF","JPEG","JPG","PNG","PDF"];var w={},x=function(){return new Promise(function(z){if(t){z(t)}else{var y=d.getWebappsBaseUrl()+"SMAPoweredByViews/ad-file-chooser/ad-file-chooser.html";i.loadWebComponent(y,"DS.SMAPoweredByViews.ADFileChooser",function(){var A=document.getElementById("fileChooser");if(A){t=A;z(A)}else{t=document.createElement("ad-file-chooser");t.id="fileChooser";document.body.appendChild(t);z(t)}})}})},m=function(y){var z=y.get("type");return z==="file"},l=function(y){return c.indexOf(g.getFileExtension(y.get("title")))!==-1},u=function(z){var y=z.get("type");return y===j.Types.SIMULATION_OBJECT||y===j.Types.FILE},k=function(y){h.downloadFile(q.getStore(),y.model.get("id"),false)},r=function(y){h.downloadFile(q.getStore(),y.model.get("id"),true)},b=function(E){var F=q.getStore(),A=E.model.id,G=j.managedDataWithID(q.getStore().getState(),A).type,C,D,B,y,z;if(G!==j.Types.SIMULATION_OBJECT||G!==j.Types.SIMULATION_OBJECT){if(G===j.Types.FILE){y=j.managedDataParent(F.getState(),A,false).type;if(y===j.Types.NVDOCUMENT){z=A}else{C=j.managedDataChildren(F.getState(),A,true);z=C[C.length-1].id}D=new CustomEvent("viewfile",{detail:{file:z,status:"in3dx"},bubbles:true});E.container.dispatchEvent(D)}}else{B=j.managedDataWithID(q.getStore().getState(),A);if(s){s.showWidget("SIMWPSR_AP",B.title,{X3DContentId:JSON.stringify(g.format3DPlayData({id:A,title:B.title}))})}}},f=function(y){y.container.children[0].click()},o=function(A){var z=q.getStore(),y=A.model.id;x().then(function(B){B.store=z;B.multiple=false;B.containerId=y;B.showChooser()})},v=function(y){var z=null;if(y.model.get("type")===j.Types.SIMULATION_OBJECT){z=new CustomEvent("deleteso",{detail:{soId:y.model.id},bubbles:true})}else{z=new CustomEvent("deletefile",{detail:{fileId:y.model.id},bubbles:true})}y.container.dispatchEvent(z)},p=function(y){var z=new CustomEvent("monitorjob",{detail:{compassObject:g.format3DPlayData({id:y.model.get("uploadingJob")})},bubbles:true});y.container.dispatchEvent(z)};function a(A){x();var E=false;var B=false,F=null;if(l(A)||!u(A)){E=true}if(!m(A)){F=[{id:"previewFile",text:e.previewFile,fonticon:"eye",disabled:E,handler:b},{className:"divider"},{id:"deleteFile",text:e.deleteFile,fonticon:"trash",disabled:B,handler:v}]}else{var y=false,z=q.getStore();var D=j.managedDataWithID(z.getState(),A.get("id")),C=j.managedDataParent(z.getState(),A.get("id"),false).type;if(D){y=j.isFileUploading(z.getState(),A.get("id"))}if(y||A.get("readOnly")){B=true}F=[{id:"viewDetail",text:e.viewDetails,fonticon:"window",handler:f},{className:"divider"},{id:"uploadFileVersion",text:e.uploadNewVersion,fonticon:"upload",disabled:A.get("readOnly")||(C===j.Types.NVDOCUMENT)||D.latestVersionInvalid,handler:o},{id:"downloadFile",text:e.downloadFile,fonticon:"download",disabled:D.latestVersionInvalid,handler:k},{id:"downloadZip",text:e.downloadZip,fonticon:"archive",disabled:D.latestVersionInvalid,handler:r},{id:"previewFile",text:e.previewFile,fonticon:"eye",disabled:E||D.latestVersionInvalid,handler:b},{className:"divider"},{id:"deleteFile",text:e.deleteFile,fonticon:"trash",disabled:B,handler:v}]}if(A.get("uploadingJob")){F.push({text:e.Monitor,fonticon:"computer-connected",handler:p})}return F}w.getContexualActions=function(){return a(this)};return w});