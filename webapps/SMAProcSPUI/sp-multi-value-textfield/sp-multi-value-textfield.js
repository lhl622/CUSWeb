(function(e){var b=e.Polymer,d,c,a;c=function(g){var f=Polymer.dom(this.root).querySelector("#input");if(((g.keyIdentifier&&g.keyIdentifier==="Enter")||(g.key==="Enter"))&&f.value!==""&&f.value!==undefined){var h=a(this.datatype,f.value);if(h.valid){this.updateValue(h.value);f.value=""}else{f.value="";this.fire("sp-multi-value-textfield-error",{msg:h.msg})}}};a=function(f,g){var h={valid:false,msg:"Invalid Data",value:""};if(f==="boolean"){if(g.toLowerCase()==="true"||g.toLowerCase()==="false"){h.valid=true;h.value=g.toUpperCase()}else{h.msg='Invalid data entered. Enter "true" or "false"'}}else{h.value=g;h.valid=true}return h};e.SPMultiValueTextfield=Polymer({is:"sp-multi-value-textfield",properties:{haserror:{notify:true,type:Boolean,value:false,reflectToAttribute:true},placeholder:{type:String,value:"Enter values delimited by return key",notify:true,reflectToAttribute:true},readonly:{type:Boolean,value:false,notify:true,reflectToAttribute:true},value:{type:String,notify:true},valueArrayAll:{type:Array,computed:"convertToArray(value)"},datatype:{type:String,value:""}},onKeyUp:c,removeItem:function(h){var g,f;if(!this.readonly){h.preventDefault();h.stopPropagation();f=this.value.split("\n");g=f.indexOf(h.detail.value);f.splice(g,1);this.value=f.join("\n")}},convertToArray:function(f){if(f){return f.split("\n")}return[]},updateValue:function(f){if(this.value===""||this.value===undefined){this.value=f}else{if(this.value){var g=this.value.split("\n");g[g.length]=f;this.value=g.join("\n")}}this.async(function(){var h=this.querySelectorAll("sp-tag");if(h.length>1){this.$.content.scrollTop=h[h.length-1].offsetTop}}.bind(this))},focusInput:function(){var f=Polymer.dom(this.root).querySelector("#input");if(f){f.focus()}}})}(this));