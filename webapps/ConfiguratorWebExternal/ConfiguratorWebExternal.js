if(typeof PSTree==="object"){define("DS/ConfiguratorWebPSTree",PSTree)}else{if(require.toUrl("DS/ConfiguratorWebPSTree").indexOf("PSTreeLibrary")===-1){(function(){var a=require.toUrl("DS/ConfiguratorWebPSTree/PSTreeLibrary");if(a.indexOf("?")>-1){a=a.substring(0,a.indexOf("?"))}require.config({paths:{"DS/ConfiguratorWebPSTree":a},shim:{"DS/ConfiguratorWebPSTree":{exports:"PSTree"}}})})()}}define("DS/ConfiguratorWebExternal/PSTreeLib",["DS/ConfiguratorWebPSTree"],function(a){return a});