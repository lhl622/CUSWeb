/*! Copyright 2016 Dassault Systèmes */
if(typeof d3==="object"){define("DS/SPYD3js",SPYD3js)}else{if(require.toUrl("DS/SPYD3js").indexOf("3rdparty/d3js")===-1){D3_BASEPATH=require.toUrl("DS/SPYD3js/3rdparty/d3js/");if(D3_BASEPATH.indexOf("?")>-1){D3_BASEPATH=D3_BASEPATH.substring(0,D3_BASEPATH.indexOf("?"))}require.config({paths:{"DS/SPYD3js":D3_BASEPATH+"d3.min"},shim:{"DS/SPYD3js":{exports:"d3"}}})}}define("DS/SPYD3js_external/SPYD3js",["DS/SPYD3js"],function(a){return a});