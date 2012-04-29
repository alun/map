(function() {
    var Logger = com.katlex.Logger,
        Map = com.katlex.SvgMap,
        map;

    function clickHandler(id) {
        console.log(id);
    }

    Logger.setup({
        root: Logger.ERROR,
        com: {
            katlex: Logger.DEBUG
        }
    });

    map = Map.init("mapContainer", "/map.svg");

    eve.on(Map.CLICK, clickHandler);

})();