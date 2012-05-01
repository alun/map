package {
import flash.geom.Point;

public class MultiDrawer implements IDrawer {

    protected var _drawers:Array = [];

    public function MultiDrawer(...drawers) {
        _drawers = drawers;
    }

    public function startContour():void {
        forAll("startContour");
    }

    public function endContour():void {
        forAll("endContour");
    }

    public function moveTo(p:Point):void {
        forAll("moveTo", p);
    }

    public function lineTo(p:Point):void {
        forAll("lineTo", p);
    }

    public function curveTo(control1:Point, control2:Point, anchor2:Point):void {
        forAll("curveTo", control1, control2, anchor2);
    }

    public function drawPolygon(pointsString:String):void {
        forAll("drawPolygon", pointsString);
    }

    public function drawPath(pathString:String):void {
        forAll("drawPath", pathString);
    }

    protected function forAll(methodName:String, ...args):void {
        for each (var drawer:Drawer in _drawers) {
            (drawer[methodName] as Function).apply(drawer, args);
        }
    }
}
}
