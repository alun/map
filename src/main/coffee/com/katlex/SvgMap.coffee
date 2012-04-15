class SvgMap
  $ = jQuery
  logger = com.katlex.Logger.create("com.katlex.SvgMap")

  @init: (container, mapDataUrl) ->
    logger.debug "Initializing"
    map = new SvgMap(container)
    map.loadData(mapDataUrl)
    map

  initialTransform = (xml) ->
    ($ "#Subjects_Outline", xml)[0]

  legalNode = (node) ->
    node? && node.nodeName in ["g", "polygon", "path"]

  highlight = (region) -> ->
    region.attr
      fill: "#00FF00"

  resetHighlight = (region) -> ->
    region.attr
      fill: "#FFFFFF"

  drawSVGNode = (paper, node) ->
    if node.nodeName == "polygon"
      paper.path "M" + node.getAttribute("points").replace(/^\s+/, "").replace(/\s+$/, "").split(/\s+/).join("L") + "Z"
    else if node.nodeName == "path"
      paper.path node.getAttribute("d")
    else if node.nodeName == "g"
      for childNode in node.childNodes
        drawSVGNode paper, childNode if legalNode childNode

  constructor: (containerId) ->
    logger.debug "Construction"
    @initialTransform = initialTransform
    @highlight = highlight
    @resetHighlight = resetHighlight

    container = $("#" + containerId)
    @paper = Raphael(containerId, container.width(), container.height())

  loadData: (dataUrl) ->
    logger.debug "Loading data"
    # async load map SVG file
    $.get dataUrl, (data) => @drawRegions @initialTransform(data)

  drawRegions: (xml) ->
    for node in xml.childNodes
      @drawRegion node if legalNode node

  drawRegion: (node) ->
    @regions ?= []

    @paper.setStart()
    drawSVGNode @paper, node
    region = @paper.setFinish()
    @resetHighlight(region)()

    region.id = node.getAttribute "id"

    region.mouseover @highlight region
    region.mouseout @resetHighlight region

    @regions.push region

exportGlobals com: katlex: SvgMap: SvgMap
