(function($, ymaps) {

    var regionData,
        mapReady = false,
        regionsUrl = "partners/geo/ajax.region.handler.php",
        storesUrl = "partners/geo/ajax.distributor.handler.php",
        defaultZoom = 5;

    $.get(regionsUrl, function(data) {
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

    function loadLocations(regionId, callback) {
        $.get(storesUrl + "?region=" + regionId, function(data) {
            var rawData = eval(data),
                rawDataItem,
                i,
                total = rawData.length;

            for (i = 0; i < total; ++i) {
                rawDataItem = rawData[i];
                if (callback) {
                    callback({
                        name: rawDataItem.n,
                        point: $.map(rawDataItem.p.split(","), function(e) { return parseFloat(e); }),
                        address: rawDataItem.a,
                        phone: rawDataItem.ph,
                        url: rawDataItem.u
                    });
                }
            }
        });
    }

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
            mapContainerId = "#" + mapContainer,
            ymapContainerId = "#ymapContainer",
            locations = $("#locations"),
            locationTemplate = locations.find(":first"),
            backToRegion = $("#backToRegion"),
            yandexMap;

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
            locations.empty();

            ymaps.geocode(regionData[code].name, {results: 1}).then(function (res) {

                var location = res.geoObjects.get(0),
                    latLon = location ? location.geometry.getCoordinates() : null,
                    oldGeoObjects = [];

                if (!yandexMap) {
                    yandexMap = new ymaps.Map("ymap", {
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

                yandexMap.geoObjects.each(function (e) {
                    oldGeoObjects.push(e);
                });
                $.each(oldGeoObjects, function (e) {
                    yandexMap.geoObjects.remove(e);
                });

                if (regionData[code]) {
                    loadLocations(regionData[code].id, function(location) {
                        var t = locationTemplate.clone();
                        t.find(".name").text(location.name);
                        t.find(".address").text(location.address);
                        t.find(".phone").text(location.phone);
                        t.find(".url").attr("href", location.url);
                        t.click(function() {
                            yandexMap.setCenter(location.point, defaultZoom);
                        });
                        locations.append(t);
                        yandexMap.geoObjects.add(new ymaps.GeoObject({
                            geometry: {
                                type: "Point",
                                coordinates: location.point
                            }
                        }));
                    });
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
                return (regionData[code] || {name: code}).name;
            }
        });

        eve.on(Map.CLICK, regionClickHandler);

    }

    ymaps.ready(initMap);

})(jQuery, ymaps);