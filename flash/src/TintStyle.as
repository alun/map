package {
import fl.motion.Color;

import flash.geom.ColorTransform;

public class TintStyle {

    private var
        _color:uint,
        _strength:Number;

    public function TintStyle(color:uint, strength:Number) {
        _color = color;
        _strength = strength;
    }

    public function get colorMatrix():ColorTransform {
        var c:Color = new Color();
        c.setTint(_color, _strength);
        return c;
    }
}
}
