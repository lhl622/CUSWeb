define("UWA/Controls/SchemaForm/Sanitizers",["UWA/Core"],function(b){var a;a={"uwa-trim":function(c){return(c||"").trim()},"uwa-normalize-number":function(c){if(typeof(c)==="string"){return c===""?undefined:Number(c.replace(",",".").replace(" ",""))}else{return Number(c)}}};return b.namespace("Controls/SchemaForm/Sanitizers",a,b)});