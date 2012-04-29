(function() {
    var Logger = com.katlex.Logger,
        Map = com.katlex.SvgMap,
        map;

    Logger.setup({
        root: Logger.ERROR,
        com: {
            katlex: Logger.DEBUG
        }
    });

    map = Map.init("mapContainer", "/map.svg");
})();