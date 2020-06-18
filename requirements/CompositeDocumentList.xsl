<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />

<xsl:template match="CompositeDocument">
<html>
<head>
	<title><xsl:value-of select="@header" /></title>

	<style type="text/css">
body {
	background-color: white;
	padding: 0px;
}

h1 {
	text-align: center;
	color: black;
}

h2 {
	text-align: right;
	color: black;
	font-size: 10pt;
	margin: 5px 10px;
}

ul {
	background-color: white;
	border-color: black;
	border-width: medium;
	border-style: none;
	list-style-type: none;
	spacing: 2;
}

li {
	text-align: left;
	color: black;
	list-style-type: disc;
	padding: 2;
}

h3 {
	color: black;
	font-size: 14pt;
	margin: 0px;
	padding: 5px;
}

h4 {
	color: black;
	font-size: 12pt;
	margin: 0px;
	padding: 3px;
}

h5 {
	color: black;
	font-size: 10pt;
	margin: 0px;
	padding: 1px;
}

.Comment {
	background-color: #FFC;
}

.Chapter {
	background-color: #FCF;
}

.Requirement {
	background-color: #CFF;
}

.structure {
	border-color: white;
	margin: 5px;
	border-width: medium;
	border-style: double;
	padding: 0px;
	background-color: white;
}

.relation {
	border-color: white;
	border-width: thin;
	border-style: dashed
}

.basic {
	width: 100px;
	height: auto; 
	margin: auto;
}

.attribute {
	width: 100px;
	height: auto;
	margin: auto;
}
	</style>
</head>

<body>
	<h1>Report for: <xsl:value-of select="StructureData/ObjectReference[1]/@type" /></h1>
	<h2>Generated By: <xsl:value-of select="@user" /></h2>
	<h2><xsl:value-of select="@date" /></h2>
	<xsl:apply-templates select="StructureData" />
</body>
</html>
</xsl:template>

<xsl:template match="StructureData">
	<div class="structure">
		<xsl:apply-templates select="ObjectReference" />
	</div>
</xsl:template>

<xsl:template match="ObjectReference">
	<xsl:variable name="oid" select="@id" />

	<div class="{@type}">
		<xsl:apply-templates select="/CompositeDocument/InstanceData/ObjectInstance[@id=$oid]" />
	
		<ul class="relation">
			<xsl:apply-templates select="Relationship/ObjectReference" />
		</ul>
	</div>
</xsl:template>

<xsl:template match="ObjectInstance">
	<h3><xsl:value-of select="type" />: <xsl:value-of select="@alias" /></h3>
	<ul>
		<xsl:apply-templates select="Attribute" />
	</ul>
</xsl:template>

<xsl:template match="type|name|revision">
	<li><h4><span class="basic"><xsl:value-of select="local-name()" /></span><xsl:text> : </xsl:text> <xsl:value-of select="." /></h4></li>
</xsl:template>

<xsl:template match="Attribute">
	<li><h5><span class="attribute"><xsl:value-of select="@name" /></span><xsl:text> : </xsl:text> <xsl:value-of select="." /></h5></li>
</xsl:template>

</xsl:stylesheet>