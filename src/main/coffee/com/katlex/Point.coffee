class Point
  constructor: (x, y) ->
    @x = x
    @y = y

  add: (p2) -> new Point(@x + p2.x, @y + p2.y)
  subtract: (p2) -> new Point(@x - p2.x, @y - p2.y)
  toString: "Point(x=#{@x}, y=#{@y})"

exportGlobals com: katlex: Point: Point