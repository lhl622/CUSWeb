define("DS/DMUPlayCompare/DMUCompare3DNode3D",["DS/Visualization/ThreeJS_DS","DS/Visualization/Node3D","DS/DMUBaseUI/DMUNode3D","DS/DMUBaseExperience/EXPUtils","DS/DMUCompareVisu/DMUBaseCompareServices"],function(b,c,a,e,d){return a.extend({init:function(g){this._parent(g);var h=this;var f;this.removeDMUNode3DOverload=function(){if(f){f.clean()}f=null;h=null};this.update=function(s){var z;if(!h){return}h.setName(g.getAttribute("sName"));if(f){f.clean()}if(s.bVisible){var j=s.selections;var q=s.relativePos;var o=[];var t=[];var n=[];var k=s.commoncolor;for(z=0;z<j.length;z++){if(j[z].id){o.push(j[z].id)}if(j[z].color){t.push(j[z].color)}if(q[z]){n.push(q[z])}}var r=e.strToColor(t[0]);var p=e.strToColor(t[1]);var u=e.colorToHex(r);var i=e.colorToHex(p);var v=e.colorToHex(k);var w=g.getParent();var A=w.getChildWithID(o[0]);if(!A.pathElement&&w.getLinksManager(false)){w.getLinksManager(false).completeData()}if(!A.pathElement){return false}var m=w.getChildWithID(o[1]);if(!m.pathElement&&w.getLinksManager(false)){w.getLinksManager(false).completeData()}if(!m.pathElement){return false}var l={TitleNls:"3D Compare",New:{nls:"Old",color:u,name:"Part1",pathElements:[A.pathElement]},Old:{nls:"New",color:i,name:"Part2",pathElements:[m.pathElement]},Common:{nls:"Common",color:v}};f=new d(g._frmWindow);f.compare(l);f.setLegendVisibleFlag(false)}h.setVisibility(s.bVisible);g._viewer.render()}},remove:function(){if(this.removeDMUNode3DOverload){this.removeDMUNode3DOverload()}}})});define("DS/DMUPlayCompare/DMUCompareImport",["UWA/Class"],function(a){return a.extend({init:function(b){this.importData=function(d,c){if(d&&c&&b){c.fillObjectAttributes(b,d);c.registerForPostImport(b)}};this.afterImport=function(){if(b){b.buildNode()}}}})});define("DS/DMUPlayCompare/DMUCompare",["DS/DMUBaseReview/DMUOverloadableObject","DS/DMUBaseExperience/EXPUtils","DS/Visualization/ThreeJS_DS","DS/DMUMarkupsController/DMUMarkupsController","DS/DMUPlayCompare/DMUCompareImport","DS/DMUBaseExperience/DMUContextManager"],function(h,f,d,e,a,c){var b=[{name:"oSelections",type:"objectDefinition",JSONname:"PropertiesCompare.Selections"},{name:"bVisible",type:"bool",JSONname:"PropertiesCompare.visible",isOverloadable:true},{name:"cCommonColor",type:"Color",JSONname:"PropertiesCompare.commoncolor",defaultValue:new d.Color("#ffffff")},{name:"DMUObjects",type:"listObjects",JSONname:"PropertiesCompare.DMUObjects",defaultValue:[]},];var g=h.extend({init:function(l,k){this._parent(l,k);this._sExpType="DMUCompare";this._parameters=this._parameters.concat(b);var m=this;var j=new a(m);this.importData=j.importData;this.afterImport=j.afterImport;if(c.getAuthoringFeatureTypes().indexOf("Marker")!==-1){var i="DS/DMUMarker/DMUMarkerExport";require([i],function(o){var n=new o(m);m.exportData=n.exportData})}},initComponent:function(j){this._parent(j);this._viewer=j.context._viewer;var i=e.getDMUMarkupsController({context:this._viewer});if(i){i.registerMarker(this)}},remove:function(){this._parent();var i=e.giveDMUMarkupsController({context:this._viewer});if(i){i.unregisterMarker(this)}e.unreferenceDMUMarkupsController({context:this._viewer})},onViewerEventCB:function(){},_checkUnderCertainCommand:function(){return f.checkIfCommandIsRunning(this._viewer)||this.isReadOnly()}});return g});define("DS/DMUPlayCompare/DMUCompare3D",["DS/DMUPlayCompare/DMUCompare","DS/DMUPlayCompare/DMUCompare3DNode3D"],function(c,b){var a=[{name:"vRelativePosition",type:"objectDefinition",JSONname:"Properties3DCompare.RelativePosList"}];return c.extend({init:function(e,d){this._parent(e,d);this._sExpType="DMUCompare3D";this._sType="Compare3D";this._parameters=this._parameters.concat(a);this.defineMembersFromParameters();var f=this;this.buildNode=function(){f._nNode=new b(f);f.refreshNode()};this.refreshNode=function(){if(f._nNode&&!this.getParent().isImporting()){f._nNode.update({bVisible:f.getAttribute("bVisible"),commoncolor:f.getAttribute("cCommonColor"),relativePos:f.getAttribute("vRelativePosition"),selections:f.getAttribute("oSelections"),})}}},GetType:function(){return"DMUCompare3D"}})});