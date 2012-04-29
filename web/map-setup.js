(function($, ymaps) {

    var regionData, mapReady = false;

    $.get("partners/geo/ajax.region.handler.php", function(data) {
        var rawData = eval(data),
            rawDataItem,
            i,
            total = rawData.length,
            parsedData = {};

        for (i = 0; i < total; ++i) {
            rawDataItem = rawData[i];
            parsedData[rawDataItem.c] = {
                id: rawDataItem.id,
                name: rawDataItem.n
            };
        }

        regionData = parsedData;
        init();
    });

    function initMap() {
        mapReady = true;
        init();
    }

    function init () {
        if (!regionData || !mapReady) {
            return;
        }

        var Logger = com.katlex.Logger,
            Map = com.katlex.SvgMap,
            map,
            mapContainer = "mapContainer",
            ymapContainer = "ymapContainer",
            mapContainerId = "#" + mapContainer,
            ymapContainerId = "#" + ymapContainer,
            backToRegion = $("#backToRegion"),
            yandexMap,
            defaultZoom = 5;

        $(ymapContainerId).hide();

        backToRegion.click(function(){
            $(mapContainerId).show();
            $(ymapContainerId).hide();
            backToRegion.hide();
        }).attr("href", "javascript:void(0)");

        function regionClickHandler(code) {
            backToRegion.show();
            $(mapContainerId).hide();
            $(ymapContainerId).show();

            ymaps.geocode(regionData[code].name, {results: 1}).then(function (res) {

                var location = res.geoObjects.get(0),
                    latLon = location ? location.geometry.getCoordinates() : null;

                if (!yandexMap) {
                    yandexMap = new ymaps.Map(ymapContainer, {
                        center: latLon,
                        zoom: defaultZoom,
                        behaviors: ['default', 'scrollZoom']
                    });

                    yandexMap.controls
                        .add('zoomControl')
                        .add('miniMap')
                        .add('typeSelector')
                        .add('mapTools');
                } else {
                    yandexMap.setCenter(latLon, defaultZoom);
                }

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
            },
            regionHintTextFunction: function(code) {
                return regionData[code].name;
            }
        });

        eve.on(Map.CLICK, regionClickHandler);

    }

    ymaps.ready(initMap);

})(jQuery, ymaps);