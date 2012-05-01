package {

import flash.display.Graphics;
import flash.geom.Point;

public class Drawer {

    protected static const STEP:Number = 1/100;

    protected var
            _g:Graphics,
            _penAt:Point = new Point(0, 0),
            _contourStart:Point;

    public function Drawer(graphics:Graphics) {
        _g = graphics;
    }

    public function startContour():void {
        _contourStart = _penAt.clone();
    }

    public function endContour():void {
        if (_contourStart) {
            lineTo(_contourStart)
            _contourStart = null;
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

    protected function savePen(p:Point):void {
        _penAt = p.clone();
    }
}
}
