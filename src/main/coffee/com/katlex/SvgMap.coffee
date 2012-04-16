$ = jQuery

class SvgMap
  merge = com.katlex.utils.mergeObjects
  logger = com.katlex.Logger.create("com.katlex.SvgMap")

  @init: (container, mapDataUrl, behaviorOverride) ->
    logger.debug "Initializing"
    map = new SvgMap(container)
    map.loadData(mapDataUrl)
    merge behaviorOverridem, map.behavior if behaviorOverride?
    map

  legalNode = (node) ->
    node? && node.nodeName in ["g", "polygon", "path"]

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
    @behavior = {}
    merge defaultBehavior, @behavior

    container = $("#" + containerId)
    @paper = Raphael(containerId, container.width(), container.height())

  loadData: (dataUrl) ->
    logger.debug "Loading data"
    # async load map SVG file
    $.get dataUrl, (data) => @drawRegions @behavior.initialTransform(data)

  drawRegions: (xml) ->
    for node in xml.childNodes
      @drawRegion node if legalNode node

  drawRegion: (node) ->
    @regions ?= []

    @paper.setStart()
    drawSVGNode @paper, node
    region = @paper.setFinish()
    region.attr @behavior.resetHighlight

    region.id = node.getAttribute "id"

    map = this
    region.mouseover () -> @.attr map.behavior.highlight
    region.mouseout () -> @.attr map.behavior.resetHighlight

    @regions.push region
    
defaultBehavior =
  highlight: fill: "#0000FF"
  resetHighlight: fill: "#FFFFFF"
  initialTransform: (xml) -> ($ "#Subjects_Outline", xml)[0]

exportGlobals com: katlex: SvgMap: SvgMap
