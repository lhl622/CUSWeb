define("DS/CSIViewModelWebInterfaces/CSIVMClientColorOpacityParameter",["DS/CSICommandBinder/CSICommandBinder","DS/CSIViewModelWebInterfaces/CSIVMClientParameterLabels"],function(b,d){function e(f){this._RGBO=f||undefined}e.prototype.getRGBO=function(){return this._RGBO};var c=function(f,g){if(this._RGBO!=undefined){f.writeBool(d.DefaultRGB,this._RGBO.DefaultRGB);f.writeInt32(d.R,this._RGBO.R);f.writeString(d.G,this._RGBO.G);f.writeString(d.B,this._RGBO.B);f.writeBool(d.DefaultO,this._RGBO.DefaultO);f.writeString(d.O,this._RGBO.O)}};var a=function(f){var g={DefaultRGB:f.readBool(d.DefaultRGB),R:f.readInt32(d.R),G:f.readInt32(d.G),B:f.readInt32(d.B),DefaultO:f.readBool(d.DefaultO),O:f.readInt32(d.O),};return new e(g)};e.prototype.declareType=function(){b.declareType({type:"CSIViewModelColorOpacity",serialize:c,unserialize:a})};return e});