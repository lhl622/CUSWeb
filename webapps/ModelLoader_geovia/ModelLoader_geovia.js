define("DS/ModelLoader_geovia/loader",["DS/WAFData/WAFData","DS/Visualization/ModelLoader","DS/Visualization/Node3D"],function(a,b,d){var c=function(){this.load=function(f,l,h,j,e,k){function g(o){var n=new b();n.setRenderCallback(k);n.setOnProgressCallback(h);n.setOnLoadedCallback(j);n.setOnErrorCallback(e);var m=new d();n.loadModel({provider:"FILE",format:"CGR",filename:o},m);l(m)}if(f&&f.physicalid&&f.physicalid.lastIndexOf(";")>=1){var i=f.physicalid.substring(f.physicalid.lastIndexOf(";")+1).replace(/_47_/g,"/").replace(/_63_/g,"?");if(i.endsWith(".Url")){a.request(i,{method:"GET",responseType:"json",onFailure:function(m){e({url:"",type:"PARSE"})},onComplete:function(m){g(m.url)}})}else{g(i)}}else{e({url:"",type:"PARSE"})}}};return c});