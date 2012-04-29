(function($, ymaps) {

    function init () {

        var Logger = com.katlex.Logger,
            Map = com.katlex.SvgMap,
            map,
            mapContainer = "mapContainer",
            ymapContainer = "ymapContainer",
            mapContainerId = "#" + mapContainer,
            ymapContainerId = "#" + ymapContainer;

        $(ymapContainerId).hide();

        function clickHandler(id) {
            $(mapContainerId).hide();
            $(ymapContainerId).show();

            ymaps.geocode("Омская область", {results: 1}).then(function (res) {

                var location = res.geoObjects.get(0),
                    latLon = location ? location.geometry.getCoordinates() : null,
                    yandexMap = new ymaps.Map(ymapContainer, {
                    center: latLon,
                    zoom: 5,
                    behaviors: ['default', 'scrollZoom']
                });

                yandexMap.controls
                    .add('zoomControl')
                    .add('miniMap')
                    .add('typeSelector')
                    .add('mapTools');
            });
        }

        Logger.setup({
            root: Logger.ERROR,
            com: {
                katlex: Logger.DEBUG
            }
        });

        map = Map.init(mapContainer, "map.svg", {
            resetHighlight: {
                fill: "#ffe9e6",
                stroke: "#dfcecc",
                "stroke-width": 0.5
            },
            highlight: {
                fill: "#dfc1be"
            }
        });

        eve.on(Map.CLICK, clickHandler);

    }

    ymaps.ready(init);

})(jQuery, ymaps);