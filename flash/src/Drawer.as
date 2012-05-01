package {

import flash.display.Graphics;
import flash.geom.Point;

public class Drawer implements IDrawer {

    protected static const STEP:Number = 1/100;

    protected var
        _g:Graphics,
        _penAt:Point = new Point(0, 0),
        _contourStart:Point,
        _style:DrawingStyle;

    protected static function parsePoint(s:String, i:int = -1, a:Array = null):Point {
        var values:Array = s.split(",").map(parseNumber);
        return new Point(values[0], values[1]);
    }

    protected static function parseNumber(s:String, i:int = -1, a:Array = null):Number {
        return parseFloat(s);
    }

    protected static function trim(v:String):String {
        var s:int, e:int, l:int = v.length;
        for (s = 0; s < l && v.charAt(s) == " "; ++s) {}
        for (e = l - 1; e >= s && v.charAt(e) == " "; --e) {}
        return v.substring(s, e + 1);
    }

    public function Drawer(graphics:Graphics, style:DrawingStyle) {
        _g = graphics;
        _style = style;
    }

    public function startContour():void {
        _style.begin(_g);

        _contourStart = _penAt.clone();
    }

    public function endContour():void {
        if (_contourStart) {
            lineTo(_contourStart)
            _contourStart = null;

            _style.end(_g);
        }
    }

    public function moveTo(p:Point):void {
        if (p.x == 0 || p.y == 0) {
            throw new Error("Bad state");
        }

        _g.moveTo(p.x, p.y);
        savePen(p);
    }

    public function lineTo(p:Point):void {
        if (p.x == 0 || p.y == 0) {
            throw new Error("Bad state");
        }

        _g.lineTo(p.x, p.y);
        savePen(p);
    }

    public function curveTo(control1:Point, control2:Point, anchor2:Point):void {
        var p:Point = new Point(0, 0),
            u:Number,
            anchor1:Point = _penAt.clone();

        for (u = 0; u <= 1; u += STEP) {
            p.x = Math.pow(u, 3) * (anchor2.x + 3 * (control1.x - control2.x) - anchor1.x)
                    + 3 * Math.pow(u, 2) * (anchor1.x - 2 * control1.x + control2.x)
                    + 3 * u * (control1.x - anchor1.x) + anchor1.x;

            p.y = Math.pow(u, 3) * (anchor2.y + 3 * (control1.y - control2.y) - anchor1.y)
                    + 3 * Math.pow(u, 2) * (anchor1.y - 2 * control1.y + control2.y)
                    + 3 * u * (control1.y - anchor1.y) + anchor1.y;

            lineTo(p);
        }

        lineTo(anchor2);
    }

    public function drawPolygon(pointsString:String):void {
        var points:Array = trim(pointsString).split(/\s+/).map(parsePoint),
            p0:Point = points[0],
            p:Point;

        points.shift();
        moveTo(p0);
        startContour();
        for each (p in points) {
            lineTo(p);
        }
        endContour();
    }

    public function drawPath(pathString:String):void {
        // TODO: refactor using polymorphism
        const commands:Array = ["M", "L", "C", "z"];

        var tokens:Array = trim(pathString).split(/\s+/),
            token:String,
            command:String,
            args:Array = [],
            tokenIsCommand:Boolean = false,
            firstMove:Boolean = true;

        function applyCommand():void {
            var pts:Array = args.map(parsePoint);

            switch (command) {
                case "M":
                    moveTo(pts[0]);
                    if (firstMove) {
                        firstMove = false;
                        startContour();
                    }
                    break;
                case "L":
                    lineTo(pts[0]);
                    break;
                case "C":
                    curveTo(pts[0], pts[1], pts[2]);
                    break;
                case "z":
                    endContour();
                    break;
                default:
                    trace("Unknown path command: " + command);
            }

            args.length = 0;
            command = null;
        }

        for each (token in tokens) {
            if (trim(token).length == 0) {
                continue;
            }
            tokenIsCommand = commands.indexOf(token) != -1;
            if (command) {
                if (tokenIsCommand) {
                    applyCommand();
                    command = token;
                } else {
                    args.push(token);
                }
            } else {
                if (tokenIsCommand) {
                    command = token;
                    if (command != "M") {
                        throw new Error("Bad state");
                    }
                } else {
                    throw new Error("Parse error. Met " + token + " instead of path command.");
                }
            }
        }
        applyCommand();
    }

    protected function savePen(p:Point):void {
        _penAt = p.clone();
    }
}
}
