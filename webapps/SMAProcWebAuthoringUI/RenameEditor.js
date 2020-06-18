define("DS/SMAProcWebAuthoringUI/RenameEditor",["DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","DS/SMAProcWebCMMUtils/SMAJSCMMAuthoringUtils","DS/SMAProcWebDiagram/graph","DS/SMAProcWebAuthoringUtils/SMAProcWebAuthoringServices","DS/SMAProcWebCMMException/SMAProcWebCMMError","DS/SMAProcWebExceptionManager/SMAProcWebErrorManager","DS/SMAProcWebCMMUtils/SMAProcWebAuthoringNLSUtils","DS/SMAProcWebCMMUtils/SMAJSCMMUtils","text!DS/SMAProcWebAuthoringUI/RenameEditor.html","DS/SMAProcWebCommonControls/import!DS/SMAProcSPUI/sp-input/sp-input.html","DS/SMAProcWebCommonControls/import!DS/SMAProcSPUI/sp-textarea/sp-textarea.html","DS/SMAProcWebAuthoringControls/WebUXDialog"],function(a,i,j,d,c,f,e,h,b,g){i.registerDomModule(g);return a({is:"cmp-rename-editor",properties:{editorTitle:{type:String,value:"Rename"},flowitem:{type:Object,observer:"_flowItemChanged"},initDescription:{type:String,value:""},initTitle:{type:String,value:""},itemDescription:{type:String,value:"",notify:true},itemTitle:{type:String,value:"",notify:true,observer:"_checkTitleValidity"},oldItemTitle:{type:String,value:""},oldItemDesc:{type:String,value:""}},listeners:{"mainContainer.cmp-wux-ok-clicked":"onOkay","mainContainer.cmp-wux-cancel-clicked":"onCancel","mainContainer.cmp-wux-closed":"onCancel"},_flowItemChanged:function(){if(!this.flowitem){return}var k=this.flowitem.isProcess&&this.flowitem.isProcess()===true;var l=this.flowitem.isActivity&&this.flowitem.isActivity()===true;if(k||l){this.editorTitle=k?"Rename Process":"Rename Activity";console.log("Flowitem is an activity or process.");var o=this.flowitem.getName();var n=this.flowitem.getFieldValue("description");if(n!==null){n=b.unescapeHTML(n)}if(o!="null"){this.itemTitle=o;this.initTitle=o}if(n!="null"){this.itemDescription=n;this.initDescription=n}}else{console.log("Flowitem is a step.");this.editorTitle="Rename Step";var m=this;j.updateStep(this.flowitem,{onSuccess:function(p){var r=p.getName();var q=p.getDescription();if(r!="null"){m.itemTitle=r;m.initTitle=r}if(q!="null"){m.itemDescription=q;m.initDescription=q}},onFailure:function(){c.displayClosableMessages("error",["Retrieve.title.step.failed"],true)}})}},ready:function(){console.log("In ready of cmp-rename-editor..");this.$.mainContainer.show()},onCancel:function(){this.$.mainContainer.hide()},onOkay:function(n){n.preventDefault();n.stopPropagation();this.$.mainContainer.hide();this.oldItemTitle=this.initTitle;this.oldItemDesc=this.initDescription;var l=h.translate(["Title.update.failed"]);var k=h.translate(["Modify_AccessMessage"]);console.log("onOkay cmp-rename-editor..");if(this.flowitem&&(this.initTitle!==this.itemTitle||this.initDescription!==this.itemDescription)){if((this.flowitem.isActivity&&this.flowitem.isActivity()===true)||(this.flowitem.isProcess&&this.flowitem.isProcess()===true)){console.log("Flowitem is an activity or a process.");this.flowitem.setFieldValue("title",this.itemTitle);this.flowitem.setFieldValue("description",this.itemDescription);var m=this;j.updatePLMObject(this.flowitem,["title","description"],{onSuccess:function(){if(m.flowitem.isProcess()){if(window.widget&&window.widget.setTitle){window.widget.setTitle(m.flowitem.getName());window.widget.setValue("processName",m.flowitem.getName())}var p=document.querySelector("cmp-process-view");if(p){p.updateData()}}else{d.addNewActivityNode(m.flowitem)}},onFailure:function(p){l=l.replace("<p>","process/activity : "+m.flowitem.getName()+".");if(p.length>0&&p.indexOf("access")>-1){l=l+k}e.notifyError(new f("Error",l));m.flowitem.setFieldValue("title",m.oldItemTitle);m.flowitem.setFieldValue("description",m.oldItemDesc)}})}else{console.log("Flowitem is a step.");this.flowitem.setName(this.itemTitle);this.flowitem.setDescription(this.itemDescription);var o=this.flowitem.getId();var m=this;j.saveStep(this.flowitem,{onSuccess:function(){var p=document.querySelector('cmp-step-view[step-id="'+o+'"]');if(p){p.updateTitle()}},onFailure:function(p){l=l.replace("<p>","step : "+m.flowitem.getName()+".");if(p.length>0&&p.indexOf("access")>-1){l=l+k}e.notifyError(new f("Error",l));m.flowitem.setName(m.oldItemTitle);m.flowitem.setDescription(m.oldItemDesc)}})}}},_checkTitleValidity:function(n,l){var k=this.flowitem&&this.flowitem.isProcess&&this.flowitem.isProcess()===true;var m=k?"process":null;if(!b.isValidTitle(this.itemTitle,m)){c.displayClosableMessages("error",["RenameTitle.InvalidCharacter.error"],true);this.itemTitle=l?l:b.replaceInvalidCharacter(this.itemTitle,m)}}})});