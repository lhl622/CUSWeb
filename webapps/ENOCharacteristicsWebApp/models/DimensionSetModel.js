define("DS/ENOCharacteristicsWebApp/models/DimensionSetModel",["UWA/Class/Model","UWA/Class/Collection","DS/ENOCharacteristicsWebApp/utils/RequestUtils","DS/ENOCharacteristicsWebApp/utils/Constants","DS/PlatformAPI/PlatformAPI","DS/UIKIT/Alert","i18n!DS/ENOCharacteristicsWebApp/assets/nls/ENOCharacteristicsWebAppNLS","DS/ENOCharacteristicsWebApp/utils/AlertManager"],function(c,d,f,a,g,e,i,b){var h=c.extend({urlRoot:f.getGLSWebServiceURL()+a.CHARACTERISTICS_ENDPOINT,mDimensionSet:null,mRetryCount:0,mRetryLimit:3,setup:function(j){this.fetchDimensionSet()},fetchDimensionSet:function(){var k=this;k.mRetryCount++;var j=f.getGLSWebServiceURL()+a.CHARACTERISTICS_ENDPOINT;f.send3DSpaceRequest(j+a.CHARACTERISTICS_GET_DIMENSIONS,"GET",{type:"json",headers:{"Content-type":"application/x-www-form-urlencoded"}},function(l){k.mDimensionSet=l},function(m,l){if(k.mRetryCount<k.mRetryLimit){console.info("fetchDimensionSet : Retrying..."+k.mRetryCount);k.fetchDimensionSet()}b.displayErrorResponse(null,l)})},getDisplayUnitForDiemension:function(m){var l=this.mDimensionSet;if(l===null){this.fetchDimensionSet()}var k=l.filter(function(n){return(n.id===m)});var j=k[0]["displayUnits"];return j}});return h});