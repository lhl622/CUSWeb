/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define(["DS/SMAPoweredByState/ad-state-store","DS/SMAPoweredByState/ad-state-domain-managed-data/selectors"],function(c,d){var a={};function b(n,k,h,l){var m=c.getStore(),f=null,e,g,j;e=d.managedDataFilesWithName(m.getState(),h,(k?k:n));if(e.length===1){g=d.managedDataChildren(m.getState(),e[0].id);for(j=0;j<g.length;j++){if(g[j].version===l){f=g[j].id;break}}}return f}a.getAvailableUploadedManagedData=function(f){var e=[],g;f.projections.forEach(function(h){g=b(h.containerID,h.documentID,h.fileName,h.version);if(g){e.push(g)}});return e};return a});