package {
import flash.display.Sprite;
import flash.geom.Point;

public class Region extends Sprite {

    private var _code:String;
    private var _drawer:Drawer = new Drawer(graphics);

    public static function fromSvgNode(node:XML):Region {
        var region:Region = new Region(node.@id);
        region.drawNode(node);
        return region;
    }

    protected static function parseNumber(s:String, i:int = -1, a:Array = null):Number {
        return parseFloat(s);
    }

    protected static function parsePoint(s:String, i:int = -1, a:Array = null):Point {
        var values:Array = s.split(",").map(parseNumber);
        return new Point(values[0], values[1]);
    }

    protected static function trim(v:String):String {
        var s:int, e:int, l:int = v.length;
        for (s = 0; s < l && v.charAt(s) == " "; ++s) {}
        for (e = l - 1; e >= s && v.charAt(e) == " "; --e) {}
        return v.substring(s, e + 1);
    }

    public function Region(code:String) {
        _code = code;
    }


    public function get code():String {
        return _code;
    }

    protected function drawNode(node:XML):void {
        var type:String = node.name().localName;
        switch (type) {
            case "polygon":
                drawPolygon(node.@points);
                break;
            case "g":
                drawGroup(node);
                break;
            case "path":
                drawPath(node.@d);
                break;
        }
    }

    protected function drawPolygon(pointsString:String):void {
        var points:Array = trim(pointsString).split(/\s+/).map(parsePoint),
            p0:Point = points[0],
            p:Point;

        points.shift();
        _drawer.moveTo(p0);
        _drawer.startContour();
        graphics.beginFill(0xFFFFFF);
        graphics.lineStyle(1, 0);
        for each (p in points) {
            _drawer.lineTo(p);
        }
        _drawer.endContour();
        graphics.endFill();
    }

    protected function drawPath(pathString:String):void {
        // TODO: refactor using polymorphism
        const commands:Array = ["M", "L", "C", "z"];

        var tokens:Array = trim(pathString).split(/\s+/),
            token:String,
            command:String,
            args:Array = [],
            tokenIsCommand:Boolean = false,
            firstM:Boolean = true;

        function applyCommand():void {
            var pts:Array = args.map(parsePoint);

            switch (command) {
                case "M":
                    _drawer.moveTo(pts[0]);
                    if (firstM) {
                        firstM = false;
                        _drawer.startContour();
                    }
                    break;
                case "L":
                    _drawer.lineTo(pts[0]);
                    break;
                case "C":
                    _drawer.curveTo(pts[0], pts[1], pts[2]);
                    break;
                case "z":
                    _drawer.endContour();
                    break;
                default:
                    trace("Unknown path command: " + command);
            }

            args.length = 0;
            command = null;
        }

        graphics.beginFill(0xFFFFFF);
        graphics.lineStyle(1, 0);
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
        graphics.endFill();
    }

    protected function drawGroup(node:XML):void {
        for each (var subNode:XML in node.children()) {
            drawNode(subNode);
        }
    }
}
}
