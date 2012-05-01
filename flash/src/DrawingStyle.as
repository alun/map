package {
import flash.display.Graphics;

public class DrawingStyle {
    protected var
        _fillColor: uint,
        _lineColor: uint,
        _lineWidth: uint,
        _lineAlpha:Number = 1,
        _fillAplha:Number = 1;

    public function DrawingStyle(fillColor: uint, lineColor: uint, lineWidth:Number) {
        _fillColor = fillColor;
        _lineColor = lineColor;
        _lineWidth = lineWidth;
    }

    public function begin(g:Graphics):void {
        g.beginFill(_fillColor, _fillAplha);
        g.lineStyle(_lineWidth, _lineColor, _lineAlpha);
    }

    public function end(g:Graphics):void {
        g.endFill();
    }

    public function fillOnly():DrawingStyle {
        var s:DrawingStyle = clone();
        s._lineAlpha = 0;
        return s;
    }

    public function contourOnly():DrawingStyle {
        var s:DrawingStyle = clone();
        s._fillAplha = 0;
        return s;
    }

    public function clone():DrawingStyle {
        return new DrawingStyle(_fillColor, _lineColor, _lineWidth);
    }


}
}
