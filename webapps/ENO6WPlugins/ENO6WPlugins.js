/*! Copyright 2019 Dassault Systèmes */
var jQueryAlreadyDefined=typeof jQuery!=="undefined";if(jQueryAlreadyDefined&&jQuery.fn.jquery==="3.3.1"){define("DS/ENO6WPlugins/jQuery_3.3.1",function(){return jQuery})}else{if(require.toUrl("DS/VENENO6WPlugins/jQuery331").indexOf("3.3.1")===-1){var lJQueryPath=require.toUrl("DS/VENENO6WPlugins/plugins/jquery/3.3.1/");var lIndexOfQuestionMark=lJQueryPath.indexOf("?");if(lIndexOfQuestionMark>-1){lJQueryPath=lJQueryPath.substring(0,lIndexOfQuestionMark)}require.config({paths:{"DS/VENENO6WPlugins/jQuery331":lJQueryPath+"jquery"},shim:{"DS/VENENO6WPlugins/jQuery331":{exports:"jQuery"}}})}define("DS/ENO6WPlugins/jQuery_3.3.1",["DS/VENENO6WPlugins/jQuery331"],function(b){var a=b.noConflict(jQueryAlreadyDefined);return a})}
/*! Copyright 2014 Dassault Systèmes */
var makeLoaderUseJquery211=function(){if(require.toUrl("DS/VENENO6WPlugins/jQuery").indexOf("latest")===-1){var a=require.toUrl("DS/VENENO6WPlugins/plugins/jquery/latest/");var b=a.indexOf("?");if(b>-1){a=a.substring(0,b)}require.config({paths:{"DS/VENENO6WPlugins/jQuery":a+"jquery"},shim:{"DS/VENENO6WPlugins/jQuery":{exports:"jQuery"}}})}};if(typeof jQuery!=="undefined"){if(jQuery.fn.jquery!=="2.1.1"){makeLoaderUseJquery211();define("DS/ENO6WPlugins/jQuery",["DS/VENENO6WPlugins/jQuery"],function(){var a=jQuery.noConflict(true);jQuery.noConflict();return a})}define("DS/ENO6WPlugins/jQuery",function(){return jQuery})}else{makeLoaderUseJquery211();define("DS/ENO6WPlugins/jQuery",["DS/VENENO6WPlugins/jQuery"],function(a){jQuery.noConflict();return a})}
/*! Copyright 2014 Dassault Systèmes */
if(typeof jQuery!=="undefined"&&typeof jQuery.ui!=="undefined"){define("DS/ENO6WPlugins/jQueryUI",function(){return jQuery.ui})}else{if(require.toUrl("DS/VENENO6WPlugins/jQueryUI").indexOf("latest")===-1){var lJQueryUIPath=require.toUrl("DS/VENENO6WPlugins/plugins/jqueryui/latest/js/");var lIndexOfQuestionMark=lJQueryUIPath.indexOf("?");if(lIndexOfQuestionMark>-1){lJQueryUIPath=lJQueryUIPath.substring(0,lIndexOfQuestionMark)}require.config({paths:{"DS/VENENO6WPlugins/jQueryUI":lJQueryUIPath+"jquery.ui.custom.min"},shim:{"DS/VENENO6WPlugins/jQueryUI":{deps:["DS/ENO6WPlugins/jQuery"],exports:"jQuery.ui"}}})}}define("DS/ENO6WPlugins/jQueryUI",["DS/VENENO6WPlugins/jQueryUI"],function(a){return a});