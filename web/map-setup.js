(function($, ymaps) {

    var regionData,
        mapReady = false,
        regionsUrl  = "/partners/geo/ajax.region.handler.php",
        storesUrl   = "/partners/geo/ajax.distributor.handler.php",
        defaultZoom = 5;

    $("#regionHint").appendTo($("body"));

    $.get(regionsUrl, function(data) {
        var parsedData = {};
        $.each(eval(data), function(i, rawDataItem) {
            parsedData[rawDataItem.c] = {
                id: rawDataItem.id,
                name: rawDataItem.n
            };
        });
        regionData = parsedData;
        init();
    });

    function loadLocations(regionId, callback) {
        $.get(storesUrl + "?region=" + regionId, function(data) {
            if (callback) {
                $.each(eval(data), function(i, rawDataItem) {
                    callback({
                        name: rawDataItem.n,
                        point: $.map(rawDataItem.p.split(","), function(e) { return parseFloat(e); }),
                        address: rawDataItem.a,
                        phone: rawDataItem.ph,
                        url: rawDataItem.u
                    });
                });
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

        var map,
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

            if (yandexMap) {
                yandexMap.geoObjects.each(function (e) {
                    yandexMap.geoObjects.remove(e);
                });
            }

            ymaps.geocode(regionData[code].name, {results: 1}).then(function (res) {

                var location = res.geoObjects.get(0),
                    latLon = location ? location.geometry.getCoordinates() : null;

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

                if (regionData[code]) {
                    loadLocations(regionData[code].id, function(location) {
                        var t = locationTemplate.clone(),
                            mapPoint = new ymaps.GeoObject({
                                geometry: {
                                    type: "Point",
                                    coordinates: location.point
                                },
                                properties: {
                                    balloonContentHeader: location.name
                                }
                            });

                        t.find(".name").text(location.name);
                        t.find(".address").text(location.address);
                        t.find(".phone").text(location.phone);
                        t.find(".url").attr("href", location.url);

                        function activate() {
                            locations.find("> *").removeClass("active");
                            t.addClass("active");
                        }
                        function deactivate() {
                            t.removeClass("active");
                        }

                        t.click(function() {
                            yandexMap.setCenter(location.point, defaultZoom);
                            mapPoint.balloon.open(location.point);
                            activate();
                        });
                        locations.append(t);
                        mapPoint.events.add("click", activate);
                        mapPoint.balloon.events.add("close", deactivate);
                        yandexMap.geoObjects.add(mapPoint);
                    });
                }

            });
        }

        var container = $(mapContainerId),
            params = {
                wmode: "transparent"
            },
            flashVars = {
                svgFile: "map.svg"
            };

        $('<div id="mapSwf"/>').appendTo(container);
        swfobject.embedSWF("map.swf", "mapSwf", container.width(), container.height(),
            "9.0.0", "expressInstall.swf", flashVars, params);
/*
        var Logger = com.katlex.Logger,
            Map = com.katlex.SvgMap;

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
            },
            zoomEnabled: false,
            dragEnabled: false
        });

        eve.on(Map.CLICK, regionClickHandler);*/

    }

    ymaps.ready(initMap);

})(jQuery, ymaps);