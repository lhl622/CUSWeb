define("DS/MPFInviteModel/CompanyInviteDataProxy",["UWA/String","DS/MPFDataProxy/DataProxy"],function(c,b){var a;a=b.extend({init:function(d){this._parent(d,"/mdpeoplecompany/companies/{0}/invite")},buildPath:function(d){return c.format(this.resourcePath,d.parentResourceId)}});return a});define("DS/MPFInviteModel/InviteModel",["DS/MPFModel/MPFModel"],function(b){var a;var c={};c.SHOP_ID="ShopId";c.MEMBERS_ID="MembersId";a=b.extend({setup:function(d,e){this._parent(d,e);this._type="InviteModel"},getShopId:function(){return this.get(c.SHOP_ID)},setShopId:function(d){return this.set(c.SHOP_ID,d)},getMembersId:function(){return this.get(c.MEMBERS_ID)||[]},addMemberId:function(e){var d;d=this.getMembersId()||[];d.push(e);this.set(c.MEMBERS_ID,d)}});a.Fields=Object.freeze(c);return a});