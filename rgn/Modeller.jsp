<%@include file="../emxUIFramesetUtil.inc"%>
<% if(request.getHeader("user-agent").toLowerCase().indexOf("msie") != -1 && "1".equals(System.getenv("I9_DISPLAY_FORCED"))) { %>
		<!-- 
			Use the following artefact to display Modeller in Internet Explorer with the wright Document Mode (IE=9) 
		-->
		<html>
		<body style="margin:0;">
		<object data='ModellerContent.jsp?objectId=<%=XSSUtil.encodeForURL(context, request.getParameter("objectId"))%>' type="text/html" width="100%" height="100%" style="margin:0; border:none; overflow:hidden;"></object>
		</body>
		</html>
<%} else {%>
	<!doctype html>
	<html>
	  <head>
	    <title>Documentation Editor</title>
	    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<link type="text/css" rel="stylesheet" href="reportmodeller/style.css">
	    <script type="text/javascript" language="javascript" src="reportmodeller/reportmodeller.nocache.js"></script>
	    <script type="text/javascript" language="javascript" src="reportmodeller/I18n.jsp"></script>
	    <script type="text/javascript" language="javascript" src="reportmodeller/SystEnv.jsp"></script>
	    <link type="text/css" rel="stylesheet" href="styles/emxRGNStyle.css"/>
	  </head>
	  <body>
	     <div id="modelid" style="display: none;"><%=XSSUtil.encodeForHTML(context, request.getParameter("objectId"))%></div>
	    <iframe src="javascript:''" id="__gwt_historyFrame" tabIndex='-1' style="position:absolute;width:0;height:0;border:0"></iframe>
	    <noscript>
	      <div style="width: 22em; position: absolute; left: 50%; margin-left: -11em; color: red; background-color: white; border: 1px solid red; padding: 4px; font-family: sans-serif">
	        Your web browser must have JavaScript enabled
	        in order for this application to display correctly.
	      </div>
	    </noscript>
	   <div id="layout-header">
			<div id="layout-toolbar" class="elorn-controlbar">
			</div>
		</div>
		<div id="layout-content">
		</div>
		<script type="text/javascript" language="javascript" src="scripts/emxRGNScript.js"></script>
	  </body>
	</html>
<%}%>