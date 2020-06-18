define("DS/CATSmmJsApi/IdUtils",["require","exports"],function(f,h){Object.defineProperty(h,"__esModule",{value:true});h.ID_SEPARATOR="/";h.ROOT_RESOURCE_ID="";function j(r){var q=0;for(var p=0,o=r.length;p<o;p++){if(r.charAt(p)===h.ID_SEPARATOR){q++}}return q}h.depth=j;function n(p){if(h.ROOT_RESOURCE_ID===p){return null}var o=p.lastIndexOf(h.ID_SEPARATOR);if(o===-1){throw new SyntaxError("IdUtils invalid id: "+p)}if(o===0){return h.ROOT_RESOURCE_ID}return p.substring(0,o)}h.getSuperResourceId=n;function e(p){var o=p.lastIndexOf(h.ID_SEPARATOR);if(o===-1){throw new SyntaxError("IdUtils invalid id: "+p)}return a(p,o+1,p.length)}h.getLocalId=e;function m(q,p){var o=[];if(h.ROOT_RESOURCE_ID!==q){o.push(q)}o.push(h.ID_SEPARATOR);l(p,o);return o.join("")}h.constructAbsoluteId=m;function l(u,p){if(u===null){return}for(var t=0,o=u.length;t<o;t++){var w=u.charAt(t);if(k(w)){p.push(w)}else{var v=w.charCodeAt(0).toString(16);var q=v.length;if(q%2!==0){v="0"+v;q++}for(var r=0;r<q;r+=2){p.push("~")}p.push(v.toUpperCase())}}}h.encode=l;var g="A".charCodeAt(0);var c="Z".charCodeAt(0);var i="a".charCodeAt(0);var d="z".charCodeAt(0);function k(p){var o=p.charCodeAt(0);return g<=o&&o<=c||i<=o&&o<=d||"0"<=p&&p<="9"||p==="."||p==="-"||p==="_"}h.isSafeChar=k;function a(q,r,p){var o=[];b(q,r,p,o);return o.join("")}h.decode=a;function b(u,w,q,p){var t=w;while(t<q){var v=u.charAt(t);if(v==="~"){var o=2;t++;while(u.charAt(t)==="~"){o+=2;t++}var r=String.fromCharCode(parseInt(u.substring(t,t+o),16));p.push(r);t+=o}else{p.push(v);t++}}}h.decodeBuf=b});define("DS/CATSmmJsApi/Constants",["require","exports"],function(c,a){Object.defineProperty(a,"__esModule",{value:true});a.PreviewFormat={Html:"1d-html",HtmlCanvas:"2d-canvas",Svg:"2d-svg",Vg:"2d-vg",Js:"js",Custom:"3d-custom"};a.Selectors={parents:"parents",path:"path",children:"children",details:"details",previews:"previews",nls:"nls",actions:"actions",display:"display"};a.SelectorsAll=[a.Selectors.parents,a.Selectors.children,a.Selectors.details,a.Selectors.previews,a.Selectors.nls,a.Selectors.actions];a.ErrorCode={AUTHENTICATION_NEEDED:1,INVALID_CREDENTIALS:2,INTERNAL_ERROR:3,INVALID_LICENSE:4};a.AuthenticationKind={Password:"User-Password",OAuth:"OAuth",OAuth1:"OAuth1",CasOAuth1:"CasOAuth1",Cas:"Cas"};a.URI_PARAM_RESOURCE_ID="id";a.URI_PARAM_ENTRY="entry";a.URI_PARAM_PREVIEW_TYPES="pvwTypes";a.URI_PARAM_PREVIEW_OPTIONS="o";a.URI_PARAM_PREVIEW_EXTRA_OPTIONS="o2";a.URI_PARAM_PREVIEW_LAYER_TAG="tag";a.URI_PARAM_PREVIEW_OPTIONS_SELECTION="sel";a.URI_PARAM_CONTEXT="context";a.URI_PARAM_SELECTOR="selector";a.URI_PARAM_FROM_MESSAGE="m";a.SYC_TYPE_URI_SEPARATOR=".";a.ROOT_RESOURCE_ID="";a.ID_SEPARATOR="/";a.SYC_CONTEXT_MACRO="$sycContext";a.STATEMENT_ID_PREFIX="sycstatement:";a.HTML_SYC_ID_PARAMETER="sycid";a.HTML_SYC_UPLOAD_URL_PARAMETER="sycuploadurl";a.HTML_SYC_DOWNLOAD_URL_PARAMETER="sycdownloadurl";a.HTML_SYC_DRAG_DATA_PARAMETER="sycdragdata";a.HTML_SYC_DRAG_ID_PARAMETER="sycdragid";a.HTML_SYC_TRASHABLE_PARAMETER="syctrashable";a.HTML_SYC_FILENAME_PARAMETER="sycfilename";a.HTML_SYC_HREF_PARAMETER="sychref";a.HTML_SYC_AREA_PARAMETER="sycarea";a.HTML_SYC_ID_ANCHOR_PREFIX="__syc_lid__";a.HTML_SYC_PREVIEW_PARAMETER="sycpreview";a.HTML_SYC_FILTER_ID="sycfilterid";a.HTML_SYC_FILTER_PARENT_ID="sycfilterparentid";a.HTML_SYC_SORT_VALUE_TYPE="sycsortvaluetype";a.HTML_SYC_SORT_VALUE_TYPE_DATE="Date";a.HTML_SYC_SORT_VALUE="sycsortvalue";a.HTML_SYC_TYPES_PARAMETER="syctypes";a.HTML_SYC_ENOVIA_TYPE="sycenoviatype";a.HTML_SYC_TITLE_PARAMETER="syctitle";a.HTML_SYC_ICON_URL_PARAMETER="sycicon";a.HTML_SYC_DESCRIBES_NAVIGATION_PARAMETER="sycdescribesnavigation";a.HTML_SYC_CSS_INTERACT="syc-interact";var b="http://www.w3.org/2001/XMLSchema#";var f="http://www.w3.org/1999/02/22-rdf-syntax-ns#";var e="http://www.w3.org/2000/01/rdf-schema#";var d="http://purl.org/dc/terms/";a.NS_DS_VOCABULARIES="http://www.3ds.com/vocabularies/";a.NS_SYC=a.NS_DS_VOCABULARIES+"syc/";a.XSD_string=b+"string";a.XSD_integer=b+"integer";a.XSD_boolean=b+"boolean";a.XSD_dateTime=b+"dateTime";a.P_RDF_type=f+"type";a.C_RDF_XMLLiteral=f+"XMLLiteral";a.C_RDF_Property=f+"Property";a.C_RDFS_Resource=e+"Resource";a.P_RDFS_label=e+"label";a.NS_SYC_TYPE=a.NS_SYC+"type/";a.P_SYC_DISPLAY_TEXT=a.NS_SYC+"displayText";a.P_SYC_TITLE=d+"title";a.P_SYC_LEAF=a.NS_SYC+"leaf";a.P_SYC_VERSION=a.NS_SYC+"version";a.P_SYC_CHILD=a.NS_SYC+"treeChild";a.P_SYC_PAGE_ELEMENT=a.NS_SYC+"pageElement";a.PS_SYC_CHILDREN=[a.P_SYC_CHILD,a.P_SYC_PAGE_ELEMENT];a.P_SYC_IDENTIFIER=d+"identifier";a.P_SYC_HAS_PREVIEW=a.NS_SYC+"preview";a.P_SYC_HAS_ICON=a.NS_SYC+"icon";a.P_SYC_ERROR=a.NS_SYC+"error";a.P_SYC_CAN_UPLOAD=a.NS_SYC+"canUpload";a.P_SYC_PREVIEW_LOCATION=a.NS_SYC+"previewLocation";a.P_SYC_PREVIEW_IS_DEFAULT=a.NS_SYC+"previewIsDefault";a.P_SYC_INSTANCE_OF=a.NS_SYC+"isInstanceOf";a.P_SYC_TRA_SOURCE=a.NS_SYC+"traceability/source";a.P_SYC_PROPERTY_CHILD=a.NS_SYC+"propertyChild";a.P_SYC_FACETS=[a.P_SYC_INSTANCE_OF,a.P_SYC_PROPERTY_CHILD];a.P_SYC_HAS_ACTION=a.NS_SYC+"hasAction";a.P_SYC_ACTION_HAS_ARGUMENT=a.NS_SYC+"hasArgument";a.P_SYC_ACTION_ENABLED=a.NS_SYC+"enabled";a.P_SYC_ACTION_ARGUMENT_TYPE=a.NS_SYC+"argumentType";a.P_SYC_ACTION_ARGUMENT_INITIAL_VALUE=a.NS_SYC+"argumentInitValue";a.P_SYC_ACTION_ARGUMENT_POSSIBLE_VALUE=a.NS_SYC+"argumentPossibleValue";a.P_SYC_ACTION_ARGUMENT_CONSTRAINED_TO_POSSIBLE_VALUES=a.NS_SYC+"argumentConstrainedToPossibleValues";a.P_SYC_HAS_JS_SCRIPT=a.NS_SYC+"hasJsScript";a.P_SYC_CONTEXT=a.NS_SYC+"context";a.P_SYC_DESCRIBES_NAVIGATION=a.NS_SYC+"describesNavigation";a.P_SYC_ENOVIA_TYPE=a.NS_SYC+"enovia/type";a.COMPONENT_TREE="tree";a.COMPONENT_PROPERTIES="properties";a.COMPONENT_PREVIEW="preview";a.COMPONENT_FILESYSTEM="filesystem";a.COMPONENT_TRASH="trash";a.COMPONENT_SEARCH="search";a.C_TRA_SCOPE=a.NS_SYC_TYPE+"Scope";a.TAG_NAVIGATION_KIND_RESOURCE="navigationKind:navigationResource";a.TAG_NAVIGATION_KIND_PREDICATE="navigationKind:predicate";a.TAG_NAVIGATION_KIND_PREDICATE_REVERSED="navigationKind:predicateReversed";a.TAG_CAN_BE_ADDED_TO_CONTEXT="canBeAddedToContext";a.MOD1="mod1";a.MOD_SHIFT="shift";a.MOD_LONG_TOUCH="long_touch"});define("DS/CATSmmJsApi/Rdf",["require","exports","DS/CATSmmJsApi/Constants","DS/CATSmmJsApi/IdUtils"],function(i,q,a,l){Object.defineProperty(q,"__esModule",{value:true});function k(v,s){var t,u;for(t=0;t<v.length;t++){u=v[t];if(s(u,t,v)){return u}}return null}var b=(function(){function s(u,t){this.uri=u;this.model=t}s.prototype.getSomeObject=function(u,t){return e([this.uri],[u],t,this.model.bySubject(this.uri))};Object.defineProperty(s.prototype,"length",{get:function(){return this.model.bySubject(this.uri).length},enumerable:true,configurable:true});return s}());q.Resource=b;var j=(function(){function s(t){this.statementsBySubject={};this.statementsByObject={};this.length=0;if(t){this.pushAll(t)}}s.prototype.getResource=function(t){return new b(t,this)};s.prototype.bySubject=function(u){if(u===null||u===undefined){return[]}var t=this.statementsBySubject[u];if(!t){this.statementsBySubject[u]=t=[]}return t};s.prototype.byObject=function(u){if(u===null||u===undefined){return[]}var t=this.statementsByObject[u];if(!t){this.statementsByObject[u]=t=[]}return t};s.prototype.pushAll=function(u){var t=u.length;for(var v=0;v<t;v++){this.push(u[v])}};s.prototype.push=function(u){this.length++;var t=this.statementsBySubject[u.subjectId];if(!t){this.statementsBySubject[u.subjectId]=t=[]}if(!d(t,u)){t.push(u)}if(u.objectId!==undefined){var v=this.statementsByObject[u.objectId];if(!v){this.statementsByObject[u.objectId]=v=[]}if(!h(v,u)){v.push(u)}}};return s}());q.Model=j;function d(t,v){for(var w=0,x=t;w<x.length;w++){var u=x[w];if(u.predicate===v.predicate&&u.objectId===v.objectId&&u.objectType===v.objectType&&u.objectValue===v.objectValue){return true}}return false}function h(t,v){for(var w=0,x=t;w<x.length;w++){var u=x[w];if(u.predicate===v.predicate&&u.subjectId===v.subjectId){return true}}return false}function r(s){if(s.objectId===undefined){return""}var t=[a.STATEMENT_ID_PREFIX];l.encode(s.subjectId,t);t.push(l.ID_SEPARATOR);l.encode(s.predicate,t);t.push(l.ID_SEPARATOR);l.encode(s.objectId,t);return t.join("")}q.constructStatementId=r;function g(s){return s.objectId!==undefined}q.objectIsResource=g;function o(s){if(g(s)){return a.C_RDFS_Resource}if(s.objectType!==undefined){return s.objectType}return a.XSD_string}q.getObjectType=o;function p(s){if(s.objectId!==undefined){return s.objectId}return s.objectValue}q.getObject=p;function f(s,t){var v=e([s],[a.P_RDFS_label],null,t);if(!v){var w=s.lastIndexOf("/");var u=s.lastIndexOf("#");if(u>w){w=u}if(w===-1){v=s}else{v=s.substring(w+1)}v=v.substring(0,1).toUpperCase()+v.substring(1);v=decodeURIComponent(v)}return v}q.getHtmlRDFS=f;function n(s,t){if(t.length>0){var u=t[0];if(u.objectId!==undefined){return u.objectId}if(u.objectValue!==undefined){return u.objectValue}console.log("Unknown Statement type",u)}return s}q.firstObject=n;function e(x,y,t,u){var v=function(z){return y.indexOf(z)!==-1};var s=function(z){return x.indexOf(z)!==-1};var w=k(u,function(z){return s(z.subjectId)&&v(z.predicate)});if(w){if(g(w)){return w.objectId}if(w.objectValue!==undefined){return w.objectValue}console.log("Unknown Statement type",w)}return t}q.someObject=e;function c(s){if(s.length>0){return s[0].subjectId}return null}q.someSubject=c;function m(s,w,t){var u=function(x){return w.indexOf(x)!==-1};var v=function(x){return s.indexOf(x)!==-1};return t.filter(function(x){return v(x.objectId)&&u(x.predicate)})}q.filterByObject=m});define("DS/CATSmmJsApi/Utils",["require","exports","DS/CATSmmJsApi/Rdf","DS/CATSmmJsApi/Constants","DS/WebappsUtils/Promise"],function(h,x,e,a,b){Object.defineProperty(x,"__esModule",{value:true});x.UrlRegExp=/^(([^:/?#]+):)(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/;function o(y){if(y.indexOf(a.NS_SYC_TYPE)===-1){return null}return decodeURIComponent(y.substring(a.NS_SYC_TYPE.length))}x.getSycTypeFromTypeUri=o;function p(y){return y.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}x.escapeHtml=p;function u(y){var A=document.createElement("div");A.innerHTML=y;var z=A.textContent;if(z){return z}return""}x.htmlToText=u;function w(z,C,y){var E={id:y?y.resolveUrl(z):z,title:undefined,defaultTitle:"",canUpload:false,types:[],icon:"",leaf:false,errors:[],describesNavigation:false,canBeAddedToContext:false};for(var B=0,D=C.length;B<D;B++){var G=C[B];switch(G.predicate){case a.P_SYC_DISPLAY_TEXT:if(G.objectValue!==undefined){if(e.getObjectType(G)===a.C_RDF_XMLLiteral){E.title=G.objectValue}else{E.title=p(G.objectValue)}}break;case a.P_SYC_TITLE:if(E.title===undefined&&G.objectValue!==undefined){if(e.getObjectType(G)===a.C_RDF_XMLLiteral){E.title=G.objectValue}else{E.title=p(G.objectValue)}}break;case a.P_RDF_type:if(G.objectId!==undefined){E.types.push(G.objectId)}break;case a.P_SYC_HAS_ICON:var A=e.getObject(G);if(E.icon===""&&A!==undefined&&y){E.icon=y.resolveUrl(A)}break;case a.P_SYC_LEAF:E.leaf=G.objectValue==="true";break;case a.P_SYC_ERROR:if(G.objectValue!==undefined){E.errors.push(G.objectValue)}break;case a.P_SYC_CAN_UPLOAD:E.canUpload=G.objectValue==="true";break;case a.P_SYC_DESCRIBES_NAVIGATION:E.describesNavigation=G.objectValue==="true";break;case a.P_SYC_ENOVIA_TYPE:E.enoviaType=G.objectValue;break;case a.P_SYC_PREVIEW_IS_DEFAULT:E.isDefaultPreview=G.objectValue==="true";break;case a.P_SYC_CONTEXT:E.canBeAddedToContext=G.objectValue==="true";break}}if(E.icon===""&&y){for(var B=0,D=E.types.length;B<D;B++){var F=E.types[B];if(F.indexOf(a.NS_SYC_TYPE)===0){E.icon=y.icons+"/type/"+F.substring(a.NS_SYC_TYPE.length);break}}}if(z.indexOf(a.NS_SYC_TYPE)===0){E.defaultTitle=e.getHtmlRDFS(z,C)}else{E.defaultTitle=E.id}return E}x.getResourceInfo=w;function c(z,C){var B=[];var y=function(G){var F=z.getResource(G,[]).then(function(H){if(H.ok){return H.json().then(function(K){return w(G,K.bySubject(G),z.config)})}else{var J=z.config.resolveUrl(G);var I={id:J,title:undefined,defaultTitle:J,canUpload:false,types:[],icon:"",leaf:false,errors:[],describesNavigation:false,canBeAddedToContext:false};return I}});B.push(F)};for(var D=0,A=C;D<A.length;D++){var E=A[D];y(E)}return b.all(B)}x.asyncGetResourcesInfo=c;function j(B){var y=document.createElement("span");y.className="syc-resource";if(q(B.id)){y.setAttribute(a.HTML_SYC_ID_PARAMETER,B.id)}else{if(B.canUpload){y.setAttribute(a.HTML_SYC_UPLOAD_URL_PARAMETER,B.id)}}if(B.errors.length>0){y.classList.add("syc-error")}if(B.icon){var z=document.createElement("span");z.className="syc-resource-icon";z.style.backgroundImage='url("'+B.icon+'")';y.appendChild(z)}var A=document.createElement("span");A.className="syc-resource-title";if(B.title!==undefined){A.innerHTML=B.title}else{A.innerHTML=B.defaultTitle}y.appendChild(A);return y}x.createResourceElement=j;function k(C,z){var D=undefined;for(var A=0,y=z.length;A<y;A++){var B=z[A];switch(B.predicate){case a.P_SYC_DISPLAY_TEXT:if(B.objectValue!==undefined){if(e.getObjectType(B)===a.C_RDF_XMLLiteral){return B.objectValue}else{return p(B.objectValue)}}break;case a.P_SYC_TITLE:if(B.objectValue!==undefined){if(e.getObjectType(B)===a.C_RDF_XMLLiteral){D=B.objectValue}else{D=p(B.objectValue)}}break}}if(D!==undefined){return D}if(C.indexOf(a.NS_SYC_TYPE)===0){return e.getHtmlRDFS(C,z)}else{return C}}x.getTitle=k;function i(B,z){if(typeof B.objectValue!=="string"){return null}var A;switch(B.objectType){case a.XSD_boolean:A=B.objectValue;break;case a.XSD_dateTime:var y=new Date(B.objectValue);A=p(y.toLocaleString());break;case a.C_RDF_XMLLiteral:A=z.resolveUrlInHtml(B.objectValue);break;default:A=p(B.objectValue);break}return A}x.objectValueToHtml=i;function t(z){if(z){var y=z.lastIndexOf("/");var A=z.lastIndexOf("#");if(A>y){return z.substring(A+1)}else{if(y>=0){return z.substring(y+1)}}}return z}x.shortenUri=t;function q(y){if(y!==undefined&&y!==null){return y===""||y.charAt(0)==="/"}return false}x.isSycId=q;function n(y){return y.startsWith("_:")}x.isBlankNode=n;function m(y){var z={};if(y.length>0){y.substring(1).split("&").map(function(A){return A.split("=")}).forEach(function(A){return z[decodeURIComponent(A[0].replace(/\+/gm,"%20"))]=decodeURIComponent(A[1].replace(/\+/gm,"%20"))})}return z}x.decodeQuery=m;function v(z){var y="";Object.keys(z).forEach(function(A){var B=z[A];if(B!==""&&B!==undefined&&B!==null){if(y!==""){y+="&"}y+=encodeURIComponent(A)+"="+encodeURIComponent(B)}});if(y!==""){return"?"+y}return""}x.encodeQuery=v;function s(y,z){z=z.toLowerCase();while(y&&y.tagName.toLowerCase()!==z){y=y.parentElement}return y}x.findElementWithTag=s;function g(y,z){while(y){var A=y.getAttribute(z);if(A){return{element:y,attributeValue:A}}y=y.parentElement}return null}x.findElementWithAttribute=g;function r(z,C){while(z){for(var B=0,y=C;B<y.length;B++){var A=y[B];if(z.classList.contains(A)){return z}}z=z.parentElement}return null}x.findElementWithClass=r;function d(z,y){var A=Object.create(z);for(var B in y){if(y.hasOwnProperty(B)){A[B]=y[B]}}return A}x.fromPrototype=d;function l(z,y){var B=z.offsetParent;var A=z.offsetTop;while(B!==y&&B&&B.parentElement!==null){A+=B.offsetTop;B=B.offsetParent}return A}x.offsetTopRelativeTo=l;function f(z,y){return z.replace(new RegExp("\\"+y,"g"),"\\'")}x.escapeAttributeValue=f});define("DS/CATSmmJsApi/PlmUtils",["require","exports","DS/CATSmmJsApi/Constants","DS/CATSmmJsApi/Utils"],function(b,a,c,e){Object.defineProperty(a,"__esModule",{value:true});a.EXTRA_INFO_SEP="-";a.CONNECTION_PREFIX="_";function g(m){var l=m.indexOf(c.ID_SEPARATOR,1);var j=m.indexOf(a.EXTRA_INFO_SEP,l+1);var i=m.indexOf(c.ID_SEPARATOR,l+1);var h;var k=false;if(i>l&&j>i){j=-1}h=j>l?j:i;if(m.substr(l+1,a.CONNECTION_PREFIX.length)===a.CONNECTION_PREFIX){k=true}return{plmId:m.substring(l+(k?2:1),h>l?h:undefined),repositoryId:m.substring(0,l),extraInfo:j>l?m.substring(j+1,i>l?i:undefined):undefined,subResourcePath:i>l?m.substring(i+1):undefined,isConnection:k}}a.decomposeResourceId=g;function f(h){return g(h).plmId}a.getIdFromResourceId=f;function d(j){var i=e.getSycTypeFromTypeUri(j);if(i){var h=i.indexOf(c.SYC_TYPE_URI_SEPARATOR);if(h>=0){return i.substr(h+1)}}return i}a.getTypeFromTypeUri=d});define("DS/CATSmmJsApi/JobReport",["require","exports","DS/CATSmmJsApi/Utils"],function(b,a,c){var d=(function(){function e(){this.messages=[]}e.from=function(f){return c.fromPrototype(e.prototype,f)};e.prototype.getLastMessageStr=function(){if(this.messages.length>0){return this.messages[this.messages.length-1].text}return""};e.prototype.getMinLevel=function(){var i=2;for(var h=0,f=this.messages;h<f.length;h++){var g=f[h];if(g.level<i){i=g.level}if(i===0){return i}}return i};e.MessageStatus={Error:0,Warning:1,Info:2};return e}());return d});define("DS/CATSmmJsApi/Config",["require","exports","DS/CATSmmJsApi/Constants"],function(e,d,f){var b=(function(){function g(j){if(j.charAt(j.length-1)!=="/"){j+="/"}var m=document.createElement("a");m.href=j;var i=j+"syc/";var k=i+"rest/";var h=i+"service/";var l=m.protocol+"//"+m.host+"/";this.context=j;this.base=l;this.syc=i+"";this.icons=i+"icon";this.publicApi=i+"api";this.rest=k;this.resource=k+"resource";this.preview=k+"preview";this.preview2=k+"preview2";this.data=k+"data";this.service=h;this.coreService=h+"core";this.interactionService=h+"interaction";this.actionService=h+"action";this.navigationService=h+"navigation";this.globalsettingsService=h+"globalsettings";this.propertiesCategoryConfig=h+"configfile/CATSmmWebPropCategories.json";this.jobService=h+"job";this.auth=i+"auth";this.event="ws"+i.substring(4)+"event";this.nls=i+"nls/";this.fullPage=j+"webapps/CATSmmUI/NavigationFullPage.html"}g.prototype.resolveUrl=function(h){if(h.indexOf(f.SYC_CONTEXT_MACRO)===0){return this.context.substring(0,this.context.length-1)+h.substring(f.SYC_CONTEXT_MACRO.length)}return h};g.prototype.resolveUrlInHtml=function(i){var h=a(i,f.SYC_CONTEXT_MACRO,this.context.substring(0,this.context.length-1));h=a(h,encodeURIComponent(f.SYC_CONTEXT_MACRO),encodeURIComponent(this.context.substring(0,this.context.length-1)));return h};g.prototype.getDataEntryUrl=function(i,h){return this.data+i+"?entry="+encodeURIComponent(h)};g.fromLocation=function(h){var k=document.createElement("a");k.href=h;var j=k.pathname.split("/");if(j.length>0&&j[0]===""){j.splice(0,1)}var i=k.protocol+"//"+k.host+"/"+j.slice(0,-3).join("/");return new g(i)};return g}());function c(g){return g.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")}function a(g,i,h){return g.replace(new RegExp(c(i),"g"),h)}return b});define("DS/CATSmmJsApi/Request",["require","exports","DS/CATSmmJsApi/JobReport","DS/CATSmmJsApi/Constants","DS/CATSmmJsApi/Utils","DS/WAFData/WAFData"],function(c,b,h,f,g,a){function e(i){if(window.hasOwnProperty("widget")&&widget.lang){if(!i.headers){i.headers={}}i.headers["Accept-Language"]=widget.lang}}var d=(function(){function i(j){this.config=j}i.prototype.getGlobalSettings=function(m,l){var k=this.config.globalsettingsService;var j={method:"GET",responseType:"json",onComplete:m,onFailure:l,headers:{Accept:"application/json"},timeout:0};a.authenticatedRequest(k,j)};i.prototype.getPropertiesCategoryConfig=function(m,l){var k=this.config.propertiesCategoryConfig;var j={method:"GET",responseType:"json",onComplete:m,onFailure:l,headers:{Accept:"application/json"},timeout:0};a.authenticatedRequest(k,j)};i.prototype.prepareInteractionRequestWithFiles=function(s,j,l,o,m,p){var r={};r[f.URI_PARAM_CONTEXT]=l.join(",");var k=this.config.interactionService+g.encodeQuery(r);var n=new FormData();n.append("interaction",JSON.stringify(s));for(var q=0;q<j.length;q++){n.append(j[q].name,j[q])}var t={method:"POST",data:n,responseType:"json",onComplete:o,onFailure:m,onUploadProgress:p,headers:{Accept:"application/json"},timeout:0};e(t);return{url:k,options:t}};i.prototype.prepareInteractionRequest2=function(r,t,k,l,o,m,p){var s={};s[f.URI_PARAM_CONTEXT]=l.join(",");var j=this.config.interactionService+g.encodeQuery(s);var n=new FormData();if(r){n.append("actionCall",JSON.stringify(r))}n.append("interaction",JSON.stringify(t));if(k){for(var q=0;q<k.length;q++){n.append(k[q].name,k[q])}}var u={method:"POST",data:n,responseType:"json",onComplete:o,onFailure:m,onUploadProgress:p,headers:{Accept:"application/json"},timeout:0};e(u);return{url:j,options:u}};i.prototype.prepareInteractionRequest=function(j,m,p,n){var o={};o[f.URI_PARAM_CONTEXT]=m.join(",");var l=this.config.interactionService+g.encodeQuery(o);var k={method:"POST",data:JSON.stringify(j),responseType:"json",onComplete:p,onFailure:n,headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json"},timeout:0};e(k);return{url:l,options:k}};i.prototype.prepareJobReportRequest=function(p,j,o,m){var n={};n[f.URI_PARAM_FROM_MESSAGE]=""+j;n.id=p;var l=this.config.jobService+g.encodeQuery(n);var k={method:"GET",responseType:"json",onComplete:function(q,r){return o(h.from(q),r)},onFailure:m,headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json"},timeout:0};e(k);return{url:l,options:k}};i.prototype.prepareJobReportsRequest=function(m,l){var k=this.config.jobService;var j={method:"GET",responseType:"json",onComplete:m,onFailure:l,headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json"},timeout:0};e(j);return{url:k,options:j}};i.prototype.prepareActionRequest=function(l,m,p,n){var o={};o[f.URI_PARAM_CONTEXT]=m.join(",");var k=this.config.actionService+g.encodeQuery(o);var j={method:"POST",data:JSON.stringify(l),responseType:"json",onComplete:p,onFailure:n,headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json"},timeout:0};e(j);return{url:k,options:j}};i.prototype.prepareGetDataEntries=function(n,m,l){var k=this.config.data+n;var j={method:"GET",responseType:"json",onComplete:m,onFailure:l,headers:{Accept:"application/json"},timeout:0};e(j);return{url:k,options:j}};i.prototype.prepareGetDataRequest=function(q,n,l,p,m,o){var k=this.config.data+q+"?entry="+n;var j={method:"GET",responseType:l,onComplete:p,onFailure:function(t,r,v){var s;try{if(r){s=JSON.parse(r)}}catch(u){}finally{if(m){m(t,s,v)}}},onProgress:o,timeout:0};e(j);return{url:k,options:j}};i.prototype.prepareModifyDataRequest=function(q,m,n,p,l,o){var k=this.config.data+q+"?entry="+m;var j={method:"PUT",data:n,onComplete:p,onFailure:l,onUploadProgress:o,timeout:0};e(j);return{url:k,options:j}};i.prototype.uploadFiles=function(k,m,o,l,n){var j={method:"PUT",data:m[0],type:"json",onComplete:o,onFailure:l,onUploadProgress:n,timeout:0};e(j);a.authenticatedRequest(k,j)};i.prototype.prepareResourceRequest=function(q,m,l,p,n){var o={};o[f.URI_PARAM_SELECTOR]=m.join(",");o[f.URI_PARAM_CONTEXT]=l.join(",");var k=this.config.resource+q+g.encodeQuery(o);var j={method:"GET",responseType:"json",onComplete:function(r,s){r.unshift({subjectId:q,predicate:"http://www.3ds.com/vocabularies/syc/sycId",objectValue:q,objectType:f.XSD_string});p(r,s)},onFailure:n,headers:{Accept:"application/json"},timeout:0};e(j);return{url:k,options:j}};i.prototype.preparePreviewRequest=function(p,s,n,r,t,k,m,l){var q={};q[f.URI_PARAM_PREVIEW_TYPES]=r.join(",");if(s&&s.selection&&s.selection.length>0){q[f.URI_PARAM_PREVIEW_OPTIONS_SELECTION]=s.selection.join(",")}if(n||s){q[f.URI_PARAM_PREVIEW_EXTRA_OPTIONS]=JSON.stringify(Object.assign({},s?s.specific:undefined,n))}if(t){q[f.URI_PARAM_PREVIEW_LAYER_TAG]=t.join(",")}if(k){q[f.URI_PARAM_CONTEXT]=k.join(",")}var j=this.config.preview+p+g.encodeQuery(q);var o={method:"GET",responseType:"json",onComplete:function(u,v){u.id=p;m(u,v)},onFailure:l,headers:{Accept:"application/json"},timeout:0};e(o);return{url:j,options:o}};return i}());return d});define("DS/CATSmmJsApi/Client",["require","exports","DS/CATSmmJsApi/Config","DS/CATSmmJsApi/Request","DS/CATSmmJsApi/Rdf","DS/CATSmmJsApi/Constants","DS/CATSmmJsApi/Utils","DS/WAFData/WAFData","DS/WebappsUtils/Promise"],function(g,i,c,a,m,b,l,p,o){var n=[b.PreviewFormat.Html,b.PreviewFormat.HtmlCanvas];var j={loaded:0,loading:1};function f(r){if(window.hasOwnProperty("widget")&&widget.lang){if(!r.headers){r.headers={}}r.headers["Accept-Language"]=widget.lang}}var e=(function(){function r(s){this.display=true;this.validityPeriod=3000;if(!s){this.config=c.fromLocation(location.href)}else{this.config=s}this.request=new a(this.config);this.clearCache();this._context=[];this._optionsCache={}}r.prototype.getPreviewOptions=function(s){return this._optionsCache[s]};r.prototype.setPreviewOptions=function(t,s){this._optionsCache[t]=s};r.prototype.wrapRequest=function(u,t,s){};r.prototype.getContext=function(){return this._context.slice()};r.prototype.setContext=function(s){if(!s){s=[]}if(k(this._context,s)){return}this._context=s.slice();this.clearCache()};r.prototype.clearCache=function(){this._models={}};r.prototype.displayMode=function(s){if(this.display){var t=s.slice();t.push(b.Selectors.display);return t}return s};r.prototype._getJson=function(s,u,t){return new o(function(x,w){var v={method:"GET",responseType:"json",onComplete:function(y,z){if(u){u(y,z)}x(d({url:s,ok:true,headers:z,data:y}))},onFailure:function(z,y,A){if(t){t(z,y,A)}x(d({url:s,ok:false,headers:A,error:z,data:y}))},headers:{Accept:"application/json"},timeout:0};f(v);p.authenticatedRequest(s,v)})};r.prototype._postJson=function(s,u,v,t){return new o(function(y,x){var w={method:"POST",responseType:"json",data:JSON.stringify(u),onComplete:function(z,A){if(v){v(z,A)}y(d({url:s,ok:true,headers:A,data:z}))},onFailure:function(A,z,B){if(t){t(A,z,B)}y(d({url:s,ok:false,headers:B,error:A,data:z}))},headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json"},timeout:0};f(w);p.authenticatedRequest(s,w)})};r.prototype.getGlobalSettings=function(t,s){return this._getJson(this.config.globalsettingsService,t,s)};r.prototype.getPropertiesCategoryConfig=function(t,s){return this._getJson(this.config.propertiesCategoryConfig,t,s)};r.prototype.getPreviewIds=function(u,v,s){var w=this;var t=function(x,D){var z=[];for(var B=0,y=x.bySubject(u);B<y.length;B++){var A=y[B];if(A.predicate===b.P_SYC_HAS_PREVIEW&&A.objectId){z.push(A.objectId)}}var C=z.map(function(E){return l.getResourceInfo(E,x.bySubject(E),w.config)});v(C,D)};this.getResource(u,[b.Selectors.previews],t,s)};r.prototype.getPreviewData=function(t){var u={};if(t.preferredFormats){u[b.URI_PARAM_PREVIEW_TYPES]=t.preferredFormats.join(",")}if(t.options&&t.options.selection&&t.options.selection.length>0){u[b.URI_PARAM_PREVIEW_OPTIONS_SELECTION]=t.options.selection.join(",")}if(t.extraOptions||t.options){u[b.URI_PARAM_PREVIEW_EXTRA_OPTIONS]=JSON.stringify(Object.assign({},t.options?t.options.specific:undefined,t.extraOptions))}if(t.tags){u[b.URI_PARAM_PREVIEW_LAYER_TAG]=t.tags.join(",")}if(this._context){u[b.URI_PARAM_CONTEXT]=this._context.join(",")}var s=this.config.preview+t.previewId+l.encodeQuery(u);return new o(function(x,w){var v={method:"GET",responseType:"text",onComplete:function(y,z){x(d({url:s,ok:true,headers:z,data:y}))},onFailure:function(z,y,A){x(d({url:s,ok:false,headers:A,error:z,data:y}))},headers:t.headers,timeout:0};f(v);p.authenticatedRequest(s,v)})};r.prototype.getPreviewWithOptions=function(w,z,v,y,A,u,t){if(this.overridePreviewOptions){v=v||{};for(var x in this.overridePreviewOptions){if(this.overridePreviewOptions.hasOwnProperty(x)){v[x]=this.overridePreviewOptions[x]}}}var s=this.request.preparePreviewRequest(w,z,v,y,A,this.getContext(),u,t);this.wrapRequest(s.url,s.options,this.config);p.authenticatedRequest(s.url,s.options)};r.prototype.getPreview=function(s,w,u,v,t){this.getPreviewWithOptions(s,this.getPreviewOptions(s),u,n,null,function(x,y){x.resourceId=w;v(x,y)},t)};r.prototype.requestPreview=function(s){var t=this.config.preview2;return this._postJson(t,s).then(function(u){if(u.ok){var v=u.data;v.id=s.preview.id;return v}else{throw u.data}})};r.prototype.callCoreService=function(t,w,u){var v={};v[b.URI_PARAM_CONTEXT]=this.getContext().join(",");var s=this.config.coreService+l.encodeQuery(v);return this._postJson(s,t,w,u)};r.prototype.callInteractionService=function(s,v,u){var t=this.request.prepareInteractionRequest(s,this.getContext(),v,u);this.wrapRequest(t.url,t.options,this.config);p.authenticatedRequest(t.url,t.options)};r.prototype.callInteractionServiceWithFiles=function(s,v,x,u,w){var t=this.request.prepareInteractionRequestWithFiles(s,v,this._context,x,u,w);this.wrapRequest(t.url,t.options,this.config);p.authenticatedRequest(t.url,t.options)};r.prototype.callInteractionService2=function(t,s,v,x,u,w){var y=this;return new o(function(D,C){var z=function(F,E,G){if(u){u(F,E,G)}C(E?E:F)};var B=function(E,F){if(x){x(E,F)}D(E)};var A=y.request.prepareInteractionRequest2(t,s,v,y._context,B,z,w);y.wrapRequest(A.url,A.options,y.config);p.authenticatedRequest(A.url,A.options)})};r.prototype.callActionService=function(s,v,u){var t=this.request.prepareActionRequest(s,this._context,v,u);this.wrapRequest(t.url,t.options,this.config);p.authenticatedRequest(t.url,t.options)};r.prototype.callNavigationService=function(s,w,u){var v={};v[b.URI_PARAM_CONTEXT]=this.getContext().join(",");var t=this.config.navigationService+l.encodeQuery(v);return this._postJson(t,s).then(function(z){if(z.ok){var y=z.json().then(function(A){return new m.Model(A)});z.json=function(){return y};if(w){z.json().then(function(A){return w(A,z.headers)})}}else{var x=z.error;if(x&&u){z.json().then(function(A){return u(x,A,z.headers)})}}return z})};r.prototype.requestPublicApiRes=function(t){var s=this.config.publicApi+"/"+t.serviceName+"/v"+t.version+"/res"+t.resource+l.encodeQuery(t.query||{});return new o(function(w,v){var u={method:t.method,responseType:t.responseType,data:t.data,onComplete:function(x,y){w(d({url:s,ok:true,headers:y,data:x}))},onFailure:function(y,x,z){w(d({url:s,ok:false,headers:z,error:y,data:x}))},headers:t.headers,timeout:0};f(u);p.authenticatedRequest(s,u)})};r.prototype.getJobReport=function(t,s,w,v){var u=this.request.prepareJobReportRequest(t,s,w,v);this.wrapRequest(u.url,u.options,this.config);p.authenticatedRequest(u.url,u.options)};r.prototype.getJobReports=function(u,t){var s=this.request.prepareJobReportsRequest(u,t);this.wrapRequest(s.url,s.options,this.config);p.authenticatedRequest(s.url,s.options)};r.prototype.getData=function(y,v,s,x,u,w){var t=this.request.prepareGetDataRequest(y,v,s,x,u,w);this.wrapRequest(t.url,t.options,this.config);p.authenticatedRequest(t.url,t.options)};r.prototype.getDataEntries=function(v,u,t){var s=this.request.prepareGetDataEntries(v,u,t);this.wrapRequest(s.url,s.options,this.config);p.authenticatedRequest(s.url,s.options)};r.prototype.modifyData=function(y,u,v,x,t,w){var s=this.request.prepareModifyDataRequest(y,u,v,x,t,w);this.wrapRequest(s.url,s.options,this.config);p.authenticatedRequest(s.url,s.options)};r.prototype.getResource=function(x,u,y,v){var z=this;if(x===null||x===undefined){var w="Resource is null or undefined";if(v){v(new Error(w),undefined,{})}return o.reject(w)}var t=new Date().getTime();var s=this._models[x];if(s&&s.state===j.loading&&h(s.selectors,u)){if(y){s.pendingsComplete.push(y)}if(v){s.pendingsFailure.push(v)}return s.promise}else{if(s&&s.state===j.loaded&&(t-s.timestamp)<=this.validityPeriod&&h(s.selectors,u)){if(y){setTimeout(function(){return y(s.statements,{})},0)}return s.promise}else{s={timestamp:t,statements:new m.Model(),state:j.loading,selectors:u,pendingsComplete:[],pendingsFailure:[],promise:new o(function(A){})};s.promise=new o(function(E,D){if(y){s.pendingsComplete.push(y)}if(v){s.pendingsFailure.push(v)}var B=u.length===1&&u[0]===b.Selectors.path;if(!B){z._models[x]=s}var F=function(G,K){s.timestamp=new Date().getTime();s.statements.pushAll(G);s.state=j.loaded;for(var I=0,H=s.pendingsComplete;I<H.length;I++){var J=H[I];J(s.statements,K)}s.pendingsComplete=[];E(d({url:C.url,ok:true,headers:K,data:s.statements}))};var A=function(H,L,K){delete z._models[x];for(var J=0,I=s.pendingsFailure;J<I.length;J++){var G=I[J];G(H,L,K)}E(d({url:C.url,ok:false,headers:K,error:H,data:L}))};var C=z.request.prepareResourceRequest(x,z.displayMode(u),z._context,F,A);z.wrapRequest(C.url,C.options,z.config);p.authenticatedRequest(C.url,C.options)});return s.promise}}};return r}());function q(r){return function(s,t){r(new m.Model(s),t)}}function h(s,r){if(s===r){return true}if(!s||!r){return false}for(var t=0;t<r.length;t++){if(s.indexOf(r[t])===-1){return false}}return true}function k(s,r){if(s===r){return true}if(!s||!r){return false}if(s.length===r.length){for(var t=0;t<s.length;t++){if(s[t]!==r[t]){return false}}return true}return false}function d(s){var u=function(){return new o(function(z,y){if(typeof s.data==="string"){z(JSON.parse(s.data))}else{if(s.data instanceof Blob){var x=new FileReader();x.onloadend=function(){if(typeof x.result==="string"){z(JSON.parse(x.result))}};x.readAsText(s.data)}else{if(s.data instanceof ArrayBuffer){var v=new Blob([s.data]);var w=new FileReader();w.onloadend=function(){if(typeof w.result==="string"){z(JSON.parse(w.result))}};w.readAsText(v)}else{z(s.data)}}}})};var t=function(){var v=r.error;if(!v){return o.reject("No error")}return u().then(function(w){if(w.detailedMessage){return w.detailedMessage}else{if(w.message){return w.message}}throw new Error()})["catch"](function(){return v.toString()})};var r=s;r.json=u;r.errorMessage=t;return r}return e});