(function(){var a;a={is:"ra-table-row",behaviors:[SPBase],properties:{rowData:{type:Object,notify:true,value:function(){return[]}},scrollData:{type:Object,observer:"_scrollDataObserver"},rowBoxData:{type:Object,value:function(){return{}},notify:true},displayFunctions:{type:Object,value:function(){return{}}},expandFlag:{type:Boolean,value:true,notify:true},refreshCellBoxData:{type:Boolean,value:true,notify:true}},observers:["_rowBoxDataObserver(rowBoxData.*)","_rowDataChanged(rowData)"],_rowBoxDataObserver:function(b){},_rowDataChanged:function(c,b){},_getRowBoxData:function(c){var b=this.rowBoxData[c.id];return b},_scrollDataObserver:function(c,b){}};window.Polymer(a)})();