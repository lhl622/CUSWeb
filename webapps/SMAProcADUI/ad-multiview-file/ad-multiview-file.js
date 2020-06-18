/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
window.require(["DS/SMAProcADUI/ad-execdir/ADExecDir"],function(b){var a=window.Polymer,g=window.DS;var f=null,e=null,d=null,c=null;f=function(){var h=false;if(this.model){a.dom(this.$.fileSize).textContent=this.formatFileSize(this.model.size);a.dom(this.$.lastModifiedDate).textContent=this.formatDate(this.model.lastModified);if(this.model.details){h=this.model.details.hasOwnProperty("revision")}}else{a.dom(this.$.fileSize).textContent="";a.dom(this.$.lastModifiedDate).textContent=""}this.expandable=h};e=function(){var i={id:this.model.modelID,type:"file",name:this.model.name,size:this.model.size,lastModified:this.model.lastModified,path:this.model.path,relativePath:this.model.relativePath,station:this.model.station,details:this.model.details};if(typeof this.model.mdType!=="undefined"&&this.model.mdType){i.mdType=this.model.mdType}var h=this.model;while(typeof h!=="undefined"&&h&&!(h instanceof b.ADExecDir)){h=h.parent}if(h instanceof b.ADExecDir){i.credentials=h.credentials}var j={modelSource:this.modelSource,model:i};return j};c=function(h){h.item=this};d=function(){this.expandable=false;this._modelChangedFunction=f.bind(this);this._dragDataFunction=e.bind(this)};g.SMAProcADUI=g.SMAProcADUI||{};g.SMAProcADUI.ADMultiviewFile=a({is:"ad-multiview-file",ready:function(){return d.apply(this,arguments)},dragOverFunction:function(){},dropFunction:function(){return c.apply(this,arguments)},_computeTitle:function(h){var i="";if(h){if(h.name){i+=h.name}if(h.description){i+=":"+h.description}}return i},_computeNumberedClass:function(h){return(h&&h.details&&h.details.revision)?"div-numbered":"div-unnumbered"},behaviors:[g.SMAProcSP.SPBase,g.SMAProcADUI.ADMultiviewItem,g.SMAProcADUI.FormatUtilities]})});