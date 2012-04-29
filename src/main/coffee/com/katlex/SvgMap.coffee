$ = jQuery
Point = com.katlex.Point
Logger = com.katlex.Logger
mergeObjects = com.katlex.utils.mergeObjects

class SvgMap
  logger = Logger.create("com.katlex.SvgMap")

  @init: (container, mapDataUrl, behaviorOverride) ->
    logger.debug "Initializing"
    map = new SvgMap(container)
    map.loadData(mapDataUrl)
    mergeObjects behaviorOverride, map.behavior if behaviorOverride?
    map

  legalNode = (node) ->
    node? && node.nodeName in ["g", "polygon", "path"]

  constructor: (containerId) ->
    logger.debug "Construction"
    @behavior = {}
    mergeObjects defaultBehavior, @behavior

    @container = $("#" + containerId)
    @paper = Raphael(containerId, @container.width(), @container.height())

    @viewBox =
      topLeft: new Point(0, 0)
      width: @container.width()
      height: @container.height()

  loadData: (dataUrl) ->
    logger.debug "Loading data"
    # async load map SVG file
    r = $.ajax url: dataUrl, type: "GET"
    r.done (data) =>
      @drawRegions @behavior.initialTransform(data)
      @setViewToWholeMap()
      @setupDragLogic()
      @setupZoomLogic()
    r.fail (jqXHR, textStatus) =>
      logger.fatal "SVG file couldn't be loaded"

  setViewToWholeMap: ->
    mapBBox = @wholeMap.getBBox()
    kw = @viewBox.width / mapBBox.width
    kh = @viewBox.height / mapBBox.height
    k = if kw < kh then kw else kh

    @viewBox.width /= k
    @viewBox.height /= k

    v1 = new Point(mapBBox.x, mapBBox.y)
    v2 = new Point(mapBBox.width, mapBBox.height)
    v3 = new Point(@viewBox.width, @viewBox.height)
    @viewBox.topLeft = v1.add (v2.subtract v3).scale 1/2

    @applyViewBox()

  applyViewBox: ->
    tl = @viewBox.topLeft
    @paper.setViewBox tl.x, tl.y, @viewBox.width, @viewBox.height, true

  setupDragLogic: ->
    @dragging = false
    lastPoint = null
    mapSvg = $ @container[0].childNodes[0]
    point = (e) -> new Point(e.clientX, e.clientY)
    curElem = (e) => @paper.getElementByPoint e.clientX, e.clientY

    mapSvg.mousedown (e) => if e.which == 1
      lastPoint = point(e)
      @dragging = true
      elem = curElem(e)
      (@regionHighlightResetter elem.region)() if elem

    mapSvg.mouseup (e) => if e.which == 1
      lastPoint = null
      @dragging = false
      elem = curElem(e)
      (@regionHighlighter elem.region)() if elem

    mapSvg.mousemove (e) =>
      lastPoint = null if ($.browser.msie && document.documentMode < 9 && e.button == 0)
      e.which = 0 if e.which == 1 and !lastPoint
      lastPoint = null if e.which != 1

      if lastPoint
        newPoint = point(e)
        offset = newPoint.subtract(lastPoint).scale(@viewBox.width / @container.width())
        @viewBox.topLeft = @viewBox.topLeft.subtract(offset)
        @applyViewBox()
        lastPoint = newPoint
      else
        @dragging = false

  setupZoomLogic: ->
    mapSvg = $ @container[0].childNodes[0]
    mapSvg.mousewheel (e, delta) ->
      console.log delta

  drawRegions: (xml) ->
    @wholeMap = @paper.set()
    for node in xml.childNodes
      @wholeMap.push @drawRegion node if legalNode node

  drawRegion: (node) ->
    @regions ?= []

    region = @paper.set()
    @drawSVGNode node, region

    region.attr @behavior.resetHighlight
    region.id = node.getAttribute "id"

    C = @behavior
    region.mouseover @regionHighlighter(region)
    region.mouseout @regionHighlightResetter(region)

    @regions.push region
    region

  drawSVGNode: (node, region) ->
    if node.nodeName == "polygon"
      pathStr = "M" + node.getAttribute("points").replace(/^\s+/, "").replace(/\s+$/, "").split(/\s+/).join("L") + "Z"
    else if node.nodeName == "path"
      pathStr = node.getAttribute("d")

    if pathStr
      path = @paper.path pathStr
      region.push path
      path.region = region
    else if node.nodeName == "g"
      for childNode in node.childNodes
        @drawSVGNode childNode, region if legalNode childNode

  regionHighlighter: (region) ->
    C = @behavior
    => region.animate C.highlight, 5000 / C.colorAnimationSpeed if !@dragging

  regionHighlightResetter: (region) ->
    C = @behavior
    => region.animate C.resetHighlight, 5000 / C.colorAnimationSpeed

defaultBehavior =
  highlight: fill: "#00FF00"
  resetHighlight: fill: "#FFFFFF"
  initialTransform: (xml) -> ($ "#Subjects_Outline", xml)[0]
  colorAnimationSpeed: 20

exportGlobals com: katlex: SvgMap: SvgMap
