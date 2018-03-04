(function (window, $) {
    var gridSizeMeter = 2;
    var gridSizePx = 20;
    var WantedMapSideSizeMeter = 50;
    var gridSideCount,
        centerOfGridPx,
        centerOfGridMeter,
        mapSideSizeMeter;
    var $map;
    var baseGridEl = '<div class="grid"></div>';

    $(init);

    function init() {
        calculateDimension();
        constructMap();
        setHome();
        var coordinates = findCoordinatesMeter(8.94427191, 7.211102551, 8.246211251);
        insertGridRelativeToCenterMeter(coordinates.x, coordinates.y, 'red');
    }

    function calculateDimension() {
        gridSideCount = Math.round(WantedMapSideSizeMeter / gridSizeMeter) % 2 === 0 ?
            Math.round(WantedMapSideSizeMeter / gridSizeMeter) + 1 : Math.round(WantedMapSideSizeMeter / gridSizeMeter);
        centerOfGridPx = gridSideCount * gridSizePx / 2;
        centerOfGridMeter = pxToM(centerOfGridPx);
        mapSideSizeMeter = gridSideCount * gridSizeMeter;
    }

    function relativeToMapMeter(x) {
        return x + centerOfGridMeter;
    }

    function findCoordinatesMeter(originBeacon, northBeacon, eastBeacon) {
        return {
            x: -(originBeacon * originBeacon - northBeacon * northBeacon + 4) / 4,
            y: (originBeacon * originBeacon - eastBeacon * eastBeacon + 4) / 4
        }
    }

    function mToPx(meters) {
        return meters * gridSizePx / gridSizeMeter;
    }

    function pxToM(pixels) {
        return pixels * gridSizeMeter / gridSizePx;
    }

    function constructMap() {
        $map = $('#map');
        $map.width(gridSideCount * gridSizePx);
        $map.height(gridSideCount * gridSizePx);
        console.log("Total grids : " + gridSideCount * gridSideCount);
    }

    function setHome() {
        insertGridToPx(centerOfGridPx, centerOfGridPx);
    }

    function insertGridRelativeToCenterMeter(xMC, yMC, color){
        var x = mToPx(relativeToMapMeter(xMC));
        var y = mToPx(relativeToMapMeter(yMC));
        insertGridToPx(x, y, color);
    }

    function insertGridToPx(x, y, color, gridEl) {
        var X = typeof x === 'undefined' ? 0 : Math.floor(x / gridSizePx) * gridSizePx;
        var Y = typeof y === 'undefined' ? 0 : Math.floor(y / gridSizePx) * gridSizePx;
        gridEl = !!gridEl ? gridEl : baseGridEl;
        color = !!color ? color : 'grey';
        $home = $(baseGridEl);
        $home.css('top', X);
        $home.css('left', Y);
        if (gridEl === baseGridEl) {
            $home.css('background-color', color);
        }
        $map.append($home);
    }
})(window, window.jQuery);