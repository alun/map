package {
import flash.geom.Point;

public interface IDrawer {

    function startContour():void;

    function endContour():void;

    function moveTo(p:Point):void;

    function lineTo(p:Point):void;

    function curveTo(control1:Point, control2:Point, anchor2:Point):void;

    function drawPolygon(pointsString:String):void;

    function drawPath(pathString:String):void;

}
}