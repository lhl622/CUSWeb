(function(a){Polymer({is:"cmp-runtime-file-selection",properties:{datahandlerconfigstring:{type:String,value:"",notify:true,observer:"datahandlerconfigstringChanged"},filename:{type:String,value:"",notify:true},_datahandler:{type:String,value:null}},datahandlerconfigstringChanged:function(b,d){if(b.length>0&&b!==undefined){this.datahandlerconfigstring=b;var c=this;require(["DS/JSCMM/SMAJSCMMFileDataHandler"],function(e){c._datahandler=(c._datahandler===null||c._datahandler===undefined)?new e():c._datahandler;c._datahandler.parseDataHandlerConfig(c.datahandlerconfigstring);c.set("filename",c._datahandler.getFileName())})}}})}(this));