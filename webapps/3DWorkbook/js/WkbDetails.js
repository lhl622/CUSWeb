define("DS/3DWorkbook/js/WkbDetails",["UWA/Core","UWA/Class","UWA/Controls/Abstract","DS/CoreEvents/ModelEvents","DS/3DWorkbook/js/WkbUtils","WebappsUtils/WebappsUtils","DS/UIKIT/Iconbar","DS/Controls/TabBar","DS/Controls/TileView","DS/UIKIT/Popover","DS/UIKIT/Scroller","DS/UIKIT/Mask","UWA/Utils/Client","DS/Utilities/KeyboardUtils","DS/3DWorkbook/js/models/WkbPartDS","DS/3DWorkbook/js/models/WkbToolDS","i18n!DS/3DWorkbook/assets/nls/3DWorkbook"],function(aC,aD,S,N,aY,B,ad,bf,bI,ba,c,aE,aQ,F,ax,a,aU){var bJ,bi,k="ibInstructions",aM="ibParts",D="ibTools",av="ibDocuments",aV="DELWkiExecDataCollect",aa="PART",b="DELWkiExecSignOff",z="TOOL",a0="DELWkiExecInstruction",O="DELWkiExecAlert",aJ="DELWkiDocument",E="#77797C",l="#3D3D3D",d="#368EC4",bh=false,bH=false,bm=false,bo,bO,u,j,bV,br,aI,bF=false,az,s,aj,ac,aP,K,a1,r,aB,at,bW=true,bP=true,L=true,R=true,bq=true,aF=true,ak=false,a9=false,h=false,bb=null,bB=null,P=true,v=null,bv=0,aG=null,W=null,be="";var a2=[];function bT(bY,bZ){return'<span style="color: '+bY+'">'+bZ+"</span>"}function aK(b3,b0){var bZ="";var b4=new aC.Element("div");var b2=0,bY=0;var b1=new aC.Element("div");if(aC.is(b0)&&aC.is(b3.attributeValues)){for(b2;b2<b0.length;b2++){if(!aC.is(b0[b2].metaName)||b0[b2].metaName.length===0){continue}if(b0[b2].displayLabel.length>0){if(aC.is(aU[b0[b2].displayLabel])&&aU[b0[b2].displayLabel].length>0){bZ=aU[b0[b2].displayLabel]+" "}else{bZ=b0[b2].displayLabel+" "}bZ=bT(E,bZ)}else{bZ=""}if(b0[b2].newRow){b1=aY.createAndAppend(b4,"div");b1.style.clear="both"}else{b1.style.cssFloat="left";b1.style.clear="";b1=aY.createAndAppend(b4,"div");b1.style.cssFloat="right"}if(b3.attributeValues[b2] instanceof Array){for(bY=0;bY<b3.attributeValues[b2].length;bY++){b1=aY.createAndAppend(b4,"div");b1.innerHTML=bZ+bT(l,b3.attributeValues[b2][bY])}}else{b1.innerHTML=bZ+bT(l,b3.attributeValues[b2])}}}return b4}function bn(b0){var bY=b0.displayName;if(b0.version.length>0){bY+=" ("+aU.OrderRevLbl+b0.version+")"}aP.innerHTML=bY;var bZ=aK(b0,be.operation);K.innerHTML=bZ.getHTML()}function bs(b0){b0=b0||testOperData;var bZ=new aC.Element("div",{id:"opDetails","class":"opDetails",styles:{display:"block",color:E,"font-size":"14px","padding-left":"5px"}});aP=aC.createElement("div",{"class":"wkbTitle",html:b0.displayName+"("+b0.version+")",styles:{padding:"5px"}}).inject(bZ);K=aC.createElement("div",{"class":"operAttributes"});var bY=aK(b0,be.operation);bY.inject(K);K.inject(bZ);return bZ}function o(b0){b0=b0||testOperData;var bZ=new aC.Element("div",{id:"sysDetails","class":"sysDetails",styles:{display:"block",color:E,padding:"5px","font-size":"14px"}});aC.createElement("div",{"class":"wkbTitle",html:b0.displayName,styles:{padding:"5px"}}).inject(bZ);var bY=aC.createElement("div",{"class":"sysAttributes"});var b1=aK(b0,be.system);b1.inject(bY);bY.inject(bZ);return bZ}function bQ(b6,b3){var b4=aC.createElement("div",{id:"","class":""});var b5=aY.createAndAppend(b4,"div","wkbDocPopupScroll","wkbDocPopupScroll");var bZ=aY.createAndAppend(b5,"div","documentList","documentList");var b2,bY,b1;for(b2=0;b2<b3.length;b2++){bY=aY.createAndAppend(bZ,"div","",b6+"doc"+b2);var b0=aX(b3[b2]);b0.style.margin="5px 0px";b1=aC.createElement("a",{textContent:"",target:"_blank",href:b3[b2].fileURL,});b1.inject(bY);b0.inject(b1)}return b4.innerHTML}function a8(b3,bY,b1,bZ,b0){var b2=new ba({target:bY,position:bZ,body:bQ(b3,b0),trigger:"focus",title:b1});b2.elements.container.style.maxWidth="500px"}function bu(bY){if(bo){bo=false;if(bb){bb.location.href=bY[0];bb.focus()}bb=null}}function aW(bY){if(bo){bo=false}}function A(bY,b1,b2,b0){bo=true;var bZ=u+"resources/upr/wip/";bZ=bZ+"getdocumenturl?name="+encodeURIComponent(b1)+"&format="+encodeURIComponent(b2)+"&m1ID="+bY+"&docFilename="+encodeURIComponent(b0);aY.getServerData(bZ,bu,aW,"json")}function bc(bY,b1,b2,b0){return function bZ(){if(!bb){bb=window.open("","_blank")}A(bY,b1,b2,b0)}}function aZ(b0,bZ){var bY=aC.createElement("button",{"class":"",type:"button",styles:{padding:"0px 0px 10px 10px",outline:"none",border:"none",background:"transparent","z-index":2}});aC.createElement("span",{"class":"fonticon fonticon-attach",styles:{"font-size":"18px",margin:"0px",color:"#77797C"}}).inject(bY);a8("dc",bY,bZ+" - "+aU.DocsLbl,"left",b0);return bY}function y(b0,bZ){if(!aC.is(bZ.instancePath)){bZ.instancePath=[]}if(bZ.instancePath.length>0){var bY=aY.createAndAppend(b0,"ul");bY.style.margin="0px";bY.setAttribute("data-listname","prdPathList");bY.id="prdPathList";if(aC.is(bZ.physicalId)&&bZ.physicalId.length>0){bY.setAttribute("data-phyId",bZ.physicalId)}var b1=0;var b2;for(b1;b1<bZ.instancePath.length;b1++){if(bZ.instancePath[b1]!==null){b2=aY.createAndAppend(bY,"li");b2.setAttribute("data-prdInstance",bZ.instancePath[b1])}else{if(bZ.instancePath.length===1){var bY=aY.createAndAppend(b0,"div");bY.style.margin="0px";bY.setAttribute("data-refId",bZ.id);bY.id="refId"}}}}else{console.log("no instance path found, so highlighting of part will not work for this part")}}function bX(b5,b6,b7,b4,b3,b2){var b8=40;var b0=new aC.Element("div",{"class":b6,styles:{display:"block"}});if(b3){var b1=new aC.Element("div",{styles:{"float":"right","margin-top":"5px","margin-right":"10px"}}).inject(b0);b3.inject(b1);b8=b8+28}new aC.Element("div",{"class":"cardClickable "+b7,styles:{display:"inline-block",width:"20px",color:E,margin:"5px 0px 5px 10px","font-size":"18px","vertical-align":"top"}}).inject(b0);var bZ=new aC.Element("div",{"class":"cardClickable",styles:{display:"inline-block",width:"calc(100% - "+b8+"px)","font-family":"Arial"}});var bY=l;if(b2){bY=d}new aC.Element("div",{HTML:b5,styles:{display:"block",color:bY,margin:"5px 10px 10px 5px","font-size":"14px"}}).inject(bZ);new aC.Element("div",{HTML:b4,styles:{display:"block","font-size":"14px",color:E,margin:"0px 10px 10px 5px"}}).inject(bZ);bZ.inject(b0);return b0}function bS(bY){var b1=0;var bZ="";var b7=null;var b2=null;if(bY.documents.length>0){b2=aZ(bY.documents,bY.displayName)}var b5=bY.displayName+" - "+bY.version;var b3=be.part;if(aC.is(b3)){for(b1;b1<b3.length;b1++){if(aC.is(b3[b1].objPropertyName)&&b3[b1].objPropertyName==="instanceName"&&bY.instanceName!=""){b5+=" ("+bY.instanceName+")";break}}b7=aK(bY,b3)}else{b7=new aC.Element("div",{styles:{display:"inline-block",width:"80%","font-family":"Arial"}});if(aC.is(bY.instanceName)&&bY.instanceName.length>0){b5+=" ("+bY.instanceName+")"}}y(b7,bY);if(bY.instanceCount>19){var b4=aU.PartQtyLbl+" ";b4=bT(E,b4);b7.innerHTML=b4+bT(l,bY.instanceCount)+b7.innerHTML}var b0=bX(b5,"partItem itemHover cardNoHighlight","fonticon fonticon-3dpart",b7.getHTML(),b2,true);b0.style.display="none";var b6=b0.getElements(".cardClickable");b6.forEach(function(b8){b8.onclick=function(){bk(b0)}});return b0}function bC(b5){var bY=null;var b0="";var b4="";var b1="";if(b5.documents.length>0){bY=aZ(b5.documents,b5.name)}var b3=b5.name+" - "+b5.version;var b2=aY.getAlertMessageBody(b5.message);if(aC.is(be.alert)){var b1=aK(b5,be.alert);b4=b1.getHTML()}var b0="<div style='margin: 0;'>"+b2+"</div>"+b4;var bZ=bX(b3,"alertItem cardNoHighlight","fonticon fonticon-alert",b0,bY);bZ.style.display="none";return bZ}function bg(bY){var bZ=null;var b3="";if(bY.documents.length>0){bZ=aZ(bY.documents,bY.displayName)}if(aC.is(be.instruction)){var b2=aK(bY,be.instruction);b3=b2.getHTML()}var b1=b3;var b0=bX("","instructionItem cardNoHighlight","fonticon fonticon-text",b1,bZ);b0.style.display="none";return b0}function bN(bY){var bZ=null;if(bY.documents.length>0){bZ=aZ(bY.documents,bY.displayName)}var b1=aK(bY,be.signoff);var b0=bX(bY.displayName,"signoffItem cardNoHighlight","fonticon fonticon-check",b1.getHTML(),bZ);b0.style.display="none";return b0}function bD(b1){var bZ=null;if(b1.documents.length>0){bZ=aZ(b1.documents,b1.label)}var bY=aK(b1,be.datacollect);var b2=b1.label;if(b2.length===0){b2=b1.name}var b0=bX(b2,"dcItem cardNoHighlight","fonticon fonticon-pencil",bY.getHTML(),bZ);b0.style.display="none";return b0}function Z(b1){var b5=aK(b1,be.tool);var b2=aY.createAndAppend(b5,"ul");b2.setAttribute("data-listname","prdPathList");b2.id="prdPathList";if(aC.is(b1.physicalId)&&b1.physicalId.length>0){b2.setAttribute("data-phyId",b1.physicalId)}var b3=b1.displayName+" - "+b1.version;if(aC.is(b1.instanceName)){b3+=" ("+b1.instanceName+")"}var bZ=aY.getPreferenceValue(bO,"resType");var b4=null;if(bZ=="capable"){var bY=new aC.Element("div",{styles:{clear:"both"}});if(b1.resourceType){bY.innerHTML=bT(E,aU.Type+": ")+b1.resourceType}else{bY.innerHTML=bT(E,aU.Type+": ")+b1.wkiType}b4=bY.outerHTML+b5.getHTML()}else{b4=b5.getHTML()}var b0=bX(b3,"toolItem itemHover cardNoHighlight","fonticon fonticon-tools",b4,null,true);b0.dataset.referenceName=b1.id;var b6=b0.getElements(".cardClickable");b6.forEach(function(b7){b7.onclick=function(){bk(b0)}});b0.style.display="none";return b0}function aX(bY){var b1=bY.name+" - "+bY.revision;var b0=new aC.Element("div",{"class":"fonticon fonticon-window",styles:{"font-size":"18px",color:"#77797C",},events:{click:bc(bY.m1Id,bY.name,bY.format,bY.fileName)}});var bZ=bX(b1,"documentItem cardNoHighlight","fonticon fonticon-doc",bY.description,b0);bZ.onclick=bc(bY.m1Id,bY.name,bY.format,bY.fileName);return bZ}function by(b2){var b1=false,bZ=null;var b4="";var b3=[];if(b2.length===0){}else{var bY=0;var b0=0;for(b0;b0<b2.length;b0++){bZ=null;b4=b2[b0].wkiType;switch(b4){case O:b1=true;bZ=bC(b2[b0]);b3[bY++]=b2[b0];break;case a0:bZ=bg(b2[b0]);break;case aV:bZ=bD(b2[b0]);break;case z:bZ=Z(b2[b0]);break;case aJ:bZ=aX(b2[b0]);bZ.style.display="none";break;case b:bZ=bN(b2[b0]);break;case aa:bZ=bS(b2[b0]);break}if(bZ){bZ.inject(j)}}if(b3.length>0){bi.publish({event:"wkbDetails-Alert",data:b3})}}}function an(b0){var bZ=j.querySelectorAll("#"+b0)[0];var b1="";if(b0==="partList"){b1=aU.NoPartsFoundMsg}else{b1=aU.NoRollupPartsFoundMsg}var bY=new aC.Element("div",{"class":"noPartMsg"});bY.textContent=b1;bY.inject(bZ)}function aT(b3,bZ){var b1=null;var bY=j.querySelectorAll("#"+bZ)[0];if(b3.length===0){return}else{var b0=0;var b2=0;for(b2;b2<b3.length;b2++){b1=bS(b3[b2]);if(aC.is(b1)){b1.inject(bY)}}}}function bp(){if(P){var b0=aY.getPreferenceValue(bO,"resType");if(b0=="capable"){var bZ=aj.getItem(D);var bY=!(bZ.elements.container.style.color==="rgb(241, 241, 241)");if(bY){bZ.elements.container.addClassName("item-active");bd(null,bZ)}}else{var bZ=aj.getItem(av);var bY=!(bZ.elements.container.style.color==="rgb(241, 241, 241)");if(bY){bZ.elements.container.addClassName("item-active");J(null,bZ)}}}else{var bZ=aI.getItem(k);var bY=!(bZ.elements.container.style.color==="rgb(241, 241, 241)");if(bY){bZ.elements.container.addClassName("item-active");ah(null,bZ)}else{bZ=aI.getItem(aM);bY=!(bZ.elements.container.style.color==="rgb(241, 241, 241)");if(bY){bZ.elements.container.addClassName("item-active");ap(null,bZ)}else{bZ=aI.getItem(D);bY=!(bZ.elements.container.style.color==="rgb(241, 241, 241)");if(bY){bZ.elements.container.addClassName("item-active");bd(null,bZ)}}}}}function aH(){if(bW&&bP&&L&&R){q(j,r);az.redrawTabBar();bh=false;bp();aE.unmask(bJ)}}function ae(b1,bZ,bY){var b0=aI.getItem(b1);if(bZ){e(b1,bY)}else{bx(b1)}}function bM(bZ){var bY=j.querySelectorAll(".partItem");if(bY.length>0){ao(bY,bZ,true)}}function a7(bZ){if(!aC.is(bZ)){bZ=[]}var bY=(bZ.length>0||(aC.is(aG.children)&&aG.children.length>0));if(bY){if(bZ.length>0){aT(bZ,"partList")}else{if(bF){an("partList")}}}ae(aM,bY,ap);bW=true;aH()}function bK(bZ){if(!aC.is(bZ)){bZ=[]}var bY=(bZ.length>0);if(bZ.length>0){aT(bZ,"rollupList")}else{an("rollupList")}bH=false;bm=true;if(aC.is(W)){bM(W)}w();aE.unmask(bJ)}function i(bZ){if(!aC.is(bZ)){bZ=[]}by(bZ);var bY=(bZ.length>0);ae(D,bY,bd);L=true;aH()}function ag(bZ){if(!aC.is(bZ)){bZ=[]}by(bZ);var bY=(bZ.length>0);ae(k,bY,ah);bP=true;aH()}function aw(bZ){if(!aC.is(bZ)){bZ=[]}by(bZ);var bY=(bZ.length>0);ae(av,bY,J);R=true;aH()}function m(bY){be=bY}function bA(){bW=true;bP==true;L==true;R==true;aH();aE.unmask(bJ)}function Q(bY){console.log(bY);setTimeout(bA,500)}function a6(bZ,b0){var bY=u+"resources/upr/wip/childData?parentPLMID="+encodeURIComponent(bZ);bY=bY+"&childType=allwki";aY.getServerData(bY,b0,Q,"json")}function aA(bZ,b0){var bY=u+"resources/upr/wip/childData?parentPLMID="+encodeURIComponent(bZ);bY=bY+"&childType=documents";aY.getServerData(bY,b0,Q,"json")}function T(b0,b2){var b1=widget.getValue("collabSpace");var bY=new ax(be);bY.getPartsData([b0.instancePhysicalId],u,b1).then(function b3(b4){b2(b4)},function bZ(b4){console.log(b4)})}function bU(bY){var bZ=[];bY.children.forEach(function(b0){bZ.push(b0.instancePhysicalId)});return bZ}function g(b1,b3){var b2=widget.getValue("collabSpace");var bY=new ax(be);if(aC.is(b1.children)&&b1.children.length>0){var b0=bU(b1);bY.getPartsData(b0,u,b2).then(function b4(b5){b3(b5)},function bZ(b5){console.log(rollup);bH=false})}else{bH=false}}function bl(b4,b3,b1){var b0=widget.getValue("collabSpace");var bY=new a(be);bY.getToolsData(b4,u,b0).then(function b2(b5){b1(b5)},function bZ(b5){console.log(b5)})}function aR(bZ,b2,b1){var bY=u+"resources/upr/wip/toolsList?planId="+encodeURIComponent(b2);bY=bY+"&operId="+encodeURIComponent(bZ);var b0=aY.getPreferenceValue(bO,"resType");if(b0=="capable"){bY=bY+"&resourceType=Capable"}else{bY=bY+"&resourceType=Linked"}aY.getServerData(bY,b1,Q,"json")}function aN(bY){be={}}function am(bZ){var bY=u+"resources/upr/wip/attributeConfig";aY.getServerData(bY,bZ,Q,"json")}function aS(bY,b1,bZ){bm=false;aG=bZ;if(bW&&bP&&L&&R){if(bY.length>0){bW=false;bP=false;L=false;R=false;if(aC.is(bZ.children)&&bZ.children.length>0){bF=true;var b2=az.getButtonFromValue("current");b2.checkFlag=true}else{bF=false;az.hide()}T(bZ,a7);var b0=aY.getPreferenceValue(bO,"resType");if(b0==="capable"){aR(bY,b1,i)}else{bl(bZ.instancePhysicalId,b1,i)}aA(bY,aw);a6(bY,ag)}}}var e=function(b0,bY){var bZ=aI.getItem(b0);bZ.handler=bY;if(!bZ.elements.container.hasClassName("item-active")){bZ.elements.container.style.color="#77797c"}};var bx=function(bZ){var bY=aI.getItem(bZ);bY.handler=null;bY.elements.container.removeClassName("item-active");bY.elements.container.style.color="#f1f1f1"};var a4=function(bZ){var bY=aj.getItem(bZ);bY.handler=null;bY.elements.container.removeClassName("item-active");bY.elements.container.style.color="#f1f1f1"};var x=function(){var bY;var b2=".alertItem, .dcItem, .signoffItem, .instructionItem, .toolItem, .documentItem, .partItem";if(P){bY=bV.querySelectorAll(b2)}else{bY=j.querySelectorAll(b2)}var bZ=0;for(bZ;bZ<bY.length;bZ++){bY[bZ].hide()}var b1=j.querySelectorAll("#partList")[0];var b0=j.querySelectorAll("#rollupList")[0];b1.hide();b0.hide()};var w=function(){var bY;var b0=".partItem";bY=j.querySelectorAll(b0);var bZ=0;for(bZ;bZ<bY.length;bZ++){bY[bZ].show()}};var C=function(b0){var bY;if(P){bY=bV.querySelectorAll(b0)}else{bY=j.querySelectorAll(b0)}var bZ=0;for(bZ;bZ<bY.length;bZ++){bY[bZ].toggle()}};function al(bZ){var bY;if(P){bY=s.getElements(".item-active")}else{bY=br.getElements(".item-active")}bY.forEach(function(b0){b0.removeClassName("item-active");b0.style.color="#77797c"});if(aC.is(bZ)){bZ.elements.container.addClassName("item-active");bZ.elements.container.style.color="#368ec4"}}function ap(bZ,bY){x();if(bF){az.show();var b0=az.getButtonFromValue("current");if(b0.checkFlag){C("#partList")}else{C("#rollupList")}}else{C("#partList")}C(".partItem");al(bY);Y()}function J(bZ,bY){x();az.hide();C(".documentItem");al(bY);Y()}function a3(){x();C(".toolItem");az.hide()}function bd(bZ,bY){a3();al(bY);Y()}function X(){var b0=".alertItem, .dcItem, .signoffItem, .instructionItem";az.hide();x();var bY=j.querySelectorAll(b0);var bZ=0;for(bZ;bZ<bY.length;bZ++){bY[bZ].show()}}function ah(bZ,bY){X();if(!aC.is(bY)){bY=aI.getItem(k)}if(aC.is(bY)){al(bY)}Y()}function bj(){var bY=br.getElements(".wkbIconDivider");bY.forEach(function(bZ){bZ.style.width="calc((100% - 155px)/5)"})}function n(b0){var bZ=new aC.Element("div",{id:"partList","class":"PartList",styles:{height:"98%",display:"block","white-space":"pre-line"}}).inject(b0);var bY=new aC.Element("div",{id:"rollupList","class":"RollupList",styles:{height:"98%",display:"block","white-space":"pre-line"}}).inject(b0)}function bE(bY){j=new aC.Element("div",{"class":"OperChildList",styles:{height:(aQ.getSize().height-230)+"px",display:"block","white-space":"pre-line"}});n(j);j.inject(bY)}function G(){if(aC.is(ac)){ac.destroy();ac=null}if(aC.is(j)){j.destroy();bE(r)}if(aC.is(bV)){bV.destroy();bV=new aC.Element("div",{"class":"OrderChildList",styles:{height:(aQ.getSize().height-230)+"px",display:"block"}});bV.inject(aB)}}function q(bZ,bY){if(ac){ac.destroy();ac=null}ac=new c({element:bZ}).inject(bY)}function Y(){var bY=aP.clientHeight+K.clientHeight+br.clientHeight+75;if(az.visibleFlag){bY+=az.elements.container.clientHeight}j.style.height=(aQ.getSize().height-bY)+"px"}function bG(bY){aE.mask(bJ);G();a1.textContent=aU.OperationDetailsTitle;aB.style.display="none";r.style.display="block";al(null);bj();aI.resize();bn(bY.object_data);var bZ="";if(bY.object_data.parentType==="SYSTEM"){bZ=bY.object_data.parentPlmIdentifier}else{bZ=bY.parent.parentPlmIdentifier}aS(bY.object_data.plmIdentifier,bZ,bY.object_data);Y()}function bw(){if(bh){setTimeout(bw,200)}else{bh=true;var bY=a2.pop();if(bY){bG(bY)}else{bh=false}}}function au(bY){P=false;a2=[];a2.push(bY);bw()}function t(bZ){P=true;a1.textContent=aU.SystemDetailsTitle;aB.style.display="block";r.style.display="none";G();var bY=aY.getPreferenceValue(bO,"resType");if(bY=="capable"){bq=false;aR("",at,I)}aF=false;aA(at,p)}function bL(){if(bq&&aF){q(bV,aB);bh=false;bp();aE.unmask(bJ)}}function I(b0){var bY;if(b0.length===0){a4(D)}else{var bZ=0;for(bZ;bZ<b0.length;bZ++){bY=null;bY=Z(b0[bZ]);bY.style.display="block";if(bY){bY.inject(bV)}}}bq=true;bL()}function p(b0){var bY;if(b0.length===0){a4(av)}else{var bZ=0;for(bZ;bZ<b0.length;bZ++){bY=null;bY=aX(b0[bZ]);bY.style.display="block";if(bY){bY.inject(bV)}}}aF=true;bL()}function ar(bY){bY.removeClassName("cardNoHighlight");bY.addClassName("cardHighlight")}function bt(bY){bY.removeClassName("cardHighlight");bY.addClassName("cardNoHighlight")}function ao(b3,b4,b2){var b1,b0,bZ;for(bZ=0;bZ<b3.length;bZ++){b0=aY.createAndAppend(b3[bZ],"div","highlightID","");if(b2){b1=aY.getPartHighlightPath(b3[bZ],b4)}else{b1=aY.getToolHighlightPath(b3[bZ],b4)}if(aC.is(b1)&&b1.length>0){b0.innerHTML=b1}else{b0.innerHTML="";var bY=b3[bZ].getElements(".cardClickable");bY.forEach(function(b5){b5.onclick=null;b5.parentElement.removeClassName("itemHover")})}}}function aL(bY){aE.mask(bJ);W=bY.mapData;if(bh||bH){if(bv<80){bv++;setTimeout(aL,300,bY)}else{console.log("Error setting up highlighting");bv=0;bA()}return}bv=0;bB=bY.player;if(aC.is(v)){bi.unsubscribe(v)}v=bi.subscribe({event:"wkb3DViewer-HighlightCallback"},f);bM(bY.mapData);var bZ=j.querySelectorAll(".toolItem");if(bZ.length>0){ao(bZ,bY.mapData,false)}aE.unmask(bJ)}function bz(b2,b0,bY){if(bY.indexOf(";")===-1){if(b2===bY||b0===bY){return true}else{return false}}else{var b1=bY.split(";");var bZ;for(bZ=0;bZ<b1.length;bZ+=1){if(b2===b1[bZ]||b0===b1[bZ]){return true}}return false}}function aq(bY,b6,b0){var b4,b9,b2="",b8,bZ=[],b3,b1;for(b3=0;b3<bY.length;b3++){b4=bY[b3].getElement(".highlightID");if(b4){var b7=b4.innerHTML;var b5=b7.split("/");b9=b6.split("/");if(b5.length<b9.length){b2=b9[0];for(b1=1;b1<b5.length;b1++){b2+="/"+b9[b1]}}if(b7.length>0&&(bz(b6,b2,b7))){b8=bY[b3].getElement("#prdPathList");if(aC.is(b8)){bZ=b8.getElementsByTagName("li")}if(bZ.length>0||bY[b3].classList.contains("toolItem")){if(b0==="ADD"){ar(bY[b3])}else{bt(bY[b3])}}else{if(b0==="REMOVE"){bt(bY[b3])}}return}}}}function f(b1){var b0=b1.action;var bZ=b1.idPath;if(ak===true){return}var bY=j.querySelectorAll(".partItem");if(bY){aq(bY,bZ,b0)}bY=j.querySelectorAll(".toolItem");if(bY){aq(bY,bZ,b0)}}function a5(b1){var b0,b3,bY,b2,bZ;for(b0=0;b0<b1.length;b0++){b3=b1[b0].getStyle("border");if(b3==="3px solid rgb(54, 142, 196)"){bY=[];b2=b1[b0].getElement(".highlightID");if(b2){bZ=b2.innerHTML;if(bZ!==""){bY.push(bZ);bB.selectNode(bY)}}}}}function H(){var bY=j.querySelectorAll(".partItem");var bZ=j.querySelectorAll(".toolItem");a5(bY);a5(bZ)}function bk(b0){var b1=[];var b2=true;var b6=b0.classList.contains("cardHighlight");ak=true;var b7=b0.getElement(".highlightID");if(!aC.is(b7)||b7.innerHTML===""){ak=false;return}var bZ=b0.getStyle("border");if(h){if(b6){bt(b0);b2=false}else{ar(b0)}}else{var b5=j.querySelectorAll(".partItem");var b3=0;for(b3;b3<b5.length;b3++){bt(b5[b3])}var b5=j.querySelectorAll(".toolItem");var b3=0;for(b3;b3<b5.length;b3++){bt(b5[b3])}if(b6){bt(b0);b2=false}else{ar(b0)}}var b4=b7.innerHTML;if(b4!==""){b1.push(b4);if(b2){if(!h){bB.emptySelection()}var b8=b4.split(";");for(b3=0;b3<b8.length;b3+=1){var bY=b8[b3].split("/");bB.selectNode(bY[(bY.length-1)])}}else{bB.emptySelection();H()}}ak=false}function aO(){if(aC.is(aI)){aI.destroy();aI=null}if(aC.is(br)){br.destroy();br=null}if(aC.is(az)){az.destroy();az=null}if(aC.is(aj)){aj.destroy();aj=null}if(aC.is(s)){s.destroy();s=null}if(aC.is(j)){j.destroy();j=null}if(aC.is(bV)){bV.destroy();bV=null}if(aC.is(aB)){aB.destroy();aB=null}if(aC.is(r)){r.destroy();r=null}if(ac){ac.destroy();ac=null}bJ.testFunction=null;bJ.dispose=null;bJ.destroy();document.removeEventListener("SELECTMODECHANGE",function(bY){if(bY.detail.SelectMode=="multi"){h=true}else{h=false}});document.removeEventListener("keyup",function(bY){if(bY.keyCode===F.CTRL){h=false}});document.removeEventListener("keydown",function(bY){if(bY.keyCode===F.CTRL){h=true}})}function ab(b1,b0,bZ,bY){switch(b1){case"addInstanceDataForHighlighting":return y(b0,bZ);case"addNoPartDataMarkup":return an(b0);case"dispose":return aO(b0);case"loadOperation":return bG(b0);case"loadIdCards":return by(b0);case"onPartTabSelected":return ay(b0);case"processPartData":return a7(b0);case"processToolData":return i(b0);case"processWkiData":return ag(b0);case"processDocumentData":return aw(b0);case"clearTiles":return G();case"setUpHighlight":return aL(b0);case"fixHighlight":return H();case"updateIconBarMenu":return ae(b0,bZ,bY);case"highlightCallback":return f(b0);case"processAttributeConfig":m(b0);this.attributeConfig=be;return;case"processOrderTools":return I(b0);case"processOrderDocs":return p(b0);default:return null}}var V=0;function bR(bZ,bY){if(aC.is(be.system)){bY.innerHTML=o(bZ).getHTML()}else{V+=1;if(V<5){setTimeout(function(){bR(bZ,bY)},500)}}}function ai(b0){var bY=j.querySelectorAll("#rollupList")[0];var bZ=j.querySelectorAll("#partList")[0];bY.hide();bZ.show()}function U(b0){var bY=j.querySelectorAll("#rollupList")[0];var bZ=j.querySelectorAll("#partList")[0];bZ.hide();bY.show();if(!bm){aE.mask(bJ);bH=true;g(aG,bK)}}function ay(bY){switch(bY.options.value){case"current":ai(bY);break;case"rollup":U(bY);break;default:break}}function af(bZ){var bY=new aC.Element("div",{styles:{padding:"10px",display:"block",position:"relative"}});az=new bf({displayStyle:"strip"}).inject(bY);az.add({value:"current",label:aU.PartCurrentLbl,isSelected:true});az.add({value:"rollup",label:aU.PartRollupLbl});az.addEventListener("tabButtonClick",ay);bY.inject(bZ)}var M=function(b1){bO=b1.widgetPreferences;u=b1.ematrixURL;bi=b1.modelEvtManager||new N();am(m);if(!a9){bi.subscribe({event:"wkbNav-SelectOper",},function(b4){au(b4)});bi.subscribe({event:"wkbHeader-SelectOrder",},function(b4){t(b4)});bi.subscribe({event:"wkb3DViewer-MapFileLoaded"},aL);bi.subscribe({event:"wkbHeader-SelectOper",},function(b4){au(b4)});a9=true}var b0=function(){var b4=function(){bi.publish({event:"wkbDetails-Close",data:null})};b4()};var b2=aY.getPreferenceValue(bO,"resType");bJ=new aC.Element("div",{"class":"wkbDetails",styles:{height:"100%",width:"100%","background-color":"white","font-family":"Arial, Helvetica, sans-serif"},});var b3=aC.createElement("div",{"class":"detailHeader"});a1=aC.createElement("p",{html:aU.SystemDetailsTitle}).inject(b3);b3.inject(bJ);r=new aC.Element("div",{styles:{display:"none"}});aB=new aC.Element("div",{id:"systemSection"});V=0;var bZ=o({});bZ.inject(aB);bR(b1.systemData,bZ);bs({}).inject(r);br=new aC.Element("div",{id:"wkbIconBar",styles:{padding:"10px 10px 7px 10px",display:"block","border-bottom":"1px solid #E2E4E3","border-top":"1px solid #E2E4E3"}});var bY="";if(b2=="capable"){bY=aU.CapableLbl}else{bY=aU.ToolsLbl}aI=new ad({items:[{className:"wkbIconDivider"},{id:k,fonticon:"book-open",className:"wkbIcon",text:aU.ThreeDPlayScenarioWorkInstructionsLbl,handler:ah},{className:"wkbIconDivider"},{id:aM,fonticon:"3dpart",className:"wkbIcon",text:aU.PartsLbl,handler:ap},{className:"wkbIconDivider"},{id:D,fonticon:"tools",className:"wkbIcon",text:bY,handler:bd},{className:"wkbIconDivider"},{id:av,fonticon:"doc",className:"wkbIcon",text:aU.DocsLbl,handler:J},{className:"wkbIconDivider"}]}).inject(br);br.inject(r);af(r);bE(r);bV=new aC.Element("div",{"class":"OrderChildList",styles:{height:(aQ.getSize().height-230)+"px",display:"block"}});s=new aC.Element("div",{id:"wkbSysIconBar",styles:{padding:"10px 10px 7px 10px",display:"block","border-top":"1px solid #E2E4E3","border-bottom":"1px solid #E2E4E3"}});aj=new ad({items:[{className:"wkbSysIconDivider"},{id:D,fonticon:"tools",className:"wkbIcon item-active",text:bY,handler:bd},{className:"wkbSysIconDivider"},{id:av,fonticon:"doc",className:"wkbIcon",text:aU.DocsLbl,handler:J},{className:"wkbSysIconDivider"}]}).inject(s);s.inject(aB);bV.inject(aB);aB.inject(bJ);r.inject(bJ);bJ.testFunction=ab;bJ.dispose=aO;at=b1.systemData.plmIdentifier;t({object_data:{plmIdentifier:at}});document.addEventListener("keydown",function(b4){if(b4.keyCode===F.CTRL){h=true}});document.addEventListener("keyup",function(b4){if(b4.keyCode===F.CTRL){h=false}});document.addEventListener("SELECTMODECHANGE",function(b4){if(b4.detail.SelectMode==="multi"){h=true}else{h=false}});var b2=aY.getPreferenceValue(bO,"resType");if(b2!="capable"){a4(D)}return bJ};return M});