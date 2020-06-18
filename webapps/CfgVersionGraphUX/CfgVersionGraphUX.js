define("DS/CfgVersionGraphUX/scripts/CfgTreeNodeModel",["DS/LifecycleDAGModel/DAGNodeModelBase"],function(c){var a=null;var b=function(g,f,l,k,e,m,j,d,i,h){if(!g){this.options={isEmpty:true}}else{if(g instanceof c){this.options={};for(var n in g.options){(n!=="children")&&(this.options[n]=g.options[n])}}else{this.options={id:g,versionType:m,name:f,label:l,children:[],revision:k,creationDate:h,grid:{range:i,revision:k,current:e,creationDate:h},data:{frozen:d}}}}c.call(this,this.options)};b.prototype=Object.create(c.prototype);b.prototype.constructor=b;b.prototype.isLeaf=function(){return(this.options.grid.__isLeaf__===true)};b.prototype.isActive=function(){return(this.options.grid.__isActive__===true)};b.prototype.clone=function(){return new b(this)};b.prototype.sortFunction=function(e,d){(!d)&&(e=this,d=e);return(e.options.grid.creationDate>d.options.grid.creationDate)};b.prototype.getLastLeaf=function(){for(var d=this;d.hasChildren();d=d.getLastChild()){}return d};b.prototype._getID=function(){return this.isEmpty()?this._id:this.options.id};b.prototype.isEmpty=function(){return this.options.isEmpty===true};b.prototype.refreshNodeData=function(e){e=e||{};e instanceof c&&(e=e.options.grid);for(var d in this.options.grid){if(!(d.startsWith("__")&&d.endsWith("__"))&&(!(typeof e[d]==="object"))){if(d==="title"){var f=e.title||e.label;if(f&&(this.options.label!==f)){this.setAttribute("title",this.options.label=f)}}if(e[d]&&(e[d]!==this.options.grid[d])){this.setAttribute(d,e[d])}}}};b.prototype.getAttribute=function(d){return this.options.grid[d]};return b});define("DS/CfgVersionGraphUX/scripts/CfgVersionGraphColumnManager",["DS/GraphListView/ColumnManagerBase","i18n!DS/CfgVersionGraphUX/assets/nls/CfgVersionGraphNLS"],function(a,b){return a.extend({init:function(c){this._parent(c);this.setDefaultColumns([{text:"",dataIndex:"bi_color",width:10,isSortable:false,isDraggable:false,isEditable:false,alwaysOn:true},{text:b.CFG_Label_Graph,dataIndex:"__GRAPH__",width:160,style:{overflow:"scroll"},isSortable:false,isDraggable:false,isEditable:false,alwaysOn:true},{text:"<span style='font-weight:bold' class='fonticon fonticon-infinity'/>",dataIndex:"range",width:35,isSortable:false,isDraggable:false,isEditable:false,isHidden:false,},{text:b.CFG_Label_Title,dataIndex:"tree",width:140,isSortable:false,isDraggable:false,isEditable:false,isHidden:false,},{text:b.CFG_Label_Revision,dataIndex:"revision",width:85,isSortable:true,isDraggable:false,isEditable:false,},{text:b.CFG_Label_State,dataIndex:"current",width:85,isSortable:false,isDraggable:false,isEditable:false,},{text:b.CFG_Label_CreationDate,dataIndex:"creationDate",width:"auto",isSortable:true,isDraggable:false,isEditable:false},],true)}})});define("DS/CfgVersionGraphUX/scripts/CfgVersionGraphModelManager",["DS/CfgVersionGraphUX/scripts/CfgTreeNodeModel"],function(a){return UWA.Class.extend({setModel:function(b){this._treeDocument=b;this._treeDocument.empty();this._nodeArray=this._treeDocument._nodeList},createModel:function(n){this._treeDocument.prepareUpdate();for(var g=0;g<n.length;g++){var l=0;var e=n[g].id;var j=new Date(n[g].originated.replace("Z","")).toLocaleString();var d=n[g].name;var m=n[g].revision;var o=n[g].label;var c=n[g].current;var k=n[g].input;var b=n[g].data.frozen;var h="";var f=new a(e,d,o,m,c,k,true,b,h,j);if(g===0){this._treeDocument.addChildNode(f,0,null)}else{if(n[g].parentid){this._treeDocument.addChildNode(f,0,this.getTreeNodeParent(n[g].parentid))}else{this._treeDocument.addChildNode(f,0,null)}}if((n[g].children&&n[g].children.length>0)){this.addChild(n[g].children)}}this._treeDocument._isLoaded=true;this._treeDocument._nodeList.sort(function(p,i){return(new Date(p.options.creationDate)).getTime()-(new Date(i.options.creationDate)).getTime()});this._treeDocument._nodeList.reverse();this._treeDocument.pushUpdate();return this._treeDocument},addChild:function(d){for(var j=0;j<d.length;j++){var e=this.getTreeNodeParent(d[j].parentid);var m=0;var h=d[j].id;var l=new Date(d[j].originated.replace("Z","")).toLocaleString();var g=d[j].name;var n=d[j].revision;var o=d[j].label;var f=d[j].current;var p=d[j].input;var c=d[j].data.frozen;var k="";var b=new a(h,g,o,n,f,p,true,c,k,l);if(b.options.versionType==="Derivation"){this._treeDocument.addChildNode(b,1,e)}else{this._treeDocument.addChildNode(b,0,e)}if((d[j].children&&d[j].children.length>0)){this.addChild(d[j].children)}this._treeDocument.prepareAddDelete();this._treeDocument.pushAddDelete()}},getTreeNodeParent:function(c){var b=null;this._nodeArray.forEach(function(d){if(d.options.id==c){b=d}});return b}})});define("DS/CfgVersionGraphUX/scripts/CfgVersionGraph",["UWA/Core","DS/UIKIT/Iconbar","DS/GraphListView/GraphListView","DS/CfgVersionGraphUX/scripts/CfgVersionGraphModelManager","DS/CfgVersionGraphUX/scripts/CfgVersionGraphColumnManager","DS/CfgBaseUX/scripts/CfgToggle","DS/CfgEvolutionUX/CfgEvolutionUtils","i18n!DS/CfgVersionGraphUX/assets/nls/CfgVersionGraphNLS","css!DS/CfgVersionGraphUX/CfgVersionGraphUX.css"],function(f,a,h,g,b,d,i,c){var e=h.extend({_options:undefined,CfgExpressionBox:false,CfgExpressionBoxMaximized:false,CfgSelectedNode:null,CfgSelectedModel:null,VersionGraphModelMgr:null,CfgToolbarContainer:null,VersionGraphContainer:null,CfgExpressionContainer:null,getCfgToolbarContainer:function(){return this.CfgToolbarContainer},getVersionGraphContainer:function(){return this.VersionGraphContainer},getCfgExpressionContainer:function(){return this.CfgExpressionContainer},getEvolutionExpressionAndJson:function(){return i.GetEvolutionExpressionAndJson(this.CfgSelectedModel)},init:function(j){var k=this;this.VersionGraphContainer=f.createElement("div",{"class":"versionGraphContainer",html:'<div class="version-subway-canvas"></div>',styles:{width:"100%",border:"1px solid #D4D4D4",height:"calc(100% - 40px)"}});this._options=f.extend({container:k.VersionGraphContainer.getElement(".version-subway-canvas"),columnManager:new b(j),defaultCellHeight:48,enableListSelection:false,highlightNodesOnSelect:true,highlightParentEdgesOnNodeSelect:true,graphSortingColumnID:["creationDate","revision"],selection:{canMultiSelect:true,isDraggable:false,unselectAllOnEmptyArea:false},onDragStartCell:function(l,m){if(!m.dataIndex==="__GRAPH__"&&typeof fn==="function"){fn(l,m)}else{l.preventDefault()}}},j);this._parent(this._options);this.VersionGraphModelMgr=new g();this.VersionGraphModelMgr.setModel(this.getModel());this.VersionGraphModelMgr.createModel(this._options.allNodesArray);this.activate(true);this.VersionGraphContainer.getElement(".version-subway-canvas").setStyles({maxHeight:(((this._manager.getRows().length+1)*48)+24)+"px"});this.VersionGraphContainer.querySelector(".wux-tree-treelistview").setAttribute("style","height:100% !important;")},render:function(){this._manager.forceMultiSelection(true);var n=this;this.CfgToolbarContainer=f.createElement("div",{"class":"graphToolbarContainer",styles:{width:"100%",height:"40px"}});var k={toggleID:"cfgInfiniteToggle",toggleLabel:c.Infinity_SelectionMode,toggleTooltip:c.Infinity_Tooltip,width:"auto"};this.infiniteToggle=new d(k);this.infiniteToggleContainer=this.infiniteToggle.render();this.infiniteToggleContainer.setStyles({height:"100%"});this.expressionToolbarContainer=f.createElement("div",{"class":"expressionToolbarContainer",styles:{"float":"right",height:"100%"}});this.expressionToolbar=new a({renderTo:n.expressionToolbarContainer,items:[{className:"divider"},{fonticon:"book-open",text:c.CFG_Expression_View,handler:function(){if(n.CfgExpressionBox===false){n.viewExpressionBox();n.CfgExpressionBox=true}else{n.hideExpressionBox();n.CfgExpressionBox=false}}}]});this.expressionToolbarContainer.inject(this.CfgToolbarContainer);this.infiniteToggleContainer.inject(this.CfgToolbarContainer);this.CfgExpressionContainer=f.createElement("div",{"class":"CfgExpressionContainer",styles:{display:"none",height:"110px"}});var j=f.createElement("div",{styles:{height:"40px",width:"100%"}});j.setAttribute("id","effExpHeader");var l=f.createElement("div",{text:"Expression",styles:{"float":"left",fontWeight:"bold",paddingTop:"10px"}});l.setAttribute("id","effExpHeaderTitle");l.inject(j);var m=f.createElement("div",{styles:{"float":"right"}});m.setAttribute("id","effExpHeaderIconBar");this.expIconBar=new a({renderTo:m,items:[{fonticon:"resize-full",name:"maximize_icon",handler:function(){if(n.CfgExpressionBoxMaximized===false){n.maximizeExpressionBox();n.CfgExpressionBoxMaximized=true}else{n.resetExpressionBox();n.CfgExpressionBoxMaximized=false}}}]});m.inject(j);j.inject(this.CfgExpressionContainer);var p=f.createElement("div",{text:"",styles:{overflow:"auto",border:"1px solid #D4D4D4",padding:"5px",textAlign:"left",height:"calc(100% - 40px)",width:"100%"}});p.setAttribute("id","expanderContent");p.inject(this.CfgExpressionContainer);if((n._options.psJson!=null)&&(n._options.psJson.length>0)){var o="<span style='font-weight:bold' class='fonticon fonticon-infinity'/>";n._model.getAllDescendants().forEach(function(u){u.prepareUpdate();if(n._options.psJson!=null){var x=n._options.psJson;var E=x.length;for(var B=0;B<E;B++){var A=x[B];var v=A.start.isRoot;if(u.options.name==A.start.name&&u.options.revision==A.start.revision){if(v==true){u.select();u.__LISTVIEWCOPY__.updateOptions({grid:{range:o}});u.getAllDescendants().forEach(function(F){if(F.__LISTVIEWCOPY__){F.__LISTVIEWCOPY__.updateOptions({grid:{range:o}});F.select()}});var q=u.isRoot();var z=null;if(q==true){var s=n._model.getAllDescendants();var w=s.length;var r=0;for(var y=0;y<w;y++){var t=s[y];var v=t.isRoot();if(r==1&&v==true){t.select();t.__LISTVIEWCOPY__.updateOptions({grid:{range:o}});t.getAllDescendants().forEach(function(F){if(F.__LISTVIEWCOPY__){F.__LISTVIEWCOPY__.updateOptions({grid:{range:o}});F.select()}})}if(v==true&&u.options.name==t.options.name&&u.options.revision==t.options.revision){r=1}}}if(A.end.length!=0){var E=A.end.length;for(var B=0;B<E;B++){var C=A.end[B];n._model.getAllDescendants().forEach(function(J){if(J.options.name==C.name&&J.options.revision==C.revision){J.unselect();J.__LISTVIEWCOPY__.updateOptions({grid:{range:""}});J.getAllDescendants().forEach(function(O){if(O.__LISTVIEWCOPY__){O.__LISTVIEWCOPY__.updateOptions({grid:{range:""}});O.unselect()}});var F=J.isRoot();var N=null;if(F==true){var H=n._model.getAllDescendants();var L=H.length;var G=0;for(var M=0;M<L;M++){var I=H[M];var K=I.isRoot();if(G==1&&K==true){I.unselect();I.updateOptions({grid:{range:""}});I.getAllDescendants().forEach(function(O){if(O.__LISTVIEWCOPY__){O.__LISTVIEWCOPY__.updateOptions({grid:{range:""}});O.unselect()}})}if(K==true&&J.options.name==I.options.name&&J.options.revision==I.options.revision){G=1}}}if(C.IsExcluded==false){J.select()}else{J.unselect()}}})}}}else{u.select()}}}u.pushUpdate()}else{var D=tree.getManager().getDocument().getAllDescendants();if(D.length>0){D[D.length-1].select()}}})}n._manager.onCellRequest(function(q){if(q.nodeModel._options.data.frozen==true){q.view.addClassName("disablerow")}else{q.view.removeClassName("disablerow")}});if(n._options.use!="FILTER"){this.infiniteToggle.setToggleState(true)}},onSelectListView:function(k){var m=this;var n="<span style='font-weight:bold' class='fonticon fonticon-infinity'/>";var j=this._model.getXSO().get();var l=k.data.nodeModel.__MASTER__;this._parent(k);if(this.infiniteToggle.getToggleState()==true){if(l.processDescendants().length>0){l.__LISTVIEWCOPY__.updateOptions({grid:{range:n}});l.processDescendants({async:true,onlyVisibleNodes:true,processNode:function(o){var p=o.nodeModel;if(!p._isTrueRoot()&&!p.isEmpty()&&p.__LISTVIEWCOPY__.options.data.frozen==false){p.select();if(p.__LISTVIEWCOPY__){p.__LISTVIEWCOPY__.updateOptions({grid:{range:n}});m._manager.updateRowView(p.__LISTVIEWCOPY__._getRowID())}}}})}else{l.__LISTVIEWCOPY__.updateOptions({grid:{range:n}})}}this.CfgSelectedNode=k.data.nodeModel.__MASTER__.getTreeDocument().getXSO().get();this.CfgSelectedModel=this._model;this.CfgExpressionContainer.getElement("div#expanderContent").setContent(i.getEvolutionDisplayExpression(this.CfgSelectedModel,this._options.ModelLabel,this._options.mode))},onUnselectListView:function(k){var m=this;var j=this._model.getXSO().get();var l=k.data.nodeModel.__MASTER__;this._parent(k);if(this.infiniteToggle.getToggleState()==true){if(l.processDescendants().length>0){l.__LISTVIEWCOPY__.updateOptions({grid:{range:""}});l.processDescendants({async:true,onlyVisibleNodes:true,processNode:function(n){var o=n.nodeModel;if(!o._isTrueRoot()&&!o.isEmpty()&&o.__LISTVIEWCOPY__.options.data.frozen==false){o.unselect();if(o.__LISTVIEWCOPY__){o.__LISTVIEWCOPY__.updateOptions({grid:{range:""}});m._manager.updateRowView(o.__LISTVIEWCOPY__._getRowID())}}}})}else{l.__LISTVIEWCOPY__.updateOptions({grid:{range:""}})}}else{l.__LISTVIEWCOPY__.updateOptions({grid:{range:""}})}this.CfgSelectedNode=k.data.nodeModel.__MASTER__.getTreeDocument().getXSO().get();this.CfgSelectedModel=this._model;this.CfgExpressionContainer.getElement("div#expanderContent").setContent(i.getEvolutionDisplayExpression(this.CfgSelectedModel,this._options.ModelLabel,this._options.mode))},_addEventListeners:function(){this._parent();this._addEvent("LISTVIEWMANAGER","sort",this.onSort.bind(this));this._addEvent("MASTER","attributeChanged",this.onNodeAttributeChange.bind(this));this._addEvent("LISTVIEWMANAGER","attributeChanged",this.onNodeAttributeChange.bind(this));this._addEvent("LISTVIEWMANAGER","UPDATE_VIEW_COMPLETED",this.onUpdateViewComplete.bind(this))},onNodeAttributeChange:function(j){var k=j.data||j;(k.changedAttribute==="__isActive__")&&this.onUpdateViewComplete()},onUpdateViewComplete:function(){var l=this._manager;for(var k=0,m,n=this._treeDoc.getAllDescendants(),j=n.length;k<j;k+=1){m=n[k];l[(m.isActive()?"addRowClass":"removeRowClass")](m._getRowID(),"version-explorer-subway-listview-active-version")}},onSort:function(j){var l="__GRAPH__",k=this._manager;if((j.columnDataIndex==="revision")||(j.columnDataIndex==="creationDate")){this.options.ascending=(j.sortOrder==="asc");this._clearGraph();this._updateGraph();(k.isColumnHidden(l))&&(k.elements.poolContainerRel.getElement(".subway-graph-canvas").show(),k.showColumn(l))}else{(!k.isColumnHidden(l))&&(k.hideColumn(l),k.elements.poolContainerRel.getElement(".subway-graph-canvas").hide())}},viewExpressionBox:function(){this.expressionToolbarContainer.getElement("span.fonticon-book-open").setStyle("color","#42a2da");if(this.CfgExpressionBoxMaximized===true){this.maximizeExpressionBox()}else{this.resetExpressionBox()}},hideExpressionBox:function(){this.expressionToolbarContainer.getElement("span.fonticon-book-open").setStyle("color","#b4b6ba");this.CfgExpressionContainer.setStyle("display","none");this.VersionGraphContainer.setStyle("display","block");this.VersionGraphContainer.setStyles({height:"calc(100% - 40px)"})},maximizeExpressionBox:function(){this.CfgToolbarContainer.setStyle("display","none");this.VersionGraphContainer.setStyle("display","none");this.CfgExpressionContainer.setStyle("display","block");this.CfgExpressionContainer.setStyles({height:"100%"});if(this.CfgExpressionContainer.getElement("li.item span.fonticon-resize-full")){this.CfgExpressionContainer.getElement("li.item span.fonticon-resize-full").setAttribute("class","fonticon fonticon-resize-small");document.querySelector(".CfgExpressionContainer").getElementsByClassName("fonticon-resize-small")[0].setAttribute("style","font-size:20px !important;color:#42a2da;")}this.expIconBar.getItem("maximize_icon").text=c.CFG_Restore_EBox},resetExpressionBox:function(){this.CfgToolbarContainer.setStyle("display","block");this.VersionGraphContainer.setStyle("display","block");this.VersionGraphContainer.setStyles({height:"calc(100% - 150px)"});this.CfgExpressionContainer.setStyle("display","block");this.CfgExpressionContainer.setStyle("height","110px");if(this.CfgExpressionContainer.getElement("li.item span.fonticon-resize-small")){this.CfgExpressionContainer.getElement("li.item span.fonticon-resize-small").setAttribute("class","fonticon fonticon-resize-full");document.querySelector(".CfgExpressionContainer").getElementsByClassName("fonticon-resize-full")[0].setAttribute("style","font-size:20px !important;color:#b4b6ba;")}this.expIconBar.getItem("maximize_icon").text=c.CFG_Max_EBox},});return e});