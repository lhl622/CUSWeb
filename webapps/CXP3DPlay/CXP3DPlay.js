define("DS/CXP3DPlay/CXP3DPlayApp",["UWA/Core","UWA/Class/Listener","DS/XCTWebExperienceAppPlay/CXPWebAppPlay","DS/CAT3DExpLinkContext/CAT3DExpPlatformMediaLinkContext","UWA/Class/Promise","DS/CAT3DExpModel/CAT3DXModel"],function(g,e,a,f,d,b){var c=a.extend(e,{init:function(i,j){i.frmWindow.loadActionBar({workbenchModule:"XCTWebExperienceAppPlay",workbench:"CXPWebAppPlay.xml"});this._asset=j.asset;this._parent({FrameWindow:i.frmWindow});this._experienceBase=i._experienceBase;var h=this;b.clean().done(function(){return h._initCAT3DXModel()}).done(function(){h.onAppReady()})},onAppReady:function(){this._parent();if(!g.is(this._asset)){console.error("CXPWeb3DPlay.onAppReady() : asset is not set ! Please use setAsset() to assign an asset to load !");return}var h=new f(this._asset);var i=this;this._experienceBase.getManager("CAT3DXLoaderManager").loadLink(h,["CXPExperience_Spec"]).done(function(k){var j=k.QueryInterface("CATI3DGeoVisu");i._experienceBase.getManager("CAT3DXVisuManager").setRoot(j);i._experienceBase.getManager("CAT3DXVisuManager").setContent(k.QueryInterface("CATI3DGeoVisu"));i._experienceBase.getManager("CAT3DXUIManager").setContent(k.QueryInterface("CATI3DXUIRep"));i._reframeOnGeoVisu(j)})},_reframeOnGeoVisu:function(i){if(i.isReady()){this._reframeViewpoint()}else{var h=this;this.listenTo(i,"readyChanged",function(j){if(j){h.stopListening(i,"readyChanged");h._reframeViewpoint()}})}},_reframeViewpoint:function(){var h=this._experienceBase.getManager("CAT3DXVisuManager").getViewer();h.setRenderFrameCB(function(){h.setRenderFrameCB(null);h.currentViewpoint.reframe()})}});return c});