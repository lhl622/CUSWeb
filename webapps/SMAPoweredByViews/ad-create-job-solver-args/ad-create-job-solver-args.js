(function(J){var L=J.Polymer,N=J.DS;var A=null,E=null,v=null,s=null,d=null,O=null,q=null,b=null,H=null,x=null,e=null,n=null,c=null,t=null,K=null,z=null,j=null,h=null,i=null,I=null,F=null,G=null,l=null,w=null,k=null,g=null,a=null,y=null,o={standalone:"Standalone",optionValue:"Option-Value",standaloneValue:"Standalone-Value"},D={analysisType:"Analysis Type"},u={open:"job-type job-type-small ad-create-job-solver-args",close:"job-type ad-create-job-solver-args"},p=["cpus","domains","queue","after","background","gpus","host","interactive","memory","mp_mode","port","queue","scratch","user"],B=["cpus","domains","host"],M=["cpus","domains","host","queue"],C={input:"INP"},m={oncloud:"oncloud",onpremise:"onpremise",oncloudonpremise:"oncloudonpremise",oncloudonpremiseuvm:"oncloudonpremiseuvm",customdrmtraditional:"customdrmtraditional",customdrmuvm:"customdrmuvm"},r=" *",f={add:"add",remove:"remove"};var P=function(Q,U,T,R,S){if((typeof(U)==="undefined")||!U||(U.length===0)){U=" "}if((this.solverArguments[S].displayed&&T.length>0)||(this.solverArguments[S].required&&(this.solverArguments[S].required.toLowerCase()==="true"))){Q=R+U+T}return Q};i=function(){var S="",R,W,Y,X,Q,U;if(!this.customCommand||this.customCommand===""){for(var V=0;V<this.solverArguments.length;V++){R=null;X=this.solverArguments[V].optionType;W=this.solverArguments[V].separatorValue;Q=this.solverArguments[V].name;Y=this.solverArguments[V].value?this.solverArguments[V].value.trim():"";U=this.solverArguments[V].displayed;if(X===o.standalone){if(this.solverArguments[V].name===D.analysisType){var Z=document.getElementsByName("jobType");for(var T=0;T<Z.length;T++){if(Z[T].checked){R=Z[T].value}}}else{if(this.solverArguments[V].required&&(this.solverArguments[V].required.toLowerCase()==="true")){R=Q}else{if(this.solverArguments[V].displayed&&this.solverArguments[V].active){R=Q}}}}else{if(X===o.standaloneValue&&U){R=Y}else{if(X===o.optionValue){R=P.call(this,R,W,Y,Q,V)}}}if(R){if(S.length>0){S+=" "}S+=R}}return S}else{return this.customCommand}};x=function(Q){var R=document.createElement("label");R.className="control-label";R.setAttribute("for","option__"+Q.id);R.textContent=Q.required==="True"?Q.name+r:Q.name;return R};e=function(Q){var R=new this._File({multiple:true,buttonBefore:false,name:"option__"+Q.id,id:"option__"+Q.id,buttonClassName:"primary",placeholder:"Select file...",buttonText:"Browse..."});return R};n=function(Q){var R=new this._Text({id:"option__"+Q.id,name:"option__"+Q.id,required:Q.requried==="True",value:Q.value?Q.value:"",disabled:Q.disabled==="True"});return R};c=function(T,R,S,U){var Q=new this._Select({placeholder:U?U:false,options:S,name:R,id:T});return Q};t=function(R,S,T){var Q=new this._Select({placeholder:T?T:false,options:S,name:R.name,id:"option__"+R.id});return Q};K=function(R){var Q=new this._Toggle({type:"switch",value:R.name,id:"option__"+R.id,name:"option__"+R.id,checked:(R.active===true),disabled:(R.required==="True")});return Q};z=function(Q){var R=document.createElement("label"),S;if(Q.required==="True"&&Q.name===D.analysisType){S=this._NLS.AnalysisType}else{if(Q.required==="True"&&Q.name!==D.analysisType){S=Q.name+r}}R.className="control-label";R.setAttribute("for","option__"+Q.id);R.textContent=S;return R};j=function(Q,R){var S=new this._Toggle({name:"jobType",value:R,label:R,type:"radio",className:"primary",checked:(Q.value&&R===Q.value)||(!Q.value&&Q.defaultValues&&R===Q.defaultValues),events:{onChange:v.bind(this,Q)}});return S};h=function(R){var Q=new this._Toggle({type:"checkbox",className:"primary toggle-sm",value:R.required==="True"?R.name+r:R.name,name:"add__"+R.id,id:"add__"+R.id});return Q};F=function(Q){var U=document.createElement("div"),T=null,R=[],V;if((Q.dataType==="file")&&(Q.readOnly)){for(var S=0;S<this.jobInputs.length;S++){if(this._ADDataFormatUtils.getFileExtension(this.jobInputs[S].name)===C.input){V=this.jobInputs[S].version?" ("+this._NLS.Version+" "+this.jobInputs[S].version+")":"";R.push({value:this.jobInputs[S].name,label:this.jobInputs[S].name+V,selected:this.jobInputs[S].name===Q.value})}}if(R.length===0){U=t.call(this,Q,R,this._NLS.InputSelectPlaceHolder)}else{U=t.call(this,Q,R)}this._inputSelect=U}else{if(Q.dataType==="file"){T=e.call(this,Q);T.setId("option__"+Q.id);T.inject(U)}else{T=n.call(this,Q,false);T.inject(U)}}if(T){T.addEvent("onChange",A.bind(this,Q),this)}return U};l=function(Q){var T,S=[];for(var R=0;R<Q.Choices.length;R++){S.push({value:Q.Choices[R],selected:(Q.value&&Q.Choices[R]===Q.value)||(!Q.value&&Q.defaultValues&&Q.Choices[R]===Q.defaultValues)})}T=t.call(this,Q,S);return T};G=function(R){var U,Q,V,T=[];if(this.$.additionArgsContainer.style.width==="60%"){Q=u.open}else{Q=u.close}U=document.createElement("div");U.className=Q;U.setAttribute("id","jobTypeRow");for(var S=0;S<R.Choices.length;S++){if(R.name===D.analysisType){V=j.call(this,R,R.Choices[S]);V.inject(U)}else{T.push({value:R.Choices[S],selected:(R.value&&R.Choices[S]===R.value)||(!R.value&&R.defaultValues&&R.Choices[S]===R.defaultValues)})}}if(R.name!==D.analysisType){U=t.call(this,R,T)}return U};w=function(Q){var S=document.createElement("div"),R;S.className="add-options-item style-scope ad-create-job-solver-args";S.argData=Q;R=h.call(this,Q);if(Q.required==="True"){R.check();R.disable()}if(Q.displayed===true){R.check()}R.inject(S);S.description=Q.description;R.addEvent("onChange",E.bind(this,Q));return S};k=function(Q,S,R){if(Q.name===D.analysisType){S.classList.add("first-item");S.classList.add("hidden");R.classList.add("first-item");R.classList.add("style-scope");R.classList.add("ad-create-job-solver-args")}else{R.classList.add("style-scope");R.classList.add("ad-create-job-solver-args")}};y=function(){this.$.commandInput.value=i.call(this);this.$.commandInput.title=i.call(this)};H=function(){var T,U,R,Q,V,S;this.$.additionalArgs.textContent="";this.$.inputRow.textContent="";for(S=0;S<this.solverArguments.length;S++){T=null;Q=this.solverArguments[S];U=document.createElement("li");if(Q.omitted===true){continue}if(Q.optionType!==o.standalone){R=x.call(this,Q)}if((Q.optionType===o.optionValue&&typeof(Q.Choices)==="undefined")||Q.optionType===o.standaloneValue){T=F.call(this,Q)}else{if(Q.optionType===o.optionValue&&typeof(Q.Choices)!=="undefined"){T=l.call(this,Q)}else{if((Q.optionType===o.standalone)&&typeof(Q.Choices)==="undefined"){T=K.call(this,Q)}else{if(Q.optionType===o.standalone&&typeof(Q.Choices)!=="undefined"){R=z.call(this,Q);T=G.call(this,Q)}else{if(Array.isArray(Q.optionType)){T=document.createElement("div")}}}}}if(Q.optionType!==o.standalone){if(Q.Choices){U.appendChild(R);if(T.inject){T.inject(U)}else{U.appendChild(T)}this.$.inputRow.appendChild(U)}else{U.appendChild(R);if(T.inject){T.inject(U)}else{U.appendChild(T)}this.$.inputRow.appendChild(U)}}else{if(Q.optionType===o.standalone&&typeof(Q.Choices)!=="undefined"){U.appendChild(R);U.appendChild(T);this.$.inputRow.appendChild(U)}else{T.inject(U);this.$.inputRow.appendChild(U)}}if(Q.required==="False"&&(typeof(Q.displayed)==="undefined"||Q.displayed===false)){U.classList.add("hidden")}if(T.addEvent){T.addEvent("onChange",A.bind(this,Q),this)}else{T.addEventListener("onChange",A.bind(this,Q),this)}V=w.call(this,Q);k.call(this,Q,V,U);this.$.additionalArgs.appendChild(V)}y.call(this);q.call(this);this.fire("uiloaded",{})};E=function(Q,S){S.stopPropagation();S.cancelBubble=true;var R;var T=this.DOM(this.$.allArgs).find("#option__"+S.currentTarget.id.split("__")[1]).root[0];if(T&&T.parentNode&&T.parentNode.parentNode){R=T.parentNode.parentNode}if(R){if(S.target.checked){R.classList.remove("hidden");Q.displayed=true}else{R.classList.add("hidden");Q.displayed=false}}y.call(this);this.fire("solverargschanged")};A=function(Q,R){R.stopPropagation();R.cancelBubble=true;if(R.currentTarget.type==="checkbox"){Q.active=R.currentTarget.checked}else{Q.value=R.currentTarget.value}y.call(this);this.fire("solverargschanged")};v=function(Q,S){S.stopPropagation();S.cancelBubble=true;var T=document.getElementsByName("jobType");for(var R=0;R<T.length;R++){if(T[R].checked){Q.value=T[R].value;Q.displayed=true}}y.call(this);this.fire("solverargschanged")};I=function(){this.$.additionArgsContainer.style.width="0";this.$.additionArgsContainer.style.borderLeft="none";this.DOM(this.$.closeButtonContainer).addClass("hidden");if(document.getElementById("jobTypeRow")){document.getElementById("jobTypeRow").classList.remove("job-type-small")}};s=function(Q){Q.stopPropagation();Q.cancelBubble=true;if(this.$.additionArgsContainer.style.width===0||this.$.additionArgsContainer.style.width==="0px"||this.$.additionArgsContainer.style.width===""){this.$.additionArgsContainer.style.width="60%";this.$.additionArgsContainer.style.borderLeft="1px solid #e2e4e3";this.DOM(this.$.closeButtonContainer).removeClass("hidden");if(document.getElementById("jobTypeRow")){document.getElementById("jobTypeRow").classList.add("job-type-small")}}else{I.call(this)}};d=function(Q){Q.stopPropagation();Q.cancelBubble=true;I.call(this)};O=function(R,Q){if(R.indexOf(Q.value)!==-1){if(Q.checked){Q.click();this._notifyRemoved=true}Q.disabled=true}else{if(Q.parentNode.parentNode.argData.required!=="True"){Q.disabled=false}}};q=function(){var R;this._notifyRemoved=false;if(typeof(this.cloudExecMode)!=="undefined"){if(this.cloudExecMode===m.oncloud||this.cloudExecMode===m.oncloudonpremiseuvm||this.cloudExecMode===m.customdrmuvm){this.DOM(this.$.disableOptionsNote).removeClass("hidden")}else{this.DOM(this.$.disableOptionsNote).addClass("hidden")}R=this.$.additionalArgs.getElementsByTagName("input");for(var Q=0;Q<R.length;Q++){if(this.cloudExecMode===m.oncloud){O.call(this,p,R[Q])}else{if(this.cloudExecMode===m.oncloudonpremiseuvm){O.call(this,B,R[Q])}else{if((this.cloudExecMode===m.oncloudonpremise||this.cloudExecMode===m.customdrmtraditional)&&R[Q].parentNode.parentNode.argData.required!=="True"){R[Q].disabled=false}else{if(this.cloudExecMode===m.customdrmuvm){O.call(this,M,R[Q])}}}}}if(this._notifyRemoved){this.fire("notifyremoved",{})}}};a=function(Q){this.$.allArgs.classList[Q]("disable-section-wrapper");this.$.inputRow.classList[Q]("disable-section");this.$.addRemoveButton.classList[Q]("hidden");this.$.addOptionsContainer.classList[Q]("disable-section-wrapper");this.$.additionalArgs.classList[Q]("disable-section")};g=function(){this.DOM(this.$.undoCommandInput).removeClass("hidden");a.call(this,f.add);this.$.commandOverrideNote.classList.remove("hidden");I.call(this);this.fire("jobcommandchange",{command:this.$.commandInput.value})};b=function(){var Q=this;Q.isReady=new Promise(function(R){require(["DS/UIKIT/Input/Text","DS/UIKIT/Input/Select","DS/UIKIT/Input/Toggle","DS/UIKIT/Input/ButtonGroup","DS/UIKIT/Input/Button","DS/UIKIT/Input/File","DS/UIKIT/Popover","UWA/Core","DS/SMAPoweredByViews/Utils/ADDataFormatUtils","i18n!DS/SMAPoweredByViews/assets/nls/ADCreateJobSolverArgs"],function(T,S,Z,Y,W,X,U,V,ab,aa){Q._Text=T;Q._Select=S;Q._Toggle=Z;Q._ButtonGroup=Y;Q._Button=W;Q._File=X;Q._Popover=U;Q._UWA=V;Q._ADDataFormatUtils=ab;Q._NLS=aa;Q.$.additionArgsContainer.style.borderLeft="none";R()})})};L({is:"ad-create-job-solver-args",properties:{solverArguments:{type:Array,observer:"solverArgumentsChanged",notify:true},iterations:{type:Array,observer:"iterationsChanged",notify:true},customCommand:{type:String,observer:"customCommandChanged"},nlspath:{type:String,value:"DS/SMAPoweredByViews/assets/nls/ADCreateJobSolverArgs"},isReady:{type:Promise},isLoaded:{type:Promise},cloudExecMode:{type:String,observer:"cloudExecModeChanged"},hasPreDefinedApp:{type:Boolean,observer:"hasPreDefinedAppChanged"},jobInputs:{type:Array,observer:"jobInputsChanged"}},onSolverArgumentChange:function(){return A.apply(this,arguments)},onAddRemoveOptionsClick:function(){return s.apply(this,arguments)},iterationsChanged:function(){this.isReady.then(function(){this.$.batchSelect.textContent="";var Q=c.call(this,"iterationName","iterationName",this.iterations);Q.inject(this.$.batchSelect)}.bind(this))},solverArgumentsChanged:function(){this.isReady.then(function(){if(this.hasPreDefinedApp){H.call(this)}}.bind(this))},customCommandChanged:function(){this.isReady.then(function(){if(this.customCommand){if(this.hasPreDefinedApp){this.$.commandInput.value=this.customCommand;this.DOM(this.$.undoCommandInput).removeClass("hidden");a.call(this,f.add);this.$.commandOverrideNote.classList.remove("hidden")}else{this.$.commandInputEdit.value=this.customCommand}}}.bind(this))},onCloseAddOptions:function(){return d.apply(this,arguments)},ready:function(){return b.apply(this,arguments)},cloudExecModeChanged:function(){this.isReady.then(function(){if(this.hasPreDefinedApp){q.call(this)}}.bind(this))},onInputChange:function(){if(this.$.commandInputEdit.value!==""){this.fire("jobcommandchange",{command:this.$.commandInputEdit.value})}},onCommandInput:function(){g.call(this)},onUndoCommandClick:function(){this.fire("jobcommandchange",{command:null});this.customCommand=null;a.call(this,f.remove);this.$.commandOverrideNote.classList.add("hidden");this.DOM(this.$.undoCommandInput).addClass("hidden");H.call(this)},hasPreDefinedAppChanged:function(){if(this.hasPreDefinedApp){this.DOM(this.$.allArgs).removeClass("hidden");this.DOM(this.$.addRemoveButton).removeClass("hidden");this.DOM(this.$.commandPreview).removeClass("hidden");this.DOM(this.$.editCommand).addClass("hidden")}else{this.DOM(this.$.allArgs).addClass("hidden");this.DOM(this.$.addRemoveButton).addClass("hidden");this.DOM(this.$.commandPreview).addClass("hidden");this.DOM(this.$.editCommand).removeClass("hidden")}},jobInputsChanged:function(){var Q=[],S;if(this._inputSelect){this._inputSelect.remove();if(this.jobInputs.length>0){for(var R=0;R<this.jobInputs.length;R++){if(this._ADDataFormatUtils.getFileExtension(this.jobInputs[R].name)===C.input){S=this.jobInputs[R].version?" ("+this._NLS.Version+" "+this.jobInputs[R].version+")":"";Q.push({value:this.jobInputs[R].name,label:this.jobInputs[R].name+S,selected:this.jobInputs[R].selected})}}if(Q.length!==0){this._inputSelect.add(Q);this._inputSelect.setPlaceholder(false)}}}},behaviors:[N.SMAProcSP.SPBase]})}(this));