define("DS/RGD/commands/TilesViewCmd",["UWA/Core","DS/ApplicationFrame/Command"],function(c,a){var b=a.extend({init:function(d){this._parent(d,{isAsynchronous:false})},beginExecute:function(){},execute:function(){this.options.context.displayer.switchView("tile")}});return c.namespace("RGD/commands/TilesViewCmd",b)});define("DS/RGD/TemplateForm",["DS/RGNServices/Request","DS/RGNServices/DataForm","DS/RGNServices/FormBuilder","DS/RGNServices/FormControl","DS/RGNServices/Alert"],function(d,c,e,a,b){return(function(){var g=function(i,h){var k=i.tpl||{},j=i.appOptions.restUrl;return new c([{type:"dnd",value:"Drop exported file",attributes:{id:"tplFileDnd",style:"display: "+(k.name?"none":"block")},events:{ondragover:function(l){if(l.preventDefault){l.preventDefault()}this.classList.add("ondragover");l.dataTransfer.dropEffect="copy";return false},ondragenter:function(){this.classList.add("ondragover");return false},ondragleave:function(){this.classList.remove("ondragover")},ondrop:function(o){o.preventDefault();var q=this,p=this.ownerDocument,n=o.dataTransfer.files[0],m=new FileReader(),l=function(r){p.querySelector("#tplTitle").value=r.title;p.querySelector("#tplDescription").value=r.description||"";p.querySelector("#tplInputTypes").value=r.inputTypes;p.querySelector("#tplReportModelData").value=r.reportModelData;if(r.policy){p.querySelector("#tplPolicy").value=r.policy}};m.onload=function(r){q.querySelector(".dnd-label").innerHTML=n.name;if(r.target.result.startsWith("[")){l(JSON.parse(r.target.result)[0])}else{new d().postJson(j+"resources/rgn/template/import",r.target.result).then(function(s){l(s)})}};this.querySelector(".dnd-label").innerHTML="Loading...";m.readAsText(n);return false}}},{label:"Name",type:"text",value:k.name,attributes:{id:"tplName",placeholder:"Leave blank for autoname"}},{label:"Title",type:"text",attributes:{id:"tplTitle"},value:k["attribute[Title]"],mandatory:true,control:{check:function(l){return l.value&&l.value!==""},message:"Title must be filled"}},{label:"Description",type:"textarea",attributes:{id:"tplDescription"},value:k.description},{label:"Policy",type:"droplist",attributes:{id:"tplPolicy"},value:k.policy,values:h},{type:"hidden",value:k["attribute[Input Types]"],attributes:{id:"tplInputTypes"}},{type:"hidden",value:k["attribute[Report Model Data]"],attributes:{id:"tplReportModelData"}}])};function f(j,i,k){var h=k||{};this.library=j;this.policies=j.policies;this.appOptions=j.options;this.displayer=i;this.tpl=h.tpl;this.readOnly=h.readOnly||false;this.builder=new e();this.formControl=new a()}f.prototype.open=function(k){var h=this,i=this.tpl,j=this.library;if(!this.dataForm){this.getForm()}if(this.readOnly){this.dataForm.disable()}this.dataForm.inject(k,this.readOnly?[]:[{className:"primary",value:i?"Update":"Create",action:function(n){var m=n.getBody(),o={name:m.querySelector("#tplName").value,title:m.querySelector("#tplTitle").value,description:m.querySelector("#tplDescription").value,policy:m.querySelector("#tplPolicy").value,inputTypes:m.querySelector("#tplInputTypes").value,reportModelData:m.querySelector("#tplReportModelData").value,customFileName:m.querySelector("#tplFileDnd").fileName,customPreviousFileName:m.querySelector("#tplFileDnd").previousFileName,customFileData:m.querySelector("#tplFileDnd").file},l=h.appOptions.restUrl+"resources/rgn/template/";h.formControl.check(m).then(function(){if(i){o.physicalid=i.physicalid;l+=i.physicalid}n.getFooter().querySelector(".btn-primary").setAttribute("disabled","");new d()[i?"putJson":"postJson"](l,o).then(function(p){n.hide();j.pushTemplate(p,h.displayer)},function(p){n.getFooter().querySelector(".btn-primary").removeAttribute("disabled");b.error(p.message,n)})},function(p){p.forEach(function(s){var r=s.parentElement,q=r.querySelector(".form-control-error-text");if(!q){q=document.createElement("span");q.classList.add("form-control-error-text");q.innerHTML=s.control.message;r.appendChild(q)}q.style.display="block"})})}},{className:"default",value:"Cancel",action:function(l){l.hide()}}])};f.prototype.getForm=function(){this.dataForm=g(this,this.policies);return this.dataForm.form};return f})()});define("DS/RGD/commands/TreeListViewCmd",["UWA/Core","DS/ApplicationFrame/Command"],function(c,a){var b=a.extend({init:function(d){this._parent(d,{isAsynchronous:false})},beginExecute:function(){},execute:function(){this.options.context.displayer.switchView("table")}});return c.namespace("RGD/commands/TreeListViewCmd",b)});define("DS/RGD/commands/NewCmd",["UWA/Core","DS/ApplicationFrame/Command","DS/RGD/TemplateForm"],function(d,a,b){var c=a.extend({init:function(e){this._parent(e,{isAsynchronous:false})},beginExecute:function(){},execute:function(){var f=this.options.context.displayer,e=this.options.context.library;new b(e,f).open("New Template")}});return d.namespace("RGD/commands/NewCmd",c)});define("DS/RGD/TemplateLibrary",["DS/RGNServices/RGNServices","DS/RGNServices/Request","DS/RGNServices/Dialogs","DS/RGNServices/Alert","DS/RGD/TemplateForm"],function(e,d,c,b,a){return(function(){var g="attribute[Title]",h=new c(),f=function(j){return j[g]||j.name};function i(j){this.options=j||{};this.templates=this.options.templates}i.prototype.getTemplates=function(){return this.templates};i.prototype.pushTemplate=function(k,j){if(k instanceof Array){Array.prototype.push.apply(this.templates,k)}else{this.templates.push(k)}this.options.widgetInfo.setValue("templates",JSON.stringify(this.templates));j.refresh(this.templates)};i.prototype.popTemplate=function(k,j){var l=this.templates;l.forEach(function(n,m){if(n.physicalid===k.physicalid){l.splice(m,1)}});this.options.widgetInfo.setValue("templates",JSON.stringify(l));j.refresh(l)};i.prototype.pushDroppedIds=function(k,j){var l=this;return new Promise(function(m,n){new d().getJson(l.options.restUrl+"resources/rgn/template?physicalids="+k.join(",")).then(function(o){l.pushTemplate(o,j);if(o.length===k.length){m(l.templates)}else{n(new Error("Templates not dropped or partially dropped"))}},function(o){n(o)})})};i.prototype.inject=function(m){var o=this,n=this.options.app,l=this.templates,k=this.options.appUrl,j=this.options.restUrl;return new Promise(function(p,q){new d().getJson(j+"resources/rgn/template/policies").then(function(r){o.policies=r;m.display(l,{imageUrl:k+"common/images/I_RGNReportTemplate.png",contextualActions:{details:{className:"fonticon fonticon-attributes",icon:"legend-eye",tooltip:"Details",onclick:function(s){new a(o,m,{tpl:s,readOnly:true}).open(f(s))}},"delete":{className:"fonticon fonticon-trash",icon:"close",tooltip:"Delete",onclick:function(s){h.choice(n,{title:"Delete or Remove",message:"Delete "+f(s)+" or remove it from view?",buttons:[{className:"primary",value:"Delete",action:function(t){var u=s.physicalid;t.getFooter().querySelectorAll(".btn-primary")[0].setAttribute("disabled","");new d().deleteObject(j+"resources/rgn/template/"+u).then(function(){m.removeElement(u).then(function(){o.popTemplate(s,m)},function(v){b.error(v)});t.hide()},function(v){t.hide();b.error(v)})}},{className:"primary",value:"Remove",action:function(t){t.getFooter().querySelectorAll(".btn-primary")[1].setAttribute("disabled","");o.popTemplate(s,m);t.hide()}},{className:"default",value:"Cancel",action:function(t){t.hide()}}]})}},edit:{className:"fonticon fonticon-pencil",icon:"pencil",tooltip:"Edit information",onclick:function(s){new a(o,m,{tpl:s}).open("Edit "+f(s))}},download:{className:"fonticon fonticon-download",icon:"download",tooltip:"Download",onclick:function(s){new d().download(j+"resources/rgn/template/download/"+s.physicalid).then(function(t){e.download(s.name+".json",t,true)},function(t){b.error(t)})}},open:{className:"fonticon fonticon-eye",icon:"eye",tooltip:"Edit Template",onclick:function(t){n.querySelector(".rgd-data").classList.toggle("hidden");n.querySelector(".layout").classList.toggle("hidden");n.querySelector(".fonticon-open-left").templateId=t.physicalid;try{n.modeller=new window.ModellerEntryPoint(t.physicalid);n.modeller.loadFromWidget(k+"rgn/reportmodeller/service?xrequestedwith=xmlhttprequest")}catch(s){b.error(s);q(s)}}}}});p()},function(r){q(r)})})};return i})()});define("DS/RGD/RGDApp",["DS/ApplicationFrame/ActionBar","DS/UIKIT/SuperModal","DS/RGNServices/Request","DS/RGNServices/QueryDisplayer","DS/RGNServices/Alert","DS/RGD/TemplateLibrary"],function(g,a,c,d,b,f){var e=function(h){this.options=h||{};this.app=this.options.app;this.library=new f(this.options);this.displayer=new d(this.app.querySelector(".rgd-data"),{library:this.library,label:"Templates",picture:h.appUrl+"snresources/images/icons/large/iconLargeDefault.png",imageUrl:h.appUrl+"common/images/I_RGNReportTemplate.png"});new g({file:"RGD.xml",context:{library:this.library,displayer:this.displayer,toString:function(){return"RGD"}},module:"RGD"}).inject(h.app)};e.prototype.reloadWidget=function(){var h=this;this.library.inject(this.displayer)["catch"](function(i){i.message="Template: "+i.message;b.error(i)});this.app.querySelector(".fonticon-open-left").onclick=function(l){var j=h.app.querySelector("#layout-toolbar"),m=new a({renderTo:j}),k=l.target.templateId,n=function(){j.parentElement.appendChild(j.querySelector(".iconbar-root"));h.app.querySelector(".rgd-data").classList.toggle("hidden");h.app.querySelector(".layout").classList.toggle("hidden");h.app.querySelector("#layout-content").innerHTML="";j.innerHTML="";j.appendChild(h.app.querySelector(".iconbar-root"))},i=function(o){new c().postJson(h.options.restUrl+"resources/rgn/template/unlock/"+o).then(function(){n()},function(p){n();b.error(p)})};if(!h.app.querySelector('button > img[src$="I_RGN_Save.png"]')||h.app.querySelector('button > img[src$="I_RGN_Save.png"]').parentNode.disabled){i(k)}else{m.confirm("Template not saved, are you sure?","Quit without saving",function(o){if(o){i(k)}})}}};return e});define("DS/RGD/RGDUX",["UWA/Core","DS/Controls/Loader","DS/RGD/RGDApp","DS/RGNServices/Request","DS/RGNServices/Alert"],function(f,e,d,c,b){var a=function(g){this.options=g};a.prototype.initialize=function(g){var h=this;return new Promise(function(n,o){var l=h.options,p=l.app,j=l.widgetInfo,k=g[0]["3DSpace"]+"/",i=new e().inject(p),m=JSON.parse(j.getValue("templates")||"[]");i.text="Templates Loading...";i.on();new c().getJson(k+"resources/rgn/template?physicalids="+m.map(function(q){return q.physicalid}).join(",")).then(function(q){i.off();h.app=new d(f.extend({app:p,appUrl:k,restUrl:k,widgetInfo:j,source:j.getValue("x3dAppId")?j.getValue("x3dAppId"):"CATRTW_AP",templates:q},l));new c().getJson(k+"resources/rgn/template/i18n").then(function(r){window.I18n=r},function(r){window.I18n={};b.error("Cannot load I18n: "+r.message)});h.app.reloadWidget();n(h.app)},function(q){i.off();b.error(q);o(q)})})};a.prototype.refresh=function(){this.app.reloadWidget();return f.Class.Promise.resolve()};return a});