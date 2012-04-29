class Point
  constructor: (@x, @y) ->
  add: (p2) -> new Point @x + p2.x, @y + p2.y
  subtract: (p2) -> new Point @x - p2.x, @y - p2.y
  scale: (v) -> new Point @x * v, @y * v
  length: -> Math.sqrt @x * @x + @y * @y
  normalize: -> scale 1 / @length()
  toString: "Point(x=#{@x}, y=#{@y})"

exportGlobals com: katlex: Point: Point