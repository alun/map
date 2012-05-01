(function($, ymaps) {

    var regionData,
        mapReady = false,
        regionsUrl  = "/partners/geo/ajax.region.handler.php",
        storesUrl   = "/partners/geo/ajax.distributor.handler.php",
        defaultZoom = 5,
        regionHint = $("#regionHint");

    regionHint.appendTo($("body")).css({position: "absolute"});

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

    function loadLocations(regionId, callback, emptyCallback) {
        $.get(storesUrl + "?region=" + regionId, function(data) {
            var dataItems = eval(data);
            if (dataItems.length == 0 && emptyCallback) {
                emptyCallback();
            } else if (callback) {
                $.each(dataItems, function(i, rawDataItem) {
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
            noStoresHint = $("#noStoresHint"),
            yandexMap,
            balloonLayout = ymaps.templateLayoutFactory.createClass(
                '<h3>$[properties.name]</h3>' +
                    '<p>$[properties.address]</p>' +
                    '<p>$[properties.phone]</p>' +
                    '<a href="$[properties.url]">Сайт</a>'
            );

        ymaps.layout.storage.add('my#superlayout', balloonLayout);

        $(ymapContainerId).hide();

        backToRegion.click(function(){
            $(mapContainerId).show();
            $(ymapContainerId).hide();
            backToRegion.hide();
        }).attr("href", "javascript:void(0)");

        function regionClickHandler(code) {
            backToRegion.show();
            noStoresHint.hide();
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
                    var deactivators = [];
                    loadLocations(regionData[code].id, function(location) {
                        var t = locationTemplate.clone(),
                            activePreset = "twirl#greenIcon",
                            passivePreset = "twirl#lightblueIcon",
                            active = false,
                            placemark;

                        t.find(".name").text(location.name);
                        t.find(".address").text(location.address);
                        t.find(".phone").text(location.phone);
                        t.find(".url").attr("href", location.url);

                        function updatePlacemark() {
                            if (placemark) {
                                yandexMap.geoObjects.remove(placemark);
                            }
                            placemark = new ymaps.Placemark(location.point,
                                location, { preset : active ? activePreset : passivePreset,
                                    balloonContentBodyLayout:'my#superlayout' });
                            placemark.events.add("click", activate);
                            yandexMap.geoObjects.add(placemark);
                        }

                        function activate() {
                            $.each(deactivators, function(i, f) {
                                f();
                            });

                            if (!active) {
                                active = true;
                                updatePlacemark();

                                t.addClass("active");
                            }
                            placemark.balloon.open();
                        }
                        function deactivate() {
                            if (active) {
                                active = false;
                                updatePlacemark();
                                t.removeClass("active");
                            }
                        }

                        updatePlacemark();

                        t.click(activate);
                        locations.append(t);
                        deactivators.push(deactivate);
                    }, function() {
                        noStoresHint.show();
                    });
                }

            });
        }

        // Region selector initialization

        var container = $(mapContainerId),
            params = {
                wmode: "transparent"
            },
            settings = {
                svgFile: "map.svg",
                fillColor: 0xffe9e6,
                lineWidth: 0.5,
                lineColor: 0xdfcecc,
                tintColor: 0xff0000,
                tintStrength: 0.1
            };

        container.mousemove(function(e) {
            regionHint.css({
                left: e.pageX + 10,
                top: e.pageY - 30
            });
        });

        window.MapSWF_Callback = {
            showTooltip: function (code) {
                regionHint.text(regionData[code].name).show();
            },
            hideTooltip: function () {
                regionHint.hide();
            },
            regionClick: function (code) {
                MapSWF_Callback.hideTooltip();
                regionClickHandler(code);
            }
        };

        $('<div id="mapSwf"/>').appendTo(container);
        swfobject.embedSWF("map.swf", "mapSwf", container.width(), container.height(),
            "9.0.0", "expressInstall.swf", settings, params);
    }

    ymaps.ready(initMap);

})(jQuery, ymaps);