/*! Copyright 2014 Dassault Systèmes */
if(typeof d3==="object"){define("DS/VEND3js",VEND3js)}else{if(require.toUrl("DS/VEND3js").indexOf("3.5.17/d3")===-1){D3_BASEPATH=require.toUrl("DS/VEND3js/3.5.17/");if(D3_BASEPATH.indexOf("?")>-1){D3_BASEPATH=D3_BASEPATH.substring(0,D3_BASEPATH.indexOf("?"))}require.config({paths:{"DS/VEND3js":D3_BASEPATH+"d3.min"},shim:{"DS/VEND3js":{exports:"d3"}}})}}define("DS/D3js_external/D3js",["DS/VEND3js"],function(a){return a});