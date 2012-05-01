package {
import flash.display.Shape;
import flash.display.Sprite;
import flash.events.MouseEvent;
import flash.geom.ColorTransform;

public class Region extends Sprite {

    protected var
        _code:String,
        _drawer:IDrawer,
        _fill:Shape = new Shape(),
        _contour:Shape = new Shape(),
        _tintStyle:TintStyle;

    public static function fromSvgNode(node:XML, style:DrawingStyle, tintStyle:TintStyle):Region {
        var region:Region = new Region(node.@id, style, tintStyle);
        region.drawFromNode(node);
        return region;
    }

    public function Region(code:String, style:DrawingStyle, tintStyle:TintStyle) {
        var fillDrawer:IDrawer = new Drawer(_fill.graphics, style.fillOnly()),
            contourDrawer:IDrawer = new Drawer(_contour.graphics, style.contourOnly());

        _code = code;
        _tintStyle = tintStyle;

        _drawer = new MultiDrawer(fillDrawer, contourDrawer);
        addChild(_fill);
        addChild(_contour);

        EventContext.bind(this, MouseEvent.ROLL_OVER, tintFill);
        EventContext.bind(this, MouseEvent.ROLL_OUT, resetTintFill);
    }

    public function get code():String {
        return _code;
    }

    protected function tintFill():void {
        _fill.transform.colorTransform = _tintStyle.colorMatrix;
    }

    protected function resetTintFill(e:MouseEvent):void {
        _fill.transform.colorTransform = new ColorTransform();
    }

    protected function drawFromNode(node:XML):void {
        var type:String = node.name().localName;
        switch (type) {
            case "polygon":
                _drawer.drawPolygon(node.@points);
                break;
            case "path":
                _drawer.drawPath(node.@d);
                break;
            case "g":
                drawGroup(node);
                break;
        }
    }

    protected function drawGroup(node:XML):void {
        for each (var subNode:XML in node.children()) {
            drawFromNode(subNode);
        }
    }
}
}
