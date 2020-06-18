define("DS/MSFDocumentManagement/MSFDocumentClient",["UWA/Core","UWA/Utils/InterCom"],function(f,c){var b=false;var a={};var d=undefined;var e={MSF_NOT_AVAILABLE_RESPONSE:7,MSF_CALL_SUCCESS_RESPONSE:1,isMSFDocServerInitialized:false,msfLocalCacheCollection:{},MSFResponse:undefined,MSFDocumentServer:null,onConnectWithMSF:function(h,g,m,j,i,k){var l=this;if(f.Utils.Client.Platform.windows){require(["DS/MSFDocumentManagement/MSFDocumentServer"],function(o){try{if(o){l.isMSFDocServerInitialized=true;l.MSFDocumentServer=o;l.MSFDocumentServer.onConnectWithMSF(h,g,m,j,i,k)}}catch(n){console.log(n)}})}},isConnectedToMSFClient:function(){return this.MSFDocumentServer.isConnectedWithMSF()},initializeMSFInterComClient:function(){a=new c.Socket("SocketClient");a.subscribeServer("uwa.embedded");a.addListener("getResponse",this.getMSFResponse.bind(this));b=true},downloadDocumentFromMSF:function(l,i,h,k){var m=this;var n=k.onComplete;var g=k.onFailure;var j=f.clone(k||{},false);j.documentId=l;j.fileId=i;j.Checkout=h;j.onComplete=function(o){o.onComplete=n;o.onFailure=g;if(m.MSFResponse.MSFResult===m.MSF_CALL_SUCCESS_RESPONSE){if(f.is(o.onComplete,"function")){o.onComplete(o)}}else{if(m.MSFResponse.ErrorMessage!==""){if(f.is(o.onFailure,"function")){o.onFailure(m.MSFResponse.ErrorMessage)}}}this.MSFResponse=undefined};if(h===false){m.downloadDocument(j)}else{m.checkoutDocument(j)}},downloadDocumentsFromMSF:function(i,h){for(var g=0;g<i.length;g++){this.downloadDocumentFromMSF(i[g],undefined,false,h)}},creatDocumentFromMSF:function(i,j){var k=this;var l=j.onComplete;var g=j.onFailure;var h=f.clone(j||{},false);h.onComplete=function(m){m.onComplete=l;m.onFailure=g;if(k.MSFResponse){if(k.MSFResponse.MSFResult===k.MSF_CALL_SUCCESS_RESPONSE){if(f.is(m.onComplete,"function")){m.onComplete(m)}}else{if(k.MSFResponse.ErrorMessage!==""){if(f.is(m.onFailure,"function")){m.onFailure(k.MSFResponse.ErrorMessage)}}}}k.MSFResponse=undefined};if(i.id){if(i.fileInfo&&i.fileInfo.file){if(i.fileInfo.fileId||!i.fileInfo.newFile){k.checkIn(i,h)}else{k.addFiles(i,h)}}}else{if(i.fileInfo&&!(i.fileInfo.file instanceof window.File)&&i.fileInfo.file.FileToUpload){k.createNew(i,h)}}return},MSFUploadObjectList:function(j,i){var h=this;var g=i._options;g.onComplete=function(k){if(e.MSFResponse.MSFResult===h.MSF_CALL_SUCCESS_RESPONSE){i.model.add(j,e.MSFResponse.RequestData.MSFFileFormatDetails,k)}else{if(e.MSFResponse.MSFResult===5){e.MSFResponse=undefined}else{if(e.MSFResponse.ErrorMessage!==""){if(f.is(k.onFailure,"function")){k.onFailure(e.MSFResponse.ErrorMessage)}}}}};this.selectFiles(g);return},MSFCallCheckout:function(j,p,n,q,o,g,k,r){var s=JSON.parse("{}");s.RequestType=j;s.DocumentID=p;s.PartId=n;s.DocumentType=q;s.parentOID=o;var m;var h;if(g){m=g.split(",")}else{m=p.split(",")}for(var l=0;l<m.length;l++){if(l===0){h=JSON.parse('{"MSFFileFormatDetails":[{"FileName": "", "Format" : "", "VersionId": ""}]}')}if(k){h.MSFFileFormatDetails[l].FileName=k;h.MSFFileFormatDetails[l].Format=r}if(m[l]){if(l===0){h.MSFFileFormatDetails[l].VersionId=m[l]}else{h.MSFFileFormatDetails.push({FileName:k,Format:r,VersionId:m[l]})}}}s.MSFFileFormatDetails=h.MSFFileFormatDetails;this.sendMessage(s)},getMSFResponse:function(k){var j=k.RequestData?k.RequestData.RequestId:k.RequestId;var g=j?this.msfLocalCacheCollection[j]:null;var i;if(k.ResultData!==undefined&&k.ResultData!==""){i=JSON.parse(k.ResultData);g.data=i.data}if(j){delete this.msfLocalCacheCollection[j]}if(g){if(window.widget){this.MSFResponse=k;if(f.is(g.onComplete,"function")){g.onComplete(g)}}else{try{if(k.MSFResult===this.MSF_CALL_SUCCESS_RESPONSE&&(k.RequestData.RequestType==="checkout"||k.RequestData.RequestType==="CheckIn"||k.RequestData.RequestType==="AddFiles")){this.refreshFrameWindow(g.Window)}}catch(h){console.log("inside getMSFResponse: "+h)}}}},refreshFrameWindow:function(h){if(window.__karma__==undefined){var g=findFrame(h,"detailsDisplay");g=g==null?findFrame(h,"listDisplay"):g;g=g==null?findFrame(h,"content"):g;if(g!=null){g.location.href=g.location.href}else{h.location.href=h.location.href}}},downloadDocument:function(g){var h=JSON.parse("{}");h.RequestType="download";this.processDownload(g,h)},checkoutDocument:function(g){var h=JSON.parse("{}");h.RequestType="checkout";this.processDownload(g,h)},viewDocument:function(g){var h=JSON.parse("{}");h.RequestType="view";this.processDownload(g,h)},processDownload:function(g,h){h.DocumentID=g.documentId;h.Options=g;this.sendMessage(h)},checkIn:function(i,h){var j=JSON.parse("{}");h.DocumentInfo=i;j.RequestType="CheckIn";j.DocumentID=i.id?i.id:"";var g=[];g.push({FileName:i.fileInfo.file.name,Format:"",VersionId:""});j.MSFFileFormatDetails=g;j.Options=h;this.sendMessage(j)},createNew:function(h,g){var i=JSON.parse("{}");g.DocumentInfo=h;i.RequestType="CreateNew";i.DocumentType=h.type?h.type:"Document";i.RelName=h.relInfo?h.relInfo.parentRelName:null;i.parentId=h.relInfo?h.relInfo.parentId:null;i.CollabSpace=h.collabspace?h.collabspace:"";i.Options=g;i.MSFFileFormatDetails=[h.fileInfo.file];this.sendMessage(i)},selectFiles:function(g){var h=JSON.parse("{}");h.RequestType="SelectFiles";h.Options=g;this.sendMessage(h)},addFiles:function(h,g){var i=JSON.parse("{}");g.DocumentInfo=h;i.RequestType="AddFiles";i.DocumentType=h.type?h.type:"Document";i.RelName=h.relInfo?h.relInfo.parentRelName:"Reference Document";i.DocumentID=h.id?h.id:"";i.Options=g;this.sendMessage(i)},generateNewGuid:function(){var g=new Date();var h=Math.random()+"."+g.getFullYear()+"."+g.getMonth()+"."+g.getDate()+"."+g.getHours()+"."+g.getSeconds()+"."+g.getMilliseconds();return h},isConnectedWithMSF:function(){if(sessionStorage.msfConnection){return String(sessionStorage.msfConnection=="true")}else{return"false"}},sendMessage:function(k){if(this.isMSFDocServerInitialized===false){var g=k.Options;if(g){this.MSFResponse={};this.MSFResponse.MSFResult=this.MSF_NOT_AVAILABLE_RESPONSE;if(f.is(g.onComplete,"function")){g.onComplete(g);return}}}k.RequestId=this.generateNewGuid();if(window.widget&&window.widget.id){if(b===false){this.initializeMSFInterComClient();sessionStorage.MSFWidget=window.widget.id}else{if(b===true){if(sessionStorage.MSFWidget&&sessionStorage.MSFWidget!==window.widget.id){this.initializeMSFInterComClient();sessionStorage.MSFWidget=window.widget.id}}}this.msfLocalCacheCollection[k.RequestId]=k.Options;a.dispatchEvent("MSFProcessMessage",k)}else{var j=this;try{d=getTopWindow();while(d&&d.opener&&(d.location.href).indexOf("emxNavigator.jsp")==-1){d=d.opener.getTopWindow()}}catch(i){console.log("inside sendMessage: "+i)}var h={};h.Window=window;this.msfLocalCacheCollection[k.RequestId]=h;require(["UWA/Utils/InterCom"],function(l){a=new l.Socket("MSFIntercomClientSocket");a.subscribeServer("enovia.bus.server",d);a.addListener("getResponse",j.getMSFResponse.bind(j));a.dispatchEvent("MSFProcessMessage",k)})}}};return e});define("DS/MSFDocumentManagement/MSFDocumentServer",["UWA/Core","DS/i3DXCompass/Data","DS/PlatformAPI/PlatformAPI","DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices","UWA/Utils/InterCom"],function(e,g,h,b,j){var a;var c=false;var f={};var d=undefined;var i={isConnectedWithMSF:function(){try{if(!window.widget){a=top.window.msfWebSocket}}catch(k){return false}c=(a!=null&&a.readyState===1);return c},initializeMSFInterCom:function(){f=new j.Socket("MSFIntercomServerSocket");if(window.widget){f.subscribeServer("uwa.embedded")}else{f.subscribeServer("enovia.bus.server",getTopWindow())}f.addListener("MSFProcessMessage",this.sendMessage.bind(this))},onConnectWithMSF:function(l,k,q,s,n,r){var m="";if(this.isConnectedWithMSF()){return}this.initializeMSFInterCom();if(sessionStorage.ClientId===undefined){var o=this.generateNewGuid();sessionStorage.ClientId=o}if(window.widget){l=h.getUser().login}var p=this;b.getPlatformServices({onComplete:function(v){var u=undefined;if(v!==undefined){if(v.length==1){u=v[0]}else{if(v.length>1){var w=window.tenantId;if(window.widget){w=window.widget.data.x3dPlatformId}for(var t in v){if(v[t].platformId==w){u=v[t];break}}}else{console.log("---may return wrong tenant information---");u=v[0]}}k=e.is(u["3DSpace"],"string")?u["3DSpace"]:"";q=e.is(u.platformId,"string")?u.platformId:"";m=e.is(u["3DDashboard"],"string")?u["3DDashboard"]:"";s=e.is(u["3DPassport"],"string")?u["3DPassport"]:""}if(window.widget){if(m!==undefined&&m!==""){if(m.slice(-1)==="/"){m=m.slice(0,-1)}r=m+"/resources/AppsMngt/";n=m+"/api/passport/ticket?url=V6"}else{console.error("---3DDashboard URL is empty---")}}if(s&&s!==""){if(window.widget){if(s.slice(-1)==="/"){s=s.slice(0,-1)}g.initialize({userId:l,passportUrl:s,proxyTicketUrl:n+(window.widget?"&t=":"?t="),myAppsBaseUrl:r})}g.getCasTgc({onComplete:function(x){if(x){p.connectWithMSF('{"ClientId": "'+o+'", "UserName": "'+l+'", "ServerUrl": "'+k+'", "TenantId": "'+q+'", "CASTGC": "CASTGC='+x+'"}')}else{p.connectWithMSF('{"ClientId": "'+o+'", "UserName": "'+l+'", "ServerUrl": "'+k+'", "TenantId": "'+q+'"}')}}})}else{p.connectWithMSF('{"ClientId": "'+o+'", "UserName": "'+l+'", "ServerUrl": "'+k+'", "TenantId": "'+q+'"}')}},onFailure:function(){console.error("Fail to connect to MSF")}})},generateNewGuid:function(){var k=new Date();var l=Math.random()+"."+k.getFullYear()+"."+k.getMonth()+"."+k.getDate()+"."+k.getHours()+"."+k.getSeconds()+"."+k.getMilliseconds();return l},connectWithMSF:function(l){if(l){var k=decodeURIComponent(l);l=JSON.parse(l);d="wss://msf.3ds.com:2012/MSFServiceSocket?MSFClientInfo="+k;sessionStorage.ClientId=l.ClientId}this.initSocket(d)},initSocket:function(l){var k=this;a=new WebSocket(l);if(!window.widget){top.window.msfWebSocket=a}a.onerror=function(){};a.onopen=function(){if(k.isConnectedWithMSF()){sessionStorage.msfConnection=true}};a.onmessage=function(m){var n=JSON.parse(m.data);k.getMSFResponse(n)};a.onclose=function(m){if(m.code!==1005&&m.code!==1006&&m.code!==1000){a=new WebSocket(l)}else{a=null}sessionStorage.msfConnection=false}},getMSFResponse:function(k){if(k.RequestType==="Connect"&&k.Connection==="True"){c=true;sessionStorage.msfConnection=true}else{if(k.Connection==="False"){a=null;sessionStorage.msfConnection=false}}f.dispatchEvent("getResponse",k)},sendMessage:function(k){if(this.isConnectedWithMSF()){if(k!==undefined&&k.RequestType){k.ClientId=sessionStorage.ClientId;a.send(JSON.stringify(k))}}else{k.MSFResult=7;f.dispatchEvent("getResponse",k)}},};return i});