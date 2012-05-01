package {
import flash.display.MovieClip;
import flash.display.Shape;
import flash.display.Sprite;
import flash.display.StageAlign;
import flash.display.StageScaleMode;
import flash.events.Event;
import flash.events.IOErrorEvent;
import flash.geom.Rectangle;
import flash.net.URLLoader;
import flash.net.URLRequest;

public class Map extends MovieClip {

    protected var _regions:Object = {};
    protected var _pane:Sprite = new Sprite();

    public function Map() {
        addChild(_pane);
        if (!stage) {
            EventContext.bindOnce(this, Event.ADDED_TO_STAGE, init);
        } else {
            init();
        }
    }

    protected function init():void {
        stage.align = StageAlign.TOP_LEFT;
        stage.scaleMode = StageScaleMode.NO_SCALE;

        var params:Object = loaderInfo.parameters,
            loader:URLLoader = new URLLoader(),
            svgFile:String = params.svgFile || "map.svg";

        EventContext.bindOnce(loader, Event.COMPLETE, function():void {
            drawFromSVG(XML(loader.data));
        }).link(
        EventContext.bindOnce(loader, IOErrorEvent.IO_ERROR, function():void {
            trace("Failed to load SVG file");
        }));
        loader.load(new URLRequest(svgFile));
    }

    protected function drawFromSVG(svg:XML):void {
        for each (var regionSvg:XML in toRegionsList(svg)) {
            var region:Region = Region.fromSvgNode(regionSvg);
            _regions[region.code] = region;
            _pane.addChild(region);
        }
        paneToCenter();
    }

    protected function toRegionsList(svg:XML):XMLList {
        var root:XML = svg.*.(@id == "Subjects_Outline")[0];
        return root.children();
    }

    protected function paneToCenter():void {
        var r:Rectangle = _pane.getBounds(this),
            kx:Number = r.width / stage.stageWidth,
            ky:Number = r.height / stage.stageHeight,
            k:Number = Math.max(kx,  ky,  1);

        trace(kx, ky, k);

        _pane.scaleX = _pane.scaleY = 1 / k;

        r = _pane.getBounds(this);
        _pane.x = - r.x + .5 * (stage.stageWidth - _pane.width);
        _pane.y = - r.y + .5 * (stage.stageHeight - _pane.height);
    }

}
}
