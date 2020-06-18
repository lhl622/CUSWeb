define("DS/ENOGantt/View/GanttPlugins",["UWA/Core","UWA/Class","DS/ENOGantt/Ven/Ext","DS/ENOGantt/Ven/Bryntum","DS/PlatformAPI/PlatformAPI","DS/Foundation2/FoundationV2Data","DS/ENOGantt/View/Toolbar","DS/ENOGantt/View/GanttRefinement","DS/ENOGantt/Controller/MainController","DS/ENOGantt/GanttUtil","DS/ENOGantt/Custom/DPMGanttAll","DS/ENOGantt/GanttConstants","DS/ENOGantt/Data/ResponseUtil"],function(i,b,d,c,n,o,j,m,h,f,k,q,p){var a=f.getDateFormat();cpnl=this;var e=q.actionType;var l="";var g=b.extend({getPlugins:function(){l=enoviaServer.computeUrl("/common/images/");return cpnl.getGanttPlugin()}});this.getGanttPlugin=function(w){var r=[];r.push(this.getPrintablePlugin());var s=this.getTaskContextMenuPlugin(w);r.push(s);if(App.Infra.ViewId==App.Infra.Views.VIEW_WBS||App.Infra.ViewId==App.Infra.Views.VIEW_TEMPLATE_WBS){var t=this.getTaskEditor(w);r.push(t);r.push(this.getDependencyEditor(w));var u=this.getCellEditorPlugin(w);r.push(u);var v=this.getProgressLinePlugin();r.push(v)}return r};this.getDependencyEditor=function(r){d.define("DS.ENOGantt.plugin.DependencyEditor",{extend:"Gnt.plugin.DependencyEditor",showLag:true,constrain:true,show:function(s,w){var v=d.ComponentQuery.query("#dpmprojectgantt")[0];var t=s.getTargetTask(v.taskStore);var u=t.isReadOnly();if(u){return}else{this.callParent(arguments)}}});return d.create("DS.ENOGantt.plugin.DependencyEditor")};this.getPrintablePlugin=function(){d.define("DS.ENOGantt.View.GanttPanel.Plugin.Printable",{extend:"Gnt.plugin.Printable",defaultExporter:"singlepage",showExportDialog:function(){me=this;me.callParent(arguments);activeDialog=this.getActiveExportDialog();form=activeDialog.form.getForm();fields=form.getFields();fieldSize=fields.length;for(idx=0;idx<fieldSize;idx++){field=fields.getAt(idx);fieldName=field.getName();if("range"==fieldName){store=field.getStore();store.removeAt(3);store.removeAt(1)}else{if("rowsRange"==fieldName){field.hide()}else{if("format"==fieldName){field.hide()}else{if("orientation"==fieldName){field.hide()}}}}}},buildExporters:function(){return["Gnt.plugin.exporter.SinglePage"]}});return d.create("DS.ENOGantt.View.GanttPanel.Plugin.Printable")};this.getTaskEditor=function(u){var s=cpnl.getPredecessorGrid();var r=cpnl.getSuccessorGrid();var t=d.create("Gnt.plugin.TaskEditor",{id:"taskEditor",reference:"taskEditor",height:350,taskFormClass:cpnl.getTaskForm(),showNotes:false,showAdvancedForm:false,showAssignmentGrid:false,showDependencyGrid:false,taskFormConfig:{effortConfig:{hidden:true},showBaseline:false},panelConfig:{items:[{title:App.Nls["emxProgramCentral.Gantt.TaskEditor.Predecessors"],items:s},{title:App.Nls["emxProgramCentral.Gantt.TaskEditor.Successors"],items:r}]},listeners:{loadTask:function(w,v){s.loadDependencies(v);s.store.sort("predTaskSeqNumber","ASC");r.loadDependencies(v);r.store.sort("taskSeqNumber","ASC")},},buttons:[{text:App.Nls["emxProgramCentral.Common.Close"],reference:"taskEditorClose",handler:function(){this.config.$initParent.ownerCt.close()}},]});return t};this.getPredecessorGrid=function(){d.define("PredecessorGrid",{extend:"Gnt.widget.DependencyGrid",readOnly:false,height:220,scrollable:true,tbar:[],buildColumns:function(){var r=this.callParent(arguments);r[0].renderer=function(u,w,t){var v=d.ComponentQuery.query("#dpmprojectgantt")[0];var s=t.getSourceTask(v.taskStore);if(s){return t.getSourceTask(v.taskStore).get("TaskSequenceId")}else{return t.get("predTaskSeqNumber")}};r[0].getSortParam=function(){return"predTaskSeqNumber"};r[1].renderer=function(y,z,w){var v=d.ComponentQuery.query("#dpmprojectgantt")[0];var u=w.getSourceTask(v.taskStore);var x="";if(u){x=w.getSourceTask(v.taskStore).get("Name")}else{var A=w.get("From");var t="/resources/v1/modeler/tasks/"+A+"?$include=none&$fields=none,title";var s=o.calculateFinalUrl(t);d.Ajax.request({url:s,async:false,success:function(B){var C=JSON.parse(B.responseText.trim());if(C.success){x=C.data[0].dataelements.title}}})}return x};r[1].getSortParam=function(){return"Predecessor"};r[2].sortable=false;r[1].editor=false;r[2].editor=false;r[3].editor=false;return r},});return d.create("PredecessorGrid")};this.getSuccessorGrid=function(){d.define("SuccessorGrid",{extend:"Gnt.widget.DependencyGrid",readOnly:false,direction:"successors",height:220,scrollable:true,tbar:[],buildColumns:function(){var r=this.callParent(arguments);r[0].renderer=function(z,A,x){var w=d.ComponentQuery.query("#dpmprojectgantt")[0];var y=x.getTargetTask(w.taskStore);var v="";if(y){v=y.get("TaskSequenceId")}else{var u=x.get("To");var t="/resources/v1/modeler/tasks/"+u+"?$include=none&$fields=none,PALId.transient,deleteAccess,sequenceOrder";var s=o.calculateFinalUrl(t);d.Ajax.request({url:s,async:false,success:function(B){var C=JSON.parse(B.responseText.trim());if(C.success){v=C.data[0].relelements.sequenceOrder}}})}return v};r[0].getSortParam=function(){return"taskSeqNumber"};r[1].renderer=function(z,A,w){var v=d.ComponentQuery.query("#dpmprojectgantt")[0];var x=w.getTargetTask(v.taskStore);var y="";if(x){y=x.get("Name")}else{var u=w.get("To");var t="/resources/v1/modeler/tasks/"+u+"?$include=none&$fields=none,title";var s=o.calculateFinalUrl(t);d.Ajax.request({url:s,async:false,success:function(B){var C=JSON.parse(B.responseText.trim());if(C.success){y=C.data[0].dataelements.title}}})}return y};r[1].getSortParam=function(){return"Successor"};r[2].sortable=false;r[1].editor=false;r[2].editor=false;r[3].editor=false;return r}});return d.create("SuccessorGrid")};this.getTaskForm=function(){var s=App.Infra.TypeOf.ProjectTemplate;var r=d.define("MyTaskForm",{extend:"Gnt.widget.taskeditor.TaskForm",percentDoneConfig:{hidden:s,readOnly:true,forceReadOnly:true,editor:null},nameConfig:{readOnly:true,forceReadOnly:true,editor:null},durationConfig:{readOnly:true,forceReadOnly:true,editor:null},startConfig:{hidden:s,readOnly:true,forceReadOnly:true,format:a,editor:null},finishConfig:{hidden:s,readOnly:true,forceReadOnly:true,format:a,editor:null},scrollable:false,});return r};this.getCellEditorPlugin=function(){var r=d.create("Sch.plugin.TreeCellEditing",{clicksToEdit:2,id:"CellEditorPlugin",listeners:{beforeEdit:function(u,t,s){if(t.originalValue===t.value){return}},edit:function(u,t,s){if(t.record.modified){cpnl.processCellEdit(u,t,s)}},validateEdit:function(x,v,u){if(v.originalValue===v.value){return}var s=v.record;var w=v.field;var y=v.value;if("Dependency"==w){if(!f.validateDependency(s,y)){v.cancel=true}}else{if("Name"==w){if(y!=""){var t=f.validateBadNameChar(y);if(!t){v.cancel=true}}}}}}});return r};this.processCellEdit=function(x,v,u){var t={};var s=v.record;var w=v.field;var y=v.value;var r=v.column.customColumn;if(r){cpnl.cacheCustomColumn(v,s)}else{if("Dependency"==w){if(y!=""){y=f.parseDependencyString(y).actualValue}s.set("Dependency",y);t.isInlineEdit=true;t.dependencyVal=y}else{if("StartDate"==w){console.log("START DATE CHANGED..........");t.isStartDateEdited=true;s.setStartDate(y);s.setConstraint("startnoearlierthan",y)}else{if("EndDate"==w){console.log("END DATE CHANGED..........");t.isFinishDateEdited=true;s.setEndDate(y);s.setConstraint("finishnoearlierthan",y)}else{if("Duration"==w){s.setDuration(parseFloat(y))}}}}}};this.cacheCustomColumn=function(w,s){var v=s.data.Id;var x=w.column.text;var r=w.column.columnDataType;var y=w.value;var u=w.originalValue;var t=w.column.selectable;if(r&&r=="datefield"){y=cpnl.getFormattedDate(y);u=cpnl.getFormattedDate(new Date(u))}};this.cacheDependencyData=function(H,x){var I=[];var C=(x&&x.isInlineEdit);var K=H.data;var s=K.Id;var E=K.TaskSequenceId;var z=K.Policy;var w=K.State;var F=K.TaskProjectId;var u=null;if(C){u=this.getDependencyModelArray(x.dependencyVal)}if(u.length==0){var D={taskId:s,taskSequenceId:E,policy:z,state:w,taskProjectId:F,fromTaskProjectId:r};I.push(D)}else{for(var G=0;G<u.length;G++){var B=u[G];var D=B.data;var A=D.Type;var t=D.Lag;var v=D.LagUnit;var y=null;var J=null;var r=null;if(C){J=D.From;if(J.indexOf(":")!=-1){J="{"+J+"}"}}var D={taskId:s,taskProjectId:F,taskSequenceId:E,policy:z,state:w,dependencyNumber:A,dependencyLag:t,lagUnit:v,fromSequenceId:J.toString(),fromTaskId:y,fromTaskProjectId:r};I.push(D)}}};this.cacheTaskChangeData=function(s,w,y){var J=w.data;var t=J.Id;var D=J.Policy;var x=J.State;var B=J.ScheduleFrom;var I=J.CalendarId;var H=J.CalendarModifiedDate;var A=J.PercentDone;A=parseFloat(A);var u=J.StartDate;var G=J.EndDate;var r=J.Duration;var F=J.DurationUnit;var C="";if("InlineEdit"==s){if(y.isStartDateEdited){C="ESD"}else{if(y.isFinishDateEdited){C="EED"}else{C="DURATION"}}}else{if("TaskDragDrop"==s){if(D=="Project Review"&&u!=undefined){var z=""+u.getHours();if(z!="0"){u=d.Date.add(u,d.Date.DAY,1)}}if(G==null&&u!=undefined){var v=J.Duration;var F=J.DurationUnit;G=d.Date.add(u,F,v)}}if("TaskResize"==s){if(D!="Project Review"&&(r!=null&&r==0)){var E=App.Nls["emxProgramCentral.Common.ValueMustBeAPositiveReal"];d.Msg.alert(E);w.reject();return}}}if(!u&&!G){return}u=cpnl.getFormattedDate(u);G=cpnl.getFormattedDate(G)};this.getProgressLinePlugin=function(){return{ptype:"gantt_progressline",disabled:true,}};this.getTaskContextMenuPlugin=function(t){var s=new Array();var r=d.create("Gnt.plugin.TaskContextMenu",{id:"RMBMenu",taskEditorInjected:true,createMenuItems:function(){var B={requiresTask:true,id:"rmbOpenTaskAction",text:App.Nls["emxProgramCentral.Common.OpenInNewTab"],icon:l+"iconActionOpenShortcuts.png",iconCls:"tBarIcon",itemId:"rmbOpenTaskAction",scope:this,};if(App.Infra.ViewId==App.Infra.Views.VIEW_STATUS_REPORT){s.push(B);return s}var C=cpnl.getExpandNLevelRMBConfig(this);var u=cpnl.getExpandAllRMBConfig(this);var D=cpnl.getAddTaskRMBConfig(this);var v=cpnl.getAddGateRMBConfig(this);var z=cpnl.getAddMilestoneRMBConfig(this);var A=cpnl.getAddPhaseRMBConfig(this);var y=cpnl.getDeleteRMBConfig(this);var x=cpnl.getColorMenuRMBConfig(this);var w=cpnl.getManageResourceRMBConfig(this);if(App.Infra.ViewId==App.Infra.Views.VIEW_WBS||App.Infra.ViewId==App.Infra.Views.VIEW_TEMPLATE_WBS){s.push(B);s.push({xtype:"menuseparator"});s.push(D);s.push(A);if(App.Infra.hasDPMLicense){s.push(v)}s.push(z);s.push(y);s.push(x);if(App.Infra.ViewId==App.Infra.Views.VIEW_WBS){s.push({xtype:"menuseparator"});s.push(w)}s.push({xtype:"menuseparator"})}s.push(u);s.push(C);return s},addOrDeleteTaskHandler:function(u){if(f.isValidRMBOperation(this.rec,u.id)){cpnl.syncOnAddRemoveTask(this,u.id)}},isTaskAllExpanded:function(u){return u.hasChildNodes()},isValidAddTaskAbove:function(u){return f.isValidAddTaskAbove(u)},isValidAddSubTask:function(u){return f.isValidAddSubTask(u)},isValidManageResourceAction:function(u){return f.isValidManageResourceAction(u)},isValidDeleteTask:function(u){return f.isValidDeleteTask(u)},isValidForColor:function(u){return f.isValidForColor(u)},});return r};this.getResourcePanelContextId=function(){var r=d.ComponentQuery.query("dpmresourceutilizationpanel")[0];var s=r.context;var t="";if(s){t=s.getId()}return t};this.manageResourceHandler=function(x){var v=this;var r=d.ComponentQuery.query("#dpmresourceutilizationpanel")[0];r.setLoading(false);r.setLoading(App.Nls["emxProgramCentral.Gantt.ResourceUtilization.Loading"]);var z=d.ComponentQuery.query("#dpmprojectgantt")[0];if(r.isHidden()){r.show();r.expand()}z.resourceStore.removeAll();z.assignmentStore.removeAll();z.taskStore.resourceStore.commitChanges();z.taskStore.assignmentStore.commitChanges();if(App.Infra.ExtTaskArray.length>0){z.taskStore.remove(App.Infra.ExtTaskArray);App.Infra.ExtTaskArray=new Array();z.taskStore.commitChanges()}var s=x.rec;var w=s.getId();var A=s.get("TaskProjectId");var u=z.taskStore.getModelById(A);var y=u.get("StartDate").getTime();var t=u.get("EndDate").getTime();r.context=s;r.contextId=w;var C=App.Nls["emxProgramCentral.Common.ManageResources"]+" : "+r.context.getName();r.setTitle(C);this.data={taskId:w,taskProjectId:A,projectStart:y,projectEnd:t,};var B="/resources/v1/modeler/tasks/"+w+"?$include=none,assignees,Assignments,calendar,EventInfo&$fields=Assignments.TaskId,Assignments.Id,Assignments.allocation,Assignments.icon,Assignments.TaskProjectId,Assignments.Name,Assignments.percentComplete,Assignments.estimatedStartDate,Assignments.dueDate,Assignments.estimatedDurationInputValue,Assignments.owner,assignees.name,assignees.WorkTime,assignees.Id,assignees.firstname,assignees.lastname,assignees.icon";o.ajaxRequest({url:B,type:"GET",dataType:"json",callback:function(J){var ai=v.data.taskProjectId;var ad=v.data.projectStart;var W=v.data.projectEnd;var aA=J.data[0].relateddata.assignees;var ab=aA.length;var E=[];var D=[];var U=[];for(var aB=0;aB<ab;aB++){var ac=aA[aB];var X=ac.dataelements;X.FirstName=X.firstname;X.LastName=X.lastname;X.Name=X.name;delete X.firstname;delete X.lastname;delete X.name;if(ac.relateddata.calendar&&ac.relateddata.calendar.length>0){if(ac.relateddata.calendar[0].relateddata.EventInfo){var ao=ac.relateddata.calendar[0].relateddata.EventInfo;var F=[];for(var av=0,au=ao.length;av<au;av++){var aD=ao[av];var ag=aD.relelements;var S=ag.workStartTime;var ae=ag.workFinishTime;var af=ag.lunchStartTime;var ax=ag.lunchFinishTime;var K=ag.weekDay;if(S.length<4){S="0"+S}if(ae.length<4){ae="0"+ae}if(af.length<4){af="0"+af}if(ax.length<4){ax="0"+ax}var ay=ag.exceptionType;var aw=true;S=S.substring(0,2)+":"+S.substring(2);ae=ae.substring(0,2)+":"+ae.substring(2);af=af.substring(0,2)+":"+af.substring(2);ax=ax.substring(0,2)+":"+ax.substring(2);var at=S+"-"+af;var aq=ax+"-"+ae;if("Working"!=ay){aw=false}var Z={Type:"WEEKDAY",Weekday:K-1,availability1:at,availability2:aq,isWorkingDay:aw};F.push(Z)}X.CalendarInfo=F}}var ap=X.WorkTime;if(!ap){X.WorkTime=parseFloat("8.0")}else{X.WorkTime=parseFloat(ap)/60}var P=X.Id;var ah="Custom:"+P;X.CalendarId=ah;E.push(X);var O=ac.relateddata.Assignments;if(O.length>0){var ak=O[0].dataelements;var I=ak.contextUser;for(var au=1;au<O.length;au++){var T=O[au];var aj=T.dataelements;var R=T.relelements;p.convertToGanttKeyValues(aj);p.convertToGanttKeyValues(R);var aC=new Date(aj.StartDate);var aa=new Date(aj.EndDate);aC=aC.getTime();aa=aa.getTime();if(aC<ad||aa>W){continue}var L={};L.TaskId=aj.TaskId;var ar=aj.Owner;if(ar==I){L.isReadOnly=false}else{L.isReadOnly=true}var aE=T.type;if(ak[aE]){L.icon=ak[aE]}L.Id=R.Id;L.Units=R.allocation;L.ResourceId=P;var an=aj.TaskProjectId;if(an==ai){L.Type="Internal"}else{var am={};L.Type="External";am.Id=aj.TaskId;am.Name=aj.Name;am.PercentDone=aj.PercentDone;am.Duration=aj.Duration;if(aj.StartDate){aj.StartDate=d.Date.format(new Date(aj.StartDate),"c")}if(aj.EndDate){aj.EndDate=d.Date.format(new Date(aj.EndDate),"c")}am.StartDate=aj.StartDate;am.EndDate=aj.EndDate;am.expanded=true;U.push(am)}D.push(L)}}}var M=z.taskStore.data.items[0];var H=U.length;if(H>0){for(var av=0;av<H;av++){var Y=U[av];var al=Y.Id;var az=z.taskStore.getModelById(al);if(az==null&&Y.Name!="root"){Y.visible=false;Y.Id=al;Y.Rollup=false;Y.ReadOnly=true;Y.ExternalTask=true;Y.expanded=true;var G=d.create("DS.ENOGantt.Data.TaskModel",Y);var V=G.getDuration();var N=G.getStartDate();App.Infra.ExtTaskArray.push(G);M.addSubtask(G);G.setStartDate(N);G.setDuration(V);M.nextSibling="";z.taskStore.commitChanges()}}}var Q=D.length;if(E.length>0){z.taskStore.resourceStore.add(E)}if(D.length>0){z.taskStore.assignmentStore.add(D)}z.taskStore.resourceStore.commitChanges();z.taskStore.assignmentStore.commitChanges();z.taskStore.commitChanges();z.taskStore.filterBy(function(aF){if(aF.get("ExternalTask")){return false}return true});r.setLoading(false)}})};this.getManageResourceRMBConfig=function(s){var t=s;var r=this;return{requiresTask:true,id:"rmbAssignAction",text:App.Nls["emxProgramCentral.Common.ManageResources"],isValidAction:s.isValidManageResourceAction,icon:l+"iconSmallPerson.png",iconCls:"tBarIcon",handler:function(){if(App.Infra.Load.Level!=0){new i.Promise(function(w,v){var u;var x=d.ComponentQuery.query("#dpmprojectgantt")[0];f.getStoreTaskExpandStatus(x.taskStore);f.isReadyToExpand(u,w,0)}).then(function(u){r.manageResourceHandler(t)})}else{r.manageResourceHandler(t)}}}};this.getExpandNLevelRMBConfig=function(r){return{text:App.Nls["emxProgramCentral.Gantt.ExpandNLevel"],isValidAction:r.isTaskAllExpanded,icon:l+"iconActionSetNodeExpansionLevel.png",iconCls:"tBarIcon",menu:{plain:true,defaults:{scope:r},items:f.getSelectiveItemArray(5,"RMB_expandLevel_",r.expandNLevelFromRMBHandler,r.expandAllFromRMBHandler)}}};this.getExpandAllRMBConfig=function(r){return{scope:r,itemId:"rmbExpandAll",text:App.Nls["emxProgramCentral.Gantt.ExpandAll"],isValidAction:r.isTaskAllExpanded,icon:l+"iconActionExpandAll.png",iconCls:"tBarIcon",}};this.getAddTaskRMBConfig=function(s){var t=cpnl.getAddTaskAboveRMBConfig(s);var r=cpnl.getAddSubTaskRMBConfig(s);return{text:App.Nls["emxProgramCentral.Common.AddTask"],itemId:"addTaskMenu",icon:l+"iconSmallTask.png",iconCls:"tBarIcon",menu:{plain:true,defaults:{scope:s},items:[t,r]}}};this.getAddTaskAboveRMBConfig=function(r){return{handler:r.addOrDeleteTaskHandler,requiresTask:true,id:e.ADD_TASK_ABOVE,text:App.Nls["emxProgramCentral.Common.InsertTaskAbove"],isValidAction:r.isValidAddTaskAbove,icon:l+"iconActionInsertRowBefore.png",iconCls:"tBarIcon",}};this.getAddSubTaskRMBConfig=function(r){return{handler:r.addOrDeleteTaskHandler,requiresTask:true,id:e.ADD_SUB_TASK,text:App.Nls["emxProgramCentral.Common.AddSubtaskBelow"],isValidAction:r.isValidAddSubTask,icon:l+"iconActionInsertRowAfter.png",iconCls:"tBarIcon",}};this.getAddGateRMBConfig=function(r){return{handler:r.addOrDeleteTaskHandler,requiresTask:true,id:e.ADD_GATE,text:App.Nls["emxProgramCentral.Common.AddGate"],isValidAction:r.isValidAddSubTask,icon:l+"iconSmallGate.png",iconCls:"tBarIcon",}};this.getAddMilestoneRMBConfig=function(r){return{handler:r.addOrDeleteTaskHandler,requiresTask:true,id:e.ADD_MILESTONE,text:App.Nls["emxProgramCentral.Common.AddMilestone"],isValidAction:r.isValidAddSubTask,icon:l+"iconSmallMilestone.png",iconCls:"tBarIcon",}};this.getAddPhaseRMBConfig=function(r){return{handler:r.addOrDeleteTaskHandler,requiresTask:true,id:e.ADD_PHASE,text:App.Nls["emxProgramCentral.Common.AddPhase"],isValidAction:r.isValidAddSubTask,icon:l+"iconSmallPhase.png",iconCls:"tBarIcon",}};this.getDeleteRMBConfig=function(r){return{handler:r.addOrDeleteTaskHandler,requiresTask:true,id:e.DELETE,text:App.Nls["emxProgramCentral.Common.Delete"],isValidAction:r.isValidDeleteTask,icon:l+"iconActionDelete.png",iconCls:"tBarIcon",}};this.getColorMenuRMBConfig=function(s){var r=d.create("Ext.menu.ColorPicker",{value:"000000",});return{text:App.Nls["emxProgramCentral.Gantt.ChangeTaskColor"],iconCls:"icon icon-taskColor",isValidAction:s.isValidForColor,menu:{plain:true,defaults:{scope:s},items:[{xtype:"colorpicker",colors:["000000","993300","333300","003300","003366","000080","333399","C71585","800000","FF6600","808000","008000","008080","0000FF","666699","FF1493","FF0000","FF9900","99CC00","339966","33CCCC","3366FF","800080","FF69B4","FF00FF","FFCC00","FFFF00","00FF00","00FFFF","00CCFF","993366","FFB6C1","FF99CC","FFCC99","FFFF99","CCFFCC","CCFFFF","99CCFF","CC99FF","FFC0CB",],allowReselect:true,listeners:{select:function(x,u){var t=d.ComponentQuery.query("#dpmprojectgantt")[0];var y=t.lockedGrid.getSelectionModel().selected.items;for(var w=0,v=y.length;w<v;w++){y[w].set("Color",u)}s.hide()},scope:s}},{text:App.Nls["emxProgramCentral.Gantt.SetDefault"],handler:function(){var t=d.ComponentQuery.query("#dpmprojectgantt")[0];var w=t.lockedGrid.getSelectionModel().selected.items;for(var v=0,u=w.length;v<u;v++){w[v].set("Color","")}this.hide()},}]}}};this.syncOnAddRemoveTask=function(C,G){var J=d.ComponentQuery.query("#dpmprojectgantt")[0];var E=J.crudManager;var s=new Array();var A=J.getTaskStore();var r=E.transport.sync.url;var K=C.rec;f.getStoreTaskExpandStatus(A);var z={};s.push(G);s.push(z);z=cpnl.preProcessAddRemove(s);if(e.DELETE==G){var x="";var B=J.lockedGrid.getSelectionModel().selected.items;for(var I=0,H=B.length;I<H;I++){x+=B[I].id+","}var y=this;var E=J.crudManager;var D={};D.AddRemoveTask=true;E.transport.sync.params.AddRemoveTask=true;var F="/resources/v1/modeler/tasks/"+x+"?$fields=none,taskRequirement,effortId,objectId&$include=none";o.ajaxRequest({url:F,type:"GET",dataType:"json",async:false,callback:function(R){var U=R.data;if(U){var N=true;var O=J.lockedGrid.getSelectionModel().selected.items;var Q={};Q.MandExcludeTaskIds=[];Q.TaskIdsWithEffort=[];for(var T=0;T<U.length;T++){var V=U[T].dataelements;if(V.taskRequirement&&V.taskRequirement=="Mandatory"){Q.MandExcludeTaskIds.push(V.objectId)}else{if(V.effortId&&V.effortId!=""){Q.TaskIdsWithEffort.push(V.objectId)}}}if(Q.MandExcludeTaskIds.length>0||Q.TaskIdsWithEffort.length>0){var W=f.filterBy_Mandatory_Effort_Effectivity(Q);O=J.lockedGrid.getSelectionModel().selected.items;if(O.length==0){alert(W);N=false}else{N=confirm(W+" Do you want to continue deleting with other selected tasks?")}}if(N){var M=y.getResourcePanelContextId();var P=false;var X=new Array();for(var T=0,S=O.length;T<S;T++){X.push(O[T].id);if(M!=""&&O[T].id==M){P=true}}if(P){var L=d.ComponentQuery.query("#dpmresourceutilizationpanel")[0];L.collapse()}A.removeTasks(O);E.sync();s=new Array();s.push(G);s.push(r);if(f.isAddTask(G)){s.push(C)}else{if(f.isDeleteTask(G)){s.push(z)}}cpnl.postProcessAddRemove(s)}else{E.reject()}}}})}else{var u;switch(G){case e.ADD_PHASE:u="Phase";break;case e.ADD_GATE:u="Gate";break;case e.ADD_MILESTONE:u="Milestone";break;default:u="Task"}var t=A.model;var v=new t({leaf:true});v.setPercentDone(0);v.set(v.startDateField,K.getStartDate());v.set(v.endDateField,K.getEndDate());v.set(v.durationField,"1");v.set(v.durationUnitField,"d");v.data.DisplayStartDate=K.getStartDate();v.data.DisplayFinishDate=K.getEndDate();if(e.ADD_TASK_ABOVE==G){K.addTaskAbove(v);var w=v.data.PhantomId;var D={};D.AddRemoveTask=true;D[w]={addTaskAbove:true,type:u,selectedTaskId:K.id};E.transport.sync.params.AddRemoveTask=true;E.transport.sync.params.extraParam=D}else{App.Infra.expandStatus[K.get("Id")]=true;K.addSubtask(v);var w=v.data.PhantomId;var D={};D.AddRemoveTask=true;D[w]={addTaskAbove:false,type:u,};E.transport.sync.params.AddRemoveTask=true;E.transport.sync.params.extraParam=D}E.sync();s=new Array();s.push(G);s.push(r);if(f.isAddTask(G)){s.push(C)}else{if(f.isDeleteTask(G)){s.push(z)}}cpnl.postProcessAddRemove(s)}};this.preProcessAddRemove=function(y){var t=d.ComponentQuery.query("#dpmprojectgantt")[0];var u=y[0];if(f.isDeleteTask(u)){var B=y[1];var C=t.lockedGrid.getSelectionModel().selected;var w=C.items;for(var v=0,r=C.length;v<r;v++){var x=w[v].id;var s=t.taskStore.getModelById(x);var A=s.get("TaskProjectId");if(!B[A]){B[A]=0}var z=B[A];B[A]=parseInt(z)+1}return B}};this.postProcessAddRemove=function(A){var r=d.ComponentQuery.query("#dpmprojectgantt")[0];var x=r.crudManager;var s=A[0];var y=A[1];x.transport.sync.url=y;if(f.isAddTask(s)){var u=A[2];var v=u.rec;var D=v.get("TaskProjectId");D=(D==null)?v.id:D;var w=r.taskStore.getModelById(D);var B=w.get("LastSequence");B=(B)?B:0;w.set("LastSequence",parseInt(B)+1)}else{if(f.isDeleteTask(s)){var E=A[2];for(var z in E){var C=r.taskStore.getModelById(z);var t=E[z];var B=C.get("LastSequence");C.set("LastSequence",parseInt(B)-parseInt(t))}}}x.commit()};this.getDependencyModel=function(s){var E={SS:0,SF:1,FS:2,FF:3};var v="";var y="";var u="0.0";var x="d";var D=false;var B=s.split(":");if(B.length>2){D=true}if(D){v=B[0]+":"+B[1]}else{v=B[0]}var z=B[B.length-1];var w=z.search("\\-")!=-1?"-":"+";var A=z.split(w);var C=A.length>1;y=A[0];y=E[y.toUpperCase()];if(C){var t=A[1];var F=t.split(" ");u=F[0];x=F[1]}u=("-"==w)?(w+u):u;var r=d.create("Gnt.model.Dependency",{From:v,Type:y,Lag:u,LagUnit:x});return r};this.getDependencyModelArray=function(w){var v=[];w=w.trim();if(w&&w!=""){var u=(w.search(",")!="-1")?true:false;if(!u){var r=this.getDependencyModel(w);v.push(r)}else{dependencyArr=w.split(",");for(var s=0;s<dependencyArr.length;s++){var t=dependencyArr[s];var r=this.getDependencyModel(t);v.push(r)}}}return v};this.getFormattedDate=function(s){if(s instanceof Date){var r=d.Date.format(s,"d-m-Y");var t=s.getHours()+":"+s.getMinutes()+":"+s.getSeconds();return r+" "+t}return""};return g});