define("DS/CAT3DExpModelLocal/CAT3DXModelFactoryLocal",["UWA/Core","UWA/Promise","DS/CAT3DExpModel/CAT3DXModelFactory","DS/CATCXPCIDModel/CXPUIFactory","DS/CAT3DExpModel/interfaces/CATI3DExperienceObject","DS/CATCXPModel/interfaces/CATICXPVariablesInit","DS/CAT3DExpModel/CAT3DXJSONReader"],function(h,c,b,g,f,d,a){var e=b.extend({init:function(i){this._parent(i);this._JSONcapacities=i.capacities},clean:function(){return this._parent().done(function(){d.ClearNLXML()})},LoadDependencies:function(){var j=this;if(!j._JSONcapacities||j._JSONcapacities.length===0){return c.resolve()}var i=h.Promise.deferred();require(j._JSONcapacities,function(){var n=[];for(var m=0;m<arguments.length;m++){var l=JSON.parse(arguments[m]);for(var k in l){n.push({spec:k,path:"text!"+l[k]})}}require(n.map(function(o){return o.path}),function(){var p=new DOMParser();for(var o=0;o<n.length;o++){d.AddNLXMLNodeBySpec(n[o].spec,p.parseFromString(arguments[o],"text/xml"))}i.resolve()})});return i.promise},CreateExperience:function(i){return this._CreateComponent("CXPExperience_Spec",i).then(function(j){return c.resolve(j)})["catch"](function(j){return c.reject(j)})},LoadExperience:function(m,l,k){var j=this;var i=c.deferred();m.resolveLinkAsStream(l).then(function(o){var n=new FileReader();n.onloadend=function(r){var p=new a(j,j._factory._experienceBase.getManager("CAT3DXLinkManager"));var q=JSON.parse(r.target.result);if(!h.is(q)){i.reject("invalid string")}p.read(q,m).then(function(s){if(h.is(s)&&s.GetType()==="CXPExperience_Spec"){i.resolve(s)}else{i.reject("Invalid JSON"+k)}})["catch"](function(s){i.reject(s)})};n.readAsText(o)})["catch"](function(n){i.reject(n)});return i.promise},IsExperienceStarted:function(){return h.Promise.reject()},CloseExperienceServer:function(){return h.Promise.resolve()},RetrieveExperienceServer:function(){return h.Promise.reject()},CloseExperience:function(){var i=this.GetExperience();i.destroy();return h.Promise.resolve()},SetVariableValues:function(k,j,i){k.QueryInterface("CATI3DExperienceObject").SetValueByName(j,i,f.SetValueMode.NoCheck);return h.Promise.resolve()},CreateActor:function(k,j,i){return this._CreateComponent(k,j,i,"actors").then(function(m){var l=i.QueryInterface("CATI3DExperienceObject").GetValueByName("actors");l.push(m);i.QueryInterface("CATI3DExperienceObject").SetValueByName("actors",l,f.SetValueMode.NoCheck);return c.resolve(m)})["catch"](function(l){return c.reject(l)})},DeleteActor:function(k){var i=k.QueryInterface("CATICXPObject").GetFatherObject();var j=i.QueryInterface("CATI3DExperienceObject").GetValueByName("actors");j.splice(j.indexOf(k),1);i.QueryInterface("CATI3DExperienceObject").SetValueByName("actors",j,f.SetValueMode.NoCheck);k.destroy();return h.Promise.resolve()},CreateActorFromAsset:function(m,j,i,k,l){return this._CreateComponent(m,j,i,"actors").then(function(o){o.QueryInterface("CATI3DXAssetHolder").setLinkContext(k);o.QueryInterface("CATI3DXAssetHolder").setLinkDescription(l);var n=i.QueryInterface("CATI3DExperienceObject").GetValueByName("actors");n.push(o);i.QueryInterface("CATI3DExperienceObject").SetValueByName("actors",n,f.SetValueMode.NoCheck);return c.resolve(o)})["catch"](function(n){return c.reject(n)})},InsertProduct:function(j,i,k,l){return this.CreateActorFromAsset("Model_VPMReference_Spec",j,i,k,l)},CreateBehavior:function(k,j,i){return this._CreateComponent(k,j,i,"behaviors").then(function(m){var l=i.QueryInterface("CATI3DExperienceObject").GetValueByName("behaviors");l.push(m);i.QueryInterface("CATI3DExperienceObject").SetValueByName("behaviors",l,f.SetValueMode.NoCheck);return c.resolve(m)})["catch"](function(l){return c.reject(l)})},DeleteBehavior:function(j){var k=j.QueryInterface("CATICXPObject").GetFatherObject();var i=k.QueryInterface("CATI3DExperienceObject").GetValueByName("behaviors");i.splice(i.indexOf(j),1);k.QueryInterface("CATI3DExperienceObject").SetValueByName("behaviors",i,f.SetValueMode.NoCheck);j.destroy();return h.Promise.resolve()},CreateScenario:function(i){var j=this.GetExperience();return this._CreateComponent("CXPWizardedScenario_Spec",i,j,"scenarios").then(function(k){var l=j.QueryInterface("CATI3DExperienceObject").GetValueByName("scenarios");l.push(k);j.QueryInterface("CATI3DExperienceObject").SetValueByName("scenarios",l,f.SetValueMode.NoCheck);return c.resolve(k)})["catch"](function(k){return c.reject(k)})},CreateAct:function(j,i){return this._CreateComponent("CXPAct_Spec",j,i,"acts").then(function(l){var k=i.QueryInterface("CATI3DExperienceObject").GetValueByName("acts");k.push(l);i.QueryInterface("CATI3DExperienceObject").SetValueByName("acts",k,f.SetValueMode.NoCheck);return c.resolve(l)})["catch"](function(k){return c.reject(k)})},CreateParagraph:function(j,i){return this._CreateComponent("CXPParagraph_Spec",j,i,"paragraphs").then(function(l){var k=i.QueryInterface("CATI3DExperienceObject").GetValueByName("paragraphs");k.push(l);i.QueryInterface("CATI3DExperienceObject").SetValueByName("paragraphs",k,f.SetValueMode.NoCheck);return c.resolve(l)})["catch"](function(k){return c.reject(k)})},CreateSentence:function(j,i){return this._CreateComponent("CXPSentence_Spec",j,i,"sentences").then(function(l){var k=i.QueryInterface("CATI3DExperienceObject").GetValueByName("sentences");k.push(l);i.QueryInterface("CATI3DExperienceObject").SetValueByName("sentences",k,f.SetValueMode.NoCheck);return c.resolve(l)})["catch"](function(k){return c.reject(k)})},CreateBlock:function(i,j,k){var l=k?"sensorBlocks":"driverBlocks";var m=j.QueryInterface("CATI3DExperienceObject").GetValueByName(l);return this._CreateComponent("CXPBlock_Spec",i,j,l).then(function(n){m.push(n);j.QueryInterface("CATI3DExperienceObject").SetValueByName(l,m,f.SetValueMode.NoCheck);return c.resolve(n)})["catch"](function(n){return c.reject(n)})},CreateResource:function(k,j){var i=this.GetExperience();return this._CreateComponent(k,j,i,"resources").then(function(l){var m=i.QueryInterface("CATI3DExperienceObject").GetValueByName("resources");m.push(l);i.QueryInterface("CATI3DExperienceObject").SetValueByName("resources",m,f.SetValueMode.NoCheck);return c.resolve(l)})["catch"](function(l){return c.reject(l)})},CreateResourceFromAsset:function(m,j,k,l){var i=this.GetExperience();return this._CreateComponent(m,j,i,"resources").then(function(n){n.QueryInterface("CATI3DXAssetHolder").setLinkContext(k);n.QueryInterface("CATI3DXAssetHolder").setLinkDescription(l);var o=i.QueryInterface("CATI3DExperienceObject").GetValueByName("resources");o.push(n);i.QueryInterface("CATI3DExperienceObject").SetValueByName("resources",o,f.SetValueMode.NoCheck);return c.resolve(n)})["catch"](function(n){return c.reject(n)})},CreateUIButton:function(i){return this._CreateUIActor(i,function(j){return g.FillButtonVariables(j)})},CreateUIText:function(i){return this._CreateUIActor(i,function(j){return g.FillTextVariables(j)})},CreateUIImage:function(i){return this._CreateUIActor(i,function(j){return g.FillImageVariables(j)})},CreateUITextField:function(i){return this._CreateUIActor(i,function(j){return g.FillTextFieldVariables(j)})},CreateUIColorPicker:function(i){return this._CreateUIActor(i,function(j){return g.FillColorPickerVariables(j)})},CreateUISlider:function(i){return this._CreateUIActor(i,function(j){return g.FillSliderVariables(j)})},CreateUICameraViewer:function(i){return this._CreateUIActor(i,function(j){return g.FillCameraViewerVariables(j)})},CreateUIWebViewer:function(i){return this._CreateUIActor(i,function(j){return g.FillWebViewerVariables(j)})},CreateUIGalleryMenu:function(i){return this._CreateUIActor(i,function(j){return g.FillGalleryMenuVariables(j)})},CreateUIGalleryImage:function(i){return this._CreateUIActor(i,function(j){return g.FillGalleryImageVariables(j)})},CreateUIGalleryProduct:function(i){return this._CreateUIActor(i,function(j){return g.FillGalleryProductVariables(j)})},CreateUIGalleryViewpoint:function(i){return this._CreateUIActor(i,function(j){return g.FillGalleryViewpointVariables(j)})},CreateGalleryItem:function(j,i){return this._CreateComponent("CXPDataItem_Spec",j,i,"items").then(function(l){var k=i.QueryInterface("CATI3DExperienceObject").GetValueByName("items");k.push(l);i.QueryInterface("CATI3DExperienceObject").SetValueByName("items",k,f.SetValueMode.NoCheck);return c.resolve(l)})["catch"](function(k){return c.reject(k)})},_CreateComponent:function(l,k,j,i){var m;if(j&&j.QueryInterface("CATI3DExperienceObject")&&i){m=j.QueryInterface("CATI3DExperienceObject").GetVariableID(i)+","+h.Utils.getUUID()}else{m=h.Utils.getUUID()}return this.BuildComponent(l,m).then(function(n){if(h.is(k)&&n.QueryInterface("CATIAlias")){n.QueryInterface("CATIAlias").SetAlias(k)}var o=n.QueryInterface("CATICXPVariablesInit");if(h.is(o)){return o.Init().then(function(){return n})["catch"](function(p){return c.reject(p)})}return n})},_CreateUIActor:function(j,m){var k=this;var l=this.GetExperience();var i;return k._CreateComponent("CXPUIActor_Spec",j,l,"actors").then(function(n){i=n;return m(i)}).then(function(){var n=l.QueryInterface("CATI3DExperienceObject").GetValueByName("actors");n.push(i);l.QueryInterface("CATI3DExperienceObject").SetValueByName("actors",n,f.SetValueMode.NoCheck);return c.resolve(i)})["catch"](function(n){return c.reject(n)})},CopyActor:function(j,i){return this._copyComponent(this.GetExperience(),j,i,"actors").done(function(l){var k=i.QueryInterface("CATI3DExperienceObject").GetValueByName("actors");k.push(l);i.QueryInterface("CATI3DExperienceObject").SetValueByName("actors",k,f.SetValueMode.NoCheck);return c.resolve(l)})},_copyComponent:function(m,j,k,i){var l=this;var n;return this.BuildComponent(j.GetType(),k.QueryInterface("CATI3DExperienceObject").GetVariableID(i)+","+h.Utils.getUUID()).done(function(u){n=u;var o=[];var t=n.QueryInterface("CATIIcon");if(t){t.SetIconName(j.QueryInterface("CATIIcon").GetIconName())}var p=n.QueryInterface("CATI3DXAssetHolder");if(p){p.copyFrom(j.QueryInterface("CATI3DXAssetHolder"))}var s=j.QueryInterface("CATI3DExperienceObject");var r=[];if(s){s.ListVariables(o);for(var q=0;q<o.length;q++){r.push(l._copyVariable(m,n,j,o[q]))}}return h.Promise.all(r)}).done(function(){return n})},_deepCopyObjectVariable:function(m,k,l,i){var j=k.QueryInterface("CATI3DExperienceObject").GetValueByName(i);return this._copyComponent(m,j,l,i).done(function(n){l.QueryInterface("CATI3DExperienceObject").SetValueByName(i,n,f.SetValueMode.NoCheck)})},_copyObjectArray:function(o,k,n,i){var p=k.QueryInterface("CATI3DExperienceObject").GetValueByName(i);var m=[];var j=[];for(var l=0;l<p.length;l++){if(p[l].QueryInterface){j.push(this._copyComponent(o,p[l],n,i)).done(function(q){m.push(q)})}else{m.push(p[l])}}return h.Promise.all(j).done(function(){n.QueryInterface("CATI3DExperienceObject").SetValueByName(i,m,f.SetValueMode.NoCheck)})},_copyVariableObjectExec:function(l,j,k,i){var m=j.QueryInterface("CATI3DExperienceObject").GetValueByName(i);if(Array.isArray(m)){return this._copyObjectArray(l,j,k,i)}else{if(h.is(m.QueryInterface)){return this._deepCopyObjectVariable(l,j,k,i)}else{k.QueryInterface("CATI3DExperienceObject").SetValueByName(i,m,f.SetValueMode.NoCheck);return h.Promise.resolve()}}},_copyVariableExec:function(m,j,l,i){var k=j.QueryInterface("CATI3DExperienceObject").GetValueByName(i);if(Array.isArray(k)){l.QueryInterface("CATI3DExperienceObject").SetValueByName(i,k.slice(),f.SetValueMode.NoCheck)}else{l.QueryInterface("CATI3DExperienceObject").SetValueByName(i,k,f.SetValueMode.NoCheck)}return h.Promise.resolve()},_copyVariableColorExec:function(m,k,l,i){var n=k.QueryInterface("CATI3DExperienceObject").GetValueByName(i);if(n){var j=n.Clone();l.QueryInterface("CATI3DExperienceObject").SetValueByName(i,j,f.SetValueMode.NoCheck)}return h.Promise.resolve()},_copyVariable:function(m,l,k,i){var j=k.QueryInterface("CATI3DExperienceObject").GetVariableInfo(i);if(!l.QueryInterface("CATI3DExperienceObject").HasVariable(i)){l.QueryInterface("CATI3DExperienceObject").AddVariable(i,j.type,j.maxNumberOfValues,j.valuationMode,null,i)}var n=k.QueryInterface("CATI3DExperienceObject").GetValueByName(i);if(n){if(j.type===f.VarType.Object&&j.valuationMode===f.ValuationMode.AggregatingValue){return this._copyVariableObjectExec(m,k,l,i).done(function(){if(n.isKindOf&&n.isKindOf("CXPResource_Spec")){var o=m.QueryInterface("CATI3DExperienceObject").GetValueByName("resources");o.push(l.QueryInterface("CATI3DExperienceObject").GetValueByName(i));m.QueryInterface("CATI3DExperienceObject").SetValueByName("resources",o,f.SetValueMode.NoCheck)}})}else{if(j.type===f.VarType.Color){return this._copyVariableColorExec(m,k,l,i)}else{return this._copyVariableExec(m,k,l,i)}}}return undefined}});return e});