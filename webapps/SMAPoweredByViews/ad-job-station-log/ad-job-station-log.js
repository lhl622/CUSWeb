/*!  Copyright 2018 Dassault Systemes. All rights reserved. */
define("DS/SMAPoweredByViews/ad-job-station-log/ad-job-station-log",["DS/SMAPoweredByState/ad-state-store","DS/SMAProcSP/PolymerLoader","DS/SMAPoweredByViews/ad-redux-behaviour/ReduxBehaviour","DS/SMAPoweredByState/ad-state-domain-jobs/selectors","DS/SMAPoweredByViews/ad-browser-storage","DS/SMAPoweredByViews/ad-batch-iteration-chooser/ad-batch-iteration-chooser","text!DS/SMAPoweredByViews/ad-job-station-log/ad-job-station-log.html"],function(f,a,e,h,b,d,g){function c(){var i=null,j=null;if(this.jobId){j=h.jobWithID(this.store.getState(),this.jobId);if(h.isBatchJob(this.store.getState(),j)){i=h.batchJobIterations(this.store.getState(),j)}if(i&&(i.length>0)){this.$.batchIterationList.iterations=i}else{if(!this.$.batchIterationRow.classList.contains("hidden")){this.$.batchIterationRow.classList.add("hidden")}}this.$.jobLog.jobObjectId=j.id;if(j.eedJobID&&j.executionOptions.server&&j.status){this.$.jobLog.eedjobId=j.eedJobID;this.$.jobLog.cosServerId=j.executionOptions.server;this.$.jobLog.jobExecutionStatus=j.status}this.$.jobLog.getJobLog()}}a.register(g);return window.Polymer({is:"ad-job-station-log",properties:{jobId:{type:String,value:null,observer:"_jobIdChanged"},selectedBatchIteration:{type:Number,value:-1,observer:"_selectedBatchIterationChanged"}},ready:function(){var i=window.sessionStorage.getItem(b.SessionDataPaths.HAS_SET_JOBLOG_DEFCOL);if(!i||(i!=="true")){this.$.jobLog.setTablePreference("Time",true);this.$.jobLog.setTablePreference("severity",false);this.$.jobLog.setTablePreference("source",false);this.$.jobLog.setTablePreference("CompDisplayPath",false);this.$.jobLog.setTablePreference("CompIterRunId",false);this.$.jobLog.setTablePreference("Msg",true);window.sessionStorage.setItem(b.SessionDataPaths.HAS_SET_JOBLOG_DEFCOL,"true")}},_jobIdChanged:function(){c.call(this)},_selectedBatchIterationChanged:function(){},onBatchIterationSelect:function(k){var l=this.$.jobLog.$.joblog.getElementsByTagName("iframe").datagridFrame,j;if(l){j=l.contentWindow.document.getElementsByName("Filter");if(j&&(j.length===1)){if(k.detail>=0){j[0].value="1.1.1."+(k.detail+1)}else{j[0].value=""}var i=l.contentWindow.document.createEvent("HTMLEvents");i.initEvent("keyup",false,true);j[0].dispatchEvent(i)}}},behaviors:[e]})});