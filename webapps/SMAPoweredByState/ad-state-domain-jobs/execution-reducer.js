/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define(["DS/SMAPoweredByState/ad-state-domain-jobs/action-types","DS/SMAPoweredByState/ad-state-cos/selectors","DS/SMAPoweredByState/ad-state-utils"],function(e,b,c){var a={};function d(g,f){var h;switch(f.type){case e.SET_JOB_EXECUTION_OPTIONS:h=c.setStateProperty(g,"executionOptions",f.options,true);if(f.options.drmMode!==b.DRMMode.FIPER){h=c.setStateProperty(h,"executionOptions.station",null,true)}break;case e.SET_JOB_EXECUTION_SERVER:h=c.setStateProperty(g,"executionOptions.server",f.serverID,true);break;case e.SET_JOB_EXECUTION_DRM_MODE:h=c.setStateProperty(g,"executionOptions.drmMode",f.drmMode,true);if(f.drmMode!==b.DRMMode.FIPER){h=c.setStateProperty(h,"executionOptions.station",null,true)}break;case e.SET_JOB_EXECUTION_STATION:h=c.setStateProperty(g,"executionOptions.station",f.stationID,true);break;case e.SET_JOB_EXECUTION_OS:h=c.setStateProperty(g,"executionOptions.os",f.os,true);break;case e.SET_JOB_EXECUTION_NUM_PROCS:h=c.setStateProperty(g,"executionOptions.numProcs",f.numProcs,true);break;case e.SET_JOB_EXECUTION_LICENSE_OPTIONS:h=c.setStateProperty(g,"executionOptions.licenseOptions",f.licenseOptions,true);break;case e.SET_JOB_EXECUTION_SXALICENSE_TYPE:h=c.setStateProperty(g,"executionOptions.licenseOptions.licenseType",f.licenseType,true);break;case e.SET_JOB_EXECUTION_SXALICENSE_FEATURES:h=c.setStateProperty(g,"executionOptions.licenseOptions.features",f.features,true);break;case e.SET_JOB_EXECUTION_SXALICENSE_MODEL_SIZE:h=c.setStateProperty(g,"executionOptions.licenseOptions.modelSize",f.modelSize,true);break;case e.SET_JOB_EXECUTION_SXALICENSE_PERFORMANCE:h=c.setStateProperty(g,"executionOptions.licenseOptions.performance",f.performance,true);break;case e.SET_JOB_EXECUTION_WORK_DIR:h=c.setStateProperty(g,"executionOptions.workDirectory",f.workDirectoryID,(g.eedJobID===null));break;case e.SET_JOB_EXECUTION_REMOVE_WORK_DIR:h=c.setStateProperty(g,"executionOptions.removeWorkDir",f.removeWorkDir,true);break;default:h=g;break}return h}a["default"]=d;return a});