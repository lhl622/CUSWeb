var __extends=(this&&this.__extends)||(function(){var a=Object.setPrototypeOf||({__proto__:[]} instanceof Array&&function(e,c){e.__proto__=c})||function(f,c){for(var e in c){if(c.hasOwnProperty(e)){f[e]=c[e]}}};return function(f,c){a(f,c);function e(){this.constructor=f}f.prototype=c===null?Object.create(c):(e.prototype=c.prototype,new e())}})();define("DS/SMAProcWebCommonControls/HelpIcon",["require","exports","DS/SMAProcSP/CustomElementsEs5Adapter"],function(c,b,d){var a=(function(f){__extends(e,f);function e(){var g=f.call(this)||this;console.info("HelpIcon constructor using adapter: "+d);g.path="";g.topic="";return g}e.prototype.connectedCallback=function(){console.info("HelpIcon connectedCallback");this.updateHTML()};e.prototype.updateHTML=function(){var h="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAA7VBMVEUAAABNhp9LhJxLhJwbVG1IgZobVGxQiaE1bYYxaYIWTWdPiaE5costZX5Nh6BEfZYiWXIXT2hQiaE9do8pYnoVTGYbU2tBeZMmXXYVTWYeVm4YUGlLhJ0gV3AWTWcVTWf///9oqcV0tdFvsMx6vNh2uNRxs89srcl9wNyFyeVrqsWCxuJZlrBNiaOLz+vR4Od/w996utZopsFenbhbmrRWlK5TkKlHgptFgJn2+fqjwc5ambNRjKVDfpfo8POHy+eBxN98v9qnxdJxs81ur8pjo75hn7mGyuawy9advsyYuslKhZ9JhJ06dY85c40QErP8AAAAIHRSTlMAXksLC9nZ8vLy8tHR0bGxsbGenp6eYFxcXEtL2dnR0XMofeYAAAEESURBVBjTdczXcoMwFEVRMMW9dztFtACid2PA3U7P/39OrhgyefJ60Zk9d0Tdx9Cjdr3eHtHMf6v1sKzbtu75vdpfox80+2zmMdZtmaOrO+6g++87lJ58d3/kylum7+3xCRFvvq6LffLv/PZqZA5yrA+0iw3DCOcQx5JxuOSOKeUpslzXxWOIHU/TNDVSzS1KLZhiB2LjKBORg9D2BkNpQGx6CvEFLRRhiE2I3YsiggSh5EwG7kKcBC+EmSRmObIJxMWnRGwQ2pSjWEBkB4EKSCRvNmApsHoMsCDERRELghDwK6o04yOhEvEzqrIeflvh9RpaP8N1lQC7nD61Ws/TJUvd9Qv+eSmeZ70KEAAAAABJRU5ErkJggg==";var g="https://help.3ds.com/2018x/English/DSDoc/"+this.path;var i=this.topic?"See help related to: "+this.topic:"";this.innerHTML='<a href="'+g+'" target="_blank" title="'+i+'"><img src="'+h+'" style="height:20px;width:20px;" alt="" /></a>'};Object.defineProperty(e,"observedAttributes",{get:function(){return["path","topic"]},enumerable:true,configurable:true});e.prototype.attributeChangedCallback=function(h,g,i){console.info("attributeChangedCallback:",h,g,i);switch(h){case"path":if(this.path!==i){this.path=i}break;case"topic":if(this.topic!==i){this.topic=i}break}this.updateHTML()};return e}(HTMLElement));customElements.define("pcw-help-icon",a);return a});require.config({paths:{ace:require.toUrl("DS/SMAProcSPEditorlib/ace/src").split("?")[0]},bundles:{"ace/ace":["ace/range","ace/mode/text","ace/lib/oop","ace/mode/text_highlight_rules"]}});define("DS/SMAProcWebCommonControls/ext/mode-pcw",["ace/ace","ace/range","ace/mode/text","ace/lib/oop","ace/mode/text_highlight_rules"],function(f,d,e,h,c){var b=e.Mode;var a=function(){this.$rules={start:[{token:"comment",regex:/^#.+$/},{token:"invalid",regex:"\\.{2,}"},{token:"keyword.operator",regex:/-+\/\*%^/},{token:"paren.lparen",regex:"[\\[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"constant.numeric",regex:"[+-]?\\d+\\b"},{token:"keyword",regex:/if|eig|inv|lu|abs|ceil|exp|fact|floor|ln|log10|power|rand|round|sqrt|absMax|absMin|absSum|max|mean|min|stdDev|sum|cos|cot|csc|sec|sin|tan/},{token:"constant.language",regex:/pi|e/},{token:"variable.parameter",regex:"\\b\\w+\\b"},{caseInsensitive:true}]}};h.inherits(a,c.TextHighlightRules);function g(){this.HighlightRules=a}h.inherits(g,b);(function(){this.lineCommentStart="#";this.getNextLineIndent=function(l,j,k){var i=this.$getIndent(j);return i};this.$id="ace/mode/pcw"}).call(g.prototype);return g});define("DS/SMAProcWebCommonControls/SMAProcWebCommonControls",{});define("DS/SMAProcWebCommonControls/ext/aceBehavior",[],function(){return{focus:function(){this.__aceEditor().focus()},insertAtCursorPosition:function(a){this.__aceEditor().insert(a)},showError:function(c,a,b){this.__aceEditor().getSession().setAnnotations([{row:c,column:a,text:b,type:"error"}])},clearError:function(){this.__aceEditor().getSession().clearAnnotations()},getEditorValue:function(){return this.__aceEditor().getValue()}}});(function(a){if(a.Polymer){define("DS/SMAProcWebCommonControls/Polymer",[],function(){return a.Polymer})}else{define("DS/SMAProcWebCommonControls/Polymer",["DS/SMAProcWebCommonControls/import!DS/Polymer-1.1.4/polymer.html"],function(){return a.Polymer})}})(this);
/*! Copyright 2016 Dassault Systèmes */
if(typeof WebComponents!=="undefined"){define("DS/SMAProcWebCommonControls/WebComponents",[],function(){return WebComponents})}else{if(require.toUrl("DS/SMAProcWebCommonControls/VENWebComponents").indexOf("webcomponents-lite.min")===-1){(function(){var a=require.toUrl("DS/Polymer-1.11.3/webcomponents-lite.min");if(a.indexOf("?")>-1){a=a.substring(0,a.indexOf("?"))}require.config({paths:{"DS/SMAProcWebCommonControls/VENWebComponents":a},shim:{"DS/SMAProcWebCommonControls/VENWebComponents":{exports:"WebComponents"}}})})()}}define("DS/SMAProcWebCommonControls/WebComponents",["DS/SMAProcWebCommonControls/VENWebComponents"],function(a){return a});define("DS/SMAProcWebCommonControls/import",["DS/SMAProcWebCommonControls/WebComponents"],function(){if(typeof window==="undefined"){return{load:function(c,a,b){a([c],b)}}}return{load:function(c,a,e){var d=require.toUrl(c).replace(/\?debug_me$/,"");var b=document.createElement("link");b.rel="import";b.href=d;b.onload=e;b.onerror=e.error;document.head.appendChild(b)}}});define("DS/SMAProcWebCommonControls/utils",["require","exports","DS/SMAProcWebCommonControls/Polymer"],function(b,a,c){return{registerDomModule:function(f){if(typeof f!=="string"){console.error("registerDomModule called with a non string template",f);return}var d=document.createElement("div");d.style.display="none";var g=/<dom-module id=["']([^"']+)["']/.exec(f);d.title="registerDomModule: "+(g?g[1]:"unknown");d.innerHTML=f;c.dom(document.body).appendChild(d);try{c.dom.flush()}catch(h){}},importHtml:function(d){var e=new Error("Failed to import: "+d);return new Promise(function(g,f){window.require(["DS/SMAProcWebCommonControls/import!"+d],g,function(h){e.originalError=h;f(e)})})}}});define("DS/SMAProcWebCommonControls/VariableInput",["DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","DS/SMAProcWebCMMUtils/SMAJSCMMUtils"],function(d,b,c){var a='<dom-module id="pcw-variable-input"><template><style>:host { display: block; min-width: 300px;}:host([hidden]) { display: none; }label { display: flex; margin-bottom: 10px; font-weight: normal;}label>span {  display: inline-block; width: 250px; text-align: left; }input { flex: auto; border-radius:5px; border: 1px solid #b4b6ba; min-width: 50px; height:22px; padding-left: 5px;}input[type=checkbox] { flex: none; min-width: unset;}pcw-variable-input { margin-left: 20px }</style><label><span>[[variableName]]</span><input id="variableValue" type="[[inputType]]" value="[[value]]" required$="[[required]]" disabled$="[[disabled]]" readonly$="[[readonly]]"></label><template is="dom-repeat" items="[[subProperties]]"><pcw-variable-input variable="[[item]]" required$="[[required]]" disabled$="[[disabled]]" readonly$="[[readonly]]"></pcw-variable-input></template></template></dom-module>';b.registerDomModule(a);return d({is:"pcw-variable-input",properties:{variableName:{type:String},variable:{type:Object,observer:"_VariableChanged"},value:{type:String,reflectToAttribute:true,readOnly:true,notify:true},inputType:{type:String,readOnly:true},subProperties:{type:Array,readOnly:true},inputOnly:{type:Boolean},readonly:{type:Boolean},disabled:{type:Boolean},required:{type:Boolean}},listeners:{"variableValue.change":"_variableValueChanged"},ready:function(){if(this.variable){this._VariableChanged()}},setVariable:function(e){if(!e){return}this.variable=e},_VariableChanged:function(){var g=this.variable;this.variableName=g.getDisplayName?g.getDisplayName():null;this.variableName=this.variableName||(g.getName?g.getName():null);var f=g.getStructure?g.getStructure():null;if(f===c.Structure.Array){this.disabled=true;this._setValue("Arrays are not supported");return}if(f===c.Structure.Aggregate){this.disabled=true;this._setInputType("hidden");var j=g.getProperties?g.getProperties():[];if(j.length===0){this._setInputType("text");this._setValue("No sub-properties")}this._setSubProperties(j);return}var h=null;try{h=g.getValue?g.getValue():null;this._setValue(h)}catch(i){console.warn("Failed to get value: ",i)}this.datatype=g.getDataType?g.getDataType():null;this.datasubtype=g.getDataSubType()?g.getDataSubType():null;switch(this.datatype){case c.DataType.File:this.disabled=true;this._setValue("Files are not supported");break;case c.DataType.PLMObject:this.disabled=true;this._setValue("Object are not supported");break;case c.DataType.Real:case c.DataType.Integer:this._setInputType("number");break;case c.DataType.Boolean:this._setInputType("checkbox");if(h===true){this.$.variableValue.setAttribute("checked","")}else{this.$.variableValue.removeAttribute("checked")}break;case c.DataType.String:if(this.datasubtype==="multiline"){this.disabled=true;this._setValue("Multiline text is not supported");break}default:this._setInputType("text")}},_variableValueChanged:function(h){console.log("_variableValueChanged",h);if(h){h.stopPropagation();h.preventDefault();var g=h.target.value;if(h.target.type==="checkbox"){g=h.target.checked}var f=this.variable;if(f&&!this.readonly&&!this.disabled){f._setValueFromString(g)}}}})});define("DS/SMAProcWebCommonControls/ExtensionChooser",["DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","DS/SMAProcWebCMMUtils/SMAJSCMMAuthoringUtils","require"],function(d,b,c){var e="pcw-extension-selected";var a='<dom-module id="pcw-extension-chooser"><template><style>:host { display: inline-block; margin: 5px; padding: 0; height:22px; font: 12px Arial, sans-serif;}:host([hidden]) { display: none; }label {vertical-align: text-bottom; font-weight: normal; height:inherit;}select { -webkit-appearance: none; -moz-appearance: none; border-radius:5px; border: 1px solid #b4b6ba; min-width: 50px; height:inherit;}select::-ms-expand { display: none; }select { padding: 0 20px 0 10px; background: no-repeat right center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAQAAAC7znxOAAAAFklEQVQI12NgwAr+o0AMQQyVGNpxAwBCaA/x9bix8gAAAABJRU5ErkJggg==); background-position-x: calc(100% - 3px); }select[disabled] { background-color: rgb(235, 235, 228); }</style><label><span>[[chooserlabel]]</span><select id="extensionSelect" disabled$="[[disabled]]" readonly$="[[readonly]]"><option disabled selected>Loading...</option></select></label><img id="progressIcon" src="{{_getAssetUrl(\'I_OptRunning.gif\')}} style="vertical-align: text-bottom; display:none"></template></dom-module>';b.registerDomModule(a);return d({is:"pcw-extension-chooser",properties:{selectedExtension:{type:String,notify:true,observer:"_selectedExtensionChanged",reflectToAttribute:true},extensions:{type:String,observer:"_populateExtensionsDropdown",reflectToAttribute:true},pluginType:{type:String,observer:"_getExtensionDescriptorsByPluginType",reflectToAttribute:true},chooserlabel:{type:String,value:"Technique: ",reflectToAttribute:true},readonly:{type:Boolean,reflectToAttribute:true},disabled:{type:Boolean,reflectToAttribute:true}},listeners:{"extensionSelect.change":"_selectedExtensionUIChanged"},ready:function(){},_getExtensionDescriptorsByPluginType:function(){var f=this,g=new Promise(function(i,h){c.getExtensionsByPluginType(f.pluginType,{onSuccess:i,onFailure:h})});f.isReady=false;this.$.progressIcon.style.display="";g.then(function(h){f.extensions=h.join(", ")},function(h){console.warn("<"+f.is+"> Error retrieving extension information:"+h)})},_populateExtensionsDropdown:function(){var h=this;var g=(this.extensions||"").split(/, */).filter(function(i){return i});var f=g.map(c.getExtensionDescriptor);Promise.all(f).then(function(k){console.log("<"+h.is+"> fetched descriptors:",k);var i=h.$.extensionSelect;var j=h.selectedExtension;var l=false;i.innerHTML="<option disabled"+(j?"":" selected")+">Please select...</option>";k.forEach(function(p){var m=p.getExtensionName();var q=p.getTitle();var o=p.getDescription();var n=document.createElement("option");n.textContent=q;n.value=m;n.title=o;n.descriptor=p;i.appendChild(n);l=l||(m===j)});if(l){h.selectedExtension=i.value=j;h._handleExtensionSelectedAndFireEvent()}h.isReady=true;h.$.progressIcon.style.display="none"},function(i){console.warn("<"+h.is+"> Error retrieving extension information:"+i);h.$.progressIcon.style.display="none"})},_selectedExtensionChanged:function(){if(this.$.extensionSelect.value!==this.selectedExtension){this.$.extensionSelect.value=this.selectedExtension}},_selectedExtensionUIChanged:function(){this.selectedExtension=this.$.extensionSelect.value;this._handleExtensionSelectedAndFireEvent()},_handleExtensionSelectedAndFireEvent:function(){if(this.selectedExtension){this.fire(e,{value:this.$.extensionSelect.value})}},_getAssetUrl:function(f){return require.toUrl("DS/SMAProcWebCommonControls/assets/"+f)},})});define("DS/SMAProcWebCommonControls/FileChooser",["DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","DS/SMAProcWebCommonControls/import!DS/SMAProcWebAuthoringUtils/cmp-file-selection/cmp-file-selection.html"],function(d,b){var c="pcw-file-selected";var a='<dom-module id="pcw-file-chooser"><template><style>:host { display:block; width:180px; }:host([hidden]) { display: none; } #fileSelector {width:inherit;}</style><cmp-file-selection disabled="[[disabled]]" id="fileSelector" filetypes$="[[filetypes]]" action-type="[[actionType]]"></cmp-file-selection></template>';b.registerDomModule(a);return d({is:"pcw-file-chooser",properties:{filetypes:{type:String,reflectToAttribute:true},activity:{type:Object,observer:"setActivity"},dataHandlerConfigurationString:{type:String,notify:true,observer:"setDataHandlerConfigurationString"},actionType:{type:String,value:"download"},disabled:{type:Boolean,value:false,reflectToAttribute:true}},listeners:{"fileSelector.fileselected":"_fileSelectChanged"},setActivity:function(e){this.$.fileSelector.activity=e},getSelectedFileName:function(){var e=this.$.fileSelector.getSelectedFile();return e&&e.getName()||null},setDataHandlerConfigurationString:function(e){this.$.fileSelector.datahandlerconfigstring=e},getDataHandlerConfigurationString:function(){return this.$.fileSelector.datahandlerconfigstring},downloadSelectedFile:function(){var f=this.$.fileSelector;var e=new Error("Error during file download");return new Promise(function(m,n){var h="filedownloaded";var g="filenotdownloaded";var l="multiplefilesfound";function j(){if(f){f.removeEventListener(h,i);f.removeEventListener(g,o);f.removeEventListener(l,k)}}function i(p){j();m(p.target._fileObj)}f.addEventListener(h,i);function o(p){j();e.message="Failed to download the selected file:"+p;n(e)}f.addEventListener(g,o);function k(){j();e.message="Pattern matches multiple files.";n(e)}f.addEventListener(l,k);f.getSelectedFileDownloaded()})},_fileSelectChanged:function(e){e.stopPropagation();this.fire(c,{datahandlerconfig:this.$.fileSelector.datahandlerconfigstring})}})});define("DS/SMAProcWebCommonControls/ExpressionControls",["DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","DS/SMAProcWebCMMCalculator/SMAProcWebCMMCalcSymbols","DS/SMAProcWebCMMCalculator/SMAProcWebCMMCalcFunctions","text!DS/SMAProcWebCommonControls/ExpressionControls.html"],function(e,a,f,d,c){a.registerDomModule(c);var b=/%20/g;return e({is:"pcw-expression-ctrl",properties:{context:{observer:"_updateParameters",type:Object}},listeners:{onSelect:"_handleSelect"},_handleSelect:function(g){console.log(g.detail)},_updateParameters:function(){var g=this.context||{};if(typeof g==="string"){console.error("<"+this.is+">: context should be an object. Will fallback on JSON parsing for string: "+g);try{g=JSON.parse(g)}catch(i){g={};console.warn("<"+this.is+">: context string could not be parsed",i)}}this.parameters=Object.keys(g).map(function(j){var k="'"+j.replace(b," ")+"'";return{name:k,value:k}});this.parameters.unshift({name:"select",value:"",});e.dom(this.$.paramChooser).innerHTML="";var h=this;this.parameters.forEach(function(k){var j=document.createElement("option");j.value=k.value;j.innerText=k.name;e.dom(h.$.paramChooser).appendChild(j)})},ready:function(){var i=this;function g(m,n,l,p){var o=[{name:"select",value:""}];var k=document.createElement("option");k.value="";k.innerText="select";e.dom(m).appendChild(k);Object.keys(n).forEach(function(t){var s=n[t];var q=document.createElement("optgroup");q.label=t;var r=o.length;Object.keys(s).forEach(function(u){if(!l||s[u].display==="YES"){var w=p(s,u);var v=document.createElement("option");v.value=u;v.innerText=w;e.dom(q).appendChild(v);o.push({name:u,value:w})}});if(r<o.length){e.dom(m).appendChild(q)}});return o}var h=f.symbolTable.Supported;i.operators=g(this.$.operatorsChooser,h,true,function(l,k){return k});var j=d.functionTable.SupportedFunctions;i.functions=g(this.$.functionChooser,j,false,function(l,k){return l[k].displayName});if(i.context){i._updateParameters()}},onParamSelect:function(g){this._select(this.parameters,"parameter",g)},onOperatorSelect:function(g){this._select(this.operators,"operator",g)},onFunctionSelect:function(g){this._select(this.functions,"function",g)},_select:function(j,g,h){var i=j[h.target.selectedIndex];if(i&&i.value){this.fire("onSelect",{type:g,value:i})}h.target.selectedIndex=0}})});define("DS/SMAProcWebCommonControls/ParameterChooser",["DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","DS/SMAProcWebCMMUtils/SMAJSCMMParameterUtils","DS/SMAProcWebCMMUtils/SMAJSCMMDataContainerUtils","DS/SMAProcWebCMMUtils/SMAJSCMMUtils","DS/Logger/Logger","module","require"],function(c,l,o,f,e,h,g,i){var b="pcw-parameter-selected";var n="parent";var d="children";var k="siblings";var j=["String","Boolean","Integer","Real","Timestamp","UserType","Object","File"];var a=["Scalar","Array"];var m=["In","Out","In/Out","Neutral"];var p='<dom-module id="pcw-parameter-chooser"><template><style>:host { display: inline-block; width:320px; margin: 0;}:host([hidden]) { display: none; }.flex-container { display: flex; flex-direction: row;}.flex-container > select { flex: auto; border-radius:5px; border: 1px solid #b4b6ba; height:22px;}.flex-container > select::-ms-expand { display: none; }.flex-container > select { -webkit-appearance: none; -moz-appearance: none; padding: 0 20px 0 10px; background: no-repeat right center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAQAAAC7znxOAAAAFklEQVQI12NgwAr+o0AMQQyVGNpxAwBCaA/x9bix8gAAAABJRU5ErkJggg==); background-position-x: calc(100% - 3px); }.flex-container > select[disabled] { background-color: rgb(235, 235, 228); }.flex-container > button { margin: 0 2px; height: 22px; width:22px; border: none; background: transparent; padding: 0;}img { width: 22px; height: 22px; }</style><div class="flex-container"><select id="parameterSelect" disabled$="[[disabled]]" required$="[[required]]"><option disabled selected>Select a parameter</option></select><template is="dom-if" if="{{!autoselect}}"><button on-click="_onChooseParameter" disabled$="{{disabled}}" title="Insert selected parameter"><img src="'+i.toUrl("DS/SMAProcWebAuthoringUtils/assets/images/I_SMAWflUIInsert.png")+'" /></button></template><template is="dom-if" if="{{create}}"><button on-click="_onCreateParameter" disabled$="{{disabled}}" title="Create a new parameter and add to list"><img src="'+i.toUrl("DS/SMAProcWebAuthoringUtils/assets/images/I_SMAWflUIParameterNew.png")+'" /></button><cmp-parameter-create-modal id="paramCreateModal" datatype="[[datatype]]" structure="[[structure]]"></cmp-parameter-create-modal></template></div></template></dom-module>';l.registerDomModule(p);return c({is:"pcw-parameter-chooser",properties:{create:{type:Boolean,value:false,reflectToAttribute:true},autoselect:{type:Boolean,value:false,reflectToAttribute:true},disabled:{type:Boolean,value:false,reflectToAttribute:true},required:{type:Boolean,value:false,reflectToAttribute:true},source:{value:[n,d,k].join(" "),reflectToAttribute:true,observer:"_filterParameters"},datatype:{value:j.join(" "),reflectToAttribute:true,observer:"_filterParameters"},structure:{value:a.join(" "),reflectToAttribute:true,observer:"_filterParameters"},mode:{value:m.join(" "),reflectToAttribute:true,observer:"_filterParameters"},selectedIndex:{value:-1},_dataContainer:{type:Object,readOnly:true},_parameters:{type:Array,value:function(){return[]}}},listeners:{"parameterSelect.change":"_parameterSelectChanged","param-create-done":"_parameterCreateDialogDone",change:"stopEvent"},stopEvent:function(q){q.stopPropagation()},setActivity:function(q){h.warn("function setActivity(dataContainer) is deprecated, please use setDataContainer(dataContainer) instead");this.setDataContainer(q)},setDataContainer:function(r){r=f.getDataContainer(r);if(!this._dataContainer&&r){this._set_dataContainer(r);this._filterParameters();this.$.parameterSelect.selectedIndex=0;this.selectedIndex=-1;var q=this;this._dataContainer.registerParameterObserver(e.State.Created,function(s){if(s&&s.length>0){q._filterParameters()}});this._dataContainer.registerParameterObserver(e.State.Deleted,function(t){if(t){var s=q._parameters.indexOf(t);if(s>0){q._parameters.splice(s,1);if(s===this.selectedIndex){this.$.parameterSelect.selectedIndex=0;this.selectedIndex=-1}q._updateOptions()}}})}},selectParameterByName:function(q){(this._parameters||[]).every(function(s,r){if(q===s.getName()){this.selectedIndex=r;this.$.parameterSelect.selectedIndex=r+1;this._handleParameterSelectedAndFireEvent();return false}else{return true}},this)},getSelectedParameter:function(){var r=-2;var q=this.selectedIndex===r?this._parameters.length-1:this.selectedIndex;return{parameter:this._parameters[q],index:q}},getParameterByName:function(q){var r=null;(this._parameters||[]).every(function(t,s){if(q===t.getName()){r={parameter:t,index:s};return false}else{return true}},this);return r},getParameterNameByIndex:function(q){var r=this._parameters&&this._parameters[q];return r?r.getName():null},_onChooseParameter:function(){this.selectedIndex=this.$.parameterSelect.selectedIndex-1;if(this.selectedIndex>=0){this._handleParameterSelectedAndFireEvent()}},_onCreateParameter:function(){var q="DS/SMAProcWebAuthoringUtils/cmp-parameter-create/cmp-parameter-create-modal";var r=this;i([q],function(){var s=r.querySelector("#paramCreateModal");s.setDataContainer(r._dataContainer)})},_parameterCreateDialogDone:function(){var r=this._parameters;var q=r.length-1;this.$.parameterSelect.selectedIndex=q+1;this.selectedIndex=q;if(this.autoselect){this._handleParameterSelectedAndFireEvent()}},_parameterSelectChanged:function(){if(this.autoselect){this.selectedIndex=this.$.parameterSelect.selectedIndex-1;this._handleParameterSelectedAndFireEvent()}},_handleParameterSelectedAndFireEvent:function(){if(this.selectedIndex>=0){var q=this._parameters[this.selectedIndex];if(q&&q.getParent()!==this._dataContainer){this._parameters.splice(this._parameters.indexOf(q),1);o.addParameters([q],this._dataContainer)}this.fire(b,{parameter:q,index:this.selectedIndex})}},_filterParameters:function(){var q=function(z,y){var x=y&&y.toLowerCase&&y.toLowerCase();return z.indexOf(x)!==-1};if(this._dataContainer){var s=o.getPotentialParameters(this._dataContainer)||{};var u=s.self||[];var t=(this.source||"").split(/\s+/);if(t.indexOf(n)!==-1){u=u.concat(s.parent||[])}if(t.indexOf(d)!==-1){u=u.concat(s.children||[])}if(t.indexOf(k)!==-1){u=u.concat(s.siblings||[])}var w=this.datatype.toLowerCase().split(/[\s,]+/);var r=this.structure.toLowerCase().split(/[\s,]+/);var v=this.mode.toLowerCase().split(/[\s,]+/);this._parameters=u.filter(function(x){return q(w,x._getDataTypeName())&&q(r,x._getStructureName())&&q(v,x._getModeName())});this._updateOptions()}},_updateOptions:function(){var v=this.$.parameterSelect;var u=v.length;var q=c.dom(v);var r;for(r=1;r<u;++r){q.removeChild(q.lastChild)}var t=this._parameters.length;for(r=0;r<t;++r){var s=document.createElement("option");s.text=this._parameters[r].getName();if(this._dataContainer!==this._parameters[r].getParent()){s.text=this._parameters[r].getParent().getName()+"->"+s.text}q.appendChild(s)}if(this.selectedIndex>=0){v.selectedIndex=this.selectedIndex+1}}})});require.config({paths:{ace:require.toUrl("DS/SMAProcSPEditorlib/ace/src").split("?")[0],"ace/ext/language_tools":require.toUrl("DS/SMAProcSPEditorlib/ace/src/ext-language_tools").split("?")[0]},bundles:{"ace/ace":["ace/lib/oop","ace/lib/event_emitter","ace/lib/event","ace/lib/lang","ace/virtual_renderer","ace/config","ace/range","ace/anchor","ace/keyboard/hash_handler","ace/tokenizer","ace/lib/dom","ace/editor"]}});define("DS/SMAProcWebCommonControls/CodeEditor",["DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","DS/SMAProcWebCommonControls/ext/aceBehavior","ace/ace","DS/SMAProcWebCommonControls/ext/mode-pcw","ace/ext/language_tools"],function(g,b,a,e,f,c){var d='<dom-module id="pcw-code-editor">  <style>      * { box-sizing: border-box; }      :host {         display: block;         width: 100%;         height: 100%;      }      :host([hidden]) { display: none; }      #editor {         width: 100%;         height: 100%;         min-height: 22px;         border: 1px solid #b4b6ba;         border-radius: 4px;         font-size: 12px;         box-sizing: content-box;      }   </style>   <template>      <div id="editor"></div>   </template></dom-module>';b.registerDomModule(d);return g({is:"pcw-code-editor",properties:{expression:{type:String,observer:"_expChange",notify:true,},singleLine:{type:Boolean,reflectToAttribute:true,value:false,observer:"_updateReadonly"},readonly:{type:Boolean,reflectToAttribute:true,value:false,observer:"_updateReadonly"},autocomplete:{type:Boolean,reflectToAttribute:true,value:false,observer:"_updateAutocomplete"},maxLines:{type:Number,reflectToAttribute:true,observer:"_updateMaxLines"}},listeners:{keyup:"_stopEnterPropagation",keydown:"_stopEnterPropagation"},behaviors:[a],setCompleters:function(h){if(this.aceEditor){this.aceEditor.completers=h}else{c.setCompleters(h)}},ready:function(){var i=this;var h=e.edit(i.$.editor);h.getSession().setMode(new f());h.setShowPrintMargin(false);h.setHighlightActiveLine(false);h.renderer.setHighlightGutterLine(false);h.setShowFoldWidgets(false);h.setDisplayIndentGuides(false);h.$blockScrolling=Infinity;i.aceEditor=h;var j=500;i.aceEditor.on("change",function(){i.debounce("aceChange",function(){var k=i.aceEditor.getValue();if(k!==this.expression){i._silentUpdate(k)}},j)});if(i.expression){i.aceEditor.setValue(i.expression,0)}i._updateReadonly();i._updateAutocomplete();i._updatedSingleLine();i._updateMaxLines();i.fire("aceEditorReady",{ready:true})},_stopEnterPropagation:function(i){var h=13;if(i&&i.keyCode===h&&!this.singleLine){i.stopPropagation()}},_expChange:function(h){if(!this.suppressUpdate&&this.aceEditor){this.aceEditor.setValue(h,0)}},_silentUpdate:function(h){this.suppressUpdate=true;this.expression=h;this.suppressUpdate=false},_updateMaxLines:function(){if(this.maxLines&&this.aceEditor){this.aceEditor.setOption("maxLines",this.maxLines)}},_updateAutocomplete:function(){if(this.autocomplete&&this.aceEditor){this.aceEditor.setOption("enableBasicAutocompletion",true)}},_updateReadonly:function(){if((this.readonly===false||this.readonly===true)&&this.aceEditor){this.aceEditor.setReadOnly(this.readonly)}},_updatedSingleLine:function(){var h=this;if(h.singleLine&&h.aceEditor){h.maxLines=null;h.aceEditor.setOption("maxLines",1);h.aceEditor.renderer.setShowGutter(false);h.aceEditor.on("paste",function(i){i.text=i.text.replace(/[\r?\n]+/g," ")});h.aceEditor.commands.bindKey("Enter|Shift-Enter","null");h.aceEditor.renderer.screenToTextCoordinates=function(i,k){var j=this.pixelToScreenCoordinates(i,k);return this.session.screenToDocumentPosition(Math.min(this.session.getScreenLength()-1,Math.max(j.row,0)),Math.max(j.column,0))}}},__aceEditor:function(){return this.aceEditor}})});define("DS/SMAProcWebCommonControls/CalculatorEditor",["DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","DS/SMAProcWebCMMUtils/SMAJSCMMParameterUtils","DS/SMAProcWebCMMCalculator/SMAProcWebCMMCalcSymbols","DS/SMAProcWebCMMCalculator/SMAProcWebCMMCalcFunctions","DS/SMAProcWebCommonControls/ext/aceBehavior","DS/SMAProcWebCMMCalculator/Parser/SMAProcWebCMMEval","text!DS/SMAProcWebCommonControls/CalculatorEditor.html","DS/Tree/TreeDocument","DS/Tree/TreeNodeModel","DS/Controls/ComboBox","DS/SMAProcWebContents/ParameterChooser","DS/SMAProcWebCommonControls/CodeEditor"],function(b,i,l,g,h,k,c,j,a,d,m){var f=h.functionTable.SupportedFunctions;var e=[];Object.keys(f).forEach(function(n){Object.keys(f[n]).forEach(function(p){var o=f[n][p];e.push({name:o.displayName,value:o.displayName,score:30,meta:n})})});i.registerDomModule(j);return b({is:"pcw-sdk-calculator-editor",properties:{expression:{type:String,notify:true},maxLines:{type:Number,reflectToAttribute:true},restrictUndeclaredParameter:{type:Boolean,value:false,reflectToAttribute:true},onlyLogicalExpression:{type:Boolean,value:false,reflectToAttribute:true},allowExceptionalValues:{type:Boolean,value:false,reflectToAttribute:true}},behaviors:[k],ready:function(){this.isReady=true;var n=this;function o(s,r){var u=new a({shouldBeSelected:function(v){return v.options.comboBoxSemantics!=="section"}});Object.keys(r).forEach(function(x){var v=new d({label:x,comboBoxSemantics:"section"});u.addRoot(v);var w=r[x];Object.keys(w).forEach(function(y){if(y){v.addChild(new d({label:y,comboBoxSemantics:"subsection"}))}})});u.expandAll();var t=new m({elementsTree:u,placeholder:"Select...",reachablePlaceholderFlag:true,enableSearchFlag:false,selectedIndex:-1});t.elements.mainElement.style.minWidth="80px";t.inject(s);t.addEventListener("change",n._insertFromWUXComboBox.bind(n,t))}var p=JSON.parse(JSON.stringify(g.symbolTable.Supported));Object.keys(p).forEach(function(s){var r=p[s];Object.keys(r).forEach(function(t){if(r[t]&&r[t].display!=="YES"){delete r[t]}});if(Object.keys(r).length===0){delete p[s]}});o(this.$.operatorsChooser,p);var q=JSON.parse(JSON.stringify(h.functionTable.SupportedFunctions));Object.keys(q).forEach(function(s){var r=q[s];Object.keys(r).forEach(function(t){if(r[t]&&r[t].displayName){r[r[t].displayName]=true;delete r[t]}});if(Object.keys(r).length===0){delete q[s]}});o(this.$.functionsChooser,q);n.$.editor.setCompleters([{getCompletions:function(r,t,v,s,u){if(s.length===0){u(null,[]);return}u(null,e.filter(function(w){return String(w.name).startsWith(s)}))}}])},setContentService:function(n){this.service=n;this.$.paramChooser.setContentService(n)},setModel:function(o,n){this.$.paramChooser.setModelFromParameters(o);this.$.editor.expression=n},setActivity:function(n){this.$.paramChooser.setActivity(n)},onOperatorSelect:function(n){this._select(this.operators,n)},onFunctionSelect:function(n){this._select(this.functions,n)},_insertFromWUXComboBox:function(o){var n=o&&o.value;if(n){this.insertAtCursorPosition(o.value);o.selectedIndex=-1;this.focus()}},_select:function(p,n){var o=p[n.target.selectedIndex];if(o&&o.value){this.insertAtCursorPosition(o.value);this.focus()}n.target.selectedIndex=0},_selectParameter:function(o){var q=o.detail.value;if(q){var n=c.resolveParameterName(q,this.$.paramChooser.getDataContainer());var p="'"+n+"'";if(o.detail.selectedIndices){p+=o.detail.selectedIndices[0]}this.insertAtCursorPosition(p);this.focus()}},__aceEditor:function(){return this.$.editor.__aceEditor()},setExceptionalFlag:function(n){this.allowExceptionalValues=n},calculate:function(){var r=this.$.paramChooser.getParameters();var n=this.$.editor.expression;if(r&&n){var p;var o={onlyLogicalExpression:this.onlyLogicalExpression,restrictUndeclaredParameter:this.restrictUndeclaredParameter,allowExceptionalValues:this.allowExceptionalValues};try{p=c.evaluate(n,r,this.$.paramChooser.getDataContainer(),o)}catch(q){console.error(q);this._invalidOutput(q.message)}if(p){this._displayOutput(p.result);if(!this.restrictUndeclaredParameter){this._addNewParameters(p.newParameters)}}}},validate:function(){var n=this.$.editor.expression;if(n){var o={onlyLogicalExpression:this.onlyLogicalExpression};try{c.parse(n,o);this._validOutput("Syntax is correct")}catch(p){this._invalidOutput(p.message)}}},_displayOutput:function(n){var o=JSON.stringify(n);o=o.substring(1,o.length-1);this._validOutput(o)},_addNewParameters:function(n){if(n.length>0){l.addParametersToDataContainer(n,this.$.paramChooser.getDataContainer());this.service.publishParametersCreated(n)}},_validOutput:function(n){this.$.editor.clearError();this.output=n;this.$.validator.classList.remove("invalid");this.$.validator.classList.add("valid")},_invalidOutput:function(o){this.output=o;var q=/(?: *at )?line\s+(\d+)\s+col\s+(\d+)/i;var p=q.exec(o);if(p){var n=parseInt(p[1])-1;this.$.editor.showError(n,0,"Error: "+o.replace(q,""))}this.$.validator.classList.remove("valid");this.$.validator.classList.add("invalid")},})});define("DS/SMAProcWebCommonControls/Editor",["DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","DS/SMAProcWebCommonControls/CodeEditor"],function(d,a,c){console.warn("DS/SMAProcWebCommonControls/Editor is deprecated, please use DS/SMAProcWebCommonControls/CodeEditor instead");var b='<dom-module id="pcw-editor"><pcw-code-editor id="editor" expression="{{expression}}" single-line$="{{singleLine$}}" readonly="{{readOnly}}"></pcw-code-editor></dom-module>';a.registerDomModule(b);return d({is:"pcw-editor",properties:{expression:{type:String},singleLine:{type:Boolean},readOnly:{type:Boolean}},ready:function(){console.warn("<pcw-editor> is deprecated, please use <pcw-code-editor> instead")},__aceEditor:function(){return this.$.editor.__aceEditor()}})});define("DS/SMAProcWebCommonControls/RunProgram",["UWA/Core","UWA/Class/Promise","DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","text!DS/SMAProcWebCommonControls/assets/native-job.xml","text!DS/SMAProcWebCommonControls/assets/native-job-win.xml","text!DS/SMAProcWebCommonControls/assets/native-job-win-1u-1d.xml","text!DS/SMAProcWebCommonControls/assets/native-job-win-1u-0d.xml","text!DS/SMAProcWebCommonControls/assets/native-job-win-0u-1d.xml","text!DS/SMAProcWebCommonControls/RunProgram.html","DS/SMAProcWebCommonControls/import!DS/SMAProcSP/sp-cosservice/sp-cosservice.html","DS/SMAProcWebCommonControls/import!DS/SMAProcSP/sp-cos-filemonitor/sp-cos-filemonitor.html","DS/SMAProcWebCommonControls/import!DS/SMAProcSP/sp-run/sp-run.html"],function(f,h,b,k,g,e,l,c,a,m){k.registerDomModule(m);var i=window.Promise||h;function d(p,o,n){n=n||0;if(n<o.length&&p){return d(p[o[n]],o,n+1)}return p}var j={is:"pcw-run-program",properties:{},listeners:{"runner.success":"_onSuccess","runner.error":"_onFail","jobStatusWS.error":"onWSError"},onWSError:function(n){n.stopPropagation();n.cancelBubble=true},run:function(n,o){var p=this;return new i(function(w,v){if(!n){v(new Error("INVALID PROGRAM"))}var q="";var s=true;var u=o.os||"win";var t=u==="linux"?g:e;n=n.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");var x=t.replace(/###code###/,n);var r=Object.assign({},o,{__DATE__:"Run EXML on "+new Date().toUTCString(),__promise__:{resolve:w,reject:v}});p.$.runner.runEXML(r,x,null,null,null,q,s,null,false)})},runWithUploadDownload:function(u,y){var w=u.downloadString;var t=u.uploadString;var n=u.processId;var o=u.activityId;var r=u.code;if(!u.code){throw Error("no code")}var x=!!t?1:0;var q=!!w?1:0;var v=2*x+q;var p="";switch(v){case 0:p=e;break;case 1:p=a;break;case 2:p=c;break;case 3:p=l;break;default:break}if(!p){throw Error("invalid options")}var r=u.code.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");var s=p.replace(/###processId###/,n).replace(/###activityId###/g,o).replace(/###downloadString###/,w).replace(/###uploadString###/,t).replace(/###code###/,r);return this.runEXML(s,y)},runEXML:function(p,n){var o=this;return new i(function(s,r){if(!p){r(new Error("INVALID EXML"))}var q=Object.assign({},n,{__DATE__:"Run EXML on "+new Date().toUTCString(),__promise__:{resolve:s,reject:r}});o.$.runner.runEXML(q,p,null,null,null,"",true,null,false)})},_onFail:function(o){console.error(o);var n=d(o,["detail","result"]);var p=n&&n.context;if(p){p.__promise__.reject({type:"JOB_SUBMISSION_FAILED",error:n.detail})}},_onSuccess:function(o){console.log(o);var n=d(o,["detail","result"]);if(n){var q=n.context;var p={EEDJobID:n.EEDJobID,objectID:n.objectID,credentials:{encryptedCredentials:null}};if(q){q.onLog("JOB_SUBMITTED",p)}if(n.credentials&&n.credentials.encryptedCredentials){p.credentials.encryptedCredentials=n.credentials.encryptedCredentials}this._startJobMonitor(q,p,"full")}},_startJobMonitor:function(q,p,o){var r=this;var n=this.$.jobStatusWS.uri+p.EEDJobID+"/summary/"+o;this.$.jobStatusWS.sendRequest({uri:n,verb:"GET",onComplete:function(s){var t=JSON.parse(s.response);var u=(t.JobInfo||t.JobInfoBrief)["@completionCode"];if(u==="OK"){q.onLog("JOB_COMPLETED",t);r._startFileMonitor(q,p)}else{if(u==="Failed"){q.__promise__.reject({type:"JOB_FAILED",error:t})}else{q.onLog("JOB_MONITOR_PROGRESS",t);setTimeout(r._startJobMonitor.bind(r,q,p,"full"),4000)}}},onFailure:function(s){q.__promise__.reject({type:"JOB_MONITOR_FAILED",error:s})}})},_startFileMonitor:function(o,n){var p=this;this.$.monitor.initExecDir({physicalID:n.objectID,execDir:{station:"{localhost}",cosJobID:n.EEDJobID},onComplete:function(q){o.onLog("FILE_MONITOR_CONFIGURED",q);p.$.monitor.getFileMonitor({execDir:q,physicalID:n.objectID,onComplete:function(r){o.onLog("FILE_MONITOR_STARTED",r);o.__promise__.resolve({jobInfo:n,execDir:r})},onFailure:function(r){o.__promise__.reject({type:"FILE_MONITOR_FAILED",error:r})}})},onFailure:function(q){o.__promise__.reject({type:"FILE_MONITOR_FAILED",error:q})}})},listFiles:function(p,n){var o=this;return new f.Promise(function(r,q){o.$.monitor.ls({execDir:n.execDir,subDirPath:p||"",physicalID:n.jobInfo.objectID,onComplete:function(s){r(s)},onFailure:function(s){q(s)}})})},tail:function(o,n){var p=this;return new f.Promise(function(r,q){p.$.monitor.tail({execDir:n.execDir,physicalID:n.jobInfo.objectID,filePath:o.filePath,start:o.start,numLines:o.numLines,onComplete:function(s){r(s)},onFailure:function(s){q(s)}})})},stopFileMonitor:function(n){var o=this;return new f.Promise(function(q,p){o.$.monitor.stopFileMonitor({execDir:n.execDir,physicalID:n.jobInfo.objectID,onComplete:function(r){q(r)},onFailure:function(r){p(r)}})})}};b(j)});define("DS/SMAProcWebCommonControls/NativeEditor",["UWA/Core","DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","DS/SMAProcWebCMMUtils/SMAWINAuthoringUtils","DS/SMAProcWebCMMUtils/SMAProcWebNativeEditor","DS/SMAProcWebCMMUtils/SMAProcWebinWinNativeEditor","text!DS/SMAProcWebCommonControls/NativeEditor.html","DS/SMAProcWebCommonControls/RunProgram","UWA/Class/Promise"],function(h,g,a,d,f,e,c){a.registerDomModule(c);var b={is:"pcw-native-editor",created:function(){this.options={}},ready:function(){if(!d.isWebInWin()){this.runner=document.createElement("pcw-run-program")}},setActivity:function(i){this.options.activity=i},setExtensionConfig:function(i){this.options.extensionConfig=i},setCommand:function(i){this.options.code=i},setUploadRule:function(i){this.options.uploadString=i},setDownloadRule:function(i){this.options.downloadString=i},setDebug:function(i){this.options.debug=i},setOptions:function(i){Object.assign(this.options,i)},run:function(n,j,i){var m=this;if(!this.options.activity||!this.options.extensionConfig||!this.options.code){throw new Error("invalid parameters")}var l=Object.assign({},this.options);if(!n){l.downloadString=null}if(!j){l.uploadString=null}m.jobDetails=null;var o=function(p){m.jobDetails=p;if(i){i(p)}};var k=d.isWebInWin()?new e(l):new f(l,this);return k.run(o)},STATUS:{OK:1,FAILED:0}};g(b)});