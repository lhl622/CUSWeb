define("DS/MPFExportOrdersComponent/ExportOrdersComponent",["UWA/Core","UWA/Class/View","DS/UIKIT/Mask","DS/UIKIT/Input/Button","DS/MPFServices/ObjectService","DS/MPFModelFactory/ExportOrderFactory","DS/MPFBuyer/BuyerType","DS/MPFPersonModel/PersonModel","DS/MPFCompanyModel/CompanyModel","DS/MPFFiniteStateMachine/FiniteStateMachine","DS/MPFUrl/UrlUtils","i18n!DS/MPFExportOrdersComponent/assets/nls/ExportOrdersComponent","css!DS/MPFExportOrdersComponent/MPFExportOrdersComponent"],function(k,b,i,m,l,j,e,h,a,g,f,n){var d={};d.LOADING="loading";d.CLICKABLE="clickable";d.NOT_DISPLAYED="not_displayed";var c=b.extend({className:"mpf-export-orders",setup:function(o){o=(o||{});l.requiredOfPrototype(o.buyerType,e,"options.buyerType must be a BuyerType");l.requiredOfPrototype(o.me,h,"options.me must be a PersonModel");l.requiredOfPrototype(o.exportOrderFactory,j,"options.exportOrderFactory must be an ExportOrderFactory");if(o.buyerType===e.COMPANY){l.requiredOfPrototype(o.company,a,"options.company must be a CompanyModel");this.company=o.company}this._parent(o);this.layoutV2=o.layoutV2===true;this.buyerType=o.buyerType;this.me=o.me;this.exportOrderFactory=o.exportOrderFactory;this.isUserPMPadmin=this._isUserPMPadmin();this.stateMachine=this._createStateMachine();this.downloadLink=this._createDownloadLink();if(this.layoutV2){this.container.addClassName("layout-v2")}},render:function(){if(this.stateMachine.getState()===d.LOADING){if(!this.layoutV2){i.mask(this.downloadLink.elements.input)}}else{if(this.stateMachine.getState()===d.CLICKABLE){this.container.setContent(this.downloadLink);if(!this.layoutV2){i.unmask(this.downloadLink.elements.input)}}}return this},_createStateMachine:function(){return new g({state:this.isUserPMPadmin?d.CLICKABLE:d.NOT_DISPLAYED,states:[d.CLICKABLE,d.LOADING,d.NOT_DISPLAYED],transitions:[{from:d.CLICKABLE,to:d.LOADING},{from:d.LOADING,to:d.CLICKABLE}]})},_createDownloadLink:function(){if(this.layoutV2){return k.createElement("span",{"class":"fonticon fonticon-download",events:{click:this._downloadOrders.bind(this)}})}else{return new m({className:"link",icon:"export-multiple",value:n.get("exportOrders"),events:{onClick:this._downloadOrders.bind(this)}})}},_downloadOrders:function(){var p=this;var o;this.stateMachine.changeState(d.LOADING);this.render();o=this.exportOrderFactory.createModel();return o.fetchPromise().then(function(){if(!p.layoutV2){p.downloadLink.setIcon("export-multiple")}window.open(o.getURI(),"_blank")})["catch"](function(){if(!p.layoutV2){p.downloadLink.setIcon("wrong")}})["finally"](function(){p.stateMachine.changeState(d.CLICKABLE);p.render()})},_isUserPMPadmin:function(){var o=this;var r;var p;var q=false;r=(new f(window.location.href)).getValueParameter("esid","")!=="";if(this.buyerType===e.COMPANY&&r){p=this.me.getRoles();q=p.some(function(s){return s.Role==="Admin"&&s.Project===o.company.getEmpProjectName()})}return q}});return c});define("DS/MPFExportOrdersComponent/ExportOrdersFactory",["UWA/Core","UWA/Promise","DS/MPFExportOrdersComponent/ExportOrdersComponent","DS/MPFDataProxy/Connector","DS/MPFModelFactory/MPFFactories","DS/MPFServices/ObjectService","DS/MPFBuyer/BuyerType","DS/MPFCompanyModel/CompanyHelper"],function(g,h,b,e,d,i,c,f){var a;a=g.Class.extend({init:function(j){i.requiredOfPrototype(j.connector,e,"options.connector must be a Connector");this.connector=j.connector;this._initFactories()},buildView:function(){return this._fetchMe().then(this._fetchCompanyIfExists.bind(this)).then(this._buildExportOrdersComponent.bind(this))},_initFactories:function(){try{d.init(this.connector)}catch(j){console.warn(j)}this.personFactory=this.personFactory||d.getFactory(d.types.person);this.companyFactory=this.companyFactory||d.getFactory(d.types.company);this.exportOrderFactory=this.exportOrderFactory||d.getFactory(d.types.exportOrder)},_fetchMe:function(){this.me=this.personFactory.createModel("me");return this.me.fetchPromise()},_fetchCompanyIfExists:function(){this.company=f.getCompanyFromPerson(this.me,this.companyFactory);if(g.is(this.company)){this.buyerType=c.COMPANY;return this.company.fetchPromise()}else{this.buyerType=c.INDIVIDUAL;return h.resolve()}},_buildExportOrdersComponent:function(){return new b({buyerType:this.buyerType,me:this.me,company:this.company,exportOrderFactory:this.exportOrderFactory})}});return a});